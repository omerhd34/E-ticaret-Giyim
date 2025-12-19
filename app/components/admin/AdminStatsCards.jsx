"use client";
import { MdReceiptLong, MdInventory2, MdPeople, MdTrendingUp } from "react-icons/md";

/**
 * Admin Stats Cards Component
 * 
 * @param {Object} stats - İstatistik verileri
 * @param {boolean} loading - Yükleme durumu
 */
export default function AdminStatsCards({ stats, loading }) {
 const cards = [
  { label: "Toplam Kullanıcı", value: stats?.userCount, icon: MdPeople, color: "bg-emerald-500" },
  { label: "Toplam Sipariş", value: stats?.totalOrders, icon: MdReceiptLong, color: "bg-indigo-500" },
  { label: "Toplam Ürün", value: stats?.productCount, icon: MdInventory2, color: "bg-blue-500" },
  { label: "Stokta Ürün", value: stats?.inStockProductCount, icon: MdTrendingUp, color: "bg-purple-500" },
 ];

 return (
  <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
   {cards.map((c, idx) => (
    <div key={idx} className="bg-gray-50 rounded-xl border p-4 flex items-center gap-3">
     <div className={`${c.color} w-10 h-10 rounded-lg text-white flex items-center justify-center`}>
      <c.icon size={20} />
     </div>
     <div>
      <div className="text-xs text-gray-500 font-semibold">{c.label}</div>
      <div className="text-xl font-black text-gray-900">
       {loading ? "…" : (typeof c.value === "number" ? c.value : "-")}
      </div>
     </div>
    </div>
   ))}
  </div>
 );
}
