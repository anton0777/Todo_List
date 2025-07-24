import { useEffect, useState } from "react";
import TaskItem from "./TaskItem";
import {fetchTasks, toggleTask, deleteTask} from "../api/todo";
import NewTaskForm from "./NewTaskForm";
import { useAuth } from "../context/AuthContext";

export default function TaskList() {
  const [tasks, setTasks] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const { user } = useAuth();

  useEffect(() => {
    fetchTasks().then(setTasks);
  }, []);

  const handleToggle = async (task) => {
    const updated = await toggleTask(task.id, !task.done);
    // task.done = !task.done; // Toggle the done status
    // const updated = await updateTask(task.id, task);
    setTasks(tasks.map((t) => (t.id === task.id ? updated : t)));
  };

  const handleDelete = async (task) => {
    await deleteTask(task.id);
    setTasks(tasks.filter((t) => t.id !== task.id));
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
                userId= {1}
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
