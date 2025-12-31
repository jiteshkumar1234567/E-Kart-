
import React, { useEffect, useState } from "react";
import { NavLink, Outlet, useLocation } from "react-router-dom";
import {
  LayoutDashboard,
  PlusSquare,
  Package,
  Users,
  ShoppingBag,
} from "lucide-react";
import axios from "axios";
import { toast } from "sonner";
import SalesGraph from "@/components/ui/SalesGraph";

const Dashboard = () => {
  const location = useLocation();
  const isDashboardHome = location.pathname === "/dashboard";

  const [stats, setStats] = useState({
    totalProducts: 0,
    totalOrders: 0,
    totalSales: 0,
  });

  const [salesData, setSalesData] = useState([]);
  const [productData, setProductData] = useState([]);
  const [userData, setUserData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const token = localStorage.getItem("accessToken");
        const res = await axios.get(
          `http://localhost:8000/api/v1/admin/stats`,
          { headers: { Authorization: `Bearer ${token}` } }
        );

        if (res.data.success) {
          const s = res.data.stats;
          setStats({
            totalProducts: s.totalProducts,
            totalOrders: s.totalOrders,
            totalSales: s.totalSales,
          });

          setSalesData(
            s.monthlySales?.map((i) => ({
              month: i._id,
              sales: Number(i.sales),
            })) || []
          );

          setProductData(
            s.monthlyProducts?.map((i) => ({
              month: i._id,
              products: Number(i.count),
            })) || []
          );

          setUserData(
            s.monthlyUsers?.map((i) => ({
              month: i._id,
              users: Number(i.count),
            })) || []
          );
        }
      } catch (err) {
        console.error(err);
        toast.error("Failed to fetch stats");
      } finally {
        setLoading(false);
      }
    };

    if (isDashboardHome) fetchStats();
  }, [isDashboardHome]);

  return (
    <div className="flex min-h-screen bg-gray-100 pt-20">
      <aside className="w-64 bg-white border-r shadow-sm fixed top-20 left-0 bottom-0">
        <h2 className="text-xl font-bold text-pink-600 px-6 py-4">
          Admin Panel
        </h2>
        <nav className="flex flex-col gap-1 px-3">
          <SidebarLink to="/dashboard" icon={<LayoutDashboard size={18} />}>
            Dashboard
          </SidebarLink>
          <SidebarLink to="/dashboard/add-product" icon={<PlusSquare size={18} />}>
            Add Product
          </SidebarLink>
          <SidebarLink to="/dashboard/product" icon={<Package size={18} />}>
            Products
          </SidebarLink>
          <SidebarLink to="/dashboard/users" icon={<Users size={18} />}>
            Users
          </SidebarLink>
          <SidebarLink to="/dashboard/orders" icon={<ShoppingBag size={18} />}>
            Orders
          </SidebarLink>
        </nav>
      </aside>

      <main className="flex-1 ml-64 p-6 bg-gray-50">
        {isDashboardHome && (
          <>
            <h1 className="text-2xl font-bold mb-6">Dashboard Overview</h1>

            {loading ? (
              <p>Loading stats...</p>
            ) : (
              <>
                {/* 🔥 PREMIUM CARDS */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mb-10">
                  <StatCard
                    title="Total Sales"
                    value={`₹${stats.totalSales}`}
                    gradient="from-pink-500 to-rose-500"
                  />
                  <StatCard
                    title="Total Orders"
                    value={stats.totalOrders}
                    gradient="from-purple-500 to-indigo-500"
                  />
                  <StatCard
                    title="Total Products"
                    value={stats.totalProducts}
                    gradient="from-emerald-500 to-teal-500"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <SalesGraph data={salesData} title="Monthly Sales" dataKey="sales" />
                  <SalesGraph data={productData} title="Monthly Products Added" dataKey="products" />
                  <SalesGraph data={userData} title="Monthly New Users" dataKey="users" />
                </div>
              </>
            )}
          </>
        )}
        <Outlet />
      </main>
    </div>
  );
};

/* ================= COMPONENTS ================= */

const SidebarLink = ({ to, icon, children }) => (
  <NavLink
    to={to}
    end
    className={({ isActive }) =>
      `flex items-center gap-3 px-4 py-2 rounded-lg text-sm font-medium ${
        isActive
          ? "bg-pink-100 text-pink-600"
          : "text-gray-700 hover:bg-gray-100"
      }`
    }
  >
    {icon}
    {children}
  </NavLink>
);

const StatCard = ({ title, value, gradient }) => (
  <div
    className={`bg-gradient-to-r ${gradient} text-white p-6 rounded-2xl shadow-lg hover:scale-[1.02] transition`}
  >
    <p className="text-sm opacity-90">{title}</p>
    <h3 className="text-3xl font-bold mt-2">{value}</h3>
  </div>
);

export default Dashboard;






