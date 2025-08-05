import React, { useEffect, useState } from 'react';
import axios from 'axios';

const AdminAssignCouriers = () => {
    const backendUrl = import.meta.env.VITE_API_BASE_URL;
    const [orders, setOrders] = useState([]);
    const [couriers, setCouriers] = useState([]);
    const [assignments, setAssignments] = useState({});

    useEffect(() => {
        const fetchOrders = async () => {
            const res = await axios.get(`${backendUrl}/api/admin/orders`, { withCredentials: true });
            setOrders(
                res.data.orders.filter(order => !order.courier && order.status === 'Pending')
            );
        };

        const fetchCouriers = async () => {
            const res = await axios.get(`${backendUrl}/api/admin/couriers`, { withCredentials: true });
            setCouriers(res.data.couriers);
        };

        fetchOrders();
        fetchCouriers();
    }, []);

    const handleAssign = async (orderId) => {
        const courierId = assignments[orderId];
        if (!courierId) return alert("Please select a courier");

        try {
            const res = await axios.put(
                `${backendUrl}/api/orders/${orderId}/assign-courier`,
                { courierId },
                { withCredentials: true }
            );
            alert("Courier assigned!");
            setOrders(prev => prev.filter(o => o._id !== orderId));
        } catch (err) {
            console.error("Assign courier failed:", err.response?.data || err.message);
            alert("Assignment failed");
        }
    };

    return (
        <div className="p-6">
            <h1 className="text-3xl font-bold mb-6">Assign Couriers to Pending Orders</h1>

            {orders.length === 0 ? (
                <div className="text-gray-600 text-center mt-10">🎉 All pending orders are assigned!</div>
            ) : (
                <div className="space-y-6">
                    {orders.map(order => (
                        <div
                            key={order._id}
                            className="bg-white p-6 rounded-2xl shadow-lg border border-gray-200"
                        >
                            <div className="mb-4">
                                <h2 className="text-xl font-semibold text-gray-800">Order ID: <span className="text-blue-600">{order._id}</span></h2>
                                <p className="text-sm text-gray-500">Status: {order.status}</p>
                                <p className="text-sm text-gray-500">Ordered by: <span className="font-medium">{order.user?.name || "Unknown"}</span></p>
                            </div>

                            <div className="overflow-x-auto">
                                <table className="min-w-full text-sm text-left">
                                    <thead>
                                        <tr className="bg-gray-100 text-gray-600 uppercase tracking-wider">
                                            <th className="px-4 py-2">Product</th>
                                            <th className="px-4 py-2">Qty</th>
                                            <th className="px-4 py-2">Price</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {order.items.map((item, idx) => (
                                            <tr key={idx} className="border-t">
                                                <td className="px-4 py-2">{item.product?.name || 'Product'}</td>
                                                <td className="px-4 py-2">{item.quantity}</td>
                                                <td className="px-4 py-2">Rs {item.product?.price?.toLocaleString()}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>

                            <div className="mt-4 flex items-center gap-4">
                                <select
                                    className="p-2 border rounded w-64"
                                    onChange={(e) =>
                                        setAssignments({ ...assignments, [order._id]: e.target.value })
                                    }
                                    defaultValue=""
                                >
                                    <option value="" disabled>Select Courier</option>
                                    {couriers.map(c => (
                                        <option key={c._id} value={c._id}>
                                            {c.name} ({c.email})
                                        </option>
                                    ))}
                                </select>

                                <button
                                    onClick={() => handleAssign(order._id)}
                                    className="px-5 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded transition"
                                >
                                    Assign Courier
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default AdminAssignCouriers;
