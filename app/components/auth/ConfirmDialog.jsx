"use client";

/**
 * Confirm Dialog Component
 * Onay dialog'u için kullanılır
 * 
 * @param {boolean} show - Dialog görünür mü?
 * @param {string} message - Gösterilecek mesaj
 * @param {function} onConfirm - Onaylandığında callback
 * @param {function} onCancel - İptal edildiğinde callback
 * @param {string} confirmText - Onay butonu metni (varsayılan: "Onayla")
 * @param {string} cancelText - İptal butonu metni (varsayılan: "İptal")
 * @param {string} confirmColor - Onay butonu rengi (varsayılan: "red")
 */
export default function ConfirmDialog({
 show,
 message,
 onConfirm,
 onCancel,
 confirmText = "Onayla",
 cancelText = "İptal",
 confirmColor = "red",
}) {
 if (!show) return null;

 const confirmBgColor = confirmColor === "red" ? "bg-red-600 hover:bg-red-700" : "bg-indigo-600 hover:bg-indigo-700";

 return (
  <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
   <div className="bg-white rounded-xl shadow-2xl max-w-md w-full animate-fadeIn">
    <div className="p-6">
     <h3 className="text-xl font-bold text-gray-900 mb-4">Onay</h3>
     <p className="text-gray-600 mb-6">{message}</p>
     <div className="flex gap-3 justify-end">
      <button
       onClick={onCancel}
       className="px-6 py-2.5 bg-gray-200 hover:bg-gray-300 text-gray-800 rounded-lg font-semibold transition-colors"
      >
       {cancelText}
      </button>
      <button
       onClick={onConfirm}
       className={`px-6 py-2.5 ${confirmBgColor} text-white rounded-lg font-semibold transition-colors`}
      >
       {confirmText}
      </button>
     </div>
    </div>
   </div>
  </div>
 );

}
