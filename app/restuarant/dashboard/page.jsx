"use client";

import React, { useState } from "react";
import AddFoodItems from "../_components/AddFoodItem";
import FoodItemList from "../_components/FoodItemList";
import { PlusCircle, LayoutDashboard } from "lucide-react";

const Page = () => {
  const [addItem, setAddItem] = useState(false);

  return (
    <div className="ml-64 min-h-screen p-8 bg-gray-50">
      {/* Page Header */}
      <div className="mb-1 rounded-2xl overflow-hidden relative">
       <img 
  src="https://images.unsplash.com/photo-1550547660-d9450f859349?auto=format&fit=crop&w=1600&q=80"
  alt="Fast Food"
  className="w-full h-48 object-cover"
/>

        <div className="absolute inset-0 bg-green-900/50 flex flex-col justify-center px-8">
          <h1 className="text-3xl font-bold text-white">Restaurant Dashboard</h1>
          <p className="text-sm text-green-100 mt-1">Manage your food items</p>
        </div>
      </div>

      {/* Top Action Buttons */}
      <div className="flex gap-4 mb-8">
      

       
        
       
      </div>

      {/* Content Area */}
      <div className="bg-white rounded-2xl shadow-md p-6">
        {addItem ? <AddFoodItems /> : <FoodItemList />}
      </div>
    </div>
  );
};

export default Page;
