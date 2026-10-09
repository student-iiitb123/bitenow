"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { Mail, Lock, LogIn, AlertCircle } from "lucide-react";

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
        const user = result.result;
        if (result.token) {
          localStorage.setItem("restaurantToken", result.token);
        }
        localStorage.setItem("resturantUser", JSON.stringify(user));
        router.push("/restuarant/dashboard");
      } else {
        setError(result.message || "Invalid credentials");
      }
    } catch (err) {
      console.error("Restaurant login error:", err);
      setError("Network error. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full">
      <div className="text-center mb-6">
        <h1 className="text-2xl font-black text-[#1E2923]">
          Partner Login
        </h1>
        <p className="text-xs text-[#57685D] mt-1">
          Access your restaurant dashboard and manage orders
        </p>
      </div>

      {error && (
        <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-xl text-red-600 text-xs font-semibold flex items-center gap-2">
          <AlertCircle size={16} className="shrink-0" />
          <span>{error}</span>
        </div>
      )}

      <form onSubmit={handleLogin} className="space-y-4">
        <div className="space-y-1">
          <label className="text-xs font-bold text-[#57685D] uppercase">Email Address</label>
          <div className="flex items-center gap-3 h-12 px-4 rounded-xl bg-[#F7F5EF] border border-[#E2ECE5] focus-within:border-[#244C3A] transition-colors">
            <Mail size={18} className="text-[#84948A]" />
            <input
              type="email"
              placeholder="restaurant@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="flex-1 bg-transparent outline-none text-sm text-[#1E2923] font-medium placeholder-[#84948A]"
              required
              disabled={loading}
            />
          </div>
        </div>

        <div className="space-y-1">
          <label className="text-xs font-bold text-[#57685D] uppercase">Password</label>
          <div className="flex items-center gap-3 h-12 px-4 rounded-xl bg-[#F7F5EF] border border-[#E2ECE5] focus-within:border-[#244C3A] transition-colors">
            <Lock size={18} className="text-[#84948A]" />
            <input
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="flex-1 bg-transparent outline-none text-sm text-[#1E2923] font-medium placeholder-[#84948A]"
              required
              disabled={loading}
            />
          </div>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full h-12 mt-2 bg-[#244C3A] hover:bg-[#1A382B] text-white font-bold rounded-xl flex items-center justify-center gap-2 transition-all shadow-xs disabled:opacity-50"
        >
          <LogIn size={18} />
          <span>{loading ? "Logging in..." : "Login to Dashboard"}</span>
        </button>
      </form>
    </div>
  );
};

export default RestuarantLogin;
