import { useState } from "react";
import { createTask } from "../api/todo";
import { toast } from "react-toastify";

export default function NewTaskForm({ userId, parentId = undefined, onCreated }) {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const newTask = await createTask({ title, description, userId, parentId });
            onCreated(newTask);
            setTitle("");
            setDescription("");
            toast.success("Task created", {
                position: "top-center"
            });
        } catch (err) {
            console.error("Error:", err.message, err.meta);
            toast.error(err.message, {
                position: "top-center"
            });
        } finally {
            setLoading(false);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="mt-4 p-4 bg-gray-50 rounded shadow-sm">
            <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Task title"
                required
                className="w-full p-2 mb-2 border rounded text-sm"
            />
            <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Description"
                className="w-full p-2 mb-2 border rounded text-sm"
                rows={2}
            />
            <button
                type="submit"
                disabled={loading}
                className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 text-sm rounded w-full"
            >
                {loading ? "Adding..." : "Add Task"}
            </button>
        </form>
    );
}
