'use client'

import { useState } from "react"
import { Mail, Lock, LogIn } from "lucide-react"

const UserLogin = () => {

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const loginHandle = (e) => {
    e.preventDefault()
    console.log({ email, password })
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#F4F1EC] px-4">
      <form
        onSubmit={loginHandle}
        className="w-full max-w-md bg-[#E8E2D8]/80 backdrop-blur-xl p-8 rounded-2xl shadow-xl space-y-6"
      >
        {/* Heading */}
        <div className="text-center space-y-1">
          <h2 className="text-2xl font-semibold text-[#2F3E34]">
            Welcome!
          </h2>
          <p className="text-sm text-[#7A857C]">
            Login to your account
          </p>
        </div>

        {/* Email */}
       <div className="flex items-center gap-3 h-12 px-4 rounded-xl bg-[#F4F1EC] shadow-inner focus-within:ring-2 focus-within:ring-[#6F8F73]/30 transition">
  <Mail size={18} className="text-[#7A857C]" />

  <input
    type="email"
    placeholder="Email address"
    value={email}
    onChange={(e) => setEmail(e.target.value)}
    className="
      flex-1 bg-transparent outline-none
      text-[#2F3E34]
      placeholder-[#7A857C]
    "
  />
</div>


        {/* Password */}
       <div className="flex items-center gap-3 h-12 px-4 rounded-xl bg-[#F4F1EC] shadow-inner focus-within:ring-2 focus-within:ring-[#6F8F73]/30 transition">
  <Lock size={18} className="text-[#7A857C]" />

  <input
    type="password"
    placeholder="Password"
    value={password}
    onChange={(e) => setPassword(e.target.value)}
    className="
      flex-1 bg-transparent outline-none
      text-[#2F3E34]
      placeholder-[#7A857C]
    "
  />
</div>


        {/* Remember + Forgot */}
        <div className="flex items-center justify-between text-sm">
          <label className="flex items-center gap-2 text-[#2F3E34]">
            <input
              type="checkbox"
              className="accent-[#6F8F73]"
            />
            Remember me
          </label>

          <span className="text-[#6F8F73] cursor-pointer hover:underline">
            Forgot password?
          </span>
        </div>

        {/* Button */}
        <button
          type="submit"
          className="w-full flex items-center justify-center gap-2 bg-[#6F8F73] hover:bg-[#5f7f64] text-white py-2.5 rounded-lg font-medium transition"
        >
          <LogIn size={18} />
          Login
        </button>

      </form>
    </div>
  )
}

export default UserLogin
