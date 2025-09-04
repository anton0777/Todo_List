import { useRef, useState } from "react";
import { IconButton, CircularProgress } from "@mui/material";
import UploadFileIcon from "@mui/icons-material/UploadFile";
import { toast } from "react-toastify";
import {
  presignUpload,
  uploadToPresignedUrl,
  attachFile,
} from "../api/files.jsx";

const ACCEPT = ["image/jpeg", "image/png", "application/pdf"];
const MAX_BYTES = 5 * 1024 * 1024;

export default function FileUploader({ taskId }) {
  const inputRef = useRef(null);
  const [loading, setLoading] = useState(false);

  const handleClick = () => inputRef.current?.click();

  const handleChange = async (e) => {
    const file = e.target.files?.[0];
    e.target.value = "";

    if (!file) return;
    if (!ACCEPT.includes(file.type)) {
      toast.error("Only JPG, PNG or PDF allowed", { position: "top-center" });
      return;
    }
    if (file.size > MAX_BYTES) {
      toast.error("Max file size is 5MB", { position: "top-center" });
      return;
    }

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
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <input
        ref={inputRef}
        type="file"
        accept={ACCEPT.join(",")}
        onChange={handleChange}
        style={{ display: "none" }}
      />
      <span>
        <IconButton
          size="small"
          onClick={handleClick}
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
      </span>
    </>
  );
}
