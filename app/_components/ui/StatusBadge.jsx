"use client";

const statusConfig = {
  placed: { label: "Order Placed", bg: "bg-blue-50 text-blue-700 border-blue-200" },
  confirmed: { label: "Confirmed", bg: "bg-amber-50 text-amber-700 border-amber-200" },
  preparing: { label: "Preparing", bg: "bg-orange-50 text-orange-700 border-orange-200" },
  out_for_delivery: { label: "Out for Delivery", bg: "bg-purple-50 text-purple-700 border-purple-200" },
  delivered: { label: "Delivered", bg: "bg-emerald-50 text-emerald-700 border-emerald-200" },
  cancelled: { label: "Cancelled", bg: "bg-rose-50 text-rose-700 border-rose-200" },
};

export function StatusBadge({ status }) {
  const config = statusConfig[status] || {
    label: status,
    bg: "bg-gray-50 text-gray-700 border-gray-200",
  };

  return (
    <span className={`px-3 py-1 text-xs font-semibold rounded-full border ${config.bg}`}>
      {config.label}
    </span>
  );
}
