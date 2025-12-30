import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const AdminOrders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const token = localStorage.getItem("accessToken");
  const navigate = useNavigate();

  // 🔹 FETCH ADMIN ORDERS
  const fetchOrders = async () => {
    try {
      const res = await axios.get(
        "http://localhost:8000/api/v1/admin/orders",
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setOrders(res.data.orders);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  // 🔹 UPDATE STATUS
  const updateStatus = async (orderId, status) => {
    try {
      await axios.put(
        `http://localhost:8000/api/v1/admin/orders/${orderId}/status`,
        { status },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      fetchOrders();
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  // 🔹 STATS
  const totalOrders = orders.length;
  const totalRevenue = orders.reduce((acc, o) => acc + o.totalAmount, 0);
  const totalProducts = orders.reduce(
    (acc, o) => acc + o.items.reduce((a, i) => a + i.quantity, 0),
    0
  );

  if (loading) {
    return <div className="p-10 text-center">Loading orders...</div>;
  }

  return (
    <div className="p-6 space-y-8">

      {/* PAGE TITLE */}
      <h1 className="text-3xl font-bold">Admin Orders</h1>

      {/* 🔥 STATS CARDS */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <StatCard title="Total Orders" value={totalOrders} />
        <StatCard title="Total Revenue" value={`₹${totalRevenue}`} />
        <StatCard title="Products Sold" value={totalProducts} />
      </div>

      {/* 📦 ORDERS LIST */}
      <div className="space-y-5">
        {orders.map((order) => (
          <div
            key={order._id}
            className="bg-white border rounded-2xl p-6 shadow-md"
          >
            <div className="flex justify-between items-center">
              <h2 className="font-semibold text-lg">
                Order #{order._id.slice(-6).toUpperCase()}
              </h2>

              <select
                value={order.paymentStatus}
                onChange={(e) =>
                  updateStatus(order._id, e.target.value)
                }
                className="border rounded px-3 py-1 text-sm"
              >
                <option value="pending">Pending</option>
                <option value="paid">Paid</option>
                <option value="shipped">Shipped</option>
                <option value="delivered">Delivered</option>
              </select>
            </div>

            <div className="mt-2 text-sm text-gray-600 space-y-1">
              <p>
                User:{" "}
                <span className="font-semibold">
                  {order.user?.firstName} {order.user?.lastName}
                </span>
              </p>

              <p>
                Payment Method:{" "}
                <span className="font-medium">
                  {order.paymentMethod}
                </span>
              </p>

              <p>
                Order Date:{" "}
                {new Date(order.createdAt).toLocaleDateString()}
              </p>
            </div>

            {/* ITEMS */}
            <div className="mt-4 space-y-2">
              {order.items.map((item, i) => (
                <div
                  key={i}
                  className="flex justify-between text-sm border-b pb-1"
                >
                  <span>
                    {item.product?.productName} × {item.quantity}
                  </span>
                  <span>₹{item.price * item.quantity}</span>
                </div>
              ))}
            </div>

            <div className="flex justify-between items-center mt-4">
              <p className="text-xl font-bold text-pink-600">
                ₹{order.totalAmount}
              </p>

              <button
                onClick={() =>
                  navigate(`/admin/orders/${order._id}`)
                }
                className="text-sm text-blue-600 font-semibold"
              >
                View Details →
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

// 🔹 SMALL CARD COMPONENT (INLINE)
const StatCard = ({ title, value }) => (
  <div className="bg-white rounded-xl shadow p-5 border">
    <p className="text-gray-500">{title}</p>
    <h2 className="text-2xl font-bold mt-1">{value}</h2>
  </div>
);

export default AdminOrders;
 