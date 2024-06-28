    import React, { createContext, useState } from "react";
    import { ProductData } from "../Components/Products/Product";

    export const CollectionContext = createContext();

    export const CollectionProvider = (props) => {
      const [clickedarray, setClickedarray] = useState([]);

      const addToCart = (itemId) => {
        const Newarray = ProductData.filter((item, index) => {
          return item.id == itemId;
        });
        setClickedarray([...clickedarray, Newarray]);
      };
      console.log(clickedarray);

      const removeFromCart = (itemId) => {
        const removedArray = clickedarray.filter((itemM, index) => {
          return itemM.id !== itemId;
        })
        setClickedarray([...removedArray]);
      }

      const contextValue = { addToCart, removeFromCart, clickedarray };

      return (
        <CollectionContext.Provider value={contextValue}>
          {props.children}
        </CollectionContext.Provider>
      )
    };
