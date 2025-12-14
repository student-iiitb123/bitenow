"use client";

import React, { useState } from "react";

const AddFoodItems = () => {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [path, setPath] = useState("");
  const [description, setDescription] = useState("");
  const [error, setError] = useState(false);

  const handleAddFoodItem = async () => {
  
    if (!name || !price || !path || !description) {
      setError(true);
      return;
    }
    setError(false);

    
    const restuarantData = JSON.parse(
      localStorage.getItem("resturantUser")
    );

    if (!restuarantData) {
      alert("Restaurant not logged in");
      return;
    }

    const restro_id = restuarantData._id;

    //  API call
    const res = await fetch("http://localhost:3000/api/restuarant/foods", {
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

    
      setName("");
      setPrice("");
      setPath("");
      setDescription("");
    }
  };

  
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="w-full max-w-md bg-white rounded-xl shadow-lg p-8">
        <h1 className="text-2xl font-semibold text-center mb-6">
          Add New Food Item
        </h1>

        <div className="space-y-4">
          <div className="relative">
            <input
              type="text"
              placeholder="Enter food name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full h-11 px-4 border rounded-md"
            />
            {error && !name && (
              <span className="text-red-500 text-sm">
                Please enter a valid name
              </span>
            )}
          </div>

          <div className="relative">
            <input
              type="number"
              placeholder="Enter food price"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              className="w-full h-11 px-4 border rounded-md"
            />
            {error && !price && (
              <span className="text-red-500 text-sm">
                Please enter a valid price
              </span>
            )}
          </div>

          <div className="relative">
            <input
              type="text"
              placeholder="Enter image path"
              value={path}
              onChange={(e) => setPath(e.target.value)}
              className="w-full h-11 px-4 border rounded-md"
            />
            {error && !path && (
              <span className="text-red-500 text-sm">
                Please enter a valid path
              </span>
            )}
          </div>

          <div className="relative">
            <textarea
              placeholder="Enter description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full h-24 px-4 py-2 border rounded-md"
            />
            {error && !description && (
              <span className="text-red-500 text-sm">
                Please enter a valid description
              </span>
            )}
          </div>

          <button
            onClick={handleAddFoodItem}
            className="w-full h-11 bg-orange-600 text-white rounded-md hover:bg-orange-700"
          >
            Add Food Item
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddFoodItems;
