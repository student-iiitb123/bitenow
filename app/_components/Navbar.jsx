"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Utensils, LogOut, Store } from "lucide-react";

const Navbar = () => {
  const [details, setDetails] = useState(null);
  const router = useRouter();

  useEffect(() => {
    if (typeof window !== "undefined") {
      const data = localStorage.getItem("resturantUser");
      if (data) {
        try {
          setDetails(JSON.parse(data));
        } catch {
          // ignore parse error
        }
      }
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("resturantUser");
    localStorage.removeItem("restaurantToken");
    setDetails(null);
    router.push("/restuarant");
    router.refresh();
  };

  return (
    <nav className="w-full bg-[#142E23] text-white border-b border-[#1A382B] px-6 py-3.5 sticky top-0 z-50 shadow-sm">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        
        {/* BRAND */}
        <Link href="/" className="flex items-center gap-2">
          <div className="w-9 h-9 rounded-xl bg-[#244C3A] flex items-center justify-center text-white">
            <Utensils size={18} className="text-[#F2994A]" />
          </div>
          <span className="text-2xl font-black tracking-tight text-white">
            Bite<span className="text-[#E86A33]">Now</span>
          </span>
          <span className="text-xs font-bold bg-[#244C3A] text-[#F2994A] px-2.5 py-0.5 rounded-full uppercase tracking-wider ml-2">
            Partner
          </span>
        </Link>

        {/* NAVIGATION & AUTH */}
        <div className="flex items-center gap-6 text-sm font-semibold">
          <Link href="/" className="text-[#C1D8CD] hover:text-white transition-colors">
            Customer Store
          </Link>

          {details?.name ? (
            <div className="flex items-center gap-4">
              <Link
                href="/restuarant/dashboard"
                className="flex items-center gap-2 text-white bg-[#244C3A] hover:bg-[#1A382B] px-4 py-1.5 rounded-full transition-colors text-xs font-bold"
              >
                <Store size={14} />
                <span>Dashboard</span>
              </Link>

              <button
                onClick={handleLogout}
                className="text-xs font-bold text-red-400 hover:text-red-300 flex items-center gap-1 transition-colors"
              >
                <LogOut size={14} />
                <span>Logout</span>
              </button>
            </div>
          ) : (
            <span className="text-xs text-[#80A693] font-medium">
              Merchant Authentication
            </span>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;