"use client";
import { MdPhone, MdEmail, MdLocationOn, MdAccessTime } from "react-icons/md";
import ContactInfoCard from "./ContactInfoCard";

export default function ContactInfoSection() {
 return (
  <div className="bg-white rounded-xl shadow-md p-6">
   <h2 className="text-xl font-bold text-gray-900 mb-6">İletişim Bilgileri</h2>

   <div className="space-y-6">
    <ContactInfoCard
     icon={MdPhone}
     title="Telefon"
     link="tel:+905078492903"
     linkText="0507 849 29 03"
    >
     <p className="text-sm text-gray-500 mt-1">Pazartesi - Cumartesi: 09:00 - 18:00</p>
    </ContactInfoCard>

    <ContactInfoCard
     icon={MdEmail}
     title="E-posta"
     link="mailto:destek@shop.co"
     linkText="destek@shop.co"
    >
     <p className="text-sm text-gray-500 mt-1">24 saat içinde yanıt veriyoruz</p>
    </ContactInfoCard>

    <ContactInfoCard icon={MdLocationOn} title="Adres">
     <p className="text-gray-700 text-sm">
      Mimar Sinan Mahallesi, Orhangazi Caddesi
      <br />
      No: 10-12 Kat 1 Daire 5
      <br />
      İnegöl, Bursa
     </p>
    </ContactInfoCard>

    <ContactInfoCard icon={MdAccessTime} title="Çalışma Saatleri">
     <p className="text-gray-700 text-sm">
      Pazartesi - Cumartesi: 09:00 - 18:00
      <br />
      Pazar: Kapalı
     </p>
    </ContactInfoCard>
   </div>
  </div>
 );
}
