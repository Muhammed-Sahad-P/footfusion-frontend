import { useEffect, useState } from "react";
import Spinner from "../../Components/Spinner";
import Pagination from "../../Components/Pagination";
import { IoMdClose } from "react-icons/io";

const AdmOrders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [orderDetails, setOrderDetails] = useState(null);
  const [editOrder, setEditOrder] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [ordersPerPage] = useState(5);
  const [totalOrders, setTotalOrders] = useState(0);

  const fetchOrders = async (page = 1) => {
    setLoading(true);
    try {
      const response = await fetch(`http://localhost:3000/admin/orders?page=${page}&limit=${ordersPerPage}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      });

      if (response.ok) {
        const data = await response.json();
        setOrders(data.orders || []);
        setTotalOrders(data.totalOrders || 0); 
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

  useEffect(() => {
    fetchOrders(currentPage);
  }, [currentPage]);

  const handlePageChange = async (pageNumber) => {
    if (pageNumber > 0 && pageNumber <= Math.ceil(totalOrders / ordersPerPage)) {
      setCurrentPage(pageNumber);
    }
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleNextPage = async () => {
    const nextPage = currentPage + 1;
    if (nextPage <= Math.ceil(totalOrders / ordersPerPage)) {
      setLoading(true);
      try {
        const response = await fetch(`http://localhost:3000/admin/orders?page=${nextPage}&limit=${ordersPerPage}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
        });

        if (response.ok) {
          const data = await response.json();
          if (data.orders.length > 0) {
            setOrders(data.orders);
            setCurrentPage(nextPage);
          }
        } else {
          const data = await response.json();
          setError(data.message || "Failed to fetch orders.");
        }
      } catch (error) {
        setError("Failed to fetch orders.");
      } finally {
        setLoading(false);
      }
    }
  };

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

  if (loading) return <div className="flex justify-center items-center h-screen"><Spinner/></div>
  if (error) return <div className="text-center mt-20 text-red-600 text-lg font-medium">{error}</div>;

  return (
    <div className="p-6 max-w-7xl mx-auto mt-5 bg-white rounded-lg shadow-lg">
      <h1 className="text-3xl font-bold mb-6 text-center text-gray-900">Order Management</h1>

      {/* Orders Table */}
      {orders.length ? (
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border border-gray-200 shadow-md rounded-lg">
            <thead className="bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-white uppercase text-xs leading-normal">
              <tr>
                <th className="py-3 px-6 text-left">Order ID</th>
                <th className="py-3 px-6 text-left">User</th>
                <th className="py-3 px-6 text-left">Total Price</th>
                <th className="py-3 px-6 text-left">Status</th>
                <th className="py-3 px-6 text-left">Actions</th>
              </tr>
            </thead>
            <tbody className="text-gray-700">
              {orders.map((order) => (
                <tr key={order._id} className="border-b hover:bg-gray-50 transition duration-200 ease-in-out">
                  <td className="py-4 px-6">{order._id}</td>
                  <td className="py-4 px-6">{order.userId?.fullName || "Unknown"}</td>
                  <td className="py-4 px-6 text-green-600 font-semibold">₹{order.totalPrice}</td>
                  <td className="py-4 px-6 capitalize">{order.status}</td>
                  <td className="py-4 px-6 flex space-x-2">
                    <span
                      className="px-3 py-1 inline-block rounded-full text-xs font-semibold bg-blue-100 text-blue-700 cursor-pointer hover:bg-blue-200 transition-colors"
                      onClick={() => setOrderDetails(order)}
                      title="View"
                    >
                      View
                    </span>
                    <span
                      className="px-3 py-1 inline-block rounded-full text-xs font-semibold bg-yellow-100 text-yellow-700 cursor-pointer hover:bg-yellow-200 transition-colors"
                      onClick={() => setEditOrder(order)}
                      title="Edit"
                    >
                      Edit
                    </span>
                    <span
                      className="px-3 py-1 inline-block rounded-full text-xs font-semibold bg-red-100 text-red-700 cursor-pointer hover:bg-red-200 transition-colors"
                      onClick={() => deleteOrder(order._id)}
                      title="Remove"
                    >
                      Remove
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          <Pagination
            itemsPerPage={ordersPerPage}
            totalItems={totalOrders}
            paginate={handlePageChange}
            currentPage={currentPage}
            nextPage={handleNextPage}
            prevPage={handlePrevPage}
          />
        </div>
      ) : (
        <div className="text-center mt-10 text-gray-600 text-lg font-medium">No orders found.</div>
      )}

      {orderDetails && (
        <div className="fixed inset-0 bg-black bg-opacity-70 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-xl w-full max-w-lg relative">
            <h2 className="text-xl font-bold mb-4 text-gray-800">Order Details</h2>
            <p className="mb-2">
              <strong className="text-gray-700">Order ID:</strong> {orderDetails._id}
            </p>
            <p className="mb-2">
              <strong className="text-gray-700">User:</strong> {orderDetails.userId?.fullName}
            </p>
            <p className="mb-2">
              <strong className="text-gray-700">Total Price:</strong> ₹{orderDetails.totalPrice}
            </p>
            <p className="mb-4">
              <strong className="text-gray-700">Status:</strong> {orderDetails.status}
            </p>
            <ul className="mt-2">
              {orderDetails.products.map((product) => (
                <li key={product.productId._id} className="flex items-center mb-2 p-2 bg-gray-50 rounded-lg shadow-sm">
                  <img src={product.productId.image} alt={product.productId.name} className="w-12 h-12 object-cover rounded-lg mr-4" />
                  <div className="flex-1">
                    <p className="text-gray-800 font-semibold">{product.productId.name}</p>
                    <p className="text-gray-600">Quantity: {product.quantity}</p>
                    <p className="text-gray-600">Price: ₹{product.productId.price}</p>
                  </div>
                </li>
              ))}
            </ul>
            <button
              className="absolute top-2 right-2 text-gray-500 hover:text-gray-800"
              onClick={() => setOrderDetails(null)}
            >
              <IoMdClose size={24} />
            </button>
          </div>
        </div>
      )}

      {editOrder && (
        <div className="fixed inset-0 bg-black bg-opacity-70 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-xl w-full max-w-lg relative">
            <h2 className="text-xl font-bold mb-4 text-gray-800">Edit Order</h2>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                updateOrder(editOrder._id, { status: editOrder.status });
              }}
            >
              <div className="mb-4">
                <label htmlFor="status" className="block text-gray-700 font-medium mb-2">
                  Status
                </label>
                <select
                  id="status"
                  value={editOrder.status}
                  onChange={(e) => setEditOrder({ ...editOrder, status: e.target.value })}
                  className="block w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                >
                  <option value="pending">Pending</option>
                  <option value="shipped">Shipped</option>
                  <option value="delivered">Delivered</option>
                  <option value="cancelled">Cancelled</option>
                </select>
              </div>
              <button
                type="submit"
                className="w-full bg-indigo-600 text-white py-2 px-4 rounded-lg hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Save Changes
              </button>
            </form>
            <button
              className="absolute top-2 right-2 text-gray-500 hover:text-gray-800"
              onClick={() => setEditOrder(null)}
            >
              <IoMdClose size={24} />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdmOrders;
