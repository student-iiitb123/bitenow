"use client";

import { useEffect, useState } from "react";
import CustomerHeader from "../_components/CustomerHeader";
import Footer from "../_components/Footer";
import { useRouter } from "next/navigation";

export default function RestaurantPage() {
  const router = useRouter();

  //  ALWAYS ARRAY
  const [restuarant, setRestuarant] = useState([]);
  const [loading, setLoading] = useState(true);

  const handleResturant = (name, id) => {
    router.push(`/explore/${name}?id=${id}`);
  };

  useEffect(() => {
    const fetchRestaurants = async () => {
      try {
        const res = await fetch("/api/restuarant/customers");
        const data = await res.json();

        // normalize response
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

    fetchRestaurants();
  }, []);

  return (
    <>
      <CustomerHeader />

      <section className="relative py-24 bg-[#F4F1EC]">
        <div className="max-w-7xl mx-auto px-4">

          <h2 className="text-3xl font-semibold mb-12">
            All Restaurants
          </h2>

          {/*LOADING */}
          {loading && (
            <p className="text-center py-20 font-medium">
              Loading restaurants...
            </p>
          )}

          {/*  EMPTY STATE */}
          {!loading && restuarant.length === 0 && (
            <p className="text-center py-20 text-gray-500">
              No restaurants found
            </p>
          )}

          {/*  SAFE MAP */}
          {!loading && restuarant.length > 0 && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {restuarant.map((item, index) => (
                <div
                  key={index}
                  onClick={() =>
                    handleResturant(item.restuarant, item._id)
                  }
                  className="group cursor-pointer bg-white rounded-xl overflow-hidden
                             border shadow hover:shadow-xl transition hover:-translate-y-1"
                >
                  {/* IMAGE */}
                  <img
                    src={
                      item.image ||
                      "/assets/img/inner/restaurant-list1.png"
                    }
                    alt={item.restuarant}
                    className="w-full h-56 object-cover"
                  />

                  {/* CONTENT */}
                  <div className="p-4">
                    <h4 className="font-semibold mb-1 truncate">
                      {item.restuarant}
                    </h4>

                    <p className="text-sm text-gray-600">
                    {item.rating || 4.8} • ⏱{" "}
                      {item.time || "20-30 mins"}
                    </p>

                    <p className="text-sm text-gray-600">
                     {item.city}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          )}

        </div>
      </section>

      <Footer />
    </>
  );
}
