import React from 'react'
import { Link } from 'react-router-dom'

import Tablets from "../../Images/exploreImages/Tablet.jpeg"
import Phones from "../../Images/exploreImages/Phones.jpeg"
import Laptops from "../../Images/exploreImages/Laptops.jpeg"
import Watches from "../../Images/exploreImages/SmartWatches.jpeg"
import Bags from "../../Images/exploreImages/Bags.jpeg"
import Jackets from "../../Images/exploreImages/Jackets.jpeg"
import Shoes from "../../Images/exploreImages/Sneakers.jpeg"
import rolex from "../../Images/exploreImages/Watches.jpeg"
import Controllers from "../../Images/exploreImages/Contollers.jpeg"
import Headsets from "../../Images/exploreImages/Headset.jpeg"
import Keyboards from "../../Images/exploreImages/keyboard.jpeg"
import gamingChair from "../../Images/exploreImages/gamingChair.jpeg"
import Dumbbells from "../../Images/exploreImages/dumbBells.jpeg"
import RunningShoes from "../../Images/exploreImages/runningShoe.jpeg"
import YogaMats from "../../Images/exploreImages/yogaMatt.jpeg"
import ResistanceBands from "../../Images/exploreImages/Treadmill.jpeg"
import BoardGames from "../../Images/exploreImages/BoardGame.jpeg"
import RemoteCars from "../../Images/exploreImages/remoteCars.jpeg"
import LegoSets from "../../Images/exploreImages/legoSets.jpeg"
import ActionFigures from "../../Images/exploreImages/actionSets.jpeg"
import Sofas from "../../Images/exploreImages/Sofas.jpeg"
import Chairs from "../../Images/exploreImages/Chairs.jpeg"
import Tables from "../../Images/exploreImages/Tables.jpeg"
import Lamps from "../../Images/exploreImages/Lamps.jpeg"
import skinCare from "../../Images/exploreImages/skinCare.jpeg"
import makeup from "../../Images/exploreImages/makeupKits.jpeg"
import perfumes from "../../Images/exploreImages/perfumes.jpeg"
import hairTools from "../../Images/exploreImages/hairTools.jpeg"
import Printers from "../../Images/exploreImages/Printers.jpeg"
import OfficeChairs from "../../Images/exploreImages/officeChairs.jpeg"
import Notebooks from "../../Images/exploreImages/notebooks.jpeg"
import Pens from "../../Images/exploreImages/pens.jpeg"

export const categories = [
  {
    title: 'Top Fashion Picks',
    items: [
      { title: 'Bags', image: Bags, link: '/category/fashion/bags' },
      { title: 'Jackets', image: Jackets, link: '/category/fashion/jackets' },
      { title: 'Shoes', image: Shoes, link: '/category/fashion/shoes' },
      { title: 'Watches', image: rolex, link: '/category/fashion/watches' },
    ],
  },
  {
    title: 'Trending in Gaming',
    items: [
      { title: 'Headsets', image: Headsets, link: '/category/gaming/headsets' },
      { title: 'Gaming Chairs', image: gamingChair, link: '/category/gaming/chairs' },
      { title: 'Keyboards', image: Keyboards, link: '/category/gaming/keyboards' },
      { title: 'Controllers', image: Controllers, link: '/category/gaming/controllers' },
    ],
  },
  {
    title: 'Smart Gadgets',
    items: [
      { title: 'Smartphones', image: Phones, link: '/category/tech/phones' },
      { title: 'Tablets', image: Tablets, link: '/category/tech/tablets' },
      { title: 'Smartwatches', image: Watches, link: '/category/tech/watches' },
      { title: 'Laptops', image: Laptops, link: '/category/tech/laptops' },
    ],
  },
  {
    title: 'Fitness & Sports Gear',
    items: [
      { title: 'Dumbbells', image: Dumbbells, link: '/category/sports/dumbbells' },
      { title: 'Running Shoes', image: RunningShoes, link: '/category/sports/shoes' },
      { title: 'Yoga Mats', image: YogaMats, link: '/category/sports/yoga' },
      { title: 'Resistance Bands', image: ResistanceBands, link: '/category/sports/bands' },
    ],
  },
  {
    title: 'Toys & Fun',
    items: [
      { title: 'Board Games', image: BoardGames, link: '/category/toys/boardgames' },
      { title: 'Remote Cars', image: RemoteCars, link: '/category/toys/cars' },
      { title: 'Lego Sets', image: LegoSets, link: '/category/toys/lego' },
      { title: 'Action Figures', image: ActionFigures, link: '/category/toys/figures' },
    ],
  },
  {
    title: 'Home & Furniture',
    items: [
      { title: 'Sofas', image: Sofas, link: '/category/home & kitchen/sofas' },
      { title: 'Chairs', image: Chairs, link: '/category/home & kitchen/chairs' },
      { title: 'Tables', image: Tables, link: '/category/home & kitchen/tables' },
      { title: 'Lamps', image: Lamps, link: '/category/home & kitchen/lamps' },
    ],
  },
  {
    title: 'Beauty & Care',
    items: [
      { title: 'Skincare', image: skinCare, link: '/category/Beauty & Personal Care/skincare' },
      { title: 'Makeup Kits', image: makeup, link: '/category/Beauty & Personal Care/makeup' },
      { title: 'Perfumes', image: perfumes, link: '/category/Beauty & Personal Care/perfumes' },
      { title: 'Hair Tools', image: hairTools, link: '/category/Beauty & Personal Care/tools' },
    ],
  },
  {
    title: 'Office Essentials',
    items: [
      { title: 'Printers', image: Printers, link: '/category/Office Supplies/organizers' },
      { title: 'Office Chairs', image: OfficeChairs, link: '/category/Office Supplies/chairs' },
      { title: 'Notebooks', image: Notebooks, link: '/category/Office Supplies/notebooks' },
      { title: 'Pens & Tools', image: Pens, link: '/category/Office Supplies/pens' },
    ],
  },
]

const Explore = () => {
  return (
    <div className="px-6 py-12 bg-gray-50">
      <h2 className="text-3xl font-bold text-center mb-10">Explore Our Categories</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
        {categories.map((category, index) => (
          <div key={index}>
            <h3 className="text-xl font-semibold mb-4 text-gray-800">{category.title}</h3>
            <div className="grid grid-cols-2 gap-4">
              {category.items.map((item, idx) => {
                const parts = item.link.split('/')
                const mainCategory = parts[2] 

                return (
                  <Link
                    key={idx}
                    to={`/product?search=${encodeURIComponent(item.title)}&category=${encodeURIComponent(mainCategory)}`}
                    className="bg-white rounded shadow p-3 hover:shadow-lg transition block"
                  >
                    <img
                      src={item.image}
                      alt={item.title}
                      className="w-full h-32 object-cover rounded"
                    />
                    <p className="mt-2 text-sm font-medium text-gray-700 text-center">
                      {item.title}
                    </p>
                  </Link>
                )
              })}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Explore
