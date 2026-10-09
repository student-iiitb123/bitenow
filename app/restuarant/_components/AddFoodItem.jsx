"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { PlusCircle, Image, DollarSign, FileText, Utensils, CheckCircle2 } from "lucide-react";

const AddFoodItems = () => {
  const router = useRouter();
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [path, setPath] = useState("");
  const [description, setDescription] = useState("");
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState("");

  const handleAddFoodItem = async (e) => {
    e.preventDefault();
    if (!name || !price || !path || !description) {
      setError(true);
      return;
    }

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
    <div className="max-w-2xl mx-auto bg-white rounded-3xl border border-[#E2ECE5] shadow-xs p-8">
      <div className="flex items-center gap-3 mb-6 pb-4 border-b border-[#E2ECE5]">
        <div className="w-10 h-10 rounded-xl bg-[#244C3A] text-white flex items-center justify-center">
          <PlusCircle size={20} />
        </div>
        <div>
          <h1 className="text-2xl font-black text-[#1E2923]">Add New Food Item</h1>
          <p className="text-xs text-[#57685D]">Fill in the details to publish a new meal to your menu</p>
        </div>
      </div>

      {success && (
        <div className="mb-6 p-4 bg-emerald-50 border border-emerald-200 rounded-2xl text-emerald-800 text-xs font-semibold flex items-center gap-2">
          <CheckCircle2 size={16} className="text-emerald-600 shrink-0" />
          <span>{success}</span>
        </div>
      )}

      <form onSubmit={handleAddFoodItem} className="space-y-4">
        {/* NAME */}
        <div className="space-y-1">
          <label className="text-xs font-bold text-[#57685D] uppercase">Food Item Name *</label>
          <div className="flex items-center gap-3 h-12 px-4 rounded-xl bg-[#F7F5EF] border border-[#E2ECE5] focus-within:border-[#244C3A]">
            <Utensils size={18} className="text-[#84948A]" />
            <input
              type="text"
              placeholder="e.g. Paneer Butter Masala"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="flex-1 bg-transparent outline-none text-sm text-[#1E2923] font-medium placeholder-[#84948A]"
              required
              disabled={loading}
            />
          </div>
          {error && !name && <span className="text-red-500 text-xs">Name is required</span>}
        </div>

        {/* PRICE */}
        <div className="space-y-1">
          <label className="text-xs font-bold text-[#57685D] uppercase">Price (₹) *</label>
          <div className="flex items-center gap-3 h-12 px-4 rounded-xl bg-[#F7F5EF] border border-[#E2ECE5] focus-within:border-[#244C3A]">
            <DollarSign size={18} className="text-[#84948A]" />
            <input
              type="number"
              placeholder="e.g. 250"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              className="flex-1 bg-transparent outline-none text-sm text-[#1E2923] font-medium placeholder-[#84948A]"
              min="0"
              required
              disabled={loading}
            />
          </div>
          {error && !price && <span className="text-red-500 text-xs">Valid price is required</span>}
        </div>

        {/* IMAGE PATH */}
        <div className="space-y-1">
          <label className="text-xs font-bold text-[#57685D] uppercase">Image URL *</label>
          <div className="flex items-center gap-3 h-12 px-4 rounded-xl bg-[#F7F5EF] border border-[#E2ECE5] focus-within:border-[#244C3A]">
            <Image size={18} className="text-[#84948A]" />
            <input
              type="text"
              placeholder="https://images.unsplash.com/photo-..."
              value={path}
              onChange={(e) => setPath(e.target.value)}
              className="flex-1 bg-transparent outline-none text-sm text-[#1E2923] font-medium placeholder-[#84948A]"
              required
              disabled={loading}
            />
          </div>
          {error && !path && <span className="text-red-500 text-xs">Image URL is required</span>}
        </div>

        {/* DESCRIPTION */}
        <div className="space-y-1">
          <label className="text-xs font-bold text-[#57685D] uppercase">Description *</label>
          <div className="flex items-start gap-3 p-4 rounded-xl bg-[#F7F5EF] border border-[#E2ECE5] focus-within:border-[#244C3A]">
            <FileText size={18} className="text-[#84948A] mt-0.5" />
            <textarea
              placeholder="Describe the ingredients, taste, and serving size..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="flex-1 bg-transparent outline-none text-sm text-[#1E2923] font-medium placeholder-[#84948A] h-24 resize-none"
              required
              disabled={loading}
            />
          </div>
          {error && !description && <span className="text-red-500 text-xs">Description is required</span>}
        </div>

        <div className="pt-4 flex items-center justify-end gap-3">
          <button
            type="button"
            onClick={() => router.push("/restuarant/dashboard")}
            className="px-5 py-2.5 rounded-xl border border-[#E2ECE5] text-xs font-bold text-[#57685D] hover:bg-[#F7F5EF] transition-colors"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={loading}
            className="px-6 py-2.5 bg-[#244C3A] hover:bg-[#1A382B] text-white text-xs font-bold rounded-xl transition-all shadow-xs disabled:opacity-50"
          >
            {loading ? "Adding Item..." : "Publish Food Item"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddFoodItems;
