import type { Metadata } from "next";
import "./globals.css";
import CustomerHeader from "./_components/CustomerHeader";
import Footer from "./_components/Footer";

export const metadata: Metadata = {
  title: "BiteNow",
  description: "Food App",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>

        {children}

      
      </body>
    </html>
  );
}
