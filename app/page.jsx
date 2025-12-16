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
    if (data.return) setResturant(data.result);
  };

  const loadLocations = async () => {
    await fetch("http://localhost:3000/api/restuarant/customers/location");
  };

  const handleResturant = (restuarant, id) => {
    router.push("explore/" + restuarant + "?id=" + id);
  };

  return (
    <main className="min-h-screen bg-[#F4F1EC] text-[#2F3E34] overflow-hidden">
      <CustomerHeader />

      {/* HERO SECTION */}
      {/* HERO SECTION */}
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

  {/* HERO CONTENT */}
  <div className="relative z-10 w-full max-w-3xl">
    <h1 className="text-4xl md:text-6xl font-semibold leading-tight tracking-tight text-white">
      Delicious food delivered <br />
      <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#6F8F73] to-[#4F6B57]">
        Fresh. Fast. BiteNow.
      </span>
    </h1>

    <p className="mt-4 text-[#F4F1EC] text-base md:text-lg">
      Discover hand-picked restaurants and enjoy a calm, premium food
      delivery experience.
    </p>

    {/* SEARCH BAR */}
    <div className="mt-10 flex flex-col sm:flex-row gap-4 bg-[#ffffff80] backdrop-blur-lg rounded-3xl p-4 shadow-lg">
      
      {/* LOCATION INPUT */}
      <div className="flex items-center gap-2 bg-white rounded-full px-4 py-2 flex-1 border border-[#6F8F73]/30">
        <MapPin className="w-5 h-5 text-[#6F8F73]" />
        <LocationInput loadResturant={loadRestuarant} />
      </div>

       //search bar
      <div className="flex items-center gap-2 bg-white rounded-full px-4 py-2 flex-1 border border-[#6F8F73]/30">
        <Search className="w-5 h-5 text-[#6F8F73]" />
        <input
          type="text"
          placeholder="Search restaurants or dishes"
          onChange={(e) =>
            loadRestuarant({ restuarant: e.target.value })
          }
          className="w-full outline-none text-[#2F3E34] placeholder-[#7A857C]"
        />
      </div>
    </div>
  </div>
</motion.section>



      {/* RESTAURANTS */}
      <section className="relative z-10 bg-[#F4F1EC] rounded-t-[4rem] px-6 py-20">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-semibold mb-12">
            Popular Restaurants Near You
          </h2>

          {restuarant.length === 0 ? (
            <p className="text-[#6B7280]">No restaurants found</p>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
              {restuarant.map((item, index) => (
                <div
                  key={index}
                  ref={(el) => (cardsRef.current[index] = el)}
                  onClick={() =>
                    handleResturant(item.restuarant, item._id)
                  }
                  className="group cursor-pointer bg-[#E8E2D8] rounded-3xl overflow-hidden border border-[#6F8F73]/20 shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-2"
                >
                  {/* IMAGE */}
                  <div className="h-48 bg-gradient-to-br from-[#8FAE8B] to-[#6F8F73] flex items-center justify-center">
                    <span className="text-white text-sm opacity-80">
                      Restaurant Image
                    </span>
                  </div>

                  {/* CONTENT */}
                  <div className="p-6">
                    <h3 className="text-xl font-semibold mb-1">
                      {item.restuarant}
                    </h3>
                    <p className="text-sm text-[#6B7280] mb-4">
                      {item.city}
                    </p>

                    <div className="flex items-center justify-between">
                      <span className="text-xs px-3 py-1 rounded-full bg-[#6F8F73]/20 text-[#4F6B57] font-medium">
                        OPEN
                      </span>
                      <span className="text-sm text-[#6B7280]">
                        ⏱ 25–30 min
                      </span>
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
