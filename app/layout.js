"use client";
import "./globals.css";
import { CartProvider } from "@/context/CartContext";
import { ComparisonProvider } from "@/context/ComparisonContext";

export default function RootLayout({ children }) {
 return (
  <html lang="tr">
   <body className="antialiased min-h-screen flex flex-col">
    <CartProvider>
     <ComparisonProvider>
      {children}
     </ComparisonProvider>
    </CartProvider>
   </body>
  </html>
 );
}

