import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "BiteNow",
  description: "Food ordering app - Fresh. Fast. BiteNow.",
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
