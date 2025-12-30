import React from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { ShoppingCart } from "lucide-react";
import { Button } from "./ui/button";
import axios from "axios";
import { toast } from "sonner";
import { useDispatch, useSelector } from "react-redux";
import { setUser } from "@/redux/userSlice";

const Navbar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { user, loading } = useSelector((store) => store.user);
  const { cart } = useSelector((store) => store.product);

  const cartCount = cart?.items?.length || 0;
  const accessToken = localStorage.getItem("accessToken");

  const logoutHandler = async () => {
    try {
      const res = await axios.post(
        "http://localhost:8000/api/v1/user/logout",
        {},
        {
          headers: { Authorization: `Bearer ${accessToken}` },
          withCredentials: true,
        }
      );

      if (res.data.success) {
        toast.success(res.data.message);
        dispatch(setUser(null));
        localStorage.removeItem("accessToken");
        localStorage.removeItem("refreshToken");
        navigate("/");
      }
    } catch {
      toast.error("Logout failed");
    }
  };

  return (
    <header className="fixed top-0 left-0 w-full z-50 bg-gradient-to-r from-pink-50 via-white to-pink-100 backdrop-blur-md border-b border-pink-200">
      <div className="max-w-7xl mx-auto flex items-center justify-between px-6 py-2">

        {/* LOGO */}
        <Link to="/" className="flex items-center">
          <img src="/EKart.png" alt="EKart Logo" className="w-[70px]" />
        </Link>

        {/* NAV */}
        <nav className="flex items-center gap-6 text-sm font-semibold">

          <NavLink to="/" className="hover:text-pink-600">
            Home
          </NavLink>

          <NavLink to="/products" className="hover:text-pink-600">
            Products
          </NavLink>

          {/* MY ORDERS (USER ONLY) */}
          {user && (
            <NavLink to="/orders" className="hover:text-pink-600">
              My Orders
            </NavLink>
          )}

          {/* ADMIN DASHBOARD */}
          {user && user.role === "admin" && (
            <NavLink
              to="/dashboard"
              className="text-blue-600 font-bold hover:text-blue-800"
            >
              Dashboard
            </NavLink>
          )}

          {/* PROFILE */}
          {loading ? (
            <span className="text-gray-400 animate-pulse">Loading...</span>
          ) : (
            user && (
              <NavLink
                to={`/profile/${user._id}`}
                className="text-pink-600 font-bold"
              >
                Hi, {user.firstName}
              </NavLink>
            )
          )}

          {/* CART */}
          <Link to="/cart" className="relative">
            <ShoppingCart className="w-5 h-5 hover:text-pink-600 transition" />
            {cartCount > 0 && (
              <span className="absolute -top-2 -right-3 bg-pink-500 text-white text-xs w-[18px] h-[18px] flex items-center justify-center rounded-full">
                {cartCount}
              </span>
            )}
          </Link>

          {/* AUTH */}
          {loading ? (
            <Button disabled className="bg-gray-300">
              Loading...
            </Button>
          ) : user ? (
            <Button
              onClick={logoutHandler}
              className="bg-pink-600 hover:bg-pink-700 text-white"
            >
              Logout
            </Button>
          ) : (
            <Link to="/login">
              <Button className="bg-gradient-to-tl from-blue-600 to-purple-600 text-white">
                Login
              </Button>
            </Link>
          )}
        </nav>
      </div>
    </header>
  );
};

export default Navbar;
