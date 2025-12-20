"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

const Navbar = () => {
  const [details, setDetails] = useState(null);
  const router = useRouter();

  useEffect(() => {
    if (typeof window !== "undefined") {
      const data = localStorage.getItem("resturantUser");

      if (!data) {
        router.push("/restuarant");
      } else {
        setDetails(JSON.parse(data));
      }
    }
  }, []);

  return (
    <nav className="w-full bg-white shadow px-10 py-4">
      <div className="max-w-7xl mx-auto flex items-center justify-between">

        <h1 className="text-3xl font-extrabold tracking-wide">
          <span className="text-green-700">Bite</span>
          <span className="text-gray-900">Now</span>
        </h1>

        <ul className="flex items-center gap-10 text-lg font-medium text-gray-800">
          <li className="hover:text-orange-500 transition">
            <Link href="/">Home</Link>
          </li>

          {details?.name ? (
            <>
              <li className="hover:text-orange-500 transition">
                <Link href="/profile">Profile</Link>
              </li>
              <li>
                <button
  onClick={() => {
    localStorage.removeItem("resturantUser");
    router.push("/restuarant");
    router.refresh(); 
  }}
>
  Logout
</button>

              </li>
            </>
          ) : (
            <li className="hover:text-orange-500 transition">
             Login / Signup
            </li>
          )}
        </ul>

      </div>
    </nav>
  );
};

export default Navbar;