"use client";
import { HiCheckCircle } from "react-icons/hi";

export default function SuccessMessage() {
 return (
  <div className="bg-green-50 border border-green-200 rounded-lg p-6 text-center">
   <HiCheckCircle className="text-green-600 mx-auto mb-3" size={48} />
   <h3 className="text-lg font-bold text-green-900 mb-2">Mesajınız Gönderildi!</h3>
   <p className="text-green-700">
    En kısa sürede size geri dönüş yapacağız. Teşekkür ederiz.
   </p>
  </div>
 );
}
