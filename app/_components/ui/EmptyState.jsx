"use client";

import Link from "next/link";
import { UtensilsCrossed } from "lucide-react";

export function EmptyState({
  icon: Icon = UtensilsCrossed,
  title = "No items found",
  description = "Check back later or try searching for something else.",
  actionText,
  actionHref,
  onAction,
}) {
  return (
    <div className="flex flex-col items-center justify-center text-center p-12 bg-white rounded-3xl border border-[#E2ECE5] shadow-xs my-6">
      <div className="w-16 h-16 rounded-full bg-[#E6EFEA] flex items-center justify-center text-[#244C3A] mb-4">
        <Icon size={32} />
      </div>
      <h3 className="text-xl font-bold text-[#1E2923] mb-2">{title}</h3>
      <p className="text-sm text-[#57685D] max-w-md mb-6">{description}</p>
      {actionText && actionHref && (
        <Link
          href={actionHref}
          className="px-6 py-2.5 bg-[#244C3A] hover:bg-[#1A382B] text-white font-medium rounded-full transition-all shadow-xs"
        >
          {actionText}
        </Link>
      )}
      {actionText && onAction && !actionHref && (
        <button
          onClick={onAction}
          className="px-6 py-2.5 bg-[#244C3A] hover:bg-[#1A382B] text-white font-medium rounded-full transition-all shadow-xs"
        >
          {actionText}
        </button>
      )}
    </div>
  );
}
