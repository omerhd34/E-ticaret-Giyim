"use client";
import { FaShoppingCart } from "react-icons/fa";
import { HiHeart } from "react-icons/hi";

export default function ProductActions({
 productId,
 stock,
 addedToCart,
 isFavorite,
 onAddToCart,
 onFavoriteToggle,
}) {
 return (
  <div className="flex gap-3 mb-8">
   <button
    onClick={onAddToCart}
    disabled={stock === 0}
    className={`flex-1 py-4 rounded-lg font-bold text-lg transition flex items-center justify-center gap-2 ${addedToCart
     ? "bg-green-600 text-white cursor-pointer"
     : stock > 0
      ? "bg-indigo-600 hover:bg-indigo-700 text-white cursor-pointer"
      : "bg-gray-300 text-gray-500 cursor-not-allowed"
     }`}
   >
    <FaShoppingCart size={24} />
    {addedToCart ? "Sepete Eklendi!" : "Sepete Ekle"}
   </button>
   <button
    onClick={onFavoriteToggle}
    className={`p-4 rounded-lg border-2 transition cursor-pointer ${isFavorite
     ? "border-red-500 bg-red-50 text-red-500"
     : "border-gray-200 hover:border-red-500 hover:text-red-500"
     }`}
   >
    <HiHeart size={24} className={isFavorite ? "fill-current" : ""} />
   </button>
  </div>
 );
}
