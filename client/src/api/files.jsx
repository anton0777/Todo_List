import { fetchWithErrorHandling } from './fetchWithErrorHandling';

const API = '/api/files';

export const presignUpload = ({ filename, mimetype, size }) =>
  fetchWithErrorHandling(`${API}/presign`, {
    method: 'POST',
    body: JSON.stringify({ filename, mimetype, size }),
  });

export const attachFile = ({ taskId, objectKey, filename, mimetype, size }) =>
  fetchWithErrorHandling(`${API}/attach`, {
    method: 'POST',
    body: JSON.stringify({ taskId, objectKey, filename, mimetype, size }),
  });

export const listFilesByTask = (taskId) =>
  fetchWithErrorHandling(`${API}/by-task/${taskId}`);

export const getFileUrl = (fileId) =>
  fetchWithErrorHandling(`${API}/${fileId}/url`);

export const deleteAttachment = (fileId) =>
  fetchWithErrorHandling(`${API}/${fileId}`, { method: 'DELETE' });

export const uploadToPresignedUrl = async (uploadUrl, file) => {
  const res = await fetch(uploadUrl, {
    method: 'PUT',
    headers: { 'Content-Type': file.type },
    body: file,
  });
  if (!res.ok) {
    throw new Error(`Upload failed: ${res.status}`);
  }
};

export const getFile = async (url) => {
  const res = await fetch(url);
  if (!res.ok) {
    throw new Error(`File fetch failed: ${res.status}`);
  }
};
