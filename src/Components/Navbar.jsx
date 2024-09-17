import { useState, useContext, useEffect, useRef } from "react";
import { FiShoppingCart, FiHeart } from "react-icons/fi";
import { GiRunningShoe } from "react-icons/gi";
import { FaUserCircle } from "react-icons/fa";
import { MdMenu, MdClose } from "react-icons/md";
import { Link, useNavigate } from "react-router-dom";
import SearchField from "../Pages/Searchfield";
import { CollectionContext } from "../Context/CollectionContext";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const isAdmin = JSON.parse(localStorage.getItem("isAdmin"));
  const isLoggedIn = JSON.parse(localStorage.getItem("currentUser"));
  const navigate = useNavigate();
  const menuRef = useRef(null);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("currentUser"));
    setCurrentUser(user);
  }, []);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const handleClick = () => {
    navigate(isLoggedIn ? "/profile" : "/login");
  };

  const handleMenuItemClick = (path) => {
    navigate(path);
    setMenuOpen(false);
  };

  const { viewCart, wishlist } = useContext(CollectionContext);

  return (
    <>
      {!isAdmin && (
        <nav className="bg-white shadow-md fixed top-0 left-0 w-full z-30">
          <div className="mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center py-4">
              <div className="flex items-center">
                <Link to="/" className="flex items-center space-x-2">
                  <GiRunningShoe className="text-[#131842] text-3xl" />
                  <span className="text-2xl font-poppins">FootFusion</span>
                </Link>
              </div>

              <div className="hidden md:flex space-x-8 font-poppins">
                <Link to="/men" className="nav-link">MEN</Link>
                <Link to="/women" className="nav-link">WOMEN</Link>
                <Link to="/collection" className="nav-link">COLLECTIONS</Link>
                <Link to="/orders" className="nav-link">ORDERS</Link>
                <Link to="/contact" className="nav-link">CONTACT</Link>
              </div>

              <div className="flex items-center space-x-4">
                <SearchField />
                {isLoggedIn && (
                  <>
                    <div className="relative">
                      <Link to="/cart" className="flex items-center">
                        <FiShoppingCart className="text-3xl text-gray-700 hover:text-[#131842]" />
                        <div className="absolute top-0 right-0 w-4 h-4 bg-[#131842] text-white text-xs rounded-full flex items-center justify-center">
                          {viewCart.length}
                        </div>
                      </Link>
                    </div>
                    <div className="relative">
                      <Link to="/wishlist" className="flex items-center">
                        <FiHeart className="text-3xl text-gray-700 hover:text-[#131842]" />
                        <div className="absolute top-0 right-0 w-4 h-4 bg-[#131842] text-white text-xs rounded-full flex items-center justify-center">
                          {wishlist.length}
                        </div>
                      </Link>
                    </div>
                  </>
                )}
                <div className="flex items-center">
                  <FaUserCircle 
                    onClick={handleClick} 
                    className="text-4xl text-gray-700 cursor-pointer hover:text-[#131842]" 
                  />
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
              <div ref={menuRef} className="md:hidden absolute top-12 right-0 w-48 bg-white shadow-lg rounded-lg z-40">
                <button onClick={() => handleMenuItemClick("/men")} className="block px-4 py-2 text-gray-800 hover:bg-gray-200">MEN</button>
                <button onClick={() => handleMenuItemClick("/women")} className="block px-4 py-2 text-gray-800 hover:bg-gray-200">WOMEN</button>
                <button onClick={() => handleMenuItemClick("/collection")} className="block px-4 py-2 text-gray-800 hover:bg-gray-200">COLLECTIONS</button>
                <button onClick={() => handleMenuItemClick("/orders")} className="block px-4 py-2 text-gray-800 hover:bg-gray-200">ORDERS</button>
                <button onClick={() => handleMenuItemClick("/contact")} className="block px-4 py-2 text-gray-800 hover:bg-gray-200">CONTACT</button>
                {isLoggedIn && (
                  <button onClick={() => handleMenuItemClick("/profile")} className="block px-4 py-2 text-gray-800 hover:bg-gray-200">
                    <FaUserCircle className="text-3xl" />
                  </button>
                )}
              </div>
            )}
          </div>
        </nav>
      )}
    </>
  );
};

export default Navbar;
