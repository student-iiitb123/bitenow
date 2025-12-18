"use client";

import React, { useEffect, useState } from "react";
import CustomerHeader from "../_components/CustomerHeader";
import { useRouter } from "next/navigation";

const CheckoutPage = () => {
  const [cart, setCart] = useState([]);
  const router = useRouter();

  // Load cart
  useEffect(() => {
    const data = JSON.parse(localStorage.getItem("cart")) || [];
    setCart(data);
  }, []);

  // Total price
  const totalPrice = cart.reduce(
    (sum, item) => sum + Number(item.price),
    0
  );

  const handleConfirmOrder = () => {
    alert("Order placed successfully 🚀");
    localStorage.removeItem("cart");
    router.push("/");
  };

  return (
    <>
      <CustomerHeader cartStorage={cart} setCartStorage={setCart} />

      <main className="min-h-screen bg-gray-100 py-10">
        <div className="max-w-7xl mx-auto px-6">
          <h1 className="text-3xl font-bold text-gray-900 mb-8">
            Checkout
          </h1>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">

            {/* Billing Details */}
            <div className="lg:col-span-8">
              <div className="bg-white rounded-2xl shadow-md p-6">
                <h2 className="text-xl font-semibold mb-6">
                  Billing Details
                </h2>

                <form className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <input className="input" placeholder="First Name" />
                  <input className="input" placeholder="Last Name" />
                  <input className="input" placeholder="Email Address" />
                  <input className="input" placeholder="Phone Number" />
                  <input className="input" placeholder="City" />
                  <input className="input" placeholder="State" />
                  <input className="input" placeholder="Zip Code" />
                  <input
                    className="input sm:col-span-2"
                    placeholder="Full Address"
                  />
                </form>

                {/* Address Label */}
                <div className="flex justify-between items-center mt-6 flex-wrap gap-3">
                  <div className="flex gap-3">
                    <button className="px-4 py-2 border rounded-full text-sm">
                      🏠 Home
                    </button>
                    <button className="px-4 py-2 border rounded-full text-sm">
                      🏢 Office
                    </button>
                  </div>
                  <button className="px-6 py-2 bg-green-700 text-white rounded-xl hover:bg-green-800">
                    Save Address
                  </button>
                </div>
              </div>
            </div>

            {/* Order Summary */}
            <div className="lg:col-span-4">
              <div className="bg-white rounded-2xl shadow-md p-6 flex flex-col justify-between h-full">

                <div>
                  <h2 className="text-lg font-semibold border-b pb-3 mb-4">
                    Order Summary
                  </h2>

                  {cart.length === 0 ? (
                    <p className="text-gray-500 text-sm">
                      Your cart is empty
                    </p>
                  ) : (
                    <div className="space-y-4">
                      {cart.map((item) => (
                        <div
                          key={item._id}
                          className="flex justify-between items-center gap-3"
                        >
                          <div className="flex items-center gap-3">
                            <img
                              src={item.path || "/food-placeholder.png"}
                              className="w-12 h-12 rounded-lg object-cover"
                              alt={item.name}
                            />
                            <div>
                              <p className="text-sm font-medium">
                                {item.name}
                              </p>
                              <span className="text-green-700 font-semibold text-sm">
                                ₹{item.price}
                              </span>
                            </div>
                          </div>
                          <span className="text-sm text-gray-500">x1</span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                {/* Price Details */}
                <div className="mt-6 border-t pt-4 space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Subtotal</span>
                    <span>₹{totalPrice}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Delivery</span>
                    <span>₹40</span>
                  </div>
                  <div className="flex justify-between font-semibold text-lg border-t pt-3">
                    <span>Total</span>
                    <span>₹{totalPrice + 40}</span>
                  </div>

                  <button
                    onClick={handleConfirmOrder}
                    className="mt-4 w-full bg-green-700 text-white py-3 rounded-xl font-semibold hover:bg-green-800 transition"
                  >
                    Confirm Order
                  </button>
                </div>

              </div>
            </div>

          </div>
        </div>
      </main>
    </>
  );
};

export default CheckoutPage;
