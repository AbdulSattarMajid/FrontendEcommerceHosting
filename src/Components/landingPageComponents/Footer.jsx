// Components/Footer.jsx
import React from 'react'
import {
  FaFacebookF,
  FaTwitter,
  FaGithub,
  FaDribbble,
  FaDiscord,
} from 'react-icons/fa'

const Footer = () => {
  const socialIcons = [
    { label: 'Facebook', href: '#', icon: FaFacebookF },
    { label: 'Twitter', href: '#', icon: FaTwitter },
    { label: 'Github', href: '#', icon: FaGithub },
    { label: 'Dribbble', href: '#', icon: FaDribbble },
    { label: 'Discord', href: '#', icon: FaDiscord },
  ]

  return (
    <footer className="bg-gray-950 text-gray-300 px-8 py-12">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-12">
        {/* Column 1 */}
        <div>
          <h3 className="text-xl font-semibold mb-4">Company</h3>
          <ul className="space-y-2 text-sm">
            <li><a href="#">About Us</a></li>
            <li><a href="#">Careers</a></li>
            <li><a href="#">Blog</a></li>
            <li><a href="#">Press</a></li>
          </ul>
        </div>

        {/* Column 2 */}
        <div>
          <h3 className="text-xl font-semibold mb-4">Products</h3>
          <ul className="space-y-2 text-sm">
            <li><a href="#">Features</a></li>
            <li><a href="#">Pricing</a></li>
            <li><a href="#">Integrations</a></li>
            <li><a href="#">API</a></li>
          </ul>
        </div>

        {/* Column 3 */}
        <div>
          <h3 className="text-xl font-semibold mb-4">Support</h3>
          <ul className="space-y-2 text-sm">
            <li><a href="#">Help Center</a></li>
            <li><a href="#">Terms of Service</a></li>
            <li><a href="#">Privacy Policy</a></li>
            <li><a href="#">Status</a></li>
          </ul>
        </div>

        {/* Column 4 - Social */}
        <div>
          <h3 className="text-xl font-semibold mb-4">Social</h3>
          <ul className="flex gap-4">
            {socialIcons.map(({ label, href, icon: Icon }) => (
              <li key={label}>
                <a
                  href={href}
                  className="text-gray-400 hover:text-white transition duration-300"
                  aria-label={label}
                >
                  <Icon className="w-5 h-5" />
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </footer>
  )
}

export default Footer
