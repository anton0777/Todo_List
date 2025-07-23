import Header from "../components/Header";
import TaskList from "../components/TaskList";

export default function Dashboard() {
    return (
        <div className="min-h-screen bg-gray-100">
            <Header />
            <main className="p-4">
                <TaskList />
            </main>
        </div>
    );
}
