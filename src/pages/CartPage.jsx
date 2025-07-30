import { useState } from "react";
import { Link } from "react-router-dom";
import { FiTrash2 } from "react-icons/fi";

const CartPage = () => {
  const [cartItems, setCartItems] = useState([
    {
      id: "1",
      name: "Wireless Headphones",
      image: "https://www.westpoint.pk/cdn/shop/files/WP205_14b1b734-e67c-458d-8067-fcd025ade1b5_1024x1024.jpg?v=1743769031",
      price: 2499,
      quantity: 2,
    },
    {
      id: "2",
      name: "Smart Watch",
      image: "data:image/jpeg;base64,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",
      price: 3299,
      quantity: 1,
    },
  ]);

  const handleQuantityChange = (id, qty) => {
    setCartItems((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, quantity: qty } : item
      )
    );
  };

  const handleRemove = (id) => {
    setCartItems((prev) => prev.filter((item) => item.id !== id));
  };

  const subtotal = cartItems.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

  return (
    <div className="max-w-6xl mx-auto px-4 py-16">
      <h1 className="text-3xl font-bold mb-8 text-center">🛒 Your Cart</h1>

      {cartItems.length === 0 ? (
        <div className="text-center text-gray-600">
          Your cart is empty.{" "}
          <Link to="/" className="text-blue-600 hover:underline">
            Go shopping
          </Link>
        </div>
      ) : (
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-6">
            {cartItems.map((item) => (
              <div
                key={item.id}
                className="flex items-center bg-white/90 backdrop-blur-sm border border-gray-200 rounded-2xl shadow-sm p-4 hover:shadow-md transition"
              >
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-20 h-20 object-cover rounded-xl mr-4 border"
                />
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-gray-900">
                    {item.name}
                  </h3>
                  <p className="text-sm text-gray-500 mb-2">
                    Rs {item.price} x {item.quantity}
                  </p>
                  <div className="flex items-center gap-2">
                    <label className="text-sm">Qty:</label>
                    <input
                      type="number"
                      min="1"
                      value={item.quantity}
                      onChange={(e) =>
                        handleQuantityChange(item.id, Number(e.target.value))
                      }
                      className="w-16 text-center border border-gray-300 rounded-lg py-1 px-2 text-sm"
                    />
                  </div>
                </div>
                <button
                  onClick={() => handleRemove(item.id)}
                  className="text-red-500 hover:text-red-600 ml-4 transition"
                  title="Remove"
                >
                  <FiTrash2 size={20} />
                </button>
              </div>
            ))}
          </div>

          {/* Summary */}
          <div className="bg-white/90 backdrop-blur-md shadow-lg border border-gray-200 p-6 rounded-2xl sticky top-24 h-fit">
            <h2 className="text-xl font-semibold mb-4 text-gray-800">
              Order Summary
            </h2>

            <div className="flex justify-between text-gray-700 mb-2">
              <span>Subtotal</span>
              <span className="font-medium">Rs {subtotal}</span>
            </div>

            <div className="flex justify-between text-gray-700 mb-4">
              <span>Shipping</span>
              <span className="text-green-600">Free</span>
            </div>

            <hr className="mb-4" />

            <div className="flex justify-between text-lg font-bold text-gray-900 mb-6">
              <span>Total</span>
              <span>Rs {subtotal}</span>
            </div>

            <button className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2.5 rounded-xl font-semibold transition">
              Proceed to Checkout
            </button>

            <Link
              to="/product"
              className="block mt-4 text-center text-blue-500 hover:underline text-sm"
            >
              Continue Shopping
            </Link>
          </div>
        </div>
      )}
    </div>
  );
};

export default CartPage;
