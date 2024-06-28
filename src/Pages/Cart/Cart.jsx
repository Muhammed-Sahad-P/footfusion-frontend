import React, { useContext } from "react";
import { CollectionContext } from "../../Context/CollectionContext";
import Card from "../../Components/Shared/Card";

const Cart = () => {

  const {clickedarray} = useContext(CollectionContext)
  console.log(clickedarray);
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 p-4">
      <Card data={[...clickedarray.flat(Infinity)]}/>
    </div>
  );
};

export default Cart;
