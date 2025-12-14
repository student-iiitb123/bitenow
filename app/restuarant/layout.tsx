"use client";

import Navbar from "../_components/Navbar";
import Footer from "../_components/Footer";

export default function RestuarantLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Navbar />

      <main className="flex-1 min-h-screen">
        {children}
      </main>

      <Footer />
    </>
  );
}
