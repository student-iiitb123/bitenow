"use client";

import { useEffect, useState, useRef } from "react";
import CustomerHeader from "./_components/CustomerHeader";
import LocationInput from "./_components/LocationSearchBar";
import Footer from "./_components/Footer";
import { RestaurantCardSkeleton } from "./_components/ui/Skeleton";
import { EmptyState } from "./_components/ui/EmptyState";
import { useRouter } from "next/navigation";
import { MapPin, Search, Star, Clock, Sparkles, ShieldCheck, Truck, UtensilsCrossed, ArrowRight } from "lucide-react";

const CATEGORIES = [
  { name: "All Foods", icon: "🍱" },
  { name: "Burgers", icon: "🍔" },
  { name: "Pizza", icon: "🍕" },
  { name: "Indian", icon: "🍛" },
  { name: "Asian", icon: "🍜" },
  { name: "Desserts", icon: "🍰" },
  { name: "Healthy", icon: "🥗" },
];

export default function Home() {
  const router = useRouter();
  const [restuarant, setResturant] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState("All Foods");
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    loadRestuarant();
  }, []);

  const loadRestuarant = async (params) => {
    try {
      setLoading(true);
      let url = "/api/restuarant/customers";
      if (params?.location) url += "?location=" + encodeURIComponent(params.location);
      else if (params?.restuarant) url += "?restuarant=" + encodeURIComponent(params.restuarant);

      const res = await fetch(url);
      const data = await res.json();
      if (data?.return || data?.success) {
        setResturant(data.result || []);
      }
    } catch (err) {
      console.error("Load restaurants error:", err);
      setResturant([]);
    } finally {
      setLoading(false);
    }
  };

  const handleSearchChange = (e) => {
    const val = e.target.value;
    setSearchQuery(val);
    loadRestuarant({ restuarant: val });
  };

  const handleResturantClick = (name, id) => {
    router.push(`/explore/${encodeURIComponent(name)}?id=${id}`);
  };

  return (
    <main className="min-h-screen bg-[#F7F5EF] flex flex-col font-sans">
      <CustomerHeader />

      {/* HERO SECTION */}
      <section className="relative bg-[#142E23] text-white pt-16 pb-24 px-6 overflow-hidden">
        {/* Decorative background glow */}
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-[#244C3A] rounded-full blur-3xl opacity-40 pointer-events-none" />
        <div className="absolute bottom-0 right-10 w-80 h-80 bg-[#E86A33] rounded-full blur-3xl opacity-15 pointer-events-none" />

        <div className="max-w-7xl mx-auto relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#244C3A] border border-[#3B7A5E] text-xs font-semibold text-[#F2994A]">
              <Sparkles size={14} />
              <span>Premium Food Delivery Service</span>
            </div>

            <h1 className="text-4xl md:text-6xl font-black tracking-tight leading-tight text-white">
              Crave it? <br />
              <span className="text-[#F2994A]">BiteNow</span> delivers it fresh.
            </h1>

            <p className="text-base md:text-lg text-[#C1D8CD] max-w-xl mx-auto lg:mx-0 leading-relaxed">
              Discover hand-picked restaurants in your city. Premium quality meals prepared by top chefs and delivered right to your door.
            </p>

            {/* SEARCH AND LOCATION BAR */}
            <div className="pt-4 max-w-2xl mx-auto lg:mx-0">
              <div className="bg-white rounded-3xl p-2.5 shadow-xl flex flex-col sm:flex-row gap-2 border border-[#E2ECE5]">
                {/* Location Picker */}
                <div className="flex items-center gap-3 bg-[#F7F5EF] rounded-2xl px-4 py-3 sm:w-1/2 border border-[#E2ECE5]">
                  <MapPin className="w-5 h-5 text-[#244C3A] shrink-0" />
                  <LocationInput loadResturant={loadRestuarant} />
                </div>

                {/* Restaurant Search */}
                <div className="flex items-center gap-3 bg-[#F7F5EF] rounded-2xl px-4 py-3 sm:w-1/2 border border-[#E2ECE5]">
                  <Search className="w-5 h-5 text-[#244C3A] shrink-0" />
                  <input
                    type="text"
                    placeholder="Search restaurant..."
                    value={searchQuery}
                    onChange={handleSearchChange}
                    className="w-full outline-none bg-transparent text-[#1E2923] placeholder-[#84948A] text-sm font-medium"
                  />
                </div>
              </div>
            </div>

            {/* QUICK STATS */}
            <div className="pt-6 flex items-center justify-center lg:justify-start gap-8 text-xs text-[#C1D8CD]">
              <div className="flex items-center gap-2">
                <ShieldCheck size={16} className="text-[#F2994A]" />
                <span>Verified Kitchens</span>
              </div>
              <div className="flex items-center gap-2">
                <Truck size={16} className="text-[#F2994A]" />
                <span>Fast 30-Min Delivery</span>
              </div>
            </div>
          </div>

          {/* HERO IMAGE */}
          <div className="lg:col-span-5 relative hidden lg:block">
            <div className="relative mx-auto w-full max-w-md aspect-square rounded-3xl overflow-hidden shadow-2xl border-4 border-[#244C3A]">
              <img
                src="https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=800&q=80"
                alt="Delicious Food"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#142E23]/80 via-transparent to-transparent" />
              <div className="absolute bottom-6 left-6 right-6 bg-white/90 backdrop-blur-md rounded-2xl p-4 border border-white/40 shadow-lg">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-[#E86A33] text-white flex items-center justify-center font-bold">
                    🔥
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-[#1E2923]">Top Rated Quality</h4>
                    <p className="text-xs text-[#57685D]">100% Verified hygiene standards</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CATEGORY BAR */}
      <section className="max-w-7xl mx-auto px-6 -mt-8 relative z-20 w-full">
        <div className="bg-white rounded-2xl p-4 shadow-md border border-[#E2ECE5] flex items-center gap-3 overflow-x-auto no-scrollbar">
          {CATEGORIES.map((cat) => (
            <button
              key={cat.name}
              onClick={() => setActiveCategory(cat.name)}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold whitespace-nowrap transition-all ${
                activeCategory === cat.name
                  ? "bg-[#244C3A] text-white shadow-xs"
                  : "bg-[#F7F5EF] text-[#57685D] hover:bg-[#E6EFEA] hover:text-[#244C3A]"
              }`}
            >
              <span>{cat.icon}</span>
              <span>{cat.name}</span>
            </button>
          ))}
        </div>
      </section>

      {/* POPULAR RESTAURANTS SECTION */}
      <section className="max-w-7xl mx-auto px-6 py-16 w-full flex-1">
        <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between mb-8 gap-4">
          <div>
            <span className="text-xs font-bold text-[#E86A33] uppercase tracking-wider">Top Destinations</span>
            <h2 className="text-3xl font-black text-[#1E2923] mt-1">
              Popular Restaurants Near You
            </h2>
          </div>

          <button
            onClick={() => router.push("/allrestuarants")}
            className="flex items-center gap-2 px-5 py-2.5 rounded-full bg-white border border-[#E2ECE5] text-sm font-bold text-[#244C3A] hover:bg-[#E6EFEA] transition-all shadow-xs"
          >
            <span>See all Restaurants</span>
            <ArrowRight size={16} />
          </button>
        </div>

        {/* LOADING SKELETONS */}
        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <RestaurantCardSkeleton />
            <RestaurantCardSkeleton />
            <RestaurantCardSkeleton />
            <RestaurantCardSkeleton />
          </div>
        ) : restuarant.length === 0 ? (
          <EmptyState
            icon={UtensilsCrossed}
            title="No restaurants found"
            description="We couldn't find any restaurants matching your search. Try searching for a different city or restaurant name."
            actionText="View All Restaurants"
            onAction={() => {
              setSearchQuery("");
              loadRestuarant();
            }}
          />
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {restuarant.slice(0, 8).map((item) => (
              <div
                key={item._id}
                onClick={() => handleResturantClick(item.restuarant, item._id)}
                className="group cursor-pointer bg-white rounded-2xl overflow-hidden border border-[#E2ECE5] shadow-xs hover:shadow-xl transition-all duration-300 hover:-translate-y-1 flex flex-col"
              >
                {/* IMAGE WITH BADGE */}
                <div className="h-48 overflow-hidden relative bg-[#F7F5EF]">
                  <img
                    src={
                      item.image ||
                      "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=600&q=80"
                    }
                    alt={item.restuarant}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-md px-2.5 py-1 rounded-full text-xs font-bold text-[#1E2923] flex items-center gap-1 shadow-xs">
                    <Star size={12} className="text-amber-500 fill-amber-500" />
                    <span>{item.rating || "4.8"}</span>
                  </div>
                </div>

                {/* CONTENT */}
                <div className="p-5 flex-1 flex flex-col justify-between">
                  <div>
                    <h3 className="text-lg font-bold text-[#1E2923] group-hover:text-[#244C3A] transition-colors truncate mb-1">
                      {item.restuarant}
                    </h3>
                    <p className="text-xs font-medium text-[#57685D] mb-3 flex items-center gap-1">
                      <MapPin size={12} className="text-[#84948A]" />
                      <span>{item.city}</span>
                      <span className="mx-1">•</span>
                      <span>{item.address}</span>
                    </p>
                  </div>

                  <div className="pt-3 border-t border-[#E2ECE5] flex items-center justify-between text-xs font-semibold text-[#57685D]">
                    <span className="flex items-center gap-1">
                      <Clock size={14} className="text-[#244C3A]" />
                      <span>20-30 min</span>
                    </span>
                    <span className="text-[#E86A33] bg-[#FDF1EC] px-2.5 py-1 rounded-md">
                      Explore Menu →
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* PROMOTIONAL FEATURE SECTION */}
      <section className="bg-white border-t border-[#E2ECE5] py-16 px-6">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
          <div className="p-6 rounded-2xl bg-[#F7F5EF] border border-[#E2ECE5] space-y-3">
            <div className="w-12 h-12 rounded-xl bg-[#244C3A] text-white flex items-center justify-center mx-auto text-xl">
              🍳
            </div>
            <h3 className="text-lg font-bold text-[#1E2923]">Fresh Preparation</h3>
            <p className="text-xs text-[#57685D] leading-relaxed">
              Every meal is prepared fresh after your order is confirmed by our verified partner kitchens.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-[#F7F5EF] border border-[#E2ECE5] space-y-3">
            <div className="w-12 h-12 rounded-xl bg-[#E86A33] text-white flex items-center justify-center mx-auto text-xl">
              🚀
            </div>
            <h3 className="text-lg font-bold text-[#1E2923]">Express Delivery</h3>
            <p className="text-xs text-[#57685D] leading-relaxed">
              Hot and intact food delivered to your door with real-time status tracking.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-[#F7F5EF] border border-[#E2ECE5] space-y-3">
            <div className="w-12 h-12 rounded-xl bg-[#244C3A] text-white flex items-center justify-center mx-auto text-xl">
              💳
            </div>
            <h3 className="text-lg font-bold text-[#1E2923]">Honest Pricing</h3>
            <p className="text-xs text-[#57685D] leading-relaxed">
              No hidden fees. Server-validated pricing with Cash on Delivery support.
            </p>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
