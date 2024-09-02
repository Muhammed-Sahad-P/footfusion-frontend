import { useEffect, useState } from "react";
import axios from "axios";

const Dashboard = () => {
  const [stats, setStats] = useState({
    totalUsers: 0,
    totalProducts: 0,
    totalOrders: 0,
    totalRevenue: 0,
  });

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const [usersRes, productsRes, ordersRes, revenueRes] =
          await Promise.all([
            axios.get("/api/admin/total-users"),
            axios.get("/api/admin/total-products"),
            axios.get("/api/admin/total-orders"),
            axios.get("/api/admin/total-revenue"),
          ]);

        setStats({
          totalUsers: usersRes.data.totalUsers,
          totalProducts: productsRes.data.totalProducts,
          totalOrders: ordersRes.data.totalOrders,
          totalRevenue: revenueRes.data.totalRevenue,
        });
      } catch (error) {
        console.error("Error fetching dashboard stats:", error);
      }
    };

    fetchStats();
  }, []);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 p-4">
      <div className="bg-white p-4 rounded shadow-md">
        <h3 className="text-lg font-semibold">Total Users</h3>
        <p className="text-2xl font-bold">{stats.totalUsers}</p>
      </div>
      <div className="bg-white p-4 rounded shadow-md">
        <h3 className="text-lg font-semibold">Total Products</h3>
        <p className="text-2xl font-bold">{stats.totalProducts}</p>
      </div>
      <div className="bg-white p-4 rounded shadow-md">
        <h3 className="text-lg font-semibold">Total Orders</h3>
        <p className="text-2xl font-bold">{stats.totalOrders}</p>
      </div>
      <div className="bg-white p-4 rounded shadow-md">
        <h3 className="text-lg font-semibold">Total Revenue</h3>
        {/* <p className="text-2xl font-bold">${stats.totalRevenue.toFixed(2)}</p> */}
      </div>
    </div>
  );
};

export default Dashboard;
