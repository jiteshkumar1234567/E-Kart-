import React, { useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "sonner";
import Lottie from "lottie-react";
import successAnimation from "../assets/Delivery guy.json"; // <-- Correct path & name
import { BASE_URL } from "@/lib/api";


const Payment = () => {
  const navigate = useNavigate();
  const { cart } = useSelector((store) => store.product);
  const cartItems = cart?.items || [];
  const token = localStorage.getItem("accessToken");
  const address = JSON.parse(localStorage.getItem("checkoutAddress"));

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  if (!address) {
    navigate("/checkout");
    return null;
  }

  const totalAmount = cartItems.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

  // 🛒 PLACE COD ORDER
  const placeOrder = async () => {
    setLoading(true);
    try {
      await axios.post(
        `${BASE_URL}/order/create`,
        { items: cartItems, address, totalAmount },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setSuccess(true);
    } catch (err) {
      console.log(err);
      console.error(err);
      toast.error("Order failed. Try again!");
    } finally {
      setLoading(false);
    }
  };

  // ✅ Success screen
  if (success) {
    return (
      <div className="flex flex-col justify-center items-center h-screen bg-gradient-to-br from-pink-50 to-white">
        <Lottie animationData={successAnimation} loop={false} className="w-64 h-64" />
        <h1 className="text-3xl font-bold mt-6 text-green-600">Order Placed Successfully! 🎉</h1>
        <p className="text-gray-600 mt-2">Your order is on its way 🚚</p>
        <button
          onClick={() =>  navigate("/orders")}
          className="mt-6 bg-green-600 hover:bg-green-500 text-white px-6 py-3 rounded-lg font-semibold shadow-lg"
        >
          View My Orders
        </button>
      </div>
    );
  }

  return (
    // <div className="max-w-4xl mx-auto px-4 py-20">
    <div className="max-w-4xl mx-auto px-4 pt-32 pb-20">

      <h2 className="text-4xl font-bold mb-10 text-center">Cash on Delivery</h2>

      <div className="flex flex-col md:flex-row gap-10">
        {/* LEFT: COD Info */}
        <div className="flex-1 bg-white rounded-3xl shadow-xl p-8 space-y-6 border border-pink-200">
          <h3 className="text-xl font-semibold mb-4">Selected Payment Method</h3>
          <p className="text-gray-700 text-lg">
            💵 Cash on Delivery (COD) <br />
            Pay ₹<span className="font-bold">{totalAmount}</span> when your order arrives.
          </p>

          <p className="text-sm text-gray-500 mt-4">
            Make sure your address is correct. You can change it in checkout.
          </p>
        </div>

        {/* RIGHT: Order Summary */}
        <div className="flex-1 bg-gradient-to-br from-pink-50 to-white p-8 rounded-3xl shadow-xl border border-pink-200 space-y-4">
          <h3 className="text-xl font-semibold mb-4">Order Summary</h3>

          {cartItems.map((item) => (
            <div key={item.productId._id} className="flex justify-between text-gray-700">
              <span>{item.productId.productName} × {item.quantity}</span>
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
