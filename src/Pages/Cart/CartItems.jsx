import React, { useContext } from "react";
import { CollectionContext } from "../../Context/CollectionContext";

const CartItems = (props) => {
    const { addToCart } = useContext(CollectionContext) 
  return (
    <div>
        <h1>Cart items</h1>
    </div>
  );
};

export default CartItems;
