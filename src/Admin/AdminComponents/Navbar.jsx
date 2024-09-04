import { useState } from "react";
import { Link } from "react-router-dom";
import { GiRunningShoe } from "react-icons/gi";
import { RiAdminFill } from "react-icons/ri";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  

  return (
    <nav className="bg-white shadow-md p-4 fixed top-0 left-0 right-0 z-10">
      <div className="container mx-auto flex items-center justify-between">
        <Link to="/dashboard" className="ml-16 flex items-center">
          <GiRunningShoe className="text-red-700 text-3xl" />
          <span className="text-2xl font-serif font-bold text-gray-800 ml-2">
            FootFusion
          </span>
        </Link>
     
        <button
          onClick={toggleMenu}
          className="md:hidden text-gray-800 focus:outline-none"
        >
          <RiAdminFill className="text-xl" />
        </button>
      </div>

      {isMenuOpen && (
        <div className="md:hidden bg-white shadow-md absolute top-16 left-0 right-0 z-20">
          <div className="flex justify-end p-4">
            <button onClick={toggleMenu} className="text-gray-800 text-xl">
              &times;
            </button>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
