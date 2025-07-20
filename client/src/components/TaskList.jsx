import { FaTrash, FaPlus } from "react-icons/fa";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";

const TaskList = () => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTasks = async () => {
      const apiUrl = "/api/todo";
      try {
        const res = await fetch(apiUrl);
        const data = await res.json();
        setTasks(data);
      } catch (error) {
        console.log("Error fetching data", error);
      } finally {
        setLoading(false);
      }
    };

    fetchTasks();
  }, []);

  return (
    <div className="mt-8 max-w-xl mx-auto">
      <div className="flex justify-between items-center text-white mb-4">
        <h2 className="text-xl">Tasks</h2>
        <FaPlus className="cursor-pointer m-1" />
      </div>
      <ul className="space-y-2">
        {tasks.map((task) => (
          <li
            key={task.id}
            className="bg-white p-4 shadow flex justify-between items-center"
          >
            <Link to={`/${task.id}`} className="cursor-pointer">
              {task.title} title
            </Link>
            <FaTrash className="text-red-500 cursor-pointer" />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TaskList;
