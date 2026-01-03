import { BASE_URL } from "../lib/api"; // ya "../lib/api.js"

import axios from "axios"
import React, { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"

const VerifyEmail = () => {
  const { token } = useParams()
  const [status, setStatus] = useState("⏳ Verifying your email...")
  const navigate = useNavigate()

  const verifyUserEmail = async () => {
    try {
      const res = await axios.post(
       `${BASE_URL}/user/verify`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )

      if (res.data.success) {
        setStatus("✅ Email Verified Successfully")

        setTimeout(() => {
          navigate("/login")
        }, 2000)
      }
    } catch (error) {
      console.log(error)
      setStatus("❌ Verification failed. Please try again.")
    }
  }

  useEffect(() => {
    if (token) {
      verifyUserEmail()
    }
  }, [token])

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="bg-white p-8 rounded-2xl shadow-lg text-center w-full max-w-md">
        <h2 className="text-xl font-semibold text-gray-800">
          {status}
        </h2>

        <p className="text-sm text-gray-500 mt-3">
          You will be redirected to login shortly
        </p>
      </div>
    </div>
  )
}

export default VerifyEmail

