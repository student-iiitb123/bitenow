"use client";

import React, { useEffect, useState } from "react";
import CustomerHeader from "../_components/CustomerHeader";

const CartPage = () => {
  const [cart, setCart] = useState([]);

  // Load cart from localStorage
  useEffect(() => {
    const data = JSON.parse(localStorage.getItem("cart")) || [];
    setCart(data);
  }, []);

  // Remove 
  const removeFromCart = (id) => {
    const updatedCart = cart.filter((item) => item._id !== id);
    setCart(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
  };

  // Calculate total price
  const totalPrice = cart.reduce((sum, item) => sum + Number(item.price), 0);

  return (
    <>
      <CustomerHeader cartStorage={cart} setCartStorage={setCart} />

      <main className="min-h-screen bg-gray-100 py-10">
        <div className="max-w-6xl mx-auto px-6">
          <h1 className="text-3xl font-bold text-gray-900 mb-6">Your Cart</h1>

          {cart.length === 0 ? (
            <p className="text-gray-500 text-center mt-10">
              Your cart is empty.
            </p>
          ) : (
            <>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {cart.map((food) => (
                  <div
                    key={food._id}
                    className="bg-white rounded-2xl shadow-md hover:shadow-xl transition p-4 flex flex-col"
                  >
                    <img
                      src={food.path || "/food-placeholder.png"}
                      alt={food.name}
                      className="w-full h-36 object-cover rounded-xl mb-4"
                    />
                    <h3 className="text-lg font-semibold text-gray-900">
                      {food.name}
                    </h3>
                    <p className="text-sm text-gray-500 mt-1">{food.description}</p>
                    <div className="mt-auto flex items-center justify-between mt-4">
                      <span className="font-bold text-gray-900">₹{food.price}</span>
                      <button
                        onClick={() => removeFromCart(food._id)}
                        className="px-4 py-1.5 text-sm rounded-full bg-red-500 text-white hover:bg-red-600 transition"
                      >
                        REMOVE
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              {/* Total Price */}
              <div className="mt-8 p-6 bg-white rounded-2xl shadow-md flex justify-between items-center">
                <span className="text-xl font-semibold text-gray-900">Total:</span>
                <span className="text-xl font-bold text-green-700">₹{totalPrice}</span>
              </div>

              {/* Checkout Button */}
              <div className="mt-4 flex justify-end">
                <button className="px-6 py-3 bg-green-700 text-white rounded-xl font-semibold hover:bg-green-800 transition">
                  Proceed to Checkout
                </button>
              </div>
            </>
          )}
        </div>
      </main>
    </>
  );
};

export default CartPage;
