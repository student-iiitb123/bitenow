"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

const CustomerHeader = ({ cartdata }) => {
  const [cartItems, setCartItems] = useState([]);
  const [cartNumber, setCartNumber] = useState(0);
  const [error, setError] = useState("");

  //Load cart on page refresh
  useEffect(() => {
    const storedCart = localStorage.getItem("cart");
    if (storedCart) {
      const parsedCart = JSON.parse(storedCart);
      setCartItems(parsedCart);
      setCartNumber(parsedCart.length);
    }
  }, []);

  //add to cart logic
  useEffect(() => {
    if (!cartdata) return;

    setError("");

    setCartItems((prevCart) => {
      //  Cart empty 
      if (prevCart.length === 0) {
        localStorage.setItem("cart", JSON.stringify([cartdata]));
        setCartNumber(1);
        return [cartdata];
      }

      // Check restaurant 
      const existingRestaurantId = prevCart[0].restro_id;
      const newRestaurantId = cartdata.restro_id;

      if (existingRestaurantId !== newRestaurantId) {
        setError("You can order from only one restaurant at a time.");
        return prevCart; 
      }

      //  Same restaurant
      const updatedCart = [...prevCart, cartdata];
      localStorage.setItem("cart", JSON.stringify(updatedCart));
      setCartNumber(updatedCart.length);
      return updatedCart;
    });
  }, [cartdata]);

  return (
    <header className="sticky top-0 z-50 bg-white border-b">
      <div className="max-w-7xl mx-auto flex items-center justify-between px-6 py-4">

        <Link href="/" className="text-2xl font-bold">
          BiteNow
        </Link>

        <div className="relative">
          <Link href="/cart">
            Cart ({cartNumber})
          </Link>

          
          {error && (
            <p className="absolute top-full mt-2 text-sm text-red-500">
              {error}
            </p>
          )}
        </div>
      </div>
    </header>
  );
};

export default CustomerHeader;
