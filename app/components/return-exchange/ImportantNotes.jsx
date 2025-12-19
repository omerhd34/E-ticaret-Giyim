"use client";
import { MdInfo } from "react-icons/md";

export default function ImportantNotes() {
 return (
  <div className="max-w-4xl mx-auto mt-8">
   <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-6">
    <h3 className="font-bold text-gray-900 mb-3 flex items-center gap-2">
     <MdInfo className="text-yellow-600" size={24} />
     Önemli Notlar
    </h3>
    <ul className="space-y-2 text-sm text-gray-700">
     <li>• İade ve değişim işlemleri için ürünün orijinal halinde olması gerekmektedir.</li>
     <li>• İade/değişim talebiniz onaylandıktan sonra kargo bilgileri size iletilecektir.</li>
     <li>• Özel üretim veya kişiselleştirilmiş ürünlerde iade/değişim yapılamaz.</li>
     <li>• Kampanya ve indirimli ürünlerde iade/değişim koşulları farklılık gösterebilir.</li>
    </ul>
   </div>
  </div>
 );
}
