import { fetchWithErrorHandling } from "./fetchWithErrorHandling";

const API = "/api/user";

export const getUser = (token) =>
    fetchWithErrorHandling(API, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });

export const updateUser = (id, data) =>
    fetchWithErrorHandling(`${API}/${id}`, {
        method: "PUT",
        body: JSON.stringify(data),
    });
