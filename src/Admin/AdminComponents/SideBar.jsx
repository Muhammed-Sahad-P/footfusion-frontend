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
        className={`bg-white text-gray-800 fixed top-0 left-0 h-screen transition-transform duration-300 ease-in-out border-r border-gray-300 ${
          isOpen ? "w-64" : "w-16"
        }`}
      >
        <div className="mt-24">
          <div>
            <button
              className="absolute mr-4 text-2xl text-gray-800"
              onClick={toggleSidebar}
            >
              <FaBars />
            </button>
          </div>

          <div
            onClick={() => navigate("/dashboard")}
            className={`flex items-center py-2 px-4 cursor-pointer text-gray-800 hover:bg-gray-100 rounded ${
              isOpen ? "justify-start" : "justify-center"
            }`}
          >
            <FaHome
              className={`mt-10 mr-4 text-xl ${
                isOpen ? "text-[#0A043C]" : "text-gray-800"
              }`}
            />
            <div className={`flex flex-col ${isOpen ? "mt-2" : "mt-0"}`}>
              {isOpen && (
                <span className="mt-10 text-lg font-semibold text-gray-700">
                  Home
                </span>
              )}
            </div>
          </div>
          <div
            onClick={() => navigate("/adminProducts")}
            className={`flex items-center py-2 px-4 cursor-pointer text-gray-800 hover:bg-gray-100 rounded ${
              isOpen ? "justify-start" : "justify-center"
            }`}
          >
            <AiFillProduct
              className={`mt-4 mr-4 text-xl ${
                isOpen ? "text-[#0A043C]" : "text-gray-800"
              }`}
            />
            <div className={`flex flex-col ${isOpen ? "mt-2" : "mt-0"}`}>
              {isOpen && (
                <span className="mt-4 text-lg font-semibold text-gray-700">
                  Products
                </span>
              )}
            </div>
          </div>
          <div
            onClick={() => navigate("/adminUsers")}
            className={`flex items-center py-2 px-4 cursor-pointer text-gray-800 hover:bg-gray-100 rounded ${
              isOpen ? "justify-start" : "justify-center"
            }`}
          >
            <FaUsers
              className={`mt-4 mr-4 text-xl ${
                isOpen ? "text-[#0A043C]" : "text-gray-800"
              }`}
            />
            <div className={`flex flex-col ${isOpen ? "mt-2" : "mt-0"}`}>
              {isOpen && (
                <span className="mt-4 text-lg font-semibold text-gray-700">
                  Users
                </span>
              )}
            </div>
          </div>
          <div
            onClick={() => navigate("/adminOrders")}
            className={`flex items-center py-2 px-4 cursor-pointer text-gray-800 hover:bg-gray-100 rounded ${
              isOpen ? "justify-start" : "justify-center"
            }`}
          >
            <GrDeliver
              className={`mt-4 mr-4 text-xl ${
                isOpen ? "text-[#0A043C]" : "text-gray-800"
              }`}
            />
            <div className={`flex flex-col ${isOpen ? "mt-2" : "mt-0"}`}>
              {isOpen && (
                <span className="mt-4 text-lg font-semibold text-gray-700">
                  Orders
                </span>
              )}
            </div>
          </div>
          <div
            onClick={() => {
              handleLogout();
              navigate("/login");
            }}
            className={`flex items-center py-2 px-4 cursor-pointer text-gray-800 hover:bg-gray-100 rounded ${
              isOpen ? "justify-start" : "justify-center"
            }`}
          >
            <FaSignOutAlt
              className={`mt-4 mr-4 text-xl ${
                isOpen ? "text-[#0A043C]" : "text-gray-800"
              }`}
            />
            <div className={`flex flex-col ${isOpen ? "mt-2" : "mt-0"}`}>
              {isOpen && (
                <span className="mt-4 text-lg font-semibold text-gray-700">
                  Logout
                </span>
              )}
            </div>
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
