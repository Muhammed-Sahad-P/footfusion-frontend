// import { data } from "autoprefixer";
import { useParams } from "react-router-dom";
import useFetch from "../../utils/useFetch";
// import { ProductData } from "../../Components/Products/Product";

const CartItemDetails = () => {
  const { id } = useParams();
  const productId = parseInt(id, 10);
  // const productDetails = ProductData.filter((item) => item.id === productId);
  const {data} = useFetch("http://localhost:3000/products");
   const productDetails = data.filter((item) => item.id === productId);

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="max-w-2xl w-full bg-white p-6 rounded-lg shadow-md">
        {productDetails.map((item, key) => (
          <div key={key} className="flex flex-col items-center text-center">
            <img
              src={item.image}
              alt={item.name}
              className="w-full h-auto object-cover mb-4 rounded-lg hover:scale-105 transition-transform duration-300"
              style={{ maxWidth: "100%", maxHeight: "300px" }} 
            />
            <h2 className="text-2xl font-semibold mb-2">{item.name}</h2>
            <p className="text-sm text-gray-700 mb-2">{item.type}</p>
            <p className="text-xl text-gray-700 mt-2 mb-4">₹ {item.price}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CartItemDetails;
