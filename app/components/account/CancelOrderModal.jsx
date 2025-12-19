"use client";

export default function CancelOrderModal({ show, orderId, onConfirm, onCancel }) {
 if (!show) return null;

 return (
  <div
   className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-60 p-4"
   onClick={onCancel}
  >
   <div
    className="bg-white rounded-xl shadow-2xl max-w-md w-full"
    onClick={(e) => e.stopPropagation()}
   >
    <div className="p-6">
     <h3 className="text-lg font-bold text-gray-900 mb-2">Siparişi İptal Et</h3>
     <p className="text-sm text-gray-600 mb-6">
      Siparişi iptal etmek istediğinize emin misiniz? Bu işlem geri alınamaz.
     </p>
     <div className="flex justify-end gap-3">
      <button
       onClick={onCancel}
       className="px-5 py-2.5 rounded-lg bg-gray-200 hover:bg-gray-300 text-gray-800 font-semibold transition"
      >
       Vazgeç
      </button>
      <button
       onClick={() => onConfirm(orderId)}
       className="px-5 py-2.5 rounded-lg bg-red-600 hover:bg-red-700 text-white font-semibold transition"
      >
       Evet, İptal Et
      </button>
     </div>
    </div>
   </div>
  </div>
 );
}
