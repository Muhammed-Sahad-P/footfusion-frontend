import { useContext } from "react";
import { CollectionContext } from "../../Context/CollectionContext";
import { Link, useNavigate } from "react-router-dom";
import { UserContext } from "../../Context/UserContext";

const Card = ({ data }) => {
  const { addToCart } = useContext(CollectionContext);
  const { isLoggedIn } = useContext(UserContext);
  const navigate = useNavigate();

  const handleAddToCart = (itemId) => {
    if (isLoggedIn) {
      addToCart(itemId);
    } else {
      alert("You need to log in to add items to the cart");
      navigate('/login');
    }
  };

  const handleBuyNow = () => {
    if (isLoggedIn) {
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
          key={item.id}
          className="bg-white p-4 border rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300"
        >
          <Link to={`/collection/${item.id}`}>
            <img
              src={item.image}
              alt={item.name}
              className="w-full h-48 object-cover mb-4 rounded hover:scale-90 transition-all"
            />
            <h2 className="text-lg font-semibold">{item.name}</h2>
            <p className="text-sm text-gray-500">{item.type}</p>
            <p className="text-xl text-gray-700 mt-2 mb-5">₹ {item.price}</p>
          </Link>
          <div className="flex gap-5">
            <button
              onClick={() => handleAddToCart(item.id)}
              className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-gray-800"
            >
              Add To Cart
            </button>
            <button
              onClick={handleBuyNow}
              className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-gray-800"
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
