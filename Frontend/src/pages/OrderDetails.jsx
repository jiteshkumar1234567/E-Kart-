import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "sonner";

const OrderDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const token = localStorage.getItem("accessToken");

  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrder = async () => {
      try {
        const res = await axios.get(
          `http://localhost:8000/api/v1/order/${id}`,
          { headers: { Authorization: `Bearer ${token}` } }
        );

        if (res.data.success) {
          setOrder(res.data.order);
        }
      } catch (err) {
        toast.error("Order not found");
        navigate("/orders");
      } finally {
        setLoading(false);
      }
    };

    fetchOrder();
  }, [id]);

  if (loading) {
    return <div className="pt-32 text-center text-gray-500">Loading order...</div>;
  }

  if (!order) return null;

  return (
    <div className="pt-28 max-w-5xl mx-auto px-4 pb-20">
      <h1 className="text-3xl font-bold mb-6">Order Details</h1>

      {/* STATUS */}
      <div className="flex justify-between items-center bg-white p-6 rounded-xl shadow mb-6">
        <div>
          <p className="text-sm text-gray-500">Order ID</p>
          <p className="font-semibold">{order._id}</p>
        </div>
        <span
          className={`px-4 py-1 rounded-full font-semibold ${
            order.paymentStatus === "paid"
              ? "bg-green-100 text-green-700"
              : "bg-yellow-100 text-yellow-700"
          }`}
        >
          {order.paymentStatus.toUpperCase()}
        </span>
      </div>

      {/* ITEMS */}
      <div className="bg-white p-6 rounded-xl shadow mb-6">
        <h2 className="text-xl font-semibold mb-4">Items</h2>

        {order.items.map((item, i) => (
          <div
            key={i}
            className="flex justify-between items-center border-b py-3 last:border-none"
          >
            <div>
              <p className="font-medium">{item.product?.productName}</p>
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

      {/* ADDRESS */}
      <div className="bg-white p-6 rounded-xl shadow mb-6">
        <h2 className="text-xl font-semibold mb-3">Delivery Address</h2>
        <p className="text-gray-700">{order.address?.fullName}</p>
        <p className="text-gray-600">
          {order.address?.street}, {order.address?.city},{" "}
          {order.address?.state} - {order.address?.pincode}
        </p>
        <p className="text-gray-600">📞 {order.address?.phone}</p>
      </div>

      {/* SUMMARY */}
      <div className="bg-white p-6 rounded-xl shadow flex justify-between items-center">
        <div>
          <p className="text-sm text-gray-500">Payment Method</p>
          <p className="font-semibold">{order.paymentMethod}</p>
        </div>
        <div className="text-right">
          <p className="text-sm text-gray-500">Total Amount</p>
          <p className="text-2xl font-bold text-pink-600">
            ₹{order.totalAmount}
          </p>
        </div>
      </div>
    </div>
  );
};

export default OrderDetails;
