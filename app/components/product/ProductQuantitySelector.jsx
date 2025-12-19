"use client";

export default function ProductQuantitySelector({ quantity, stock, onQuantityChange }) {
 const maxQuantity = Math.min(stock, 10);

 return (
  <div className="mb-6">
   <h3 className="font-bold text-sm mb-3">Adet</h3>
   <div className="flex items-center border-2 border-gray-200 rounded-lg w-fit">
    <button
     onClick={() => onQuantityChange(Math.max(1, quantity - 1))}
     className="px-4 py-2 hover:bg-gray-100 transition cursor-pointer"
    >
     -
    </button>
    <span className="px-6 font-bold">{quantity}</span>
    <button
     onClick={() => onQuantityChange(Math.min(maxQuantity, quantity + 1))}
     className="px-4 py-2 hover:bg-gray-100 transition cursor-pointer disabled:cursor-not-allowed"
     disabled={quantity >= maxQuantity}
    >
     +
    </button>
   </div>
  </div>
 );
}
