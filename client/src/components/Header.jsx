import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import SettingsModal from "./SettingsModal";
import { FaGear} from "react-icons/fa6";

export default function Header() {
    const { user } = useAuth();
    const [open, setOpen] = useState(false);

    return (
        <header className="bg-white shadow p-4 flex justify-between items-center">
            <h1 className="text-xl font-bold">Todo List</h1>
            <div className="flex items-center gap-2">
                <span className="text-gray-700">{user?.name}</span>
                <button
                    onClick={() => setOpen(true)}
                    className="text-gray-600 hover:text-gray-800"
                >
                    <FaGear />
                </button>
            </div>
            {open && <SettingsModal onClose={() => setOpen(false)} />}
        </header>
    );
}