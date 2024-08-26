import { useContext } from "react";
import { CollectionContext } from "../../Context/CollectionContext";
import { Link, useNavigate } from "react-router-dom";

const Card = ({ data }) => {
  const { addToCart } = useContext(CollectionContext);
  const currentUser = JSON.parse(localStorage.getItem("currentUser"));

  const navigate = useNavigate();

  const handleAddToCart = (itemId) => {
    if (currentUser) {
      addToCart(itemId);
    } else {
      alert("You need to log in to add items to the cart");
      navigate('/login');
    }
  };

  const handleBuyNow = () => {
    if (currentUser) {
      navigate('/payment');
    } else {
      alert("You need to log in to proceed with the purchase");
      navigate('/login');
    }
  };

  return (
    <>
      {data.map((item) => (
        <div
          key={item._id}
          className="bg-white p-4 border rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300"
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
          <div className="flex gap-5">
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
