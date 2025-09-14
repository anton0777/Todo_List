import { ListItemText, IconButton, Box, Paper } from '@mui/material';
import InsertDriveFileIcon from '@mui/icons-material/InsertDriveFile';
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';
import ImageIcon from '@mui/icons-material/Image';
import DownloadIcon from '@mui/icons-material/Download';
import DeleteIcon from '@mui/icons-material/Delete';
import { getFileUrl } from '../api/files.jsx';
import { toast } from 'react-toastify';

const formatBytes = (b) => {
  if (!b && b !== 0) return '';
  const u = ['B', 'KB', 'MB'];
  let i = 0;
  let v = b;
  while (v >= 1024 && i < u.length - 1) {
    v /= 1024;
    i++;
  }
  return `${v.toFixed(i === 0 ? 0 : 1)} ${u[i]}`;
};

const iconByMime = (m) => {
  if (m === 'application_pdf' || m === 'application/pdf')
    return <PictureAsPdfIcon />;
  if (m === 'image_png' || m === 'image/png') return <ImageIcon />;
  if (m === 'image_jpeg' || m === 'image/jpeg') return <ImageIcon />;
  return <InsertDriveFileIcon />;
};

export default function FileList({ files, onDelete, onDownload }) {
  const handleOpening = async (file) => {
    try {
      const { url } = await getFileUrl(file.id);
      window.open(url, '_blank', 'noopener,noreferrer');
    } catch (err) {
      toast.error(err.message || 'File opening error', {
        position: 'top-center',
      });
    }
  };

  return (
    <Box>
      {files.map((file) => (
        <Paper
          key={file.id}
          elevation={2}
          onClick={() => handleOpening(file)}
          sx={{
            cursor: 'pointer',
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
          <Box sx={{ color: '#787878' }}>{iconByMime(file.mimetype)}</Box>
          <ListItemText
            primary={file.filename}
            secondary={formatBytes(file.size)}
          />

          <IconButton
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
      ))}
    </Box>
  );
}
