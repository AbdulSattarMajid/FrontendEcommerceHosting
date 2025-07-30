import { Link } from "react-router-dom";
import { FiHeart } from "react-icons/fi";
import Cart from "../../Images/exploreImages/cart.svg";
import StarRating from "./StarRating";

const ProductCard = ({ product }) => {
  const randomRating = (Math.random() * 2 + 3).toFixed(1); // For demonstration only

  return (
    <div className="bg-white rounded-2xl shadow hover:shadow-lg transition-all duration-300 p-4 relative group">
      <Link
        to={`/product/${encodeURIComponent(product.name)}`}
        state={{ product }}
        className="block"
      >
        <div className="w-full h-44 overflow-hidden rounded-xl mb-3">
          <img
            src={`${backendUrl}/${product.image?.startsWith('uploads') ? product.image : 'uploads/' + product.image}`} alt={product.name}
            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
          />
        </div>

        <h3 className="text-lg font-semibold text-gray-900 mb-1 line-clamp-1 group-hover:underline">
          {product.name}
        </h3>
      </Link>

      <p className="text-sm text-gray-600">
        Seller: <span className="font-medium">{product.seller?.name || "N/A"}</span>
      </p>
      <p className="text-sm text-gray-600 mb-2">Stock: {product.stock}</p>

      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center">
          <StarRating rating={randomRating} />
          <span className="text-sm text-gray-500 ml-2">{randomRating}</span>
        </div>
      </div>

      <div className="flex justify-between items-center mt-auto">
        <span className="font-bold text-lg text-blue-700">Rs {product.price}</span>

        <div className="flex items-center space-x-2">
          <button className="p-2 rounded-full text-gray-500 hover:text-red-500 transition">
            <FiHeart size={18} />
          </button>
          <button className="flex items-center bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium px-3 py-1.5 rounded-xl transition">
            <img src={Cart} alt="cart" className="w-4 h-4 mr-2" />
            Add
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
