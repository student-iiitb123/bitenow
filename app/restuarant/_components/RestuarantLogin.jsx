"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { Mail, Lock, LogIn } from "lucide-react";

const RestuarantLogin = () => {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      // Send JSON — the API now supports both JSON and FormData
      const response = await fetch("/api/restuarant", {
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

      const result = await response.json();

      if (result.success) {
        // Store token and user data (password excluded by server)
        const user = result.result;
        if (result.token) {
          localStorage.setItem("restaurantToken", result.token);
        }
        localStorage.setItem("resturantUser", JSON.stringify(user));
        router.push("/restuarant/dashboard");
      } else {
        setError(result.message || "Login failed");
      }
    } catch (err) {
      console.error("Restaurant login error:", err);
      setError("Network error. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
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

      {error && (
        <p className="text-red-500 text-sm text-center mb-4 bg-red-50 py-2 rounded-lg">
          {error}
        </p>
      )}

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
            disabled={loading}
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
            disabled={loading}
          />
        </div>

        {/* Button */}
        <button
          type="submit"
          disabled={loading}
          className="mt-2 h-11 flex items-center justify-center gap-2
                     bg-[#6F8F73] text-white rounded-lg font-medium
                     hover:bg-[#5C7A62] transition-all disabled:opacity-50"
        >
          <LogIn size={18} />
          {loading ? "Logging in..." : "Login"}
        </button>
      </form>

    </div>
    </>
  );
};

export default RestuarantLogin;
