"use client";

import React, { useEffect, useState } from "react";
import { LayoutDashboard, PlusSquare, LogOut, UserCircle } from "lucide-react";
import { useRouter } from "next/navigation";

const Sidebar = () => {

  const [data,setData]= useState()

  const router = useRouter();

  const handleLogout = () => {
    localStorage.clear();
    router.push("/login");
  };

 useEffect(() => {
  const response = localStorage.getItem("resturantUser");
  if (response) {
    setData(JSON.parse(response));
  }
}, []);

console.log(data);
  return (
    <aside className="fixed top-0 left-0 w-64 h-screen bg-white border-r shadow-sm flex flex-col">
      {/* Profile Section */}
      <div className="p-6 flex items-center gap-4 border-b">
        <UserCircle size={48} className="text-green-600" />
        <div>
          <h2 className="font-semibold text-gray-800">{data?.name}</h2>
          <p className="text-sm text-gray-500">Admin Panel</p>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
        <button
          onClick={() => router.push("/restuarant/dashboard")}
          className="flex items-center gap-3 w-full px-4 py-3 rounded-lg text-gray-700 hover:bg-green-50 hover:text-green-700 transition"
        >
          <LayoutDashboard size={20} />
          <span className="font-medium">Dashboard</span>
        </button>

        <button
          onClick={() => router.push("/restuarant/addFood")}
          className="flex items-center gap-3 w-full px-4 py-3 rounded-lg text-gray-700 hover:bg-green-50 hover:text-green-700 transition"
        >
          <PlusSquare size={20} />
          <span className="font-medium">Add Food</span>
        </button>
      </nav>

      {/* Logout */}
      <div className="p-4 border-t text-green-700">
        <button
  onClick={() => {
    localStorage.removeItem("resturantUser");
    router.push("/restuarant");
    router.refresh(); 
  }}
>
  Logout
</button>
      </div>
    </aside>
  );
};

export default Sidebar;