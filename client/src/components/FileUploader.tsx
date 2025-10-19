import Uppy from '@uppy/core';
import {
  Dropzone,
  FilesGrid,
  UploadButton,
  UppyContextProvider,
} from '@uppy/react';
import { IconButton, CircularProgress } from '@mui/material';
import UploadFileIcon from '@mui/icons-material/UploadFile';
import { toast } from 'react-toastify';
import {
  presignUpload,
  attachFile,
  uploadToPresignedUrl,
} from '../api/files.jsx';
import '@uppy/react/css/style.css';
import React from 'react';

export default function FileUploader({ taskId }: { taskId: number }) {
  const uppy = new Uppy({
    autoProceed: false,
    restrictions: {
      maxNumberOfFiles: 3,
      allowedFileTypes: ['image/jpeg', 'image/png', 'application/pdf'],
      maxFileSize: 5 * 1024 * 1024,
    },
  });

  uppy.addUploader(async (fileIDs) => {
    for (const id of fileIDs) {
      const file = uppy.getFile(id);
      if (!file) continue;

      try {
        const { uploadUrl, objectKey } = await presignUpload({
          filename: file.name,
          mimetype: file.type,
          size: file.size,
        });

        await uploadToPresignedUrl(uploadUrl, file.data);

        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        //@ts-expect-error
        taskId = parseInt(taskId);
        const created = await attachFile({
          taskId,
          objectKey,
          filename: file.name,
          mimetype: file.type,
          size: file.size,
        });

        uppy.emit('upload-success', file, { status: 200, body: created });

        uppy.removeFile(id);

        toast.success('File uploaded', { position: 'top-center' });
      } catch (err: any) {
        uppy.emit('upload-error', file, err);

        toast.error(err?.message || 'Upload error', {
          position: 'top-center',
        });
      }
    }
  });

  return (
    <UppyContextProvider uppy={uppy}>
      <UploadButton>
        {({ onClick, uploadState }) => (
          <IconButton
            size="small"
            onClick={onClick}
            disabled={uploadState?.isUploading}
            sx={{
              borderRadius: 1,
              color: '#fff',
              backgroundColor: '#22c55e',
              '&:hover': { backgroundColor: '#16a34a' },
              width: 32,
              height: 32,
            }}
          >
            {uploadState?.isUploading ? (
              <CircularProgress size={18} sx={{ color: '#fff' }} />
            ) : (
              <UploadFileIcon fontSize="small" />
            )}
          </IconButton>
        )}
      </UploadButton>
      <Dropzone />
      <FilesGrid columns={3} />
    </UppyContextProvider>
  );
}
