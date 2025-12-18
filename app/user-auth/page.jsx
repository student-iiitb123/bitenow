"use client";

import React, { useState } from "react";
import Login from "../_components/UserLogin";
import UserSignUp from "../_components/UseSignup";
import CustomerHeader from "../_components/CustomerHeader";
import Footer from "../_components/Footer";

const Page = () => {
  const [login, setLogin] = useState(true);

  return (
    <>
      <CustomerHeader />

      <div className="min-h-screen flex items-center justify-center bg-[#F7F4EE]">
        <div className="w-full max-w-md px-4">
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

      <Footer />
    </>
  );
};

export default Page;
