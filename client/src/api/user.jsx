import { fetchWithErrorHandling } from "./fetchWithErrorHandling";

const API = "/api/user";

export const getUser = (token) =>
    fetchWithErrorHandling(API, {
        method: "GET",
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });

export const updateUser = (id, data) =>
    fetchWithErrorHandling(API, {
        method: "PUT",
        body: JSON.stringify(data),
    });
