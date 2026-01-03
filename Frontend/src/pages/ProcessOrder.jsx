import React from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "sonner";
import { BASE_URL } from "../lib/api"; // ya "../lib/api.js"


const ProcessOrder = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem("accessToken");

  const { cart } = useSelector((store) => store.product);
  const cartItems = cart?.items || [];

  const address = JSON.parse(localStorage.getItem("checkoutAddress"));

  if (!address) {
    navigate("/checkout");
    return null;
  }

  const total = cartItems.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

  const placeOrder = async () => {
    try {
      await axios.post(
       `${BASE_URL}/order/create`,
        {
          items: cartItems,
          address,
          totalAmount: total,
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      toast.success("Order placed successfully 🎉");
      localStorage.removeItem("checkoutAddress");
      navigate("/orders");
    } catch {
      toast.error("Order failed");
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 pt-28 pb-10">
      <div className="max-w-5xl mx-auto px-4 grid md:grid-cols-3 gap-8">
        
        {/* LEFT SECTION */}
        <div className="md:col-span-2 space-y-6">
          <h2 className="text-3xl font-bold">Confirm Your Order</h2>

          {/* ADDRESS CARD */}
          <div className="bg-white rounded-2xl shadow p-6">
            <h3 className="text-lg font-semibold mb-4">
              📍 Delivery Address
            </h3>

            <div className="text-sm text-gray-700 space-y-1">
              <p className="font-medium">{address.fullName}</p>
              <p>{address.phone}</p>
              <p>
                {address.street}, {address.city}, {address.state} -{" "}
                {address.pincode}
              </p>
            </div>

            <button
              onClick={() => navigate("/checkout")}
              className="mt-4 text-sm text-blue-600 hover:underline"
            >
              Change Address
            </button>
          </div>

          {/* ITEMS CARD */}
          <div className="bg-white rounded-2xl shadow p-6">
            <h3 className="text-lg font-semibold mb-4">🛒 Order Items</h3>

            {cartItems.map((item, i) => (
              <div
                key={i}
                className="flex justify-between items-center border-b py-3 last:border-none"
              >
                <div>
                  <p className="font-medium">
                    {item.productId.productName}
                  </p>
                  <p className="text-sm text-gray-500">
                    Qty: {item.quantity}
                  </p>
                </div>
                <p className="font-semibold">
                  ₹{item.price * item.quantity}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* RIGHT SUMMARY */}
        <div className="bg-white rounded-2xl shadow p-6 h-fit sticky top-28">
          <h3 className="text-lg font-semibold mb-4">Order Summary</h3>

          <div className="flex justify-between text-sm mb-2">
            <p>Subtotal</p>
            <p>₹{total}</p>
          </div>

          <div className="flex justify-between text-sm mb-2">
            <p>Delivery</p>
            <p className="text-green-600">Free</p>
          </div>

          <hr className="my-4" />

          <div className="flex justify-between text-lg font-bold mb-6">
            <p>Total</p>
            <p>₹{total}</p>
          </div>

          <button
            onClick={() => navigate("/payment")}

            className="w-full bg-black text-white py-3 rounded-xl text-lg hover:opacity-90 transition"
          >
            Place Order
          </button>

          <p className="text-xs text-gray-500 text-center mt-3">
            🔒 Secure checkout • Easy returns
          </p>
        </div>
      </div>
    </div>
  );
};

export default ProcessOrder;
