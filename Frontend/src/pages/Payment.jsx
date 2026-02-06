import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "sonner";
import { BASE_URL } from "../lib/api";
import { setCart } from "@/redux/productSlice";

const Payment = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { cart } = useSelector((store) => store.product);
  const cartItems = cart?.items || [];

  const token = localStorage.getItem("accessToken");
  const address = JSON.parse(localStorage.getItem("checkoutAddress"));

  const [loading, setLoading] = useState(false);

  // अगर address nahi hai to checkout bhejo
  if (!address) {
    navigate("/checkout");
    return null;
  }

  const totalAmount = cartItems.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

  // 🚀 PLACE ORDER FUNCTION (FINAL)
  const placeOrder = async () => {
    if (!cartItems.length) {
      toast.error("Cart is empty");
      return;
    }

    if (!token) {
      toast.error("Please login again");
      navigate("/login");
      return;
    }

    setLoading(true);

    try {
      await axios.post(
        `${BASE_URL}/order/create`,
        {
          items: cartItems.map((item) => ({
            product: item.productId._id,
            quantity: item.quantity,
            price: item.price,
          })),
          address,
          totalAmount,
          paymentMethod: "COD",
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      // 🧹 Clear cart
      dispatch(setCart({ items: [], totalPrice: 0 }));
      localStorage.removeItem("cart");

      toast.success("Order placed successfully 🎉");

      // 🔥 AUTO REDIRECT TO DEPLOYED ORDERS PAGE
      window.location.href = "https://e-kart-2-10-2.onrender.com/orders";

    } catch (err) {
      console.log("ERROR:", err);
      toast.error(err.response?.data?.message || "Order failed!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 pt-32 pb-20">
      <h2 className="text-4xl font-bold mb-10 text-center">
        Cash on Delivery
      </h2>

      <div className="flex flex-col md:flex-row gap-10">

        {/* LEFT SIDE */}
        <div className="flex-1 bg-white rounded-3xl shadow-xl p-8 space-y-6 border border-pink-200">
          <h3 className="text-xl font-semibold mb-4">
            Selected Payment Method
          </h3>

          <p className="text-gray-700 text-lg">
            💵 Cash on Delivery <br />
            Pay ₹<span className="font-bold">{totalAmount}</span> when your order arrives.
          </p>

          <p className="text-sm text-gray-500 mt-4">
            Make sure your address is correct. You can change it in checkout.
          </p>
        </div>

        {/* RIGHT SIDE */}
        <div className="flex-1 bg-gradient-to-br from-pink-50 to-white p-8 rounded-3xl shadow-xl border border-pink-200 space-y-4">
          <h3 className="text-xl font-semibold mb-4">Order Summary</h3>

          {cartItems.map((item) => (
            <div
              key={item.productId._id}
              className="flex justify-between text-gray-700"
            >
              <span>
                {item.productId.productName} × {item.quantity}
              </span>
              <span>₹{item.price * item.quantity}</span>
            </div>
          ))}

          <hr className="my-4" />

          <div className="flex justify-between font-bold text-lg text-pink-600">
            <span>Total Amount</span>
            <span>₹{totalAmount}</span>
          </div>

          <button
            onClick={placeOrder}
            disabled={loading}
            className="w-full mt-6 bg-pink-600 hover:bg-pink-500 text-white py-3 rounded-xl font-bold shadow-lg transition"
          >
            {loading ? "Placing Order..." : "Place Order"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Payment;
