"use client";

export default function ProductPrice({ displayPrice, hasDiscount, originalPrice }) {
 return (
  <div className="flex items-center gap-4 mb-6">
   <span className="text-4xl font-black text-indigo-600">
    {displayPrice.toFixed(2)} ₺
   </span>
   {hasDiscount && (
    <span className="text-xl text-gray-400 line-through">
     {originalPrice.toFixed(2)} ₺
    </span>
   )}
  </div>
 );
}
