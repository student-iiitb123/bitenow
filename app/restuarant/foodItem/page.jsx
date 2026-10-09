"use client";

import React from "react";
import FoodItemList from "../_components/FoodItemList";
import Sidebar from "../_components/SideBar";

const page = () => {
  return (
    <div className="flex min-h-screen bg-[#F7F5EF] font-sans">
      <Sidebar />

      <main className="ml-64 flex-1 p-8 min-h-screen flex flex-col justify-between">
        <div className="bg-white rounded-3xl border border-[#E2ECE5] shadow-xs p-6 sm:p-8">
          <FoodItemList />
        </div>

        {/* MERCHANT FOOTER */}
        <footer className="pt-8 text-xs text-[#80A693] flex justify-between items-center border-t border-[#E2ECE5] mt-8">
          <p>© {new Date().getFullYear()} BiteNow Merchant Portal. All rights reserved.</p>
          <p>Partner Support</p>
        </footer>
      </main>
    </div>
  );
};

export default page;
