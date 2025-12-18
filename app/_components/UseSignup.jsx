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
import CustomerHeader from "./CustomerHeader"

const UserSignUp = () => {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [city, setCity] = useState('')
  const [address, setAddress] = useState('')
  const [mobile, setMobile] = useState('')

  const router = useRouter()

  const userSignUp = async (e) => {
    e.preventDefault()

    if (password !== confirmPassword) {
      alert("Passwords do not match")
      return
    }

    try {
      let response = await fetch("http://localhost:3000/api/users", {
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
      console.log(data)

      if (data?.result) {
        const user = data.result
        delete user.password
        console.log(user);
        localStorage.setItem("user", JSON.stringify(user))
        router.push("/")
      } else {
        alert("Something went wrong")
      }
    } catch (error) {
      console.error(error)
      alert("Server error")
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

        {/* Name */}
        <Input icon={User} placeholder="Full Name" value={name} setValue={setName} />

        {/* Email */}
        <Input icon={Mail} type="email" placeholder="Email Address" value={email} setValue={setEmail} />

        {/* Password */}
        <Input icon={Lock} type="password" placeholder="Password" value={password} setValue={setPassword} />

        {/* Confirm Password */}
        <Input icon={Lock} type="password" placeholder="Confirm Password" value={confirmPassword} setValue={setConfirmPassword} />

        
        <Input icon={MapPin} placeholder="City" value={city} setValue={setCity} />

        
        <Input icon={Home} placeholder="Address" value={address} setValue={setAddress} />

      
        <Input icon={Phone} type="tel" placeholder="Mobile Number" value={mobile} setValue={setMobile} />

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

/* Reusable Input Component */
const Input = ({ icon: Icon, type = "text", placeholder, value, setValue }) => (
  <div className="flex items-center gap-3 h-12 px-4 rounded-xl bg-[#F4F1EC] shadow-inner focus-within:ring-2 focus-within:ring-[#6F8F73]/30 transition group">
    <Icon size={18} className="text-[#7A857C] group-focus-within:text-[#6F8F73]" />
    <input
      type={type}
      placeholder={placeholder}
      value={value}
      onChange={(e) => setValue(e.target.value)}
      className="flex-1 bg-transparent outline-none text-[#2F3E34] placeholder-[#7A857C]"
      required
    />
  </div>
)

export default UserSignUp
