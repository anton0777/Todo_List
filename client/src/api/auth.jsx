const API = "/api/user";

export const loginUser = async (credentials) => {
    const res = await fetch(`${API}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            email: credentials.email,
            password: credentials.password,
        }),
    });
    if (!res.ok) throw new Error("Login failed");
    return res.json();
};

export const registerUser = async (info) => {
    const res = await fetch(`${API}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            email: info.email,
            password: info.password,
            name: info.name || undefined,
        }),
    });
    if (!res.ok) throw new Error("Register failed");
    return res.json();
};

export const getUser = async (token) => {
    const res = await fetch(`${API}`, {
        headers: { Authorization: `Bearer ${token}` },
    });
    if (!res.ok) throw new Error("Unauthorized");
    return res.json();
};

export const updateUser = async (id, data) => {
    const token = localStorage.getItem("token");
    const res = await fetch(`${API}/${id}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(data),
    });
    if (!res.ok) throw new Error("Update failed");
    return res.json();
};