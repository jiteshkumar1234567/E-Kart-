import React from "react"
import {
  Truck,
  ShieldCheck,
  Headphones,
  CreditCard,
} from "lucide-react"

const features = [
  {
    icon: <Truck size={32} />,
    title: "Fast Delivery",
    desc: "Get your products delivered quickly and safely at your doorstep.",
  },
  {
    icon: <ShieldCheck size={32} />,
    title: "Secure Payments",
    desc: "100% secure payment gateways with buyer protection.",
  },
  {
    icon: <Headphones size={32} />,
    title: "24/7 Support",
    desc: "Our support team is always ready to help you anytime.",
  },
  {
    icon: <CreditCard size={32} />,
    title: "Easy Returns",
    desc: "Hassle-free returns within 7 days of purchase.",
  },
]

const Features = () => {
  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-6">
        {/* Heading */}
        <div className="text-center mb-14">
          <h2 className="text-3xl md:text-4xl font-extrabold text-gray-800">
            Why Shop With <span className="text-pink-600">EKart</span>?
          </h2>
          <p className="text-gray-600 mt-3 max-w-xl mx-auto">
            We provide the best service and customer experience in online
            shopping.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((item, index) => (
            <div
              key={index}
              className="bg-white p-8 rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-2"
            >
              <div className="w-14 h-14 flex items-center justify-center rounded-full bg-pink-100 text-pink-600 mb-6">
                {item.icon}
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-2">
                {item.title}
              </h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                {item.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Features

