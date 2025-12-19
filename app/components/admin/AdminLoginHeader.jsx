"use client";
import { HiLockClosed } from "react-icons/hi";

export default function AdminLoginHeader() {
 return (
  <div className="bg-linear-to-r from-indigo-600 to-purple-600 p-8 text-white text-center">
   <div className="bg-white/20 backdrop-blur-sm w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4">
    <HiLockClosed size={40} />
   </div>
   <h1 className="text-3xl font-black mb-2">Admin Girişi</h1>
   <p className="text-indigo-100">E-Ticaret Yönetim Paneli</p>
  </div>
 );
}
