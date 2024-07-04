import React, { useState, useEffect } from "react";

const Dashboard = () => {
  const [products, setProducts] = useState([]);
  const [users, setUsers] = useState([]);
  const [currentView, setCurrentView] = useState("home");

  useEffect(() => {
    // Mock API calls
    setProducts([
      { id: 1, name: "Product 1", price: "$100" },
      { id: 2, name: "Product 2", price: "$200" },
      // Add more products as needed
    ]);
    setUsers([
      { id: 1, name: "User 1", email: "user1@example.com" },
      { id: 2, name: "User 2", email: "user2@example.com" },
      // Add more users as needed
    ]);
  }, []);

  return (
    <div style={styles.container} className="mt-12">
      <div style={styles.navbar}>Admin Dashboard</div>
      <div style={styles.sidebar}>
        <ul style={styles.navList}>
          <li style={styles.navItem} onClick={() => setCurrentView("home")}>Home</li>
          <li style={styles.navItem} onClick={() => setCurrentView("products")}>Product List</li>
          <li style={styles.navItem} onClick={() => setCurrentView("users")}>User List</li>
        </ul>
      </div>
      <div style={styles.content}>
        {currentView === "home" && <div>Welcome to the Admin Dashboard</div>}
        {currentView === "products" && (
          <div style={styles.section}>
            <h2>Product List</h2>
            <ul>
              {products.map((product) => (
                <li key={product.id}>
                  {product.name} - {product.price}
                </li>
              ))}
            </ul>
          </div>
        )}
        {currentView === "users" && (
          <div style={styles.section}>
            <h2>User List</h2>
            <ul>
              {users.map((user) => (
                <li key={user.id}>
                  {user.name} - {user.email}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

const styles = {
  container: {
    display: "flex",
    flexDirection: "column",
    height: "100vh",
  },
  navbar: {
    height: "50px",
    backgroundColor: "#333",
    color: "#fff",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: "24px",
    fontWeight: "bold",
  },
  sidebar: {
    width: "200px",
    backgroundColor: "#f4f4f4",
    padding: "10px",
    position: "fixed",
    top: "50px",
    bottom: "0",
  },
  navList: {
    listStyleType: "none",
    padding: 0,
  },
  navItem: {
    padding: "10px",
    cursor: "pointer",
    borderBottom: "1px solid #ccc",
  },
  navItemHover: {
    backgroundColor: "#e0e0e0",
  },
  content: {
    marginLeft: "200px",
    padding: "20px",
    flex: 1,
    overflowY: "auto",
  },
  section: {
    marginBottom: "20px",
  },
};


export default Dashboard;
