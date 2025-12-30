import React from "react"
import { Link } from "react-router-dom"
import { motion } from "framer-motion"
import { Facebook, Instagram, Twitter, Mail } from "lucide-react"

const Footer = () => {
  return (
    <footer className="bg-gradient-to-r from-slate-50 via-blue-50 to-pink-50 text-gray-800 pt-10">
      <div className="max-w-7xl mx-auto px-6">

        {/* TOP */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="grid gap-10 md:grid-cols-2 lg:grid-cols-5 pb-8 border-b border-gray-200"
        >

          {/* Column 1: Logo + Description */}
          <div>
            <img src="/EKart.png" alt="EKart" className="w-24 mb-3" />
            <p className="text-sm text-gray-500 leading-relaxed">
              EKart brings you the best electronics with trusted quality and fast delivery.
            </p>
          </div>

          {/* Column 2: Quick Links */}
          <div>
            <h3 className="font-semibold mb-3">Quick Links</h3>
            <ul className="space-y-2 text-sm">
              <li><Link to="/" className="hover:text-pink-600 hover:underline">Home</Link></li>
              <li><Link to="/product" className="hover:text-pink-600 hover:underline">Products</Link></li>
              <li><Link to="/cart" className="hover:text-pink-600 hover:underline">Cart</Link></li>
              <li><Link to="/login" className="hover:text-pink-600 hover:underline">Login</Link></li>
            </ul>
          </div>

          {/* Column 3: Address */}
          <div>
            <h3 className="font-semibold mb-3">Address</h3>
            <p className="text-sm text-gray-500 leading-relaxed">
              123 EKart Street, New Delhi, India
            </p>
          </div>

          {/* Column 4: Payments */}
          <div>
            <h3 className="font-semibold mb-3">We Accept</h3>
            <div className="flex items-center gap-3">
              <img src="/visa.jpg" alt="Visa" className="h-7" />
              <img src="/gpay.png" alt="GPay" className="h-7" />
              <img src="/upi1.jpg" alt="UPI" className="h-7" />
            </div>
          </div>

          {/* Column 5: Newsletter + Social */}
          <div>
            <h3 className="font-semibold mb-3">Subscribe & Follow</h3>

            {/* Newsletter */}
            <div className="flex items-center border rounded-lg overflow-hidden bg-white mb-4 hover:underline ">
              <input
                type="email"
                placeholder="Enter your email"
                className="px-3 py-2 text-sm text-black w-full outline-none "
              />
              <button className="bg-pink-600 text-white px-4 py-2 hover:bg-pink-500">
                <Mail size={16} />
              </button>
            </div>

            {/* Social Icons */}
            <div className="flex gap-4 mt-2">
              <Facebook className="hover:text-pink-600 cursor-pointer" size={18} />
              <Instagram className="hover:text-pink-600 cursor-pointer" size={18} />
              <Twitter className="hover:text-pink-600 cursor-pointer" size={18} />
            </div>
          </div>

        </motion.div>

        {/* BOTTOM */}
        <div className="py-4 text-center text-xs text-gray-500">
          © {new Date().getFullYear()} EKart. All rights reserved.
        </div>

      </div>
    </footer>
  )
}

export default Footer
