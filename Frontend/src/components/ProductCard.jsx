// import React, { useState } from "react";
// import { ShoppingCart, Check } from "lucide-react";
// import axios from "axios";
// import { useDispatch, useSelector } from "react-redux";
// import { toast } from "sonner";
// import { setCart } from "@/redux/productSlice";
// import { Skeleton } from "@/components/ui/skeleton";

// const ProductCard = ({ product, loading }) => {
//   const dispatch = useDispatch();
//   const { cart } = useSelector((store) => store.product);
//   const [added, setAdded] = useState(false);

//   if (loading) {
//     return (
//       <div className="border rounded-xl p-3 space-y-3 animate-pulse">
//   <Skeleton className="w-full h-40 rounded-2xl shadow-sm bg-gradient-to-r from-pink-100 via-pink-50 to-pink-100" />

// <Skeleton className="h-4 w-3/4 mt-4 bg-gradient-to-r from-pink-100 via-pink-50 to-pink-100" />

// <Skeleton className="h-5 w-1/2 mt-2 bg-gradient-to-r from-pink-200 via-pink-100 to-pink-200" />

// <Skeleton className="h-11 w-full rounded-xl mt-4 bg-gradient-to-r from-pink-100 via-pink-50 to-pink-100" />

//       </div>
//     );
//   }

//   const isInCart = cart.items?.some(
//     (item) => item.productId?._id === product._id
//   );

//   const addToCart = async () => {
//     try {
//       const res = await axios.post(
//         "http://localhost:8000/api/v1/cart/add",
//         { productId: product._id },
//         {
//           headers: {
//             Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
//           },
//         }
//       );

//       dispatch(setCart(res.data.cart));
//       setAdded(true);
//       toast.success("Added to cart");

//       setTimeout(() => setAdded(false), 2000);
//     } catch (error) {
//       toast.error("Add to cart failed Login First");
//     }
//   };

//   return (
//     <div className="border rounded-xl p-3 hover:shadow-xl transition">
//       <img
//         src={product?.productimg?.[0]?.url}
//         alt={product.productName}
//         className="w-full h-40 object-cover rounded-lg"
//       />

//       <h3 className="mt-2 font-semibold text-sm">
//         {product.productName}
//       </h3>
//       <p className="font-bold text-lg">₹{product.productPrice}</p>

//       <button
//         onClick={addToCart}
//         disabled={added}
//         className={`mt-3 w-full flex items-center justify-center gap-2 py-2 rounded-lg transition
//           ${
//             added
//               ? "bg-green-500 text-white"
//               : "bg-pink-500 hover:bg-pink-600 text-white"
//           }`}
//       >
//         {added ? <Check size={16} /> : <ShoppingCart size={16} />}
//         {added ? "Added" : "Add to Cart"}
//       </button>
//     </div>
//   );
// };

// export default ProductCard;

































import React, { useState } from "react";
import { ShoppingCart, Check } from "lucide-react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "sonner";
import { setCart } from "@/redux/productSlice";
import { Skeleton } from "@/components/ui/skeleton";
import { useNavigate } from "react-router-dom";

const ProductCard = ({ product, loading }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { cart } = useSelector((store) => store.product);
  const [added, setAdded] = useState(false);

  if (loading) {
    return (
      <div className="border rounded-xl p-3 space-y-3 animate-pulse">
       
  <Skeleton className="w-full h-40 rounded-2xl shadow-sm bg-gradient-to-r from-pink-100 via-pink-50 to-pink-100" />

 <Skeleton className="h-4 w-3/4 mt-4 bg-gradient-to-r from-pink-100 via-pink-50 to-pink-100" />

 <Skeleton className="h-5 w-1/2 mt-2 bg-gradient-to-r from-pink-200 via-pink-100 to-pink-200" />

 <Skeleton className="h-11 w-full rounded-xl mt-4 bg-gradient-to-r from-pink-100 via-pink-50 to-pink-100" />


      </div>
    );
  }

  const isInCart = cart.items?.some(
    (item) => item.productId?._id === product._id
  );

  const addToCart = async (e) => {
    e.stopPropagation(); // ❌ card click trigger nahi hoga

    if (isInCart) {
      toast.info("Already in cart");
      return;
    }

    try {
      const res = await axios.post(
        "http://localhost:8000/api/v1/cart/add",
        { productId: product._id },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          },
        }
      );

      dispatch(setCart(res.data.cart));
      setAdded(true);
      toast.success("Added to cart");

      setTimeout(() => setAdded(false), 2000);
    } catch {
      toast.error("Add to cart failed. Login first");
    }
  };

  return (
    <div
      onClick={() => navigate(`/product/${product._id}`)}
      className="border rounded-xl p-3 hover:shadow-xl transition cursor-pointer"
    >
      <img
        src={product?.productimg?.[0]?.url}
        alt={product.productName}
        className="w-full h-40 object-cover rounded-lg"
      />

      <h3 className="mt-2 font-semibold text-sm line-clamp-2">
        {product.productName}
      </h3>

      <p className="font-bold text-lg">₹{product.productPrice}</p>

      <button
        onClick={addToCart}
        className={`mt-3 w-full flex items-center justify-center gap-2 py-2 rounded-lg 
          transition-all duration-300
          ${
            added
              ? "bg-green-500 text-white scale-105"
              : "bg-pink-500 hover:bg-pink-600 text-white"
          }`}
      >
        {added ? <Check size={16} /> : <ShoppingCart size={16} />}
        {added ? "Added" : "Add to Cart"}
      </button>
    </div>
  );
};

export default ProductCard;




















// import React, { useState } from "react";
// import { ShoppingCart, Check } from "lucide-react";
// import axios from "axios";
// import { useDispatch, useSelector } from "react-redux";
// import { toast } from "sonner";
// import { setCart } from "@/redux/productSlice";
// import { Skeleton } from "@/components/ui/skeleton";
// import { useNavigate } from "react-router-dom";

// const ProductCard = ({ product, loading }) => {
//   const dispatch = useDispatch();
//   const navigate = useNavigate();
//   const { cart } = useSelector((store) => store.product);

//   const [added, setAdded] = useState(false);

//   if (loading) {
//     return (
//       <div className="border rounded-xl p-3 space-y-3 animate-pulse">
//         <Skeleton className="w-full h-40 rounded-xl" />
//         <Skeleton className="h-4 w-3/4" />
//         <Skeleton className="h-5 w-1/2" />
//         <Skeleton className="h-11 w-full rounded-xl" />
//       </div>
//     );
//   }

//   const isInCart = cart.items?.some(
//     (item) => item.productId?._id === product._id
//   );

//   const addToCart = async (e) => {
//     e.stopPropagation();

//     if (isInCart) {
//       toast.info("Already in cart");
//       return;
//     }

//     try {
//       const res = await axios.post(
//         "http://localhost:8000/api/v1/cart/add",
//         { productId: product._id },
//         {
//           headers: {
//             Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
//           },
//         }
//       );

//       dispatch(setCart(res.data.cart));
//       setAdded(true);
//       toast.success("Added to cart");

//       // ⏱️ 1.5 sec baad normal ho jayega
//       setTimeout(() => {
//         setAdded(false);
//       }, 1500);

//     } catch {
//       toast.error("Add to cart failed. Login first!");
//     }
//   };

//   return (
//     <div
//       onClick={() => navigate(`/product/${product._id}`)}
//       className="border rounded-xl p-3 hover:shadow-xl transition cursor-pointer"
//     >
//       <img
//         src={product?.productimg?.[0]?.url}
//         alt={product.productName}
//         className="w-full h-40 object-cover rounded-lg"
//       />

//       <h3 className="mt-2 font-semibold text-sm line-clamp-2">
//         {product.productName}
//       </h3>

//       <p className="font-bold text-lg">₹{product.productPrice}</p>

//       <button
//         onClick={addToCart}
//         className={`mt-3 w-full flex items-center justify-center gap-2 py-2 rounded-lg transition-all duration-300
//           ${
//             added
//               ? "bg-green-500 text-white scale-105"
//               : "bg-pink-500 hover:bg-pink-600 text-white"
//           }`}
//       >
//         {added ? <Check size={16} /> : <ShoppingCart size={16} />}
//         {added ? "Added" : "Add to Cart"}
//       </button>
//     </div>
//   );
// };

// export default ProductCard;
