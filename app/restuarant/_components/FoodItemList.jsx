"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

const FoodItemList = () => {
  const [foods, setFoods] = useState([]);
  const router = useRouter();

  useEffect(() => {
    loadFoodItems();
  }, []);

  const loadFoodItems = async () => {
    const resturantData = JSON.parse(localStorage.getItem("resturantUser"));
    const resto_id = resturantData?._id;
    if (!resto_id) return;

    try {
      const response = await fetch(
        `http://localhost:3000/api/restuarant/foods/${resto_id}`
      );
      const result = await response.json();
      if (result) {
        setFoods(result.result);
      } else {
        alert("Error fetching food items");
      }
    } catch (err) {
      console.error(err);
      alert("Something went wrong");
    }
  };

  const deleteFoodItems = async (id) => {
    try {
      const response = await fetch(
        `http://localhost:3000/api/restuarant/foods/${id}`,
        { method: "DELETE" }
      );
      const result = await response.json();
      if (result.success) {
        setFoods((prev) => prev.filter((item) => item._id !== id));
      } else {
        alert("Food item not deleted");
      }
    } catch (error) {
      console.error(error);
      alert("Something went wrong");
    }
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
    {/* Page Header */}
    <h1 className="text-3xl font-bold text-gray-800 mb-6">Food Items</h1>
      {/* Table Container */}
       <div className="overflow-x-auto bg-white rounded-xl shadow-lg">
      <table className="min-w-full border border-gray-200">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-4 py-3">S.No.</th>
              <th className="px-4 py-3">Name</th>
              <th className="px-4 py-3">Price (₹)</th>
              <th className="px-4 py-3">Description</th>
              <th className="px-4 py-3">Image</th>
              <th className="px-4 py-3 text-center">Operations</th>
            </tr>
          </thead>
          <tbody>
            {Array.isArray(foods) && foods.length > 0 ? (
              foods.map((item, index) => (
                <tr key={item._id} className="hover:bg-gray-50">
                  <td className="px-4 py-3">{index + 1}</td>
                  <td className="px-4 py-3 font-medium">{item.name}</td>
                  <td className="px-4 py-3">{item.price}</td>
                  <td className="px-4 py-3">{item.description}</td>
                  <td className="px-4 py-3">
                    <img
                      src={item.path}
                      alt={item.name}
                      className="w-12 h-12 rounded object-cover"
                    />
                  </td>
                  <td className="px-4 py-3 text-center space-x-2">
                    <button
                      onClick={() => deleteFoodItems(item._id)}
                      className="px-3 py-1 bg-green-700 text-white rounded hover:bg-red-700 transition"
                    >
                      Delete
                    </button>
                    <button
                      onClick={() =>
                        router.push(`/restuarant/dashboard/${item._id}`)
                      }
                      className="px-3 py-1 bg-white-700 text-black rounded hover:bg-green-100 transition"
                    >
                      Edit
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan="6"
                  className="px-4 py-6 text-center text-gray-500"
                >
                  No food items found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default FoodItemList;
