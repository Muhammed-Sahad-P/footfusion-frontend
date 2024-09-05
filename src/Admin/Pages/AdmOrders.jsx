import  { useEffect, useState } from "react";
import Spinner from "../../Components/Spinner";

const AdmOrders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [orderDetails, setOrderDetails] = useState(null);
  const [editOrder, setEditOrder] = useState(null);

  // Fetch all orders
  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await fetch("http://localhost:3000/admin/orders", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
        });

        if (response.ok) {
          const data = await response.json();
          setOrders(data.orders || []); // Adjust according to API response structure
        } else {
          const data = await response.json();
          setError(data.message || "Failed to fetch orders.");
        }
      } catch (error) {
        setError("Failed to fetch orders.");
      } finally {
        setLoading(false);
      }
    };
    fetchOrders();
  }, []);

  // Handle updating an order
  const updateOrder = async (orderId, updatedData) => {
    try {
      const response = await fetch(`http://localhost:3000/admin/orders/${orderId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedData),
        credentials: "include",
      });
      const data = await response.json();
      if (response.ok) {
        setOrders((prevOrders) =>
          prevOrders.map((order) =>
            order._id === orderId ? { ...order, ...updatedData } : order
          )
        );
        setEditOrder(null);
      } else {
        setError(data.message || "Failed to update order.");
      }
    } catch (error) {
      setError("Failed to update order.");
    }
  };

  // Handle deleting an order
  const deleteOrder = async (orderId) => {
    try {
      const response = await fetch(`http://localhost:3000/admin/orders/${orderId}`, {
        method: "DELETE",
        credentials: "include",
      });
      if (response.ok) {
        setOrders((prevOrders) =>
          prevOrders.filter((order) => order._id !== orderId)
        );
      } else {
        const data = await response.json();
        setError(data.message || "Failed to delete order.");
      }
    } catch (error) {
      setError("Failed to delete order.");
    }
  };

  if (loading) return <Spinner />;
  if (error) return <div className="text-center mt-20 text-red-500">{error}</div>;

  return (
    <div className="max-w-6xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6 text-center">Admin Orders</h1>

      {/* Orders Table */}
      {orders.length ? (
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white shadow-md rounded-lg overflow-hidden">
            <thead className="bg-gray-100 text-gray-600 text-left">
              <tr>
                <th className="py-3 px-4">Order ID</th>
                <th className="py-3 px-4">User</th>
                <th className="py-3 px-4">Total Price</th>
                <th className="py-3 px-4">Status</th>
                <th className="py-3 px-4">Actions</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order) => (
                <tr key={order._id} className="border-b">
                  <td className="py-3 px-4">{order._id}</td>
                  <td className="py-3 px-4">{order.userId?.fullName || "Unknown"}</td>
                  <td className="py-3 px-4">₹{order.totalPrice}</td>
                  <td className="py-3 px-4">{order.status}</td>
                  <td className="py-3 px-4 flex space-x-2">
                    <button
                      className="bg-blue-500 text-white px-4 py-1 rounded hover:bg-blue-600"
                      onClick={() => setOrderDetails(order)}
                    >
                      View
                    </button>
                    <button
                      className="bg-yellow-500 text-white px-4 py-1 rounded hover:bg-yellow-600"
                      onClick={() => setEditOrder(order)}
                    >
                      Edit
                    </button>
                    <button
                      className="bg-red-500 text-white px-4 py-1 rounded hover:bg-red-600"
                      onClick={() => deleteOrder(order._id)}
                    >
                      Cancel
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <div className="text-center mt-10 text-gray-500">No orders found.</div>
      )}

      {/* Order Details Modal */}
      {orderDetails && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-2xl">
            <h2 className="text-xl font-bold mb-4">Order Details</h2>
            <p>
              <strong>Order ID:</strong> {orderDetails._id}
            </p>
            <p>
              <strong>User:</strong> {orderDetails.userId?.fullName}
            </p>
            <p>
              <strong>Total Price:</strong> ₹{orderDetails.totalPrice}
            </p>
            <p>
              <strong>Status:</strong> {orderDetails.status}
            </p>
            <ul className="mt-4">
              {orderDetails.products.map((product) => (
                <li key={product.productId._id} className="flex items-center mb-2">
                  <img
                    src={product.productId.image}
                    alt={product.productId.name}
                    className="w-16 h-16 object-cover mr-4"
                  />
                  <div>
                    <p className="font-bold">{product.productId.name}</p>
                    <p>Qty: {product.quantity}</p>
                    <p>Price: ₹{product.productId.price}</p>
                  </div>
                </li>
              ))}
            </ul>
            <button
              className="mt-6 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
              onClick={() => setOrderDetails(null)}
            >
              Close
            </button>
          </div>
        </div>
      )}

      {/* Edit Order Modal */}
      {editOrder && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-2xl">
            <h2 className="text-xl font-bold mb-4">Edit Order</h2>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                updateOrder(editOrder._id, { status: e.target.status.value });
              }}
            >
              <label className="block mb-2">
                <span className="text-gray-700">Status:</span>
                <select
                  name="status"
                  className="block w-full mt-1 border rounded-lg px-4 py-2"
                  defaultValue={editOrder.status}
                >
                  <option value="Pending">Pending</option>
                  <option value="Shipped">Shipped</option>
                  <option value="Delivered">Delivered</option>
                  <option value="Cancelled">Cancelled</option>
                </select>
              </label>
              <button
                type="submit"
                className="mt-4 bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
              >
                Save Changes
              </button>
              <button
                type="button"
                className="mt-4 ml-4 bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
                onClick={() => setEditOrder(null)}
              >
                Cancel
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdmOrders;
