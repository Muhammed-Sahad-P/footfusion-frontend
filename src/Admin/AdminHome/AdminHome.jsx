import AdminNavbar from "../AdminNavbar";

const AdminHome = ({ children }) => {
  return (
    <div>
      <AdminNavbar />
      <div>{children}</div>
    </div>
  );
};

export default AdminHome;
