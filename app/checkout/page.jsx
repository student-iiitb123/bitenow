"use client";

import React, { useEffect, useState } from "react";
import CustomerHeader from "../_components/CustomerHeader";
import Footer from "../_components/Footer";
import { useRouter } from "next/navigation";

const CheckoutPage = () => {
  const [cart, setCart] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [user, setUser] = useState(null);
  const router = useRouter();

  // Form state for delivery address
  const [fullName, setFullName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [city, setCity] = useState("");
  const [address, setAddress] = useState("");

  // Load cart and user on mount
  useEffect(() => {
    const data = JSON.parse(localStorage.getItem("cart")) || [];
    setCart(data);

    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      try {
        const parsed = JSON.parse(storedUser);
        setUser(parsed);
        // Pre-fill from user profile
        setFullName(parsed.name || "");
        setEmail(parsed.email || "");
        setCity(parsed.city || "");
        setAddress(parsed.address || "");
        setPhone(parsed.mobile || "");
      } catch {
        // ignore parse errors
      }
    }
  }, []);

  // Total calculations
  const subtotal = cart.reduce(
    (sum, item) => sum + Number(item.price) * (item.quantity || 1),
    0
  );
  const deliveryFee = 40;
  const totalPrice = subtotal + deliveryFee;

  const handleConfirmOrder = async () => {
    setError("");

    // Check if user is logged in
    const token = localStorage.getItem("token");
    if (!token || !user) {
      setError("Please login to place an order");
      router.push("/user-auth");
      return;
    }

    // Validate cart
    if (cart.length === 0) {
      setError("Your cart is empty");
      return;
    }

    // Validate delivery details
    if (!fullName.trim() || !phone.trim() || !address.trim() || !city.trim()) {
      setError("Please fill in all delivery details");
      return;
    }

    setLoading(true);

    try {
      // Get restaurant ID from cart items
      const restaurant_id = cart[0].restro_id;

      // Build order items (server will verify prices from DB)
      const items = cart.map((item) => ({
        food_id: item._id,
        quantity: item.quantity || 1,
      }));

      const response = await fetch("/api/orders", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          items,
          restaurant_id,
          delivery_address: {
            fullName: fullName.trim(),
            phone: phone.trim(),
            address: address.trim(),
            city: city.trim(),
          },
        }),
      });

      const result = await response.json();

      if (result.success) {
        // Only clear cart AFTER server confirms order was created
        localStorage.removeItem("cart");
        // Redirect to order confirmation
        router.push(`/orders?success=true&orderId=${result.order._id}`);
      } else {
        setError(result.message || "Failed to place order. Please try again.");
        // Cart is preserved on failure
      }
    } catch (err) {
      console.error("Checkout error:", err);
      setError("Network error. Please try again. Your cart has been preserved.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <CustomerHeader />

      <main className="min-h-screen bg-gray-100 py-10">
        <div className="max-w-7xl mx-auto px-6">
          <h1 className="text-3xl font-bold text-gray-900 mb-8">
            Checkout
          </h1>

          {error && (
            <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-xl text-red-600 text-sm">
              {error}
            </div>
          )}

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">

            {/* Billing Details */}
            <div className="lg:col-span-8">
              <div className="bg-white rounded-2xl shadow-md p-6">
                <h2 className="text-xl font-semibold mb-6">
                  Delivery Details
                </h2>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <input
                    className="w-full px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500"
                    placeholder="Full Name *"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    required
                    disabled={loading}
                  />
                  <input
                    className="w-full px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500"
                    placeholder="Phone Number *"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    required
                    disabled={loading}
                  />
                  <input
                    className="w-full px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    disabled={loading}
                  />
                  <input
                    className="w-full px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500"
                    placeholder="City *"
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    required
                    disabled={loading}
                  />
                  <input
                    className="w-full sm:col-span-2 px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500"
                    placeholder="Full Address *"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    required
                    disabled={loading}
                  />
                </div>

                <div className="mt-6 p-4 bg-gray-50 rounded-xl">
                  <p className="text-sm text-gray-600">
                    💰 <strong>Payment Method:</strong> Cash on Delivery (COD)
                  </p>
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
                          <span className="text-sm text-gray-500">
                            x{item.quantity || 1}
                          </span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                {/* Price Details */}
                <div className="mt-6 border-t pt-4 space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Subtotal</span>
                    <span>₹{subtotal}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Delivery</span>
                    <span>₹{deliveryFee}</span>
                  </div>
                  <div className="flex justify-between font-semibold text-lg border-t pt-3">
                    <span>Total</span>
                    <span>₹{totalPrice}</span>
                  </div>

                  <button
                    onClick={handleConfirmOrder}
                    disabled={loading || cart.length === 0}
                    className="mt-4 w-full bg-green-700 text-white py-3 rounded-xl font-semibold hover:bg-green-800 transition disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {loading ? "Placing Order..." : "Confirm Order (COD)"}
                  </button>
                </div>

              </div>
            </div>

          </div>
        </div>
      </main>
      <Footer />
    </>
  );
};

export default CheckoutPage;
