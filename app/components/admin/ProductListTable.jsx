"use client";
import Image from "next/image";
import { HiPlus } from "react-icons/hi";
import { MdDelete, MdEdit, MdInventory2 } from "react-icons/md";

/**
 * Product List Table Component
 * @param {Array} products - Ürün listesi
 * @param {function} onEdit - Düzenle butonuna tıklandığında callback
 * @param {function} onDelete - Sil butonuna tıklandığında callback
 * @param {function} onAddNew - Yeni ürün ekle butonuna tıklandığında callback
 */
export default function ProductListTable({ products, onEdit, onDelete, onAddNew }) {
 return (
  <div className="bg-white rounded-xl shadow-md p-6">
   <div className="flex justify-between items-center mb-6">
    <h2 className="text-2xl font-bold">Ürün Yönetimi</h2>
    <button
     onClick={onAddNew}
     className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-3 rounded-lg font-semibold flex items-center gap-2 transition"
    >
     <HiPlus size={20} />
     Yeni Ürün Ekle
    </button>
   </div>

   {products.length === 0 ? (
    <div className="text-center py-12 text-gray-500">
     <MdInventory2 size={64} className="mx-auto mb-4 text-gray-300" />
     <p className="text-lg font-semibold">Henüz ürün eklenmemiş</p>
     <p className="text-sm">Yeni ürün eklemek için yukarıdaki butona tıklayın</p>
    </div>
   ) : (
    <div className="overflow-x-auto">
     <table className="w-full">
      <thead className="bg-gray-50">
       <tr>
        <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Ürün</th>
        <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Kategori</th>
        <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Fiyat (₺)</th>
        <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Stok</th>
        <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Durum</th>
        <th className="px-4 py-3 text-right text-xs font-semibold text-gray-600 uppercase">İşlemler</th>
       </tr>
      </thead>
      <tbody className="divide-y divide-gray-200">
       {products.map((product) => (
        <tr key={product._id} className="hover:bg-gray-50">
         <td className="px-4 py-4">
          <div className="flex items-center gap-3">
           <div className="w-16 h-16 rounded-lg overflow-hidden bg-gray-100 shrink-0">
            {product.images?.[0] ? (
             <Image src={product.images[0]} alt={product.name} width={64} height={64} className="w-16 h-16 object-cover" />
            ) : (
             <div className="w-16 h-16 flex items-center justify-center text-gray-400">
              <MdInventory2 size={28} />
             </div>
            )}
           </div>
           <div>
            <div className="font-bold text-gray-900">{product.name}</div>
            <div className="text-xs text-gray-500">{product.brand || ""}</div>
           </div>
          </div>
         </td>
         <td className="px-4 py-4 text-sm text-gray-700">
          <div className="font-semibold">{product.category}</div>
          <div className="text-xs text-gray-500">{product.subCategory || ""}</div>
         </td>
         <td className="px-4 py-4 text-sm">
          <div className="font-bold text-gray-900">{Number(product.price || 0).toFixed(2)}</div>
          {product.discountPrice ? (
           <div className="text-xs text-green-600 font-semibold">{Number(product.discountPrice || 0).toFixed(2)}</div>
          ) : null}
         </td>
         <td className="px-4 py-4 text-sm font-semibold">{product.stock}</td>
         <td className="px-4 py-4">
          {product.stock > 0 ? (
           <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-bold bg-green-100 text-green-700">
            Stokta
           </span>
          ) : (
           <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-bold bg-red-100 text-red-700">
            Stok Yok
           </span>
          )}
         </td>
         <td className="px-4 py-4 text-right">
          <div className="flex gap-2 justify-end">
           <button
            onClick={() => onEdit(product)}
            className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg text-sm font-semibold transition flex items-center gap-2"
           >
            <MdEdit size={16} />
            Düzenle
           </button>
           <button
            onClick={() => onDelete(product._id)}
            className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg text-sm font-semibold transition flex items-center gap-2"
           >
            <MdDelete size={16} />
            Sil
           </button>
          </div>
         </td>
        </tr>
       ))}
      </tbody>
     </table>
    </div>
   )}
  </div>
 );
}
