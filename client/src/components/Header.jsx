import { FaCog } from "react-icons/fa";
import { useState } from "react";

const Header = ({ user }) => {
  const [showSettings, setShowSettings] = useState(false);

  return (
    <div className="bg-white shadow-md p-4 flex justify-between items-center max-w-xl mx-auto">
      <span className="text-lg font-semibold">{user.name}</span>
      <div className="relative">
        <FaCog
          className="cursor-pointer"
          onClick={() => setShowSettings(!showSettings)}
        />
        {showSettings && (
          <div className="absolute right-0 mt-2 bg-white shadow-md text-sm p-3 w-52 z-10">
            <button className="block w-full text-left text-[#4caf50] hover:underline">
              Change name
            </button>
            <button className="block w-full text-left text-[#4caf50] hover:underline">
              Change password
            </button>
            <button className="block w-full text-left text-red-500 hover:underline">
              Log out
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Header;
