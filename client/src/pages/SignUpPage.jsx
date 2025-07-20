import { Link } from "react-router-dom";

const SignUp = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-[#8dc26f] via-[#76b852] to-[#8dc26f] font-['Roboto']">
      <div className="w-[360px] bg-white p-12 text-center shadow-[0_0_20px_rgba(0,0,0,0.2),0_5px_5px_rgba(0,0,0,0.24)]">
        <form className="space-y-4">
          <input
            type="text"
            placeholder="Name"
            className="w-full px-4 py-3 text-sm bg-[#f2f2f2] border-none outline-none"
          />
          <input
            type="password"
            placeholder="Password"
            className="w-full px-4 py-3 text-sm bg-[#f2f2f2] border-none outline-none"
          />
          <input
            type="text"
            placeholder="Email address"
            className="w-full px-4 py-3 text-sm bg-[#f2f2f2] border-none outline-none"
          />
          <button
            type="submit"
            className="w-full bg-[#4caf50] text-white py-3 text-sm uppercase transition-all duration-300 hover:bg-[#43a047] focus:bg-[#43a047]"
          >
            Create
          </button>
          <p className="text-xs text-[#b3b3b3] mt-4">
            Already registered?{" "}
            <Link to="/login" className="text-[#4caf50] no-underline">
              Sign In
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default SignUp;
