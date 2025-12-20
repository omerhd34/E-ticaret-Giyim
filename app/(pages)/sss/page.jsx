"use client";
import Link from "next/link";
import { useState } from "react";
import { HiChevronDown, HiChevronUp } from "react-icons/hi";

export default function SSSPage() {
 const [openIndex, setOpenIndex] = useState(null);

 const faqs = [
  {
   question: "Siparişimi nasıl takip edebilirim?",
   answer: "Sipariş takibi için üst menüden 'Sipariş Takibi' bölümüne gidebilir veya hesabınızdan siparişlerinizi görüntüleyebilirsiniz. Sipariş numaranızı girerek anlık durumunu öğrenebilirsiniz."
  },
  {
   question: "Kargo ücreti ne kadar?",
   answer: "500 TL ve üzeri siparişlerde kargo ücretsizdir. 500 TL altındaki siparişlerde kargo ücreti 29.99 TL'dir. Kargo süresi genellikle 2-5 iş günü arasındadır."
  },
  {
   question: "Ürün iade edebilir miyim?",
   answer: "Evet, ürünlerinizi 14 gün içinde iade edebilirsiniz. Ürünün kullanılmamış, etiketli ve orijinal ambalajında olması gerekmektedir. İade işlemleri için 'İade ve Değişim' sayfasından başvuru yapabilirsiniz."
  },
  {
   question: "Hangi ödeme yöntemlerini kabul ediyorsunuz?",
   answer: "Kredi kartı, banka kartı, havale/EFT ve kapıda ödeme seçeneklerini kabul ediyoruz. Tüm ödemeler güvenli SSL sertifikası ile korunmaktadır."
  },
  {
   question: "Ürün stokta yoksa ne yapabilirim?",
   answer: "Stokta olmayan ürünler için 'Stokta Yok' butonu görüntülenir. Bu ürünleri favorilerinize ekleyerek stok geldiğinde bildirim alabilirsiniz. Stok durumu hakkında bilgi almak için müşteri hizmetlerimizle iletişime geçebilirsiniz."
  },
  {
   question: "Hesabımı nasıl oluşturabilirim?",
   answer: "Sağ üst köşedeki 'Hesabım' butonuna tıklayarak kayıt olabilirsiniz. E-posta adresiniz ve şifrenizle kolayca hesap oluşturabilir, siparişlerinizi takip edebilir ve favori ürünlerinizi kaydedebilirsiniz."
  },
  {
   question: "Şifremi unuttum, ne yapmalıyım?",
   answer: "Giriş sayfasında 'Şifremi Unuttum' linkine tıklayarak e-posta adresinize şifre sıfırlama bağlantısı gönderebilirsiniz. E-postanızı kontrol ederek yeni şifrenizi oluşturabilirsiniz."
  },
  {
   question: "Kampanyalar ve indirimler hakkında nasıl bilgi alabilirim?",
   answer: "Kampanyalar ve indirimler hakkında bilgi almak için e-bültenimize abone olabilirsiniz. Ayrıca 'İndirimler' kategorisinden güncel indirimli ürünleri görüntüleyebilirsiniz."
  },
  {
   question: "Müşteri hizmetlerine nasıl ulaşabilirim?",
   answer: "Müşteri hizmetlerimize 'Destek' sayfasından, e-posta veya telefon ile ulaşabilirsiniz. Çalışma saatlerimiz hafta içi 09:00-18:00 arasındadır. Size en kısa sürede dönüş yapacağız."
  }
 ];

 const toggleFAQ = (index) => {
  setOpenIndex(openIndex === index ? null : index);
 };

 return (
  <div className="min-h-screen bg-gray-50 py-12">
   <div className="container mx-auto px-4">
    {/* Header */}
    <div className="text-center mb-12">
     <h1 className="text-4xl font-black text-gray-900 mb-4">
      Sık Sorulan Sorular
     </h1>
     <p className="text-gray-600 text-lg max-w-2xl mx-auto">
      Merak ettiğiniz soruların yanıtlarını burada bulabilirsiniz. Aradığınızı bulamazsanız, müşteri hizmetlerimizle iletişime geçebilirsiniz.
     </p>
    </div>

    {/* FAQ List */}
    <div className="max-w-3xl mx-auto">
     <div className="space-y-4">
      {faqs.map((faq, index) => (
       <div
        key={index}
        className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden transition-all hover:shadow-md"
       >
        <button
         onClick={() => toggleFAQ(index)}
         className="w-full px-6 py-5 flex items-center justify-between text-left focus:outline-none focus:ring-2 focus:ring-indigo-500 rounded-xl"
        >
         <span className="font-semibold text-gray-800 text-lg pr-4">
          {faq.question}
         </span>
         {openIndex === index ? (
          <HiChevronUp size={24} className="text-indigo-600 shrink-0" />
         ) : (
          <HiChevronDown size={24} className="text-gray-400 shrink-0" />
         )}
        </button>
        {openIndex === index && (
         <div className="px-6 pb-5 pt-0">
          <div className="pt-4 border-t border-gray-100">
           <p className="text-gray-600 leading-relaxed">
            {faq.answer}
           </p>
          </div>
         </div>
        )}
       </div>
      ))}
     </div>

     {/* Contact Section */}
     <div className="mt-12 bg-linear-to-r from-indigo-600 to-purple-600 rounded-xl p-8 text-white text-center">
      <h2 className="text-2xl font-bold mb-3">
       Sorunuz mu var?
      </h2>
      <p className="text-indigo-100 mb-6">
       Aradığınızı bulamadınız mı? Müşteri hizmetlerimizle iletişime geçin, size yardımcı olalım.
      </p>
      <Link
       href="/destek"
       className="inline-block bg-white text-indigo-600 px-8 py-3 rounded-full font-semibold hover:bg-indigo-50 transition"
      >
       Destek Sayfasına Git
      </Link>
     </div>
    </div>
   </div>
  </div>
 );
}
