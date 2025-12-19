"use client";

export default function CategoryHeader({ categoryName, productCount }) {
 return (
  <div className="bg-linear-to-r from-indigo-600 to-purple-600 text-white py-12">
   <div className="container mx-auto px-4">
    <h1 className="text-4xl font-black mb-2">{categoryName}</h1>
    <p className="text-indigo-100">
     {productCount} ürün bulundu
    </p>
   </div>
  </div>
 );
}
