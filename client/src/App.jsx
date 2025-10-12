import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import TaskPage from './pages/TaskPage';
import ProtectedRoute from './routes/ProtectedRoute';
import NotFoundPage from './pages/NotFoundPage';
import { ToastContainer } from 'react-toastify';
import { AuthProvider } from './components/AuthProvider.jsx';
import { WsProvider } from './context/WsContext';

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <WsProvider>
          <ToastContainer />
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route
              path="/"
              element={
                <ProtectedRoute>
                  <Dashboard />
                </ProtectedRoute>
              }
            />
            <Route
              path="/task/:id"
              element={
                <ProtectedRoute>
                  <TaskPage />
                </ProtectedRoute>
              }
            />
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </WsProvider>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
