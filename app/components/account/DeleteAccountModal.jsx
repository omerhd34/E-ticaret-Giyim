"use client";

export default function DeleteAccountModal({ show, deletingAccount, onConfirm, onCancel }) {
 if (!show) return null;

 return (
  <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
   <div className="bg-white rounded-xl shadow-2xl max-w-md w-full p-6">
    <h3 className="text-xl font-bold mb-4 text-red-600">Hesabı Sil</h3>
    <p className="text-gray-600 mb-6">
     Hesabınızı silmek istediğinize emin misiniz? Bu işlem geri alınamaz ve tüm verileriniz kalıcı olarak silinecektir.
    </p>
    <div className="flex gap-3">
     <button
      onClick={onConfirm}
      disabled={deletingAccount}
      className="flex-1 bg-red-600 hover:bg-red-700 text-white py-3 rounded-lg font-semibold transition cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
     >
      {deletingAccount ? "Siliniyor..." : "Evet, Hesabımı Sil"}
     </button>
     <button
      onClick={onCancel}
      disabled={deletingAccount}
      className="flex-1 bg-gray-200 hover:bg-gray-300 text-gray-800 py-3 rounded-lg font-semibold transition cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
     >
      İptal
     </button>
    </div>
   </div>
  </div>
 );
}
