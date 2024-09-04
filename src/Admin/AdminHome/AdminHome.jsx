import Navbar from "../AdminComponents/Navbar"; 
import Sidebar from "../AdminComponents/SideBar";

const AdminHome = ({ children }) => {
  return (
    <div className="admin-home">
      <Navbar />
      <Sidebar />
      <main className="content p-4 mt-20 ml-10">{children}</main>
    </div>
  );
};

export default AdminHome;
