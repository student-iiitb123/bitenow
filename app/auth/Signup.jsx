"use client";

import React, { useState } from "react";

const Signup = () => {
  const [name, setName] = useState("");
  const [city, setCity] = useState("");
  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    let result = await fetch("http://localhost:3000/api/restuarant", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name,
        city,
        address,
        phone,
        email,
        password,
      }),
    });

    result = await result.json();
    console.log("Response:", result);
  };

  return (
    <>
      <div className="text-center my-4">
        <h1 className="text-2xl font-semibold">Signup Page</h1>
      </div>

      <form
        onSubmit={handleSubmit}
        className="flex flex-col gap-3 items-center w-full"
      >
        <input
          type="text"
          placeholder="Full Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-72 h-10 px-3 border border-gray-400 rounded-md"
        />

        <input
          type="text"
          placeholder="City"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          className="w-72 h-10 px-3 border border-gray-400 rounded-md"
        />

        <input
          type="text"
          placeholder="Address"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          className="w-72 h-10 px-3 border border-gray-400 rounded-md"
        />

        <input
          type="number"
          placeholder="Contact Number"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          className="w-72 h-10 px-3 border border-gray-400 rounded-md"
        />

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-72 h-10 px-3 border border-gray-400 rounded-md"
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-72 h-10 px-3 border border-gray-400 rounded-md"
        />

        <button
          type="submit"
          className="mt-3 w-32 h-10 bg-blue-600 text-white rounded-md hover:bg-blue-700"
        >
          Signup
        </button>
      </form>
    </>
  );
};

export default Signup;
