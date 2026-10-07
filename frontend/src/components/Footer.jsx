import {
  Phone,
  Mail,
  GitHub,
  LinkedIn,
  LocationOn,
  YouTube,
  Instagram,
} from "@mui/icons-material";

import { Link } from "react-router-dom";

function Footer() {
  const socialLinks = [
    {
      Icon: GitHub,
      link: "https://github.com/yourgithub",
    },
    {
      Icon: LinkedIn,
      link: "https://linkedin.com/in/yourlinkedin",
    },
    {
      Icon: Instagram,
      link: "https://instagram.com/yourinstagram",
    },
    {
      Icon: YouTube,
      link: "https://youtube.com/@yourchannel",
    },
  ];

  return (
    <footer className="border-t border-indigo-900 bg-gradient-to-br from-[#0b1120] via-[#111827] to-[#1e1b4b]">

      {/* Top Glow Line */}
      <div className="h-[1px] w-full bg-gradient-to-r from-transparent via-indigo-500 to-transparent"></div>

      <div className="max-w-7xl mx-auto px-6 py-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">

        {/* Logo Section */}
        <div>
          <h2 className="text-3xl font-bold text-indigo-500 drop-shadow-[0_0_10px_rgba(99,102,241,0.8)] mb-4">
            QuickShop
          </h2>

          <p className="text-gray-400 leading-relaxed text-sm">
            Empowering modern shopping with quality products, secure payments,
            and a smooth digital experience.
          </p>
        </div>

        {/* Company */}
        <div>
          <h3 className="text-xl text-white font-semibold mb-5 relative inline-block">
            Company
            <span className="absolute left-0 -bottom-2 w-14 h-1 bg-indigo-500 rounded-full"></span>
          </h3>

          <ul className="space-y-3 flex flex-col text-gray-400">
            <Link
              to="/products"
              className="hover:text-indigo-400 hover:translate-x-1 transition-all duration-300"
            >
              Products
            </Link>

            <Link
              to="/pricing"
              className="hover:text-indigo-400 hover:translate-x-1 transition-all duration-300"
            >
              Pricing
            </Link>

            <Link
              to="/about"
              className="hover:text-indigo-400 hover:translate-x-1 transition-all duration-300"
            >
              About
            </Link>

            <Link
              to="/contact"
              className="hover:text-indigo-400 hover:translate-x-1 transition-all duration-300"
            >
              Contact
            </Link>
          </ul>
        </div>

        {/* Support */}
        <div>
          <h3 className="text-xl text-white font-semibold mb-5 relative inline-block">
            Support
            <span className="absolute left-0 -bottom-2 w-14 h-1 bg-indigo-500 rounded-full"></span>
          </h3>

          <ul className="space-y-3 flex flex-col text-gray-400">
            <Link
              to="/help-center"
              className="hover:text-indigo-400 hover:translate-x-1 transition-all duration-300"
            >
              Help Center
            </Link>

            <Link
              to="/shipping"
              className="hover:text-indigo-400 hover:translate-x-1 transition-all duration-300"
            >
              Shipping
            </Link>

            <Link
              to="/returns"
              className="hover:text-indigo-400 hover:translate-x-1 transition-all duration-300"
            >
              Returns
            </Link>

            <Link
              to="/faqs"
              className="hover:text-indigo-400 hover:translate-x-1 transition-all duration-300"
            >
              FAQs
            </Link>
          </ul>
        </div>

        {/* Contact */}
        <div className="space-y-4">
          <h3 className="text-xl text-white font-semibold mb-5 relative inline-block">
            Contact
            <span className="absolute left-0 -bottom-2 w-14 h-1 bg-indigo-500 rounded-full"></span>
          </h3>

          {/* Email */}
          <a
            href="mailto:suraj24tech@gmail.com"
            className="flex items-center gap-4 bg-white/5 border border-white/10 backdrop-blur-md p-4 rounded-2xl hover:-translate-y-1 hover:border-indigo-500/40 transition-all duration-300"
          >
            <Mail className="text-indigo-400" />

            <span className="text-gray-300 text-sm break-all">
              suraj24tech@gmail.com
            </span>
          </a>

          {/* Phone */}
          <a
            href="tel:+917376731077"
            className="flex items-center gap-4 bg-white/5 border border-white/10 backdrop-blur-md p-4 rounded-2xl hover:-translate-y-1 hover:border-indigo-500/40 transition-all duration-300"
          >
            <Phone className="text-indigo-400" />

            <span className="text-gray-300 text-sm">
              +91 7376731077
            </span>
          </a>

          {/* Location */}
          <a
            href="https://www.google.com/maps?q=Noida,Uttar+Pradesh,India"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-4 bg-white/5 border border-white/10 backdrop-blur-md p-4 rounded-2xl hover:-translate-y-1 hover:border-indigo-500/40 transition-all duration-300"
          >
            <LocationOn className="text-indigo-400" />

            <span className="text-gray-300 text-sm">
              Noida, Uttar Pradesh, India
            </span>
          </a>
        </div>
      </div>

      {/* Bottom Section */}
      <div className="border-t border-white/10">
        <div className="max-w-7xl mx-auto px-6 py-6 flex flex-col md:flex-row justify-between items-center gap-5">

          <p className="text-gray-500 text-sm text-center">
            © {new Date().getFullYear()}{" "}
            <span className="text-indigo-400 font-medium">
              QuickShop
            </span>
            . All rights reserved.
          </p>

          {/* Social Icons */}
          <div className="flex items-center gap-4">
            {socialLinks.map(({ Icon, link }, index) => (
              <a
                key={index}
                href={link}
                target="_blank"
                rel="noopener noreferrer"
                className="w-11 h-11 flex items-center justify-center rounded-full bg-white/10 text-gray-300 hover:bg-indigo-600 hover:text-white hover:-translate-y-1 transition-all duration-300 shadow-lg"
              >
                <Icon fontSize="small" />
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;