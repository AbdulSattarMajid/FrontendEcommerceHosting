import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';

const CourierAssigned = () => {
  const backendUrl = import.meta.env.VITE_API_BASE_URL;
  const [orders, setOrders] = useState([]);

  const fetchAssignedOrders = async () => {
    try {
      const { data } = await axios.get(`${backendUrl}/api/courier/assigned-orders`, {
        withCredentials: true
      });
      if (data.success) {
        setOrders(data.orders);
      }
    } catch (error) {
      console.error(error);
      toast.error('Failed to fetch assigned orders');
    }
  };

  const handleStatusUpdate = async (orderId, newStatus) => {
    try {
      const { data } = await axios.put(`${backendUrl}/api/orders/${orderId}/status`, { status: newStatus }, {
        withCredentials: true
      });
      toast.success(data.message);
      fetchAssignedOrders();
    } catch (err) {
      toast.error(err.response?.data?.message || "Status update failed");
    }
  };

  useEffect(() => {
    fetchAssignedOrders();
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Assigned Deliveries</h1>

      {orders.length === 0 ? (
        <p>No assigned deliveries found.</p>
      ) : (
        <div className="space-y-6">
          {orders.map(order => (
            <div key={order._id} className="border p-4 rounded-xl shadow-md bg-white">
              <div className="mb-2 text-sm text-gray-500">
                Order ID: <span className="font-mono">{order._id}</span>
              </div>
              <div className="mb-2">
                <strong>Customer:</strong> {order.user?.name || 'N/A'} ({order.user?.email})
              </div>

              <div className="mb-2">
                <strong>Items:</strong>
                <ul className="list-disc list-inside text-sm">
                  {order.items.map(item => (
                    <li key={item._id}>
                      {item.product?.name} × {item.quantity}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="mb-2">
                <strong>Status:</strong> <span className="font-semibold text-blue-600">{order.status}</span>
              </div>

              <div className="flex items-center space-x-3">
                {order.status !== 'Delivered' && (
                  <>
                    {order.status === 'Confirmed' && (
                      <button
                        className="px-4 py-1 rounded bg-yellow-500 text-white"
                        onClick={() => handleStatusUpdate(order._id, 'Shipped')}
                      >
                        Mark as Shipped
                      </button>
                    )}
                    {order.status === 'Shipped' && (
                      <button
                        className="px-4 py-1 rounded bg-green-600 text-white"
                        onClick={() => handleStatusUpdate(order._id, 'Delivered')}
                      >
                        Mark as Delivered
                      </button>
                    )}
                  </>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default CourierAssigned;
