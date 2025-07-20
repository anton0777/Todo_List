import { Link } from "react-router-dom";

const LogIn = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-[#8dc26f] via-[#76b852] to-[#8dc26f] font-['Roboto']">
      <form className="w-[360px] p-12 bg-white text-center shadow-[0_0_20px_rgba(0,0,0,0.2),0_5px_5px_rgba(0,0,0,0.24)]">
        <input
          type="text"
          placeholder="Username"
          className="w-full mb-4 px-4 py-3 text-sm bg-[#f2f2f2] outline-none border-none"
        />
        <input
          type="password"
          placeholder="Password"
          className="w-full mb-4 px-4 py-3 text-sm bg-[#f2f2f2] outline-none border-none"
        />
        <button
          type="submit"
          className="w-full bg-[#4caf50] text-white py-3 text-sm uppercase transition-all duration-300 hover:bg-[#43a047] focus:bg-[#43a047]"
        >
          Login
        </button>
        <p className="mt-4 text-xs text-[#b3b3b3]">
          Not registered?{" "}
          <Link to="/signup" className="text-[#4caf50] no-underline">
            Create an account
          </Link>
        </p>
      </form>
    </div>
  );
};

export default LogIn;
