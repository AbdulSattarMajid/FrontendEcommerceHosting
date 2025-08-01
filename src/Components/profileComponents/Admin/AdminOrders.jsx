import { useEffect, useState } from 'react';
import axios from 'axios';

const AdminOrders = () => {
  const [orders, setOrders] = useState([]);
  const backendUrl = import.meta.env.VITE_API_BASE_URL;

  useEffect(() => {
    axios.get(`${backendUrl}/api/admin/orders`, { withCredentials: true })
      .then(res => setOrders(res.data.orders))
      .catch(err => console.error("Failed to fetch orders", err));
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">All Orders</h1>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white shadow rounded-lg">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-4 py-2 text-left">Customer</th>
              <th className="px-4 py-2 text-left">Seller</th>
              <th className="px-4 py-2 text-left">Products</th>
              <th className="px-4 py-2 text-left">Total</th>
              <th className="px-4 py-2 text-left">Status</th>
            </tr>
          </thead>
          <tbody>
            {orders.map(order => (
              <tr key={order._id} className="border-b hover:bg-gray-50">
                <td className="px-4 py-2">
                  {order.user?.name} <br />
                  <span className="text-sm text-gray-500">{order.user?.email}</span>
                </td>
                <td className="px-4 py-2">
                  {order.items[0]?.seller?.name || 'N/A'} <br />
                  <span className="text-sm text-gray-500">{order.items[0]?.seller?.email || ''}</span>
                </td>
                <td className="px-4 py-2">
                  {order.items.map((item, i) => (
                    <div key={i}>
                      {item.product?.name} × {item.quantity}
                    </div>
                  ))}
                </td>
                <td className="px-4 py-2">${order.totalPrice}</td>
                <td className="px-4 py-2">{order.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminOrders;
