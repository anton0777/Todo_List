import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { Link } from "react-router-dom";

export default function Register() {
  const { register } = useAuth();
  const [form, setForm] = useState({ email: "", password: "", name: "" });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    register(form);
  };

  return (
      <div className="w-[360px] pt-[8%] mx-auto">
        <form
            onSubmit={handleSubmit}
            className="bg-white max-w-[360px] mx-auto mb-[100px] p-[45px] text-center shadow-[0_0_20px_rgba(0,0,0,0.2),0_5px_5px_rgba(0,0,0,0.24)]"
        >
          <h2 className="text-2xl font-bold mb-4 text-gray-800">Register</h2>
          <input
              name="name"
              type="text"
              placeholder="Your Name (optional)"
              value={form.name}
              onChange={handleChange}
              className="bg-gray-100 w-full mb-4 p-4 text-sm outline-none"
          />
          <input
              name="email"
              type="email"
              placeholder="Email"
              value={form.email}
              onChange={handleChange}
              className="bg-gray-100 w-full mb-4 p-4 text-sm outline-none"
              required
          />
          <input
              name="password"
              type="password"
              placeholder="Password"
              value={form.password}
              onChange={handleChange}
              className="bg-gray-100 w-full mb-4 p-4 text-sm outline-none"
              required
          />
          <button
              type="submit"
              className="uppercase w-full bg-green-500 hover:bg-green-600 text-white p-4 text-sm transition-all"
          >
            Register
          </button>
          <p className="mt-4 text-sm text-gray-400">
            Already have an account?{" "}
            <Link to="/login" className="text-green-500 hover:underline">
              Log in
            </Link>
          </p>
        </form>
      </div>
  );
}
