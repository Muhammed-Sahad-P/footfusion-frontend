import { useParams } from "react-router-dom";
import useFetch from "../../utils/useFetch";

const CartItemDetails = () => {
  const { id } = useParams();
  const { data: productDetails, isPending, error } = useFetch(`http://localhost:5000/users/product/${id}`);
  

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="max-w-2xl w-full bg-white p-6 rounded-lg shadow-md font-poppins">
        {isPending && <div>Loading...</div>}
        {error && <div>{error}</div>}
        {productDetails && (
          <div key={productDetails._id} className="flex flex-col items-center text-center">
            <img
              src={productDetails.image}
              alt={productDetails.name}
              className="w-full h-auto object-cover mb-4 rounded-lg hover:scale-105 transition-transform duration-300"
              style={{ maxWidth: "100%", maxHeight: "300px" }}
            />
            <h2 className="text-2xl font-poppins mb-2">{productDetails.name}</h2>
            <p className="text-sm text-gray-700 mb-2">{productDetails.type}</p>
            <p className="text-xl text-gray-700 mt-2 mb-4">₹ {productDetails.price}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default CartItemDetails;
