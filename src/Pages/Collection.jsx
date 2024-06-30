
import { ProductData } from "../Components/Products/Product";
import Card from "../Components/Shared/Card";

const Collection = () => {
  

  return (
    <div className="p-4">
      <h2 className="text-center text-3xl font-semibold mb-2">
        All Collections
      </h2>
      <br />
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 p-4">
        <Card data={ProductData} />
      </div>
    </div>
  );
};

export default Collection;
