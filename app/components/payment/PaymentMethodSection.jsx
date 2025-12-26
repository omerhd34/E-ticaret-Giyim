"use client";
import Link from "next/link";
import { MdCreditCard, MdAccountBalance, MdLocalShipping } from "react-icons/md";
import PaymentCardCard from "./PaymentCardCard";

export default function PaymentMethodSection({
 paymentMethod,
 cards,
 cardsLoading,
 onPaymentMethodChange,
 onCardSelect,
}) {
 return (
  <div className="bg-white rounded-xl shadow-sm p-6">
   <h2 className="text-xl font-bold text-gray-900 flex items-center gap-2 mb-4">
    <MdCreditCard className="text-indigo-600" size={22} />
    Ödeme Seçenekleri
   </h2>

   <div className="space-y-4">
    <div className={`border rounded-xl p-4 ${paymentMethod.type === "card" ? "border-indigo-300 bg-indigo-50" : "border-gray-200"}`}>
     <label className="flex items-center gap-2 font-semibold text-gray-900 cursor-pointer">
      <input
       type="radio"
       name="payment"
       checked={paymentMethod.type === "card"}
       onChange={() => onPaymentMethodChange((prev) => ({ type: "card", cardId: prev.type === "card" ? prev.cardId : "" }))}
      />
      <MdCreditCard className="text-indigo-600" size={20} />
      Kart ile Öde
     </label>

     {paymentMethod.type === "card" && (
      <div className="mt-4">
       <div className="flex items-center justify-between mb-3">
        <span className="text-sm text-gray-600">Kayıtlı Kartlarım</span>
        <Link
         href="/hesabim?tab=kartlar"
         className="text-sm font-semibold text-indigo-600 hover:text-indigo-800"
        >
         Kart Ekle / Düzenle →
        </Link>
       </div>

       {cardsLoading ? (
        <div className="text-gray-500 text-sm">Kartlar yükleniyor...</div>
       ) : cards.length === 0 ? (
        <div className="border border-dashed rounded-lg p-4 text-sm text-gray-600">
         Kayıtlı kartınız yok. Devam etmek için bir kart ekleyin veya kapıda ödeme seçin.
        </div>
       ) : (
        <div className="grid md:grid-cols-2 gap-3">
         {cards.map((c) => {
          const id = c?._id?.toString ? c._id.toString() : c?._id;
          const selected = paymentMethod.type === "card" && String(paymentMethod.cardId) === String(id);
          return (
           <PaymentCardCard
            key={id}
            card={c}
            selected={selected}
            onSelect={onCardSelect}
           />
          );
         })}
        </div>
       )}
      </div>
     )}
    </div>

    <div className={`border rounded-xl p-4 ${paymentMethod.type === "havale" ? "border-indigo-300 bg-indigo-50" : "border-gray-200"}`}>
     <label className="flex items-center gap-2 font-semibold text-gray-900 cursor-pointer">
      <input
       type="radio"
       name="payment"
       checked={paymentMethod.type === "havale"}
       onChange={() => onPaymentMethodChange({ type: "havale" })}
      />
      <MdAccountBalance className="text-indigo-600" size={20} />
      Havale ve EFT ile Ödeme
     </label>

     {paymentMethod.type === "havale" && (
      <div className="mt-4 space-y-2">
       <p className="text-sm text-gray-600">
        IBAN&apos;a para transferi yaparak ödeme yapabilirsiniz.
       </p>
       <div className="bg-gray-50 rounded-lg p-3 space-y-1.5 mt-3">
        <div className="text-sm">
         <span className="font-semibold text-gray-700">IBAN: </span>
         <span className="text-gray-900 font-mono">TR33 0006 1005 0000 0006 6123 45</span>
        </div>
        <div className="text-sm">
         <span className="font-semibold text-gray-700">Alıcı Adı ve Soyadı: </span>
         <span className="text-gray-900">İlhan Yazıcı</span>
        </div>
       </div>
      </div>
     )}
    </div>

    <div className={`border rounded-xl p-4 ${paymentMethod.type === "cash" ? "border-indigo-300 bg-indigo-50" : "border-gray-200"}`}>
     <label className="flex items-center gap-2 font-semibold text-gray-900 cursor-pointer">
      <input
       type="radio"
       name="payment"
       checked={paymentMethod.type === "cash"}
       onChange={() => onPaymentMethodChange({ type: "cash" })}
      />
      <MdLocalShipping className="text-indigo-600" size={20} />
      Kapıda Ödeme
     </label>
     <p className="text-sm text-gray-600 mt-2">
      Kargonuz teslim edilirken ödeme yapabilirsiniz.
     </p>
    </div>
   </div>
  </div>
 );
}
