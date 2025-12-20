"use client";

import SideBar from "../_components/SideBar";
import Footer from "../../_components/Footer";

export default function Layout({ children, hideSidebar }: { children: React.ReactNode; hideSidebar?: boolean }) {
  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
        {!hideSidebar && <SideBar />}


      {/* Main content */}
      <main className="flex-1 p-6">
        {children}
          <Footer />
      </main>
    
    </div>
  );
}
