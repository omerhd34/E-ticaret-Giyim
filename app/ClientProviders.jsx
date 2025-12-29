"use client";
import { CartProvider } from "@/context/CartContext";
import { ComparisonProvider } from "@/context/ComparisonContext";

export default function ClientProviders({ children }) {
 return (
  <CartProvider>
   <ComparisonProvider>
    {children}
   </ComparisonProvider>
  </CartProvider>
 );
}

