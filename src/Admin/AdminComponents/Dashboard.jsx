import { useEffect, useState } from 'react';
import { Pie, Bar } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend, BarElement, CategoryScale, LinearScale } from 'chart.js';
import Spinner from '../../Components/Spinner';

ChartJS.register(ArcElement, Tooltip, Legend, BarElement, CategoryScale, LinearScale);

const Dashboard = () => {
  const [orders, setOrders] = useState([]);
  const [users, setUsers] = useState([]);
  const [products, setProducts] = useState([]);
  const [revenue, setRevenue] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Fetch data functions
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const token = localStorage.getItem("token");
        if (!token) throw new Error("You are not authenticated. Please log in.");

        const [ordersRes, productsRes, usersRes, revenueRes] = await Promise.all([
          fetch("http://localhost:3000/admin/orders", {
            method: "GET",
            headers: { Authorization: `Bearer ${token}` },
            credentials: "include",
          }),
          fetch("http://localhost:3000/admin/products", {
            method: "GET",
            headers: { Authorization: `Bearer ${token}` },
            credentials: "include",
          }),
          fetch("http://localhost:3000/admin/users", {
            method: "GET",
            headers: { Authorization: `Bearer ${token}` },
            credentials: "include",
          }),
          fetch("http://localhost:3000/admin/revenue", {
            method: "GET",
            headers: { Authorization: `Bearer ${token}` },
            credentials: "include",
          }),
        ]);

        if (!ordersRes.ok || !productsRes.ok || !usersRes.ok || !revenueRes.ok) {
          throw new Error("Failed to fetch data");
        }

        const [ordersData, productsData, usersData, revenueData] = await Promise.all([
          ordersRes.json(),
          productsRes.json(),
          usersRes.json(),
          revenueRes.json(),
        ]);

        setOrders(ordersData.orders);
        setProducts(productsData.products);
        setUsers(usersData.users);
        setRevenue(revenueData.revenue || 0);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return <Spinner />;
  }

  if (error) {
    return <div className="text-red-600 font-semibold text-center">Error: {error}</div>;
  }

  // Data for Pie Chart
  const pieChartData = {
    labels: ['Orders', 'Products', 'Users', 'Revenue'],
    datasets: [
      {
        data: [orders.length, products.length, users.length, revenue],
        backgroundColor: ['#4B6A9B', '#FF7F7F', '#4CAF50', '#FFC107'],
        hoverOffset: 4,
      },
    ],
  };

  // Data for Bar Chart
  const barChartData = {
    labels: ['Orders', 'Products', 'Users', 'Revenue'],
    datasets: [
      {
        label: 'Counts',
        data: [orders.length, products.length, users.length, revenue],
        backgroundColor: '#4B6A9B',
        borderRadius: 6,
        borderSkipped: false,
      },
    ],
  };

  const barChartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top',
      },
      tooltip: {
        callbacks: {
          label: function (context) {
            return context.label + ': ' + context.raw;
          },
        },
      },
    },
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen ml-10 rounded-lg border border-gray-300">
      <h1 className="text-3xl font-extrabold mb-6 text-gray-800 text-center">Dashboard</h1>
      <div className="grid grid-cols-1 gap-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="bg-gradient-to-r from-blue-100 to-blue-200 p-5 rounded-lg shadow-lg border border-gray-300">
            <h3 className="text-lg font-semibold mb-2 text-gray-700">Total Orders</h3>
            <p className="text-2xl font-bold text-gray-900">{orders.length}</p>
          </div>
          <div className="bg-gradient-to-r from-green-100 to-green-200 p-5 rounded-lg shadow-lg border border-gray-300">
            <h3 className="text-lg font-semibold mb-2 text-gray-700">Total Products</h3>
            <p className="text-2xl font-bold text-gray-900">{products.length}</p>
          </div>
          <div className="bg-gradient-to-r from-yellow-100 to-yellow-200 p-5 rounded-lg shadow-lg border border-gray-300">
            <h3 className="text-lg font-semibold mb-2 text-gray-700">Total Users</h3>
            <p className="text-2xl font-bold text-gray-900">{users.length}</p>
          </div>
          <div className="bg-gradient-to-r from-red-100 to-red-200 p-5 rounded-lg shadow-lg border border-gray-300">
            <h3 className="text-lg font-semibold mb-2 text-gray-700">Total Revenue</h3>
            <p className="text-2xl font-bold text-gray-900">₹{revenue.toFixed(2)}</p>
          </div>
        </div>

        {/* Charts */}
        <div className="bg-white p-6 rounded-lg shadow-lg border border-gray-300 flex justify-around gap-6 items-center">
          {/* Bar Chart */}
          <div className="w-[400px] h-[400px] bg-gray-50 p-4 rounded-lg shadow-lg border border-gray-300 flex items-center justify-center">
            <Bar data={barChartData} options={barChartOptions} />
          </div>

          {/* Pie Chart */}
          <div className="w-[400px] h-[400px] bg-gray-50 p-4 rounded-lg shadow-lg border border-gray-300 flex items-center justify-center">
            <Pie data={pieChartData} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
