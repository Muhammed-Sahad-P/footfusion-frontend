import { useContext } from "react";
import { CollectionContext } from "../../Context/CollectionContext";
import { Link, useNavigate } from "react-router-dom";
import { FiHeart } from "react-icons/fi";

const Card = ({ data }) => {
  const { addToCart,addToWishlist } = useContext(CollectionContext);
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
          className="bg-white p-4 border rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 relative"
        >
          <Link to={`/collection/${item._id}`}>
            <img
              src={item.image}
              alt={item.name}
              className="w-full h-48 object-cover mb-4 rounded hover:scale-90 transition-all"
            />
            <h2 className="text-lg font-poppins">{item.name}</h2>
            <p className="text-sm text-gray-500">{item.type}</p>
            <p className="text-xl text-gray-700 mt-2 mb-5">₹ {item.price}</p>
          </Link>

          {/* Wishlist Icon */}
          <button
            onClick={() => handleAddToWishlist(item._id)}
            className="absolute top-6 right-6 text-gray-700 hover:text-red-500 transition-colors"
          >
            <FiHeart size={24} />
          </button>

          <div className="flex gap-5 mt-4">
            <button
              onClick={() => handleAddToCart(item._id)}
              className="bg-[#131842] text-white px-4 py-2 rounded-lg font-poppins hover:bg-[#0f1236]"
            >
              Add To Cart
            </button>
            <button
              onClick={handleBuyNow}
              className="bg-[#131842] text-white px-4 py-2 rounded-lg font-poppins hover:bg-[#0f1236]"
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
