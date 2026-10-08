"use client";

import React, { useEffect, useState, Suspense } from "react";
import CustomerHeader from "../_components/CustomerHeader";
import Footer from "../_components/Footer";
import { useRouter, useSearchParams } from "next/navigation";

const statusColors = {
  placed: "bg-blue-100 text-blue-800",
  confirmed: "bg-yellow-100 text-yellow-800",
  preparing: "bg-orange-100 text-orange-800",
  out_for_delivery: "bg-purple-100 text-purple-800",
  delivered: "bg-green-100 text-green-800",
  cancelled: "bg-red-100 text-red-800",
};

const statusLabels = {
  placed: "Order Placed",
  confirmed: "Confirmed",
  preparing: "Preparing",
  out_for_delivery: "Out for Delivery",
  delivered: "Delivered",
  cancelled: "Cancelled",
};

function OrdersContent() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [successMsg, setSuccessMsg] = useState("");
  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    // Show success message if redirected from checkout
    if (searchParams.get("success") === "true") {
      setSuccessMsg("🎉 Order placed successfully! You can track it below.");
    }
    loadOrders();
  }, [searchParams]);

  const loadOrders = async () => {
    const token = localStorage.getItem("token");
    if (!token) {
      router.push("/user-auth");
      return;
    }

    try {
      setLoading(true);
      const res = await fetch("/api/orders", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await res.json();

      if (data.success) {
        setOrders(data.orders || []);
      } else {
        setError(data.message || "Failed to load orders");
      }
    } catch (err) {
      console.error("Load orders error:", err);
      setError("Failed to load orders");
    } finally {
      setLoading(false);
    }
  };

  const cancelOrder = async (orderId) => {
    const token = localStorage.getItem("token");
    if (!confirm("Are you sure you want to cancel this order?")) return;

    try {
      const res = await fetch(`/api/orders/${orderId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ status: "cancelled" }),
      });

      const data = await res.json();

      if (data.success) {
        loadOrders(); // Refresh
      } else {
        alert(data.message || "Cannot cancel this order");
      }
    } catch (err) {
      alert("Failed to cancel order");
    }
  };

  return (
    <main className="min-h-screen bg-gray-100 py-10">
      <div className="max-w-4xl mx-auto px-6">
        <h1 className="text-3xl font-bold text-gray-900 mb-6">My Orders</h1>

        {successMsg && (
          <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-xl text-green-700">
            {successMsg}
          </div>
        )}

        {error && (
          <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-xl text-red-600">
            {error}
          </div>
        )}

        {loading ? (
          <p className="text-center text-gray-500 py-10">Loading orders...</p>
        ) : orders.length === 0 ? (
          <div className="text-center py-10">
            <p className="text-gray-500 text-lg">No orders yet.</p>
            <button
              onClick={() => router.push("/")}
              className="mt-4 px-6 py-2 bg-green-700 text-white rounded-xl hover:bg-green-800 transition"
            >
              Browse Restaurants
            </button>
          </div>
        ) : (
          <div className="space-y-6">
            {orders.map((order) => (
              <div
                key={order._id}
                className="bg-white rounded-2xl shadow-md p-6"
              >
                {/* Order Header */}
                <div className="flex flex-wrap items-center justify-between gap-4 mb-4">
                  <div>
                    <p className="text-xs text-gray-500">
                      Order #{order._id.slice(-8).toUpperCase()}
                    </p>
                    <p className="text-xs text-gray-400">
                      {new Date(order.createdAt).toLocaleString()}
                    </p>
                  </div>
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-semibold ${
                      statusColors[order.status] || "bg-gray-100"
                    }`}
                  >
                    {statusLabels[order.status] || order.status}
                  </span>
                </div>

                {/* Order Items */}
                <div className="space-y-3">
                  {order.items.map((item, idx) => (
                    <div
                      key={idx}
                      className="flex items-center justify-between gap-3"
                    >
                      <div className="flex items-center gap-3">
                        {item.path && (
                          <img
                            src={item.path}
                            alt={item.name}
                            className="w-10 h-10 rounded-lg object-cover"
                          />
                        )}
                        <div>
                          <p className="text-sm font-medium">{item.name}</p>
                          <p className="text-xs text-gray-500">
                            ₹{item.price} × {item.quantity}
                          </p>
                        </div>
                      </div>
                      <span className="text-sm font-semibold">
                        ₹{item.price * item.quantity}
                      </span>
                    </div>
                  ))}
                </div>

                {/* Order Footer */}
                <div className="mt-4 pt-4 border-t flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-500">
                      Delivery: ₹{order.delivery_fee}
                    </p>
                    <p className="font-bold text-lg text-green-700">
                      Total: ₹{order.total}
                    </p>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded">
                      {order.payment_method === "cod"
                        ? "Cash on Delivery"
                        : order.payment_method}
                    </span>
                    {order.status === "placed" && (
                      <button
                        onClick={() => cancelOrder(order._id)}
                        className="px-4 py-1.5 text-sm rounded-full bg-red-500 text-white hover:bg-red-600 transition"
                      >
                        Cancel
                      </button>
                    )}
                  </div>
                </div>

                {/* Delivery Address */}
                <div className="mt-3 pt-3 border-t text-xs text-gray-500">
                  📍 {order.delivery_address?.fullName} — {order.delivery_address?.address}, {order.delivery_address?.city} | 📞 {order.delivery_address?.phone}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}

const OrdersPage = () => {
  return (
    <>
      <CustomerHeader />
      <Suspense fallback={<div className="min-h-screen text-center py-20 text-gray-500">Loading orders...</div>}>
        <OrdersContent />
      </Suspense>
      <Footer />
    </>
  );
};

export default OrdersPage;
