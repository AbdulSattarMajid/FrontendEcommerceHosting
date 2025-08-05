import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';

const CourierHistory = () => {
  const [orders, setOrders] = useState([]);

  const fetchDeliveredOrders = async () => {
    try {
      const { data } = await axios.get('/api/orders/courier/assigned', {
        withCredentials: true,
      });
      if (data.success) {
        // Filter delivered only
        const deliveredOrders = data.orders.filter(order => order.status === 'Delivered');
        setOrders(deliveredOrders);
      }
    } catch (error) {
      console.error(error);
      toast.error('Failed to fetch delivery history');
    }
  };

  useEffect(() => {
    fetchDeliveredOrders();
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Delivery History</h1>

      {orders.length === 0 ? (
        <p>No completed deliveries found.</p>
      ) : (
        <div className="space-y-6">
          {orders.map(order => (
            <div key={order._id} className="border p-4 rounded-xl shadow bg-white">
              <div className="text-sm text-gray-500 mb-1">
                Order ID: <span className="font-mono">{order._id}</span>
              </div>
              <div className="mb-1">
                <strong>Customer:</strong> {order.user?.name || 'N/A'} ({order.user?.email})
              </div>
              <div className="mb-1">
                <strong>Items:</strong>
                <ul className="list-disc list-inside text-sm">
                  {order.items.map(item => (
                    <li key={item._id}>
                      {item.product?.name} × {item.quantity}
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <strong>Delivered On:</strong>{" "}
                {new Date(order.updatedAt).toLocaleDateString()}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default CourierHistory;
