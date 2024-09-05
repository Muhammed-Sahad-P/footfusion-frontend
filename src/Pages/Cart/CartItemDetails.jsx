import { useParams } from "react-router-dom";
import useFetch from "../../utils/useFetch";
import Spinner from "../../Components/Spinner";

const CartItemDetails = () => {
  const { id } = useParams();
  const { data: productDetails, isPending, error } = useFetch(`http://localhost:3000/users/product/${id}`);

  return (
    <div className="flex justify-center items-center min-h-screen bg-white">
      <div className="max-w-md w-full bg-white p-6 rounded-3xl shadow-lg">
        {isPending && <div className="flex justify-center items-center h-screen"><Spinner/></div>}
        {error && <div className="text-center text-lg text-red-500">{error}</div>}
        
        {productDetails && (
          <div className="flex flex-col items-center text-center">
            <img
              src={productDetails.image}
              alt={productDetails.name}
              className="w-full h-72 object-cover mb-6 rounded-2xl shadow-md transform transition-transform duration-500 hover:scale-105"
              style={{ maxWidth: "100%", maxHeight: "300px" }}
            />
            <h2 className="text-4xl font-bold text-gray-800 mb-2">{productDetails.name}</h2>
            <h4 className="text-sm text-black mb-4">{productDetails.category}</h4>
            <p className="text-sm text-gray-600 mb-4">{productDetails.description}</p>
            <p className="text-2xl font-semibold text-blue-600">₹ {productDetails.price}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default CartItemDetails;
