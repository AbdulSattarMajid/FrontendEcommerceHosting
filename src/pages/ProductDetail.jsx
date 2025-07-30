import React, { useEffect, useState } from "react";
import { useLocation, useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import Cart from "../Images/exploreImages/cart.svg";

const ProductDetail = () => {
  const location = useLocation();
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(location.state?.product || null);
  const [loading, setLoading] = useState(!location.state?.product);
  const [error, setError] = useState(null);
  const backendUrl = import.meta.env.VITE_API_BASE_URL;

  useEffect(() => {
    if (!product) {
      const fetchProduct = async () => {
        try {
          const res = await axios.get(`${backendUrl}/api/products/${id}`);
          setProduct(res.data.product);
        } catch (err) {
          setError("Product not found");
        } finally {
          setLoading(false);
        }
      };
      fetchProduct();
    }
  }, [id, product]);

  if (loading)
    return (
      <div className="flex items-center justify-center h-screen text-xl">
        Loading...
      </div>
    );

  if (error || !product)
    return (
      <div className="flex flex-col items-center justify-center h-screen text-center px-4">
        <h2 className="text-3xl font-bold text-red-500">
          {error || "Product not found"}
        </h2>
        <button
          onClick={() => navigate(-1)}
          className="mt-6 px-6 py-2 bg-gray-800 text-white rounded hover:bg-gray-700 transition"
        >
          Go Back
        </button>
      </div>
    );

  return (
    <div className="max-w-6xl mx-auto px-4 pt-24 pb-16">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
        {/* Product Image */}
        <div className="w-full max-w-[520px] h-[520px] bg-gray-100 rounded-xl shadow-lg flex items-center justify-center overflow-hidden mx-auto">
          <img
            src={product.image}
            alt={product.name}
            className="max-w-full max-h-full object-contain transition-transform duration-300 hover:scale-105"
          />
        </div>

        {/* Product Info */}
        <div className="space-y-6">
          <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-900">
            {product.name}
          </h1>

          <div className="flex flex-wrap items-center gap-4">
            <p className="text-2xl text-blue-600 font-semibold">
              Rs {product.price}
            </p>
            <span className="text-sm text-green-600 bg-green-100 px-3 py-1 rounded-full font-medium">
              In Stock: {product.stock}
            </span>
          </div>

          <p className="text-sm text-gray-500">
            Sold by:{" "}
            <span className="font-semibold">{product.seller?.name || "N/A"}</span>
          </p>

          <div className="flex items-center text-yellow-500 space-x-2">
            <span className="text-xl">★</span>
            <span className="text-gray-800">
              {product.rating || (4 + Math.random()).toFixed(1)} / 5
            </span>
          </div>

          <p className="text-gray-600 leading-relaxed text-sm sm:text-base">
            {product.description}
          </p>

          <button className="flex items-center gap-2 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white px-6 py-3 rounded-full shadow-md transition-transform hover:scale-105">
            <img src={Cart} alt="Cart" className="w-5 h-5" />
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
