
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { toast } from "sonner";
import { useDispatch } from "react-redux";
import { setCart } from "@/redux/productSlice";
import {
  ShoppingCart,
  Check,
  Minus,
  Plus,
  ShieldCheck,
  Truck,
} from "lucide-react";


import {  RotateCcw, BadgeCheck, Headphones, PackageCheck } from "lucide-react";
import { BASE_URL } from "../lib/api"; // ya "../lib/api.js"



const ProductDetails = () => {
  const { id } = useParams();
  const dispatch = useDispatch();

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [added, setAdded] = useState(false);
  const [quantity, setQuantity] = useState(1);
  const [activeImg, setActiveImg] = useState(0);

  const token = localStorage.getItem("accessToken");

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await axios.get(
        `${BASE_URL}/product/${id}`
        );
        if (res.data.success) setProduct(res.data.product);
      } catch {
        toast.error("Failed to fetch product");
      } finally {
        setLoading(false);
      }
    };
    fetchProduct();
  }, [id]);

  const addToCart = async () => {
    try {
      const res = await axios.post(
      `${BASE_URL}/cart/add`,
        { productId: product._id, quantity },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      dispatch(setCart(res.data.cart));
      setAdded(true);
      toast.success("Added to cart");
      setTimeout(() => setAdded(false), 2000);
    } catch {
      toast.error("Login required to add product");
    }
  };

  if (loading)
    return <div className="pt-32 text-center">Loading product...</div>;

  if (!product)
    return <div className="pt-32 text-center">Product not found</div>;

  return (
    <div className="pt-28 pb-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 grid md:grid-cols-2 gap-10">
        {/* 🔹 IMAGES */}
        <div className="bg-white p-6 rounded-2xl shadow-sm">
          <img
            src={product.productimg[activeImg]?.url}
            alt={product.productName}
            className="w-full h-[420px] object-contain rounded-xl"
          />

          <div className="flex gap-3 mt-4 overflow-x-auto">
            {product.productimg.map((img, idx) => (
              <img
                key={idx}
                src={img.url}
                onClick={() => setActiveImg(idx)}
                className={`w-20 h-20 object-cover rounded-lg cursor-pointer border ${
                  activeImg === idx
                    ? "border-pink-500 ring-2 ring-pink-400"
                    : "border-gray-200"
                }`}
              />
            ))}
          </div>
        </div>

        {/* 🔹 DETAILS */}
        <div className="bg-white p-8 rounded-2xl shadow-sm space-y-5">
          <h1 className="text-2xl font-bold">{product.productName}</h1>

          <p className="text-sm text-gray-800 capitalize">
            {product.brand} • {product.category}
          </p>

         <div className="flex items-center gap-4">
                       <span className="text-3xl font-bold text-pink-600">
               ₹{product.productPrice}
             </span>
             <span className="text-sm text-green-600 font-medium">
             + <i className="text-2xl">18% (GST)</i>
             </span>
          </div>

          <p className="text-gray-700">{product.productDesc}</p>

          {/* Quantity */}
          <div className="flex items-center gap-4">
            <span className="font-medium">Quantity</span>
            <div className="flex border rounded-lg">
              <button
                onClick={() => quantity > 1 && setQuantity(quantity - 1)}
                className="p-2"
              >
                <Minus size={16} />
              </button>
              <span className="px-4">{quantity}</span>
              <button
                onClick={() => setQuantity(quantity + 1)}
                className="p-2"
              >
                <Plus size={16} />
              </button>
            </div>
          </div>

          {/* Add to cart
          <button
            onClick={addToCart}
            disabled={added}
            className={`w-full py-3 rounded-xl text-lg font-semibold ${
              added
                ? "bg-green-500 text-white"
                : "bg-pink-500 hover:bg-pink-600 text-white"
            }`}
          >
              {added ? <Check size={16} /> : <ShoppingCart size={32} />}
            {added ? "Added to Cart" : " Add to Cart"}
          </button> */}


{/* Add to cart */}
<button
  onClick={addToCart}
  disabled={added}
  className={`w-full py-3 rounded-xl text-lg font-semibold flex items-center justify-center gap-2 transition ${
    added
      ? "bg-green-500 text-white"
      : "bg-pink-500 hover:bg-pink-600 text-white"
  }`}
>
  {added ? (
    <Check size={20} />
  ) : (
    <ShoppingCart size={20} />
  )}
  <span>{added ? "Added to Cart" : "Add to Cart"}</span>
</button>




          {/* Trust Info */}
          <div className="grid grid-cols-2 gap-4 text-sm pt-4 border-t">
           
<div className="flex items-center gap-2">
  <ShieldCheck className="text-green-600" size={18} />
  Secure Payments
</div>

<div className="flex items-center gap-2">
  <Truck className="text-blue-600" size={18} />
  Fast Delivery
</div>

<div className="flex items-center gap-2">
  <RotateCcw className="text-orange-600" size={18} />
  Easy Returns
</div>

<div className="flex items-center gap-2">
  <BadgeCheck className="text-purple-600" size={18} />
  Genuine Products
</div>

<div className="flex items-center gap-2">
  <Headphones className="text-pink-600" size={18} />
  24/7 Customer Support
</div>

<div className="flex items-center gap-2">
  <PackageCheck className="text-teal-600" size={18} />
  Quality Checked Items
</div>
          </div>
 <b>
   <div className="text-xs text-gray-700 pt-2">
           Seller: {product.createdBy?.firstName}{" "}
            {product.createdBy?.lastName} ({product.createdBy?.email})
          </div></b>

        </div>
      </div>
    </div>
  );
};

export default ProductDetails;























