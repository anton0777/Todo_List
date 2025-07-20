import TaskList from "../components/TaskList";
import Header from "../components/Header";

const TodoPage = () => {
  const user = { name: "Username" };

  return (
    <div className="min-h-screen font-['Roboto'] bg-gradient-to-r from-[#8dc26f] via-[#76b852] to-[#8dc26f] p-6">
      <Header user={user} />
      <TaskList />
    </div>
  );
};

export default TodoPage;
