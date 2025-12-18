"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const CustomerHeader = ({ cartdata ,removecartdata}) => {
  const [user, setUser] = useState(null);
  const [cartItems, setCartItems] = useState([]);
  const [cartNumber, setCartNumber] = useState(0);
  const [error, setError] = useState("");

  const router = useRouter();

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  

 useEffect(() => {
  if (!removecartdata) return;

  setCartItems(prevCart => {
    const updatedCart = prevCart.filter(item => item._id !== removecartdata);

    localStorage.setItem('cart', JSON.stringify(updatedCart));
    setCartNumber(updatedCart.length);

    if (updatedCart.length === 0) localStorage.removeItem('cart');

    return updatedCart;
  });
}, [removecartdata]);


  const Logout = () => {
    localStorage.removeItem("user");
    setUser(null);
    router.push("/user-auth");
  };

  useEffect(() => {
    const storedCart = JSON.parse(localStorage.getItem("cart")) || [];
    setCartItems(storedCart);
    setCartNumber(storedCart.length);
  }, []);


   
  const removeFromCart = (id) => {
    const updatedCart = cartStorage.filter(item => item._id !== id);
    setCartStorage(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
  };


  useEffect(() => {
    if (!cartdata) return;
    setError("");

    setCartItems((prev) => {
      if (prev.length === 0) {
        localStorage.setItem("cart", JSON.stringify([cartdata]));
        setCartNumber(1);
        return [cartdata];
      }

      if (prev[0].restro_id !== cartdata.restro_id) {
        setError("You can order from only one restaurant at a time.");
        return prev;
      }

      const updated = [...prev, cartdata];
      localStorage.setItem("cart", JSON.stringify(updated));
      setCartNumber(updated.length);
      return updated;
    });
  }, [cartdata]);

  return (
    <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-xl border-b border-gray-200">
      <div className="max-w-7xl mx-auto flex items-center justify-between px-6 py-4">

        {/* LOGO */}
        <Link href="/" className="text-3xl font-extrabold tracking-wide">
          <span className="text-green-700">Bite</span>
          <span className="text-gray-900">Now</span>
        </Link>

        {/* NAV */}
        <ul className="hidden md:flex items-center gap-8 font-medium text-gray-800">
          <li>
            <Link href="/" className="hover:text-green-700">Home</Link>
          </li>

          <li className="relative">
            <Link href="/cart" className="hover:text-green-700">
              Cart
              {cartNumber > 0 && (
                <span className="ml-1 bg-green-700 text-white text-xs px-2 py-0.5 rounded-full">
                  {cartNumber}
                </span>
              )}
            </Link>
            {error && (
              <p className="absolute top-full mt-2 text-xs text-red-500">
                {error}
              </p>
            )}
          </li>

          <li>
            <Link href="/restuarant" className="hover:text-green-700">
              Add Restaurant
            </Link>
          </li>
        </ul>

        {/* RIGHT SIDE AUTH */}
        <ul className="flex items-center gap-4">
          {user ? (
            <>
              <li className="text-gray-800 font-semibold">
                Hi, {user.name}
              </li>
              <li>
                <button
                  onClick={Logout}
                  className="text-red-600 hover:text-red-700 font-medium"
                >
                  Logout
                </button>
              </li>
            </>
          ) : (
            <>
              <li>
                <Link
                  href="/login"
                  className="px-4 py-2 border border-green-700 text-green-700 rounded-full hover:bg-green-700 hover:text-white transition"
                >
                  Login
                </Link>
              </li>
              <li>
                <Link
                  href="/signup"
                  className="px-4 py-2 bg-green-700 text-white rounded-full hover:bg-green-800 transition"
                >
                  Sign Up
                </Link>
              </li>
            </>
          )}
        </ul>
      </div>
    </header>
  );
};

export default CustomerHeader;
