import { Link } from "react-router-dom";
import { FaExclamationTriangle } from "react-icons/fa";

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-6">
      <div className="text-center">
        <FaExclamationTriangle className="text-red-500 text-6xl mb-4" />
        <h1 className="text-6xl font-bold text-gray-800">404</h1>
        <h2 className="text-2xl font-semibold text-gray-600 mt-2 mb-4">
          Oops! Page Not Found
        </h2>
        <p className="text-gray-500 mb-6">
          Sorry, the page you are looking for does not exist. It might have been moved or deleted.
        </p>
        <Link
          to="/"
          className="bg-gradient-to-r from-blue-500 to-green-500 text-white px-6 py-3 rounded-lg shadow-lg hover:from-blue-600 hover:to-green-600 transition duration-300 ease-in-out"
        >
          Return to Home
        </Link>
      </div>
    </div>
  );
}
