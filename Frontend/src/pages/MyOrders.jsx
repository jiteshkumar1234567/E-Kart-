import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import axios from "axios";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";

const MyOrders = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem("accessToken");
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        setLoading(true);
        const res = await axios.get(`http://localhost:8000/api/v1/order/my-orders`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        if (res.data.success) {
          setOrders(res.data.orders);
        }
      } catch (err) {
        console.error(err);
        toast.error("Failed to fetch orders");
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, [token]);

  if (loading) {
    return (
      <div className="pt-28 text-center text-gray-500 text-lg">
        Loading your orders...
      </div>
    );
  }

  if (!orders.length) {
    return (
      <div className="pt-28 text-center text-gray-500">
        <h2 className="text-2xl font-semibold">No orders yet 😕</h2>
        <p className="mt-2">Looks like you haven't placed any orders yet.</p>
      </div>
    );
  }

  return (
    <div className="pt-28 max-w-5xl mx-auto px-4 pb-20">
      <h1 className="text-3xl font-bold mb-8 text-center">My Orders</h1>

      <div className="space-y-6">
        {orders.map((order) => (
          <div
            key={order._id}
            className="bg-white p-6 rounded-2xl shadow-md border border-gray-200"
          >
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold">
                Order #{order._id.slice(-6).toUpperCase()}
              </h2>
              <span
                className={`px-3 py-1 rounded-full text-sm font-medium ${
                  order.paymentStatus === "paid"
                    ? "bg-green-100 text-green-700"
                    : "bg-yellow-100 text-yellow-700"
                }`}
              >
                {order.paymentStatus.toUpperCase()}
              </span>
            </div>

            <div className="space-y-2">
              {order.items.map((item, idx) => (
                <div
                  key={idx}
                  className="flex justify-between text-gray-700 border-b last:border-none py-1"
                >
                  <p>
                    {item.product?.productName} × {item.quantity}
                  </p>
                  <p>₹{item.price * item.quantity}</p>
                </div>
              ))}
            </div>

            <div className="flex justify-between mt-4 font-bold text-lg text-pink-600">
              <span>Total Amount</span>
              <span>₹{order.totalAmount}</span>
            </div>

            <div className="mt-2 text-sm text-gray-500">
              <p>
                Payment Method: <span className="font-medium">{order.paymentMethod}</span>
              </p>
              <p>
                Order Date:{" "}
                <span className="font-medium">
                  {new Date(order.createdAt).toLocaleDateString()}
                </span>
              </p>
            </div>

            <button
              onClick={() => navigate(`/order/${order._id}`)}
              className="mt-4 bg-pink-600 hover:bg-pink-500 text-white py-2 px-4 rounded-lg font-semibold shadow-md transition"
            >
              View Details
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MyOrders;
