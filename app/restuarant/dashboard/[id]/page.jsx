"use client";

import React, { useState } from "react";

const EditFoodItems = (props) => {

    console.log(props.params.id)
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [path, setPath] = useState("");
  const [description, setDescription] = useState("");
  const [error, setError] = useState(false);

  const handleEditFoodItem = async () => {
  
    if (!name || !price || !path || !description) {
      setError(true);
      return;
    }
    setError(false);

}
    
    

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="w-full max-w-md bg-white rounded-xl shadow-lg p-8">
        <h1 className="text-2xl font-semibold text-center mb-6">
          Update New Food Item
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
            onClick={handleEditFoodItem}
            className="w-full h-11 bg-orange-600 text-white rounded-md hover:bg-orange-700"
          >
            Update Food Item
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditFoodItems;
