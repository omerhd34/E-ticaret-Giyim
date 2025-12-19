"use client";

import { useEffect, useRef } from "react";
import { HiX } from "react-icons/hi";

export default function Toast({ toast, setToast }) {
 const timeoutRef = useRef(null);

 useEffect(() => {
  if (!toast?.show) {
   if (timeoutRef.current) {
    clearTimeout(timeoutRef.current);
    timeoutRef.current = null;
   }
   return;
  }

  if (timeoutRef.current) {
   clearTimeout(timeoutRef.current);
   timeoutRef.current = null;
  }

  timeoutRef.current = setTimeout(() => {
   setToast({ show: false, message: "", type: "success" });
   timeoutRef.current = null;
  }, 5000);

  return () => {
   if (timeoutRef.current) {
    clearTimeout(timeoutRef.current);
    timeoutRef.current = null;
   }
  };
 }, [toast?.show, toast?.message, toast?.type, setToast]);

 if (!toast?.show) return null;

 return (
  <div className="fixed top-4 right-4 z-50 animate-fadeIn">
   <div
    className={`rounded-lg shadow-xl px-6 py-4 flex items-center gap-3 min-w-[300px] ${toast.type === "success" ? "bg-green-500 text-white" : "bg-red-500 text-white"
     }`}
   >
    <div className="flex-1 font-semibold">{toast.message}</div>
    <button
     type="button"
     onClick={() => {
      if (timeoutRef.current) {
       clearTimeout(timeoutRef.current);
       timeoutRef.current = null;
      }
      setToast({ show: false, message: "", type: "success" });
     }}
     className="text-white hover:text-gray-200 transition-colors"
     aria-label="Kapat"
    >
     <HiX size={20} />
    </button>
   </div>
  </div>
 );
}
