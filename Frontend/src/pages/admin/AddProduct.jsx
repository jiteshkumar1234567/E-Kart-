import React, { useState } from "react"
import axios from "axios"
import { toast } from "sonner"
import { motion, AnimatePresence } from "framer-motion"
import { CheckCircle } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { BASE_URL } from "@/lib/api"

const AddProduct = () => {
  const [productName, setProductName] = useState("")
  const [productPrice, setProductPrice] = useState("")
  const [category, setCategory] = useState("")
  const [brand, setBrand] = useState("")
  const [description, setDescription] = useState("")
  const [images, setImages] = useState([])
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)

  const handleImageChange = (e) => {
    setImages(e.target.files)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (
      !productName ||
      !productPrice ||
      !category ||
      !brand ||
      !description ||
      images.length === 0
    ) {
      return toast.error("Please fill all fields and upload images")
    }

    const formData = new FormData()
    formData.append("productName", productName)
    formData.append("productPrice", productPrice)
    formData.append("category", category)
    formData.append("brand", brand)
    formData.append("description", description)

    // ✅ multer field name must match backend
Array.from(images).forEach((img) => {
  formData.append("images", img)
})


    try {
      setLoading(true)
      const token = localStorage.getItem("accessToken")

      const res = await axios.post(
       `${BASE_URL}/admin/add-product`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`, // ❌ DO NOT set multipart header manually
          },
        }
      )

      if (res.data.success) {
        setSuccess(true)
        toast.success("Product added successfully")

        setProductName("")
        setProductPrice("")
        setCategory("")
        setBrand("")
        setDescription("")
        setImages([])

        setTimeout(() => setSuccess(false), 2500)
      }
    } catch (error) {
      console.error(error)
      toast.error("Failed to add product")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 to-purple-50 flex items-center justify-center p-1">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white w-full max-w-2xl rounded-2xl shadow-xl p-8 relative"
      >
        {/* ✅ SUCCESS ANIMATION */}
        <AnimatePresence>
          {success && (
            <motion.div
              initial={{ scale: 0.6, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.6, opacity: 0 }}
              className="absolute inset-0 bg-white/90 flex flex-col items-center justify-center rounded-2xl z-10"
            >
              <CheckCircle className="w-16 h-16 text-green-500 mb-3" />
              <h2 className="text-xl font-semibold text-green-600">
                Product Added Successfully
              </h2>
            </motion.div>
          )}
        </AnimatePresence>

        <h1 className="text-3xl font-bold text-center mb-6 text-gray-800">
          Add New Product
        </h1>


        <form onSubmit={handleSubmit} className="space-y-5">

  {/* Product Name */}
  <div className="space-y-2">
    <Label>Product Name</Label>
    <Input
      value={productName}
      onChange={(e) => setProductName(e.target.value)}
      placeholder="Enter product name"
    />
  </div>

  {/* Price + Category (same row) */}
  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
    <div className="space-y-2">
      <Label>Price (₹)</Label>
      <Input
        type="number"
        value={productPrice}
        onChange={(e) => setProductPrice(e.target.value)}
        placeholder="Enter price"
      />
    </div>

    <div className="space-y-2">
      <Label>Category</Label>
      <Input
        value={category}
        onChange={(e) => setCategory(e.target.value)}
        placeholder="Enter category"
      />
    </div>
  </div>

  {/* Brand + Images (same row) */}
  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
    <div className="space-y-2">
      <Label>Brand</Label>
      <Input
        value={brand}
        onChange={(e) => setBrand(e.target.value)}
        placeholder="Enter brand"
      />
    </div>

    <div className="space-y-2">
      <Label>Product Images</Label>
      <Input
        type="file"
        multiple
        accept="image/*"
        onChange={handleImageChange}
      />
    </div>
  </div>

  {/* Description */}
  <div className="space-y-2">
    <Label>Description</Label>
    <textarea
      rows={3}
      value={description}
      onChange={(e) => setDescription(e.target.value)}
      placeholder="Enter product description"
      className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-pink-500"
    />
  </div>

  {/* Submit Button */}
  <Button
    type="submit"
    disabled={loading}
    className="w-full bg-pink-600 hover:bg-pink-700 text-white text-lg py-6 rounded-xl"
  >
    {loading ? "Adding Product..." : "Add Product"}
  </Button>

</form>

      </motion.div>
    </div>
  )
}

export default AddProduct





