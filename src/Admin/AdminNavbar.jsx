import { useState } from "react";
import { GiRunningShoe } from "react-icons/gi";
import { RiAdminFill } from "react-icons/ri";
import UserDetails from "./UserDetails";
import ProductDetails from "./ProductDetails";
import Dashboard from "./Dashboard";
import { useNavigate } from "react-router-dom";

const AdminNavbar = () => {
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [adminDropdownOpen, setAdminDropdownOpen] = useState(false);
  const [currentView, setCurrentView] = useState("home");

  const userAdmin = JSON.parse(localStorage.getItem("currentUser"));
  console.log(userAdmin);
  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  
  const toggleAdminDropdown = () => {
    setAdminDropdownOpen(!adminDropdownOpen);
  };

  const handleLogout = () => {
    localStorage.removeItem("isAdmin");
    localStorage.removeItem("admin");
    navigate("/");
  };

  return (
    <div className="flex h-screen bg-gradient-to-r from-blue-50 to-indigo-100">
      <nav className="bg-white shadow-lg fixed top-0 left-0 w-full z-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center space-x-2 cursor-pointer">
              <GiRunningShoe className="text-red-700 text-3xl" />
              <span className="text-2xl font-serif font-bold text-gray-800">
                FootFusion
              </span>
            </div>
            <div className="flex items-center space-x-4 relative">
              <div className="flex items-center relative">
                <button
                  onClick={toggleAdminDropdown}
                  className="text-gray-800 focus:outline-none"
                >
                  <RiAdminFill className="text-xl  cursor-pointer" />
                </button>
                {adminDropdownOpen && (
                  <div className="absolute right-0 top-8 w-56 bg-white border border-gray-200 shadow-lg py-4 rounded-lg">
                    <h3 className="block px-4 py-2 text-gray-800 text-sm font-medium">
                      {userAdmin.name}
                    </h3>
                    <p className="block px-4 pb-2 text-gray-600 text-xs">
                      {userAdmin.email}
                    </p>
                    <button
                      onClick={handleLogout}
                      className="block w-full text-left px-4 py-2 text-sm text-gray-800 hover:bg-gray-100 transition duration-200"
                    >
                      Logout
                    </button>
                  </div>
                )}
              </div>

              <button
                onClick={toggleSidebar}
                className="text-2xl text-gray-800 focus:outline-none"
              >
                ☰
              </button>
            </div>
          </div>
        </div>
      </nav>

      <div
        className={`fixed inset-0 bg-gray-800 bg-opacity-50 z-20 transition-opacity duration-300 ${
          sidebarOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
        onClick={toggleSidebar}
      ></div>

      <div
        className={`pt-8 fixed top-0 right-0 w-64 bg-white h-full z-30 transform shadow-lg transition-transform duration-300 ease-in-out ${
          sidebarOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <ul className="mt-16 space-y-2">
          <h1 className="text-4xl font-bold text-center text-gray-800 mt-8 mb-4">
            Admin
          </h1>

          <li
            className="px-4 py-2 cursor-pointer hover:bg-indigo-100 text-gray-800 font-medium"
            onClick={() => {
              setCurrentView("home");
              toggleSidebar();
            }}
          >
            Dashboard
          </li>
          <li
            className="px-4 py-2 cursor-pointer hover:bg-indigo-100 text-gray-800 font-medium"
            onClick={() => {
              setCurrentView("users");
              toggleSidebar();
            }}
          >
            Users
          </li>
          <li
            className="px-4 py-2 cursor-pointer hover:bg-indigo-100 text-gray-800 font-medium"
            onClick={() => {
              setCurrentView("products");
              toggleSidebar();
            }}
          >
            Products
          </li>
        </ul>
      </div>

      <div
        className={`flex-1 pt-20 transition-transform duration-300 ease-in-out ${
          sidebarOpen ? "pr-64" : ""
        }`}
      >
        {currentView === "home" && (
          <div className="p-4 text-gray-800">
            <Dashboard />
          </div>
        )}
        {currentView === "users" && (
          <div className="p-4">
            <UserDetails />
          </div>
        )}
        {currentView === "products" && (
          <div className="p-4">
            <ProductDetails />
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminNavbar;
