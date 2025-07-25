import { fetchWithErrorHandling } from "./fetchWithErrorHandling";

const API = "/api/user";

export const loginUser = (credentials) =>
    fetchWithErrorHandling(API, {
        method: "POST",
        body: JSON.stringify({
            email: credentials.email,
            password: credentials.password,
        }),
    });

export const registerUser = (info) =>
    fetchWithErrorHandling(API, {
        method: "POST",
        body: JSON.stringify({
            email: info.email,
            password: info.password,
            name: info.name || undefined,
        }),
    });

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
