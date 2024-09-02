// import Dashboard from "../AdminComponents/Dashboard";
import Navbar from "../AdminComponents/Navbar"; // Ensure this path matches where your Navbar component is located
import Sidebar from "../AdminComponents/SideBar";

const AdminHome = ({ children }) => {
  return (
    <div className="admin-home">
      <Navbar />
      <Sidebar />
      <main className="content p-4">
        {/* <Dashboard /> */}
        {children}
      </main>
    </div>
  );
};

export default AdminHome;
