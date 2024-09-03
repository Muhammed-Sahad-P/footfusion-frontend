import { useEffect, useState } from "react";
import Pagination from "../../Components/Pagination";
import Spinner from "../../Components/Spinner";

const AdmOrders = () => {
  const [orders, setOrders] = useState([]);
  const [userOrders, setUserOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [ordersPerPage] = useState(5);
  const [orderDetails, setOrderDetails] = useState(null);
  const [editingOrder, setEditingOrder] = useState(null);
  const [editForm, setEditForm] = useState({
    status: "",
    total: "",
  });
  const [selectedUserId, setSelectedUserId] = useState("");
  const [users, setUsers] = useState([]);

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

  useEffect(() => {
    const fetchUsers = async () => {
      setLoading(true);
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

  useEffect(() => {
    const fetchUserOrders = async () => {
      if (!selectedUserId) return;

      setLoading(true);
      try {
        const token = localStorage.getItem("token");
        if (!token) throw new Error("You are not authenticated. Please log in.");

        const response = await fetch(`http://localhost:3000/admin/orders/user/${selectedUserId}`, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
          credentials: "include",
        });

        if (!response.ok) throw new Error("Failed to fetch user orders");

        const data = await response.json();
        setUserOrders(data.orders);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchUserOrders();
  }, [selectedUserId]);

  // Cancel Order
  const cancelOrder = async (orderId) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) throw new Error("You are not authenticated. Please log in.");

      const response = await fetch(
        `http://localhost:3000/admin/orders/${orderId}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
          },
          credentials: "include",
        }
      );

      if (!response.ok) throw new Error("Failed to cancel order");

      const updatedOrders = orders.filter((order) => order._id !== orderId);
      setOrders(updatedOrders);
      if (selectedUserId) {
        const updatedUserOrders = userOrders.filter((order) => order._id !== orderId);
        setUserOrders(updatedUserOrders);
      }
    } catch (error) {
      setError(error.message);
    }
  };

  // View Order Details
  const viewOrderDetails = (order) => {
    setOrderDetails(order);
  };

  // Start Editing Order
  const startEditingOrder = (order) => {
    setEditingOrder(order);
    setEditForm({
      status: order.status,
      total: order.total,
    });
  };

  // Handle Edit Form Change
  const handleEditFormChange = (e) => {
    const { name, value } = e.target;
    setEditForm((prev) => ({ ...prev, [name]: value }));
  };

  // Submit Edit Form
  const handleEditFormSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");
      if (!token) throw new Error("You are not authenticated. Please log in.");

      const response = await fetch(
        `http://localhost:3000/admin/orders/${editingOrder._id}`,
        {
          method: "PUT",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          credentials: "include",
          body: JSON.stringify(editForm),
        }
      );

      if (!response.ok) throw new Error("Failed to update order");

      const updatedOrder = await response.json();
      const updatedOrders = orders.map((order) =>
        order._id === updatedOrder._id ? updatedOrder : order
      );
      setOrders(updatedOrders);
      setEditingOrder(null);
      if (selectedUserId) {
        const updatedUserOrders = userOrders.map((order) =>
          order._id === updatedOrder._id ? updatedOrder : order
        );
        setUserOrders(updatedUserOrders);
      }
    } catch (error) {
      setError(error.message);
    }
  };

  // Pagination logic
  const indexOfLastOrder = currentPage * ordersPerPage;
  const indexOfFirstOrder = indexOfLastOrder - ordersPerPage;
  const currentOrders = selectedUserId ? userOrders : orders.slice(indexOfFirstOrder, indexOfLastOrder);

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <h1 className="text-2xl flex justify-center font-bold mb-6 text-gray-800">
        {selectedUserId ? `Orders for User ${selectedUserId}` : "All Orders"}
      </h1>

      <div className="mb-6">
        <label htmlFor="userSelect" className="block text-sm font-medium text-gray-700">Select User</label>
        <select
          id="userSelect"
          value={selectedUserId}
          onChange={(e) => setSelectedUserId(e.target.value)}
          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
        >
          <option value="">All Users</option>
          {users.map((user) => (
            <option key={user._id} value={user._id}>{user.fullName}</option>
          ))}
        </select>
      </div>

      {loading && <Spinner />}

      {error && <p className="text-red-500 text-center">{error}</p>}

      {!loading && !error && (
        <>
          {currentOrders.length > 0 ? (
            <div className="overflow-x-auto">
              <table className="w-full border-collapse border border-gray-300 text-sm">
                <thead>
                  <tr className="bg-gray-200">
                    <th className="border border-gray-300 p-2">Order ID</th>
                    <th className="border border-gray-300 p-2">{selectedUserId ? 'Customer' : 'User'}</th>
                    <th className="border border-gray-300 p-2">Total</th>
                    <th className="border border-gray-300 p-2">Status</th>
                    <th className="border border-gray-300 p-2">Date</th>
                    <th className="border border-gray-300 p-2">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {currentOrders.map((order) => (
                    <tr key={order._id} className="hover:bg-gray-100">
                      <td className="border border-gray-300 p-2">{order._id}</td>
                      <td className="border border-gray-300 p-2">
                        {selectedUserId ? order.userId.fullName : order.userId?.fullName}
                      </td>
                      <td className="border border-gray-300 p-2">₹{order.totalPrice}</td>
                      <td className="border border-gray-300 p-2">{order.status}</td>
                      <td className="border border-gray-300 p-2">
                        {new Date(order.createdAt).toLocaleDateString("en-US", {
                          weekday: "long",
                          year: "numeric",
                          month: "long",
                          day: "numeric",
                        })}
                      </td>
                      <td className="border border-gray-300 p-2 flex gap-2">
                        <button
                          className="px-4 py-1 bg-blue-500 text-white rounded hover:bg-blue-600"
                          onClick={() => viewOrderDetails(order)}
                        >
                          View Details
                        </button>
                        <button
                          className="px-4 py-1 bg-yellow-500 text-white rounded hover:bg-yellow-600"
                          onClick={() => startEditingOrder(order)}
                        >
                          Edit
                        </button>
                        <button
                          className="px-4 py-1 bg-red-500 text-white rounded hover:bg-red-600"
                          onClick={() => cancelOrder(order._id)}
                        >
                          Cancel
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <Pagination
                currentPage={currentPage}
                totalItems={selectedUserId ? userOrders.length : orders.length}
                itemsPerPage={ordersPerPage}
                paginate={setCurrentPage}
              />
            </div>
          ) : (
            <p className="text-center text-gray-500">No orders found</p>
          )}
        </>
      )}

      {/* Order Details Modal */}
      {orderDetails && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg max-w-lg mx-auto overflow-y-auto max-h-[90vh]">
            <h2 className="text-xl font-semibold mb-4">Order Details</h2>
            {orderDetails.products ? (
              <>
                <p><strong>Order ID:</strong> {orderDetails._id}</p>
                <p><strong>Customer:</strong> {orderDetails.userId.fullName}</p>
                <p><strong>Total:</strong> ₹{orderDetails.totalPrice}</p>
                <p><strong>Status:</strong> {orderDetails.status}</p>
                <p><strong>Date:</strong> {new Date(orderDetails.createdAt).toLocaleDateString("en-US", { weekday: "long", year: "numeric", month: "long", day: "numeric" })}</p>
                <h3 className="text-lg font-medium mt-4 mb-2">Products:</h3>
                <ul>
                  {orderDetails.products.map((product) => (
                    <li key={product.productId._id} className="mb-4">
                      <img
                        src={product.productId.image}
                        alt={product.productId.name}
                        className="w-32 h-32 object-cover mb-2"
                      />
                      <p><strong>Name:</strong> {product.productId.name}</p>
                      <p><strong>Quantity:</strong> {product.quantity}</p>
                      <p><strong>Price:</strong> ₹{product.productId.price}</p>
                    </li>
                  ))}
                </ul>
              </>
            ) : (
              <p className="text-gray-500">Loading details...</p>
            )}
            <button
              className="mt-4 px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600"
              onClick={() => setOrderDetails(null)}
            >
              Close
            </button>
          </div>
        </div>
      )}

      {/* Edit Order Form */}
      {editingOrder && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg max-w-lg mx-auto">
            <h2 className="text-xl font-semibold mb-4">Edit Order</h2>
            <form onSubmit={handleEditFormSubmit}>
              <div className="mb-4">
                <label
                  htmlFor="status"
                  className="block text-sm font-medium text-gray-700"
                >
                  Status
                </label>
                <input
                  type="text"
                  id="status"
                  name="status"
                  value={editForm.status}
                  onChange={handleEditFormChange}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
                />
              </div>
              <div className="mb-4">
                <label
                  htmlFor="total"
                  className="block text-sm font-medium text-gray-700"
                >
                  Total
                </label>
                <input
                  type="number"
                  id="total"
                  name="total"
                  value={editForm.total}
                  onChange={handleEditFormChange}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
                />
              </div>
              <div className="flex gap-2">
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                >
                  Save Changes
                </button>
                <button
                  type="button"
                  className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600"
                  onClick={() => setEditingOrder(null)}
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdmOrders;
