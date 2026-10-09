"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import CustomerHeader from "../../_components/CustomerHeader";
import Footer from "../../_components/Footer";
import { FoodCardSkeleton } from "../../_components/ui/Skeleton";
import { EmptyState } from "../../_components/ui/EmptyState";
import { MapPin, Phone, Mail, Star, UtensilsCrossed, Plus, Check } from "lucide-react";

export default function RestaurantPage() {
  const searchParams = useSearchParams();
  const id = searchParams.get("id");

  const [restaurant, setRestaurant] = useState(null);
  const [foods, setFoods] = useState([]);
  const [loading, setLoading] = useState(true);
  const [cartItemToAdd, setCartItemToAdd] = useState(null);
  const [cartStorage, setCartStorage] = useState([]);
  const [cartIds, setCartIds] = useState([]);
  const [removecartdata, setremovecartdata] = useState(null);

  const removefromCart = (foodId) => {
    const updatedCart = cartStorage.filter((item) => item._id !== foodId);
    setCartStorage(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
    setCartIds(updatedCart.map((item) => item._id));
    setremovecartdata(foodId);
  };

  useEffect(() => {
    if (Array.isArray(cartStorage)) {
      setCartIds(cartStorage.map((item) => item._id));
    }
  }, [cartStorage]);

  useEffect(() => {
    const storedCart = JSON.parse(localStorage.getItem("cart")) || [];
    setCartStorage(storedCart);
  }, []);

  const handleclick = (food) => {
    setCartItemToAdd(food);
    const existingIdx = cartStorage.findIndex((item) => item._id === food._id);
    let updatedCart;
    if (existingIdx >= 0) {
      updatedCart = cartStorage.map((item, idx) =>
        idx === existingIdx ? { ...item, quantity: (item.quantity || 1) + 1 } : item
      );
    } else {
      updatedCart = [...cartStorage, { ...food, quantity: 1 }];
    }
    setCartStorage(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
  };

  useEffect(() => {
    if (id) loadData();
  }, [id]);

  const loadData = async () => {
    try {
      setLoading(true);
      const res = await fetch(`/api/restuarant/customers/${id}`);
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
      <div className="min-h-screen bg-[#F7F5EF] flex flex-col font-sans">
        <CustomerHeader />
        <div className="max-w-6xl mx-auto px-6 py-12 w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
          <FoodCardSkeleton />
          <FoodCardSkeleton />
          <FoodCardSkeleton />
          <FoodCardSkeleton />
        </div>
        <Footer />
      </div>
    );
  }

  if (!restaurant) {
    return (
      <div className="min-h-screen bg-[#F7F5EF] flex flex-col font-sans">
        <CustomerHeader />
        <div className="max-w-4xl mx-auto px-6 py-16 w-full text-center">
          <EmptyState
            icon={UtensilsCrossed}
            title="Restaurant Not Found"
            description="We couldn't find the restaurant you were looking for."
            actionText="Browse All Restaurants"
            actionHref="/allrestuarants"
          />
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-[#F7F5EF] flex flex-col font-sans">
      <CustomerHeader cartdata={cartItemToAdd} removecartdata={removecartdata} />

      {/* RESTAURANT BANNER HEADER */}
      <section className="bg-[#142E23] text-white py-12 border-b border-[#1A382B]">
        <div className="max-w-6xl mx-auto px-6">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div className="space-y-2">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#244C3A] text-xs font-bold text-[#F2994A]">
                <Star size={12} className="fill-current" />
                <span>4.8 Rating</span>
              </div>
              <h1 className="text-3xl md:text-5xl font-black tracking-tight text-white">
                {restaurant.restuarant}
              </h1>
              <p className="text-sm text-[#C1D8CD] flex items-center gap-1">
                <MapPin size={14} className="text-[#84948A]" />
                <span>{restaurant.address}, {restaurant.city}</span>
              </p>
            </div>

            {/* CONTACT CARD */}
            <div className="bg-[#1A382B] border border-[#244C3A] p-4 rounded-2xl space-y-2 text-xs text-[#C1D8CD]">
              <div className="flex items-center gap-2">
                <Phone size={14} className="text-[#F2994A]" />
                <span>{restaurant.phone}</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail size={14} className="text-[#F2994A]" />
                <span>{restaurant.email}</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FOOD MENU SECTION */}
      <section className="max-w-6xl mx-auto px-6 py-12 w-full flex-1">
        <div className="flex items-center justify-between mb-8">
          <div>
            <span className="text-xs font-bold text-[#E86A33] uppercase tracking-wider">Menu</span>
            <h2 className="text-2xl font-black text-[#1E2923] mt-1">
              Popular Menu Items
            </h2>
          </div>
          <span className="text-xs text-[#57685D] font-medium">
            {foods.length} items available
          </span>
        </div>

        {foods.length === 0 ? (
          <EmptyState
            icon={UtensilsCrossed}
            title="No food items available"
            description="This restaurant hasn't added any menu items yet."
          />
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {foods.map((food) => (
              <div
                key={food._id}
                className="bg-white rounded-2xl border border-[#E2ECE5] shadow-xs hover:shadow-xl transition-all duration-300 hover:-translate-y-1 flex flex-col justify-between p-3"
              >
                {/* IMAGE */}
                <div className="h-40 overflow-hidden rounded-xl relative bg-[#F7F5EF]">
                  <img
                    src={food.path || "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=500&q=80"}
                    alt={food.name}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute bottom-2 left-2 bg-white/90 backdrop-blur-md px-2.5 py-1 rounded-md text-xs font-bold text-[#1E2923]">
                    ₹{food.price}
                  </div>
                </div>

                {/* INFO */}
                <div className="p-2 pt-3 flex-1 flex flex-col justify-between">
                  <div>
                    <h3 className="font-bold text-[#1E2923] text-base mb-1 line-clamp-1">
                      {food.name}
                    </h3>
                    <p className="text-xs text-[#57685D] line-clamp-2 mb-4">
                      {food.description}
                    </p>
                  </div>

                  {/* ADD/REMOVE CONTROLS */}
                  <div className="pt-2 border-t border-[#E2ECE5] flex items-center justify-between">
                    <span className="text-sm font-black text-[#244C3A]">
                      ₹{food.price}
                    </span>

                    {cartIds.includes(food._id) ? (
                      <button
                        onClick={() => removefromCart(food._id)}
                        className="px-3.5 py-1.5 text-xs font-bold rounded-full bg-red-50 text-red-600 hover:bg-red-100 border border-red-200 transition-all flex items-center gap-1"
                      >
                        <span>Remove</span>
                      </button>
                    ) : (
                      <button
                        onClick={() => handleclick(food)}
                        className="px-4 py-1.5 text-xs font-bold rounded-full bg-[#244C3A] text-white hover:bg-[#1A382B] transition-all flex items-center gap-1 shadow-xs"
                      >
                        <Plus size={14} />
                        <span>Add</span>
                      </button>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      <Footer />
    </main>
  );
}