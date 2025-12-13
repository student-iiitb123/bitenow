"use client"


import React, { useState } from "react";

const AddFoodItems = () => {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [path, setPath] = useState("");
  const [description, setDescription] = useState("");

 const handleAddFoodItem = async () => {
  let restro_id;

  const restuarantData = JSON.parse(
    localStorage.getItem("resturantUser")
  );

  if (restuarantData) {
    restro_id = restuarantData._id;
  }

  const res = await fetch("http://localhost:3000/api/foods", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      name,
      price,
      path,
      description,
      restro_id,
    }),
  });

  const result = await res.json();
  console.log("Food Item Response:", result);

  if (result.success) {
    alert("Food item added successfully ");
  }
};


  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="w-full max-w-md bg-white rounded-xl shadow-lg p-8">

        <h1 className="text-2xl font-semibold text-center mb-6">
          Add New Food Item
        </h1>

        <div className="space-y-4">
          <input
            type="text"
            placeholder="Enter food name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full h-11 px-4 border rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
          />

          <input
            type="number"
            placeholder="Enter food price"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            className="w-full h-11 px-4 border rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
          />

          <input
            type="text"
            placeholder="Enter image path"
            value={path}
            onChange={(e) => setPath(e.target.value)}
            className="w-full h-11 px-4 border rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
          />

          <textarea
            placeholder="Enter description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full h-24 px-4 py-2 border rounded-md resize-none focus:outline-none focus:ring-2 focus:ring-orange-500"
          />

          <button
            onClick={handleAddFoodItem}
            className="w-full h-11 bg-orange-600 text-white rounded-md font-medium hover:bg-orange-700 transition"
          >
            Add Food Item
          </button>
        </div>

      </div>
    </div>
  );
};

export default AddFoodItems;
