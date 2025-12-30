import React from "react"
import { MailCheck } from "lucide-react"
import { Link } from "react-router-dom"

const Verify = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-pink-100 via-white to-blue-100 px-4">
      <div className="bg-white shadow-2xl rounded-2xl p-8 max-w-md w-full text-center relative overflow-hidden">

        {/* Decorative circle */}
        <div className="absolute -top-20 -right-20 w-40 h-40 bg-pink-200 rounded-full opacity-40"></div>
        <div className="absolute -bottom-20 -left-20 w-40 h-40 bg-blue-200 rounded-full opacity-40"></div>

        {/* Icon */}
        <div className="flex justify-center mb-4">
          <div className="bg-pink-100 p-4 rounded-full">
            <MailCheck className="text-pink-600" size={42} />
          </div>
        </div>

        {/* Heading */}
        <h1 className="text-2xl font-extrabold text-gray-800">
          Check Your Email
        </h1>

        {/* Message */}
        <p className="text-gray-600 mt-3 leading-relaxed">
          We’ve sent a verification link to your email address.
          <br />
          Please check your inbox and click the link to verify your account.
        </p>

        {/* Info */}
        <p className="text-sm text-gray-500 mt-4">
          Didn’t receive the email? Check your spam folder or try again.
        </p>

        {/* Actions */}
        <div className="flex flex-col gap-3 mt-6">
          <Link
            to="/login"
            className="w-full py-2.5 rounded-lg bg-pink-600 text-white font-semibold hover:bg-pink-500 transition"
          >
            Back to Login
          </Link>
        </div>

        {/* Footer */}
        <p className="text-xs text-gray-400 mt-6">
          © 2025 EKart || All rights reserved.
        </p>
      </div>
    </div>
  )
}

export default Verify




