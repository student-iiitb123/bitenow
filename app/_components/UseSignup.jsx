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
        // Store token and user (password already excluded by server)
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
    <div className="">
      <form
        onSubmit={userSignUp}
        className=""
      >
        <div className="text-center mb-3">
          <h2 className="text-2xl font-semibold text-[#2F3E34]">
            Create Account
          </h2>
          <p className="text-sm text-[#7A857C]">
            Sign up to get started
          </p>
        </div>

        {error && (
          <p className="text-red-500 text-sm text-center mb-3 bg-red-50 py-2 rounded-lg">
            {error}
          </p>
        )}

        {/* Name */}
        <Input icon={User} placeholder="Full Name" value={name} setValue={setName} disabled={loading} />

        {/* Email */}
        <Input icon={Mail} type="email" placeholder="Email Address" value={email} setValue={setEmail} disabled={loading} />

        {/* Password */}
        <Input icon={Lock} type="password" placeholder="Password" value={password} setValue={setPassword} disabled={loading} />

        {/* Confirm Password */}
        <Input icon={Lock} type="password" placeholder="Confirm Password" value={confirmPassword} setValue={setConfirmPassword} disabled={loading} />

        
        <Input icon={MapPin} placeholder="City" value={city} setValue={setCity} disabled={loading} />

        
        <Input icon={Home} placeholder="Address" value={address} setValue={setAddress} disabled={loading} />

      
        <Input icon={Phone} type="tel" placeholder="Mobile Number" value={mobile} setValue={setMobile} disabled={loading} />

        <button
          type="submit"
          disabled={loading}
          className="w-full mt-2 flex items-center justify-center gap-2 bg-[#6F8F73] hover:bg-[#5f7f64] text-white py-2.5 rounded-xl font-medium transition disabled:opacity-50"
        >
          <UserPlus size={18} />
          {loading ? "Creating account..." : "Sign Up"}
        </button>
      </form>
    </div>
  )
}

/* Reusable Input Component */
const Input = ({ icon: Icon, type = "text", placeholder, value, setValue, disabled }) => (
  <div className="flex items-center gap-3 h-12 px-4 rounded-xl bg-[#F4F1EC] shadow-inner focus-within:ring-2 focus-within:ring-[#6F8F73]/30 transition group">
    <Icon size={18} className="text-[#7A857C] group-focus-within:text-[#6F8F73]" />
    <input
      type={type}
      placeholder={placeholder}
      value={value}
      onChange={(e) => setValue(e.target.value)}
      className="flex-1 bg-transparent outline-none text-[#2F3E34] placeholder-[#7A857C]"
      required
      disabled={disabled}
    />
  </div>
)

export default UserSignUp
