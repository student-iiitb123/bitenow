"use client";

import { useState } from "react";
import { Mail, Lock, LogIn } from "lucide-react";
import { useRouter } from "next/navigation";

export default function UserLogin() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const userLogin = async (e) => {
    e.preventDefault(); // ✅ IMPORTANT

    const response = await fetch("/api/users", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        login: true,
        email,
        password,
      }),
    });

    const result = await response.json();

    if (!result.success) {
      alert(result.message);
      return;
    }

    const user = result.user || result.result;
    delete user.password;

    localStorage.setItem("user", JSON.stringify(user));
    router.push("/");
  };

  return (
    <div className="">
      <div className="w-[380px] bg-[#EFE9DD] rounded-2xl shadow-xl p-8">

        <h1 className="text-2xl font-semibold text-center text-[#2F3E34]">
          Welcome Back
        </h1>
        <p className="text-center text-sm text-gray-500 mb-6">
          Login to continue
        </p>

        {/* ONLY onSubmit */}
        <form onSubmit={userLogin} className="space-y-4">

          <div className="relative">
            <Mail className="absolute left-4 top-3.5 text-gray-500" size={18} />
            <input
              type="email"
              placeholder="Email Address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full h-12 pl-12 pr-4 rounded-xl bg-[#F8F6F1]"
              required
            />
          </div>

          <div className="relative">
            <Lock className="absolute left-4 top-3.5 text-gray-500" size={18} />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full h-12 pl-12 pr-4 rounded-xl bg-[#F8F6F1]"
              required
            />
          </div>

          {/*  NO onClick */}
          <button
            type="submit"
            className="w-full h-12 mt-4 bg-[#6F8F73] text-white rounded-xl flex items-center justify-center gap-2"
          >
            <LogIn size={18} />
            Login
          </button>

        </form>
      </div>
    </div>
  );
}
