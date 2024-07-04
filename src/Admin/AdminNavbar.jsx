import { GiRunningShoe } from "react-icons/gi";
const AdminNavbar = () => {
  return (
    <nav className="bg-gray-100 fixed top-0 left-0 w-screen z-30">
      <div className="mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          <div className="flex items-center">
            <div to="/" className="flex items-center space-x-2">
              <GiRunningShoe className="text-red-700 text-3xl" />
              <span className="text-2xl font-serif">FootFusion</span>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default AdminNavbar;
