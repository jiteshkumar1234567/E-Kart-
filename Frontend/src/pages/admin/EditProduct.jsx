
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { X } from "lucide-react";
import { BASE_URL } from "../../lib/api";




const EditProduct = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const token = localStorage.getItem("accessToken");

  const [form, setForm] = useState({
    productName: "",
    productPrice: "",
    category: "",
    brand: "",
    description: "",
  });

  const [existingImages, setExistingImages] = useState([]);
  const [newImages, setNewImages] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await axios.get(
        `${BASE_URL}/admin/product/${id}`,
          { headers: { Authorization: `Bearer ${token}` } }
        );

        setForm({
          productName: res.data.product.productName,
          productPrice: res.data.product.productPrice,
          category: res.data.product.category,
          brand: res.data.product.brand,
          description: res.data.product.description || "",
        });

        setExistingImages(res.data.product.productimg);
      } catch {
        toast.error("Fill The Field That You Updated");
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });
  const handleImageChange = (e) => setNewImages([...e.target.files]);

  const handleRemoveExistingImage = (index) => {
    setExistingImages((prev) => prev.filter((_, i) => i !== index));
  };











  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    Object.entries(form).forEach(([k, v]) => formData.append(k, v));
    newImages.forEach((img) => formData.append("images", img));

    try {
      await axios.put(
        `${BASE_URL}/admin/update-product/${id}`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );

      toast.success("Product updated");
      navigate("/dashboard/product");
    } catch {
      toast.error("Update failed");
    }
  };









  if (loading)
    return <p className="pt-28 text-center text-gray-500">Loading...</p>;

  return (
    <div className="pt-28 max-w-4xl mx-auto p-6 bg-gradient-to-br from-pink-50 to-purple-50 rounded-2xl">
      <div className="bg-white rounded-2xl shadow-xl p-8">
        <h2 className="text-2xl font-bold mb-6 text-gray-800 text-center">
          Edit Product
        </h2>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Grid for Inputs */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <input
              name="productName"
              value={form.productName}
              onChange={handleChange}
              placeholder="Product Name"
              className="w-full border border-gray-300 rounded-xl px-4 py-2 focus:outline-none focus:ring-2 focus:ring-pink-500 shadow-sm"
            />

            <input
              name="productPrice"
              value={form.productPrice}
              onChange={handleChange}
              placeholder="Price (₹)"
              type="number"
              className="w-full border border-gray-300 rounded-xl px-4 py-2 focus:outline-none focus:ring-2 focus:ring-pink-500 shadow-sm"
            />

            <input
              name="category"
              value={form.category}
              onChange={handleChange}
              placeholder="Category"
              className="w-full border border-gray-300 rounded-xl px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-sm"
            />

            <input
              name="brand"
              value={form.brand}
              onChange={handleChange}
              placeholder="Brand"
              className="w-full border border-gray-300 rounded-xl px-4 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500 shadow-sm"
            />
          </div>

          {/* Description */}
          <textarea
            name="description"
            value={form.description}
            onChange={handleChange}
            placeholder="Product Description"
            rows={3}
            className="w-full border border-gray-300 rounded-xl px-4 py-2 focus:outline-none focus:ring-2 focus:ring-pink-500 shadow-sm resize-none"
          />

          {/* Image Upload */}
          <div className="space-y-3">
            <label className="block text-gray-700 font-medium">Upload New Images</label>
            <input
              type="file"
              multiple
              onChange={handleImageChange}
              className="w-full border border-gray-300 rounded-xl px-4 py-2 focus:outline-none focus:ring-2 focus:ring-pink-500 shadow-sm"
            />

            {/* Existing Images */}
            {existingImages.length > 0 && (
              <div className="flex flex-wrap gap-3 mt-2">
                {existingImages.map((img, i) => (
                  <div key={i} className="relative">
                    <img
                      src={img.url}
                      className="w-20 h-20 object-cover rounded-xl border shadow-sm"
                    />
                    <button
                      type="button"
                      onClick={() => handleRemoveExistingImage(i)}
                      className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 shadow hover:bg-red-600 transition"
                      title="Remove Image"
                    >
                      <X size={14} />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-pink-600 text-white py-3 rounded-2xl text-lg font-semibold hover:bg-pink-700 transition shadow"
          >
            Update Product
          </button>
        </form>
      </div>
    </div>
  );
};

export default EditProduct;

