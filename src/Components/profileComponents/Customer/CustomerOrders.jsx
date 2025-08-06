import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { Dialog } from '@headlessui/react';
import { Star } from 'lucide-react';

const CustomerOrders = () => {
  const backendUrl = import.meta.env.VITE_API_BASE_URL;
  const [orders, setOrders] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [currentProduct, setCurrentProduct] = useState(null);
  const [reviewText, setReviewText] = useState('');
  const [rating, setRating] = useState(0);

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const res = await axios.get(`${backendUrl}/api/orders/my-orders`, {
        withCredentials: true,
      });
      setOrders(res.data.orders || []);
    } catch (err) {
      console.error("Failed to fetch orders:", err);
    }
  };

  const handleCancel = async (id) => {
    try {
      const res = await axios.put(`${backendUrl}/api/orders/cancel/${id}`, {}, {
        withCredentials: true,
      });
      toast.info(res.data.message);
      fetchOrders();
    } catch (err) {
      alert(err.response?.data?.message || "Error canceling order");
    }
  };

  const openReviewModal = (product) => {
    setCurrentProduct(product);
    setIsOpen(true);
  };

  const hasUserReviewedProduct = (order, productId) => {
    return order.reviews?.some(r => r.product === productId);
  };

  const submitReview = async () => {
    if (!rating || !reviewText.trim()) {
      toast.error("Rating and review are required.");
      return;
    }

    const deliveredOrder = orders.find(order =>
      order.status === 'Delivered' &&
      order.items.some(item => item.product._id === currentProduct._id)
    );

    if (!deliveredOrder) {
      toast.error("Unable to find the delivered order for this product.");
      return;
    }

    if (hasUserReviewedProduct(deliveredOrder, currentProduct._id)) {
      toast.error("You have already reviewed this product.");
      return;
    }

    try {
      await axios.post(`${backendUrl}/api/reviews/add-review`, {
        productId: currentProduct._id,
        rating: Number(rating),
        message: reviewText,
        orderId: deliveredOrder._id,
      }, {
        withCredentials: true,
      });

      toast.success("Review submitted!");
      setIsOpen(false);
      setRating(0);
      setReviewText('');
      fetchOrders(); // Refresh the orders to show the updated review status
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to submit review.");
      console.error(err);
    }
  };

  return (
    <div className="bg-white p-6 rounded-2xl shadow-md">
      <h2 className="text-3xl font-bold text-green-700 mb-6">Your Orders</h2>

      {orders.length === 0 ? (
        <p className="text-gray-500">You haven’t placed any orders yet.</p>
      ) : (
        <ul className="space-y-8">
          {orders.map(order => {
            const total = order.items.reduce((acc, i) => acc + i.quantity * i.product.price, 0);
            return (
              <li key={order._id} className="border border-gray-200 rounded-xl p-5 shadow-sm hover:shadow-lg transition">
                <div className="flex justify-between items-center mb-4">
                  <div>
                    <p className="text-sm text-gray-500">Order ID: {order._id}</p>
                    <p className="text-sm text-gray-500">Placed on: {new Date(order.createdAt).toLocaleDateString()}</p>
                  </div>
                  <div className="text-right">
                    <p className={`text-sm font-semibold 
                      ${order.status === 'Delivered' ? 'text-green-600' :
                        order.status === 'Cancelled' ? 'text-red-500' : 'text-yellow-600'}`}>
                      Status: {order.status}
                    </p>
                    <p className="text-sm text-gray-500">
                      Est. Delivery: {new Date(order.estimatedDelivery).toLocaleDateString()}
                    </p>
                  </div>
                </div>

                <div className="divide-y divide-gray-200">
                  {order.items.map((item, idx) => {
                    const reviewed = hasUserReviewedProduct(order, item.product._id);
                    return (
                      <div key={idx} className="flex items-center py-3 gap-4">
                        <img src={item.product.image} alt={item.product.name} className="w-16 h-16 rounded object-cover border" />
                        <div className="flex-1">
                          <p className="font-medium text-gray-800">{item.product.name}</p>
                          <p className="text-sm text-gray-500">Quantity: {item.quantity}</p>
                        </div>
                        <div className="flex flex-col items-end">
                          <p className="text-green-700 font-semibold text-sm">
                            Rs {item.quantity * item.product.price}
                          </p>
                          {order.status === 'Delivered' && (
                            item.reviewed ? (
                              <span className="mt-1 text-xs text-gray-400 italic">Already Reviewed</span>
                            ) : (
                              <button
                                onClick={() => openReviewModal(item.product)}
                                className="mt-1 text-blue-600 text-xs underline hover:text-blue-800"
                              >
                                Leave a Review
                              </button>
                            )
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>

                <div className="flex justify-between items-center mt-4">
                  <p className="text-gray-700 font-medium">Total: Rs {total}</p>

                  {['Pending'].includes(order.status) && (
                    <button
                      onClick={() => handleCancel(order._id)}
                      className="px-4 py-2 bg-red-500 hover:bg-red-600 text-white text-sm rounded-lg transition"
                    >
                      Cancel Order
                    </button>
                  )}
                </div>
              </li>
            );
          })}
        </ul>
      )}

      {/* Review Modal */}
      <Dialog open={isOpen} onClose={() => setIsOpen(false)} className="relative z-50">
        <div className="fixed inset-0 bg-black/30" aria-hidden="true" />
        <div className="fixed inset-0 flex items-center justify-center p-4">
          <Dialog.Panel className="w-full max-w-md rounded-xl bg-white p-6 shadow-lg">
            <Dialog.Title className="text-lg font-bold mb-3">Leave a Review</Dialog.Title>

            <p className="mb-1 font-medium">{currentProduct?.name}</p>

            <div className="flex items-center gap-1 mb-3">
              {[1, 2, 3, 4, 5].map(i => (
                <Star
                  key={i}
                  className={`w-5 h-5 cursor-pointer ${i <= rating ? 'text-yellow-500' : 'text-gray-300'}`}
                  onClick={() => setRating(i)}
                  fill={i <= rating ? 'currentColor' : 'none'}
                />
              ))}
            </div>

            <textarea
              className="w-full border border-gray-300 rounded-md p-2 mb-4"
              rows={4}
              value={reviewText}
              onChange={e => setReviewText(e.target.value)}
              placeholder="Write your thoughts..."
            />

            <div className="flex justify-end gap-2">
              <button
                onClick={() => setIsOpen(false)}
                className="px-4 py-2 text-sm text-gray-700 border rounded-md hover:bg-gray-100"
              >
                Cancel
              </button>
              <button
                onClick={submitReview}
                className="px-4 py-2 text-sm text-white bg-green-600 hover:bg-green-700 rounded-md"
              >
                Submit
              </button>
            </div>
          </Dialog.Panel>
        </div>
      </Dialog>
    </div>
  );
};

export default CustomerOrders;
