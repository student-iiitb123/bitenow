"use client";

import { useEffect, useState, useRef } from "react";
import CustomerHeader from "./_components/CustomerHeader";
import LocationInput from "./_components/LocationSearchBar";
import Footer from "./_components/Footer";
import { useRouter } from "next/navigation";
import { MapPin, Search } from "lucide-react";
import { motion } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

//Home Section

export default function Home() {
  const router = useRouter();
  const [restuarant, setResturant] = useState([]);
  const cardsRef = useRef([]);

  useEffect(() => {
    loadRestuarant();
    loadLocations();
  }, []);

  useEffect(() => {
    cardsRef.current.forEach((card) => {
      if (!card) return;
      gsap.fromTo(
        card,
        { opacity: 0, y: 60 },
        {
          opacity: 1,
          y: 0,
          duration: 0.9,
          ease: "power3.out",
          scrollTrigger: {
            trigger: card,
            start: "top 85%",
          },
        }
      );
    });
  }, [restuarant]);

  const loadRestuarant = async (params) => {
    let url = "http://localhost:3000/api/restuarant/customers";
    if (params?.location) url += "?location=" + params.location;
    else if (params?.restuarant) url += "?restuarant=" + params.restuarant;

    const res = await fetch(url);
    const data = await res.json();
    if (data?.return) setResturant(data.result);
  };

  const loadLocations = async () => {
    await fetch("http://localhost:3000/api/restuarant/customers/location");
  };

  const handleResturant = (restuarant, id) => {
    router.push("/explore/" + restuarant + "?id=" + id);
  };

  return (
    <main className="min-h-screen bg-[#F4F1EC] text-[#2F3E34] overflow-hidden">
      <CustomerHeader />

      {/* HERO SECTION */}
<<<<<<< HEAD
      <motion.section
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        className="relative flex flex-col items-center text-center px-6 pt-32 pb-40 overflow-hidden"
      >
        {/* VIDEO BG */}
        <video
          autoPlay
          loop
          muted
          className="absolute inset-0 w-full h-full object-cover z-0"
        >
          <source
            src="/vidios/6288300-sd_960_540_25fps.mp4"
            type="video/mp4"
          />
        </video>
=======
<motion.section
  initial={{ opacity: 0, y: 50 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 1 }}
  className="relative flex flex-col items-center text-center px-6 pt-32 pb-40 overflow-hidden"
>
  {/* VIDEO BACKGROUND */}
  <video
    autoPlay
    loop
    muted
    className="absolute top-0 left-0 w-full h-full object-cover z-0"
  >
    <source src="/vidios/6288300-sd_960_540_25fps.mp4" type="video/mp4" />
    Your browser does not support the video tag.
  </video>
>>>>>>> 85c60063cff4d2b878cb36267c194ad576268945

        <div className="relative z-10 w-full max-w-3xl">
          <h1 className="text-4xl md:text-6xl font-semibold text-white">
            Delicious food delivered <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#6F8F73] to-[#4F6B57]">
              Fresh. Fast. BiteNow.
            </span>
          </h1>

          <p className="mt-4 text-[#F4F1EC]">
            Discover hand-picked restaurants and enjoy a calm, premium food
            delivery experience.
          </p>

          {/* SEARCH */}
          <div className="mt-10 flex flex-col sm:flex-row gap-4 bg-[#ffffff80] backdrop-blur-lg rounded-3xl p-4">
            <div className="flex items-center gap-2 bg-white rounded-full px-4 py-2 flex-1">
              <MapPin className="w-5 h-5 text-[#6F8F73]" />
              <LocationInput loadResturant={loadRestuarant} />
            </div>

            <div className="flex items-center gap-2 bg-white rounded-full px-4 py-2 flex-1">
              <Search className="w-5 h-5 text-[#6F8F73]" />
              <input
                type="text"
                placeholder="Search restaurants"
                onChange={(e) =>
                  loadRestuarant({ restuarant: e.target.value })
                }
                className="w-full outline-none"
              />
            </div>
          </div>
        </div>
      </motion.section>

      {/* RESTAURANTS PREVIEW */}
      <section className="relative z-10 py-24 bg-[#F4F1EC] rounded-t-[4rem] px-6">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-end justify-between mb-10">
            <h2 className="text-2xl font-semibold">
              Popular Restaurants Near You
            </h2>

            {/* 🔥 NAVIGATE TO PAGE */}
            <button
              onClick={() => router.push("/restuarants")}
              className="border border-black px-5 py-2 rounded-full
                         hover:bg-black hover:text-white transition"
            >
              See all Restaurants →
            </button>
          </div>

          {restuarant.length === 0 ? (
            <p className="text-gray-500">No restaurants found</p>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {restuarant.slice(0, 8).map((item, index) => (
                <div
                  key={index}
                  ref={(el) => (cardsRef.current[index] = el)}
                  onClick={() =>
                    handleResturant(item.restuarant, item._id)
                  }
                  className="cursor-pointer bg-white rounded-xl overflow-hidden
                             border hover:shadow-lg transition"
                >
<<<<<<< HEAD
                  <img
                    src={item.image || "/assets/img/home-1/visit1.jpg"}
                    className="h-48 w-full object-cover"
                  />

                  <div className="p-4">
                    <h6 className="font-semibold truncate">
=======
                  {/* IMAGE */}
                  <div className="h-48 bg-gradient-to-br from-[#8FAE8B] to-[#6F8F73] flex items-center justify-center">
                    <span className="text-white text-sm opacity-80">
                      Restaurant Image
                    </span>
                  </div>
                 
                  {/* CONTENT */}
                  <div className="p-6">
                    <h3 className="text-xl font-semibold mb-1">
>>>>>>> 85c60063cff4d2b878cb36267c194ad576268945
                      {item.restuarant}
                    </h6>
                    <p className="text-sm text-gray-600">
                      ⭐ {item.rating || "4.8"} • ⏱ {item.time || "20-30 mins"}
                    </p>
                    <p className="text-sm text-gray-600">
                      📍 {item.city}
                    </p>
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
