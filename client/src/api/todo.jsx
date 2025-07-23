const API = "/api/todo";

export const fetchTasks = async () => {
    const token = localStorage.getItem("token");
    const res = await fetch(API, {
        headers: { Authorization: `Bearer ${token}` },
    });
    if (!res.ok) throw new Error("Failed to fetch tasks");
    return res.json();
};

export const getTaskById = async (id) => {
    const token = localStorage.getItem("token");
    const res = await fetch(`${API}/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
    });
    if (!res.ok) throw new Error("Failed to fetch task");
    return await res.json();
};

export const createTask = async (task) => {
    const token = localStorage.getItem("token");
    const res = await fetch(API, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(task),
    });
    if (!res.ok) throw new Error("Failed to create task");
    return await res.json();
};

export const updateTask = async (id, task) => {
    const token = localStorage.getItem("token");
    const res = await fetch(`${API}/${id}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(task),
    });
    if (!res.ok) throw new Error("Failed to update task");
    return res.json();
};

export const deleteTask = async (id) => {
    const token = localStorage.getItem("token");
    const res = await fetch(`${API}/${id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
    });
    if (!res.ok) throw new Error("Failed to delete task");
};

export const toggleTask = async (id, completed) => {
    return updateTask(id, { done: completed });
};
