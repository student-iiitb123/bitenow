"use client";

import { useRouter, useParams } from "next/navigation";
import React, { useState, useEffect } from "react";
import Sidebar from "../../_components/SideBar";
import { Edit3, Image, DollarSign, FileText, Utensils, ArrowLeft } from "lucide-react";

const EditFoodItems = () => {
  const params = useParams();
  const { id } = params;
  const router = useRouter();

  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [path, setPath] = useState("");
  const [description, setDescription] = useState("");
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(true);

  useEffect(() => {
    const fetchFoodItem = async () => {
      try {
        const res = await fetch(`/api/restuarant/foods/edit/${id}`);
        const data = await res.json();

        const item = data.result || data;
        setName(item.name || "");
        setPrice(item.price?.toString() || "");
        setPath(item.path || "");
        setDescription(item.description || "");
      } catch (err) {
        console.error("Failed to fetch food item", err);
      } finally {
        setFetching(false);
      }
    };
    fetchFoodItem();
  }, [id]);

  const handleEditFoodItem = async (e) => {
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
    setLoading(true);

    const token = localStorage.getItem("restaurantToken");

    try {
      const res = await fetch(`/api/restuarant/foods/edit/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ name, price: numericPrice, path, description }),
      });

      const data = await res.json();

      if (data.success) {
        router.push("/restuarant/dashboard");
      } else {
        alert(data.message || "Failed to update food item");
      }
    } catch (err) {
      console.error(err);
      alert("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen bg-[#F7F5EF] font-sans">
      <Sidebar />

      <main className="ml-64 flex-1 p-8 min-h-screen flex flex-col justify-between">
        <div className="max-w-2xl mx-auto bg-white rounded-3xl border border-[#E2ECE5] shadow-xs p-8 w-full">
          <div className="flex items-center justify-between mb-6 pb-4 border-b border-[#E2ECE5]">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-[#244C3A] text-white flex items-center justify-center">
                <Edit3 size={20} />
              </div>
              <div>
                <h1 className="text-2xl font-black text-[#1E2923]">Update Food Item</h1>
                <p className="text-xs text-[#57685D]">Modify details for {name || "this item"}</p>
              </div>
            </div>

            <button
              onClick={() => router.push("/restuarant/dashboard")}
              className="p-2 text-[#57685D] hover:text-[#1E2923] hover:bg-[#F7F5EF] rounded-xl transition-colors flex items-center gap-1 text-xs font-bold"
            >
              <ArrowLeft size={16} /> Back
            </button>
          </div>

          {fetching ? (
            <div className="py-12 text-center text-[#57685D] animate-pulse font-medium">
              Loading food details...
            </div>
          ) : (
            <form onSubmit={handleEditFoodItem} className="space-y-4">
              {/* NAME */}
              <div className="space-y-1">
                <label className="text-xs font-bold text-[#57685D] uppercase">Food Name *</label>
                <div className="flex items-center gap-3 h-12 px-4 rounded-xl bg-[#F7F5EF] border border-[#E2ECE5] focus-within:border-[#244C3A]">
                  <Utensils size={18} className="text-[#84948A]" />
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="flex-1 bg-transparent outline-none text-sm text-[#1E2923] font-medium"
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
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                    className="flex-1 bg-transparent outline-none text-sm text-[#1E2923] font-medium"
                    min="0"
                    required
                    disabled={loading}
                  />
                </div>
                {error && !price && <span className="text-red-500 text-xs">Price is required</span>}
              </div>

              {/* IMAGE URL */}
              <div className="space-y-1">
                <label className="text-xs font-bold text-[#57685D] uppercase">Image URL *</label>
                <div className="flex items-center gap-3 h-12 px-4 rounded-xl bg-[#F7F5EF] border border-[#E2ECE5] focus-within:border-[#244C3A]">
                  <Image size={18} className="text-[#84948A]" />
                  <input
                    type="text"
                    value={path}
                    onChange={(e) => setPath(e.target.value)}
                    className="flex-1 bg-transparent outline-none text-sm text-[#1E2923] font-medium"
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
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    className="flex-1 bg-transparent outline-none text-sm text-[#1E2923] font-medium h-24 resize-none"
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
                  className="px-6 py-2.5 bg-[#E86A33] hover:bg-[#D4561E] text-white text-xs font-bold rounded-xl transition-all shadow-xs disabled:opacity-50"
                >
                  {loading ? "Saving..." : "Update Food Item"}
                </button>
              </div>
            </form>
          )}
        </div>

        {/* MERCHANT FOOTER */}
        <footer className="pt-8 text-xs text-[#80A693] flex justify-between items-center border-t border-[#E2ECE5] mt-8">
          <p>© {new Date().getFullYear()} BiteNow Merchant Portal. All rights reserved.</p>
          <p>Partner Support</p>
        </footer>
      </main>
    </div>
  );
};

export default EditFoodItems;
