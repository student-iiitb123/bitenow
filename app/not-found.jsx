"use client";

import Link from "next/link";
import { UtensilsCrossed, Home } from "lucide-react";
import CustomerHeader from "./_components/CustomerHeader";
import Footer from "./_components/Footer";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-[#F7F5EF] flex flex-col font-sans">
      <CustomerHeader />

      <main className="flex-1 flex items-center justify-center p-6 text-center">
        <div className="max-w-md bg-white rounded-3xl border border-[#E2ECE5] shadow-xl p-8 space-y-4">
          <div className="w-16 h-16 rounded-2xl bg-[#244C3A] text-white flex items-center justify-center mx-auto text-2xl">
            <UtensilsCrossed size={32} className="text-[#F2994A]" />
          </div>
          <h1 className="text-4xl font-black text-[#1E2923]">404</h1>
          <h2 className="text-xl font-bold text-[#1E2923]">Page Not Found</h2>
          <p className="text-xs text-[#57685D] leading-relaxed">
            Oops! The page or food dish you're looking for doesn't exist or has been moved.
          </p>

          <div className="pt-4">
            <Link
              href="/"
              className="inline-flex items-center gap-2 px-6 py-3 bg-[#244C3A] hover:bg-[#1A382B] text-white font-bold rounded-full transition-all shadow-xs text-sm"
            >
              <Home size={18} />
              <span>Back to Home</span>
            </Link>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
