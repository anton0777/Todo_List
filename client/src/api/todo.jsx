import { fetchWithErrorHandling } from './fetchWithErrorHandling';

const API = '/api/todo';

export const fetchTasks = () =>
  fetchWithErrorHandling(API, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${localStorage.getItem('token')}`,
    },
  });

export const getTaskByUserId = (id) =>
  fetchWithErrorHandling(`${API}/${id}`, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${localStorage.getItem('token')}`,
    },
  });

export const createTask = (task) =>
  fetchWithErrorHandling(API, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${localStorage.getItem('token')}`,
    },
    body: JSON.stringify(task),
  });

export const updateTask = (id, task) =>
  fetchWithErrorHandling(`${API}/${id}`, {
    method: 'PUT',
    headers: {
      Authorization: `Bearer ${localStorage.getItem('token')}`,
    },
    body: JSON.stringify(task),
  });

export const deleteTask = (id) =>
  fetchWithErrorHandling(`${API}/${id}`, {
    method: 'DELETE',
    headers: {
      Authorization: `Bearer ${localStorage.getItem('token')}`,
    },
  });
