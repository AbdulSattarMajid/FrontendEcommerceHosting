// Profile.jsx
import { Routes, Route, Navigate } from "react-router-dom";
import DashboardLayout from "../Components/profileComponents/DashboardLayout";

// Seller components
import SellerAllProducts from "../Components/profileComponents/Seller/SellerAllProducts";
import SellerOverview from "../Components/profileComponents/Seller/SellerOverview";
import SellerAddProduct from "../Components/profileComponents/Seller/SellerAddProduct";

// Customer components
import CustomerOverview from "../Components/profileComponents/Customer/CustomerOverview";
import CustomerOrders from "../Components/profileComponents/Customer/CustomerOrders";
import CustomerWishlist from "../Components/profileComponents/Customer/CustomerWishlist";

// Courier components
import CourierDeliveries from "../Components/profileComponents/Courier/CourierDeliveries";
import CourierOverview from "../Components/profileComponents/Courier/CourierOverview";
import SellerEditProduct from "../Components/profileComponents/Seller/SellerEditProduct";

const Profile = ({ user }) => {
  if (!user) return <Navigate to="/login" />;

  return (
    <DashboardLayout role={user.role}>
      <Routes>
        {user.role === "Seller" && (
          <>
            <Route path="overview" element={<SellerOverview user={user} />} />
            <Route path="add-product" element={<SellerAddProduct />} />
            <Route path="all-products" element={<SellerAllProducts user={user} />} />
            <Route path="edit-product/:id" element={<SellerEditProduct user={user} />} /> 

          </>
        )}
        {user.role === "Customer" && (
          <>
            <Route path="overview" element={<CustomerOverview user={user} />} />
            <Route path="orders" element={<CustomerOrders />} />
            <Route path="wishlist" element={<CustomerWishlist />} />
          </>
        )}
        {user.role === "Courier" && (
          <>
            <Route path="overview" element={<CourierOverview user={user} />} />
            <Route path="deliveries" element={<CourierDeliveries />} />
          </>
        )}
      </Routes>
    </DashboardLayout>
  );
};

export default Profile;
