import { useEffect, useState } from 'react';
import axios from 'axios';

const AdminProducts = () => {
    const backendUrl = import.meta.env.VITE_API_BASE_URL;
    const [products, setProducts] = useState([]);

    useEffect(() => {
        axios.get(`${backendUrl}/api/admin/products`, { withCredentials: true })
            .then(res => setProducts(res.data.products))
            .catch(err => console.error("Failed to fetch products", err));
    }, []);

    return (
        <div className="p-6">
            <h1 className="text-2xl font-bold mb-4">All Products</h1>
            <div className="overflow-x-auto">
                <table className="min-w-full bg-white shadow rounded-lg">
                    <thead className="bg-gray-100">
                        <tr>
                            <th className="px-4 py-2 text-left">Name</th>
                            <th className="px-4 py-2 text-left">Price</th>
                            <th className="px-4 py-2 text-left">Category</th>
                            <th className="px-4 py-2 text-left">Seller</th>
                            <th className="px-4 py-2 text-left">Email</th>

                        </tr>
                    </thead>
                    <tbody>
                        {products.map(product => (
                            <tr key={product._id} className="border-b hover:bg-gray-50">
                                <td className="px-4 py-2">{product.name}</td>
                                <td className="px-4 py-2">${product.price}</td>
                                <td className="px-4 py-2">{product.category.join(', ')}</td>
                                <td className="px-4 py-2">
                                    {product.seller ? `${product.seller.name} ` : 'N/A'}
                                </td>
                                    {product.seller?.email || 'N/A'}
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default AdminProducts;
