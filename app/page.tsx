"use client";

import { useEffect, useState } from "react";
import CustomerHeader from "./_components/CustomerHeader";
import LocationInput from "./_components/LocationSearchBar";
import ResturantListing from "./_components/ResturantListing";
import Footer from "./_components/Footer";

export default function Home() {
  const [area, setArea] = useState([]);

  useEffect(() => {
    loadLocations();
  }, []);

  const loadLocations = async () => {
    let response = await fetch(
      "http://localhost:3000/api/restuarant/customers/location"
    );
    response = await response.json();

    if (response.success) {
      setArea(response.result);
    }
  };

  return (
    <main className="min-h-screen bg-gradient-to-r from-orange-500 to-orange-600 overflow-hidden">
      <CustomerHeader />

      {/* Decorative Images */}
      <img
        src="https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto/portal/testing/seo-home/Veggies_new.png"
        className="hidden md:block absolute left-0 top-32 w-56 opacity-90"
        alt=""
      />
      <img
        src="https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto/portal/testing/seo-home/Sushi_replace.png"
        className="hidden md:block absolute right-0 top-20 w-60 opacity-90"
        alt=""
      />

      {/* HERO SECTION */}
      <section className="relative z-10 flex flex-col items-center text-center px-4 py-20">
        <h1 className="text-white text-3xl sm:text-4xl md:text-5xl font-extrabold leading-tight mb-10">
          Order food & groceries <br />
          Discover best restaurants <br />
          <span className="text-yellow-200">BiteNow it!</span>
        </h1>

        {/* SEARCH BAR */}
        <div className="bg-white/20 backdrop-blur-md p-4 rounded-3xl w-full max-w-4xl shadow-xl">
          <div className="flex flex-col md:flex-row gap-4">
            
            {/* LOCATION */}
            <div className="flex items-center gap-3 w-full md:w-1/3 bg-white rounded-full px-5 py-3 shadow hover:shadow-lg transition">
              <span className="text-orange-500 text-lg">📍</span>
              <LocationInput />
            </div>

            {/* SEARCH */}
            <div className="flex items-center gap-3 w-full md:w-2/3 bg-white rounded-full px-5 py-3 shadow hover:shadow-lg transition">
              <input
                type="text"
                placeholder="Search restaurant or food"
                className="w-full outline-none text-gray-800 placeholder-gray-400 text-sm md:text-base"
              />
              <span className="text-gray-500 text-xl hover:text-orange-500">
                🔍
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* RESTAURANT LIST */}
      <section className="bg-gray-50 rounded-t-3xl mt-16 px-4 py-10">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-2xl font-bold mb-6 text-gray-800">
            Popular Restaurants Near You
          </h2>

          <ResturantListing />
        </div>
      </section>

      <Footer />
    </main>
  );
}
