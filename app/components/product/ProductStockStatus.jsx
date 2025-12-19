"use client";
import { HiCheck } from "react-icons/hi";

export default function ProductStockStatus({ stock }) {
 return (
  <div className="mb-6">
   {stock > 0 ? (
    <span className="inline-flex items-center gap-2 text-green-600 font-semibold">
     <HiCheck size={20} />
     Stokta
    </span>
   ) : (
    <span className="inline-flex items-center gap-2 text-red-600 font-semibold">
     Stokta Yok
    </span>
   )}
  </div>
 );
}
