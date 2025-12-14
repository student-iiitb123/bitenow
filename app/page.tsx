"use client"

import { useEffect, useState } from "react";
import CustomerHeader from "./_components/CustomerHeader";
import Footer from "./_components/Footer";

export default function Home() {
  const [restaurants,setRestaurants]=useState([]);

//   // useEffect(()=>{
//   //   loadRestaurants()

//   // },[]
// )

  
  //   let response = await fetch ('');
  //   response =await response.json();
  //   if(response.success){
  //     setRestaurants(response.result)

  //   }
  // }
  return (
    <main className="relative min-h-screen bg-gradient-to-r from-orange-500 to-orange-600 overflow-hidden">
      <CustomerHeader />

      {/* Background Food Images (Hide on small screens) */}
      <img
        src="https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto/portal/testing/seo-home/Veggies_new.png"
        className="hidden md:block absolute left-0 top-32 w-56 opacity-90"
        alt="food"
      />

      <img
        src="https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto/portal/testing/seo-home/Sushi_replace.png"
        className="hidden md:block absolute right-0 top-20 w-60 opacity-90"
        alt="food"
      />

      <img
        src="https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto/PC_Mweb/Biryani.png"
        className="hidden md:block absolute left-10 bottom-10 w-52 opacity-90"
        alt="food"
      />

      <img
        src="https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto/PC_Mweb/Noodles.png"
        className="hidden md:block absolute right-16 bottom-12 w-48 opacity-90"
        alt="food"
      />

      {/* Hero Section */}
      <section className="relative z-10 flex flex-col items-center text-center px-4 py-16 md:py-24">
        
        <h1 className="text-white text-2xl sm:text-3xl md:text-5xl font-bold leading-tight mb-6 md:mb-8">
          Order food & groceries. <br className="hidden sm:block" />
          Discover best restaurants. <br />
          <span className="text-yellow-200">BiteNow it!</span>
        </h1>

        {/* Search Box */}
        <div className="
          bg-orange-500 p-3 md:p-4 rounded-2xl
          flex flex-col md:flex-row gap-3 md:gap-4
          w-full max-w-5xl
        ">

          {/* Location Input */}
          <div className="
            flex items-center gap-3
            w-full md:w-1/3
            bg-white rounded-full px-4 py-3
            shadow-md hover:shadow-lg
            transition-all duration-300
          ">
            <span className="text-orange-500 text-lg">📍</span>

            <input
              type="text"
              placeholder="Enter your delivery location"
              className="w-full outline-none text-gray-700 placeholder-gray-400 text-sm"
            />

            <span className="text-gray-400 hover:text-orange-500 transition">⌄</span>
          </div>

          {/* Search Input */}
          <div className="
            flex items-center gap-3
            w-full md:w-2/3
            bg-white rounded-full px-5 py-3
            shadow-md hover:shadow-xl
            transition-all duration-300
          ">
            <input
              type="text"
              placeholder="Search for restaurant, item or more"
              className="w-full outline-none text-gray-800 placeholder-gray-400 text-sm md:text-base"
            />

            <span className="text-gray-500 text-xl hover:text-orange-500 transition">🔍</span>
          </div>

        </div>

      </section>
{/* 
     
    <div>
       {
      restaurants.map((item)=>(
        <div>
          <h1>{item.name}</h1>

        </div>
      ))
     }
    </div> */}

      
    </main>
  );
}
