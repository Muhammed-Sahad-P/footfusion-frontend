import useFetch from "../utils/useFetch";

const Dashboard = () => {
  const {
    data: users,
    isPending: usersPending,
    error: usersError,
  } = useFetch("http://localhost:3000/users");
  const {
    data: products,
    isPending: productsPending,
    error: productsError,
  } = useFetch("http://localhost:3000/products");

  const totalOrders = 1234;
  const totalRevenue = 567890;
  const avgProductRating = 4.5;

  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-50 to-indigo-100 flex flex-col">
      <header className="bg-red-600 text-white p-4 text-center">
        <h1>Admin Dashboard</h1>
      </header>
      <main className="flex-1 p-8 text-center">
        <h2 className="text-2xl font-bold mb-4">Dashboard Statistics</h2>

        {(usersPending || productsPending) && <div>Loading...</div>}
        {(usersError || productsError) && <div>Error loading data</div>}

        {users && products && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-lg">
              <h3 className="text-lg font-semibold">Total Users</h3>
              <p className="text-2xl">{users.length}</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-lg">
              <h3 className="text-lg font-semibold">Total Products</h3>
              <p className="text-2xl">{products.length}</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-lg">
              <h3 className="text-lg font-semibold">Total Orders</h3>
              <p className="text-2xl">{totalOrders}</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-lg">
              <h3 className="text-lg font-semibold">Total Revenue</h3>
              <p className="text-2xl">₹ {totalRevenue}</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-lg">
              <h3 className="text-lg font-semibold">Average Product Rating</h3>
              <p className="text-2xl">{avgProductRating}</p>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default Dashboard;
