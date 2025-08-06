import React, { useEffect, useState } from 'react';
import axios from 'axios';

const SellerReviews = () => {
      const backendUrl = import.meta.env.VITE_API_BASE_URL;
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const res = await axios.get(`${backendUrl}/api/reviews/seller-reviews`,{
        withCredentials: true,
       });
        setReviews(res.data.reviews);
      } catch (err) {
        console.error('Error fetching reviews:', err);
      }
    };

    fetchReviews();
  }, []);

  return (
    <div className="p-6 bg-white rounded-lg shadow">
      <h2 className="text-2xl font-semibold mb-4">Product Reviews</h2>
      {reviews.length === 0 ? (
        <p>No reviews found.</p>
      ) : (
        <ul className="space-y-4">
          {reviews.map((review) => (
            <li key={review._id} className="border-b pb-4">
              <div className="flex items-center space-x-4">
                <img src={review.product.image} alt={review.product.name} className="w-16 h-16 object-cover" />
                <div>
                  <h3 className="font-bold">{review.product.name}</h3>
                  <p className="text-sm text-gray-600">Rating: {review.rating} / 5</p>
                  <p>{review.message}</p>
                  <p className="text-xs text-gray-400 mt-1">By: {review.user.name}</p>
                </div>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default SellerReviews;
