"use client";
import { useState } from "react";
import SuccessMessage from "./SuccessMessage";

export default function ContactForm() {
 const [formData, setFormData] = useState({
  name: "",
  email: "",
  phone: "",
  subject: "",
  message: "",
 });
 const [submitted, setSubmitted] = useState(false);

 const handleSubmit = (e) => {
  e.preventDefault();
  setSubmitted(true);
  setTimeout(() => {
   setSubmitted(false);
   setFormData({ name: "", email: "", phone: "", subject: "", message: "" });
  }, 3000);
 };

 if (submitted) {
  return <SuccessMessage />;
 }

 return (
  <form onSubmit={handleSubmit} className="space-y-6">
   <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
    <div>
     <label className="block text-sm font-semibold text-gray-700 mb-2">
      Ad Soyad <span className="text-red-600">*</span>
     </label>
     <input
      type="text"
      required
      value={formData.name}
      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition"
      placeholder="Adınız ve soyadınız"
     />
    </div>

    <div>
     <label className="block text-sm font-semibold text-gray-700 mb-2">
      E-posta <span className="text-red-600">*</span>
     </label>
     <input
      type="email"
      required
      value={formData.email}
      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition"
      placeholder="ornek@email.com"
     />
    </div>
   </div>

   <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
    <div>
     <label className="block text-sm font-semibold text-gray-700 mb-2">
      Telefon
     </label>
     <input
      type="tel"
      value={formData.phone}
      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition"
      placeholder="0500 000 00 00"
     />
    </div>

    <div>
     <label className="block text-sm font-semibold text-gray-700 mb-2">
      Konu <span className="text-red-600">*</span>
     </label>
     <select
      required
      value={formData.subject}
      onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition"
     >
      <option value="">Konu seçiniz</option>
      <option value="siparis">Sipariş Sorunu</option>
      <option value="iade">İade & Değişim</option>
      <option value="urun">Ürün Sorusu</option>
      <option value="kargo">Kargo Sorunu</option>
      <option value="odeme">Ödeme Sorunu</option>
      <option value="diger">Diğer</option>
     </select>
    </div>
   </div>

   <div>
    <label className="block text-sm font-semibold text-gray-700 mb-2">
     Mesajınız <span className="text-red-600">*</span>
    </label>
    <textarea
     required
     value={formData.message}
     onChange={(e) => setFormData({ ...formData, message: e.target.value })}
     rows={6}
     className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition resize-none"
     placeholder="Mesajınızı buraya yazın..."
    />
   </div>

   <button
    type="submit"
    className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-4 rounded-lg transition shadow-lg hover:shadow-xl"
   >
    Mesaj Gönder
   </button>
  </form>
 );
}
