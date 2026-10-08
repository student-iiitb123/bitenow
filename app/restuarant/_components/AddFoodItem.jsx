"use client";

import React, { useState } from "react";

const AddFoodItems = () => {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [path, setPath] = useState("");
  const [description, setDescription] = useState("");
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState("");

  const handleAddFoodItem = async () => {
    if (!name || !price || !path || !description) {
      setError(true);
      return;
    }

    // Validate price
    const numericPrice = Number(price);
    if (isNaN(numericPrice) || numericPrice < 0) {
      alert("Price must be a valid non-negative number");
      return;
    }

    setError(false);
    setSuccess("");
    setLoading(true);

    const token = localStorage.getItem("restaurantToken");
    if (!token) {
      alert("Restaurant not logged in");
      setLoading(false);
      return;
    }

    try {
      const res = await fetch("/api/restuarant/foods", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ name, price: numericPrice, path, description }),
      });

      const result = await res.json();
      if (result.success) {
        setSuccess("Food item added successfully!");
        setName("");
        setPrice("");
        setPath("");
        setDescription("");
      } else {
        alert(result.message || "Failed to add food item");
      }
    } catch (err) {
      console.error(err);
      alert("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6 min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="w-full max-w-md bg-white rounded-xl shadow-lg p-8">
        <h1 className="text-2xl font-semibold text-center mb-6">
          Add New Food Item
        </h1>

        {success && (
          <p className="text-green-600 text-sm text-center mb-4 bg-green-50 py-2 rounded-lg">
            {success}
          </p>
        )}

        <div className="space-y-4">
          <div className="relative">
            <input
              type="text"
              placeholder="Enter food name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full h-11 px-4 border rounded-md"
              disabled={loading}
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
              min="0"
              disabled={loading}
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
              placeholder="Enter image URL"
              value={path}
              onChange={(e) => setPath(e.target.value)}
              className="w-full h-11 px-4 border rounded-md"
              disabled={loading}
            />
            {error && !path && (
              <span className="text-red-500 text-sm">
                Please enter a valid image URL
              </span>
            )}
          </div>

          <div className="relative">
            <textarea
              placeholder="Enter description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full h-24 px-4 py-2 border rounded-md"
              disabled={loading}
            />
            {error && !description && (
              <span className="text-red-500 text-sm">
                Please enter a valid description
              </span>
            )}
          </div>

          <button
            onClick={handleAddFoodItem}
            disabled={loading}
            className="w-full h-11 bg-green-700 text-white rounded-md hover:bg-green-800 transition disabled:opacity-50"
          >
            {loading ? "Adding..." : "Add Food Item"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddFoodItems;
