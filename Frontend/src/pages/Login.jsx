
import React, { useState } from "react"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Eye, EyeOff, Loader2 } from "lucide-react"
import { Link, useNavigate } from "react-router-dom"
import { toast } from "sonner"
import axios from "axios"
import { useDispatch } from "react-redux"
import { setUser } from "@/redux/userSlice"

const Login = () => {
  const [showPassword, setShowPassword] = useState(false)
  const [loading, setLoading] = useState(false)

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  })

  const navigate = useNavigate()
  const dispatch = useDispatch()

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const submitHandler = async (e) => {
    e.preventDefault()
    if (loading) return

    setLoading(true)

    try {
      const res = await axios.post(
        `http://localhost:8000/api/v1/user/login`,
        formData,
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true, // 🔥 IMPORTANT for cookies
        }
      )

      console.log("LOGIN RESPONSE:", res.data)

      if (res.data.success) {
        toast.success(res.data.message)

        // ✅ TOKEN SAVE (typo fixed)
        if (res.data.accessToken) {
          localStorage.setItem("accessToken", res.data.accessToken)
        }
        if (res.data.refreshToken) {
          localStorage.setItem("refreshToken", res.data.refreshToken)
        }

        // ✅ Redux first, then navigate
        dispatch(setUser(res.data.user))
        navigate("/")
      }
    } catch (error) {
      console.error(error)
      toast.error(error.response?.data?.message || "Login failed")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <Card className="w-full max-w-sm shadow-lg">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl font-extrabold text-pink-600">
            Welcome Back
          </CardTitle>
          <CardDescription className="text-gray-600 mt-2">
            Login to your account
          </CardDescription>
        </CardHeader>

        <CardContent>
          <form onSubmit={submitHandler} className="flex flex-col gap-4">
            {/* EMAIL */}
            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="m@example.com"
                required
              />
            </div>

            {/* PASSWORD */}
            <div className="grid gap-2">
              <Label htmlFor="password">Password</Label>
              <div className="relative">
                <Input
                  id="password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="Enter your password"
                  className="pr-10"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-black"
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            {/* BUTTON */}
            <Button
              type="submit"
              className="w-full bg-pink-600 hover:bg-pink-500 flex items-center justify-center gap-2"
              disabled={loading}
            >
              {loading ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" />
                  Please wait...
                </>
              ) : (
                "Login"
              )}
            </Button>
          </form>
        </CardContent>

        <CardFooter className="flex justify-center">
          <p className="text-sm text-gray-700">
            Don’t have an account?{" "}
            <Link to="/signup" className="text-pink-700 hover:underline">
              Sign up
            </Link>
          </p>
        </CardFooter>
      </Card>
    </div>
  )
}

export default Login
