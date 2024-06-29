import React, { useContext } from "react";
import { useParams } from "react-router-dom";
import { CollectionContext } from "../../Context/CollectionContext";


const CartItemDetails = () => {
  const param = useParams();
  const { productData } = useContext(CollectionContext);

  console.log(param);
  console.log(productData);
  const mappedData = productData.filter((item, index) => {
    return item.id == param.id;
  });
  return (
    <div>
      {mappedData.map((item, index) => (
        <div key={index}>
          <img src={item.image} alt={item.name} />
          <h2>{item.name}</h2>
          <p>{item.description}</p>
          <p>Price:₹  {item.price}</p>
          <p>Quantity:{item.quantity}</p>
        </div>
      ))}
    </div>
  );
};

export default CartItemDetails;
