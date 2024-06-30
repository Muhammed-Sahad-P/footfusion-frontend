import { useContext } from "react";
import { CollectionContext } from "../../Context/CollectionContext";
import CartCard from "../../Components/Shared/CartCard";
import { Link, useNavigate } from "react-router-dom";
import { UserContext } from "../../Context/UserContext";
import { ProductData } from "../../Components/Products/Product";

const Cart = () => {
  const navigate = useNavigate()
  const { cartItems,setBuyItems } = useContext(CollectionContext)
  const { currentUser } = useContext(UserContext)
  const cartItemsArray = Object.keys(cartItems).map((key) => ({
    id: key,
    ...cartItems[key],
  }));

  // const totalAmount = Object.keys(cartItems).reduce((acc, itemId) => {
  //   const product = ProductData.find((item) => item.id === itemId);
  //   return acc + Number(product.discountPrice) * Number(cartItems[itemId]);
  // }, 0);
 
  function handleCheckout() {
    if (!currentUser) {
      navigate("/login");
      return;
    }
    setBuyItems(cartItems);
    navigate("/checkout");
  }

  return (
    <div className="p-4">
      <h2 className="text-center text-3xl font-semibold mb-2">My Carts</h2>
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
        <CartCard cartData={cartItemsArray} />
      </div>
      
      <button>Checkout</button>
    </div>
  );
};

export default Cart;
