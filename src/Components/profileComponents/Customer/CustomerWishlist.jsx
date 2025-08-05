import React, { useEffect, useState } from "react";
import axios from "axios";
import ProductCard from "../../productPageComponents/ProductCard";

const CustomerWishlist = () => {
  const [wishlist, setWishlist] = useState([]);
  const [loading, setLoading] = useState(true);
  const backendUrl = import.meta.env.VITE_API_BASE_URL ;

  useEffect(() => {
    const fetchWishlist = async () => {
      try {
        const res = await axios.get(`${backendUrl}/api/wishlist/get`, {
          withCredentials: true,
        });
        setWishlist(res.data.wishlist);
      } catch (err) {
        console.error("Failed to fetch wishlist", err);
      } finally {
        setLoading(false);
      }
    };

    fetchWishlist();
  }, []);

  if (loading) return <div className="p-6 text-center">Loading wishlist...</div>;

  if (!wishlist.length)
    return <div className="p-6 text-center text-gray-600">Your wishlist is empty.</div>;

  return (
    <div className="p-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {wishlist.map((product) => (
        <ProductCard key={product._id} product={product} wishlist={wishlist} />
      ))}
    </div>
  );
};

export default CustomerWishlist;
