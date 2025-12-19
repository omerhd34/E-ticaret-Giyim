"use client";
import { HiSupport } from "react-icons/hi";

export default function QuickHelpSection() {
 return (
  <div className="bg-indigo-50 rounded-xl p-6 border border-indigo-100">
   <h3 className="font-bold text-gray-900 mb-3 flex items-center gap-2">
    <HiSupport className="text-indigo-600" size={20} />
    Hızlı Yardım
   </h3>
   <ul className="space-y-2 text-sm text-gray-700">
    <li>• Sipariş takibi için sipariş numaranızı hazır bulundurun</li>
    <li>• İade işlemleri için fatura bilgilerinizi hazırlayın</li>
    <li>• Ürün sorularınız için ürün kodunu belirtin</li>
   </ul>
  </div>
 );
}
