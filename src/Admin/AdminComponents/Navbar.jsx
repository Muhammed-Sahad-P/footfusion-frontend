import { Link } from "react-router-dom";
import { GiRunningShoe } from "react-icons/gi";

const Navbar = () => {
  
  return (
    <nav className="bg-white shadow-md p-4 fixed top-0 left-0 right-0 z-10">
      <div className="container mx-auto flex items-center justify-between">
        <Link to="/dashboard" className=" flex items-center">
          <GiRunningShoe className="text-red-700 text-3xl" />
          <span className="text-2xl font-serif font-bold text-gray-800 ml-2">
            FootFusion
          </span>
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
