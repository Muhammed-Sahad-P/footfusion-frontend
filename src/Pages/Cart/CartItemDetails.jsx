// import { useContext, useState, useEffect } from "react";
// import { Link, useParams } from "react-router-dom";
// import { CollectionContext } from "../../Context/CollectionContext";

// const CartItemDetails = () => {
//   const { productData } = useContext(CollectionContext);
//   const { id } = useParams();
//   const [cartItems, setCartItems] = useState([]);
//   const [totalCost, setTotalCost] = useState(0);

//   useEffect(() => {
//     const initialCart = productData.filter((item) => item.id == id);
//     setCartItems(initialCart);
//     calculateTotal(initialCart);
//   }, [productData, id]);

//   const calculateTotal = (items) => {
//     const total = items.reduce(
//       (sum, item) => sum + item.price ,
//       0
//     );
//     setTotalCost(total);
//     console.log(items);
//   };

//   const handleIncrement = (index) => {
//     const updatedCart = [...cartItems];
//     updatedCart[index].quantity += 1; 
//     setCartItems(updatedCart);
//     calculateTotal(updatedCart);
//   };

//   const handleDecrement = (index) => {
//     const updatedCart = [...cartItems];
//     if (updatedCart[index].quantity > 1) {
//       updatedCart[index].quantity -= 1;
//       setCartItems(updatedCart);
//       calculateTotal(updatedCart); 
//     }
//   };

//   const handleRemove = (index) => {
//     const updatedCart = cartItems.filter((_, i) => i !== index);
//     setCartItems(updatedCart);
//     calculateTotal(updatedCart);
//   };

  
//   const finalTotalCost = totalCost + 50;

//   return (
//     <div className="p-4 max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-6">
//       <div className="lg:col-span-2">
//         <h2 className="text-2xl font-semibold mb-4">Shopping Cart</h2>
//         {cartItems.map((item, index) => (
//           <div
//             key={index}
//             className="border p-4 rounded-lg shadow-md my-4 flex items-center"
//           >
//             <img
//               className="w-24 h-24 object-cover rounded-md"
//               src={item.image}
//               alt={item.name}
//             />
//             <div className="ml-4 flex-grow">
//               <h3 className="text-xl font-semibold">{item.name}</h3>
//               <p className="text-gray-600">{item.type}</p>
//               <p className="text-lg font-bold mt-2">Price: ₹{item.price.toFixed(2)}</p>
//               <p className="text-lg font-bold mt-2">Total: ₹{(item.price*item.quantity).toFixed(2)}</p>
//             </div>
//             <div className="flex items-center">
//               <button
//                 className="px-2 py-1 bg-gray-300 rounded-l"
//                 onClick={() => handleDecrement(index)}
//               >
//                 -
//               </button>
//               <span className="px-4">{item.quantity}</span>
//               <button
//                 className="px-2 py-1 bg-gray-300 rounded-r"
//                 onClick={() => handleIncrement(index)}
//               >
//                 +
//               </button>
//             </div>
//             <button
//               className="ml-4 text-red-500"
//               onClick={() => handleRemove(index)}
//             >
//               Remove
//             </button>
//           </div>
//         ))}
//         <Link to="/collection" className="mt-4 text-blue-500">Continue Shopping</Link>
//       </div>
//       <div className="border p-4 rounded-lg shadow-md">
//         <h2 className="text-2xl font-semibold mb-4">Order Summary</h2>
//         <div className="flex justify-between mb-2">
//           <span>Items ({cartItems.length})</span>
//           <span>₹{totalCost.toFixed(2)}</span>
//         </div>
//         <div className="mb-4">
//           <label className="block text-gray-700">Shipping</label>
//           <select className="w-full px-2 py-1 border rounded">
//             <option>Standard Delivery - ₹50.00</option>
//           </select>
//         </div>
//         <div className="mb-4">
//           <button className="w-full mt-2 px-4 py-2 bg-red-500 text-white rounded">
//             Apply
//           </button>
//         </div>
//         <div className="flex justify-between font-bold text-lg mb-4">
//           <span>Total Cost</span>
//           <span>₹{finalTotalCost.toFixed(2)}</span>
//         </div>
//         <Link
//           to="/payment"
//           className="w-full px-4 py-2 bg-blue-500 text-white rounded-md"
//         >
//           Checkout
//         </Link>
//       </div>
//     </div>
//   );
// };

// export default CartItemDetails;
