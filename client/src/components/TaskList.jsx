import { useEffect, useState } from "react";
import TaskItem from "./TaskItem";
import {fetchTasks, updateTask, deleteTask} from "../api/todo";
import NewTaskForm from "./NewTaskForm";
import { useAuth } from "../context/AuthContext";
import { toast } from "react-toastify";

export default function TaskList() {
  const [tasks, setTasks] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const { user } = useAuth();

  useEffect(() => {
    try {
      fetchTasks().then(setTasks);
    } catch (err) {
      console.error("Error:", err.message, err.meta);
      toast.error(err.message, {
        position: "top-center"
      });
    }
  }, []);

  const handleToggle = async (task) => {
    try {
      task.done = !task.done;
      const updated = await updateTask(task.id, task);
      setTasks(tasks.map((t) => (t.id === task.id ? updated : t)));
    } catch (err) {
      console.error("Error:", err.message, err.meta);
      toast.error(err.message, {
        position: "top-center"
      });
    }
  };

  const handleDelete = async (task) => {
    try {
      await deleteTask(task.id);
      setTasks(tasks.filter((t) => t.id !== task.id));
      toast.success("Task deleted", {
        position: "top-center"
      });
    } catch (err) {
      console.error("Error:", err.message, err.meta);
      toast.error(err.message, {
        position: "top-center"
      });
    }
  };

  return (
      <div className="max-w mx-auto mt-6">
        <div className="flex justify-end mb-4">
          <button
              onClick={() => setShowForm(!showForm)}
              className="flex items-center gap-2 bg-green-500 hover:bg-green-600 text-white px-3 py-2 rounded text-sm"
          >
            + Add Task
          </button>
        </div>
        {showForm && (
            <NewTaskForm
                // userId= {user.id}
                // userId= {1}
                userId={8}
                onCreated={(newTask) => setTasks((prev) => [...prev, newTask])}
            />
        )}
        {tasks.map((task) => (
            <TaskItem
                key={task.id}
                task={task}
                onToggle={handleToggle}
                onDelete={handleDelete}
            />
        ))}
      </div>
  );
}
