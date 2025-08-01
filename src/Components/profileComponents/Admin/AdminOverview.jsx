import { useEffect, useState } from "react";
import axios from "axios";

const AdminOverview = () => {
  const backendUrl = import.meta.env.VITE_API_BASE_URL;
  const [stats, setStats] = useState({
    customers: 0,
    sellers: 0,
    couriers: 0,
    admins: 0,
    totalUsers: 0,
  });

  useEffect(() => {
    axios.get(`${backendUrl}/api/admin/stats`, { withCredentials: true })
      .then(res => setStats(res.data))
      .catch(err => console.error(err));
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Admin Overview</h1>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {Object.entries(stats).map(([key, value]) => (
          <div key={key} className="bg-white rounded-2xl shadow p-4">
            <h3 className="text-lg font-semibold capitalize">{key}</h3>
            <p className="text-2xl text-green-600 font-bold">{value}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminOverview;
