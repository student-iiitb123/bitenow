"use client";

import Link from "next/link";
import { Utensils, Heart } from "lucide-react";

const Footer = () => {
  return (
    <footer className="w-full bg-[#142E23] text-white pt-12 pb-8 mt-auto border-t border-[#1A382B]">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 pb-10 border-b border-[#244C3A]">
          {/* BRAND */}
          <div className="space-y-4 md:col-span-1">
            <Link href="/" className="flex items-center gap-2">
              <div className="w-9 h-9 rounded-xl bg-[#244C3A] flex items-center justify-center text-white">
                <Utensils size={18} className="text-[#F2994A]" />
              </div>
              <span className="text-2xl font-black tracking-tight text-white">
                Bite<span className="text-[#E86A33]">Now</span>
              </span>
            </Link>
            <p className="text-sm text-[#C1D8CD] leading-relaxed">
              Delicious food from your favorite local restaurants, delivered fresh & fast to your doorstep.
            </p>
          </div>

          {/* DISCOVER */}
          <div>
            <h4 className="text-sm font-bold uppercase tracking-wider text-white mb-4">Discover</h4>
            <ul className="space-y-2.5 text-sm text-[#C1D8CD]">
              <li><Link href="/" className="hover:text-white transition-colors">Popular Restaurants</Link></li>
              <li><Link href="/allrestuarants" className="hover:text-white transition-colors">All Restaurants</Link></li>
              <li><Link href="/cart" className="hover:text-white transition-colors">Your Cart</Link></li>
              <li><Link href="/orders" className="hover:text-white transition-colors">Order Tracking</Link></li>
            </ul>
          </div>

          {/* PARTNERS */}
          <div>
            <h4 className="text-sm font-bold uppercase tracking-wider text-white mb-4">For Partners</h4>
            <ul className="space-y-2.5 text-sm text-[#C1D8CD]">
              <li><Link href="/restuarant" className="hover:text-white transition-colors">Add Restaurant</Link></li>
              <li><Link href="/restuarant" className="hover:text-white transition-colors">Partner Dashboard</Link></li>
              <li><Link href="/restuarant" className="hover:text-white transition-colors">Merchant Support</Link></li>
            </ul>
          </div>

          {/* LEGAL */}
          <div>
            <h4 className="text-sm font-bold uppercase tracking-wider text-white mb-4">Company</h4>
            <ul className="space-y-2.5 text-sm text-[#C1D8CD]">
              <li><a href="#" className="hover:text-white transition-colors">Privacy Policy</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Terms of Service</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Support & FAQ</a></li>
            </ul>
          </div>
        </div>

        {/* BOTTOM BAR */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#80A693]">
          <p>© {new Date().getFullYear()} BiteNow Inc. All rights reserved.</p>
          <p className="flex items-center gap-1">
            Crafted with <Heart size={12} className="text-[#E86A33] fill-current" /> for food lovers everywhere.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
