"use client";

import { useEffect, useState } from "react";
import { useParams, useSearchParams } from "next/navigation";

export default function RestaurantPage() {
  const { name } = useParams();
  const searchParams = useSearchParams();
  const id = searchParams.get("id");

  const [restaurant, setRestaurant] = useState(null);
  const [foods, setFoods] = useState([]);

  useEffect(() => {
    if (id) loadData();
  }, [id]);

  const loadData = async () => {
    try {
      const res = await fetch(
        `http://localhost:3000/api/restuarant/customers/${id}`
      );
      const data = await res.json();

      setRestaurant(data.restuarant);
      setFoods(data.food ? [data.food] : []);
    } catch (error) {
      console.error(error);
      setRestaurant(null);
      setFoods([]);
    }
  };

  if (!restaurant) {
    return (
      <div className="min-h-screen flex items-center justify-center text-gray-500">
        Loading restaurant...
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-gray-100 to-gray-200">
      
      {/* Glass Header */}
      <section className="sticky top-0 z-10 backdrop-blur-xl bg-white/70 border-b border-white/40">
        <div className="max-w-6xl mx-auto px-6 py-6">
          <h1 className="text-3xl font-semibold tracking-tight text-gray-900">
            {decodeURIComponent(restaurant.restuarant)}
          </h1>
          <p className="text-gray-500 mt-1">{restaurant.city}</p>

          <div className="mt-3 flex flex-wrap gap-4 text-sm text-gray-600">
            <span>📍 {restaurant.address}</span>
            <span>📞 {restaurant.phone}</span>
            <span>✉️ {restaurant.email}</span>
          </div>
        </div>
      </section>

      {/* Food Section */}
      <section className="max-w-6xl mx-auto px-6 py-10">
        <h2 className="text-xl font-semibold text-gray-900 mb-6">
          Popular Items
        </h2>

        {foods.length === 0 ? (
          <p className="text-gray-500">No food items available</p>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
            {foods.map((food) => (
              <div
                key={food._id}
                className="group bg-white/80 backdrop-blur-lg rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
              >
                <img
                  src={food.path || "/food-placeholder.png"}
                  alt={food.name}
                  className="w-full h-36 object-cover rounded-t-2xl"
                />

                <div className="p-4 text-center">
                  <h3 className="font-medium text-gray-900">
                    {food.name}
                  </h3>
                  <p className="text-xs text-gray-500 mt-0.5">
                    {food.category}
                  </p>

                  <div className="flex items-center justify-between mt-4">
                    <span className="font-semibold text-gray-900">
                      ₹{food.price}
                    </span>

                    <button className="px-4 py-1.5 text-sm rounded-full bg-orange-500 text-white shadow hover:bg-orange-600 active:scale-95 transition">
                      ADD
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>
    </main>
  );
}
