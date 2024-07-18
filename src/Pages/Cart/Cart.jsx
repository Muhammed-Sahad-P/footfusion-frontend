import { useContext } from "react";
import { CollectionContext } from "../../Context/CollectionContext";
import CartCard from "../../Components/Shared/CartCard";
import { Link } from "react-router-dom";

const Cart = () => {
  
const {cartItems} = useContext(CollectionContext)
  const cartItemsArray = Object.keys(cartItems).map((key) => ({
    id: key,
    ...cartItems[key],
  }));

  

  return (
    <div className="p-4 mt-24">
      <h2 className="text-center text-3xl font-poppins mb-2">My Cart</h2>
      <br />
      <div>
        <Link
          to="/collection"
          className="bg-[#131842] text-white px-4 mr-10 py-2 mb-10 rounded-lg hover:bg-gray-800 font-poppins"
        >
          Add More Items
        </Link>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 p-4 mt-10">
        <CartCard cartData={cartItemsArray} />
      </div>
    </div>
  );
};

export default Cart;
