import LogIn from "./pages/LogInPage";
import SignUp from "./pages/SignUpPage";
import TasksPage from "./pages/TasksPage";
import TaskPage, { taskLoader } from "./pages/TaskPage";
import NotFoundPage from "./pages/NotFoundPage";
import {
  Route,
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider,
} from "react-router-dom";

const App = () => {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/">
        <Route index element={<TasksPage />} />
        <Route path="/login" element={<LogIn />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/:id" element={<TaskPage />} loader={taskLoader} />
        <Route path="*" element={<NotFoundPage />} />
      </Route>
    )
  );

  return <RouterProvider router={router} />;
};

export default App;
