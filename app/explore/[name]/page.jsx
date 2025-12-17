"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
<<<<<<< HEAD
import { MapPin, Phone, Mail, Star } from "lucide-react";
=======
import CustomerHeader from "../../_components/CustomerHeader"
>>>>>>> 85c60063cff4d2b878cb36267c194ad576268945

export default function RestaurantPage() {
  const searchParams = useSearchParams();
  const id = searchParams.get("id");

  const [restaurant, setRestaurant] = useState(null);
  const [foods, setFoods] = useState([]);
  const [loading, setLoading] = useState(true);
<<<<<<< HEAD
=======
  const[cart,setCart] = useState();
>>>>>>> 85c60063cff4d2b878cb36267c194ad576268945


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
<<<<<<< HEAD
      const res = await fetch(
        `http://localhost:3000/api/restuarant/customers/${id}`
      );
      if (!res.ok) throw new Error("Failed to fetch");

      const data = await res.json();
      setRestaurant(data.restuarant || null);
      setFoods(Array.isArray(data.food) ? data.food : []);
    } catch (err) {
      console.error(err);
=======

      const res = await fetch(
        `http://localhost:3000/api/restuarant/customers/${id}`
      );

      if (!res.ok) throw new Error("Failed to fetch");

      const data = await res.json();

      setRestaurant(data.restuarant || null);
      setFoods(Array.isArray(data.food) ? data.food : []);
    } catch (error) {
      console.error(error);
>>>>>>> 85c60063cff4d2b878cb36267c194ad576268945
      setRestaurant(null);
      setFoods([]);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
<<<<<<< HEAD
=======
   
>>>>>>> 85c60063cff4d2b878cb36267c194ad576268945
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
<<<<<<< HEAD
=======

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
>>>>>>> 85c60063cff4d2b878cb36267c194ad576268945

  return (
    <main className="bg-[#f8f8f8] min-h-screen">
      {/* ================= HERO ================= */}
      <section className="relative h-[380px]">
        <img
          src={restaurant.image || "/restaurant-placeholder.jpg"}
          alt={restaurant.restuarant}
          className="w-full h-full object-cover"
        />

        {/* Overlay */}
        <div className="absolute inset-0 bg-black/40" />

        {/* Glass Card */}
        <div
          className="absolute bottom-6 left-1/2 -translate-x-1/2
                     w-[90%] md:w-[70%]
                     bg-white/80 backdrop-blur-xl
                     rounded-3xl p-6 shadow-xl"
        >
          <h1 className="text-3xl font-bold text-gray-900">
            {restaurant.restuarant}
          </h1>
          <p className="text-gray-600 mt-1">{restaurant.address}</p>

          <div className="flex flex-wrap gap-5 mt-3 text-sm text-gray-700">
            <span className="flex items-center gap-1">
              <MapPin size={16} /> {restaurant.city}
            </span>
            <span className="flex items-center gap-1">
              <Star size={16} className="text-yellow-500" /> 4.4
            </span>
            <span className="flex items-center gap-1">
              <Phone size={16} /> {restaurant.phone}
            </span>
            <span className="flex items-center gap-1">
              <Mail size={16} /> {restaurant.email}
            </span>
          </div>
        </div>
      </section>

      {/* ================= CATEGORY BAR ================= */}
      <section className="sticky top-0 z-20 bg-white border-b">
        <div className="max-w-5xl mx-auto px-4 py-3 flex gap-6 overflow-x-auto">
          {["Recommended", "Chawal", "Chicken", "Paneer"].map((cat) => (
            <button
              key={cat}
              className="text-sm font-medium whitespace-nowrap
                         text-gray-600 hover:text-orange-600"
            >
              {cat}
            </button>
          ))}
        </div>
      </section>

      {/* ================= MENU ================= */}
      <section className="max-w-5xl mx-auto px-4 py-10">
        <h2 className="text-2xl font-semibold mb-6">Recommended</h2>

        {foods.length === 0 ? (
          <p className="text-gray-500">No food items available</p>
        ) : (
          <div className="space-y-6">
            {foods.map((food) => (
              <div
                key={food._id}
<<<<<<< HEAD
                className="flex justify-between gap-4 p-5
                           bg-white rounded-2xl shadow-sm
                           hover:shadow-md transition"
=======
                className="bg-white/80 backdrop-blur-lg rounded-2xl shadow-md hover:shadow-xl transition-all hover:-translate-y-1"
>>>>>>> 85c60063cff4d2b878cb36267c194ad576268945
              >
                {/* LEFT */}
                <div className="flex-1">
                  <h3 className="font-semibold text-gray-900">
                    {food.name}
                  </h3>

<<<<<<< HEAD
                  <p className="text-sm text-gray-500 mt-1">
                    {food.category}
=======
                  <p className="text-xs text-gray-500 mt-1">
                    {food.description}
>>>>>>> 85c60063cff4d2b878cb36267c194ad576268945
                  </p>

                  <div className="flex items-center gap-2 mt-2">
                    <span className="font-medium text-gray-900">
                      ₹{food.price}
                    </span>
<<<<<<< HEAD
                    <span className="text-xs text-gray-400 line-through">
                      ₹{food.price + 40}
                    </span>
=======

                    <button onClick={() => {
                      handleclick(food)
                    }} className="px-4 py-1.5 text-sm rounded-full bg-orange-500 text-white hover:bg-orange-600 transition active:scale-95">
                      ADD
                    </button>
>>>>>>> 85c60063cff4d2b878cb36267c194ad576268945
                  </div>

                  <p className="text-sm text-gray-600 mt-2 max-w-md">
                    {food.description ||
                      "Chef special preparation with rich taste"}
                  </p>
                </div>

                {/* RIGHT */}
                <div className="relative w-28 h-24 shrink-0">
                  <img
                    src={food.path || "/food-placeholder.png"}
                    alt={food.name}
                    className="w-full h-full object-cover rounded-xl"
                  />
                  <button
                    className="absolute -bottom-3 left-1/2 -translate-x-1/2
                               bg-white text-green-600 border
                               px-4 py-1 text-sm rounded-full
                               shadow hover:bg-green-50"
                  >
                    ADD
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>
    </main>
  );
}
