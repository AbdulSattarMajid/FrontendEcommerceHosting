import { useCart } from "../../cartComponents/CartContext";
import { Link } from "react-router-dom";

const CCart = () => {
  const { cart } = useCart();

  const totalItems = cart.reduce((acc, item) => acc + item.quantity, 0);
  const totalPrice = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);

  return (
    <div className="p-6 space-y-4">
      {/* Existing sections here */}

      <div className="bg-white p-4 rounded-xl shadow-md">
        <h3 className="text-xl font-semibold mb-2">Cart Summary</h3>
        <p className="text-gray-700">Items in cart: <strong>{totalItems}</strong></p>
        <p className="text-gray-700">Total amount: <strong>Rs {totalPrice}</strong></p>
        <Link to="/cart" className="text-blue-600 hover:underline text-sm mt-2 block">
          View Full Cart
        </Link>
      </div>
    </div>
  );
};

export default CCart;
