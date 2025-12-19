"use client";

export default function ProductSizeSelector({ sizes, selectedSize, onSizeSelect }) {
 if (!sizes || sizes.length === 0) return null;

 return (
  <div className="mb-6">
   <h3 className="font-bold text-sm mb-3">Beden</h3>
   <div className="flex flex-wrap gap-2">
    {sizes.map((size, idx) => (
     <button
      key={idx}
      onClick={() => onSizeSelect(size)}
      className={`px-4 py-2 rounded-lg border-2 font-semibold text-sm transition cursor-pointer ${selectedSize === size
       ? "border-indigo-600 bg-indigo-50 text-indigo-600"
       : "border-gray-200 hover:border-gray-300"
       }`}
     >
      {size}
     </button>
    ))}
   </div>
  </div>
 );
}
