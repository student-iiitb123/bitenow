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
      console.error("Error fetching restaurant:", error);
      setRestaurant(null);
      setFoods([]);
    }
  };

  if (!restaurant) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        Loading...
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-gray-50">
    
      <section className="bg-gradient-to-r from-orange-500 to-orange-600 text-white px-6 py-8">
        <h1 className="text-3xl font-bold">{decodeURIComponent(restaurant.restuarant)}</h1>
        <p className="text-white/90 mt-1">{restaurant.city}</p>

        <div className="mt-2 text-sm space-y-1">
          <p>📍 {restaurant.address}</p>
          <p>📞 {restaurant.phone}</p>
          <p>✉️ {restaurant.email}</p>
        </div>
      </section>

      
      <section className="px-4 py-6">
        <h2 className="text-xl font-bold mb-4">🍽️ Popular Items</h2>

        {foods.length === 0 ? (
          <p className="text-gray-500 text-sm">No food items available</p>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
            {foods.map((food) => (
              <div
                key={food._id}
                className="bg-white rounded shadow p-2 flex flex-col items-center text-center"
              >
                <img
                  src={food.path || "/food-placeholder.png"}
                  alt={food.name}
                  className="w-20 h-20 object-cover rounded mb-1"
                />
                <h3 className="text-sm font-semibold">{food.name}</h3>
                <p className="text-xs text-gray-500">{food.category}</p>
                <span className="text-sm font-bold mt-1">₹{food.price}</span>
                <button className="mt-1 px-2 py-0.5 text-xs border border-orange-500 text-orange-500 rounded">
                  ADD
                </button>
              </div>
            ))}
          </div>
        )}
      </section>
    </main>
  );
}
