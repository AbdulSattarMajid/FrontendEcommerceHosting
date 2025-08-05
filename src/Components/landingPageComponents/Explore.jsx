import React from 'react'
import { Link } from 'react-router-dom'

import Tablets from "../../Images/exploreImages/Tablet.jpg"
import Phones from "../../Images/exploreImages/Iphone.jpg"
import Laptops from "../../Images/exploreImages/Laptops.jpg"
import Watches from "../../Images/exploreImages/smartWatches.jpg"
import Bags from "../../Images/exploreImages/Bags.jpg"
import Jackets from "../../Images/exploreImages/Jackets.jpg"
import Shoes from "../../Images/exploreImages/Sneakers.jpg"
import rolex from "../../Images/exploreImages/Watches.jpg"
import Controllers from "../../Images/exploreImages/Controller.jpg"
import Headsets from "../../Images/exploreImages/Headsets.jpg"
import Keyboards from "../../Images/exploreImages/keyboard.jpg"
import gamingChair from "../../Images/exploreImages/gamingChair.jpg"
import Dumbbells from "../../Images/exploreImages/dumbBells.jpg"
import RunningShoes from "../../Images/exploreImages/runningShoe.jpg"
import YogaMats from "../../Images/exploreImages/yogaMatt.jpg"
import ResistanceBands from "../../Images/exploreImages/fitnessBands.jpg"
import BoardGames from "../../Images/exploreImages/Monopoly.jpg"
import RemoteCars from "../../Images/exploreImages/remoteCars.jpg"
import LegoSets from "../../Images/exploreImages/legoSets.jpg"
import ActionFigures from "../../Images/exploreImages/actionSets.jpg"
import Sofas from "../../Images/exploreImages/Sofas.jpg"
import Chairs from "../../Images/exploreImages/Chairs.jpg"
import Tables from "../../Images/exploreImages/Tables.jpg"
import Lamps from "../../Images/exploreImages/Lamps.jpg"
import skinCare from "../../Images/exploreImages/skinCare.jpg"
import makeup from "../../Images/exploreImages/makeupKits.jpg"
import perfumes from "../../Images/exploreImages/perfumes.jpg"
import hairTools from "../../Images/exploreImages/hairTools.jpg"
import Printers from "../../Images/exploreImages/printers.jpg"
import OfficeChairs from "../../Images/exploreImages/officeChairs.jpg"
import Notebooks from "../../Images/exploreImages/noteBooks.jpg"
import Pens from "../../Images/exploreImages/pens.jpg"

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
