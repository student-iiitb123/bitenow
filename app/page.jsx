"use client";

import { useEffect, useState } from "react";
import CustomerHeader from "./_components/CustomerHeader";
import LocationInput from "./_components/LocationSearchBar";
import Footer from "./_components/Footer";

export default function Home() {
  const [area, setArea] = useState([]);
  const [restuarant, setResturant] = useState([]);

  // Load restaurants
  useEffect(() => {
    loadRestuarant();
  }, []);

  const loadRestuarant = async (params) => {
    let url = "http://localhost:3000/api/restuarant/customers";

    if (params?.location) {
      url = url + "?location=" + params.location;
    }
    else if(params?.restuarant){
      url = url + "?restuarant=" + params.restuarant;
    }

    const res = await fetch(url);
    const data = await res.json();

    if (data.return) {
      setResturant(data.result);
    }
  };

  // Load location
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

      {/* Decorative Image */}
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
             <LocationInput loadResturant={loadRestuarant} />

            </div>

            {/* SEARCH */}
            <div className="flex items-center gap-3 w-full md:w-2/3 bg-white rounded-full px-5 py-3 shadow hover:shadow-lg transition">
              <input
              onChange={(e) => {
                 loadRestuarant({restuarant:e.target.value})
              }}
                type="text"
                placeholder="Search restaurant or food"
                className="w-full outline-none text-gray-800 placeholder-gray-400 text-sm md:text-base"
              />
              <span className="text-gray-500 text-xl hover:text-orange-500">🔍</span>
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

          {/* Inline restaurant list */}
          {restuarant.length === 0 ? (
            <p className="text-gray-500 text-center">No restaurants found</p>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {restuarant.map((item, index) => (
                <div
                  key={index}
                  className="bg-white rounded-2xl shadow-md hover:shadow-xl transition duration-300 overflow-hidden cursor-pointer"
                >
                  {/* Image placeholder */}
                  <div className="h-40 bg-gray-200 flex items-center justify-center">
                    <span className="text-gray-400 text-sm">Restaurant Image</span>
                  </div>

                  {/* Content */}
                  <div className="p-4">
                    <h3 className="text-lg font-semibold text-gray-800 mb-1">{item.restuarant}</h3>
                    <p className="text-sm text-gray-500 mb-2">📍 {item.city}</p>
                    <div className="flex items-center justify-between text-sm">
                      <span className="bg-green-100 text-green-700 px-2 py-1 rounded-full font-medium">
                        {item.email}
                      </span>
                      <span className="text-gray-600">25–30 min</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      <Footer />
    </main>
  );
}
