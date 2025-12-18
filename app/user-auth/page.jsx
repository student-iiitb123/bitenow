"use client";

import React, { useState } from "react";
import Login from "../_components/UserLogin";
import UserSignUp from "../_components/UseSignup";

const Page = () => {
  const [login, setLogin] = useState(true);

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#F7F4EE]">
      <div className="w-full max-w-md bg-[#EFE9DD] rounded-2xl shadow-xl p-6">

        {/* Toggle Content */}
        {login ? <Login /> : <UserSignUp />}

        {/* Toggle Link */}
        <p className="text-center text-sm text-gray-600 mt-6">
          {login ? "Don’t have an account?" : "Already have an account?"}{" "}
          <span
            onClick={() => setLogin(!login)}
            className="text-[#6F8F73] font-semibold cursor-pointer hover:underline"
          >
            {login ? "Sign up" : "Login"}
          </span>
        </p>
      </div>
    </div>
  );
};

export default Page;
