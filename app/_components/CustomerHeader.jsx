"use client";

import Link from "next/link";

const CustomerHeader = () => {
  return (
    <header className="sticky top-0 z-50 bg-[#F4F1EC]/80 backdrop-blur-xl border-b border-[#6F8F73]/20">
      <div className="max-w-7xl mx-auto flex items-center justify-between px-6 py-4">
        
        {/* LOGO */}
        <Link href="/" className="flex items-center gap-2 group">
          <h1 className="text-3xl font-extrabold tracking-wide">
            <span className="text-[#4F6B57]">Bite</span>
            <span className="text-[#2F3E34]">Now</span>
          </h1>
        </Link>

        {/* NAV LINKS */}
        <ul className="hidden md:flex items-center gap-8 text-base font-medium text-[#2F3E34]">
          <li>
            <Link
              href="/"
              className="hover:text-[#6F8F73] transition-colors"
            >
              Home
            </Link>
          </li>

          <li>
            <Link
              href="/cart"
              className="relative hover:text-[#6F8F73] transition-colors"
            >
              Cart
              <span className="absolute -top-2 -right-4 bg-[#6F8F73] text-white text-xs px-2 py-0.5 rounded-full shadow">
                0
              </span>
            </Link>
          </li>

          <li>
            <Link
              href="/restuarant"
              className="hover:text-[#6F8F73] transition-colors"
            >
              Add Restaurant
            </Link>
          </li>
        </ul>

        {/* AUTH BUTTONS */}
        <div className="flex gap-3">
          <Link
            href="/login"
            className="px-5 py-2 border border-[#6F8F73] text-[#4F6B57] rounded-full hover:bg-[#6F8F73] hover:text-white transition-all"
          >
            Login
          </Link>

          <Link
            href="/signup"
            className="px-5 py-2 bg-[#6F8F73] text-white rounded-full hover:bg-[#4F6B57] transition-all shadow-md"
          >
            Sign Up
          </Link>
        </div>
      </div>
    </header>
  );
};

export default CustomerHeader;
