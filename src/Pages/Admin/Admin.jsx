import  { useState } from 'react';
import { Link } from 'react-router-dom';
const Admin = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
      <div className="admin-container">
        <div className="navbar">
          <div className="navbar-content">
            <h1>Foot Fusion</h1>
            <button onClick={toggleSidebar} className="toggle-button">
              ☰
            </button>
          </div>
        </div>
        <div className={`sidebar ${sidebarOpen ? 'open' : ''}`}>
          <ul>
            <li><Link to="/admin/dashboard">Dashboard</Link></li>
            <li><Link to="/admin/userdetails">User Details</Link></li>
            <li><Link to="/admin/productdetails">Product Details</Link></li>
          </ul>
        </div>
        <div className="main-content">
          
        </div>
      </div>
  );
};

export default Admin;
