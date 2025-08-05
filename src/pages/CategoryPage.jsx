import React, { useState, useEffect } from "react";
import axios from "axios";
import ProductCard from "../Components/productPageComponents/ProductCard";
import CategoryFilter from "../Components/productPageComponents/CategoryFilter";
import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const Products = ({ user }) => {
  const backendUrl = import.meta.env.VITE_API_BASE_URL;
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategories, setSelectedCategories] = useState([]);

  const location = useLocation();

  // ✅ Read from 'search' instead of 'q'
  const searchQuery =
    new URLSearchParams(location.search).get("search")?.toLowerCase() || "";

 //change to read category from URL


useEffect(() => {
  const params = new URLSearchParams(location.search);
  const categoryParams = params.getAll("category");
  setSelectedCategories(categoryParams.map(c => c.toLowerCase()));
}, [location.search]);

  //...........................
  useEffect(() => {
    const fetchData = async () => {
      try {
        const [productsRes, categoriesRes] = await Promise.all([
          axios.get(`${backendUrl}/products/all`),
          axios.get(`${backendUrl}/categories/get`)
        ]);

        if (productsRes.data.success) {
          const allProducts = productsRes.data.products;

          // ✅ Filter out current user's own products (by seller._id)
          const filtered = user
            ? allProducts.filter(product => product.seller?._id !== user._id)
            : allProducts;

          setProducts(filtered);
        }

        if (categoriesRes.data.success) {
          setCategories(categoriesRes.data.categories);
        }

      } catch (err) {
        console.error("Failed to fetch data:", err);
      }
    };

    fetchData();
  }, [backendUrl, user]);
  const navigate = useNavigate();


const handleCategoryChange = (category) => {
  const params = new URLSearchParams(location.search);
  const currentCategories = params.getAll("category");

  let updatedCategories;
  if (currentCategories.includes(category)) {
    updatedCategories = currentCategories.filter((c) => c !== category);
  } else {
    updatedCategories = [...currentCategories, category];
  }

  // Remove all existing 'category' params
  params.delete("category");

  // Add updated ones
  updatedCategories.forEach((cat) => {
    params.append("category", cat);
  });

  navigate({ search: params.toString() });
};

 const categoryFiltered =
  selectedCategories.length === 0
    ? products
    : products.filter((p) => {
        const prodCategories = Array.isArray(p.category)
          ? p.category.map((cat) => cat.toLowerCase())
          : [p.category?.toLowerCase()];

        return selectedCategories.some((selectedCat) =>
          prodCategories.includes(selectedCat)
        );
      });

  const finalFiltered = searchQuery
    ? categoryFiltered.filter((p) =>
      p.name.toLowerCase().includes(searchQuery)
    )
    : categoryFiltered;

  return (
    <div className="min-h-screen bg-gray-100 pt-24 pb-16 px-4 sm:px-6 lg:px-16">
      <h1 className="text-4xl font-bold text-gray-800 mb-10 text-center">
        Explore Products
      </h1>

      {searchQuery && (
        <h2 className="text-center text-gray-600 mb-6">
          Search results for: <strong>{searchQuery}</strong>
        </h2>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
        <aside className="lg:col-span-1">
          <CategoryFilter
            categories={categories}
            selectedCategories={selectedCategories}
            onChange={handleCategoryChange}
          />
        </aside>

        <section className="lg:col-span-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6">
          {finalFiltered.length > 0 ? (
            finalFiltered.map((product) => (
              <ProductCard key={product._id} product={product} />
            ))
          ) : (
            <div className="col-span-full text-center text-gray-500 text-lg">
              No products found.
            </div>
          )}
        </section>
      </div>
    </div>
  );
};

export default Products;