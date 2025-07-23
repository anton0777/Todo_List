import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { updateUser } from "../api/auth";

export default function SettingsModal({ onClose }) {
    const { logout, user } = useAuth();
    const [form, setForm] = useState({ username: "", password: "" });
    const [saving, setSaving] = useState(false);

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSave = async () => {
        try {
            setSaving(true);
            await updateUser(user.id, form);
            alert("Changes saved");
            onClose();
        } catch (err) {
            alert("Failed to save changes");
        } finally {
            setSaving(false);
        }
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50">
            <div className="bg-white max-w-[360px] w-full p-[45px] text-center shadow-[0_0_20px_rgba(0,0,0,0.2),0_5px_5px_rgba(0,0,0,0.24)] rounded">
                <h2 className="text-2xl font-bold mb-4 text-gray-800">User Settings</h2>
                <input
                    name="username"
                    type="text"
                    placeholder="New username"
                    value={form.username}
                    onChange={handleChange}
                    className="bg-gray-100 w-full mb-4 p-4 text-sm outline-none"
                />
                <input
                    name="password"
                    type="password"
                    placeholder="New password"
                    value={form.password}
                    onChange={handleChange}
                    className="bg-gray-100 w-full mb-4 p-4 text-sm outline-none"
                />
                <div className="flex justify-between mt-6">
                    <button
                        onClick={handleSave}
                        disabled={saving}
                        className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 text-sm uppercase rounded w-[100px]"
                    >
                        {saving ? "Saving..." : "Save"}
                    </button>
                    <button
                        onClick={logout}
                        className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 text-sm uppercase rounded w-[100px]"
                    >
                        Logout
                    </button>
                    <button
                        onClick={onClose}
                        className="border text-gray-700 px-4 py-2 text-sm uppercase rounded w-[100px]"
                    >
                        Close
                    </button>
                </div>
            </div>
        </div>
    );
}