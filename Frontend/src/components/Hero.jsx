import React from "react"
import { Button } from "./ui/button"
import { ArrowRight } from "lucide-react"

const Hero = () => {
  return (
    <section className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 text-white pt-32 pb-20">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid md:grid-cols-2 gap-12 items-center">

          {/* Left Content */}
          <div>
            <span className="inline-block mb-4 px-4 py-1 text-sm font-semibold bg-white/20 rounded-full">
              🔥 Best Tech Deals 2025
            </span>

            <h1 className="text-4xl md:text-6xl font-extrabold leading-tight mb-6">
              Latest Electronics <br />
              <span className="text-yellow-300">At Best Prices</span>
            </h1>

            <p className="text-lg md:text-xl text-blue-100 mb-8 max-w-lg">
              Discover cutting-edge technology with unbeatable deals on
              smartphones, laptops, accessories and more.
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <Button className="bg-white text-blue-600 hover:bg-gray-100 px-8 py-6 text-lg">
                Shop Now <ArrowRight className="ml-2" size={18} />
              </Button>

             <Button 
  variant="outline"
  className="
    border-2 border-white
    text-white
    bg-transparent
    px-8 py-6 text-lg font-semibold
    transition-all duration-300 ease-in-out
    hover:bg-white hover:text-blue-600
    hover:shadow-lg hover:scale-105
    focus:outline-none focus:ring-2 focus:ring-white/50
  "
>
  View Deals
</Button>

            </div>
          </div>

          {/* Right Image */}
          <div className="relative flex justify-center">
            <div className="absolute -inset-6 bg-white/20 blur-3xl rounded-full"></div>

            <img
              src="/hero1.png"
              alt="Electronics" width={500} height={400}
              className="relative rounded-lg w-full max-w-md drop-shadow-2xl animate-float"
            />
          </div>

        </div>
      </div>
    </section>
  )
}

export default Hero
