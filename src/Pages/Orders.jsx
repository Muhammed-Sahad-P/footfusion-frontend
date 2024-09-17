import { useState, useEffect } from "react";
import Spinner from "../Components/Spinner";

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const token = localStorage.getItem("token");

        const response = await fetch(
          "https://footfusion-backend.onrender.com/users/orders",
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${token}`,
            },
            credentials: "include",
          }
        );

        if (!response.ok) {
          throw new Error("Failed to fetch orders.");
        }

        const data = await response.json();
        setOrders(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  if (loading)
    return (
      <div className="flex justify-center items-center h-screen">
        <Spinner />
      </div>
    );
  if (error) return <p>{error}</p>;

  return (
    <div className="max-w-3xl mx-auto p-4 mt-20">
      <h2 className="text-xl font-semibold mb-4">Your Orders</h2>
      {orders.length === 0 ? (
        <p>No orders found.</p>
      ) : (
        orders.map((order) => (
          <div
            key={order._id}
            className="mb-6 p-4 border border-gray-200 rounded-lg shadow-sm bg-white"
          >
            <h3 className="text-lg font-medium mb-2">Order ID: {order._id}</h3>
            <p className="text-sm text-gray-600 mb-1">
              <strong>Date:</strong>{" "}
              {new Date(order.createdAt).toLocaleDateString("en-US", {
                weekday: "long",
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </p>
            <p className="text-sm text-gray-600 mb-1">
              <strong>Time:</strong>{" "}
              {new Date(order.createdAt).toLocaleTimeString("en-US", {
                hour: "2-digit",
                minute: "2-digit",
                second: "2-digit",
              })}
            </p>
            <p className="text-sm text-gray-600 mb-4">
              <strong>Total:</strong> ₹ {order.totalPrice.toFixed(2)}
            </p>
            <div className="flex flex-wrap -mx-2">
              {order.products.map((product) => (
                <div
                  key={product.productId._id}
                  className="w-full sm:w-1/2 lg:w-1/3 px-2 mb-4"
                >
                  <div className="border border-gray-200 rounded-lg overflow-hidden bg-white">
                    <img
                      src={product.productId.image}
                      alt={product.productId.name}
                      className="w-full h-32 object-cover"
                    />
                    <div className="p-3">
                      <p className="font-medium text-sm mb-1">
                        <strong>Name:</strong> {product.productId.name}
                      </p>
                      <p className="text-sm mb-1">
                        <strong>Type:</strong> {product.productId.type}
                      </p>
                      <p className="text-sm mb-1">
                        <strong>Quantity:</strong> {product.quantity}
                      </p>
                      <p className="text-sm">
                        <strong>Price:</strong> ₹{" "}
                        {product.productId.price.toFixed(2)}
                      </p>
                      <p className="text-sm">
                        <strong>Status:</strong> {product.status}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default Orders;
