import  { useContext } from "react";
import { CollectionContext } from "../../Context/CollectionContext";
import { Link } from "react-router-dom";



const CartCard = (props) => {
  const { removeFromCart, addToCart, cartItems } = useContext(CollectionContext);
 

  const totalPrice = Object.keys(cartItems).reduce((total, key) => {
    const { price, quantity } = cartItems[key];
    return total + price * quantity;
  }, 0);


  return (
    <>
      {props.cartData.map((item) => (
        <div
          key={item.id}
          className="bg-white p-4 border rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300"
        >
          <img
            src={item.image}
            alt={item.name}
            className="w-full h-48 object-cover mb-4 rounded-lg hover:scale-90 transition-transform duration-300"
          />
          <div className="flex justify-between items-center mb-2">
            <h2 className="text-lg font-semibold">{item.name}</h2>
            <p className="text-gray-700 text-xl font-semibold">₹ {item.price}</p>
          </div>
          <p className="text-sm text-gray-500 mb-2">{item.type}</p>
          <div className="flex items-center mb-4">
            <button
              onClick={() => addToCart(item.id)}
              className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-gray-800 mr-2"
            >
              +
            </button>
            <span className="text-xl font-semibold">{item.quantity}</span>
            <button
              onClick={() => removeFromCart(item.id)}
              className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-gray-800 ml-2"
            >
              -
            </button>
          </div>
          <div className="text-center mt-2">
            <p className="text-xl font-semibold">Item Total: ₹ {item.price * item.quantity}</p>
          </div>
        </div>
      ))}
    <div className="bg-white p-4 border rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 mt-4">
  <div className="text-center">
    <h2 className="text-2xl font-semibold mb-4">Order Summary</h2>
    
    <div className="border-t border-gray-300 pt-4">
      <p className="text-sm font-semibold mb-2">Total Cart Price: ₹ {totalPrice.toFixed(2)}</p>
      <p className="text-sm font-semibold mb-2">Shipping Charge: Free</p>
      <p className="text-sm font-semibold mb-2">Discount: NA</p>
    </div>
    
    <div className="flex justify-between items-center mt-6">
      <p className="text-lg font-semibold">Total:</p>
      <p className="text-lg font-semibold text-red-500">₹ {totalPrice.toFixed(2)}</p>
    </div>
    
    <Link
      to='/payment'
      className="block bg-red-500 mt-6 text-white px-4 py-2 rounded-lg hover:bg-gray-800"
    >
      Proceed to Checkout
    </Link>
  </div>
</div>

    </>
  );
};

export default CartCard;
