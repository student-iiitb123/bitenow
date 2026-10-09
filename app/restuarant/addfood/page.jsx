"use client";

import React from "react";
import AddFoodItems from "../_components/AddFoodItem";
import Sidebar from "../_components/SideBar";

const page = () => {
  return (
    <div className="flex min-h-screen bg-[#F7F5EF] font-sans">
      <Sidebar />

      <main className="ml-64 flex-1 p-8">
        <AddFoodItems />
      </main>
    </div>
  );
};

export default page;
