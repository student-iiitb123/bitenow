"use client";

import { useEffect, useState } from "react";
import CustomerHeader from "../_components/CustomerHeader";
import Footer from "../_components/Footer";
import { RestaurantCardSkeleton } from "../_components/ui/Skeleton";
import { EmptyState } from "../_components/ui/EmptyState";
import { useRouter } from "next/navigation";
import { Search, MapPin, Star, Clock, UtensilsCrossed } from "lucide-react";

export default function RestaurantPage() {
  const router = useRouter();

  const [restuarant, setRestuarant] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");

  const handleResturant = (name, id) => {
    router.push(`/explore/${encodeURIComponent(name)}?id=${id}`);
  };

  useEffect(() => {
    fetchRestaurants();
  }, []);

  const fetchRestaurants = async (query = "") => {
    try {
      setLoading(true);
      let url = "/api/restuarant/customers";
      if (query) url += `?restuarant=${encodeURIComponent(query)}`;

      const res = await fetch(url);
      const data = await res.json();

      if (Array.isArray(data)) {
        setRestuarant(data);
      } else if (Array.isArray(data?.result)) {
        setRestuarant(data.result);
      } else {
        setRestuarant([]);
      }
    } catch (error) {
      console.error("Failed to load restaurants", error);
      setRestuarant([]);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (e) => {
    const val = e.target.value;
    setSearchQuery(val);
    fetchRestaurants(val);
  };

  return (
    <div className="min-h-screen bg-[#F7F5EF] flex flex-col font-sans">
      <CustomerHeader />

      {/* HEADER BANNER */}
      <section className="bg-[#142E23] text-white py-12 px-6">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div>
            <span className="text-xs font-bold text-[#F2994A] uppercase tracking-wider">Directory</span>
            <h1 className="text-3xl md:text-4xl font-black text-white mt-1">
              All Restaurants
            </h1>
            <p className="text-sm text-[#C1D8CD] mt-2 max-w-xl">
              Explore our full selection of partner restaurants and order your favorite meals.
            </p>
          </div>

          {/* SEARCH INPUT */}
          <div className="w-full md:w-80 bg-white rounded-2xl p-2 flex items-center gap-2 border border-[#E2ECE5] shadow-md">
            <Search size={18} className="text-[#244C3A] ml-2 shrink-0" />
            <input
              type="text"
              placeholder="Search by restaurant name..."
              value={searchQuery}
              onChange={handleSearch}
              className="w-full outline-none text-sm text-[#1E2923] placeholder-[#84948A] py-1"
            />
          </div>
        </div>
      </section>

      {/* MAIN LISTING GRID */}
      <main className="max-w-7xl mx-auto px-6 py-12 w-full flex-1">
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <RestaurantCardSkeleton />
            <RestaurantCardSkeleton />
            <RestaurantCardSkeleton />
            <RestaurantCardSkeleton />
            <RestaurantCardSkeleton />
            <RestaurantCardSkeleton />
          </div>
        ) : restuarant.length === 0 ? (
          <EmptyState
            icon={UtensilsCrossed}
            title="No restaurants available"
            description={
              searchQuery
                ? `No restaurants matching "${searchQuery}".`
                : "There are currently no restaurants registered in the system."
            }
            actionText={searchQuery ? "Clear Search" : null}
            onAction={() => {
              setSearchQuery("");
              fetchRestaurants();
            }}
          />
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {restuarant.map((item) => (
              <div
                key={item._id}
                onClick={() => handleResturant(item.restuarant, item._id)}
                className="group cursor-pointer bg-white rounded-2xl overflow-hidden border border-[#E2ECE5] shadow-xs hover:shadow-xl transition-all duration-300 hover:-translate-y-1 flex flex-col"
              >
                {/* IMAGE */}
                <div className="h-52 overflow-hidden relative bg-[#F7F5EF]">
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
                    <h4 className="text-xl font-bold text-[#1E2923] group-hover:text-[#244C3A] transition-colors truncate mb-1">
                      {item.restuarant}
                    </h4>

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
                      <span>{item.time || "20-30 mins"}</span>
                    </span>
                    <span className="text-[#E86A33] bg-[#FDF1EC] px-3 py-1 rounded-full font-bold">
                      View Menu →
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}
