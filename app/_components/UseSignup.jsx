'use client'

import { useState } from "react"
import { useRouter } from "next/navigation"
import {
  User,
  Mail,
  Lock,
  MapPin,
  Home,
  Phone,
  UserPlus,
  AlertCircle
} from "lucide-react"

const UserSignUp = () => {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [city, setCity] = useState('')
  const [address, setAddress] = useState('')
  const [mobile, setMobile] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const router = useRouter()

  const userSignUp = async (e) => {
    e.preventDefault()
    setError('')

    if (password !== confirmPassword) {
      setError("Passwords do not match")
      return
    }

    if (password.length < 6) {
      setError("Password must be at least 6 characters")
      return
    }

    setLoading(true)

    try {
      let response = await fetch("/api/users", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          email,
          password,
          city,
          address,
          mobile,
        }),
      })

      const data = await response.json()

      if (data.success) {
        const user = data.result || data.user
        if (data.token) {
          localStorage.setItem("token", data.token)
        }
        localStorage.setItem("user", JSON.stringify(user))
        router.push("/")
      } else {
        setError(data.message || "Registration failed")
      }
    } catch (err) {
      console.error("Signup error:", err)
      setError("Network error. Please try again.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="w-full">
      <div className="text-center mb-6">
        <h2 className="text-2xl font-black text-[#1E2923]">Create Account</h2>
        <p className="text-xs text-[#57685D] mt-1">Sign up to get fresh food delivered to your door</p>
      </div>

      {error && (
        <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-xl text-red-600 text-xs font-semibold flex items-center gap-2">
          <AlertCircle size={16} className="shrink-0" />
          <span>{error}</span>
        </div>
      )}

      <form onSubmit={userSignUp} className="space-y-3">
        <Input icon={User} placeholder="Full Name" value={name} setValue={setName} disabled={loading} />
        <Input icon={Mail} type="email" placeholder="Email Address" value={email} setValue={setEmail} disabled={loading} />
        <Input icon={Lock} type="password" placeholder="Password" value={password} setValue={setPassword} disabled={loading} />
        <Input icon={Lock} type="password" placeholder="Confirm Password" value={confirmPassword} setValue={setConfirmPassword} disabled={loading} />
        <Input icon={MapPin} placeholder="City (e.g. Mumbai)" value={city} setValue={setCity} disabled={loading} />
        <Input icon={Home} placeholder="Full Delivery Address" value={address} setValue={setAddress} disabled={loading} />
        <Input icon={Phone} type="tel" placeholder="Mobile Number" value={mobile} setValue={setMobile} disabled={loading} />

        <button
          type="submit"
          disabled={loading}
          className="w-full h-12 mt-4 bg-[#244C3A] hover:bg-[#1A382B] text-white font-bold rounded-xl flex items-center justify-center gap-2 transition-all shadow-xs disabled:opacity-50"
        >
          <UserPlus size={18} />
          <span>{loading ? "Creating Account..." : "Sign Up"}</span>
        </button>
      </form>
    </div>
  )
}

const Input = ({ icon: Icon, type = "text", placeholder, value, setValue, disabled }) => (
  <div className="flex items-center gap-3 h-11 px-4 rounded-xl bg-[#F7F5EF] border border-[#E2ECE5] focus-within:border-[#244C3A] transition-colors">
    <Icon size={16} className="text-[#84948A]" />
    <input
      type={type}
      placeholder={placeholder}
      value={value}
      onChange={(e) => setValue(e.target.value)}
      className="flex-1 bg-transparent outline-none text-sm font-medium text-[#1E2923] placeholder-[#84948A]"
      required
      disabled={disabled}
    />
  </div>
)

export default UserSignUp
