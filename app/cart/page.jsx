"use client";

import React, { useEffect, useState } from "react";
import CustomerHeader from "../_components/CustomerHeader";
import Footer from "../_components/Footer";
import { useRouter } from "next/navigation";

const CartPage = () => {
  const [cart, setCart] = useState([]);
  const router = useRouter();

  // Load cart from localStorage
  useEffect(() => {
    const data = JSON.parse(localStorage.getItem("cart")) || [];
    setCart(data);
  }, []);

  // Sync cart to localStorage whenever it changes
  const updateCart = (newCart) => {
    setCart(newCart);
    localStorage.setItem("cart", JSON.stringify(newCart));
    if (newCart.length === 0) localStorage.removeItem("cart");
  };

  // Remove item from cart
  const removeFromCart = (id) => {
    const updatedCart = cart.filter((item) => item._id !== id);
    updateCart(updatedCart);
  };

  // Increase quantity
  const increaseQty = (id) => {
    const updatedCart = cart.map((item) =>
      item._id === id ? { ...item, quantity: (item.quantity || 1) + 1 } : item
    );
    updateCart(updatedCart);
  };

  // Decrease quantity (remove if qty becomes 0)
  const decreaseQty = (id) => {
    const updatedCart = cart
      .map((item) =>
        item._id === id ? { ...item, quantity: (item.quantity || 1) - 1 } : item
      )
      .filter((item) => (item.quantity || 1) > 0);
    updateCart(updatedCart);
  };

  // Calculate total price (with quantities)
  const totalPrice = cart.reduce(
    (sum, item) => sum + Number(item.price) * (item.quantity || 1),
    0
  );

  const totalItems = cart.reduce(
    (sum, item) => sum + (item.quantity || 1),
    0
  );

  return (
    <>
      <CustomerHeader />

      <main className="min-h-screen bg-gray-100 py-10">
        <div className="max-w-6xl mx-auto px-6">
          <h1 className="text-3xl font-bold text-gray-900 mb-6">Your Cart</h1>

          {cart.length === 0 ? (
            <div className="text-center mt-10">
              <p className="text-gray-500 text-lg">Your cart is empty.</p>
              <button
                onClick={() => router.push("/")}
                className="mt-4 px-6 py-2 bg-green-700 text-white rounded-xl hover:bg-green-800 transition"
              >
                Browse Restaurants
              </button>
            </div>
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

                    {/* Quantity Controls */}
                    <div className="mt-auto flex items-center justify-between mt-4">
                      <span className="font-bold text-gray-900">₹{food.price}</span>

                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => decreaseQty(food._id)}
                          className="w-8 h-8 flex items-center justify-center rounded-full bg-gray-200 hover:bg-gray-300 text-lg font-bold"
                        >
                          −
                        </button>
                        <span className="font-semibold text-gray-800 w-6 text-center">
                          {food.quantity || 1}
                        </span>
                        <button
                          onClick={() => increaseQty(food._id)}
                          className="w-8 h-8 flex items-center justify-center rounded-full bg-green-100 hover:bg-green-200 text-green-700 text-lg font-bold"
                        >
                          +
                        </button>
                      </div>
                    </div>

                    {/* Item subtotal and remove */}
                    <div className="flex items-center justify-between mt-3 pt-3 border-t">
                      <span className="text-sm text-gray-600">
                        Subtotal: ₹{Number(food.price) * (food.quantity || 1)}
                      </span>
                      <button
                        onClick={() => removeFromCart(food._id)}
                        className="px-3 py-1 text-xs rounded-full bg-red-500 text-white hover:bg-red-600 transition"
                      >
                        REMOVE
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              {/* Total Price */}
              <div className="mt-8 p-6 bg-white rounded-2xl shadow-md flex justify-between items-center">
                <div>
                  <span className="text-xl font-semibold text-gray-900">Total:</span>
                  <span className="text-sm text-gray-500 ml-2">({totalItems} items)</span>
                </div>
                <span className="text-xl font-bold text-green-700">₹{totalPrice}</span>
              </div>

              {/* Checkout Button */}
              <div className="mt-4 flex justify-end">
                <button
                  onClick={() => router.push("/checkout")}
                  className="px-6 py-3 bg-green-700 text-white rounded-xl font-semibold hover:bg-green-800 transition"
                >
                  Proceed to Checkout
                </button>
              </div>
            </>
          )}
        </div>
      </main>
      <Footer />
    </>
  );
};

export default CartPage;
