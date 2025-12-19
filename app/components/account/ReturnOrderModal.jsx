"use client";

export default function ReturnOrderModal({ show, orderId, onConfirm, onCancel }) {
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
     <h3 className="text-lg font-bold text-gray-900 mb-2">İade Talebi Oluştur</h3>
     <p className="text-sm text-gray-600 mb-6">
      Bu sipariş için iade talebi oluşturmak istediğinize emin misiniz?
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
       className="px-5 py-2.5 rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white font-semibold transition"
      >
       İade Et
      </button>
     </div>
    </div>
   </div>
  </div>
 );
}
