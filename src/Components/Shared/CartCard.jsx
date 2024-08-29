import { useContext } from "react";
import { CollectionContext } from "../../Context/CollectionContext";
import { Link } from "react-router-dom";
import { MdDelete } from "react-icons/md";

const CartCard = () => {
  const { viewCart,setViewcart } = useContext(CollectionContext);
  

  const totalPrice = viewCart.reduce((total, item) => {
    const price = parseFloat(item.productId.price) || 0;
    const quantity = parseFloat(item.quantity,10) || 0;
    return total + price * quantity;
  }, 0);

  const user = JSON.parse(localStorage.getItem("currentUser"));
  const userId = user.user._id;

  //update cart data in server increment
  const handleIncrement = async (productId) => {
    try {
      const response = await fetch(
        `http://localhost:3000/users/cart/${userId}/${productId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ action: "increment" }), // Specify the action to increment
          credentials: "include",
        }
      );

      if (!response.ok) {
        throw new Error("Failed to update cart quantity");
      }

      const data = await response.json();
      setViewcart(data.cart.products || []); // Update the cart state with the new product data
      console.log("Cart updated:", data);
    } catch (error) {
      console.error("Error updating cart", error);
    }
  };

  //decrement cart data in server
  const handleDecrement = async (productId) => {
    try {
      const response = await fetch(
        `http://localhost:3000/users/cart/${userId}/${productId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ action: "decrement" }), // Specify the action to decrement
          credentials: "include",
        }
      );

      if (!response.ok) {
        throw new Error("Failed to update cart quantity");
      }

      const data = await response.json();
      setViewcart(data.cart.products || []); // Update the cart state with the new product data
      console.log("Cart updated:", data);
    } catch (error) {
      console.error("Error updating cart", error);
    }
  };

  //delete cart data from server
  const handleDelete = async (productId) => {
    try {
      const response = await fetch(
        `http://localhost:3000/users/cart/${userId}/${productId}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
        }
      );

      if (!response.ok) {
        // Check the response status and error message
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to delete cart item");
      }

      const data = await response.json();
      setViewcart (data.cart.products || []); // Update the cart state with the new product data
      console.log("Cart updated:", data);
    } catch (error) {
      console.error("Error updating cart", error);
    }
  };

  return (
    <>
      {viewCart.map((item, index) => (
        <div
          key={index}
          className="bg-white p-4 border rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300"
        >
          <img
            src={item.productId.image}
            alt={item.name}
            className="w-full h-48 object-cover mb-4 rounded-lg hover:scale-90 transition-transform duration-300"
          />
          <div className="flex justify-between items-center mb-2">
            <h2 className="text-lg font-semibold">{item.productId.name}</h2>
            <p className="text-gray-700 text-xl font-semibold">
              ₹ {item.productId.price}
            </p>
          </div>
          <p className="text-sm text-gray-500 mb-2">{item.productId.type}</p>
          <div className="flex items-center mb-4">
            <button
              onClick={() => handleIncrement(item.productId._id)}
              className="bg-[#131842] text-white px-4 py-1 rounded-lg hover:bg-gray-800 mr-2"
            >
              +
            </button>
            <span className="text-xl font-semibold">{item.quantity}</span>
            <button
              onClick={() => handleDecrement(item.productId._id)}
              className="bg-[#131842] text-white px-4 py-1 rounded-lg hover:bg-gray-800 ml-2"
            >
              -
            </button>
            <div className="ml-auto">
              <MdDelete
                className="text-2xl cursor-pointer"
                onClick={() => handleDelete(item.productId._id)}
              />
            </div>
          </div>
          <div className="text-center mt-2">
            <p className="text-xl font-semibold">
              Item Total: ₹ {item.productId.price * item.quantity}
            </p>
          </div>
        </div>
      ))}
      <div className="bg-white p-4 border rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 mt-4">
        <div className="text-center">
          <h2 className="text-2xl font-semibold mb-4">Order Summary</h2>

          <div className="border-t border-gray-300 pt-4">
            <p className="text-sm font-semibold mb-2">
              Total Cart Price: ₹ {totalPrice.toFixed(2)}
            </p>
            <p className="text-sm font-semibold mb-2">Shipping Charge: Free</p>
            <p className="text-sm font-semibold mb-2">Discount: NA</p>
          </div>

          <div className="flex justify-between items-center mt-6">
            <p className="text-lg font-semibold">Total:</p>
            <p className="text-lg font-semibold text-red-500">
              ₹ {totalPrice.toFixed(2)}
            </p>
          </div>

          <Link
            to="/payment"
            className="block bg-[#131842] mt-6 text-white px-4 py-2 rounded-lg hover:bg-gray-800"
          >
            Proceed to Checkout
          </Link>
        </div>
      </div>
    </>
  );
};

export default CartCard;
