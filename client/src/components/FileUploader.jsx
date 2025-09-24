import { useState } from "react";
import { IconButton, CircularProgress } from "@mui/material";
import UploadFileIcon from "@mui/icons-material/UploadFile";
import { toast } from "react-toastify";
import {
  presignUpload,
  uploadToPresignedUrl,
  attachFile,
} from "../api/files.jsx";
import { UploadButton } from '@bytescale/upload-widget-react';

export default function FileUploader({ taskId }) {
  const [loading, setLoading] = useState(false);

  const handleChange = async (e) => {
    const file = e[0].originalFile.file;

    try {
      setLoading(true);
      const { uploadUrl, objectKey } = await presignUpload({
        filename: file.name,
        mimetype: file.type,
        size: file.size,
      });

      await uploadToPresignedUrl(uploadUrl, file);

      await attachFile({
        taskId,
        objectKey,
        filename: file.name,
        mimetype: file.type,
        size: file.size,
      });

      toast.success("File uploaded", { position: "top-center" });
    } catch (err) {
      toast.error(err.message || "Upload error", { position: "top-center" });
    } finally {
      setLoading(false);
    }
  };

  const options = {
    apiKey: "BYTESCALE_API_KEY",
    mimeTypes: [
      "image/jpeg", "image/png", "application/pdf"
    ],
    maxFileCount: 1,
    maxFileSizeBytes: 5 * 1024 * 1024,
    editor: {
      images: {
        crop: false,
        preview: true,
      }
    },
    styles: {
      colors: {
        primary: "#22c55e",
      }
    }
  };

  return (
    <>
      <UploadButton options={options}
        onComplete={handleChange}>
        {({onClick}) =>
          <IconButton
            size="small"
            onClick={onClick}
            disabled={loading}
            sx={{
              borderRadius: 1,
              color: "#fff",
              backgroundColor: "#22c55e",
              "&:hover": { backgroundColor: "#16a34a" },
              width: 32,
              height: 32,
            }}
          >
            {loading ? (
              <CircularProgress size={18} sx={{ color: "#fff" }} />
            ) : (
              <UploadFileIcon fontSize="small" />
            )}
          </IconButton>
        }
      </UploadButton>
    </>
  );
}
