const CategoryFilter = ({ categories, selectedCategories, onChange }) => {
  return (
    <div className="bg-white p-6 rounded-2xl shadow-lg sticky top-28 h-[70vh] overflow-y-auto custom-scrollbar">
      <h2 className="text-xl font-semibold text-gray-800 mb-4">
        Filter by Categories
      </h2>
      <ul className="space-y-3">
        {categories.map((cat, idx) => {
          const catName = cat.toLowerCase(); // ✅ normalize name
          const isChecked = selectedCategories.includes(catName); // ✅ match correctly

          return (
            <li key={idx} className="flex items-center space-x-2">
              <input
                type="checkbox"
                id={`cat-${idx}`}
                checked={isChecked}
                onChange={() => onChange(catName)} // ✅ pass lowercase to handler
                className="w-4 h-4 accent-blue-600"
              />
              <label htmlFor={`cat-${idx}`} className="text-sm text-gray-700">
                {cat}
              </label>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default CategoryFilter;
