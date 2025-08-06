// Profile.jsx
import { Routes, Route, Navigate } from "react-router-dom";
import DashboardLayout from "../Components/profileComponents/DashboardLayout";

// Seller components
import SellerAllProducts from "../Components/profileComponents/Seller/SellerAllProducts";
import SellerAddProduct from "../Components/profileComponents/Seller/SellerAddProduct";
import SellerOrdersReceived from "../Components/profileComponents/Seller/SellerOrdersReceived";
import SellerEditProduct from "../Components/profileComponents/Seller/SellerEditProduct";

// Customer components
import CustomerOrders from "../Components/profileComponents/Customer/CustomerOrders";
import CustomerWishlist from "../Components/profileComponents/Customer/CustomerWishlist";

// Courier components
import CourierAssigned from "../Components/profileComponents/Courier/CourierAssigned";
import CourierHistory from "../Components/profileComponents/Courier/CourierHistory";


import CCart from "../Components/profileComponents/Customer/CustomerCart";
import SettingsPage from "../Components/profileComponents/SettingsPage";
import Overview from "../Components/profileComponents/Overview";

//Admin components
import AdminOverview from "../Components/profileComponents/Admin/AdminOverview";
import AdminUsers from "../Components/profileComponents/Admin/AdminUsers";
import AdminProducts from "../Components/profileComponents/Admin/AdminProducts";
import AdminOrders from "../Components/profileComponents/Admin/AdminOrders";
import AdminAssignCouriers from "../Components/profileComponents/Admin/AdminAssignCouriers";
import CustomerMyReviews from "../Components/profileComponents/Customer/CustomerMyReviews";
import SellerReviews from "../Components/profileComponents/Seller/SellerReviews";

const Profile = ({ user }) => {
  if (!user) return <> User not Found</>;

  return (
    <DashboardLayout role={user.role}>
      <Routes>
        {user.role === "Seller" && (
          <>
            <Route path="overview" element={<Overview user={user} />} />
            <Route path="add-product" element={<SellerAddProduct />} />
            <Route path="all-products" element={<SellerAllProducts user={user} />} />
            <Route path="edit-product/:id" element={<SellerEditProduct user={user} />} />
            <Route path="orders-received" element={<SellerOrdersReceived />} />
            <Route path="reviews" element={<SellerReviews/>} />
            <Route path="settings" element={<SettingsPage user={user} />} />
          </>
        )}
        {user.role === "Customer" && (
          <>
            <Route path="overview" element={<Overview user={user} />} />
            <Route path="orders" element={<CustomerOrders />} />
            <Route path="wishlist" element={<CustomerWishlist />} />
            <Route path="cart" element={<CCart />} />
            <Route path="settings" element={<SettingsPage user={user} />} />
            <Route path="my-reviews" element={<CustomerMyReviews />} />

          </>
        )}
        {user.role === "Courier" && (
          <>
            <Route path="overview" element={<Overview user={user} />} />
            <Route path="assigned" element={<CourierAssigned />} />
            <Route path="history" element={<CourierHistory />} />
            <Route path="settings" element={<SettingsPage user={user} />} />

          </>
        )}
        {user.role === "Admin" && (<>
          <Route path="overview" element={<AdminOverview />} />
          <Route path="users" element={<AdminUsers />} />
          <Route path="assign" element={<AdminAssignCouriers />} />
          <Route path="products" element={<AdminProducts />} />
          <Route path="orders" element={<AdminOrders />} />
          <Route path="settings" element={<SettingsPage user={user} />} />

        </>

        )}
      </Routes>
    </DashboardLayout>
  );
};

export default Profile;
