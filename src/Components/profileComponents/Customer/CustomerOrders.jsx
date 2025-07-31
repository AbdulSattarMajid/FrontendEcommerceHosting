import React, { useEffect, useState } from 'react';
import axios from 'axios';

const CustomerOrders = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/orders/my-orders", {
        withCredentials: true,
      });
      setOrders(res.data.orders || []);
    } catch (err) {
      console.error("Failed to fetch orders:", err);
    }
  };

  const handleCancel = async (id) => {
    try {
      const res = await axios.put(`http://localhost:5000/api/orders/cancel/${id}`, {}, {
        withCredentials: true,
      });
      alert(res.data.message);
      fetchOrders(); // Refresh
    } catch (err) {
      alert(err.response?.data?.message || "Error canceling order");
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
                  {order.items.map((item, idx) => (
                    <div key={idx} className="flex items-center py-3 gap-4">
                      <img src={item.product.image} alt={item.product.name} className="w-16 h-16 rounded object-cover border" />
                      <div className="flex-1">
                        <p className="font-medium text-gray-800">{item.product.name}</p>
                        <p className="text-sm text-gray-500">Quantity: {item.quantity}</p>
                      </div>
                      <p className="text-green-700 font-semibold text-sm">
                        Rs {item.quantity * item.product.price}
                      </p>
                    </div>
                  ))}
                </div>

                <div className="flex justify-between items-center mt-4">
                  <p className="text-gray-700 font-medium">Total: Rs {total}</p>

                  {['Pending', 'Confirmed'].includes(order.status) && (
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
    </div>
  );
};

export default CustomerOrders;
