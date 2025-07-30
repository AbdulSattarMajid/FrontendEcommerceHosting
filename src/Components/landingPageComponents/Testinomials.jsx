import User1 from '../../Images/Testinomials/user1.jpeg'
import User2 from '../../Images/Testinomials/user2.jpeg'
import User3 from '../../Images/Testinomials/user3.jpeg'
import { Quote } from 'lucide-react'

const testimonials = [
  {
    name: 'Aisha Khan',
    role: 'Fashion Enthusiast',
    image: User1,
    feedback:
      'Absolutely loved the variety and fast delivery! This platform is now my go-to for all fashion needs.',
  },
  {
    name: 'Usman Ali',
    role: 'Tech Blogger',
    image: User2,
    feedback:
      'I found all the latest gadgets in one place. Easy to navigate and very professional experience.',
  },
  {
    name: 'Maria Iqbal',
    role: 'Mom & Shopper',
    image: User3,
    feedback:
      'Great selection of toys and home decor. My kids and I are both happy shoppers!',
  },
]

const Testimonials = () => {
  return (
    <div className="bg-white py-16 px-4 md:px-10">
      <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-gray-800">
        What Our Customers Say
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
        {testimonials.map((testimonial, idx) => (
          <div
            key={idx}
            className="bg-gray-50 shadow-md rounded-lg p-6 relative flex flex-col items-center text-center hover:shadow-lg transition"
          >
            <Quote className="w-8 h-8 text-blue-500 absolute top-4 left-4 opacity-20" />

            <img
              src={testimonial.image}
              alt={testimonial.name}
              className="w-16 h-16 rounded-full object-cover mb-4"
            />
            <h4 className="text-lg font-semibold text-gray-800">{testimonial.name}</h4>
            <span className="text-sm text-gray-500 mb-2">{testimonial.role}</span>
            <p className="text-sm text-gray-700 italic">"{testimonial.feedback}"</p>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Testimonials
