import React, { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useDispatch, useSelector } from "react-redux"
import axios from "axios"
import { toast } from "sonner"
import { setUser } from "@/redux/userSlice"
import userlogo from "../assets/user.jpg"

const Profile = () => {
  const { user } = useSelector((store) => store.user)
  const dispatch = useDispatch()

  const [loading, setLoading] = useState(false)

  const [updateUser, setUpdateUser] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phoneNo: "",
    address: "",
    city: "",
    zipCode: "",
    profilePic: ""
  })

  const [file, setFile] = useState(null)

  useEffect(() => {
    if (user) {
      setUpdateUser({
        firstName: user.firstName || "",
        lastName: user.lastName || "",
        email: user.email || "",
        phoneNo: user.phoneNo || "",
        address: user.address || "",
        city: user.city || "",
        zipCode: user.zipCode || "",
        profilePic: user.profilePic || ""
      })
    }
  }, [user])

  const handleChange = (e) => {
    setUpdateUser({ ...updateUser, [e.target.name]: e.target.value })
  }

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0]
    if (!selectedFile) return

    setFile(selectedFile)
    setUpdateUser({
      ...updateUser,
      profilePic: URL.createObjectURL(selectedFile)
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!user?._id) return toast.error("User not logged in")

    const token = localStorage.getItem("accessToken")
    if (!token) return toast.error("Session expired")

    try {
      setLoading(true)

      const formData = new FormData()
      Object.entries(updateUser).forEach(([key, value]) => {
        if (key !== "profilePic") formData.append(key, value)
      })
      if (file) formData.append("profilePic", file)

      const res = await axios.put(
        `http://localhost:8000/api/v1/user/update/${user._id}`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data"
          }
        }
      )

      if (res.data.success) {
        toast.success("Profile updated successfully")
        dispatch(setUser(res.data.user))
      }
    } catch (error) {
      console.log(error)
      toast.error("Failed to update profile")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="pt-24 min-h-screen bg-gradient-to-b from-purple-50 via-pink-50 to-white flex justify-center">
      <div className="relative w-full max-w-5xl flex gap-16 items-start">

        {/* Profile Picture */}
        <div className="absolute -left-16 top-16 flex flex-col items-center">
          <img
            src={updateUser.profilePic || user?.profilePic || userlogo}
            className="w-40 h-40 rounded-full border-4 border-pink-500 shadow-xl object-cover"
            alt="Profile"
          />
          <label className="mt-4 px-6 py-2 text-sm font-semibold text-white rounded-lg bg-gradient-to-tr from-pink-500 to-purple-600 cursor-pointer hover:scale-105 transition">
            Change Picture
            <input
              type="file"
              hidden
              accept="image/*"
              onChange={handleFileChange}
            />
          </label>
        </div>

        {/* Card */}
        <div className="flex-1 ml-28 p-10 rounded-3xl bg-white/70 backdrop-blur-md shadow-2xl">
          <Tabs defaultValue="Profile">
            <TabsList className="mb-8 rounded-xl bg-gray-100">
              <TabsTrigger value="Profile" className="flex-1">
                Profile
              </TabsTrigger>
              {/* <TabsTrigger value="Orders" className="flex-1">
                Orders
              </TabsTrigger> */}
            </TabsList>

            <TabsContent value="Profile">
              <h1 className="text-3xl font-bold text-center mb-10">
                Update Profile
              </h1>

              <form onSubmit={handleSubmit} className="space-y-6">

                <div className="grid grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label>First Name</Label>
                    <Input
                      name="firstName"
                      value={updateUser.firstName}
                      onChange={handleChange}
                      className="border border-black focus:ring-2 focus:ring-pink-400"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label>Last Name</Label>
                    <Input
                      name="lastName"
                      value={updateUser.lastName}
                      onChange={handleChange}
                      className="border border-black focus:ring-2 focus:ring-pink-400"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label>Email</Label>
                  <Input
                    value={updateUser.email}
                    disabled
                    className="border border-black bg-gray-100"
                  />
                </div>

                <div className="space-y-2">
                  <Label>Phone</Label>
                  <Input
                    name="phoneNo"
                    value={updateUser.phoneNo}
                    onChange={handleChange}
                    className="border border-black focus:ring-2 focus:ring-pink-400"
                  />
                </div>

                <div className="space-y-2">
                  <Label>Address</Label>
                  <Input
                    name="address"
                    value={updateUser.address}
                    onChange={handleChange}
                    className="border border-black focus:ring-2 focus:ring-pink-400"
                  />
                </div>

                <div className="grid grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label>City</Label>
                    <Input
                      name="city"
                      value={updateUser.city}
                      onChange={handleChange}
                      className="border border-black focus:ring-2 focus:ring-pink-400"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label>Zip Code</Label>
                    <Input
                      name="zipCode"
                      value={updateUser.zipCode}
                      onChange={handleChange}
                      className="border border-black focus:ring-2 focus:ring-pink-400"
                    />
                  </div>
                </div>

                <Button
                  type="submit"
                  disabled={loading}
                  className="w-44 mx-auto block rounded-xl bg-gradient-to-tr from-pink-500 to-purple-600 hover:opacity-90 flex items-center justify-center gap-2"
                >
                  {loading ? (
                    <>
                      <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                      Updating...
                    </>
                  ) : (
                    "Update"
                  )}
                </Button>
              </form>
            </TabsContent>

            <TabsContent value="Orders">
              <p className="py-20 text-center text-gray-500">
                No orders found
              </p>
            </TabsContent>

          </Tabs>
        </div>
      </div>
    </div>
  )
}

export default Profile
