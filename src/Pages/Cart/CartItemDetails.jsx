import React,{useContext} from 'react'
import { useParams } from 'react-router-dom'
import { CollectionContext } from "../../Context/CollectionContext";


const CartItemDetails = () => {

  const param = useParams()
  const { clickedarray } = useContext(CollectionContext);
  console.log(param);
  console.log(clickedarray);
  return (
    <div>CartItemDetails</div>
  )
}

export default CartItemDetails
