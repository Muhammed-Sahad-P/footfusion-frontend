import { useState, useEffect } from "react";
import useFetch from "../utils/useFetch";

const ProductDetails = () => {
  const { data, isPending, error } = useFetch("http://localhost:3000/products");
  const [filteredData, setFilteredData] = useState(null); // State to hold filtered products
  const [category, setCategory] = useState("all"); // State to track selected category

  useEffect(() => {
    // Set filteredData based on selected category
    if (data) {
      if (category === "men") {
        setFilteredData(data.filter(item => item.type === "men"));
      } else if (category === "women") {
        setFilteredData(data.filter(item => item.type === "women"));
      } else {
        setFilteredData(data); // Display all products
      }
    }
  }, [data, category]);

  const handleDelete = (id) => {
    // Delete product logic
    fetch(`http://localhost:3000/products/${id}`, {
      method: "DELETE"
    }).then(() => {
      setFilteredData(filteredData.filter(item => item.id !== id));
    }).catch(error => {
      console.error('Error deleting product:', error);
    });
  };

  const handleEdit = (id) => {
    // Edit product logic
    const productName = prompt("Enter the new product name:");
    const productPrice = prompt("Enter the new product price:");
    const productImg = prompt("Set new product image:");

    fetch(`http://localhost:3000/products/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ name: productName, price: productPrice, image: productImg })
    }).then(() => {
      setFilteredData(filteredData.map(item => item.id === id ? { ...item, name: productName, price: productPrice, image: productImg } : item));
    }).catch(error => {
      console.error('Error updating product:', error);
    });
  };

  if (isPending) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-r from-blue-50 to-indigo-100">
      <div className="flex-1 p-8">
        <div className="flex justify-center mb-8 gap-4">
          <button onClick={() => setCategory("men")} className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition duration-300">
            MEN
          </button>
          <button onClick={() => setCategory("women")} className="bg-pink-500 text-white px-4 py-2 rounded-lg hover:bg-pink-700 transition duration-300">
            WOMEN
          </button>
          <button onClick={() => setCategory("all")} className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition duration-300">
            ALL COLLECTION
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {filteredData && filteredData.map((item) => (
            <div key={item.id} className="bg-white p-4 border rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
              <img src={item.image} alt={item.name} className="w-full h-48 object-cover mb-4 rounded hover:scale-105 transition-transform duration-300" />
              <h2 className="text-lg font-semibold text-gray-800">{item.name}</h2>
              <p className="text-sm text-gray-500">{item.type}</p>
              <p className="text-xl text-gray-700 mt-2 mb-4">₹ {item.price}</p>
              <div className="flex justify-between gap-2">
                <button onClick={() => handleEdit(item.id)} className="bg-blue-500 text-white w-full py-2 rounded-lg hover:bg-blue-700 transition duration-300">
                  Edit
                </button>
                <button onClick={() => handleDelete(item.id)} className="bg-red-500 text-white w-full py-2 rounded-lg hover:bg-red-700 transition duration-300">
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
