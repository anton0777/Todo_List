import { fetchWithErrorHandling } from "./fetchWithErrorHandling";

const API = "/api/auth";

export const loginUser = (credentials) =>
    fetchWithErrorHandling(`${API}/login`, {
        method: "POST",
        body: JSON.stringify({
            email: credentials.email,
            password: credentials.password,
        }),
    });

export const registerUser = (info) =>
    fetchWithErrorHandling(`${API}/register`, {
        method: "POST",
        body: JSON.stringify({
            email: info.email,
            password: info.password,
            name: info.name || undefined,
        }),
    });