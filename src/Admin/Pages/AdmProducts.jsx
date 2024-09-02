import { useEffect, useState } from "react";
import { FiEdit, FiTrash2 } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import Spinner from "../../Components/Spinner";

const AdmProducts = () => {
  const [products, setProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const token = localStorage.getItem("token");

        if (!token) {
          throw new Error("You are not authenticated. Please log in.");
        }

        const response = await fetch("http://localhost:3000/admin/products", {
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

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Admin Products</h1>

      <input
        type="text"
        placeholder="Search..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="mb-4 p-2 border border-gray-300 rounded"
      />

      {loading && <Spinner loading={loading} />}
      {error && <p className="text-red-500">{error}</p>}

      {!loading && !error && products.length > 0 && (
        <table className="w-full border-collapse border border-gray-200">
          <thead>
            <tr className="bg-gray-100">
              <th className="border border-gray-300 p-2">Image</th>
              <th className="border border-gray-300 p-2">Name</th>
              <th className="border border-gray-300 p-2">Price</th>
              <th className="border border-gray-300 p-2">Category</th>
              <th className="border border-gray-300 p-2">Edit</th>
              <th className="border border-gray-300 p-2">Delete</th>
            </tr>
          </thead>
          <tbody>
            {products
              .filter?.((product) =>
                product.name.toLowerCase().includes(searchTerm.toLowerCase())
              )
              .map((product) => (
                <tr key={product._id} className="hover:bg-gray-50">
                  <td className="border border-gray-300 p-2 text-center">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-16 h-16 object-cover rounded"
                    />
                  </td>
                  <td className="border border-gray-300 p-2">{product.name}</td>
                  <td className="border border-gray-300 p-2">
                    ${product.price.toFixed(2)}
                  </td>
                  <td className="border border-gray-300 p-2">
                    {product.category}
                  </td>
                  <td className="border border-gray-300 p-2 text-center">
                    <FiEdit
                      className="text-blue-500 cursor-pointer hover:text-blue-600"
                      onClick={() =>
                        navigate(`/admin/edit-product/${product._id}`)
                      }
                    />
                  </td>
                  <td className="border border-gray-300 p-2 text-center">
                    <FiTrash2
                      className="text-red-500 cursor-pointer hover:text-red-600"
                      onClick={() =>
                        navigate(`/admin/delete-product/${product._id}`)
                      }
                    />
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      )}

      {!loading && !error && products.length === 0 && (
        <p className="text-center">No products found</p>
      )}
    </div>
  );
};

export default AdmProducts;
