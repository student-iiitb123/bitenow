"use client";

import React from "react";
import FoodItemList from "../_components/FoodItemList";
import Sidebar from "../_components/SideBar";

const page = () => {
  return (
    <div className="flex min-h-screen bg-[#F7F5EF] font-sans">
      <Sidebar />

      <main className="ml-64 flex-1 p-8">
        <div className="bg-white rounded-3xl border border-[#E2ECE5] shadow-xs p-6 sm:p-8">
          <FoodItemList />
        </div>
      </main>
    </div>
  );
};

export default page;
