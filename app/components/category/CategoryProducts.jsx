"use client";
import ProductCard from "@/app/components/ui/ProductCard";

export default function CategoryProducts({ loading, products, onClearFilters }) {
 if (loading) {
  return (
   <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
    {[...Array(9)].map((_, i) => (
     <div
      key={i}
      className="bg-white rounded-xl overflow-hidden shadow-sm animate-pulse"
     >
      <div className="aspect-3/4 bg-gray-200"></div>
      <div className="p-4 space-y-3">
       <div className="h-4 bg-gray-200 rounded w-3/4"></div>
       <div className="h-4 bg-gray-200 rounded w-1/2"></div>
      </div>
     </div>
    ))}
   </div>
  );
 }

 if (products.length === 0) {
  return (
   <div className="bg-white rounded-xl shadow-sm p-12 text-center">
    <p className="text-gray-500 text-lg">Ürün bulunamadı</p>
    <button
     onClick={onClearFilters}
     className="mt-4 text-indigo-600 hover:text-indigo-800 font-semibold"
    >
     Filtreleri Temizle
    </button>
   </div>
  );
 }

 return (
  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
   {products.map((product) => (
    <ProductCard key={product._id} product={product} />
   ))}
  </div>
 );
}
