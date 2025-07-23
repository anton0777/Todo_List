import { useEffect, useState } from "react";
import {deleteTask, getTaskById, toggleTask, updateTask} from "../api/todo";
import { useNavigate } from "react-router-dom";
import { FaTrash } from "react-icons/fa";
import NewTaskForm from "./NewTaskForm";


export default function TaskDetails({ taskId }) {
    const [task, setTask] = useState(null);
    const [showForm, setShowForm] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        async function load() {
            try {
                const data = await getTaskById(taskId);
                setTask(data);
            } catch (err) {
                console.error("Failed to load task:", err);
            }
        }
        load();
    }, [taskId]);

    const handleToggle = async (sub) => {
        const updated = await toggleTask(sub.id, !sub.done);
        setTask({
            ...task,
            subtasks: task.subtasks.map((s) => (s.id === sub.id ? updated : s)),
        });
    };

    const handleDelete = async (sub) => {
        await deleteTask(sub.id);
        setTask({
            ...task,
            subtasks: task.subtasks.filter((t) => t.id !== sub.id),
        });
    };

    const handleFieldChange = async (field, value) => {
        const updated = { ...task, [field]: value };
        setTask(updated);
        try {
            await updateTask(task.id, { [field]: value });
        } catch (err) {
            console.error("Auto-save failed:", err);
        }
    };

    if (!task) return <div className="text-center mt-10 text-white">Loading...</div>;

    return (
        <div className="bg-white max-w-[360px] mx-auto mb-[100px] p-[45px] text-center shadow-[0_0_20px_rgba(0,0,0,0.2),0_5px_5px_rgba(0,0,0,0.24)]">
            <input
                value={task.title}
                onChange={(e) => handleFieldChange("title", e.target.value)}
                placeholder="Title"
                className="text-2xl font-bold mb-4 text-gray-800 w-full text-center outline-none border-none bg-transparent"
            />
            <hr/>
            <p className="text-sm text-gray-500 mb-4">
                Created at: {new Date(task.createdAt).toLocaleDateString()} {new Date(task.createdAt).toLocaleTimeString()}
            </p>
            <hr/>
            <textarea
                value={task.description}
                onChange={(e) => handleFieldChange("description", e.target.value)}
                placeholder="Description"
                rows={3}
                className="w-full text-sm text-gray-600 mb-4 outline-none border-none bg-transparent resize-none text-center"
            />
            <hr/>
            <p className="text-sm text-gray-500 mb-4">
                Status: <span className={task.done ? "text-green-500" : "text-red-500"}>{task.done ? "Done" : "Not done"}</span>
            </p>
            <div className="flex justify-between items-center mb-2">
                <h3 className="text-lg font-semibold text-gray-700">Subtasks</h3>
                <button
                    onClick={() => setShowForm(!showForm)}
                    className="flex items-center gap-1 text-sm text-green-600 hover:text-green-800"
                >
                    + Add Subtask
                </button>
            </div>
            {showForm && (
                <NewTaskForm
                    userId={task.userId}
                    parentId={task.id}
                    onCreated={(newSubtask) =>
                        setTask((prev) => ({
                            ...prev,
                            subtasks: [...prev.subtasks, newSubtask],
                        }))
                    }
                />
            )}
            {task.subtasks && task.subtasks.length > 0 ? (
                <div className="space-y-2">
                    {task.subtasks.map((sub) => (
                        <div
                            key={sub.id}
                            className="flex justify-between items-center bg-gray-50 p-3 rounded shadow-sm hover:shadow-md transition cursor-pointer"
                        >
                            <div className="flex items-center gap-3">
                                <input
                                    type="checkbox"
                                    checked={sub.done}
                                    onChange={(e) => {
                                        e.stopPropagation();
                                        handleToggle(sub);
                                    }}
                                    className="form-checkbox h-5 w-5 text-green-500"
                                />
                                <span onClick={() => navigate(`/task/${sub.id}`)} className={`text-gray-800 text-sm ${sub.done ? "line-through" : ""}`}>
                                    {sub.title}
                                </span>
                            </div>
                            <button
                                onClick={() => handleDelete(sub)}
                                className="text-red-500 hover:text-red-700"
                                title="Delete task"
                            >
                                <FaTrash />
                            </button>
                        </div>
                    ))}
                </div>
            ) : (
                <p className="text-gray-400">No subtasks</p>
            )}
        </div>
    );
}
