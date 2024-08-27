import { useParams } from "react-router-dom";
import useFetch from "../../utils/useFetch";

const CartItemDetails = () => {
  const { id } = useParams();
  const { data: productDetails, isPending, error } = useFetch(`http://localhost:3000/users/product/${id}`);

  return (
    <div className="relative min-h-screen bg-gradient-to-r from-[#a1c4fd] via-[#c2e9fb] to-[#cfd9df]">
      {/* Decorative Background Elements */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <svg
          className="absolute inset-0 w-full h-full -z-10 opacity-40"
          viewBox="0 0 1440 320"
          fill="#ffffff"
        >
          <path
            fillOpacity="1"
            d="M0,64L30,90.7C60,117,120,171,180,160C240,149,300,75,360,37.3C420,0,480,0,540,21.3C600,43,660,107,720,117.3C780,128,840,84,900,64C960,43,1020,43,1080,74.7C1140,107,1200,171,1260,197.3C1320,224,1380,224,1410,224L1440,224L1440,320L0,320Z"
          />
        </svg>
        <div className="absolute inset-0 bg-[#f9f9f9] opacity-30 mix-blend-multiply"></div>
      </div>

      <div className="flex justify-center items-center min-h-screen relative z-10">
        <div className="max-w-md w-full bg-white p-6 rounded-3xl shadow-2xl relative overflow-hidden">
          {/* Card styling */}
          {isPending && <div className="text-center text-lg text-gray-500">Loading...</div>}
          {error && <div className="text-center text-lg text-red-500">{error}</div>}
          
          {productDetails && (
            <div className="relative flex flex-col items-center text-center">
              <img
                src={productDetails.image}
                alt={productDetails.name}
                className="w-full h-72 object-cover mb-6 rounded-2xl shadow-xl transform transition-transform duration-500 hover:scale-105"
                style={{ maxWidth: "100%", maxHeight: "300px" }}
              />
              <h2 className="text-4xl font-bold text-[#2d3748] mb-2">{productDetails.name}</h2>
              <p className="text-sm text-[#4a5568] mb-4">{productDetails.type}</p>
              <p className="text-2xl font-semibold text-[#2b6cb0]">₹ {productDetails.price}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CartItemDetails;
