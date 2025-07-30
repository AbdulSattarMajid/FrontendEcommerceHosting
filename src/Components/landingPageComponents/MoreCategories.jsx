import { Link } from "react-router-dom"
import kitchen from "../../Images/exploreImages/Kitchen.jpg"
import pets from "../../Images/exploreImages/Pets.jpg"
import library from "../../Images/exploreImages/Library.jpg"

const categories = [
  {
    title: 'Kitchen Essentials',
    subtitle: 'Cookware, utensils & appliances for every home chef.',
    image: kitchen,
  },
  {
    title: 'Books & Stationery',
    subtitle: 'Notebooks, pens, planners & creative writing tools.',
    image: library,
  },
  {
    title: 'Pet Supplies',
    subtitle: 'Everything your furry friends need to stay happy & healthy.',
    image: pets,
  },
]

const MoreCategories = () => {
  return (
    <div className="py-16 bg-gray-100 px-4 md:px-10">
      <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-gray-800">
        Discover More Categories
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {categories.map((category, index) => (
          <Link to="/" key={index}>
            <div
              className="relative bg-cover bg-center h-64 rounded-lg shadow-md flex items-center justify-center text-center text-white hover:scale-[1.02] transition"
              style={{ backgroundImage: `url(${category.image})` }}
            >
              <div className="absolute inset-0 bg-black bg-opacity-50 rounded-lg"></div>
              <div className="relative z-10 px-4">
                <h3 className="text-2xl font-bold">{category.title}</h3>
                <p className="text-sm mt-2">{category.subtitle}</p>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}

export default MoreCategories
