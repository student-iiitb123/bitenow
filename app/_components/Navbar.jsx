"use client"
import React from "react"
import Link from "next/link"

const Navbar = () => {
  return (
    <nav className="w-full bg-white shadow px-10 py-4">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        
        {/* Logo */}
        <h1 className="text-3xl font-bold text-orange-600">BiteNow</h1>

        {/* Menu */}
        <ul className="flex items-center gap-10 text-lg font-medium text-gray-800">
          <li className="hover:text-orange-500 transition">
            <Link href="/">Home</Link>
          </li>
          <li className="hover:text-orange-500 transition">
            <Link href="/login">Login</Link>
          </li>
          <li className="hover:text-orange-500 transition">
            <Link href="/profile">Profile</Link>
          </li>
        </ul>

      </div>
    </nav>
  )
}

export default Navbar
