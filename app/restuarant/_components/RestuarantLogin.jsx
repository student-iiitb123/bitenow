"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { Mail, Lock, LogIn } from "lucide-react";

const RestuarantLogin = () => {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();

    let result = await fetch("http://localhost:3000/api/restuarant", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        login: true,
        email,
        password,
      }),
    });

    result = await result.json();

    if (result.success) {
      const user = result.result;
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
          Restaurant Login
        </h1>
        <p className="text-sm text-gray-500 mt-1">
          Manage your restaurant
        </p>
      </div>

      {/* Form */}
      <form onSubmit={handleLogin} className="flex flex-col gap-4">
        
        {/* Email */}
        <div className="relative">
          <Mail
            size={18}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-[#6F8F73]"
          />
          <input
            type="email"
            placeholder="Enter email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full h-11 pl-10 pr-3 border border-gray-300 rounded-lg
                       focus:outline-none focus:ring-2 focus:ring-[#6F8F73]"
            required
          />
        </div>

        {/* Password */}
        <div className="relative">
          <Lock
            size={18}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-[#6F8F73]"
          />
          <input
            type="password"
            placeholder="Enter password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full h-11 pl-10 pr-3 border border-gray-300 rounded-lg
                       focus:outline-none focus:ring-2 focus:ring-[#6F8F73]"
            required
          />
        </div>

        {/* Button */}
        <button
          type="submit"
          className="mt-2 h-11 flex items-center justify-center gap-2
                     bg-[#6F8F73] text-white rounded-lg font-medium
                     hover:bg-[#5C7A62] transition-all"
        >
          <LogIn size={18} />
          Login
        </button>
      </form>
    </div>
  );
};

export default RestuarantLogin;
