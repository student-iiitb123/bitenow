"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import CustomerHeader from "../../_components/CustomerHeader"

export default function RestaurantPage() {
  const searchParams = useSearchParams();
  const id = searchParams.get("id");

  const [restaurant, setRestaurant] = useState(null);
  const [foods, setFoods] = useState([]);
  const [loading, setLoading] = useState(true);
  //ma
  const[cart,setCart] = useState();


  const handleclick = (food) => {
     setCart(food)
  }
   
  console.log(cart);
  useEffect(() => {
    if (id) loadData();
  }, [id]);

  const loadData = async () => {
    try {
      setLoading(true);

      const res = await fetch(
        `http://localhost:3000/api/restuarant/customers/${id}`
      );

      if (!res.ok) throw new Error("Failed to fetch");

      const data = await res.json();

      setRestaurant(data.restuarant || null);
      setFoods(Array.isArray(data.food) ? data.food : []);
    } catch (error) {
      console.error(error);
      setRestaurant(null);
      setFoods([]);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
   
    return (
      

      <div className="min-h-screen flex items-center justify-center text-gray-500">
        Loading restaurant...
      </div>
    );
  }

  if (!restaurant) {
    return (
      <div className="min-h-screen flex items-center justify-center text-red-500">
        Restaurant not found
      </div>
    );
  }

  return (
    
    <main className="min-h-screen bg-gradient-to-br from-gray-100 to-gray-200">
      {/* Header */}
       <CustomerHeader  cartdata={cart} />
      <section className="sticky top-0 z-10 backdrop-blur-xl bg-white/70 border-b">
        <div className="max-w-6xl mx-auto px-6 py-6">
          <h1 className="text-3xl font-semibold text-gray-900">
            {restaurant.restuarant}
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
                className="bg-white/80 backdrop-blur-lg rounded-2xl shadow-md hover:shadow-xl transition-all hover:-translate-y-1"
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

                  <p className="text-xs text-gray-500 mt-1">
                    {food.description}
                  </p>

                  <div className="flex items-center justify-between mt-4">
                    <span className="font-semibold text-gray-900">
                      ₹{food.price}
                    </span>

                    <button onClick={() => {
                      handleclick(food)
                    }} className="px-4 py-1.5 text-sm rounded-full bg-orange-500 text-white hover:bg-orange-600 transition active:scale-95">
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
