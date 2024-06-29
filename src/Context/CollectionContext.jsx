      import React, { createContext, useState } from "react";
      import { ProductData } from "../Components/Products/Product";
      import { useParams } from "react-router-dom";

      export const CollectionContext = createContext();


      export const CollectionProvider = (props) => {
        const [clickedarray, setClickedarray] = useState([]);
        const productData = ProductData
        const param = useParams();

        const addToCart = (itemId) => {
          const Newarray = ProductData.filter((item, index) => {
            return item.id == itemId;
          });
          console.log(itemId,param);
          setClickedarray([...clickedarray, Newarray]);
        };
        console.log(clickedarray);

        const removeFromCart = (itemId) => {
          const removedArray = clickedarray.filter((itemM, index) => {
            return itemM[0].id !== itemId
          })
          setClickedarray([...removedArray]);
        }

  

        const contextValue = { addToCart, removeFromCart, clickedarray,  productData };

        return (
          <CollectionContext.Provider value={contextValue}>
            {props.children}
          </CollectionContext.Provider>
        )
      };
