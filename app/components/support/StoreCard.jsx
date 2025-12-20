"use client";
import Image from "next/image";
import Link from "next/link";
import { MdPhone, MdEmail, MdLocationOn } from "react-icons/md";
import { FaWhatsapp } from "react-icons/fa";
import { HiExternalLink } from "react-icons/hi";

export default function StoreCard({ title, adres, telefon, whatsappLink, email, mapUrl, images }) {
 // Google Maps directions ve view URL'lerini oluştur
 const addressForMaps = encodeURIComponent(adres);
 const mapDirectionsUrl = `https://www.google.com/maps/dir/?api=1&destination=${addressForMaps}`;
 const mapViewUrl = `https://www.google.com/maps/search/?api=1&query=${addressForMaps}`;

 return (
  <div className="bg-white rounded-xl shadow-md overflow-hidden">
   {/* Header */}
   <div className="bg-linear-to-r from-indigo-600 to-purple-600 px-6 py-4">
    <div className="flex items-center gap-3">
     <h3 className="text-2xl font-bold text-white">{title}</h3>
     <div className="bg-white rounded-full p-2 border-2 border-white">
      <Image
       src="/profilo-favicon.png"
       alt="PROFILO"
       width={40}
       height={40}
       className="w-10 h-10 object-contain"
      />
     </div>
    </div>
   </div>

   {/* Contact Info */}
   <div className="p-6 space-y-4">
    {/* Phone */}
    <div className="bg-gray-50 rounded-lg p-4 flex items-center justify-between">
     <div className="flex items-center gap-3">
      <div className="bg-indigo-100 p-2 rounded-lg">
       <MdPhone className="text-indigo-600" size={20} />
      </div>
      <div>
       <p className="text-sm text-gray-500">Telefon</p>
       <a href={`tel:${telefon}`} className="text-gray-900 font-semibold hover:text-indigo-600 transition">
        {telefon}
       </a>
      </div>
     </div>
     <a
      href={whatsappLink}
      target="_blank"
      rel="noopener noreferrer"
      className="text-green-600 hover:text-green-700 transition"
      aria-label="WhatsApp"
     >
      <FaWhatsapp size={24} />
     </a>
    </div>

    {/* Email */}
    <div className="bg-gray-50 rounded-lg p-4 flex items-center justify-between">
     <div className="flex items-center gap-3">
      <div className="bg-indigo-100 p-2 rounded-lg">
       <MdEmail className="text-indigo-600" size={20} />
      </div>
      <div>
       <p className="text-sm text-gray-500">Mail</p>
       <a href={`mailto:${email}`} className="text-gray-900 font-semibold hover:text-indigo-600 transition">
        {email}
       </a>
      </div>
     </div>
     <a
      href={`mailto:${email}`}
      className="text-indigo-600 hover:text-indigo-700 transition"
      aria-label="E-posta gönder"
     >
      <HiExternalLink size={20} />
     </a>
    </div>

    {/* Address */}
    <div className="bg-gray-50 rounded-lg p-4">
     <div className="flex items-start gap-3">
      <div className="bg-indigo-100 p-2 rounded-lg">
       <MdLocationOn className="text-indigo-600" size={20} />
      </div>
      <div>
       <p className="text-sm text-gray-500 mb-1">Adres</p>
       <p className="text-gray-900 font-semibold">{adres}</p>
      </div>
     </div>
    </div>

    {/* Map */}
    <div className="rounded-lg overflow-hidden border border-gray-200">
     <div className="relative w-full" style={{ paddingBottom: '56.25%' }}>
      <iframe
       src={mapUrl}
       width="100%"
       height="100%"
       style={{ position: 'absolute', top: 0, left: 0 }}
       allowFullScreen
       loading="lazy"
       referrerPolicy="no-referrer-when-downgrade"
       className="w-full h-full"
      />
     </div>
     <div className="bg-gray-50 px-4 py-3 flex items-center justify-between border-t border-gray-200">
      <Link
       href={mapDirectionsUrl}
       target="_blank"
       rel="noopener noreferrer"
       className="text-indigo-600 hover:text-indigo-700 font-semibold text-sm flex items-center gap-2 transition"
      >
       Yol Tarifi <HiExternalLink size={16} />
      </Link>
      <Link
       href={mapViewUrl}
       target="_blank"
       rel="noopener noreferrer"
       className="text-gray-600 hover:text-gray-700 text-sm flex items-center gap-2 transition"
      >
       Daha büyük haritayı görüntüle <HiExternalLink size={16} />
      </Link>
     </div>
    </div>

    {/* Store Images */}
    {images && images.length > 0 && (
     <div className="grid grid-cols-2 gap-3">
      {images.map((img, idx) => (
       <div key={idx} className="relative aspect-video rounded-lg overflow-hidden">
        <Image
         src={img.url}
         alt={img.alt || `${title} - Görsel ${idx + 1}`}
         fill
         className="object-cover"
        />
       </div>
      ))}
     </div>
    )}
   </div>
  </div>
 );
}