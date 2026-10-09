"use client";

import { useState } from "react";
import RestuarantLogin from "./_components/RestuarantLogin";
import RestuarantSignup from "./_components/RestuarantSignup";
import Navbar from "../_components/Navbar";
import Footer from "../_components/Footer";
import { Store } from "lucide-react";

export default function Page() {
  const [toggle, setToggle] = useState(true);

  return (
    <div className="min-h-screen bg-[#F7F5EF] flex flex-col font-sans">
      <Navbar />

      <main className="flex-1 flex items-center justify-center p-6 py-12">
        <div className="w-full max-w-md bg-white rounded-3xl border border-[#E2ECE5] shadow-xl p-8 space-y-6">
          {/* BRAND ICON */}
          <div className="flex justify-center">
            <div className="w-12 h-12 rounded-2xl bg-[#244C3A] text-white flex items-center justify-center shadow-xs">
              <Store size={24} className="text-[#F2994A]" />
            </div>
          </div>

          {/* TOGGLE TAB */}
          <div className="flex bg-[#F7F5EF] p-1 rounded-2xl border border-[#E2ECE5]">
            <button
              onClick={() => setToggle(true)}
              className={`flex-1 py-2 text-xs font-bold rounded-xl transition-all ${
                toggle
                  ? "bg-white text-[#1E2923] shadow-xs"
                  : "text-[#57685D] hover:text-[#1E2923]"
              }`}
            >
              Partner Login
            </button>
            <button
              onClick={() => setToggle(false)}
              className={`flex-1 py-2 text-xs font-bold rounded-xl transition-all ${
                !toggle
                  ? "bg-white text-[#1E2923] shadow-xs"
                  : "text-[#57685D] hover:text-[#1E2923]"
              }`}
            >
              Register Restaurant
            </button>
          </div>

          {/* FORM AREA */}
          {toggle ? <RestuarantLogin /> : <RestuarantSignup />}

          {/* TOGGLE LINK */}
          <p className="text-center text-xs font-medium text-[#57685D] pt-2">
            {toggle ? "New restaurant owner?" : "Already registered?"}{" "}
            <button
              type="button"
              onClick={() => setToggle(!toggle)}
              className="text-[#244C3A] font-bold hover:underline"
            >
              {toggle ? "Create an account" : "Login to dashboard"}
            </button>
          </p>
        </div>
      </main>

      <Footer />
    </div>
  );
}
