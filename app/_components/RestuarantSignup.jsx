"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";

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
    headers: {
      "Content-Type": "application/json",
    },
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
  console.log("Response:", data);

  if (data.success) {
    const user = data.result;

    delete user.password;

    localStorage.setItem(
      "resturantUser",
      JSON.stringify(user)
    );

    router.push("/restuarant/dashboard");
  }
};


 return (
  <div className="min-h-screen flex items-center justify-center bg-[#F7F4EE] px-4">
    <div className="w-full max-w-md">
      
      {/* Heading */}
      <div className="text-center mb-6">
        <h1 className="text-2xl font-semibold text-[#2F3E34]">
          Create Restaurant Account
        </h1>
        <p className="text-sm text-gray-500 mt-1">
          Sign up to get started
        </p>
      </div>

      {/* Form */}
      <form
        onSubmit={handleSubmit}
        className="flex flex-col gap-4"
      >
        <input
          type="text"
          placeholder="Full Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full h-12 px-4 rounded-xl bg-[#F4F1EC] outline-none focus:ring-2 focus:ring-[#6F8F73]/40"
          required
        />

        <input
          type="text"
          placeholder="Restaurant Name"
          value={restuarant}
          onChange={(e) => setRestuarant(e.target.value)}
          className="w-full h-12 px-4 rounded-xl bg-[#F4F1EC] outline-none focus:ring-2 focus:ring-[#6F8F73]/40"
          required
        />

        <input
          type="text"
          placeholder="City"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          className="w-full h-12 px-4 rounded-xl bg-[#F4F1EC] outline-none focus:ring-2 focus:ring-[#6F8F73]/40"
          required
        />

        <input
          type="text"
          placeholder="Address"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          className="w-full h-12 px-4 rounded-xl bg-[#F4F1EC] outline-none focus:ring-2 focus:ring-[#6F8F73]/40"
          required
        />

        <input
          type="tel"
          placeholder="Contact Number"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          className="w-full h-12 px-4 rounded-xl bg-[#F4F1EC] outline-none focus:ring-2 focus:ring-[#6F8F73]/40"
          required
        />

        <input
          type="email"
          placeholder="Email Address"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full h-12 px-4 rounded-xl bg-[#F4F1EC] outline-none focus:ring-2 focus:ring-[#6F8F73]/40"
          required
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full h-12 px-4 rounded-xl bg-[#F4F1EC] outline-none focus:ring-2 focus:ring-[#6F8F73]/40"
          required
        />

        <button
          type="submit"
          className="mt-2 h-12 w-full bg-[#6F8F73] text-white rounded-xl font-medium hover:bg-[#5f7f64] transition"
        >
          Sign Up
        </button>
      </form>
    </div>
  </div>
);

};

export default RestuarantSignup;
