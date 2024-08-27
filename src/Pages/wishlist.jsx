import { useContext } from "react";
import { FiShoppingCart } from "react-icons/fi";
import { MdDelete } from "react-icons/md";
import { CollectionContext } from "../Context/CollectionContext";
import { Link, Navigate } from "react-router-dom";

const Wishlist = () => {
  const { wishlist, removeFromWishlist, addToCart } =
    useContext(CollectionContext);
  const currentUser = JSON.parse(localStorage.getItem("currentUser"));

  console.log(wishlist);

  const handleAddToCart = (itemId) => {
    if (currentUser) {
      addToCart(itemId);
    } else {
      alert("You need to log in to add items to the cart");
      Navigate("/login");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <h1 className="text-4xl font-bold text-center mt-16 mb-8">My Wishlist</h1>
      <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
        {wishlist?.length > 0 ? (
          wishlist.map((item) => (
            <div
              key={item._id}
              className="bg-white rounded-lg shadow-md overflow-hidden"
            >
              <img
                src={item.image}
                alt={item.name}
                className="w-full h-48 object-cover"
              />
              <div className="p-4">
                <h2 className="text-xl font-semibold">{item.name}</h2>
                <p className="text-gray-600">₹ {item.price}</p>
                <div className="flex items-center justify-between mt-4">
                  <button
                    onClick={() => removeFromWishlist(item._id)}
                    className="text-2xl py-2 px-4 rounded"
                  >
                    <MdDelete />
                  </button>
                  <Link to={"/cart"} onClick={() => handleAddToCart(item._id)}>
                    <FiShoppingCart className="text-2xl cursor-pointer mb-2 mr-4 text-red-500" />
                  </Link>
                </div>
              </div>
            </div>
          ))
        ) : (
          <p className="text-center text-gray-500">Your wishlist is empty.</p>
        )}
      </div>
    </div>
  );
};

export default Wishlist;
