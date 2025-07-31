import { useEffect, useState } from "react";
import axios from "axios";

const SellerOrdersReceived = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/seller/orders-received", { withCredentials: true });
        setOrders(res.data.orders);
      } catch (err) {
        console.error("Failed to fetch seller orders:", err);
      }
    };

    fetchOrders();
  }, []);

  return (
    <div className="p-6">
      <h2 className="text-3xl font-bold text-green-700 mb-8">📦 Orders Received</h2>

      {orders.length === 0 ? (
        <div className="text-gray-600 text-lg">No orders received yet.</div>
      ) : (
        <div className="grid gap-6">
          {orders.map((order) => {
            const filteredItems = order.items.filter(item => item.product?.name);
            const total = filteredItems.reduce((sum, item) => sum + item.product.price * item.quantity, 0);

            return (
              <div key={order._id} className="bg-white border border-gray-200 rounded-xl shadow-md p-6 hover:shadow-lg transition">
                <div className="flex justify-between items-center mb-4">
                  <div>
                    <h3 className="text-xl font-semibold text-blue-800">Order ID: {order._id.slice(-6)}</h3>
                    <p className="text-sm text-gray-600">Customer: <span className="font-medium">{order.user.name}</span> ({order.user.email})</p>
                    <p className="text-sm text-gray-500">Date: {new Date(order.createdAt).toLocaleString()}</p>
                  </div>
                  <div className="text-right">
                    <span className="text-sm px-3 py-1 rounded-full bg-green-100 text-green-700 font-medium">
                      {order.status || "Processing"}
                    </span>
                    <p className="text-md font-bold mt-1 text-gray-800">{total}Rs</p>
                  </div>
                </div>

                <div className="space-y-3">
                  {filteredItems.map((item, index) => (
                    <div key={index} className="flex items-center gap-4 bg-blue-50 p-3 rounded-md">
                      <img
                        src={item.product.image}
                        alt={item.product.name}
                        className="w-16 h-16 rounded object-cover border border-gray-300"
                      />
                      <div className="flex-1">
                        <h4 className="font-medium text-gray-800">{item.product.name}</h4>
                        <p className="text-sm text-gray-600">
                          {item.quantity} × {item.product.price}Rs = <span className="font-semibold text-gray-800">Rs{item.quantity * item.product.price}</span>
                        </p>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="mt-4 text-sm text-gray-500 italic">
                  Estimated delivery in {Math.floor(Math.random() * 4) + 3} days
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default SellerOrdersReceived;
