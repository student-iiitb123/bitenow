"use client";

import React, { useState } from "react";

const Login = () => {
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
        login:true,
        email,
        password,
      }),
    });

    result = await result.json();
    console.log("Login Response:", result);
   
  };

  return (
    <>
      <div className="h-[350px]">
        <div className="text-center my-4">
          <h1 className="text-2xl font-semibold">Login Page</h1>
        </div>

        <form
          onSubmit={handleLogin}
          className="flex flex-col gap-3 items-center w-full"
        >
          <input
            type="email"
            placeholder="Enter email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-72 h-10 px-3 border border-gray-400 rounded-md"
          />

          <input
            type="password"
            placeholder="Enter password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-72 h-10 px-3 border border-gray-400 rounded-md"
          />

          <button
            type="submit"
            className="mt-3 w-32 h-10 bg-blue-600 text-white rounded-md hover:bg-blue-700"
          >
            Login
          </button>
        </form>
      </div>
    </>
  );
};

export default Login;
