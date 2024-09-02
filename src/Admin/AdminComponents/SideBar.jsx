import { useContext, useState } from "react";
import { FaBars, FaHome, FaSignOutAlt } from "react-icons/fa";
import { GrDeliver } from "react-icons/gr";
import { FaUsers } from "react-icons/fa";
import { AiFillProduct } from "react-icons/ai";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../../Context/UserContext";

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { handleLogout } = useContext(UserContext);
  const navigate = useNavigate();


  return (
    <div className="flex">
      <div
        className={`bg-white text-gray-800 fixed top-0 right-0 h-screen transition-transform duration-300 ease-in-out border-r border-gray-300 ${
          isOpen ? "w-64" : "w-16"
        }`}
      >
        <button
          className="absolute top-4 left-4 text-2xl text-gray-800"
          onClick={() => setIsOpen(!isOpen)}
        >
          <FaBars />
        </button>
        <div className="mt-16">
          <div
            onClick={() => navigate("/dashboard")}
            className={`flex items-center py-2 px-4 cursor-pointer text-gray-800 hover:bg-gray-100 rounded ${
              isOpen ? "justify-start" : "justify-center"
            }`}
          >
            <FaHome className="mr-3 text-xl" />
            {isOpen && <span className="text-lg">Home</span>}
          </div>
          <div
            onClick={() => navigate("/adminProducts")}
            className={`flex items-center py-2 px-4 cursor-pointer text-gray-800 hover:bg-gray-100 rounded ${
              isOpen ? "justify-start" : "justify-center"
            }`}
          >
            <AiFillProduct className="mr-3 text-xl" />
            {isOpen && <span className="text-lg">Products</span>}
          </div>
          <div
            onClick={() => navigate("/adminUsers")}
            className={`flex items-center py-2 px-4 cursor-pointer text-gray-800 hover:bg-gray-100 rounded ${
              isOpen ? "justify-start" : "justify-center"
            }`}
          >
            <FaUsers className="mr-3 text-xl" />
            {isOpen && <span className="text-lg">Users</span>}
          </div>
          <div
            onClick={() => navigate("/adminOrders")}
            className={`flex items-center py-2 px-4 cursor-pointer text-gray-800 hover:bg-gray-100 rounded ${
              isOpen ? "justify-start" : "justify-center"
            }`}
          >
            <GrDeliver className="mr-3 text-xl" />
            {isOpen && <span className="text-lg">Orders</span>}
          </div>
          <div
            onClick={() => navigate("/login")}
            className={`flex items-center py-2 px-4 cursor-pointer text-gray-800 hover:bg-gray-100 rounded ${
              isOpen ? "justify-start" : "justify-center"
            }`}
          >
            <FaSignOutAlt className="mr-3 text-xl" onClick={handleLogout} />
            {isOpen && <span className="text-lg">Logout</span>}
          </div>
        </div>
      </div>
      <div
        className={`flex-1 transition-all duration-300 ease-in-out ${
          isOpen ? "ml-64" : "ml-16"
        }`}
      ></div>
    </div>
  );
};

export default Sidebar;
