"use client";

export default function ProductDetails({ product }) {
 if (!product.material && (!product.tags || product.tags.length === 0)) {
  return null;
 }

 return (
  <div className="mt-8 pt-8 border-t">
   <h3 className="font-bold text-lg mb-4">Ürün Detayları</h3>
   <dl className="space-y-3">
    {product.material && (
     <div className="flex">
      <dt className="font-semibold w-32 text-gray-600">Materyal:</dt>
      <dd className="text-gray-800">{product.material}</dd>
     </div>
    )}
    {product.category && (
     <div className="flex">
      <dt className="font-semibold w-32 text-gray-600">Kategori:</dt>
      <dd className="text-gray-800">{product.category}</dd>
     </div>
    )}
    {product.tags && product.tags.length > 0 && (
     <div className="flex">
      <dt className="font-semibold w-32 text-gray-600">Etiketler:</dt>
      <dd className="flex flex-wrap gap-2">
       {product.tags.map((tag, idx) => (
        <span
         key={idx}
         className="bg-gray-100 px-3 py-1 rounded-full text-sm"
        >
         {tag}
        </span>
       ))}
      </dd>
     </div>
    )}
   </dl>
  </div>
 );
}
