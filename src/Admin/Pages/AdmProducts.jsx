import { useEffect, useState } from "react";
import { FiTrash2, FiPlus, FiX } from "react-icons/fi";
import { MdOutlineModeEdit } from "react-icons/md";
import Spinner from "../../Components/Spinner";
import Pagination from "../../Components/Pagination";

const AdmProducts = () => {
  const [products, setProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [productsPerPage] = useState(5);
  const [isAddPopupOpen, setIsAddPopupOpen] = useState(false);
  const [isEditPopupOpen, setIsEditPopupOpen] = useState(false);
  const [newProduct, setNewProduct] = useState({
    name: "",
    description: "",
    price: "",
    category: "",
    image: "",
  });
  const [editProduct, setEditProduct] = useState(null);
  const [popupError, setPopupError] = useState("");

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const token = localStorage.getItem("token");

        if (!token) {
          throw new Error("You are not authenticated. Please log in.");
        }

        const response = await fetch("http://localhost:3000/admin/products", {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
          credentials: "include",
        });

        if (!response.ok) {
          throw new Error("Failed to fetch products");
        }

        const data = await response.json();
        setProducts(data.products);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = products
    .filter((product) =>
      product.name.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .slice(indexOfFirstProduct, indexOfLastProduct);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const nextPage = () =>
    setCurrentPage((prev) =>
      Math.min(prev + 1, Math.ceil(products.length / productsPerPage))
    );

  const prevPage = () => setCurrentPage((prev) => Math.max(prev - 1, 1));

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (editProduct) {
      setEditProduct((prev) => ({ ...prev, [name]: value }));
    } else {
      setNewProduct((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleAddSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");

      if (!token) {
        throw new Error("You are not authenticated. Please log in.");
      }

      const response = await fetch("http://localhost:3000/admin/product", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        credentials: "include",
        body: JSON.stringify(newProduct),
      });

      if (!response.ok) {
        throw new Error("Failed to create product");
      }

      const data = await response.json();
      setProducts((prev) => [...prev, data.newProduct]);
      setNewProduct({
        name: "",
        description: "",
        price: "",
        category: "",
        image: "",
      });
      setIsAddPopupOpen(false);
    } catch (error) {
      setPopupError(error.message);
    }
  };

  const handleEditSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");

      if (!token) {
        throw new Error("You are not authenticated. Please log in.");
      }

      const response = await fetch(
        `http://localhost:3000/admin/product/${editProduct._id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          credentials: "include",
          body: JSON.stringify(editProduct),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to update product");
      }

      const data = await response.json();
      setProducts((prev) =>
        prev.map((product) =>
          product._id === editProduct._id ? data.updatedProduct : product
        )
      );
      setEditProduct(null);
      setIsEditPopupOpen(false);
    } catch (error) {
      setPopupError(error.message);
    }
  };

  const handleDelete = async (productId) => {
    try {
      const token = localStorage.getItem("token");

      if (!token) {
        throw new Error("You are not authenticated. Please log in.");
      }

      const response = await fetch(
        `http://localhost:3000/admin/product/${productId}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
          },
          credentials: "include",
        }
      );

      if (!response.ok) {
        throw new Error("Failed to delete product");
      }

      setProducts((prev) =>
        prev.filter((product) => product._id !== productId)
      );
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div className="p-6 max-w-7xl ml-20 mt-10 bg-white rounded-lg shadow-lg">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-gray-900">Product Management</h1>
        <button
          onClick={() => setIsAddPopupOpen(true)}
          className="flex items-center gap-1 bg-[#0A043C] text-white px-4 py-2 rounded hover:bg-[#0A043C]/90"
        >
          <FiPlus className="text-white" /> Product
        </button>
      </div>

      <input
        type="text"
        placeholder="Search..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="mb-4 p-2 border border-gray-300 rounded w-full max-w-md mx-auto block"
      />

      {loading && (
        <div className="flex justify-center items-center h-screen">
          <Spinner />
        </div>
      )}
      {error && <p className="text-red-500 text-center">{error}</p>}

      {!loading && !error && currentProducts.length > 0 && (
        <div className="overflow-x-auto">
          <table className="w-full border-collapse border border-gray-200 text-sm">
            <thead>
              <tr className="bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-white uppercase text-xs leading-normal">
                <th className="border border-gray-200 p-2">Image</th>
                <th className="border border-gray-200 p-2">Name</th>
                <th className="border border-gray-200 p-2">Price</th>
                <th className="border border-gray-200 p-2">Category</th>
                <th className="border border-gray-200 p-2">Edit</th>
                <th className="border border-gray-200 p-2">Delete</th>
              </tr>
            </thead>
            <tbody>
              {currentProducts.map((product) => (
                <tr
                  key={product._id}
                  className="hover:bg-gray-50 transition-all duration-200 ease-in-out"
                >
                  <td className="border border-gray-200 p-2 text-center">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-12 h-12 object-cover rounded"
                    />
                  </td>
                  <td className="border border-gray-200 p-2">{product.name}</td>
                  <td className="border border-gray-200 p-2">
                    ₹{product.price.toFixed(2)}
                  </td>
                  <td className="border border-gray-200 p-2">
                    {product.category}
                  </td>
                  <td className="border border-gray-200 p-2 text-center">
                    <MdOutlineModeEdit
                      className="text-[#238737] cursor-pointer hover:text-[#1f8c1f] text-xl"
                      onClick={() => {
                        setEditProduct(product);
                        setIsEditPopupOpen(true);
                      }}
                    />
                  </td>
                  <td className="border border-gray-200 p-2 text-center">
                    <FiTrash2
                      className="text-red-600 cursor-pointer hover:text-red-800 text-xl"
                      onClick={() => handleDelete(product._id)}
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {currentProducts.length === 0 && !loading && !error && (
        <p className="text-center text-gray-600">No products found</p>
      )}

      {products.length > productsPerPage && (
        <div className="mt-4 flex justify-center">
          <Pagination
            itemsPerPage={productsPerPage}
            totalItems={products.length}
            currentPage={currentPage}
            paginate={paginate}
            nextPage={nextPage}
            prevPage={prevPage}
          />
        </div>
      )}

      {isAddPopupOpen && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg w-full max-w-md">
            <h2 className="text-2xl font-bold mb-4">Add New Product</h2>
            {popupError && <p className="text-red-500 mb-4">{popupError}</p>}
            <form onSubmit={handleAddSubmit}>
              <div className="mb-4">
                <label className="block text-sm font-medium mb-1">Name</label>
                <input
                  type="text"
                  name="name"
                  value={newProduct.name}
                  onChange={handleChange}
                  className="w-full border border-gray-300 p-2 rounded"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium mb-1">
                  Description
                </label>
                <textarea
                  name="description"
                  value={newProduct.description}
                  onChange={handleChange}
                  className="w-full border border-gray-300 p-2 rounded"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium mb-1">Price</label>
                <input
                  type="number"
                  name="price"
                  value={newProduct.price}
                  onChange={handleChange}
                  className="w-full border border-gray-300 p-2 rounded"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium mb-1">Category</label>
                <input
                  type="text"
                  name="category"
                  value={newProduct.category}
                  onChange={handleChange}
                  className="w-full border border-gray-300 p-2 rounded"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium mb-1">Image URL</label>
                <input
                  type="text"
                  name="image"
                  value={newProduct.image}
                  onChange={handleChange}
                  className="w-full border border-gray-300 p-2 rounded"
                  required
                />
              </div>
              <div className="flex justify-between">
                <button
                  type="button"
                  onClick={() => setIsAddPopupOpen(false)}
                  className="bg-gray-300 text-black px-4 py-2 rounded hover:bg-red-500 hover:text-white"
                >
                  <FiX className="inline" /> Cancel
                </button>
                <button
                  type="submit"
                  className="bg-[#0A043C] text-white px-4 py-2 rounded hover:bg-[#0A043C]/90"
                >
                  Add Product
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {isEditPopupOpen && editProduct && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg w-full max-w-md">
            <h2 className="text-2xl font-bold mb-4">Edit Product</h2>
            {popupError && <p className="text-red-500 mb-4">{popupError}</p>}
            <form onSubmit={handleEditSubmit}>
              <div className="mb-4">
                <label className="block text-sm font-medium mb-1">Name</label>
                <input
                  type="text"
                  name="name"
                  value={editProduct.name}
                  onChange={handleChange}
                  className="w-full border border-gray-300 p-2 rounded"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium mb-1">
                  Description
                </label>
                <textarea
                  name="description"
                  value={editProduct.description}
                  onChange={handleChange}
                  className="w-full border border-gray-300 p-2 rounded"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium mb-1">Price</label>
                <input
                  type="number"
                  name="price"
                  value={editProduct.price}
                  onChange={handleChange}
                  className="w-full border border-gray-300 p-2 rounded"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium mb-1">Category</label>
                <input
                  type="text"
                  name="category"
                  value={editProduct.category}
                  onChange={handleChange}
                  className="w-full border border-gray-300 p-2 rounded"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium mb-1">Image URL</label>
                <input
                  type="text"
                  name="image"
                  value={editProduct.image}
                  onChange={handleChange}
                  className="w-full border border-gray-300 p-2 rounded"
                  required
                />
              </div>
              <div className="flex justify-between">
                <button
                  type="button"
                  onClick={() => setIsEditPopupOpen(false)}
                  className="bg-gray-300 text-black px-4 py-2 rounded hover:bg-red-500 hover:text-white"
                >
                  <FiX className="inline" /> Cancel
                </button>
                <button
                  type="submit"
                  className="bg-[#0A043C] text-white px-4 py-2 rounded hover:bg-[#0A043C]/90"
                >
                  Update Product
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdmProducts;
