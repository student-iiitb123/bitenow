"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

const FoodItemList = () => {
  const [foods, setFoods] = useState([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    loadFoodItems();
  }, []);

  const loadFoodItems = async () => {
    try {
      const resturantData = JSON.parse(localStorage.getItem("resturantUser"));
      const resto_id = resturantData?._id;
      if (!resto_id) return;

      setLoading(true);
      const response = await fetch(`/api/restuarant/foods/${resto_id}`);
      const result = await response.json();

      if (result.success) {
        setFoods(result.result || []);
      } else {
        console.error("Failed to load food items");
        setFoods([]);
      }
    } catch (err) {
      console.error(err);
      setFoods([]);
    } finally {
      setLoading(false);
    }
  };

  const deleteFoodItems = async (id) => {
    if (!confirm("Are you sure you want to delete this item?")) return;

    const token = localStorage.getItem("restaurantToken");

    try {
      const response = await fetch(`/api/restuarant/foods/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const result = await response.json();
      if (result.success) {
        setFoods((prev) => prev.filter((item) => item._id !== id));
      } else {
        alert(result.message || "Food item not deleted");
      }
    } catch (error) {
      console.error(error);
      alert("Something went wrong");
    }
  };

  if (loading) {
    return (
      <div className="p-6 text-center text-gray-500">
        Loading food items...
      </div>
    );
  }

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
                      className="px-3 py-1 bg-red-600 text-white rounded hover:bg-red-700 transition"
                    >
                      Delete
                    </button>
                    <button
                      onClick={() =>
                        router.push(`/restuarant/dashboard/${item._id}`)
                      }
                      className="px-3 py-1 bg-gray-200 text-black rounded hover:bg-green-100 transition"
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
                  No food items found. Add some from the sidebar!
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
