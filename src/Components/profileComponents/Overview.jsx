const Overview = ({ user }) => {
  const { name, email, role, createdAt, address, dob, gender, idCardNumber } = user;

  return (
    <div className="bg-white p-6 rounded-xl shadow">
      <h2 className="text-2xl font-bold mb-4">{role} Overview</h2>
      <ul className="space-y-2 text-gray-700">
        <li><strong>Name:</strong> {name}</li>
        <li><strong>Email:</strong> {email}</li>
        <li><strong>Role:</strong> {role}</li>
        <li><strong>Joined:</strong> {new Date(createdAt).toLocaleDateString()}</li>

        {/* Only show if additional data exists */}
        {gender && <li><strong>Gender:</strong> {gender}</li>}
        {dob && <li><strong>Date of Birth:</strong> {new Date(dob).toLocaleDateString()}</li>}
        {idCardNumber && <li><strong>ID Card:</strong> {idCardNumber}</li>}

        {address && (
          <>
            <li><strong>Address:</strong></li>
            <ul className="ml-4 list-disc text-sm space-y-1">
              {address.street && <li>Street: {address.street}</li>}
              {address.city && <li>City: {address.city}</li>}
              {address.state && <li>State: {address.state}</li>}
              {address.postalCode && <li>Postal Code: {address.postalCode}</li>}
              {address.country && <li>Country: {address.country}</li>}
            </ul>
          </>
        )}
      </ul>
    </div>
  );
};

export default Overview;
