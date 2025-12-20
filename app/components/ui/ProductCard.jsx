"use client";
import Link from "next/link";
import { HiHeart, HiChevronLeft, HiChevronRight } from "react-icons/hi";
import { useState } from "react";
import { useCart } from "@/context/CartContext";
import Image from "next/image";
import { getProductUrl } from "@/app/utils/productUrl";

export default function ProductCard({ product }) {
 const [isImageHovered, setIsImageHovered] = useState(false);
 const [currentImageIndex, setCurrentImageIndex] = useState(0);
 const { addToCart, addToFavorites, removeFromFavorites, isFavorite: checkFavorite } = useCart();
 const isFavorite = checkFavorite(product._id);

 // Renk bazlı resim ve fiyat
 const firstColor = product.colors && product.colors.length > 0 && typeof product.colors[0] === 'object'
  ? product.colors[0]
  : null;
 const images = firstColor?.images && firstColor.images.length > 0
  ? firstColor.images
  : (product.images && product.images.length > 0 ? product.images : ["/1.jpeg"]);

 const colorPrice = firstColor?.price || product.price;
 const colorDiscountPrice = firstColor?.discountPrice !== undefined ? firstColor.discountPrice : product.discountPrice;
 const colorSerialNumber = firstColor?.serialNumber || product.serialNumber;

 const hasDiscount = colorDiscountPrice && colorDiscountPrice < colorPrice;
 const discountPercentage = hasDiscount
  ? Math.round(((colorPrice - colorDiscountPrice) / colorPrice) * 100)
  : 0;

 // Ürün URL'ini oluştur
 const productUrl = getProductUrl(product, colorSerialNumber);

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
    className="relative aspect-square overflow-hidden bg-gray-100 flex items-center justify-center p-4"
    onMouseEnter={() => setIsImageHovered(true)}
    onMouseLeave={() => setIsImageHovered(false)}
   >
    <Link href={productUrl} className="w-full h-full flex items-center justify-center">
     <Image
      width={600}
      height={600}
      src={images[currentImageIndex]}
      alt={product.name}
      quality={90}
      className={`max-w-full max-h-full object-contain transition-transform duration-500 ${isImageHovered ? "scale-110" : "scale-100"
       }`}
     />
    </Link>

    {images.length > 1 && (
     <>
      <button
       onClick={(e) => {
        e.preventDefault();
        e.stopPropagation();
        setCurrentImageIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
       }}
       className="absolute left-2 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white p-2 rounded-full shadow-md transition-all z-20"
       aria-label="Önceki resim"
      >
       <HiChevronLeft size={20} className="text-gray-700" />
      </button>
      <button
       onClick={(e) => {
        e.preventDefault();
        e.stopPropagation();
        setCurrentImageIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
       }}
       className="absolute right-2 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white p-2 rounded-full shadow-md transition-all z-20"
       aria-label="Sonraki resim"
      >
       <HiChevronRight size={20} className="text-gray-700" />
      </button>
     </>
    )}
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
      {colorSerialNumber && (
       <span className="ml-2 font-mono text-gray-600 normal-case">- {colorSerialNumber}</span>
      )}
     </p>
    )}
    {!product.brand && colorSerialNumber && (
     <p className="text-xs text-gray-500 mb-1">
      <span className="font-mono text-gray-600">Seri No: {colorSerialNumber}</span>
     </p>
    )}

    <div className="flex items-center gap-2 mb-2">
     <h3 className="font-semibold text-gray-800 line-clamp-2 flex-1 min-w-0">
      <Link href={productUrl} className="hover:text-indigo-600 transition no-underline">
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


    <div className="flex items-center gap-2">
     {hasDiscount ? (
      <>
       <span className="text-lg font-bold text-indigo-600">
        {colorDiscountPrice} ₺
       </span>
       <span className="text-sm text-gray-400 line-through">
        {colorPrice} ₺
       </span>
      </>
     ) : (
      <span className="text-lg font-bold text-gray-800">
       {colorPrice} ₺
      </span>
     )}
    </div>
   </div>
  </div>
 );
}
