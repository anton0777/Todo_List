import { useParams } from "react-router-dom";
import TaskDetails from "../components/TaskDetails";

export default function TaskPage() {
  const { id } = useParams();
  return (
      <div className="min-h-screen bg-gray-100 p-4">
        <TaskDetails taskId={id} />
      </div>
  );
}