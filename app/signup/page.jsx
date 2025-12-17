'use client'

import { useState } from "react"
import {
  User,
  Mail,
  Lock,
  MapPin,
  Home,
  Phone,
  UserPlus
} from "lucide-react"

const UserSignUp = () => {

  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [city, setCity] = useState('')
  const [address, setAddress] = useState('')
  const [mobile, setMobile] = useState('')

  const handleSignUp = (e) => {
    e.preventDefault()
    if (password !== confirmPassword) {
      alert("Passwords do not match")
      return
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#F4F1EC] px-4">
      <form
        onSubmit={handleSignUp}
        className="w-full max-w-md bg-[#E8E2D8]/80 backdrop-blur-xl p-8 rounded-2xl shadow-xl space-y-4"
      >
        {/* Heading */}
        <div className="text-center space-y-1 mb-2">
          <h2 className="text-2xl font-semibold text-[#2F3E34]">
            Create Account
          </h2>
          <p className="text-sm text-[#7A857C]">
            Sign up to get started
          </p>
        </div>

        {/* Full Name */}
        <div className="flex items-center gap-3 h-12 px-4 rounded-xl bg-[#F4F1EC] shadow-inner focus-within:ring-2 focus-within:ring-[#6F8F73]/30 transition group">
          <User size={18} className="text-[#7A857C] group-focus-within:text-[#6F8F73]" />
          <input
            type="text"
            placeholder="Full Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="flex-1 bg-transparent outline-none text-[#2F3E34] placeholder-[#7A857C]"
          />
        </div>

        {/* Email */}
        <div className="flex items-center gap-3 h-12 px-4 rounded-xl bg-[#F4F1EC] shadow-inner focus-within:ring-2 focus-within:ring-[#6F8F73]/30 transition group">
          <Mail size={18} className="text-[#7A857C] group-focus-within:text-[#6F8F73]" />
          <input
            type="email"
            placeholder="Email Address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="flex-1 bg-transparent outline-none text-[#2F3E34] placeholder-[#7A857C]"
          />
        </div>

        {/* Password */}
        <div className="flex items-center gap-3 h-12 px-4 rounded-xl bg-[#F4F1EC] shadow-inner focus-within:ring-2 focus-within:ring-[#6F8F73]/30 transition group">
          <Lock size={18} className="text-[#7A857C] group-focus-within:text-[#6F8F73]" />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="flex-1 bg-transparent outline-none text-[#2F3E34] placeholder-[#7A857C]"
          />
        </div>

        {/* Confirm Password */}
        <div className="flex items-center gap-3 h-12 px-4 rounded-xl bg-[#F4F1EC] shadow-inner focus-within:ring-2 focus-within:ring-[#6F8F73]/30 transition group">
          <Lock size={18} className="text-[#7A857C] group-focus-within:text-[#6F8F73]" />
          <input
            type="password"
            placeholder="Confirm Password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className="flex-1 bg-transparent outline-none text-[#2F3E34] placeholder-[#7A857C]"
          />
        </div>

        {/* City */}
        <div className="flex items-center gap-3 h-12 px-4 rounded-xl bg-[#F4F1EC] shadow-inner focus-within:ring-2 focus-within:ring-[#6F8F73]/30 transition group">
          <MapPin size={18} className="text-[#7A857C] group-focus-within:text-[#6F8F73]" />
          <input
            type="text"
            placeholder="City"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            className="flex-1 bg-transparent outline-none text-[#2F3E34] placeholder-[#7A857C]"
          />
        </div>

        {/* Address */}
        <div className="flex items-center gap-3 h-12 px-4 rounded-xl bg-[#F4F1EC] shadow-inner focus-within:ring-2 focus-within:ring-[#6F8F73]/30 transition group">
          <Home size={18} className="text-[#7A857C] group-focus-within:text-[#6F8F73]" />
          <input
            type="text"
            placeholder="Address"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            className="flex-1 bg-transparent outline-none text-[#2F3E34] placeholder-[#7A857C]"
          />
        </div>

        {/* Mobile */}
        <div className="flex items-center gap-3 h-12 px-4 rounded-xl bg-[#F4F1EC] shadow-inner focus-within:ring-2 focus-within:ring-[#6F8F73]/30 transition group">
          <Phone size={18} className="text-[#7A857C] group-focus-within:text-[#6F8F73]" />
          <input
            type="tel"
            placeholder="Mobile Number"
            value={mobile}
            onChange={(e) => setMobile(e.target.value)}
            className="flex-1 bg-transparent outline-none text-[#2F3E34] placeholder-[#7A857C]"
          />
        </div>

        {/* Submit */}
        <button
          type="submit"
          className="w-full mt-2 flex items-center justify-center gap-2 bg-[#6F8F73] hover:bg-[#5f7f64] text-white py-2.5 rounded-xl font-medium transition"
        >
          <UserPlus size={18} />
          Sign Up
        </button>

      </form>
    </div>
  )
}

export default UserSignUp
