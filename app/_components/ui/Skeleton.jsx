"use client";

export function Skeleton({ className = "", ...props }) {
  return (
    <div
      className={`animate-pulse rounded-xl bg-gray-200/80 ${className}`}
      {...props}
    />
  );
}

export function RestaurantCardSkeleton() {
  return (
    <div className="bg-white rounded-2xl overflow-hidden border border-[#E2ECE5] shadow-sm p-3">
      <Skeleton className="w-full h-44 rounded-xl mb-3" />
      <Skeleton className="h-6 w-3/4 mb-2" />
      <Skeleton className="h-4 w-1/2 mb-2" />
      <Skeleton className="h-4 w-1/3" />
    </div>
  );
}

export function FoodCardSkeleton() {
  return (
    <div className="bg-white rounded-2xl border border-[#E2ECE5] p-3">
      <Skeleton className="w-full h-36 rounded-xl mb-3" />
      <Skeleton className="h-5 w-3/4 mb-2" />
      <Skeleton className="h-4 w-full mb-3" />
      <div className="flex justify-between items-center">
        <Skeleton className="h-6 w-16" />
        <Skeleton className="h-8 w-20 rounded-full" />
      </div>
    </div>
  );
}
