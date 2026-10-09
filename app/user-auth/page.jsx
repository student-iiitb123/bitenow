"use client";

import React, { useState } from "react";
import Login from "../_components/UserLogin";
import UserSignUp from "../_components/UseSignup";
import CustomerHeader from "../_components/CustomerHeader";
import Footer from "../_components/Footer";
import { Utensils } from "lucide-react";

const Page = () => {
  const [login, setLogin] = useState(true);

  return (
    <div className="min-h-screen bg-[#F7F5EF] flex flex-col font-sans">
      <CustomerHeader />

      <main className="flex-1 flex items-center justify-center p-6 py-12">
        <div className="w-full max-w-md bg-white rounded-3xl border border-[#E2ECE5] shadow-xl p-8 space-y-6">
          {/* BRAND ICON */}
          <div className="flex justify-center">
            <div className="w-12 h-12 rounded-2xl bg-[#244C3A] text-white flex items-center justify-center shadow-xs">
              <Utensils size={24} className="text-[#F2994A]" />
            </div>
          </div>

          {/* TOGGLE TAB */}
          <div className="flex bg-[#F7F5EF] p-1 rounded-2xl border border-[#E2ECE5]">
            <button
              onClick={() => setLogin(true)}
              className={`flex-1 py-2 text-xs font-bold rounded-xl transition-all ${
                login
                  ? "bg-white text-[#1E2923] shadow-xs"
                  : "text-[#57685D] hover:text-[#1E2923]"
              }`}
            >
              Log In
            </button>
            <button
              onClick={() => setLogin(false)}
              className={`flex-1 py-2 text-xs font-bold rounded-xl transition-all ${
                !login
                  ? "bg-white text-[#1E2923] shadow-xs"
                  : "text-[#57685D] hover:text-[#1E2923]"
              }`}
            >
              Sign Up
            </button>
          </div>

          {/* FORM AREA */}
          {login ? <Login /> : <UserSignUp />}

          {/* TOGGLE LINK */}
          <p className="text-center text-xs font-medium text-[#57685D] pt-2">
            {login ? "Don’t have an account?" : "Already have an account?"}{" "}
            <button
              type="button"
              onClick={() => setLogin(!login)}
              className="text-[#244C3A] font-bold hover:underline"
            >
              {login ? "Sign up" : "Log in"}
            </button>
          </p>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Page;
