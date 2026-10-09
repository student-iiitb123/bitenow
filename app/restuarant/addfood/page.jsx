"use client";

import React from "react";
import AddFoodItems from "../_components/AddFoodItem";
import Sidebar from "../_components/SideBar";

const page = () => {
  return (
    <div className="flex min-h-screen bg-[#F7F5EF] font-sans">
      <Sidebar />

      <main className="ml-64 flex-1 p-8 min-h-screen flex flex-col justify-between">
        <div>
          <AddFoodItems />
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
