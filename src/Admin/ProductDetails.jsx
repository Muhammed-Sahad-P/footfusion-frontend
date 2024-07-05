import useFetch from "../utils/useFetch";

const ProductDetails = () => {
  const { data, isPending, error } = useFetch("http://localhost:3000/products");

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-r from-blue-50 to-indigo-100">
      <div className="flex-1 p-8">
        <div className="flex justify-center mb-8 gap-4">
          <button className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition duration-300">
            MEN
          </button>
          <button className="bg-pink-500 text-white px-4 py-2 rounded-lg hover:bg-pink-700 transition duration-300">
            WOMEN
          </button>
          <button className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition duration-300">
            ALL COLLECTION
          </button>
        </div>

        <div className="flex justify-center mb-8">
          <button className="bg-yellow-500 text-white px-4 py-2 rounded-lg hover:bg-yellow-700 transition duration-300">
            Add New Product
          </button>
        </div>

        <>
          {isPending && <div>Loading...</div>}
          {error && <div>{error}</div>}
          {data && (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
              {data.map((item) => (
                <div
                  key={item.id}
                  className="bg-white p-4 border rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300"
                >
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-full h-48 object-cover mb-4 rounded hover:scale-105 transition-transform duration-300"
                  />
                  <h2 className="text-lg font-semibold text-gray-800">
                    {item.name}
                  </h2>
                  <p className="text-sm text-gray-500">{item.type}</p>
                  <p className="text-xl text-gray-700 mt-2 mb-4">
                    ₹ {item.price}
                  </p>
                  <div className="flex justify-between gap-2">
                    <button className="bg-blue-500 text-white w-full py-2 rounded-lg hover:bg-blue-700 transition duration-300">
                      Edit
                    </button>
                    <button className="bg-red-500 text-white w-full py-2 rounded-lg hover:bg-red-700 transition duration-300">
                      Delete
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </>
      </div>
      <footer className="bg-gray-800 text-white p-4 text-center">
        &copy; 2024 Your Company. All rights reserved.
      </footer>
    </div>
  );
};

export default ProductDetails;
