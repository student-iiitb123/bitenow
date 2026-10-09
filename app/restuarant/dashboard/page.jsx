"use client";

import React from "react";
import AddFoodItems from "../_components/AddFoodItem";
import FoodItemList from "../_components/FoodItemList";
import Sidebar from "../_components/SideBar";

const Page = () => {
  return (
    <div className="flex min-h-screen bg-[#F7F5EF] font-sans">
      <Sidebar />

      <main className="ml-64 flex-1 p-8 min-h-screen flex flex-col justify-between">
        <div>
          {/* BANNER HEADER */}
          <div className="mb-8 rounded-3xl overflow-hidden relative shadow-md">
            <img 
              src="https://images.unsplash.com/photo-1550547660-d9450f859349?auto=format&fit=crop&w=1600&q=80"
              alt="Restaurant Dashboard"
              className="w-full h-44 object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-[#142E23]/90 via-[#244C3A]/70 to-transparent flex flex-col justify-center px-8">
              <h1 className="text-3xl font-black text-white">Merchant Dashboard</h1>
              <p className="text-xs text-[#C1D8CD] mt-1 max-w-md">
                Manage your food menu, update pricing, and handle incoming customer orders.
              </p>
            </div>
          </div>

          {/* CONTENT CARD */}
          <div className="bg-white rounded-3xl border border-[#E2ECE5] shadow-xs p-6 sm:p-8">
            <FoodItemList />
          </div>
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

export default Page;
