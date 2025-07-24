import { Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import TaskPage from "./pages/TaskPage";
import ProtectedRoute from "./routes/ProtectedRoute";
import NotFoundPage from "./pages/NotFoundPage";

function App() {
    return (
        <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route
                path="/"
                element={
                    // <ProtectedRoute>
                        <Dashboard />
                    // </ProtectedRoute>
                }
            />
            <Route
                path="/task/:id"
                element={
                    // <ProtectedRoute>
                        <TaskPage />
                    // </ProtectedRoute>
                }
            />
            <Route
                path="*"
                element={<NotFoundPage />}
            />
        </Routes>
    );
}

export default App;