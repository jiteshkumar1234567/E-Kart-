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

const Signup = () => {
  const [showPassword, setShowPassword] = useState(false)
  const [loading, setLoading] = useState(false)

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  })

  const navigate = useNavigate()

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const submitHandler = async (e) => {
    e.preventDefault()
    setLoading(true)

    try {
      const res = await axios.post(
        `http://localhost:8000/api/v1/user/register`,
        formData,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      )

      if (res.data.success) {
        toast.success(res.data.message)
        navigate("/verify")
      }
    } catch (error) {
      console.log(error)
      toast.error(
        error.response?.data?.message || "Something went wrong"
      )
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <Card className="w-full max-w-sm shadow-lg">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl font-extrabold text-blue-600">
            Create Your Account
          </CardTitle>
          <CardDescription className="text-gray-600 mt-2">
            Enter your details below to create your account
          </CardDescription>
        </CardHeader>

        <CardContent>
          <form onSubmit={submitHandler} className="flex flex-col gap-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="grid gap-2">
                <Label htmlFor="firstName">First Name</Label>
                <Input
                  id="firstName"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleChange}
                  placeholder="First name"
                  required
                />
              </div>

              <div className="grid gap-2">
                <Label htmlFor="lastName">Last Name</Label>
                <Input
                  id="lastName"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleChange}
                  placeholder="Last name"
                  required
                />
              </div>
            </div>

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

            <div className="grid gap-2">
              <Label htmlFor="password">Password</Label>
              <div className="relative">
                <Input
                  id="password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="Create a password"
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

        <Button
  type="submit"
  className="w-full bg-pink-600 hover:bg-pink-400 flex items-center justify-center gap-2"
  disabled={loading}
>
  {loading ? (
    <>
      <Loader2 className="h-4 w-4 animate-spin" />
      Signing Up...
    </>
  ) : (
    "Sign Up"
  )}
</Button>

          </form>
        </CardContent>

        <CardFooter className="flex justify-center">
          <p className="text-sm text-gray-700">
            Already have an account?{" "}
            <Link to="/login" className="text-pink-800 hover:underline">
              Login
            </Link>
          </p>
        </CardFooter>
      </Card>
    </div>
  )
}

export default Signup

