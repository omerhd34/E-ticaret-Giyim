"use client";

export default function ProductLoading() {
 return (
  <div className="min-h-screen bg-gray-50 py-12">
   <div className="container mx-auto px-4">
    <div className="grid lg:grid-cols-2 gap-12">
     <div className="space-y-4">
      <div className="aspect-square bg-gray-200 rounded-xl animate-pulse"></div>
      <div className="grid grid-cols-4 gap-4">
       {[...Array(4)].map((_, i) => (
        <div key={i} className="aspect-square bg-gray-200 rounded-lg animate-pulse"></div>
       ))}
      </div>
     </div>
     <div className="space-y-6">
      <div className="h-8 bg-gray-200 rounded animate-pulse w-3/4"></div>
      <div className="h-12 bg-gray-200 rounded animate-pulse w-1/2"></div>
      <div className="h-24 bg-gray-200 rounded animate-pulse"></div>
     </div>
    </div>
   </div>
  </div>
 );
}
