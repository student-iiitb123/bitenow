"use client";

import React, { useEffect, useState } from "react";
import CustomerHeader from "../_components/CustomerHeader";
import Footer from "../_components/Footer";
import { EmptyState } from "../_components/ui/EmptyState";
import { useRouter } from "next/navigation";
import { ShoppingBag, Trash2, Plus, Minus, ArrowRight, ShieldCheck } from "lucide-react";

const CartPage = () => {
  const [cart, setCart] = useState([]);
  const router = useRouter();

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem("cart")) || [];
    setCart(data);
  }, []);

  const updateCart = (newCart) => {
    setCart(newCart);
    localStorage.setItem("cart", JSON.stringify(newCart));
    if (newCart.length === 0) localStorage.removeItem("cart");
  };

  const removeFromCart = (id) => {
    const updatedCart = cart.filter((item) => item._id !== id);
    updateCart(updatedCart);
  };

  const increaseQty = (id) => {
    const updatedCart = cart.map((item) =>
      item._id === id ? { ...item, quantity: (item.quantity || 1) + 1 } : item
    );
    updateCart(updatedCart);
  };

  const decreaseQty = (id) => {
    const updatedCart = cart
      .map((item) =>
        item._id === id ? { ...item, quantity: (item.quantity || 1) - 1 } : item
      )
      .filter((item) => (item.quantity || 1) > 0);
    updateCart(updatedCart);
  };

  const subtotal = cart.reduce(
    (sum, item) => sum + Number(item.price) * (item.quantity || 1),
    0
  );
  const deliveryFee = cart.length > 0 ? 40 : 0;
  const totalPrice = subtotal + deliveryFee;
  const totalItems = cart.reduce((sum, item) => sum + (item.quantity || 1), 0);

  return (
    <div className="min-h-screen bg-[#F7F5EF] flex flex-col font-sans">
      <CustomerHeader />

      <main className="max-w-6xl mx-auto px-6 py-12 w-full flex-1">
        <div className="flex items-center gap-3 mb-8">
          <div className="w-10 h-10 rounded-xl bg-[#244C3A] text-white flex items-center justify-center">
            <ShoppingBag size={20} />
          </div>
          <div>
            <h1 className="text-3xl font-black text-[#1E2923]">Your Cart</h1>
            <p className="text-xs text-[#57685D] font-medium">
              Review your items and proceed to checkout
            </p>
          </div>
        </div>

        {cart.length === 0 ? (
          <EmptyState
            icon={ShoppingBag}
            title="Your cart is empty"
            description="Looks like you haven't added any delicious food items to your cart yet."
            actionText="Explore Restaurants"
            actionHref="/"
          />
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            {/* CART ITEMS LIST */}
            <div className="lg:col-span-8 space-y-4">
              <div className="bg-white rounded-3xl border border-[#E2ECE5] shadow-xs p-6 divide-y divide-[#E2ECE5]">
                {cart.map((food) => (
                  <div
                    key={food._id}
                    className="py-4 first:pt-0 last:pb-0 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
                  >
                    <div className="flex items-center gap-4">
                      <img
                        src={food.path || "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=200&q=80"}
                        alt={food.name}
                        className="w-20 h-20 rounded-2xl object-cover border border-[#E2ECE5] bg-[#F7F5EF]"
                      />
                      <div>
                        <h3 className="font-bold text-[#1E2923] text-base">
                          {food.name}
                        </h3>
                        <p className="text-xs text-[#57685D] line-clamp-1 max-w-xs mb-1">
                          {food.description}
                        </p>
                        <span className="text-xs font-bold text-[#244C3A]">
                          ₹{food.price} per item
                        </span>
                      </div>
                    </div>

                    {/* QUANTITY CONTROLS */}
                    <div className="flex items-center justify-between sm:justify-end gap-6 w-full sm:w-auto pt-2 sm:pt-0">
                      <div className="flex items-center gap-3 bg-[#F7F5EF] border border-[#E2ECE5] rounded-full px-3 py-1">
                        <button
                          onClick={() => decreaseQty(food._id)}
                          className="w-7 h-7 rounded-full bg-white text-[#1E2923] flex items-center justify-center hover:bg-[#E6EFEA] transition-colors shadow-xs"
                          title="Decrease Quantity"
                        >
                          <Minus size={14} />
                        </button>
                        <span className="font-bold text-sm text-[#1E2923] w-4 text-center">
                          {food.quantity || 1}
                        </span>
                        <button
                          onClick={() => increaseQty(food._id)}
                          className="w-7 h-7 rounded-full bg-[#244C3A] text-white flex items-center justify-center hover:bg-[#1A382B] transition-colors shadow-xs"
                          title="Increase Quantity"
                        >
                          <Plus size={14} />
                        </button>
                      </div>

                      <div className="text-right">
                        <p className="font-black text-[#1E2923] text-base">
                          ₹{Number(food.price) * (food.quantity || 1)}
                        </p>
                        <button
                          onClick={() => removeFromCart(food._id)}
                          className="text-xs font-semibold text-red-500 hover:text-red-700 flex items-center gap-1 mt-0.5 ml-auto transition-colors"
                        >
                          <Trash2 size={12} /> Remove
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="bg-[#E6EFEA] rounded-2xl p-4 border border-[#C1D8CD] flex items-center gap-3 text-xs text-[#244C3A] font-semibold">
                <ShieldCheck size={18} className="shrink-0" />
                <span>Single-restaurant restriction applied. Server price integrity protected.</span>
              </div>
            </div>

            {/* ORDER SUMMARY */}
            <div className="lg:col-span-4">
              <div className="bg-white rounded-3xl border border-[#E2ECE5] shadow-xs p-6 sticky top-24 space-y-6">
                <h2 className="text-lg font-black text-[#1E2923] pb-3 border-b border-[#E2ECE5]">
                  Order Summary
                </h2>

                <div className="space-y-3 text-sm text-[#57685D]">
                  <div className="flex justify-between">
                    <span>Items ({totalItems})</span>
                    <span className="font-bold text-[#1E2923]">₹{subtotal}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Delivery Fee</span>
                    <span className="font-bold text-[#1E2923]">₹{deliveryFee}</span>
                  </div>
                  <div className="pt-3 border-t border-[#E2ECE5] flex justify-between items-center">
                    <span className="text-base font-bold text-[#1E2923]">Total</span>
                    <span className="text-xl font-black text-[#244C3A]">₹{totalPrice}</span>
                  </div>
                </div>

                <button
                  onClick={() => router.push("/checkout")}
                  className="w-full py-3.5 bg-[#244C3A] hover:bg-[#1A382B] text-white font-bold rounded-2xl transition-all shadow-md flex items-center justify-center gap-2"
                >
                  <span>Proceed to Checkout</span>
                  <ArrowRight size={18} />
                </button>
              </div>
            </div>
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
};

export default CartPage;
