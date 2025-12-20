"use client";
import { MdAccessTime } from "react-icons/md";
import ContactInfoCard from "./ContactInfoCard";

export default function ContactInfoSection() {
 return (
  <div className="bg-white rounded-xl shadow-md p-6">
   <h2 className="text-xl font-bold text-gray-900 mb-6">Çalışma Saatleri</h2>
   <div className="space-y-6">
    <ContactInfoCard icon={MdAccessTime} >
     <p className="text-gray-700 text-sm">
      Pazartesi - Cumartesi: 09:00 - 19:00
      <br />
      Pazar: 12:00 - 17:00
     </p>
    </ContactInfoCard>
   </div>
  </div>
 );
}
