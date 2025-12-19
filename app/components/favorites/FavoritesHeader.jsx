"use client";

export default function FavoritesHeader({ productCount }) {
 return (
  <div className="mb-8">
   <h1 className="text-3xl font-black text-gray-900 mb-2">
    Favorilerim
   </h1>
   <p className="text-gray-600">
    {productCount} ürün favorilerinizde
   </p>
  </div>
 );
}
