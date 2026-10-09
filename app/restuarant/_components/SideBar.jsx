"use client";

import React, { useEffect, useState } from "react";
import { LayoutDashboard, PlusSquare, LogOut, Store, Utensils } from "lucide-react";
import { useRouter, usePathname } from "next/navigation";

const Sidebar = () => {
  const [data, setData] = useState(null);
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    const response = localStorage.getItem("resturantUser");
    if (response) {
      try {
        setData(JSON.parse(response));
      } catch {
        // ignore parse error
      }
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("resturantUser");
    localStorage.removeItem("restaurantToken");
    router.push("/restuarant");
    router.refresh();
  };

  return (
    <aside className="fixed top-0 left-0 w-64 h-screen bg-[#142E23] text-white border-r border-[#1A382B] shadow-lg flex flex-col z-40">
      {/* BRAND & PROFILE */}
      <div className="p-6 border-b border-[#1A382B] space-y-3">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-xl bg-[#244C3A] flex items-center justify-center text-white">
            <Utensils size={16} className="text-[#F2994A]" />
          </div>
          <span className="text-xl font-black tracking-tight text-white">
            Bite<span className="text-[#E86A33]">Now</span>
          </span>
        </div>

        <div className="pt-2 flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-[#244C3A] text-[#F2994A] flex items-center justify-center font-bold text-sm border border-[#3B7A5E]">
            <Store size={20} />
          </div>
          <div className="min-w-0">
            <h2 className="font-bold text-sm text-white truncate">{data?.restuarant || data?.name || "Restaurant"}</h2>
            <p className="text-xs text-[#80A693]">Merchant Panel</p>
          </div>
        </div>
      </div>

      {/* NAVIGATION */}
      <nav className="flex-1 p-4 space-y-1.5 overflow-y-auto">
        <button
          onClick={() => router.push("/restuarant/dashboard")}
          className={`flex items-center gap-3 w-full px-4 py-3 rounded-xl text-sm font-semibold transition-all ${
            pathname === "/restuarant/dashboard"
              ? "bg-[#244C3A] text-white shadow-xs"
              : "text-[#C1D8CD] hover:bg-[#1A382B] hover:text-white"
          }`}
        >
          <LayoutDashboard size={18} />
          <span>Dashboard</span>
        </button>

        <button
          onClick={() => router.push("/restuarant/addfood")}
          className={`flex items-center gap-3 w-full px-4 py-3 rounded-xl text-sm font-semibold transition-all ${
            pathname === "/restuarant/addfood"
              ? "bg-[#244C3A] text-white shadow-xs"
              : "text-[#C1D8CD] hover:bg-[#1A382B] hover:text-white"
          }`}
        >
          <PlusSquare size={18} />
          <span>Add Food Item</span>
        </button>
      </nav>

      {/* LOGOUT BUTTON */}
      <div className="p-4 border-t border-[#1A382B]">
        <button
          onClick={handleLogout}
          className="flex items-center gap-3 w-full px-4 py-3 rounded-xl text-xs font-bold text-red-400 hover:bg-red-950/40 hover:text-red-300 transition-all"
        >
          <LogOut size={16} />
          <span>Logout</span>
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;
