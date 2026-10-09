"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { ShoppingBag, User as UserIcon, LogOut, Menu, X, Utensils } from "lucide-react";

const CustomerHeader = ({ cartdata, removecartdata }) => {
  const [user, setUser] = useState(null);
  const [cartItems, setCartItems] = useState([]);
  const [cartNumber, setCartNumber] = useState(0);
  const [error, setError] = useState("");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const router = useRouter();

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser));
      } catch {
        localStorage.removeItem("user");
      }
    }
  }, []);

  useEffect(() => {
    const storedCart = JSON.parse(localStorage.getItem("cart")) || [];
    setCartItems(storedCart);
    setCartNumber(storedCart.reduce((sum, item) => sum + (item.quantity || 1), 0));
  }, []);

  useEffect(() => {
    if (!removecartdata) return;

    setCartItems((prevCart) => {
      const updatedCart = prevCart.filter((item) => item._id !== removecartdata);
      localStorage.setItem("cart", JSON.stringify(updatedCart));
      setCartNumber(updatedCart.reduce((sum, item) => sum + (item.quantity || 1), 0));
      if (updatedCart.length === 0) localStorage.removeItem("cart");
      return updatedCart;
    });
  }, [removecartdata]);

  useEffect(() => {
    if (!cartdata) return;
    setError("");

    setCartItems((prev) => {
      if (prev.length === 0) {
        const newItem = { ...cartdata, quantity: 1 };
        const newCart = [newItem];
        localStorage.setItem("cart", JSON.stringify(newCart));
        setCartNumber(1);
        return newCart;
      }

      if (prev[0].restro_id !== cartdata.restro_id) {
        setError("You can order from only one restaurant at a time.");
        return prev;
      }

      const existingIndex = prev.findIndex((item) => item._id === cartdata._id);
      let updated;

      if (existingIndex >= 0) {
        updated = prev.map((item, idx) =>
          idx === existingIndex
            ? { ...item, quantity: (item.quantity || 1) + 1 }
            : item
        );
      } else {
        updated = [...prev, { ...cartdata, quantity: 1 }];
      }

      localStorage.setItem("cart", JSON.stringify(updated));
      setCartNumber(updated.reduce((sum, item) => sum + (item.quantity || 1), 0));
      return updated;
    });
  }, [cartdata]);

  const Logout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    setUser(null);
    router.push("/user-auth");
  };

  return (
    <header className="sticky top-0 z-50 bg-[#FFFFFF]/90 backdrop-blur-md border-b border-[#E2ECE5] shadow-xs transition-all">
      <div className="max-w-7xl mx-auto flex items-center justify-between px-6 py-3.5">
        
        {/* BRAND LOGO */}
        <Link href="/" className="flex items-center gap-2 group">
          <div className="w-10 h-10 rounded-xl bg-[#244C3A] flex items-center justify-center text-white shadow-xs group-hover:bg-[#1A382B] transition-colors">
            <Utensils size={20} className="text-[#F2994A]" />
          </div>
          <span className="text-2xl font-black tracking-tight text-[#1E2923]">
            Bite<span className="text-[#E86A33]">Now</span>
          </span>
        </Link>

        {/* DESKTOP NAV LINKS */}
        <nav className="hidden md:flex items-center gap-8 font-medium text-sm text-[#57685D]">
          <Link href="/" className="hover:text-[#244C3A] transition-colors">
            Home
          </Link>

          <div className="relative">
            <Link
              href="/cart"
              className="flex items-center gap-1.5 hover:text-[#244C3A] transition-colors py-1"
            >
              <ShoppingBag size={18} />
              <span>Cart</span>
              {cartNumber > 0 && (
                <span className="ml-1 bg-[#E86A33] text-white text-xs font-bold px-2 py-0.5 rounded-full shadow-xs animate-pulse">
                  {cartNumber}
                </span>
              )}
            </Link>
            {error && (
              <p className="absolute top-full left-0 mt-1 text-xs text-red-600 bg-red-50 border border-red-200 px-3 py-1 rounded-lg whitespace-nowrap shadow-sm">
                {error}
              </p>
            )}
          </div>

          {user && (
            <Link href="/orders" className="hover:text-[#244C3A] transition-colors">
              My Orders
            </Link>
          )}

          <Link
            href="/restuarant"
            className="hover:text-[#244C3A] transition-colors text-xs font-semibold uppercase tracking-wider bg-[#E6EFEA] px-3 py-1.5 rounded-full"
          >
            Partner Portal
          </Link>
        </nav>

        {/* DESKTOP AUTH BUTTONS */}
        <div className="hidden md:flex items-center gap-3">
          {user ? (
            <div className="flex items-center gap-4 bg-[#F7F5EF] px-4 py-1.5 rounded-full border border-[#E2ECE5]">
              <div className="flex items-center gap-2 text-sm font-semibold text-[#1E2923]">
                <div className="w-7 h-7 rounded-full bg-[#244C3A] text-white flex items-center justify-center text-xs">
                  {user.name ? user.name.charAt(0).toUpperCase() : "U"}
                </div>
                <span>Hi, {user.name}</span>
              </div>
              <button
                onClick={Logout}
                className="text-xs font-semibold text-red-600 hover:text-red-700 flex items-center gap-1 transition-colors"
                title="Logout"
              >
                <LogOut size={14} />
                <span>Logout</span>
              </button>
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <Link
                href="/user-auth"
                className="px-5 py-2 text-sm font-semibold text-[#244C3A] hover:bg-[#E6EFEA] rounded-full transition-all"
              >
                Log in
              </Link>
              <Link
                href="/user-auth"
                className="px-5 py-2 text-sm font-semibold bg-[#244C3A] hover:bg-[#1A382B] text-white rounded-full transition-all shadow-xs"
              >
                Sign up
              </Link>
            </div>
          )}
        </div>

        {/* MOBILE MENU TOGGLE */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="md:hidden p-2 rounded-xl text-[#57685D] hover:bg-[#E6EFEA] transition-colors"
          aria-label="Toggle Menu"
        >
          {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* MOBILE DRAWER */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-[#E2ECE5] bg-white px-6 py-4 space-y-4">
          <Link
            href="/"
            onClick={() => setMobileMenuOpen(false)}
            className="block py-2 text-base font-medium text-[#1E2923] hover:text-[#244C3A]"
          >
            Home
          </Link>
          <Link
            href="/cart"
            onClick={() => setMobileMenuOpen(false)}
            className="flex items-center justify-between py-2 text-base font-medium text-[#1E2923] hover:text-[#244C3A]"
          >
            <span className="flex items-center gap-2">
              <ShoppingBag size={18} /> Cart
            </span>
            {cartNumber > 0 && (
              <span className="bg-[#E86A33] text-white text-xs font-bold px-2 py-0.5 rounded-full">
                {cartNumber}
              </span>
            )}
          </Link>
          {user && (
            <Link
              href="/orders"
              onClick={() => setMobileMenuOpen(false)}
              className="block py-2 text-base font-medium text-[#1E2923] hover:text-[#244C3A]"
            >
              My Orders
            </Link>
          )}
          <Link
            href="/restuarant"
            onClick={() => setMobileMenuOpen(false)}
            className="block py-2 text-base font-medium text-[#57685D] hover:text-[#244C3A]"
          >
            Partner Portal
          </Link>

          <div className="pt-4 border-t border-[#E2ECE5]">
            {user ? (
              <div className="space-y-3">
                <div className="flex items-center gap-2 font-semibold text-[#1E2923]">
                  <UserIcon size={18} className="text-[#244C3A]" />
                  <span>Hi, {user.name}</span>
                </div>
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    Logout();
                  }}
                  className="w-full text-left py-2 text-sm font-semibold text-red-600 flex items-center gap-2"
                >
                  <LogOut size={16} /> Logout
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-2 gap-3">
                <Link
                  href="/user-auth"
                  onClick={() => setMobileMenuOpen(false)}
                  className="w-full text-center py-2.5 text-sm font-semibold border border-[#244C3A] text-[#244C3A] rounded-full"
                >
                  Log in
                </Link>
                <Link
                  href="/user-auth"
                  onClick={() => setMobileMenuOpen(false)}
                  className="w-full text-center py-2.5 text-sm font-semibold bg-[#244C3A] text-white rounded-full"
                >
                  Sign up
                </Link>
              </div>
            )}
          </div>
        </div>
      )}
    </header>
  );
};

export default CustomerHeader;
