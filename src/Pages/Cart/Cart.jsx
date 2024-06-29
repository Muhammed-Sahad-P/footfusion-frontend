import  { useContext } from "react";
import { CollectionContext } from "../../Context/CollectionContext";
import CartCard from "../../Components/Shared/CartCard";
import { Link } from "react-router-dom";

const Cart = () => {
  const { clickedarray } = useContext(CollectionContext);
  console.log(clickedarray);

  return (
    <div className="p-4">
      <h2 className="text-center text-3xl font-semibold mb-2">My carts</h2>
      <br />
      <div>
        <Link
          to="/collection"
          className="bg-red-700 text-white px-4 py-2 rounded-lg hover:bg-red-600 font-serif"
        >
          Add
        </Link>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 p-4">
        <CartCard cartData={clickedarray.flat(Infinity)} />
      </div>
    </div>
  );
};

export default Cart;
