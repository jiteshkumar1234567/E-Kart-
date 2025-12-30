// import React, { useEffect, useState } from "react"
// import { NavLink, Outlet, useLocation } from "react-router-dom"
// import {
//   LayoutDashboard,
//   PlusSquare,
//   Package,
//   Users,
//   ShoppingBag,
// } from "lucide-react"
// import axios from "axios"
// import { toast } from "sonner"
// import {
//   LineChart,
//   Line,
//   XAxis,
//   YAxis,
//   CartesianGrid,
//   Tooltip,
//   ResponsiveContainer,
// } from "recharts"

// const Dashboard = () => {
//   const location = useLocation()
//   const isDashboardHome = location.pathname === "/dashboard"

//   const [stats, setStats] = useState({
//     totalUsers: 0,
//     totalProducts: 0,
//     totalOrders: 0,
//     totalSales: 0,
//   })
//   const [loading, setLoading] = useState(true)
//   const [salesData, setSalesData] = useState([]) // graph data

//   useEffect(() => {
//     const fetchStats = async () => {
//       try {
//         const token = localStorage.getItem("accessToken")
//         const res = await axios.get(
//           "http://localhost:8000/api/v1/admin/stats",
//           { headers: { Authorization: `Bearer ${token}` } }
//         )
//         if (res.data.success) {
//           setStats(res.data.stats)

//           // sales graph dummy data (replace with real backend data if available)
//           const graphData = [
//             { month: "Jan", sales: Math.round(res.data.stats.totalSales * 0.05) },
//             { month: "Feb", sales: Math.round(res.data.stats.totalSales * 0.08) },
//             { month: "Mar", sales: Math.round(res.data.stats.totalSales * 0.12) },
//             { month: "Apr", sales: Math.round(res.data.stats.totalSales * 0.15) },
//             { month: "May", sales: Math.round(res.data.stats.totalSales * 0.10) },
//             { month: "Jun", sales: Math.round(res.data.stats.totalSales * 0.20) },
//             { month: "Jul", sales: Math.round(res.data.stats.totalSales * 0.30) },
//           ]
//           setSalesData(graphData)
//         }
//       } catch (error) {
//         toast.error("Failed to fetch stats")
//       } finally {
//         setLoading(false)
//       }
//     }
//     if (isDashboardHome) fetchStats()
//   }, [isDashboardHome])

//   return (
//     <div className="flex min-h-screen bg-gray-100 pt-20">
//       {/* ===== SIDEBAR ===== */}
//       <aside className="w-64 bg-white border-r shadow-sm fixed top-20 left-0 bottom-0">
//         <h2 className="text-xl font-bold text-pink-600 px-6 py-4">
//           Admin Panel
//         </h2>

//         <nav className="flex flex-col gap-1 px-3">
//           <SidebarLink to="/dashboard" icon={<LayoutDashboard size={18} />}>
//             Dashboard
//           </SidebarLink>
//           <SidebarLink
//             to="/dashboard/add-product"
//             icon={<PlusSquare size={18} />}
//           >
//             Add Product
//           </SidebarLink>
//           <SidebarLink to="/dashboard/product" icon={<Package size={18} />}>
//             Products
//           </SidebarLink>
//           <SidebarLink to="/dashboard/users" icon={<Users size={18} />}>
//             Users
//           </SidebarLink>
//           <SidebarLink
//             to="/dashboard/orders"
//             icon={<ShoppingBag size={18} />}
//           >
//             Orders
//           </SidebarLink>
//         </nav>
//       </aside>

//       {/* ===== MAIN CONTENT ===== */}
//       <main className="flex-1 ml-64 p-6 bg-gray-50">
//         {isDashboardHome && (
//           <>
//             <h1 className="text-2xl font-bold mb-6">Dashboard Overview</h1>

//             {loading ? (
//               <p>Loading stats...</p>
//             ) : (
//               <>
//                 <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
//                   <Card title="Total Sales" value={`₹${stats.totalSales}`} />
//                   <Card title="Total Orders" value={stats.totalOrders} />
//                   <Card title="Total Products" value={stats.totalProducts} />
//                   <Card title="Total Users" value={stats.totalUsers} />
//                 </div>

//                 {/* ===== Sales Graph ===== */}
//                 <div className="bg-white p-5 rounded-xl shadow-sm border">
//                   <h3 className="text-lg font-semibold mb-3">Sales Overview</h3>
//                   <ResponsiveContainer width="100%" height={300}>
//                     <LineChart data={salesData}>
//                       <CartesianGrid strokeDasharray="3 3" />
//                       <XAxis dataKey="month" />
//                       <YAxis />
//                       <Tooltip />
//                       <Line
//                         type="monotone"
//                         dataKey="sales"
//                         stroke="#ec4899"
//                         strokeWidth={2}
//                         dot={{ r: 4 }}
//                       />
//                     </LineChart>
//                   </ResponsiveContainer>
//                 </div>
//               </>
//             )}
//           </>
//         )}

//         {/* PRODUCTS / ORDERS / USERS will render here */}
//         <Outlet />
//       </main>
//     </div>
//   )
// }

// /* ================== COMPONENTS ================== */

// const SidebarLink = ({ to, icon, children }) => (
//   <NavLink
//     to={to}
//     end
//     className={({ isActive }) =>
//       `flex items-center gap-3 px-4 py-2 rounded-lg text-sm font-medium
//       ${isActive ? "bg-pink-100 text-pink-600" : "text-gray-700 hover:bg-gray-100"}`
//     }
//   >
//     {icon}
//     {children}
//   </NavLink>
// )

// const Card = ({ title, value }) => (
//   <div className="bg-white p-5 rounded-xl shadow-sm border">
//     <p className="text-sm text-gray-500">{title}</p>
//     <h3 className="text-2xl font-bold mt-1">{value}</h3>
//   </div>
// )

// export default Dashboard




























// import React, { useEffect, useState } from "react";
// import { NavLink, Outlet, useLocation } from "react-router-dom";
// import { LayoutDashboard, PlusSquare, Package, Users, ShoppingBag } from "lucide-react";
// import axios from "axios";
// import { toast } from "sonner";
// import SalesGraph from "@/components/ui/SalesGraph";

// const Dashboard = () => {
//   const location = useLocation();
//   const isDashboardHome = location.pathname === "/dashboard";

//   const [stats, setStats] = useState({
//     totalUsers: 0,
//     totalProducts: 0,
//     totalOrders: 0,
//     totalSales: 0,
//   });
//   const [loading, setLoading] = useState(true);

//   const [salesData, setSalesData] = useState([]);
//   const [productData, setProductData] = useState([]);
//   const [userData, setUserData] = useState([]);

//   useEffect(() => {
//     const fetchStats = async () => {
//       try {
//         const token = localStorage.getItem("accessToken");
//         const res = await axios.get("http://localhost:8000/api/v1/admin/stats", {
//           headers: { Authorization: `Bearer ${token}` },
//         });

//         if (res.data.success) {
//           setStats(res.data.stats);

//           // ✅ Use real monthly data from backend if available
//           const months = res.data.stats.monthlySales?.map((m) => m.month) || [
//             "Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"
//           ];

//           setSalesData(
//             months.map((m, i) => ({ month: m, sales: res.data.stats.monthlySales?.[i]?.sales || 0 }))
//           );

//           setProductData(
//             months.map((m, i) => ({ month: m, products: res.data.stats.monthlyProducts?.[i]?.count || 0 }))
//           );

//           setUserData(
//             months.map((m, i) => ({ month: m, users: res.data.stats.monthlyUsers?.[i]?.count || 0 }))
//           );
//         }
//       } catch (error) {
//         console.error(error);
//         toast.error("Failed to fetch stats");
//       } finally {
//         setLoading(false);
//       }
//     };

//     if (isDashboardHome) fetchStats();
//   }, [isDashboardHome]);

//   return (
//     <div className="flex min-h-screen bg-gray-100 pt-20">
//       <aside className="w-64 bg-white border-r shadow-sm fixed top-20 left-0 bottom-0">
//         <h2 className="text-xl font-bold text-pink-600 px-6 py-4">Admin Panel</h2>
//         <nav className="flex flex-col gap-1 px-3">
//           <SidebarLink to="/dashboard" icon={<LayoutDashboard size={18} />}>Dashboard</SidebarLink>
//           <SidebarLink to="/dashboard/add-product" icon={<PlusSquare size={18} />}>Add Product</SidebarLink>
//           <SidebarLink to="/dashboard/product" icon={<Package size={18} />}>Products</SidebarLink>
//           <SidebarLink to="/dashboard/users" icon={<Users size={18} />}>Users</SidebarLink>
//           <SidebarLink to="/dashboard/orders" icon={<ShoppingBag size={18} />}>Orders</SidebarLink>
//         </nav>
//       </aside>

//       <main className="flex-1 ml-64 p-6 bg-gray-50">
//         {isDashboardHome && (
//           <>
//             <h1 className="text-2xl font-bold mb-6">Dashboard Overview</h1>
//             {loading ? (
//               <p>Loading stats...</p>
//             ) : (
//               <>
//                 <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
//                   <Card title="Total Sales" value={`₹${stats.totalSales}`} />
//                   <Card title="Total Orders" value={stats.totalOrders} />
//                   <Card title="Total Products" value={stats.totalProducts} />
//                   <Card title="Total Users" value={stats.totalUsers} />
//                 </div>

//                 <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
//                   <SalesGraph data={salesData} title="Monthly Sales" dataKey="sales" color="#ec4899" />
//                   <SalesGraph data={productData} title="Monthly Products Added" dataKey="products" color="#3b82f6" />
//                   <SalesGraph data={userData} title="Monthly New Users" dataKey="users" color="#facc15" />
//                 </div>
//               </>
//             )}
//           </>
//         )}

//         <Outlet />
//       </main>
//     </div>
//   );
// };

// const SidebarLink = ({ to, icon, children }) => (
//   <NavLink
//     to={to}
//     end
//     className={({ isActive }) =>
//       `flex items-center gap-3 px-4 py-2 rounded-lg text-sm font-medium
//       ${isActive ? "bg-pink-100 text-pink-600" : "text-gray-700 hover:bg-gray-100"}`
//     }
//   >
//     {icon}
//     {children}
//   </NavLink>
// );

// const Card = ({ title, value }) => (
//   <div className="bg-white p-5 rounded-xl shadow-sm border">
//     <p className="text-sm text-gray-500">{title}</p>
//     <h3 className="text-2xl font-bold mt-1">{value}</h3>
//   </div>
// );

// export default Dashboard;
































// import React, { useEffect, useState } from "react"
// import { NavLink, Outlet, useLocation } from "react-router-dom"
// import {
//   LayoutDashboard,
//   PlusSquare,
//   Package,
//   Users,
//   ShoppingBag,
// } from "lucide-react"
// import axios from "axios"
// import { toast } from "sonner"
// import SalesGraph from "@/components/ui/SalesGraph"

// const Dashboard = () => {
//   const location = useLocation()
//   const isDashboardHome = location.pathname === "/dashboard"

//   const [stats, setStats] = useState({
//     totalUsers: 0,
//     totalProducts: 0,
//     totalOrders: 0,
//     totalSales: 0,
//   })

//   const [salesData, setSalesData] = useState([])
//   const [productData, setProductData] = useState([])
//   const [userData, setUserData] = useState([])
//   const [loading, setLoading] = useState(true)

//   useEffect(() => {
//     const fetchStats = async () => {
//       try {
//         const token = localStorage.getItem("accessToken")

//         const res = await axios.get(
//           "http://localhost:8000/api/v1/admin/stats",
//           {
//             headers: { Authorization: `Bearer ${token}` },
//           }
//         )

//         if (res.data.success) {
//           const s = res.data.stats
//           setStats(s)

//           // ✅ GRAPH DATA FIX (IMPORTANT)
//           setSalesData(
//             s.monthlySales?.map((item) => ({
//               month: item.month || item._id,
//               sales: item.sales || 0,
//             })) || []
//           )

//           setProductData(
//             s.monthlyProducts?.map((item) => ({
//               month: item.month || item._id,
//               products: item.count || 0,
//             })) || []
//           )

//           setUserData(
//             s.monthlyUsers?.map((item) => ({
//               month: item.month || item._id,
//               users: item.count || 0,
//             })) || []
//           )
//         }
//       } catch (error) {
//         console.error(error)
//         toast.error("Failed to fetch stats")
//       } finally {
//         setLoading(false)
//       }
//     }

//     if (isDashboardHome) fetchStats()
//   }, [isDashboardHome])

//   return (
//     <div className="flex min-h-screen bg-gray-100 pt-20">
//       {/* SIDEBAR */}
//       <aside className="w-64 bg-white border-r shadow-sm fixed top-20 left-0 bottom-0">
//         <h2 className="text-xl font-bold text-pink-600 px-6 py-4">
//           Admin Panel
//         </h2>

//         <nav className="flex flex-col gap-1 px-3">
//           <SidebarLink to="/dashboard" icon={<LayoutDashboard size={18} />}>
//             Dashboard
//           </SidebarLink>
//           <SidebarLink
//             to="/dashboard/add-product"
//             icon={<PlusSquare size={18} />}
//           >
//             Add Product
//           </SidebarLink>
//           <SidebarLink to="/dashboard/product" icon={<Package size={18} />}>
//             Products
//           </SidebarLink>
//           <SidebarLink to="/dashboard/users" icon={<Users size={18} />}>
//             Users
//           </SidebarLink>
//           <SidebarLink to="/dashboard/orders" icon={<ShoppingBag size={18} />}>
//             Orders
//           </SidebarLink>
//         </nav>
//       </aside>

//       {/* MAIN */}
//       <main className="flex-1 ml-64 p-6 bg-gray-50">
//         {isDashboardHome && (
//           <>
//             <h1 className="text-2xl font-bold mb-6">
//               Dashboard Overview
//             </h1>

//             {loading ? (
//               <p>Loading stats...</p>
//             ) : (
//               <>
//                 {/* TOP CARDS */}
//                 <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
//                   <Card
//                     title="Total Sales"
//                     value={`₹${stats.totalSales}`}
//                   />
//                   <Card
//                     title="Total Orders"
//                     value={stats.totalOrders}
//                   />
//                   <Card
//                     title="Total Products"
//                     value={stats.totalProducts}
//                   />
//                   <Card
//                     title="Total Users"
//                     value={stats.totalUsers}
//                   />
//                 </div>

//                 {/* GRAPHS */}
//                 <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
//                   <SalesGraph
//                     data={salesData}
//                     title="Monthly Sales"
//                     dataKey="sales"
//                   />
//                   <SalesGraph
//                     data={productData}
//                     title="Monthly Products Added"
//                     dataKey="products"
//                   />
//                   <SalesGraph
//                     data={userData}
//                     title="Monthly New Users"
//                     dataKey="users"
//                   />
//                 </div>
//               </>
//             )}
//           </>
//         )}

//         <Outlet />
//       </main>
//     </div>
//   )
// }

// /* SIDEBAR LINK */
// const SidebarLink = ({ to, icon, children }) => (
//   <NavLink
//     to={to}
//     end
//     className={({ isActive }) =>
//       `flex items-center gap-3 px-4 py-2 rounded-lg text-sm font-medium
//       ${
//         isActive
//           ? "bg-pink-100 text-pink-600"
//           : "text-gray-700 hover:bg-gray-100"
//       }`
//     }
//   >
//     {icon}
//     {children}
//   </NavLink>
// )

// /* CARD */
// const Card = ({ title, value }) => (
//   <div className="bg-white p-5 rounded-xl shadow-sm border">
//     <p className="text-sm text-gray-500">{title}</p>
//     <h3 className="text-2xl font-bold mt-1">{value}</h3>
//   </div>
// )

// export default Dashboard

































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
          "http://localhost:8000/api/v1/admin/stats",
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































// import React, { useEffect, useState } from "react";
// import { NavLink, Outlet, useLocation } from "react-router-dom";
// import {
//   LayoutDashboard,
//   PlusSquare,
//   Package,
//   Users,
//   ShoppingBag,
// } from "lucide-react";
// import axios from "axios";
// import { toast } from "sonner";
// import SalesGraph from "@/components/ui/SalesGraph";

// const Dashboard = () => {
//   const location = useLocation();
//   const isDashboardHome = location.pathname === "/dashboard";

//   const [stats, setStats] = useState({
//     totalUsers: 0,
//     totalProducts: 0,
//     totalOrders: 0,
//     totalSales: 0,
//   });

//   const [salesData, setSalesData] = useState([]);
//   const [productData, setProductData] = useState([]);
//   const [userData, setUserData] = useState([]);
//   const [loading, setLoading] = useState(true);

//   // useEffect(() => {
//   //   const fetchStats = async () => {
//   //     try {
//   //       const token = localStorage.getItem("accessToken");

//   //       const res = await axios.get(
//   //         "http://localhost:8000/api/v1/admin/stats",
//   //         {
//   //           headers: { Authorization: `Bearer ${token}` },
//   //         }
//   //       );

//   //       if (res.data.success) {
//   //         const s = res.data.stats;
//   //         setStats(s);

//   //         // ✅ Ensure month is string and sort by month if needed
//   //         const formatMonth = (m) => (typeof m === "number" ? `Month ${m}` : m);

//   //         setSalesData(
//   //           s.monthlySales?.map((item) => ({
//   //             month: formatMonth(item.month || item._id),
//   //             sales: item.sales || 0,
//   //           })) || []
//   //         );

//   //         setProductData(
//   //           s.monthlyProducts?.map((item) => ({
//   //             month: formatMonth(item.month || item._id),
//   //             products: item.count || 0,
//   //           })) || []
//   //         );

//   //         setUserData(
//   //           s.monthlyUsers?.map((item) => ({
//   //             month: formatMonth(item.month || item._id),
//   //             users: item.count || 0,
//   //           })) || []
//   //         );
//   //       }
//   //     } catch (error) {
//   //       console.error(error);
//   //       toast.error("Failed to fetch stats");
//   //     } finally {
//   //       setLoading(false);
//   //     }
//   //   };

//   //   if (isDashboardHome) fetchStats();
//   // }, [isDashboardHome]);



// useEffect(() => {
//   const fetchStats = async () => {
//     try {
//       const token = localStorage.getItem("accessToken");
//       const res = await axios.get("http://localhost:8000/api/v1/admin/stats", {
//         headers: { Authorization: `Bearer ${token}` },
//       });

//       if (res.data.success) {
//         const s = res.data.stats;
//         setStats(s);

//         // SAFELY map graph data
//         setSalesData(
//           s.monthlySales?.map((item, i) => ({
//             month: item.month || `Month ${i + 1}`, 
//             sales: Number(item.sales ?? item.total ?? 0), // Number ensure y-value
//           })) || []
//         );

//         setProductData(
//           s.monthlyProducts?.map((item, i) => ({
//             month: item.month || `Month ${i + 1}`,
//             products: Number(item.count ?? 0),
//           })) || []
//         );

//         setUserData(
//           s.monthlyUsers?.map((item, i) => ({
//             month: item.month || `Month ${i + 1}`,
//             users: Number(item.count ?? 0),
//           })) || []
//         );
//       }
//     } catch (error) {
//       console.error(error);
//       toast.error("Failed to fetch stats");
//     } finally {
//       setLoading(false);
//     }
//   };

//   if (isDashboardHome) fetchStats();
// }, [isDashboardHome]);




//   return (
//     <div className="flex min-h-screen bg-gray-100 pt-20">
//       {/* SIDEBAR */}
//       <aside className="w-64 bg-white border-r shadow-sm fixed top-20 left-0 bottom-0">
//         <h2 className="text-xl font-bold text-pink-600 px-6 py-4">
//           Admin Panel
//         </h2>

//         <nav className="flex flex-col gap-1 px-3">
//           <SidebarLink to="/dashboard" icon={<LayoutDashboard size={18} />}>
//             Dashboard
//           </SidebarLink>
//           <SidebarLink
//             to="/dashboard/add-product"
//             icon={<PlusSquare size={18} />}
//           >
//             Add Product
//           </SidebarLink>
//           <SidebarLink to="/dashboard/product" icon={<Package size={18} />}>
//             Products
//           </SidebarLink>
//           <SidebarLink to="/dashboard/users" icon={<Users size={18} />}>
//             Users
//           </SidebarLink>
//           <SidebarLink
//             to="/dashboard/orders"
//             icon={<ShoppingBag size={18} />}
//           >
//             Orders
//           </SidebarLink>
//         </nav>
//       </aside>

//       {/* MAIN */}
//       <main className="flex-1 ml-64 p-6 bg-gray-50">
//         {isDashboardHome && (
//           <>
//             <h1 className="text-2xl font-bold mb-6">Dashboard Overview</h1>

//             {loading ? (
//               <p>Loading stats...</p>
//             ) : (
//               <>
//                 {/* TOP CARDS */}
//                 <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
//                   <Card title="Total Sales" value={`₹${stats.totalSales}`} />
//                   <Card title="Total Orders" value={stats.totalOrders} />
//                   <Card title="Total Products" value={stats.totalProducts} />
//                   <Card title="Total Users" value={stats.totalUsers} />
//                 </div>

//                 {/* GRAPHS */}
//                 <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
//                   <SalesGraph
//                     data={salesData}
//                     title="Monthly Sales"
//                     dataKey="sales"
//                   />
//                   <SalesGraph
//                     data={productData}
//                     title="Monthly Products Added"
//                     dataKey="products"
//                   />
//                   <SalesGraph
//                     data={userData}
//                     title="Monthly New Users"
//                     dataKey="users"
//                   />
//                 </div>
//               </>
//             )}
//           </>
//         )}

//         <Outlet />
//       </main>
//     </div>
//   );
// };

// /* SIDEBAR LINK */
// const SidebarLink = ({ to, icon, children }) => (
//   <NavLink
//     to={to}
//     end
//     className={({ isActive }) =>
//       `flex items-center gap-3 px-4 py-2 rounded-lg text-sm font-medium ${
//         isActive
//           ? "bg-pink-100 text-pink-600"
//           : "text-gray-700 hover:bg-gray-100"
//       }`
//     }
//   >
//     {icon}
//     {children}
//   </NavLink>
// );

// /* CARD */
// const Card = ({ title, value }) => (
//   <div className="bg-white p-5 rounded-xl shadow-sm border">
//     <p className="text-sm text-gray-500">{title}</p>
//     <h3 className="text-2xl font-bold mt-1">{value}</h3>
//   </div>
// );

// export default Dashboard;
