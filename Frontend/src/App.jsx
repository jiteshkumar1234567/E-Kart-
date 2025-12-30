import React, { useEffect } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { useDispatch } from "react-redux";
import axios from "axios";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

/* PAGES */
import Home from "./pages/Home";
import Cart from "./pages/Cart";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import Verify from "./pages/Verify";
import VerifyEmail from "./pages/VerifyEmail";
import Profile from "./pages/Profile";
import Products from "./pages/Products";
import ProductDetails from "./pages/ProductDetails";
import Checkout from "./pages/CheckOut";
import ProcessOrder from "./pages/ProcessOrder";
import Payment from "./pages/Payment";
import MyOrders from "./pages/MyOrders";
import OrderDetails from "./pages/OrderDetails";

/* ADMIN PAGES */
import Dashboard from "./pages/Dashboard";
import AdminSales from "./pages/admin/AdminSales";
import AddProduct from "./pages/admin/AddProduct";
import AdminProduct from "./pages/admin/AdminProduct";
import EditProduct from "./pages/admin/EditProduct";
import AdminOrders from "./pages/admin/AdminOrders";
import AdminUsers from "./pages/admin/AdminUsers";
import ShowUserOrders from "./pages/admin/ShowUserOrders";
import UserInfo from "./pages/admin/UserInfo";

/* AUTH */
import ProtectedRoute from "./components/ProtectedRoute";
import AdminProtectedRoute from "./components/AdminProtectedRoute";
import { setUser, clearUser } from "./redux/userSlice";

/* 🔹 Layout */
const Layout = ({ children }) => (
  <>
    <Navbar />
    {children}
    <Footer />
  </>
);

/* 🔹 ROUTER */
const router = createBrowserRouter([
  /* PUBLIC */
  { path: "/", element: <Layout><Home /></Layout> },
  { path: "/signup", element: <Signup /> },
  { path: "/login", element: <Login /> },
  { path: "/verify", element: <Verify /> },
  { path: "/verify/:token", element: <VerifyEmail /> },
  { path: "/products", element: <Layout><Products /></Layout> },
  { path: "/product/:id", element: <>  <Navbar /> <ProductDetails /></> },
  { path: "/cart", element:  <><Navbar /><Cart /></>},  

  /* 🔐 USER PROTECTED */
  {
    path: "/profile/:userId",
    element: (
      <ProtectedRoute>
      <Navbar />
          <Profile />
      </ProtectedRoute>
    ),
  },
  {
    path: "/checkout",
    element: (
      <ProtectedRoute>
         <Navbar />
          <Checkout />
      
      </ProtectedRoute>
    ),
  },
  {
    path: "/processorder",
    element: (
      <ProtectedRoute>
        <Navbar />
          <ProcessOrder />
       
      </ProtectedRoute>
    ),
  },
  {
    path: "/payment",
    element: (
      <ProtectedRoute>
        <Navbar />
          <Payment />
        
      </ProtectedRoute>
    ),
  },
  {
    path: "/orders",
    element: (
      <ProtectedRoute>
       <Navbar />
          <MyOrders />
        
      </ProtectedRoute>
    ),
  },
  {
    path: "/order/:id",
    element: (
      <ProtectedRoute>
        <Navbar />
          <OrderDetails />
      
      </ProtectedRoute>
    ),
  },

  /* 🔐 ADMIN DASHBOARD */
  {
    path: "/dashboard",
    element: (
      <AdminProtectedRoute>
        <Navbar />
        <Dashboard /> {/* MUST HAVE <Outlet /> */}
      </AdminProtectedRoute>
    ),
    children: [
      { path: "sales", element: <AdminSales /> },
      { path: "add-product", element: <AddProduct /> },
      { path: "product", element: <AdminProduct /> },
      { path: "edit-product/:id", element: <EditProduct /> },
      { path: "orders", element: <AdminOrders /> },
      { path: "users", element: <AdminUsers /> },
      { path: "users/orders/:userId", element: <ShowUserOrders /> },
      { path: "users/:id", element: <UserInfo /> },
    ],
  },
]);

/* 🔹 APP */
const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchUser = async () => {
      const token = localStorage.getItem("accessToken");
      if (!token) {
        dispatch(clearUser());
        return;
      }

      try {
        const res = await axios.get(
          "http://localhost:8000/api/v1/user/me",
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );

        if (res.data.success) {
          dispatch(setUser(res.data.user));
        } else {
          dispatch(clearUser());
        }
      } catch (err) {
        dispatch(clearUser());
        localStorage.removeItem("accessToken");
      }
    };

    fetchUser();
  }, [dispatch]);

  return <RouterProvider router={router} />;
};

export default App;
