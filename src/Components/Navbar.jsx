import React, { useState } from "react";
import { GiRunningShoe } from "react-icons/gi";
import { FiShoppingCart } from "react-icons/fi";
import { FaUserCircle } from "react-icons/fa";
import { FaSearch } from "react-icons/fa";
import { MdMenu, MdClose } from "react-icons/md";
import { Link } from "react-router-dom";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <nav className="bg-gray-100 shadow-md">
      <div className=" mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          <div className="flex items-center">
            <GiRunningShoe className="text-red-700 text-3xl mr-2" />
            <Link to="/" className="text-3xl font-serif ">
              FOOTFUSION
            </Link>
          </div>

          <div className="hidden md:flex space-x-8 font-semibold">
            <Link
              to="/men"
              className="text-gray-700 hover:text-red-700 font-serif"
            >
              MEN
            </Link>
            <Link
              to="/women"
              className="text-gray-700 hover:text-red-700 font-serif"
            >
              WOMEN
            </Link>
            <Link
              to="/collection"
              className="text-gray-700 hover:text-red-700 font-serif"
            >
              COLLECTION
            </Link>
            <Link
              to="/contact"
              className="text-gray-700 hover:text-red-700 font-serif"
            >
              CONTACT
            </Link>
          </div>

          <div className="flex items-center space-x-4">
            <div className="relative">
              <input
                type="text"
                placeholder="Search..."
                className="pl-10 pr-4 py-2 rounded-full text-black w-[155px]"
              />

              <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
            </div>

            <div className="hidden md:flex space-x-4">
              <Link to="/cart"><FiShoppingCart className="text-3xl mr-2" /></Link>
              <span>0</span>
              <Link
                to="/login"
                className="bg-red-700 text-white font-serif px-4 py-2 rounded-lg hover:bg-red-600"
              >
                Login
              </Link>
              <Link
                to="/signup"
                className="bg-gray-700 text-white font-serif px-4 py-2 rounded-lg hover:bg-gray-600"
              >
                Sign in
              </Link>
              <FaUserCircle className="text-4xl mr-2" />
            </div>

            <div className="md:hidden flex items-center">
              <button onClick={toggleMenu}>
                {menuOpen ? (
                  <MdClose className="text-2xl" />
                ) : (
                  <MdMenu className="text-2xl" />
                )}
              </button>
            </div>
          </div>
        </div>

        {menuOpen && (
          <div className="md:hidden">
            <div className="flex flex-col space-y-4 py-2">
              <Link
                to="/men"
                className="text-gray-700 hover:text-red-700 font-serif"
              >
                MEN
              </Link>
              <Link
                to="/women"
                className="text-gray-700 hover:text-red-700 font-serif"
              >
                WOMEN
              </Link>
              <Link
                to="/collection"
                className="text-gray-700 hover:text-red-700 font-serif"
              >
                COLLECTION
              </Link>
              <Link
                to="/contact"
                className="text-gray-700 hover:text-red-700 font-serif"
              >
                CONTACT
              </Link>
              <FiShoppingCart className="text-3xl mr-2" />
              <Link
                to="/login"
                className="bg-red-700 text-white px-4 py-2 rounded-lg hover:bg-red-600 font-serif"
              >
                Login
              </Link>
              <Link
                to="/signup"
                className="bg-gray-700 text-white px-4 py-2 rounded-lg hover:bg-gray-600"
              >
                Sign in
              </Link>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
