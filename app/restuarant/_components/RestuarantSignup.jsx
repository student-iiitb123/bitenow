"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import {
  User,
  Store,
  MapPin,
  Phone,
  Mail,
  Lock,
  UserPlus,
} from "lucide-react";

const RestuarantSignup = () => {
  const router = useRouter();

  const [name, setName] = useState("");
  const [restuarant, setRestuarant] = useState("");
  const [city, setCity] = useState("");
  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    const res = await fetch("http://localhost:3000/api/restuarant", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name,
        restuarant,
        city,
        address,
        phone,
        email,
        password,
      }),
    });

    const data = await res.json();

    if (data.success) {
      const user = data.result;
      delete user.password;

      localStorage.setItem("resturantUser", JSON.stringify(user));
      router.push("/restuarant/dashboard");
    }
  };

  return (
    <div className="bg-white rounded-2xl shadow-lg p-6">
      
      {/* Heading */}
      <div className="text-center mb-6">
        <h1 className="text-3xl font-bold text-[#3E5F4C]">
          Create Restaurant Account
        </h1>
        <p className="text-sm text-gray-500 mt-1">
          Join and manage your restaurant
        </p>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        
        {/* Owner Name */}
        <div className="relative">
          <User className="absolute left-3 top-1/2 -translate-y-1/2 text-[#6F8F73]" size={18} />
          <input
            type="text"
            placeholder="Owner Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full h-11 pl-10 pr-3 border border-gray-300 rounded-lg
                       focus:outline-none focus:ring-2 focus:ring-[#6F8F73]"
            required
          />
        </div>

        {/* Restaurant Name */}
        <div className="relative">
          <Store className="absolute left-3 top-1/2 -translate-y-1/2 text-[#6F8F73]" size={18} />
          <input
            type="text"
            placeholder="Restaurant Name"
            value={restuarant}
            onChange={(e) => setRestuarant(e.target.value)}
            className="w-full h-11 pl-10 pr-3 border border-gray-300 rounded-lg
                       focus:outline-none focus:ring-2 focus:ring-[#6F8F73]"
            required
          />
        </div>

        {/* City */}
        <div className="relative">
          <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 text-[#6F8F73]" size={18} />
          <input
            type="text"
            placeholder="City"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            className="w-full h-11 pl-10 pr-3 border border-gray-300 rounded-lg
                       focus:outline-none focus:ring-2 focus:ring-[#6F8F73]"
            required
          />
        </div>

        {/* Address */}
        <div className="relative">
          <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 text-[#6F8F73]" size={18} />
          <input
            type="text"
            placeholder="Address"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            className="w-full h-11 pl-10 pr-3 border border-gray-300 rounded-lg
                       focus:outline-none focus:ring-2 focus:ring-[#6F8F73]"
            required
          />
        </div>

        {/* Phone */}
        <div className="relative">
          <Phone className="absolute left-3 top-1/2 -translate-y-1/2 text-[#6F8F73]" size={18} />
          <input
            type="tel"
            placeholder="Contact Number"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            className="w-full h-11 pl-10 pr-3 border border-gray-300 rounded-lg
                       focus:outline-none focus:ring-2 focus:ring-[#6F8F73]"
            required
          />
        </div>

        {/* Email */}
        <div className="relative">
          <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-[#6F8F73]" size={18} />
          <input
            type="email"
            placeholder="Email Address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full h-11 pl-10 pr-3 border border-gray-300 rounded-lg
                       focus:outline-none focus:ring-2 focus:ring-[#6F8F73]"
            required
          />
        </div>

        {/* Password */}
        <div className="relative">
          <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-[#6F8F73]" size={18} />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full h-11 pl-10 pr-3 border border-gray-300 rounded-lg
                       focus:outline-none focus:ring-2 focus:ring-[#6F8F73]"
            required
          />
        </div>

        {/* Submit */}
        <button
          type="submit"
          className="mt-2 h-11 flex items-center justify-center gap-2
                     bg-[#6F8F73] text-white rounded-lg font-medium
                     hover:bg-[#5C7A62] transition-all"
        >
          <UserPlus size={18} />
          Create Account
        </button>
      </form>
    </div>
  );
};

export default RestuarantSignup;
