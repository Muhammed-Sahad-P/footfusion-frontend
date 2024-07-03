import  { useState } from "react";
import { ProductData } from "../Components/Products/Product";
import Card from "../Components/Shared/Card";

const Women = () => {
  const [womendata] = useState(ProductData);
  const womenProducts = womendata.filter((item) => item.type === "women");
  return (
    <div className="p-4">
      <h2 className="text-center text-3xl font-semibold mb-2 mt-24">Women Products</h2><br />
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      <Card data={[...womenProducts]}/>
      </div>
    </div>
  );
};

export default Women;
