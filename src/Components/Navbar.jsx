import { useState, useContext, useEffect } from "react";
import { FiShoppingCart } from "react-icons/fi";
import { GiRunningShoe } from "react-icons/gi";
import { FaUserCircle } from "react-icons/fa";
import { MdMenu, MdClose } from "react-icons/md";
import { Link, useNavigate } from "react-router-dom";
import SearchField from "../Pages/Searchfield";
import { CollectionContext } from "../Context/CollectionContext";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const isLoggedIn = JSON.parse(localStorage.getItem("currentUser"));
  const navigate = useNavigate();

  const { cartItems } = useContext(CollectionContext);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("currentUser"));
    setCurrentUser(user);
  }, []);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const handleClick = () => {
    navigate(isLoggedIn ? "/profile" : "/login");
  };

  return (
    <nav className="bg-gray-100 fixed top-0 left-0 w-screen z-30">
      <div className="mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          <div className="flex items-center">
            <Link to="/" className="flex items-center space-x-2">
              <GiRunningShoe className="text-red-700 text-3xl" />
              <span className="text-2xl font-serif">FootFusion</span>
            </Link>
          </div>

          <div className="hidden md:flex space-x-8 font-semibold">
            <Link to="/men" className="nav-link">MEN</Link>
            <Link to="/women" className="nav-link">WOMEN</Link>
            <Link to="/collection" className="nav-link">COLLECTION</Link>
            <Link to="/contact" className="nav-link">CONTACT</Link>
          </div>

          <div className="flex items-center space-x-4">
            <SearchField/>
            {isLoggedIn &&(
              <div className="relative">
                <Link to="/cart" className="flex items-center">
                  <FiShoppingCart className="text-3xl text-gray-700 hover:text-red-700" />
                  <div className="absolute top-0 right-0 w-4 h-4 bg-red-700 text-white text-xs rounded-full flex items-center justify-center">
                    {Object.keys(cartItems).length}
                  </div>
                </Link>
              </div>
            )}
            <div className="hidden md:flex items-center">
              <FaUserCircle onClick={handleClick} className="text-4xl" />
            </div>
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
              <Link to="/men" className="nav-link">MEN</Link>
              <Link to="/women" className="nav-link">WOMEN</Link>
              <Link to="/collection" className="nav-link">COLLECTION</Link>
              <Link to="/contact" className="nav-link">CONTACT</Link>
              <Link to="/profile" className="nav-link">
                <FaUserCircle onClick={handleClick} className="text-4xl" />
              </Link>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
