const SellerOverview = ({ user }) => {
  return (
    <div className="bg-white p-6 rounded-xl shadow">
      <h2 className="text-2xl font-bold mb-4">Seller Overview</h2>
      <ul className="space-y-2 text-gray-700">
        <li><strong>Name:</strong> {user.name}</li>
        <li><strong>Email:</strong> {user.email}</li>
        <li><strong>Role:</strong> {user.role}</li>
        <li><strong>Joined:</strong> {new Date(user.createdAt).toLocaleDateString()}</li>
      </ul>
    </div>
  );
};

export default SellerOverview;
