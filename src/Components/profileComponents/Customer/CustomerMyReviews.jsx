import { useEffect, useState } from "react";
import axios from "axios";
import { Star } from "lucide-react";

const CustomerMyReviews = () => {
  const backendUrl = import.meta.env.VITE_API_BASE_URL;
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const res = await axios.get(`${backendUrl}/api/reviews/my-reviews`, {
          withCredentials: true,
        });
        setReviews(res.data);
      } catch (err) {
        console.error("Error fetching reviews:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchReviews();
  }, []);

  if (loading) return <div className="p-4">Loading reviews...</div>;

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-6">My Product Reviews</h2>

      {reviews.length === 0 ? (
        <p>You haven’t reviewed any products yet.</p>
      ) : (
        <div className="space-y-6">
          {reviews.map((review) => (
            <div key={review._id} className="bg-white p-4 rounded-xl shadow-md">
              <div className="flex items-center gap-4">
                <img
                  src={review.product?.image}
                  alt={review.product?.name}
                  className="w-16 h-16 rounded object-cover"
                />
                <div>
                  <h3 className="text-lg font-semibold">{review.product?.name}</h3>
                  <div className="flex items-center text-yellow-500">
                    {[...Array(review.rating)].map((_, i) => (
                      <Star key={i} size={16} fill="currentColor" />
                    ))}
                    {[...Array(5 - review.rating)].map((_, i) => (
                      <Star key={i} size={16} />
                    ))}
                  </div>
                  <p className="text-gray-600 mt-1">{review.message}</p>
                  <p className="text-sm text-gray-400">
                    Reviewed on {new Date(review.createdAt).toLocaleDateString()}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default CustomerMyReviews;
