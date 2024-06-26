import React, { useState } from "react";
import { GiRunningShoe, GiShoppingCart } from "react-icons/gi";
import { GrUserAdmin, GrSearch } from "react-icons/gr";
import { MdMenu, MdClose } from "react-icons/md";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <nav className="bg-gray-100 shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          <div className="flex items-center">
            <GiRunningShoe className="text-red-700 text-3xl mr-2" />
            <a href="#" className="text-2xl font-bold">
              FOOTFUSION
            </a>
          </div>

          <div className="hidden md:flex space-x-8 font-semibold">
            <a href="#" className="text-gray-700 hover:text-red-700">
              MEN
            </a>
            <a href="#" className="text-gray-700 hover:text-red-700">
              WOMEN
            </a>
            <a href="#" className="text-gray-700 hover:text-red-700">
              COLLECTION
            </a>
            <a href="#" className="text-gray-700 hover:text-red-700">
              SALE
            </a>
            <a href="#" className="text-gray-700 hover:text-red-700">
              CONTACT
            </a>
            <GrSearch className="text-3xl mr-2" />
          </div>

          <div className="hidden md:flex space-x-4">
            <GiShoppingCart className="text-3xl mr-2" />
            <button className="bg-red-700 text-white px-4 py-2 rounded-lg hover:bg-red-600">
              Login
            </button>
            <button className="bg-gray-700 text-white px-4 py-2 rounded-lg hover:bg-gray-600">
              Register
            </button>
            <GrUserAdmin className="text-3xl mr-2" />
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

        {menuOpen && (
          <div className="md:hidden">
            <div className="flex flex-col space-y-4 py-2">
              <a href="#" className="text-gray-700 hover:text-red-700">
                MEN
              </a>
              <a href="#" className="text-gray-700 hover:text-red-700">
                WOMEN
              </a>
              <a href="#" className="text-gray-700 hover:text-red-700">
                COLLECTION
              </a>
              <a href="#" className="text-gray-700 hover:text-red-700">
                SALE
              </a>
              <a href="#" className="text-gray-700 hover:text-red-700">
                CONTACT
              </a>
              <button className="bg-red-700 text-white px-4 py-2 rounded-lg hover:bg-red-600">
                Login
              </button>
              <button className="bg-gray-700 text-white px-4 py-2 rounded-lg hover:bg-gray-600">
                Register
              </button>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
