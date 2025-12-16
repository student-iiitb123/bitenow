"use client";

import React, { useEffect } from "react";
import { useParams, useSearchParams } from "next/navigation";

const Page = () => {
  const params = useParams();
  const searchParams = useSearchParams();

  const name = params.name;
  const id = searchParams.get("id");

  useEffect(() => {
    if (id) {
      loadRestaurantDetails();
    }
  }, [id]);

  const loadRestaurantDetails = async () => {
    try {
      const response = await fetch(
       `http://localhost:3000/api/restuarant/customers/${id}`
      );
      const data = await response.json();
      console.log(data);
    } catch (error) {
      console.error("Fetch error:", error);
    }
  };

  return (
    <main className="relative min-h-screen overflow-hidden bg-gradient-to-r from-orange-500 to-orange-600">
      {/* Decorative Images */}
      <img
        src="https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto/portal/testing/seo-home/Veggies_new.png"
        className="hidden md:block absolute left-0 top-32 w-56 opacity-90"
        alt="Veggies"
      />

      <img
        src="https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto/portal/testing/seo-home/Sushi_replace.png"
        className="hidden md:block absolute right-0 top-20 w-60 opacity-90"
        alt="Sushi"
      />

      {/* HERO SECTION */}
      <section className="relative z-10 flex flex-col items-center justify-center text-center px-4 py-24">
        <h1 className="text-white text-3xl sm:text-4xl md:text-5xl font-extrabold leading-tight mb-4">
          {decodeURIComponent(name)}
        </h1>

        <p className="text-white/90 max-w-xl text-sm sm:text-base">
          Restaurant ID: {id}
        </p>
      </section>
    </main>
  );
};

export default Page;
