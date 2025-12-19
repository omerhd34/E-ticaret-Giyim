"use client";
import { HiCheckCircle } from "react-icons/hi";

export default function PaymentCardCard({ card, selected, onSelect }) {
 const id = card?._id?.toString ? card._id.toString() : card?._id;
 const masked = card.cardNumber ? card.cardNumber.replace(/\d(?=\d{4})/g, "*") : "****";

 return (
  <label
   className={`cursor-pointer border-2 rounded-xl p-4 transition ${selected
    ? "border-indigo-600 bg-white"
    : "border-gray-200 hover:border-indigo-300"
    }`}
   onClick={() => onSelect(String(id))}
  >
   <div className="flex items-start justify-between gap-3">
    <div>
     <div className="flex items-center gap-2">
      <input
       type="radio"
       name="card"
       checked={selected}
       onChange={() => onSelect(String(id))}
      />
      <span className="font-bold text-gray-900">{card.cardName}</span>
      {card.isDefault && (
       <span className="text-xs bg-indigo-600 text-white px-2 py-1 rounded">
        Varsayılan
       </span>
      )}
     </div>
     <p className="text-sm text-gray-700 mt-2 font-mono">{masked}</p>
     <p className="text-xs text-gray-600 mt-1">
      Son kullanım: {card.expiryDate || "--/--"}
     </p>
     <p className="text-xs text-gray-600 mt-1">
      Kart Sahibi: {card.cardHolderName || "-"}
     </p>
    </div>
    {selected && (
     <HiCheckCircle className="text-indigo-600 shrink-0" size={22} />
    )}
   </div>
  </label>
 );
}
