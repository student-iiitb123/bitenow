"use client";

import { useRouter, useParams } from "next/navigation";
import React, { useState, useEffect } from "react";

const EditFoodItems = () => {
  const params = useParams(); // get the dynamic route param
  const { id } = params; 
  const router = useRouter();

  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [path, setPath] = useState("");
  const [description, setDescription] = useState("");
  const [error, setError] = useState(false);


useEffect(() => {
  const fetchFoodItem = async () => {
    try {
      const res = await fetch(`/api/foods/edit/${id}`);
      const data = await res.json();
      console.log("Fetched food item:", data);

      // Adjust according to actual response structure
      const item = data.result || data;
      setName(item.name || "");
      setPrice(item.price || "");
      setPath(item.path || "");
      setDescription(item.description || "");
    } catch (err) {
      console.error("Failed to fetch food item", err);
    }
  };
  fetchFoodItem();
}, [id]);


  // const handleEditFoodItem = async () => {
  //   if (!name || !price || !path || !description) {
  //     setError(true);
  //     return;
  //   }
  //   setError(false);

  //   try {
  //     const res = await fetch(`/api/foods/${id}`, {
  //       method: "PUT",
  //       headers: { "Content-Type": "application/json" },
  //       body: JSON.stringify({ name, price, path, description }),
  //     });

  //     if (res.ok) {
  //       router.push("/resturant"); 
  //     } else {
  //       console.error("Failed to update food item");
  //     }
  //   } catch (err) {
  //     console.error(err);
  //   }
  // };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="w-full max-w-md bg-white rounded-xl shadow-lg p-8">
        <h1 className="text-2xl font-semibold text-center mb-6">
          Update Food Item
        </h1>

        <div className="space-y-4">
          <input
            type="text"
            placeholder="Enter food name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full h-11 px-4 border rounded-md"
          />
          {error && !name && <span className="text-red-500">Name is required</span>}

          <input
            type="number"
            placeholder="Enter food price"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            className="w-full h-11 px-4 border rounded-md"
          />
          {error && !price && <span className="text-red-500">Price is required</span>}

          <input
            type="text"
            placeholder="Enter image path"
            value={path}
            onChange={(e) => setPath(e.target.value)}
            className="w-full h-11 px-4 border rounded-md"
          />
          {error && !path && <span className="text-red-500">Path is required</span>}

          <textarea
            placeholder="Enter description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full h-24 px-4 py-2 border rounded-md"
          />
          {error && !description && <span className="text-red-500">Description is required</span>}

          <button
            // onClick={handleEditFoodItem}
            className="w-full h-11 bg-orange-600 text-white rounded-md hover:bg-orange-700"
          >
            Update Food Item
          </button>

          <button
            onClick={() => router.push("/restuarant/dashboard")}
            className="w-full h-11 bg-gray-400 text-white rounded-md hover:bg-gray-500"
          >
            Back to Food Item List
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditFoodItems;
