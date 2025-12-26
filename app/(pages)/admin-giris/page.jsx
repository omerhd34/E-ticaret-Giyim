"use client";
import Link from "next/link";
import { HiArrowLeft } from "react-icons/hi";
import AdminLoginForm from "@/app/components/admin/AdminLoginForm";
import AdminLoginHeader from "@/app/components/admin/AdminLoginHeader";
import AdminLoginFooter from "@/app/components/admin/AdminLoginFooter";

export default function AdminLoginPage() {

 const handleSuccess = () => {
  setTimeout(() => {
   window.location.href = "/admin";
  }, 100);
 };

 return (
  <div className="min-h-screen bg-linear-to-br from-indigo-600 via-purple-600 to-pink-500 flex items-center justify-center p-4">
   <div className="bg-white rounded-2xl shadow-2xl w-full max-w-xl overflow-hidden">
    <AdminLoginHeader />
    <AdminLoginForm onSuccess={handleSuccess} />
    <div className="px-8 pb-8">
     <div className="text-center">
      <Link
       href="/"
       className="inline-flex items-center gap-2 text-indigo-600 hover:text-indigo-800 font-semibold text-sm transition-colors duration-200"
      >
       <HiArrowLeft size={18} />
       Ana Sayfaya Dön
      </Link>
     </div>
    </div>
    <AdminLoginFooter />
   </div>
  </div>
 );
}

