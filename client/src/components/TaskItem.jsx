import { useNavigate } from "react-router-dom";
import { FaTrash } from "react-icons/fa";

export default function TaskItem({ task, onToggle, onDelete }) {
    const navigate = useNavigate();

    return (
        <div className="flex justify-between items-center bg-white p-4 mb-2 rounded shadow-sm hover:shadow-md transition-all">
            <div className="flex items-center gap-3">
                <input
                    type="checkbox"
                    checked={task.done}
                    onChange={() => onToggle(task)}
                    className="form-checkbox h-5 w-5 text-green-500"
                />
                <div
                    className="cursor-pointer"
                    onClick={() => navigate(`/task/${task.id}`)}
                >
                    <h3 className={`font-medium text-gray-800 ${task.done ? "line-through" : ""}`}>
                        {task.title}
                    </h3>
                </div>
            </div>
            <button
                onClick={() => onDelete(task)}
                className="text-red-500 hover:text-red-700"
                title="Delete task"
            >
                <FaTrash />
            </button>
        </div>
    );
}
