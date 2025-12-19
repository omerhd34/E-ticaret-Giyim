"use client";
import Link from "next/link";

/**
 * @param {Object} stats - İstatistik verileri
 * @param {boolean} loading - Yükleme durumu
 */
export default function OrderStatusSummary({ stats, loading }) {
 const statuses = [
  { label: "Beklemede", value: stats?.pendingOrders, badge: "bg-amber-50 text-amber-700 border-amber-200" },
  { label: "Kargoya Verildi", value: stats?.shippedOrders, badge: "bg-blue-50 text-blue-700 border-blue-200" },
  { label: "Teslim Edildi", value: stats?.deliveredOrders, badge: "bg-green-50 text-green-700 border-green-200" },
  { label: "İptal", value: stats?.cancelledOrders, badge: "bg-red-50 text-red-700 border-red-200" },
 ];

 return (
  <div className="bg-white rounded-xl border p-5">
   <div className="flex items-center justify-between gap-3">
    <div>
     <div className="text-sm font-bold text-gray-900">Sipariş Durum Özeti</div>
     <div className="text-xs text-gray-500 mt-1">Beklemede / Kargoya Verildi / Teslim Edildi / İptal</div>
    </div>
    <Link href="/admin/son-siparisler" className="text-sm font-semibold text-indigo-600 hover:text-indigo-800">
     Tümünü Gör →
    </Link>
   </div>

   <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mt-4">
    {statuses.map((s, idx) => (
     <div key={idx} className={`rounded-xl border p-4 ${s.badge}`}>
      <div className="text-xs font-semibold opacity-90">{s.label}</div>
      <div className="text-2xl font-black mt-1">
       {loading ? "…" : (typeof s.value === "number" ? s.value : "-")}
      </div>
     </div>
    ))}
   </div>
  </div>
 );
}
