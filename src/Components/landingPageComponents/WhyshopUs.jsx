import React from 'react'

const features = [
  {
    icon: '🔒',
    title: 'Secure Checkout',
    description: 'Bank-level encryption protects your info',
    bg: 'bg-gradient-to-r from-blue-100 to-blue-50',
  },
  {
    icon: '🔁',
    title: '7-Day Easy Returns',
    description: 'If it doesn’t fit, send it back hassle-free',
    bg: 'bg-gradient-to-r from-pink-100 to-pink-50',
  },
  {
    icon: '💬',
    title: '24/7 Live Support',
    description: 'Talk to real humans — day or night',
    bg: 'bg-gradient-to-r from-green-100 to-green-50',
  },
  {
    icon: '🏅',
    title: 'Trusted by Thousands',
    description: '4.9/5 avg. rating from our customers',
    bg: 'bg-gradient-to-r from-yellow-100 to-yellow-50',
  },
]

const WhyShopUs = () => {
  return (
    <section className="py-16 bg-gray-100">
      <div className="max-w-7xl mx-auto px-4">
        <h2 className="text-4xl font-bold text-center text-gray-800 mb-4">Why Shop With Us</h2>
        <p className="text-center text-gray-600 mb-12 text-lg">We’re not just a store. We’re your shopping partner.</p>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
          {features.map((item, index) => (
            <div
              key={index}
              className={`${item.bg} p-6 rounded-xl shadow-lg backdrop-blur-md hover:scale-105 transform transition duration-300`}
            >
              <div className="text-5xl mb-4">{item.icon}</div>
              <h3 className="text-xl font-semibold text-gray-800 mb-2">{item.title}</h3>
              <p className="text-sm text-gray-600">{item.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default WhyShopUs
