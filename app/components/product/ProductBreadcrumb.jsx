"use client";
import Link from "next/link";

export default function ProductBreadcrumb({ product }) {
 return (
  <div className="flex items-center gap-2 text-sm mb-8 text-gray-600">
   <Link href="/" className="hover:text-indigo-600">Ana Sayfa</Link>
   <span>/</span>
   <Link href={`/kategori/${product.category}`} className="hover:text-indigo-600">
    {product.category}
   </Link>
   {product.subCategory && (
    <>
     <span>/</span>
     <span className="text-gray-800 font-semibold">{product.subCategory}</span>
    </>
   )}
  </div>
 );
}
