import { FaTrash, FaPlus } from "react-icons/fa";
import { useLoaderData } from "react-router-dom";

const TaskPage = () => {
  const selectedTask = useLoaderData();
  const date = new Date(selectedTask.createdAt).toLocaleDateString();
  const time = new Date(selectedTask.createdAt).toLocaleTimeString("eu-EU", {
    hour: "2-digit",
    minute: "2-digit",
  });

  return (
    <div>
      {selectedTask && (
        <div className="mt-8 max-w-xl mx-auto bg-white p-6 shadow space-y-4">
          <h3 className="text-lg font-bold">{selectedTask.title} title</h3>
          <p>{selectedTask.description} description</p>
          <p className="text-sm text-gray-500">
            Created: {date} {time}
          </p>

          <div>
            <div className="flex justify-between items-center mb-2">
              <h4 className="font-semibold">Subtasks</h4>
              <FaPlus className="cursor-pointer text-[#4caf50]" />
            </div>
            <ul className="space-y-2">
              {selectedTask.subtasks &&
                selectedTask.subtasks.map((sub) => (
                  <li
                    key={sub.id}
                    className="bg-gray-100 p-3 flex justify-between items-center"
                  >
                    <span className="cursor-pointer">{sub.title}</span>
                    <FaTrash className="text-red-500 cursor-pointer" />
                  </li>
                ))}
            </ul>
          </div>

          {/* Edit form */}
          <form className="space-y-2">
            <input
              type="text"
              placeholder="Новое название"
              className="w-full bg-gray-100 px-4 py-2"
            />
            <textarea
              placeholder="Новое описание"
              className="w-full bg-gray-100 px-4 py-2"
            />
            <button className="w-full bg-[#4caf50] text-white py-2 uppercase text-sm hover:bg-[#43a047]">
              Сохранить
            </button>
          </form>
        </div>
      )}
    </div>
  );
};

const taskLoader = async ({ params }) => {
  const res = await fetch(`/api/todo/${params.id}`);
  console.log("Response from taskLoader:", res);
  const data = await res.json();
  return data;
};

export { TaskPage as default, taskLoader };
