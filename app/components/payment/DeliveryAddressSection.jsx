"use client";
import Link from "next/link";
import { HiLocationMarker } from "react-icons/hi";
import PaymentAddressCard from "./PaymentAddressCard";

export default function DeliveryAddressSection({
 addresses,
 addressesLoading,
 selectedAddressId,
 onAddressSelect,
}) {
 return (
  <div className="bg-white rounded-xl shadow-sm p-6">
   <div className="flex items-center justify-between mb-4">
    <h2 className="text-xl font-bold text-gray-900 flex items-center gap-2">
     <HiLocationMarker className="text-indigo-600" size={22} />
     Teslimat Adresi
    </h2>
    <Link
     href="/hesabim?tab=adresler"
     className="text-sm font-semibold text-indigo-600 hover:text-indigo-800"
    >
     Adres Ekle / Düzenle →
    </Link>
   </div>

   {addressesLoading ? (
    <div className="text-gray-500 text-sm">Adresler yükleniyor...</div>
   ) : addresses.length === 0 ? (
    <div className="border border-dashed rounded-lg p-4 text-sm text-gray-600">
     Kayıtlı adresiniz yok. Devam etmek için lütfen bir adres ekleyin.
    </div>
   ) : (
    <div className="grid md:grid-cols-2 gap-4">
     {addresses.map((addr) => {
      const id = addr?._id?.toString ? addr._id.toString() : addr?._id;
      const selected = String(selectedAddressId) === String(id);
      return (
       <PaymentAddressCard
        key={id}
        address={addr}
        selected={selected}
        onSelect={onAddressSelect}
       />
      );
     })}
    </div>
   )}
  </div>
 );
}
