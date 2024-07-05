import { useState, useEffect } from "react";
import useFetch from "../utils/useFetch";

const ProductDetails = () => {
  const { data, isPending, error } = useFetch("http://localhost:3000/products");
  const [filteredData, setFilteredData] = useState(null);
  const [category, setCategory] = useState("all");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [editProductId, setEditProductId] = useState(null);
  const [productForm, setProductForm] = useState({
    name: "",
    price: "",
    type: "",
    image: ""
  });

  useEffect(() => {
    if (data) {
      if (category === "men") {
        setFilteredData(data.filter(item => item.type === "men"));
      } else if (category === "women") {
        setFilteredData(data.filter(item => item.type === "women"));
      } else {
        setFilteredData(data);
      }
    }
  }, [data, category]);

  const handleDelete = (id) => {
    fetch(`http://localhost:3000/products/${id}`, {
      method: "DELETE"
    }).then(() => {
      setFilteredData(filteredData.filter(item => item.id !== id));
    }).catch(error => {
      console.error('Error deleting product:', error);
    });
  };

  const handleEdit = (product) => {
    setIsEditMode(true);
    setEditProductId(product.id);
    setProductForm({
      name: product.name,
      price: product.price,
      type: product.type,
      image: product.image
    });
    setIsModalOpen(true);
  };

  const handleAddOrEditProduct = () => {
    const method = isEditMode ? "PUT" : "POST";
    const url = isEditMode ? `http://localhost:3000/products/${editProductId}` : "http://localhost:3000/products";
    const productData = isEditMode ? { ...productForm } : { ...productForm, id: Date.now() };

    fetch(url, {
      method: method,
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(productData)
    }).then(() => {
      if (isEditMode) {
        setFilteredData(filteredData.map(item => item.id === editProductId ? productData : item));
      } else {
        setFilteredData([...filteredData, productData]);
      }
      setIsModalOpen(false);
      setProductForm({ name: "", price: "", type: "", image: "" });
      setIsEditMode(false);
      setEditProductId(null);
    }).catch(error => {
      console.error(`Error ${isEditMode ? 'updating' : 'adding'} product:`, error);
    });
  };

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

        <div className="flex justify-center mb-8">
          <button onClick={() => setIsModalOpen(true)} className="bg-yellow-500 text-white px-4 py-2 rounded-lg hover:bg-yellow-700 transition duration-300">
            Add New Product
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
                <button onClick={() => handleEdit(item)} className="bg-blue-500 text-white w-full py-2 rounded-lg hover:bg-blue-700 transition duration-300">
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

      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-8 rounded-lg shadow-lg w-96">
            <h2 className="text-2xl font-semibold mb-4">{isEditMode ? "Edit Product" : "Add New Product"}</h2>
            <form>
              <div className="mb-4">
                <label className="block text-gray-700">Product Name</label>
                <input
                  type="text"
                  value={productForm.name}
                  onChange={(e) => setProductForm({ ...productForm, name: e.target.value })}
                  className="w-full px-3 py-2 border rounded-lg"
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700">Product Price</label>
                <input
                  type="text"
                  value={productForm.price}
                  onChange={(e) => setProductForm({ ...productForm, price: e.target.value })}
                  className="w-full px-3 py-2 border rounded-lg"
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700">Product Type</label>
                <input
                  type="text"
                  value={productForm.type}
                  onChange={(e) => setProductForm({ ...productForm, type: e.target.value })}
                  className="w-full px-3 py-2 border rounded-lg"
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700">Product Image URL</label>
                <input
                  type="text"
                  value={productForm.image}
                  onChange={(e) => setProductForm({ ...productForm, image: e.target.value })}
                  className="w-full px-3 py-2 border rounded-lg"
                />
              </div>
              <div className="flex justify-end">
                <button type="button" onClick={() => { setIsModalOpen(false); setIsEditMode(false); }} className="bg-gray-500 text-white px-4 py-2 rounded-lg mr-2">
                  Cancel
                </button>
                <button type="button" onClick={handleAddOrEditProduct} className="bg-blue-500 text-white px-4 py-2 rounded-lg">
                  {isEditMode ? "Save Changes" : "Add Product"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductDetails;
