"use client";

export default function SizeFilter({ availableSizes, selectedSizes, onSizeToggle, isMobile = false }) {
 if (!availableSizes || availableSizes.length === 0) {
  return null;
 }

 return (
  <div className={isMobile ? "" : "mb-6 pb-6 border-b"}>
   <h4 className="font-semibold mb-4">Beden</h4>
   <div className="grid grid-cols-3 gap-2">
    {availableSizes.map((size) => (
     <button
      key={size}
      onClick={() => onSizeToggle(size)}
      className={`py-2 rounded-lg text-sm font-semibold transition ${selectedSizes.includes(size)
       ? "bg-indigo-600 text-white"
       : "bg-gray-100 text-gray-700 hover:bg-gray-200"
       }`}
     >
      {size}
     </button>
    ))}
   </div>
  </div>
 );
}
