import { useContext, useEffect, useRef, useState } from "react";
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
  const menuRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="flex">
      <div
        ref={menuRef}
        className={`bg-white shadow-md text-gray-800 fixed top-0 left-0 h-screen transition-transform duration-300 ease-in-out ${
          isOpen ? "w-64" : "w-16"
        }`}
      >
        <div className="relative mt-4">
          <button
            className={`absolute top-24 right-4 text-gray-800 text-2xl ${
              isOpen ? "text-gray-700" : "text-gray-500"
            }`}
            onClick={toggleSidebar}
            aria-label="Toggle sidebar"
          >
            {isOpen ? "×" : <FaBars />}
          </button>
        </div>

        <div className="mt-36">
          <div
            onClick={() => navigate("/dashboard")}
            className={`flex items-center py-3 px-4 cursor-pointer text-gray-800 hover:bg-gray-100 rounded-lg ${
              isOpen ? "justify-start" : "justify-center"
            }`}
          >
            <FaHome
              className={`text-2xl ${
                isOpen ? "text-[#0A043C]" : "text-gray-800"
              }`}
            />
            {isOpen && (
              <span className="ml-4 text-lg font-semibold text-gray-700">
                Home
              </span>
            )}
          </div>
          <div
            onClick={() => navigate("/adminProducts")}
            className={`flex items-center py-3 px-4 cursor-pointer text-gray-800 hover:bg-gray-100 rounded-lg ${
              isOpen ? "justify-start" : "justify-center"
            }`}
          >
            <AiFillProduct
              className={`text-2xl ${
                isOpen ? "text-[#0A043C]" : "text-gray-800"
              }`}
            />
            {isOpen && (
              <span className="ml-4 text-lg font-semibold text-gray-700">
                Products
              </span>
            )}
          </div>
          <div
            onClick={() => navigate("/adminUsers")}
            className={`flex items-center py-3 px-4 cursor-pointer text-gray-800 hover:bg-gray-100 rounded-lg ${
              isOpen ? "justify-start" : "justify-center"
            }`}
          >
            <FaUsers
              className={`text-2xl ${
                isOpen ? "text-[#0A043C]" : "text-gray-800"
              }`}
            />
            {isOpen && (
              <span className="ml-4 text-lg font-semibold text-gray-700">
                Users
              </span>
            )}
          </div>
          <div
            onClick={() => navigate("/adminOrders")}
            className={`flex items-center py-3 px-4 cursor-pointer text-gray-800 hover:bg-gray-100 rounded-lg ${
              isOpen ? "justify-start" : "justify-center"
            }`}
          >
            <GrDeliver
              className={`text-2xl ${
                isOpen ? "text-[#0A043C]" : "text-gray-800"
              }`}
            />
            {isOpen && (
              <span className="ml-4 text-lg font-semibold text-gray-700">
                Orders
              </span>
            )}
          </div>
          <div
            onClick={() => {
              handleLogout();
              navigate("/login");
            }}
            className={`flex items-center py-3 px-4 cursor-pointer text-gray-800 hover:bg-gray-100 rounded-lg ${
              isOpen ? "justify-start" : "justify-center"
            }`}
          >
            <FaSignOutAlt
              className={`text-2xl ${
                isOpen ? "text-[#0A043C]" : "text-gray-800"
              }`}
            />
            {isOpen && (
              <span className="ml-4 text-lg font-semibold text-gray-700">
                Logout
              </span>
            )}
          </div>
        </div>
      </div>
      <div
        className={`flex-1 transition-all duration-300 ease-in-out ${
          isOpen ? "ml-64" : "ml-16"
        }`}
      >
        {/* Main content goes here */}
      </div>
    </div>
  );
};

export default Sidebar;
