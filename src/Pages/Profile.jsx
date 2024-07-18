import { useContext } from "react";
import { CgProfile } from "react-icons/cg";
import { Link } from "react-router-dom";
import { UserContext } from "../Context/UserContext";

const Profile = () => {
  const { handleLogout,isLoggedIn } = useContext(UserContext);
//   const currentUser = JSON.parse(localStorage.getItem("currentUser"));

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-200">
      <div className="bg-white shadow-2xl rounded-lg p-6 w-full max-w-md transform hover:scale-105 transition-transform duration-300 ease-in-out">
        <div className="text-center mb-6">
          <h1 className="text-3xl font-extrabold mb-4 text-gray-900">
            Profile
          </h1>
          <CgProfile className="text-5xl mx-auto text-gray-700 mb-4" />
          <h2 className="text-2xl font-poppins text-gray-800">
            {isLoggedIn?.fullName}
          </h2>
        </div>
        <div className="mb-6">
          <div className="mb-4">
            <label className="block text-sm font-poppins text-gray-600">
              Username:
            </label>
            <h2 className="text-xl font-poppins text-gray-900">
              {isLoggedIn?.fullName}
            </h2>
          </div>
          <div>
            <label className="block text-sm font-poppins text-gray-600">
              Email:
            </label>
            <h2 className="text-xl font-poppins text-gray-900">
              {isLoggedIn?.email}
            </h2>
          </div>
        </div>
        <div className="flex justify-between">
          <Link to="/collection">
            <button className="px-4 py-2 bg-[#131842] text-white rounded-lg shadow-md hover:bg-[#03506F] transition-colors duration-300">
              Go To Shop
            </button>
          </Link>
          <button
            onClick={handleLogout}
            className="px-4 py-2 bg-[#131842] text-white rounded-lg shadow-md hover:bg-red-600 transition-colors duration-300"
          >
            Logout
          </button>
        </div>
      </div>
    </div>
  );
};

export default Profile;
