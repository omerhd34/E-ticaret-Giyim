"use client";
import { MdSecurity, MdLocalShipping, MdRefresh } from "react-icons/md";

export default function CartTrustBadges() {
 return (
  <div className="mt-6 pt-6 border-t space-y-2">
   <div className="flex items-center gap-2 text-sm text-gray-600">
    <MdSecurity className="w-5 h-5 text-green-600" />
    <span>Güvenli Ödeme</span>
   </div>
   <div className="flex items-center gap-2 text-sm text-gray-600">
    <MdLocalShipping className="w-5 h-5 text-green-600" />
    <span>Hızlı Kargo</span>
   </div>
   <div className="flex items-center gap-2 text-sm text-gray-600">
    <MdRefresh className="w-5 h-5 text-green-600" />
    <span>14 Gün İade Garantisi</span>
   </div>
  </div>
 );
}
