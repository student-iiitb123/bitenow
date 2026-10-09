"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { EmptyState } from "../../_components/ui/EmptyState";
import { Utensils, Trash2, Edit2, Plus, Sparkles } from "lucide-react";

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
    if (!confirm("Are you sure you want to delete this food item?")) return;

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

  return (
    <div className="space-y-6">
      {/* HEADER BAR */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-black text-[#1E2923]">Menu Items ({foods.length})</h2>
          <p className="text-xs text-[#57685D]">Manage your active restaurant food menu</p>
        </div>

        <button
          onClick={() => router.push("/restuarant/addfood")}
          className="px-4 py-2.5 bg-[#244C3A] hover:bg-[#1A382B] text-white text-xs font-bold rounded-xl transition-all shadow-xs flex items-center gap-1.5"
        >
          <Plus size={16} />
          <span>Add New Food</span>
        </button>
      </div>

      {loading ? (
        <div className="text-center py-12 text-[#57685D] animate-pulse">
          Loading food items...
        </div>
      ) : foods.length === 0 ? (
        <EmptyState
          icon={Utensils}
          title="No food items added"
          description="Your restaurant menu is currently empty. Add food items so customers can view and order from your restaurant!"
          actionText="Add First Food Item"
          onAction={() => router.push("/restuarant/addfood")}
        />
      ) : (
        <div className="overflow-hidden bg-white rounded-2xl border border-[#E2ECE5] shadow-xs">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm text-[#1E2923]">
              <thead className="bg-[#F7F5EF] text-xs uppercase font-bold text-[#57685D] border-b border-[#E2ECE5]">
                <tr>
                  <th className="px-6 py-4">S.No</th>
                  <th className="px-6 py-4">Item Details</th>
                  <th className="px-6 py-4">Price</th>
                  <th className="px-6 py-4">Description</th>
                  <th className="px-6 py-4 text-center">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#E2ECE5]">
                {foods.map((item, index) => (
                  <tr key={item._id} className="hover:bg-[#F7F5EF]/60 transition-colors">
                    <td className="px-6 py-4 font-semibold text-[#57685D]">{index + 1}</td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <img
                          src={item.path || "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=100&q=80"}
                          alt={item.name}
                          className="w-12 h-12 rounded-xl object-cover border border-[#E2ECE5] bg-[#F7F5EF]"
                        />
                        <span className="font-bold text-[#1E2923]">{item.name}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className="font-black text-[#244C3A] bg-[#E6EFEA] px-3 py-1 rounded-full text-xs">
                        ₹{item.price}
                      </span>
                    </td>
                    <td className="px-6 py-4 max-w-xs">
                      <p className="text-xs text-[#57685D] line-clamp-2">{item.description}</p>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center justify-center gap-2">
                        <button
                          onClick={() => router.push(`/restuarant/dashboard/${item._id}`)}
                          className="p-2 text-[#244C3A] bg-[#E6EFEA] hover:bg-[#C1D8CD] rounded-xl transition-colors"
                          title="Edit Food Item"
                        >
                          <Edit2 size={16} />
                        </button>
                        <button
                          onClick={() => deleteFoodItems(item._id)}
                          className="p-2 text-red-600 bg-red-50 hover:bg-red-100 rounded-xl transition-colors"
                          title="Delete Food Item"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};

export default FoodItemList;
