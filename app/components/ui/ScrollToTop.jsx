"use client";
import { useState, useEffect } from "react";
import { HiArrowUp } from "react-icons/hi";

export default function ScrollToTop() {
 const [isVisible, setIsVisible] = useState(false);
 const [mounted, setMounted] = useState(false);

 // Client-side mount kontrolü
 useEffect(() => {
  // eslint-disable-next-line react-hooks/set-state-in-effect
  setMounted(true);
 }, []);

 useEffect(() => {
  if (!mounted) return;

  const toggleVisibility = () => {
   if (window.pageYOffset > 300) {
    setIsVisible(true);
   } else {
    setIsVisible(false);
   }
  };

  // İlk kontrol
  toggleVisibility();

  window.addEventListener("scroll", toggleVisibility);

  return () => {
   window.removeEventListener("scroll", toggleVisibility);
  };
 }, [mounted]);

 const scrollToTop = () => {
  window.scrollTo({
   top: 0,
   behavior: "smooth",
  });
 };

 // Server-side render'da hiçbir şey render etme
 if (!mounted) {
  return null;
 }

 return (
  <>
   {isVisible && (
    <button
     onClick={scrollToTop}
     className="fixed bottom-8 right-5 z-50 bg-indigo-600 text-white p-4 rounded-full shadow-lg hover:bg-indigo-700 transition-all duration-300 hover:scale-110 active:scale-95 cursor-pointer"
     aria-label="Yukarı çık"
    >
     <HiArrowUp size={24} />
    </button>
   )}
  </>
 );
}
