"use client";

import React, { useState } from "react";
import AddFoodItems from "../../_components/AddFoodItem";

const Page = () => {
  const [addItem, setAddItem] = useState(false);

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      {/* Top Action Buttons */}
      <div className="flex gap-4 mb-6">
        <button
          onClick={() => setAddItem(true)}
          className={`px-6 py-2 rounded-md font-medium transition
            ${
              addItem
                ? "bg-orange-600 text-white"
                : "bg-white text-gray-700 border hover:bg-orange-50"
            }`}
        >
          Add Food
        </button>

        <button
          onClick={() => setAddItem(false)}
          className={`px-6 py-2 rounded-md font-medium transition
            ${
              !addItem
                ? "bg-orange-600 text-white"
                : "bg-white text-gray-700 border hover:bg-orange-50"
            }`}
        >
          Dashboard
        </button>
      </div>

      {/* Content Area */}
      <div className="bg-white rounded-xl shadow p-6">
        {addItem ? (
          <AddFoodItems />
        ) : (
          <h1 className="text-2xl font-semibold text-gray-800">
            Restaurant Dashboard
          </h1>
        )}
      </div>
    </div>
  );
};

export default Page;
