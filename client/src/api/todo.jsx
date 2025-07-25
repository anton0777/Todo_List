import { fetchWithErrorHandling } from "./fetchWithErrorHandling";

const API = "/api/todo";

export const fetchTasks = () => fetchWithErrorHandling(API);

export const getTaskById = (id) =>
    fetchWithErrorHandling(`${API}/${id}`);

export const createTask = (task) =>
    fetchWithErrorHandling(API, {
        method: "POST",
        body: JSON.stringify(task),
    });

export const updateTask = (id, task) =>
    fetchWithErrorHandling(`${API}/${id}`, {
        method: "PUT",
        body: JSON.stringify(task),
    });

export const deleteTask = (id) =>
    fetchWithErrorHandling(`${API}/${id}`, {
        method: "DELETE",
    });