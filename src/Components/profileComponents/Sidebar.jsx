import { Link } from 'react-router-dom';

const Sidebar = ({ role }) => {
  const linkClass = "block hover:text-blue-600 transition text-gray-800 font-medium";

const linksByRole = {
  Customer: [
    { label: "Overview", href: "/dashboard/overview" },
    { label: "Orders", href: "/dashboard/orders" },
    { label: "Wishlist", href: "/dashboard/wishlist" },
    { label: "Cart", href: "/dashboard/cart" },
    { label: "Settings", href: "/dashboard/settings" },
  ],
  Seller: [
    { label: "Overview", href: "/dashboard/overview" },
    { label: "Add Product", href: "/dashboard/add-product" },
    { label: "All Products", href: "/dashboard/all-products" },
    { label: "Orders Received", href: "/dashboard/orders-received" },
    { label: "Settings", href: "/dashboard/settings" },
  ],
  Courier: [
    { label: "Overview", href: "/dashboard/overview" },
    { label: "Assigned Deliveries", href: "/dashboard/assigned" },
    { label: "Delivery History", href: "/dashboard/history" },
    { label: "Settings", href: "/dashboard/settings" },
  ],
  Admin: [
    { label: "Overview", href: "/dashboard/overview" },
    { label: "All Users", href: "/dashboard/users" },
    { label: "All Products", href: "/dashboard/products" },
    { label: "All Orders", href: "/dashboard/orders" },
    { label: "Assign Courier", href: "/dashboard/assign" },
    { label: "Settings", href: "/dashboard/settings" },
  ],
};


  const links = linksByRole[role] || [];

  return (
    <aside className="fixed top-16 left-0 h-[calc(100vh-4rem)] w-64 bg-white shadow-xl border-r border-gray-200 p-6 hidden md:block">
      <h2 className="text-2xl font-bold text-green-700 mb-10">Dashboard</h2>
      <nav className="space-y-5">
        {links.map((link, index) => (
          <Link key={index} to={link.href} className={linkClass}>
            {link.label}
          </Link>
        ))}
      </nav>
    </aside>
  );
};

export default Sidebar;
