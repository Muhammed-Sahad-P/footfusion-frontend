import { useContext } from "react";
import { CollectionContext } from "../../Context/CollectionContext";
import { Link, useNavigate } from "react-router-dom";
import { FiHeart } from "react-icons/fi";

const Card = ({ data }) => {
  const { addToCart, addToWishlist } = useContext(CollectionContext);
  const currentUser = JSON.parse(localStorage.getItem("currentUser"));
  const navigate = useNavigate();

  const handleAddToCart = (itemId) => {
    if (currentUser) {
      addToCart(itemId);
    } else {
      alert("You need to log in to add items to the cart");
      navigate("/login");
    }
  };

  const handleBuyNow = () => {
    if (currentUser) {
      navigate("/payment");
    } else {
      alert("You need to log in to proceed with the purchase");
      navigate("/login");
    }
  };

  const handleAddToWishlist = (itemId) => {
    if (currentUser) {
      addToWishlist(itemId);
    } else {
      alert("You need to log in to add items to the cart");
      navigate("/login");
    }
  };

  return (
    <>
      {data.map((item) => (
        <div
          key={item._id}
          className="relative bg-gradient-to-br from-white to-gray-100 border border-gray-200 rounded-lg shadow-lg overflow-hidden group transform hover:scale-105 transition-transform duration-500"
        >
          <Link to={`/collection/${item._id}`} className="block">
            <div className="relative overflow-hidden">
              <img
                src={item.image}
                alt={item.name}
                className="w-full h-64 object-cover rounded-t-lg transition-transform duration-500 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                <p className="text-white text-lg font-semibold">View Details</p>
              </div>
            </div>
            <div className="p-6 text-center">
              <h2 className="text-2xl font-semibold text-gray-800 mt-4">{item.name}</h2>
              <p className="text-base text-gray-500 mt-1">{item.type}</p>
              <p className="text-xl font-semibold text-gray-900 mt-2">₹ {item.price}</p>
            </div>
          </Link>

          {/* Wishlist Icon */}
          <button
            onClick={() => handleAddToWishlist(item._id)}
            className="absolute top-4 right-4 text-gray-700 hover:text-red-500 transition-colors"
          >
            <FiHeart size={24} />
          </button>

          <div className="flex gap-4 p-6">
            <button
              onClick={() => handleAddToCart(item._id)}
              className="bg-gradient-to-r from-[#ff7e5f] to-[#feb47b] text-white px-5 py-2 rounded-lg font-semibold shadow-lg hover:from-[#ff6f5e] hover:to-[#fe9f6b] transition-colors duration-300"
            >
              Add To Cart
            </button>
            <button
              onClick={handleBuyNow}
              className="bg-gradient-to-r from-[#4a90e2] to-[#357ABD] text-white px-5 py-2 rounded-lg font-semibold shadow-lg hover:from-[#3f8cbb] hover:to-[#2f6a99] transition-colors duration-300"
            >
              Buy Now
            </button>
          </div>
        </div>
      ))}
    </>
  );
};

export default Card;
