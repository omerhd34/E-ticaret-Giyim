"use client";
import { HiAdjustments } from "react-icons/hi";

export default function CategoryToolbar({ sortBy, onSortChange, onFiltersClick }) {
 return (
  <div className="bg-white rounded-xl shadow-sm p-4 mb-6 flex justify-between items-center flex-wrap gap-4">
   <button
    onClick={onFiltersClick}
    className="lg:hidden flex items-center gap-2 bg-indigo-600 text-white px-4 py-2 rounded-lg font-semibold"
   >
    <HiAdjustments size={18} />
    Filtreler
   </button>

   <div className="flex items-center gap-2">
    <span className="text-sm text-gray-600 font-medium">Sırala:</span>
    <select
     value={sortBy}
     onChange={(e) => onSortChange(e.target.value)}
     className="border border-gray-300 rounded-lg px-4 py-2 text-sm font-medium outline-none focus:ring-2 focus:ring-indigo-500"
    >
     <option value="-createdAt">Yeni Ürünler</option>
     <option value="price">Fiyat: Düşükten Yükseğe</option>
     <option value="-price">Fiyat: Yüksekten Düşüğe</option>
     <option value="-rating">En Yüksek Puan</option>
     <option value="-soldCount">En Çok Satan</option>
    </select>
   </div>
  </div>
 );
}
