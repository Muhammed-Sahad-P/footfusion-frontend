import { useEffect, useState } from 'react';
import Spinner from '../../Components/Spinner';

const Dashboard = () => {
  const [orders, setOrders] = useState([]);
  const [users, setUsers] = useState([]);
  const [products, setProducts] = useState([]);
  const [revenue, setRevenue] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Fetch orders
  useEffect(() => {
    const fetchOrders = async () => {
      setLoading(true);
      try {
        const token = localStorage.getItem("token");
        if (!token) throw new Error("You are not authenticated. Please log in.");

        const response = await fetch("http://localhost:3000/admin/orders", {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
          credentials: "include",
        });

        if (!response.ok) throw new Error("Failed to fetch orders");

        const data = await response.json();
        setOrders(data.orders);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  // Fetch products
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) throw new Error("You are not authenticated. Please log in.");

        const response = await fetch("http://localhost:3000/admin/products", {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
          credentials: "include",
        });

        if (!response.ok) throw new Error("Failed to fetch products");

        const data = await response.json();
        setProducts(data.products);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  // Fetch users
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) throw new Error("You are not authenticated. Please log in.");

        const response = await fetch("http://localhost:3000/admin/users", {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
          credentials: "include",
        });

        if (!response.ok) throw new Error("Failed to fetch users");

        const data = await response.json();
        setUsers(data.users);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  // Fetch total revenue
  useEffect(() => {
    const fetchRevenue = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) throw new Error("You are not authenticated. Please log in.");

        const response = await fetch("http://localhost:3000/admin/revenue", {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
          credentials: "include",
        });

        if (!response.ok) throw new Error("Failed to fetch revenue");

        const data = await response.json();
        setRevenue(data.revenue || 0); 
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchRevenue();
  }, []);



  if (loading) {
    return <Spinner />; 
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
        <div className="bg-white p-4 rounded shadow-md">
          <h3 className="text-lg font-semibold">Total Orders</h3>
          <p className="text-2xl font-bold">{orders.length}</p>
        </div>
        <div className="bg-white p-4 rounded shadow-md">
          <h3 className="text-lg font-semibold">Total Products</h3>
          <p className="text-2xl font-bold">{products.length}</p>
        </div>
        <div className="bg-white p-4 rounded shadow-md">
          <h3 className="text-lg font-semibold">Total Users</h3>
          <p className="text-2xl font-bold">{users.length}</p>
        </div>
        <div className="bg-white p-4 rounded shadow-md">
          <h3 className="text-lg font-semibold">Total Revenue</h3>
          <p className="text-2xl font-bold">₹{revenue.toFixed(2)}</p>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
