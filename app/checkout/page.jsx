"use client";

import React, { useEffect, useState } from "react";
import CustomerHeader from "../_components/CustomerHeader";
import Footer from "../_components/Footer";
import { useRouter } from "next/navigation";
import { ShieldCheck, MapPin, User, Phone, Mail, Home, ArrowRight, AlertCircle, Banknote } from "lucide-react";

const CheckoutPage = () => {
  const [cart, setCart] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [user, setUser] = useState(null);
  const router = useRouter();

  const [fullName, setFullName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [city, setCity] = useState("");
  const [address, setAddress] = useState("");

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem("cart")) || [];
    setCart(data);

    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      try {
        const parsed = JSON.parse(storedUser);
        setUser(parsed);
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

  const subtotal = cart.reduce(
    (sum, item) => sum + Number(item.price) * (item.quantity || 1),
    0
  );
  const deliveryFee = 40;
  const totalPrice = subtotal + deliveryFee;

  const handleConfirmOrder = async (e) => {
    e.preventDefault();
    setError("");

    const token = localStorage.getItem("token");
    if (!token || !user) {
      setError("Please log in to place an order.");
      router.push("/user-auth");
      return;
    }

    if (cart.length === 0) {
      setError("Your cart is empty.");
      return;
    }

    if (!fullName.trim() || !phone.trim() || !address.trim() || !city.trim()) {
      setError("Please fill in all required delivery details.");
      return;
    }

    setLoading(true);

    try {
      const restaurant_id = cart[0].restro_id;
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
        localStorage.removeItem("cart");
        router.push(`/orders?success=true&orderId=${result.order._id}`);
      } else {
        setError(result.message || "Failed to place order. Please try again.");
      }
    } catch (err) {
      console.error("Checkout error:", err);
      setError("Network error. Please try again. Your cart is preserved.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#F7F5EF] flex flex-col font-sans">
      <CustomerHeader />

      <main className="max-w-7xl mx-auto px-6 py-12 w-full flex-1">
        <h1 className="text-3xl font-black text-[#1E2923] mb-8">Checkout</h1>

        {error && (
          <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-2xl text-red-600 text-sm flex items-center gap-3">
            <AlertCircle size={18} className="shrink-0" />
            <span>{error}</span>
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* DELIVERY FORM */}
          <div className="lg:col-span-7 space-y-6">
            <form onSubmit={handleConfirmOrder} className="bg-white rounded-3xl border border-[#E2ECE5] shadow-xs p-6 sm:p-8 space-y-6">
              <h2 className="text-xl font-bold text-[#1E2923] flex items-center gap-2">
                <MapPin className="text-[#244C3A]" size={20} />
                <span>Delivery Details</span>
              </h2>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-xs font-bold text-[#57685D] uppercase">Full Name *</label>
                  <div className="flex items-center gap-2 px-4 py-3 bg-[#F7F5EF] border border-[#E2ECE5] rounded-xl focus-within:border-[#244C3A]">
                    <User size={16} className="text-[#84948A]" />
                    <input
                      type="text"
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      placeholder="Jane Doe"
                      className="w-full bg-transparent outline-none text-sm font-medium text-[#1E2923]"
                      required
                      disabled={loading}
                    />
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-bold text-[#57685D] uppercase">Phone Number *</label>
                  <div className="flex items-center gap-2 px-4 py-3 bg-[#F7F5EF] border border-[#E2ECE5] rounded-xl focus-within:border-[#244C3A]">
                    <Phone size={16} className="text-[#84948A]" />
                    <input
                      type="tel"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="9876543210"
                      className="w-full bg-transparent outline-none text-sm font-medium text-[#1E2923]"
                      required
                      disabled={loading}
                    />
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-bold text-[#57685D] uppercase">Email</label>
                  <div className="flex items-center gap-2 px-4 py-3 bg-[#F7F5EF] border border-[#E2ECE5] rounded-xl focus-within:border-[#244C3A]">
                    <Mail size={16} className="text-[#84948A]" />
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="jane@example.com"
                      className="w-full bg-transparent outline-none text-sm font-medium text-[#1E2923]"
                      disabled={loading}
                    />
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-bold text-[#57685D] uppercase">City *</label>
                  <div className="flex items-center gap-2 px-4 py-3 bg-[#F7F5EF] border border-[#E2ECE5] rounded-xl focus-within:border-[#244C3A]">
                    <MapPin size={16} className="text-[#84948A]" />
                    <input
                      type="text"
                      value={city}
                      onChange={(e) => setCity(e.target.value)}
                      placeholder="Mumbai"
                      className="w-full bg-transparent outline-none text-sm font-medium text-[#1E2923]"
                      required
                      disabled={loading}
                    />
                  </div>
                </div>

                <div className="sm:col-span-2 space-y-1">
                  <label className="text-xs font-bold text-[#57685D] uppercase">Full Address *</label>
                  <div className="flex items-center gap-2 px-4 py-3 bg-[#F7F5EF] border border-[#E2ECE5] rounded-xl focus-within:border-[#244C3A]">
                    <Home size={16} className="text-[#84948A]" />
                    <input
                      type="text"
                      value={address}
                      onChange={(e) => setAddress(e.target.value)}
                      placeholder="Flat 4B, Sunrise Heights, MG Road"
                      className="w-full bg-transparent outline-none text-sm font-medium text-[#1E2923]"
                      required
                      disabled={loading}
                    />
                  </div>
                </div>
              </div>

              {/* PAYMENT METHOD */}
              <div className="p-4 bg-[#F7F5EF] rounded-2xl border border-[#E2ECE5] flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-[#244C3A] text-white flex items-center justify-center">
                    <Banknote size={20} />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-[#1E2923]">Cash on Delivery (COD)</h4>
                    <p className="text-xs text-[#57685D]">Pay cash when your food arrives</p>
                  </div>
                </div>
                <span className="text-xs font-bold text-[#244C3A] bg-[#E6EFEA] px-3 py-1 rounded-full">
                  Selected
                </span>
              </div>
            </form>
          </div>

          {/* ORDER SUMMARY SIDEBAR */}
          <div className="lg:col-span-5">
            <div className="bg-white rounded-3xl border border-[#E2ECE5] shadow-xs p-6 space-y-6 sticky top-24">
              <h2 className="text-lg font-black text-[#1E2923] pb-3 border-b border-[#E2ECE5]">
                Order Items ({cart.length})
              </h2>

              <div className="space-y-4 max-h-60 overflow-y-auto pr-1">
                {cart.map((item) => (
                  <div key={item._id} className="flex items-center justify-between gap-3">
                    <div className="flex items-center gap-3">
                      <img
                        src={item.path || "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=100&q=80"}
                        className="w-12 h-12 rounded-xl object-cover border border-[#E2ECE5]"
                        alt={item.name}
                      />
                      <div>
                        <p className="text-sm font-bold text-[#1E2923] line-clamp-1">{item.name}</p>
                        <p className="text-xs text-[#57685D]">₹{item.price} × {item.quantity || 1}</p>
                      </div>
                    </div>
                    <span className="text-sm font-bold text-[#1E2923]">
                      ₹{Number(item.price) * (item.quantity || 1)}
                    </span>
                  </div>
                ))}
              </div>

              <div className="pt-4 border-t border-[#E2ECE5] space-y-3 text-sm text-[#57685D]">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span className="font-bold text-[#1E2923]">₹{subtotal}</span>
                </div>
                <div className="flex justify-between">
                  <span>Delivery Fee</span>
                  <span className="font-bold text-[#1E2923]">₹{deliveryFee}</span>
                </div>
                <div className="pt-3 border-t border-[#E2ECE5] flex justify-between items-center">
                  <span className="text-base font-bold text-[#1E2923]">Total Amount</span>
                  <span className="text-2xl font-black text-[#244C3A]">₹{totalPrice}</span>
                </div>
              </div>

              <button
                type="button"
                onClick={handleConfirmOrder}
                disabled={loading || cart.length === 0}
                className="w-full py-4 bg-[#244C3A] hover:bg-[#1A382B] text-white font-bold rounded-2xl transition-all shadow-md flex items-center justify-center gap-2 disabled:opacity-50"
              >
                <span>{loading ? "Placing Order..." : "Confirm Order (COD)"}</span>
                <ArrowRight size={18} />
              </button>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default CheckoutPage;
