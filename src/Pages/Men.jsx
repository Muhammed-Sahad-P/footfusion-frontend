import React, { useState } from 'react'
import { ProductData } from '../Components/Products/Product'

const Men = () => {
  const [mendata,setMendata] = useState(ProductData)
  const menProducts = mendata.filter((item) => item.type === "men");

  return (
    <div className="p-4">
      <h2 className="text-center text-3xl font-semibold mb-2">Men's Products</h2><br/>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {menProducts.map((item, index) => (
          <div key={index} className="bg-white p-4 border rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
            <img src={item.image} alt={item.name} className="w-full h-48 object-cover mb-4 rounded" />
            <h3 className="text-lg font-semibold">{item.name}</h3>
            <p className="text-sm text-gray-500">{item.type}</p>
            <p className="text-xl text-gray-700 mt-2">₹ {item.price}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Men
