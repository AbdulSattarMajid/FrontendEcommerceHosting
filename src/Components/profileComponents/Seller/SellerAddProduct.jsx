import { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { toast } from "react-toastify";
const SellerAddProduct = () => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    price: '',
    stock: '',
    image: null,
  });

  const [imagePreview, setImagePreview] = useState(null);
  const [categories, setCategories] = useState([]);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const fileInputRef = useRef(null);
  const backendUrl = import.meta.env.VITE_API_BASE_URL ;

  useEffect(() => {
    axios.get(`${backendUrl}/categories/get`, { withCredentials: true })
      .then(res => setCategories(res.data.categories))
      .catch(err => console.error("Failed to fetch categories", err));
  }, []);

  useEffect(() => {
    return () => {
      if (imagePreview) URL.revokeObjectURL(imagePreview);
    };
  }, [imagePreview]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (file) => {
    if (file) {
      setFormData(prev => ({ ...prev, image: file }));
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const handleFileSelect = (e) => {
    const file = e.target.files[0];
    handleImageChange(file);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    handleImageChange(file);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleCategorySelect = (e, cat) => {
    if (e.target.checked) {
      if (selectedCategories.length < 3) {
        setSelectedCategories(prev => [...prev, cat]);
      }
    } else {
      setSelectedCategories(prev => prev.filter(c => c !== cat));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (selectedCategories.length < 1 || selectedCategories.length > 3) {
      return alert("Please select between 1 and 3 categories.");
    }

    const imageFile = formData.image;
    const allowedTypes = ['image/jpeg', 'image/png', 'image/jpg'];
    if (!imageFile || !allowedTypes.includes(imageFile.type)) {
      return alert('Invalid image type.');
    }

    if (imageFile.size > 5 * 1024 * 1024) {
      return alert('Image must be less than 5MB.');
    }

    const form = new FormData();
    form.append("name", formData.title);
    form.append("description", formData.description);
    form.append("price", formData.price);
    form.append("stock", formData.stock);
    form.append("image", formData.image);
    selectedCategories.forEach(cat => form.append("category[]", cat));

    try {
      await axios.post(`${backendUrl}/products/add`, form, {
        withCredentials: true,
        headers: { 'Content-Type': 'multipart/form-data' },
      });

      toast.success("Product added successfully!");
      setFormData({ title: '', description: '', price: '', stock: '', image: null });
      setSelectedCategories([]);
      setImagePreview(null);
    } catch (err) {
      console.error("Product submission failed", err);
      toast.error("Error adding product.");
    }
  };

  return (
    <div className="bg-white p-6 rounded-xl shadow">
      <h2 className="text-2xl font-bold mb-4 text-purple-700">Add New Product</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input type="text" name="title" placeholder="Title" required value={formData.title} onChange={handleInputChange} className="w-full border px-4 py-2 rounded" />
        <textarea name="description" placeholder="Description" required value={formData.description} onChange={handleInputChange} rows="4" className="w-full border px-4 py-2 rounded" />
        
        <div className="grid grid-cols-2 gap-4">
          <input type="number" name="price" placeholder="Price" required value={formData.price} onChange={handleInputChange} className="w-full border px-4 py-2 rounded" />
          <input type="number" name="stock" placeholder="Stock" required value={formData.stock} onChange={handleInputChange} className="w-full border px-4 py-2 rounded" />
        </div>

        <div>
          <p className="font-medium mb-2">Select Categories (max 3)</p>
          <div className="grid md:grid-cols-3 sm:grid-cols-1 gap-2">
            {categories.map((cat, i) => (
              <label key={i} className="flex items-center gap-2">
                <input type="checkbox" value={cat} checked={selectedCategories.includes(cat)} onChange={(e) => handleCategorySelect(e, cat)} />
                {cat}
              </label>
            ))}
          </div>
        </div>

        {/* Drag and drop zone */}
        <div
          onDrop={handleDrop}
          onDragOver={handleDragOver}
          onClick={() => fileInputRef.current?.click()}
          className="w-full border-2 border-dashed border-gray-300 rounded p-6 text-center cursor-pointer hover:border-purple-500 transition"
        >
          {imagePreview ? (
            <img src={imagePreview} alt="Preview" className="mx-auto w-48 h-48 object-cover rounded" />
          ) : (
            <p className="text-gray-500">Drag and drop an image here, or click to select one</p>
          )}
        </div>

        <input
          ref={fileInputRef}
          type="file"
          name="image"
          accept="image/*"
          onChange={handleFileSelect}
          className="hidden"
        />

        <button type="submit" className="bg-purple-600 hover:bg-purple-700 text-white py-2 px-6 rounded">Add Product</button>
      </form>
    </div>
  );
};

export default SellerAddProduct;
