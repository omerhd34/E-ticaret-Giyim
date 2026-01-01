"use client";

import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { MdError, MdShoppingCart } from "react-icons/md";

export default function OdemeBasarisizPage() {
 const searchParams = useSearchParams();
 const orderId = searchParams.get("orderId");
 const reason = searchParams.get("reason") || "Ödeme işlemi tamamlanamadı";

 return (
  <div className="min-h-screen bg-gray-50 py-12">
   <div className="container mx-auto px-4 max-w-2xl">
    <div className="bg-white rounded-xl shadow-sm p-8 text-center">
     <div className="mb-6">
      <MdError className="text-red-500 mx-auto" size={80} />
     </div>
     <h1 className="text-3xl font-bold text-gray-900 mb-4">Ödeme Başarısız</h1>
     <p className="text-gray-600 mb-2">{reason}</p>
     {orderId && (
      <p className="text-sm text-gray-500 mb-6">Sipariş No: {orderId}</p>
     )}
     <p className="text-gray-600 mb-6">
      Lütfen tekrar deneyin veya farklı bir ödeme yöntemi seçin.
     </p>
     <div className="flex flex-col sm:flex-row gap-4 justify-center">
      <Link
       href="/odeme"
       className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-indigo-600 text-white rounded-lg font-semibold hover:bg-indigo-700 transition"
      >
       <MdShoppingCart size={20} />
       Ödeme Sayfasına Dön
      </Link>
      <Link
       href="/sepet"
       className="inline-flex items-center justify-center px-6 py-3 bg-gray-100 text-gray-700 rounded-lg font-semibold hover:bg-gray-200 transition"
      >
       Sepete Dön
      </Link>
     </div>
    </div>
   </div>
  </div>
 );
}

