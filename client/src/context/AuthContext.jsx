import { createContext, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { loginUser, registerUser } from "../api/auth";
import { getUser } from "../api/user";
import { toast } from "react-toastify";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem("token");
        if (token) {
            getUser(token).then(setUser).finally(() => setLoading(false));
        } else {
            setLoading(false);
        }
    }, []);

    const login = async (credentials) => {
      const data = await loginUser(credentials);
      localStorage.setItem("token", data.token);
      setUser(data);
      navigate("/");
    };

    const register = async (info) => {
      const data = await registerUser(info);
      localStorage.setItem("token", data.token);
      setUser(data);
      navigate("/");
    };

    const logout = () => {
        try {
            localStorage.removeItem("token");
            setUser(null);
            navigate("/login");
        } catch (err) {
            console.error(err.meta ? err.meta : err);
            toast.error(err.message, {
                position: "top-center",
            });
        }
    };

    return (
        <AuthContext.Provider value={{ user, setUser, login, register, logout }}>
        {!loading && children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);