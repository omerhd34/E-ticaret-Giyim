"use client";
import { MdSecurity, MdLocalShipping } from "react-icons/md";

export default function PaymentHeader() {
 return (
  <div className="flex items-center justify-between mb-8">
   <div>
    <h1 className="text-3xl font-black text-gray-900">Ödeme</h1>
    <p className="text-gray-600 mt-1">
     Teslimat adresinizi ve ödeme yönteminizi seçin.
    </p>
   </div>
   <div className="hidden md:flex items-center gap-3 text-sm text-gray-600">
    <span className="inline-flex items-center gap-2">
     <MdSecurity className="text-green-600" size={18} /> Güvenli Ödeme
    </span>
    <span className="inline-flex items-center gap-2">
     <MdLocalShipping className="text-green-600" size={18} /> Hızlı Kargo
    </span>
   </div>
  </div>
 );
}
