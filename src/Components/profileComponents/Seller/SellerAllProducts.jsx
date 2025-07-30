import { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const SellerAllProducts = ({ user }) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const backendUrl = (import.meta.env.VITE_API_BASE_URL || "").replace(/\/$/, "");
  const navigate = useNavigate();

  useEffect(() => {
    if (!user?._id) return;

    setLoading(true);
    axios.get(`${backendUrl}/products/seller/${user._id}`, {
      withCredentials: true,
    })
      .then(res => {
        setProducts(res.data.products || []);
      })
      .catch(err => console.error("Failed to load products", err))
      .finally(() => setLoading(false));
  }, [user]);

  const handleDelete = async (productId) => {
    const confirm = window.confirm("Are you sure you want to delete this product?");
    if (!confirm) return;

    try {
      await axios.delete(`${backendUrl}/products/${productId}`, {
        withCredentials: true,
      });

      setProducts(prev => prev.filter(p => p._id !== productId));
    } catch (err) {
      console.error("Failed to delete product", err);
      alert("Failed to delete product. Please try again.");
    }
  };

  return (
    <div className="p-6">
      <h2 className="text-3xl font-bold text-blue-800 mb-6 text-center">Your Product Listings</h2>

      {loading ? (
        <p className="text-center text-gray-500">Loading your products...</p>
      ) : products.length === 0 ? (
        <p className="text-center text-gray-500">No products found.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {products.map((prod) => (
            <div
              key={prod._id}
              className="bg-white rounded-2xl shadow-md hover:shadow-lg transition p-4 flex flex-col"
            >
              {prod.image && (
                <img
                  src={prod.image}
                  alt={prod.name}
                  className="h-48 w-full object-cover rounded-xl mb-3"
                />
              )}
              <h3 className="text-xl font-semibold text-gray-800 truncate">{prod.name}</h3>
              <p className="text-sm text-gray-600 line-clamp-2">{prod.description}</p>

              <div className="mt-2 text-sm space-y-1 text-gray-700">
                <p><b>Price:</b> ${prod.price}</p>
                <p><b>Stock:</b> {prod.stock}</p>
                <p><b>Created:</b> {new Date(prod.createdAt).toLocaleString()}</p>
              </div>

              <div className="flex gap-2 mt-auto pt-4">
                <button
                  onClick={() => navigate(`/dashboard/edit-product/${prod._id}`)}
                  className="flex-1 bg-blue-600 hover:bg-blue-700 text-white rounded-lg py-2 text-sm font-medium transition"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(prod._id)}
                  className="flex-1 bg-red-500 hover:bg-red-600 text-white rounded-lg py-2 text-sm font-medium transition"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default SellerAllProducts;
