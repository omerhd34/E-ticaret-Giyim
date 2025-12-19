"use client";
import Image from "next/image";

export default function ProductImageGallery({
 images,
 selectedImage,
 onImageSelect,
 isNew,
 discountPercentage,
 productName,
}) {
 return (
  <div className="space-y-4">
   <div className="relative aspect-5/5 bg-white rounded-xl overflow-hidden shadow-lg">
    {isNew && (
     <span className="absolute top-4 left-4 bg-blue-600 text-white text-xs font-bold px-3 py-1 rounded-full z-10">
      YENİ
     </span>
    )}
    {discountPercentage > 0 && (
     <span className="absolute top-4 right-4 bg-red-600 text-white text-xs font-bold px-3 py-1 rounded-full z-10">
      %{discountPercentage} İNDİRİM
     </span>
    )}
    <Image
     width={500}
     height={500}
     src={images[selectedImage]}
     alt={productName}
     className="w-full h-full object-cover"
    />
   </div>

   {images.length > 1 && (
    <div className="grid grid-cols-6 gap-3">
     {images.map((img, idx) => (
      <button
       key={idx}
       onClick={() => onImageSelect(idx)}
       className={`aspect-square rounded-lg overflow-hidden border-2 transition cursor-pointer ${selectedImage === idx
        ? "border-indigo-600"
        : "border-gray-200 hover:border-gray-300"
        }`}
      >
       <Image
        width={500}
        height={500}
        src={img}
        alt={`${productName} ${idx + 1}`}
        className="w-full h-full object-cover"
       />
      </button>
     ))}
    </div>
   )}
  </div>
 );
}
