"use client";
import { useRouter } from "next/navigation";
import Link from "next/link";
import AdminLoginForm from "@/app/components/admin/AdminLoginForm";
import AdminLoginHeader from "@/app/components/admin/AdminLoginHeader";
import AdminLoginFooter from "@/app/components/admin/AdminLoginFooter";

export default function AdminLoginPage() {
 const router = useRouter();

 const handleSuccess = () => {
  setTimeout(() => {
   window.location.href = "/admin";
  }, 100);
 };

 return (
  <div className="min-h-screen bg-linear-to-br from-indigo-600 via-purple-600 to-pink-500 flex items-center justify-center p-4">
   <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md overflow-hidden">
    <AdminLoginHeader />
    <AdminLoginForm onSuccess={handleSuccess} />
    <div className="px-8 pb-8">
     <div className="text-center">
      <Link
       href="/"
       className="text-indigo-600 hover:text-indigo-800 font-semibold text-sm"
      >
       ← Ana Sayfaya Dön
      </Link>
     </div>
    </div>
    <AdminLoginFooter />
   </div>
  </div>
 );
}

