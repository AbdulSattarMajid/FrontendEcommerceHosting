import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
const SellerEditProduct = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const backendUrl = (import.meta.env.VITE_API_BASE_URL || "").replace(/\/$/, "");

  const [product, setProduct] = useState(null);
  const [form, setForm] = useState({
    name: "",
    description: "",
    price: "",
    stock: "",
  });

  const [allCategories, setAllCategories] = useState([]);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [image, setImage] = useState(null); 
  const [previewUrl, setPreviewUrl] = useState(""); 
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    axios.get(`${backendUrl}/products/${id}`)
      .then((res) => {
                console.log(res.data)
        const p = res.data.product;
        setProduct(p);
        setForm({
          name: p.name || "",
          description: p.description || "",
          price: p.price || "",
          stock: p.stock || "",
        });
        setSelectedCategories(Array.isArray(p.category) ? p.category : []);
        setPreviewUrl(p.image || "");
      })
      .catch((err) => {
        console.error("Failed to fetch product", err);
        alert("Could not load product.");
      });

    axios.get(`${backendUrl}/categories/get`)
      .then((res) => setAllCategories(res.data.categories || []))
      .catch((err) => {
        console.error("Failed to fetch categories", err);
        alert("Could not load categories.");
      });
  }, [id]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImage(file);
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setPreviewUrl(reader.result);
      reader.readAsDataURL(file);
    }
  };

  const handleCategoryChange = (e) => {
    const { value, checked } = e.target;

    if (checked) {
      if (selectedCategories.length >= 3) {
        alert("You can only select up to 3 categories.");
        return;
      }
      setSelectedCategories([...selectedCategories, value]);
    } else {
      if (selectedCategories.length === 1) {
        alert("At least one category must be selected.");
        return;
      }
      setSelectedCategories(selectedCategories.filter((cat) => cat !== value));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (selectedCategories.length === 0) {
      alert("Select at least one category.");
      return;
    }

    setLoading(true);
    try {
      const formData = new FormData();
      formData.append("name", form.name);
      formData.append("description", form.description);
      formData.append("price", form.price);
      formData.append("stock", form.stock);
      formData.append("category", JSON.stringify(selectedCategories));
      if (image) formData.append("image", image);

      await axios.put(`${backendUrl}/products/${id}`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
        withCredentials: true,
      });
      toast.success("Product updated successfully!")
      navigate("/dashboard/all-products");
    } catch (err) {
      console.error("Update failed", err);
      toast.error("Update failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  if (!product) return <p className="text-center text-gray-500">Loading...</p>;

  return (
    <div className="max-w-xl mx-auto bg-white p-6 rounded-xl shadow">
      <h2 className="text-2xl font-bold mb-4 text-green-700">Edit Product</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          name="name"
          value={form.name}
          onChange={handleChange}
          placeholder="Product Name"
          className="w-full border px-4 py-2 rounded"
          required
        />
        <textarea
          name="description"
          value={form.description}
          onChange={handleChange}
          placeholder="Description"
          className="w-full border px-4 py-2 rounded"
          required
        />
        <input
          type="number"
          name="price"
          value={form.price}
          onChange={handleChange}
          placeholder="Price"
          className="w-full border px-4 py-2 rounded"
          required
        />
        <input
          type="number"
          name="stock"
          value={form.stock}
          onChange={handleChange}
          placeholder="Stock"
          className="w-full border px-4 py-2 rounded"
          required
        />

        {/* Image Upload */}
        <div>
          <label className="block mb-1 font-semibold">Product Image</label>
          {previewUrl && (
            <img src={previewUrl} alt="preview" className="w-32 h-32 object-cover rounded mb-2" />
          )}
          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            className="block w-full text-sm"
          />
        </div>

        {/* Categories */}
        <div>
          <label className="block font-semibold mb-1">Categories (1 to 3)</label>
          <div className="grid grid-cols-2 gap-2 max-h-48 overflow-y-auto border p-2 rounded">
            {allCategories.map((cat) => (
              <label key={cat} className="flex items-center gap-2 text-sm">
                <input
                  type="checkbox"
                  value={cat}
                  checked={selectedCategories.includes(cat)}
                  onChange={handleCategoryChange}
                />
                {cat}
              </label>
            ))}
          </div>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="bg-green-600 text-white px-6 py-2 rounded hover:bg-green-700"
        >
          {loading ? "Updating..." : "Update Product"}
        </button>
      </form>
    </div>
  );
};

export default SellerEditProduct;
