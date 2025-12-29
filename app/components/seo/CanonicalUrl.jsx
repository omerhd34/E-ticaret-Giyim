"use client";
import { useEffect } from "react";
import { usePathname } from "next/navigation";

export default function CanonicalUrl({ pathname: propPathname, baseUrl }) {
 const pathname = usePathname() || propPathname;

 useEffect(() => {
  // Query parametrelerini temizle (canonical URL'de olmamalı)
  const cleanPathname = pathname || "/";
  const canonicalUrl = `${baseUrl || process.env.NEXT_PUBLIC_BASE_URL || (typeof window !== 'undefined' ? window.location.origin : 'http://localhost:3000')}${cleanPathname}`;

  // Mevcut canonical link'i kaldır
  const existingCanonical = document.querySelector('link[rel="canonical"]');
  if (existingCanonical && existingCanonical.parentNode) {
   try {
    existingCanonical.remove();
   } catch (e) {
    // Element zaten kaldırılmış olabilir
   }
  }

  // Yeni canonical link ekle
  const link = document.createElement("link");
  link.rel = "canonical";
  link.href = canonicalUrl;

  if (document.head) {
   document.head.appendChild(link);
  }

  return () => {
   if (document.head && document.head.contains(link)) {
    try {
     document.head.removeChild(link);
    } catch (e) {
     // Element zaten kaldırılmış olabilir
    }
   }
  };
 }, [pathname, baseUrl]);

 return null;
}

