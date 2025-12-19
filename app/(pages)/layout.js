"use client";
import { Inter } from "next/font/google";
import "../globals.css";
import Header from "../components/ui/Header";
import Footer from "../components/ui/Footer";
import ScrollToTop from "../components/ui/ScrollToTop";
import { CartProvider } from "@/context/CartContext";

const inter = Inter({
 subsets: ["latin"],
 variable: "--font-inter",
 display: "swap",
});

export default function RootLayout({ children }) {
 return (
  <html lang="tr">
   <body className={`${inter.variable} font-sans antialiased min-h-screen flex flex-col`}>
    <CartProvider>
     <Header />
     <div className="flex-1">
      {children}
     </div>
     <Footer />
     <ScrollToTop />
    </CartProvider>
   </body>
  </html>
 );
}
