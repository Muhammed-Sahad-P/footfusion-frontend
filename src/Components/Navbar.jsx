import { useState, useContext, useEffect } from "react";
import { GiRunningShoe } from "react-icons/gi";
import { FiShoppingCart } from "react-icons/fi";
import { FaUserCircle } from "react-icons/fa";
import { FaSearch } from "react-icons/fa";
import { MdMenu, MdClose } from "react-icons/md";
import { Link, useNavigate } from "react-router-dom";
import { CollectionContext } from "../Context/CollectionContext";
import { UserContext } from "../Context/UserContext";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  const [active, setActive] = useState(null);

  const Navigate = useNavigate();

  const { cartItems } = useContext(CollectionContext);
  const { isLoggedIn } = useContext(UserContext);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const handleClick = () => {
    Navigate(isLoggedIn ? "/profile" : "/login");
  };

  useEffect(() => {
    const ScrollActive = () => {
      setActive(window.scrollY > 20);
    };
    window.addEventListener("scroll", ScrollActive);
  }, [active]);

  return (
    <nav
      className={`${
        active ? "border-b-4 border-gray-300" : ""
      } bg-gray-100 fixed top-0 left-0 w-full z-30 transition-all`}
    >
      <div className="mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          <div className="flex items-center">
            <GiRunningShoe className="text-red-700 text-3xl mr-2" />
            <Link to="/" className="text-3xl font-serif">
              FootFusion
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
                className="pl-10 pr-4 py-2 rounded-full text-black w-[100px] md:w-[155px]"
              />
              <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
            </div>

            <div className="hidden md:flex space-x-4">
              <div className="relative">
                <Link to="/cart">
                  <FiShoppingCart className="text-3xl text-gray-700 hover:text-red-700" />
                  <div className="absolute top-0 right-0 w-4 h-4 bg-red-700 text-white text-xs rounded-full flex items-center justify-center">
                    {Object.keys(cartItems).length}
                  </div>
                </Link>
              </div>
              {/* <Link
                to="/login"
                className="bg-red-700 text-white font-serif px-4 py-2 rounded-lg hover:bg-red-600"
              >
                Login
              </Link> */}
              <Link to="/profile">
                <FaUserCircle onClick={handleClick} className="text-4xl mr-2" />
              </Link>
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
              <div className="relative flex gap-1 align-middle ">
                <Link to="/cart">
                  <FiShoppingCart className="text-4xl text-gray-700 hover:text-red-700" />
                  <div className=" absolute left-5 w-4 h-4 bg-red-700 text-white text-xs rounded-full flex items-center justify-center">
                    {Object.keys(cartItems).length}
                  </div>
                </Link>
              </div>

              {/* <Link
                to="/login"
                className="bg-red-700 text-white px-4 py-2 rounded-lg hover:bg-red-600 font-serif"
              >
                Login
              </Link> */}

              <Link to="/profile">
                <FaUserCircle onClick={handleClick} className="text-4xl mr-2" />
              </Link>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
