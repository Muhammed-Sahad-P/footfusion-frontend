import React, { useState } from 'react'
import { ProductData } from '../Components/Products/Product'
import Card from '../Components/Shared/Card';

const Men = () => {
  const [mendata,setMendata] = useState(ProductData)
  const menProducts = mendata.filter((item) => item.type === "men");

  return (
    <div className="p-4">
      <h2 className="text-center text-3xl font-semibold mb-2">Men's Products</h2><br/>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
       <Card data={[...menProducts]}/>
      </div>
    </div>
  );
};

export default Men
