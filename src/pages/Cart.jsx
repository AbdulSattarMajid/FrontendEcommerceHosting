import { useCart } from "../Components/cartComponents/CartContext";
import { Link } from "react-router-dom";
import { toast } from 'react-toastify'
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Cart = () => {
  const backendUrl = import.meta.env.VITE_API_BASE_URL;
  const { cart, clearCart } = useCart();
  const navigate = useNavigate();

  const handleConfirmOrder = async () => {
    try {
      const res = await axios.post(
        `${backendUrl}/api/orders/confirm`,
        {
          cart: cart.map(p => ({
            productId: p._id,
            quantity: p.quantity
          }))
        },
        { withCredentials: true }
      );



      if (res.data.success) {
        toast.success("Order confirmed!");
        clearCart();
        navigate("/");
      } else {
        toast.error(res.data.message || "Failed to confirm order");
      }
    } catch (err) {
      console.error("Order error:", err);
      toast.error("Something went wrong");
    }
  };
  const totalAmount = cart.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

  if (!cart || cart.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] pt-20 text-center">
        <img
          src="https://cdn-icons-png.flaticon.com/512/2038/2038854.png"
          alt="Empty Cart"
          className="w-32 h-32 mb-4 opacity-70"
        />
        <p className="text-gray-600 text-xl">Your cart is empty</p>
        <Link to="/product" className="mt-4 text-blue-600 hover:underline">
          Continue shopping
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto pt-24 px-4">
      <h2 className="text-3xl font-bold mb-6 text-gray-800">Your Cart</h2>

      <div className="space-y-4">
        {cart.map((item) => (
          <div
            key={item._id}
            className="flex items-center justify-between bg-white shadow-md rounded-xl p-4"
          >
            <div className="flex items-center space-x-4">
              <img
                src={item.image}
                alt={item.name}
                className="w-20 h-20 rounded-lg object-cover border"
              />
              <div>
                <h3 className="text-lg font-semibold text-gray-800">
                  {item.name}
                </h3>
                <p className="text-sm text-gray-500">Qty: {item.quantity}</p>
                <p className="text-sm text-gray-500">
                  Rs {item.price} x {item.quantity}
                </p>
              </div>
            </div>

            <p className="text-lg font-semibold text-blue-700">
              Rs {item.price * item.quantity}
            </p>
          </div>
        ))}
      </div>

      <div className="flex justify-between items-center mt-8 border-t pt-6">
        <h3 className="text-xl font-semibold text-gray-800">Total:</h3>
        <p className="text-2xl font-bold text-green-700">Rs {totalAmount}</p>
      </div>

      <div className="flex justify-end mt-6">
        <button
          onClick={handleConfirmOrder}
          className="bg-green-600 hover:bg-green-700 text-white font-semibold py-2 px-6 rounded-xl transition"
        >
          Confirm Order
        </button>
      </div>
    </div>
  );
};

export default Cart;
