"use client";
import { useMemo } from "react";
import Link from "next/link";
import Image from "next/image";
import { getProductUrl } from "@/app/utils/productUrl";

export default function ProductBundleItems({ product, selectedColor }) {
 // Seçili rengin productsInside array'ini kontrol et
 const currentColorObj = useMemo(() => {
  if (!product || !product.colors || product.colors.length === 0) return null;
  return selectedColor
   ? product.colors.find(c => typeof c === 'object' && c.name === selectedColor)
   : (typeof product.colors[0] === 'object' ? product.colors[0] : null);
 }, [product, selectedColor]);

 const productsInside = currentColorObj?.productsInside;

 // Debug
 console.log("ProductBundleItems - product:", product);
 console.log("ProductBundleItems - selectedColor:", selectedColor);
 console.log("ProductBundleItems - currentColorObj:", currentColorObj);
 console.log("ProductBundleItems - productsInside:", productsInside);

 // productsInside artık tam ürün objeleri array'i
 // Her ürün için ilk rengi kullan
 const bundleProducts = useMemo(() => {
  if (!productsInside || !Array.isArray(productsInside) || productsInside.length === 0) {
   return [];
  }

  return productsInside.map((productItem) => {
   // Ürünün colors array'inden ilk rengi al
   const firstColor = productItem.colors && productItem.colors.length > 0
    ? productItem.colors[0]
    : null;

   if (!firstColor) {
    return null;
   }

   return {
    product: productItem,
    color: firstColor,
    serialNumber: firstColor.serialNumber || ""
   };
  }).filter(Boolean); // null değerleri filtrele
 }, [productsInside]);

 // productsInside yoksa component'i render etme
 if (!productsInside || !Array.isArray(productsInside) || productsInside.length === 0) {
  // Debug için: Eğer product varsa ama productsInside yoksa bir mesaj göster
  if (product && product.colors && product.colors.length > 0) {
   console.warn("ProductBundleItems: productsInside bulunamadı. Product:", product.name, "Color:", currentColorObj?.name);
  }
  return null;
 }

 if (bundleProducts.length === 0) {
  console.warn("ProductBundleItems: bundleProducts boş. productsInside:", productsInside);
  return null;
 }

 return (
  <div className="mt-12">
   <h2 className="text-2xl font-bold text-gray-900 mb-6">Takım İçeriği</h2>
   <div className="grid md:grid-cols-2 gap-6">
    {bundleProducts.map((item, index) => {
     const p = item.product;
     const color = item.color;
     const serialNumber = item.serialNumber;

     const colorPrice = color?.price || p.price;
     const colorDiscountPrice = color?.discountPrice !== undefined ? color.discountPrice : p.discountPrice;
     const colorImages = color?.images && color.images.length > 0 ? color.images : p.images;
     const colorStock = color?.stock !== undefined ? color.stock : p.stock;
     const hasDiscount = colorDiscountPrice && colorDiscountPrice < colorPrice;
     const displayPrice = hasDiscount ? colorDiscountPrice : colorPrice;

     const productUrl = getProductUrl(p, serialNumber);

     return (
      <div key={index} className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow">
       <Link href={productUrl} className="block">
        <div className="flex flex-col md:flex-row">
         <div className="relative w-full md:w-48 h-48 md:h-auto bg-gray-100 shrink-0">
          {colorImages && colorImages.length > 0 ? (
           <Image
            src={colorImages[0]}
            alt={p.name}
            fill
            className="object-contain p-4"
            sizes="(max-width: 768px) 100vw, 192px"
           />
          ) : (
           <div className="w-full h-full flex items-center justify-center text-gray-400">
            <span>Görsel Yok</span>
           </div>
          )}
         </div>
         <div className="flex-1 p-6 flex flex-col justify-between">
          <div>
           {p.brand && (
            <p className="text-sm text-gray-500 uppercase tracking-wide mb-1">
             {p.brand}
            </p>
           )}
           <h3 className="text-lg font-bold text-gray-900 mb-2 line-clamp-2">
            {p.name}
           </h3>
           {serialNumber && (
            <p className="text-sm text-gray-600 mb-3">
             <span className="font-mono">Seri No: {serialNumber}</span>
            </p>
           )}
           {p.description && (
            <p className="text-sm text-gray-600 mb-3 line-clamp-2">
             {p.description}
            </p>
           )}
          </div>
          <div className="flex items-center justify-between mt-4">
           <div>
            {hasDiscount ? (
             <div>
              <span className="text-2xl font-bold text-indigo-600">
               {displayPrice.toLocaleString('tr-TR')} ₺
              </span>
              <span className="text-sm text-gray-500 line-through ml-2">
               {colorPrice.toLocaleString('tr-TR')} ₺
              </span>
             </div>
            ) : (
             <span className="text-2xl font-bold text-indigo-600">
              {displayPrice.toLocaleString('tr-TR')} ₺
             </span>
            )}
           </div>
           <div className="text-sm text-gray-600">
            {colorStock > 0 ? (
             <span className="text-green-600 font-semibold">Stokta Var</span>
            ) : (
             <span className="text-red-600 font-semibold">Stokta Yok</span>
            )}
           </div>
          </div>
         </div>
        </div>
       </Link>
      </div>
     );
    })}
   </div>
  </div>
 );
}

