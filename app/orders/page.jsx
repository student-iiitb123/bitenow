"use client";

import React, { useEffect, useState, Suspense } from "react";
import CustomerHeader from "../_components/CustomerHeader";
import Footer from "../_components/Footer";
import { StatusBadge } from "../_components/ui/StatusBadge";
import { EmptyState } from "../_components/ui/EmptyState";
import { useRouter, useSearchParams } from "next/navigation";
import { PackageCheck, Clock, MapPin, CheckCircle2, XCircle, AlertCircle } from "lucide-react";

function OrdersContent() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [successMsg, setSuccessMsg] = useState("");
  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    if (searchParams.get("success") === "true") {
      setSuccessMsg("🎉 Order placed successfully! Track your meal below.");
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
        loadOrders();
      } else {
        alert(data.message || "Cannot cancel this order");
      }
    } catch (err) {
      alert("Failed to cancel order");
    }
  };

  return (
    <main className="max-w-5xl mx-auto px-6 py-12 w-full flex-1">
      <div className="flex items-center gap-3 mb-8">
        <div className="w-10 h-10 rounded-xl bg-[#244C3A] text-white flex items-center justify-center">
          <PackageCheck size={20} />
        </div>
        <div>
          <h1 className="text-3xl font-black text-[#1E2923]">My Orders</h1>
          <p className="text-xs text-[#57685D] font-medium">
            Track your live orders and view order history
          </p>
        </div>
      </div>

      {successMsg && (
        <div className="mb-6 p-4 bg-emerald-50 border border-emerald-200 rounded-2xl text-emerald-800 text-sm font-semibold flex items-center gap-3 shadow-xs">
          <CheckCircle2 size={20} className="text-emerald-600 shrink-0" />
          <span>{successMsg}</span>
        </div>
      )}

      {error && (
        <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-2xl text-red-600 text-sm font-semibold flex items-center gap-3">
          <AlertCircle size={20} className="shrink-0" />
          <span>{error}</span>
        </div>
      )}

      {loading ? (
        <div className="text-center py-16 text-[#57685D] font-medium animate-pulse">
          Loading your order history...
        </div>
      ) : orders.length === 0 ? (
        <EmptyState
          icon={PackageCheck}
          title="No orders yet"
          description="You haven't placed any food orders yet. Discover popular local restaurants and order your favorite meals today!"
          actionText="Browse Restaurants"
          actionHref="/"
        />
      ) : (
        <div className="space-y-6">
          {orders.map((order) => (
            <div
              key={order._id}
              className="bg-white rounded-3xl border border-[#E2ECE5] shadow-xs p-6 space-y-6"
            >
              {/* ORDER HEADER */}
              <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-[#E2ECE5]">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-base font-black text-[#1E2923]">
                      Order #{order._id.slice(-8).toUpperCase()}
                    </span>
                    <StatusBadge status={order.status} />
                  </div>
                  <p className="text-xs text-[#57685D] flex items-center gap-1 mt-1">
                    <Clock size={12} className="text-[#84948A]" />
                    <span>{new Date(order.createdAt).toLocaleString()}</span>
                  </p>
                </div>

                <div className="text-right">
                  <span className="text-xs text-[#57685D] block">Total Amount</span>
                  <span className="text-2xl font-black text-[#244C3A]">₹{order.total}</span>
                </div>
              </div>

              {/* ORDER ITEMS LIST */}
              <div className="space-y-3">
                <h4 className="text-xs font-bold text-[#57685D] uppercase tracking-wider">Ordered Items</h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {order.items.map((item, idx) => (
                    <div
                      key={idx}
                      className="flex items-center gap-3 p-3 bg-[#F7F5EF] rounded-xl border border-[#E2ECE5]"
                    >
                      {item.path && (
                        <img
                          src={item.path}
                          alt={item.name}
                          className="w-12 h-12 rounded-lg object-cover border border-[#E2ECE5]"
                        />
                      )}
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-bold text-[#1E2923] truncate">{item.name}</p>
                        <p className="text-xs text-[#57685D]">
                          ₹{item.price} × {item.quantity}
                        </p>
                      </div>
                      <span className="text-sm font-bold text-[#244C3A]">
                        ₹{item.price * item.quantity}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* FOOTER & ADDRESS */}
              <div className="pt-4 border-t border-[#E2ECE5] flex flex-col sm:flex-row sm:items-center justify-between gap-4 text-xs text-[#57685D]">
                <div className="flex items-center gap-1.5">
                  <MapPin size={14} className="text-[#244C3A] shrink-0" />
                  <span>
                    <strong>Delivering to:</strong> {order.delivery_address?.fullName}, {order.delivery_address?.address}, {order.delivery_address?.city}
                  </span>
                </div>

                {order.status === "placed" && (
                  <button
                    onClick={() => cancelOrder(order._id)}
                    className="px-4 py-2 text-xs font-bold rounded-full bg-red-50 text-red-600 hover:bg-red-100 border border-red-200 transition-all self-start sm:self-auto flex items-center gap-1"
                  >
                    <XCircle size={14} /> Cancel Order
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </main>
  );
}

const OrdersPage = () => {
  return (
    <div className="min-h-screen bg-[#F7F5EF] flex flex-col font-sans">
      <CustomerHeader />
      <Suspense fallback={<div className="min-h-screen text-center py-20 text-[#57685D]">Loading orders...</div>}>
        <OrdersContent />
      </Suspense>
      <Footer />
    </div>
  );
};

export default OrdersPage;
