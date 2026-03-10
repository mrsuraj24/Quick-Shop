import { Phone, Mail, GitHub, LinkedIn, LocationOn, YouTube, Instagram } from '@mui/icons-material';
import { Link } from 'react-router-dom';

function Footer() {
  return (
    <footer className="px-15 border-t border-indigo-800 bg-gray-950/90">
      <div className="max-w-7xl mx-auto px-6 py-10 grid grid-cols-1 md:grid-cols-4 gap-12">
        <div>
          <h2 className="text-2xl font-bold text-blue-800 mt-8 mb-3">
            QuickShop
          </h2>
          <p className="text-gray-400 text-sm leading-relaxed">
            Empowering modern shopping with quality products, secure payments,
            and a smooth digital experience.
          </p>
        </div>
        <div>
          <h3 className="text-lg text-white font-semibold mb-4 relative inline-block">
            Company
            <span className="absolute left-0 -bottom-1 w-15 h-1 bg-indigo-600 rounded"></span>
          </h3>
          <ul className="space-y-2 flex flex-col text-gray-400">
            <Link to="/products" className="hover:text-indigo-500 cursor-pointer hover:scale-102 transition">Products</Link>
            <Link to="/pricing" className="hover:text-indigo-500 cursor-pointer hover:scale-102 transition">Pricing</Link>
            <Link to="/about" className="hover:text-indigo-500 cursor-pointer hover:scale-102 transition">About</Link>
            <Link to="/contact" className="hover:text-indigo-500 cursor-pointer hover:scale-102 transition">Contact</Link>
          </ul>
        </div>
        <div>
          <h3 className="text-lg text-white font-semibold mb-4 relative inline-block">
            Support
            <span className="absolute left-0 -bottom-1 w-15 h-1 bg-indigo-600 rounded"></span>
          </h3>
          <ul className="space-y-2 flex flex-col text-gray-400">
            <Link to="/help-center" className="hover:text-indigo-500 cursor-pointer hover:scale-102 transition">Help Center</Link>
            <Link to="/shipping" className="hover:text-indigo-500 cursor-pointer hover:scale-102 transition">Shipping</Link>
            <Link to="/returns" className="hover:text-indigo-500 cursor-pointer hover:scale-102 transition">Returns</Link>
            <Link to="/faqs" className="hover:text-indigo-500 cursor-pointer hover:scale-102 transition">FAQs</Link>
          </ul>
        </div>
        <div className="space-y-4">
          <h3 className="text-lg text-white font-semibold mb-4 relative inline-block">
            Contact
            <span className="absolute left-0 -bottom-1 w-15 h-1 bg-indigo-600 rounded"></span>
          </h3>
          <div className="items-center gap-3 bg-white/70 p-4 hover:scale-105 transition rounded-xl shadow">
            <Mail className="text-indigo-500" />
            <span className="text-gray-700 text-sm">infinitytechnologies50@gmail.com</span>
          </div>
          <div className="items-center gap-3 bg-white/70 p-4 hover:scale-105 transition rounded-xl shadow">
            <Phone className="text-indigo-500" />
            <span className="text-gray-700 text-sm">+91 1800 180 777</span>
          </div>
          <div className="items-center gap-3 bg-white/70 p-4 hover:scale-105 transition rounded-xl shadow">
            <LocationOn className="text-indigo-500" />
            <span className="text-gray-700 text-sm">
              Noida, Uttar Pradesh, India
            </span>
          </div>
        </div>
      </div>
      <div className="border-t border-indigo-900 w-full h-px bg-indigo-400/50"></div>
      <div className="max-w-7xl mx-auto px-6 py-4 flex flex-col md:flex-row justify-between items-center gap-4">
        <p className="text-gray-500 text-sm">
          © {new Date().getFullYear()} <span className="text-indigo-500 font-medium">QuickShop</span>. All rights reserved.
        </p>
        <div className="flex gap-3">
          {[GitHub, LinkedIn, Instagram, YouTube].map((Icon, index) => (
            <div key={index} className="w-10 h-10 flex items-center justify-center rounded-full bg-gray-500 text-gray-400 hover:border-indigo-500 shadow hover:bg-indigo-600 hover:text-white shadow-md hover:shadow-blue-600 transition hover:scale-105 cursor-pointer" >
              <Icon fontSize="small" />
            </div>
          ))}
        </div>
      </div>
    </footer>
  )
}

export default Footer