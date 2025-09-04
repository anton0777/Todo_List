import {
  ListItemText, IconButton, Box, Paper, ImageListItem,
} from '@mui/material';
import ImageList from '@mui/material/ImageList';
import InsertDriveFileIcon from "@mui/icons-material/InsertDriveFile";
import PictureAsPdfIcon from "@mui/icons-material/PictureAsPdf";
import DownloadIcon from "@mui/icons-material/Download";
import DeleteIcon from "@mui/icons-material/Delete";
import CircularProgress from '@mui/material/CircularProgress';
import { getFileUrl } from "../api/files.jsx";
import { toast } from "react-toastify";

const formatBytes = (b) => {
  if (!b && b !== 0) return "";
  const u = ["B","KB","MB"];
  let i=0; let v=b;
  while (v>=1024 && i<u.length-1) { v/=1024; i++; }
  return `${v.toFixed( (i===0)?0:1 )} ${u[i]}`;
};

const iconByMime = (file) => {
  if (file.mimetype === "application_pdf" || file.mimetype === "application/pdf") return <PictureAsPdfIcon/>;
  if (file.mimetype === "image_png" || file.mimetype === "image/png" || file.mimetype === "image_jpeg" || file.mimetype === "image/jpeg")
    return <ImageList sx={{ width: 50, height: 50, overflowY: 'hidden' }}  cols={1} >
      <ImageListItem key={file.previewPath}>
        <img
          src={file.previewPath}
          loading="lazy"
        />
      </ImageListItem>
    </ImageList>;
  return <InsertDriveFileIcon/>;
};

export default function FileList({ files, onDelete, onDownload }) {
  const handleOpening = async (file) => {
    try {
      const { url } = await getFileUrl(file.id);
      window.open(url, "_blank", "noopener,noreferrer");
    } catch (err) {
      toast.error(err.message || "File opening error", { position: "top-center" });
    }
  };

  return (
    <Box>
      {files.map((file) => {
        const isReady = file.status === 'ready';
        return (
          <Paper
            key={file.id}
            elevation={2}
            onClick={() => isReady && handleOpening(file)}
            sx={{
              cursor: isReady ? 'pointer' : 'default',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              padding: 0.5,
              gap: 1,
              paddingLeft: 1.5,
              mt: 2,
              '&:hover': {
                boxShadow: 4,
              },
            }}
          >
            <Box sx={{ color: '#787878'}} >
              {isReady && iconByMime(file)}
              {!isReady &&
                <CircularProgress
                  size={18}
                  thickness={5}
                  sx={{
                    color: '#787878',
                }} />}
            </Box>
            <ListItemText
              primary={file.filename}
              secondary={
                isReady ? formatBytes(file.size) : "Processing…"
              }
            />

            <IconButton
              disabled={!isReady}
              onClick={(e) => {
                e.stopPropagation();
                onDownload?.(file);
              }}
              sx={{
                width: 40,
                height: 40,
                '&:hover': {
                  color: '#1eac29',
                },
              }}
            >
              <DownloadIcon />
            </IconButton>
            <IconButton
              disabled={!isReady}
              onClick={(e) => {
                e.stopPropagation();
                onDelete?.(file);
              }}
              sx={{
                width: 40,
                height: 40,
                '&:hover': {
                  color: '#c61818',
                },
              }}
            >
              <DeleteIcon />
            </IconButton>
          </Paper>
        )
      })}
    </Box>
  );
}
