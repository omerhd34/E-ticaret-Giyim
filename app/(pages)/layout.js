"use client";
import Header from "../components/ui/Header";
import Footer from "../components/ui/Footer";
import ScrollToTop from "../components/ui/ScrollToTop";
import ComparisonWidget from "../components/ui/ComparisonWidget";
import { usePathname } from "next/navigation";

export default function PagesLayout({ children }) {
 const pathname = usePathname();
 const isAdminPage = pathname?.startsWith("/admin");

 return (
  <>
   {!isAdminPage && <Header />}
   <div className="flex-1">
    {children}
   </div>
   {!isAdminPage && <Footer />}
   {!isAdminPage && <ScrollToTop />}
   {!isAdminPage && <ComparisonWidget />}
  </>
 );
}
