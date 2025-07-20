import { Link } from "react-router-dom";

const NotFoundPage = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-[#8dc26f] via-[#76b852] to-[#8dc26f] font-['Roboto']">
      <section className="text-center flex flex-col justify-center items-center h-96">
        <h1 className="text-6xl font-bold mb-4">404 Not Found</h1>
        <p className="text-xl mb-5">This page does not exist</p>
        <Link
          to="/"
          className="text-white bg-green-700 hover:bg-green-900 px-3 py-2 mt-4"
        >
          Go Back
        </Link>
      </section>
    </div>
  );
};
export default NotFoundPage;
