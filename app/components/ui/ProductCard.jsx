"use client";
import Link from "next/link";
import { HiHeart } from "react-icons/hi";
import { useState } from "react";
import { useCart } from "@/context/CartContext";
import Image from "next/image";

export default function ProductCard({ product }) {
 const [isImageHovered, setIsImageHovered] = useState(false);
 const [currentImageIndex, setCurrentImageIndex] = useState(0);
 const { addToCart, addToFavorites, removeFromFavorites, isFavorite: checkFavorite } = useCart();
 const isFavorite = checkFavorite(product._id);

 const images = product.images && product.images.length > 0 ? product.images : ["/1.jpeg"];

 const hasDiscount = product.discountPrice && product.discountPrice < product.price;
 const discountPercentage = hasDiscount
  ? Math.round(((product.price - product.discountPrice) / product.price) * 100)
  : 0;

 return (
  <div className="group bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 relative">
   <div className="absolute top-3 left-3 z-10 flex flex-col gap-2">
    {product.isNew && (
     <span className="bg-blue-600 text-white text-xs font-bold px-3 py-1 rounded-full text-center flex items-center justify-center">
      YENİ
     </span>
    )}
    {discountPercentage > 0 && (
     <span className="bg-red-600 text-white text-xs font-bold px-3 py-1 rounded-full text-center flex items-center justify-center">
      %{discountPercentage} İNDİRİM
     </span>
    )}
   </div>

   <button
    onClick={(e) => {
     e.preventDefault();
     if (isFavorite) {
      removeFromFavorites(product._id);
     } else {
      addToFavorites(product);
     }
    }}
    className={`absolute top-3 right-3 z-10 bg-white p-2 rounded-full shadow-md transition-all cursor-pointer ${isFavorite ? "text-red-500" : "text-gray-400 hover:text-red-500"
     }`}
   >
    <HiHeart size={18} className={isFavorite ? "fill-current" : ""} />
   </button>

   <div
    className="relative aspect-square overflow-hidden bg-gray-100"
    onMouseEnter={() => setIsImageHovered(true)}
    onMouseLeave={() => setIsImageHovered(false)}
   >
    <Link href={`/urun/${product.slug}`} className="block w-full h-full">
     <Image
      width={500}
      height={500}
      src={images[currentImageIndex]}
      alt={product.name}
      className={`w-full h-full object-cover transition-transform duration-500 ${isImageHovered ? "scale-110" : "scale-100"
       }`}
     />
    </Link>

   </div>

   <div className="px-4 pt-3 pb-2 flex justify-center gap-2">
    {images.map((_, index) => (
     <button
      key={index}
      onClick={(e) => {
       e.preventDefault();
       e.stopPropagation();
       setCurrentImageIndex(index);
      }}
      className={`transition-all ${currentImageIndex === index
       ? "w-2.5 h-2.5 bg-indigo-600 rounded-full"
       : "w-2 h-2 bg-gray-300 rounded-full hover:bg-gray-400"
       }`}
      aria-label={`Resim ${index + 1}`}
     />
    ))}
   </div>

   <div className="p-4">
    {product.brand && (
     <p className="text-xs text-gray-500 uppercase tracking-wide mb-1">
      {product.brand}
     </p>
    )}

    <div className="flex items-center gap-2 mb-2">
     <h3 className="font-semibold text-gray-800 line-clamp-2 flex-1 min-w-0">
      <Link href={`/urun/${product.slug}`} className="hover:text-indigo-600 transition no-underline">
       {product.name}
      </Link>
     </h3>
     <div className="flex items-center gap-1 shrink-0">
      <div className="flex text-yellow-400">
       {[...Array(5)].map((_, i) => (
        <svg
         key={i}
         className={`w-4 h-4 ${i < Math.round(product.rating || 0) ? "fill-current" : "fill-transparent stroke-gray-300"}`}
         viewBox="0 0 20 20"
         strokeWidth={1}
        >
         <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
        </svg>
       ))}
      </div>
      <span className="text-xs text-gray-500">
       {product.rating > 0 ? `(${product.reviewCount || 0})` : "(0)"}
      </span>
     </div>
    </div>

    {product.sizes && product.sizes.length > 0 && (
     <div className="flex gap-1 my-3">
      {product.sizes.slice(0, 5).map((size, idx) => (
       <span
        key={idx}
        className="text-xs border border-gray-300 px-2 py-1 rounded"
       >
        {size}
       </span>
      ))}
      {product.sizes.length > 5 && (
       <span className="text-xs text-gray-500 px-2 py-1">
        +{product.sizes.length - 5}
       </span>
      )}
     </div>
    )}

    <div className="flex items-center gap-2">
     {hasDiscount ? (
      <>
       <span className="text-lg font-bold text-indigo-600">
        {product.discountPrice} ₺
       </span>
       <span className="text-sm text-gray-400 line-through">
        {product.price} ₺
       </span>
      </>
     ) : (
      <span className="text-lg font-bold text-gray-800">
       {product.price} ₺
      </span>
     )}
    </div>
   </div>
  </div>
 );
}
