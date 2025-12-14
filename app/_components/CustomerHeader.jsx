"use client";

import Link from "next/link";

const CustomerHeader = () => {
  return (
    <header className="sticky top-0 z-50 bg-white shadow-md">
      <div className="max-w-7xl mx-auto flex items-center justify-between px-6 py-4">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2">
          <span className="text-3xl">🍔</span>
          <h1 className="text-3xl font-extrabold text-orange-600 tracking-wide">
            Bite<span className="text-black">Now</span>
          </h1>
        </Link>

        {/* Navigation */}
        <ul className="hidden md:flex items-center gap-8 text-lg font-medium">
          <li>
            <Link href="/" className="hover:text-orange-600 transition">
              Home
            </Link>
          </li>

          <li>
            <Link
              href="/cart"
              className="relative hover:text-orange-600 transition">
              Cart
              <span className="absolute -top-2 -right-4 bg-orange-600 text-white text-xs px-2 py-0.5 rounded-full">
                0
              </span>
            </Link>
          </li>

          <li>
            <Link
              href="/restaurant/add"
              className="hover:text-orange-600 transition">
              Add Restaurant
            </Link>
          </li>
        </ul>

        {/* Auth Buttons */}
        <div className="flex gap-4">
          <Link
            href="/login"
            className="px-5 py-2 border border-orange-600 text-orange-600 rounded-full hover:bg-orange-600 hover:text-white transition">
            Login
          </Link>

          <Link
            href="/signup"
            className="px-5 py-2 bg-orange-600 text-white rounded-full hover:bg-orange-700 transition">
            Sign Up
          </Link>
        </div>
      </div>
    </header>
  );
};

export default CustomerHeader;
