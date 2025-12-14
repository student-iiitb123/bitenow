"use client";

import React, { useEffect, useState } from "react";
import {Router, useRouter} from "next/navigation"

const FoodItemList = () => {
  const [foods, setFoods] = useState([]);
  const router=useRouter()
  useEffect(() => {
    const fetchFood = async () => {
      try {
        const response = await fetch(
          "http://localhost:3000/api/foods/693d108e347fb1e8a97704c6"
        );
        const result = await response.json();
        console.log(result);
        setFoods(result.result || []);
      } catch (error) {
        console.error(error);
      }
    };

    fetchFood();
  }, []);

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">
        Food Items
      </h1>

      <div className="overflow-x-auto bg-white rounded-xl shadow-lg">
        <table className="min-w-full border border-gray-200">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-4 py-3 text-left text-sm font-semibold text-gray-600">S.No.</th>
              <th className="px-4 py-3 text-left text-sm font-semibold text-gray-600">Name</th>
              <th className="px-4 py-3 text-left text-sm font-semibold text-gray-600">Price (₹)</th>
              <th className="px-4 py-3 text-left text-sm font-semibold text-gray-600">Description</th>
              <th className="px-4 py-3 text-left text-sm font-semibold text-gray-600">Image</th>
              <th className="px-4 py-3 text-center text-sm font-semibold text-gray-600">Operations</th>
            </tr>
          </thead>

          <tbody>
            {foods.map((item, index) => (
              <tr key={item._id} className="hover:bg-gray-50 transition">
                <td className="px-4 py-3 text-sm text-gray-700">{index + 1}</td>
                <td className="px-4 py-3 text-sm font-medium text-gray-800">
                  {item.name}
                </td>
                <td className="px-4 py-3 text-sm text-gray-700">
                  {item.price}
                </td>
                <td className="px-4 py-3 text-sm text-gray-600">
                  {item.description}
                </td>
                <td className="px-4 py-3">
                  <img
                    src={item.path}
                    alt={item.name}
                    className="w-12 h-12 rounded-lg object-cover border"
                  />
                </td>
                <td className="px-4 py-3 text-center space-x-2">
                  <button className="px-3 py-1 text-sm text-white bg-red-500 rounded-lg hover:bg-red-600 transition">
                    Delete
                  </button>
                  <button className="px-3 py-1 text-sm text-white bg-blue-500 rounded-lg hover:bg-blue-600 transition"
                  onClick={()=>router.push('dashboard/'+item._id)}>
                    Edit
                  </button>
                </td>
              </tr>
            ))}
          </tbody>

        </table>
      </div>
    </div>
  );
};

export default FoodItemList;
