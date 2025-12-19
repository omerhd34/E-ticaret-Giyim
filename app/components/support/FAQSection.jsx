"use client";

export default function FAQSection() {
 const faqs = [
  {
   question: "Siparişimi nasıl takip edebilirim?",
   answer: "Sipariş takibi sayfasından sipariş numaranız ile siparişinizin durumunu öğrenebilirsiniz."
  },
  {
   question: "İade işlemi nasıl yapılır?",
   answer: "Ürünü aldıktan sonra 14 gün içinde iade edebilirsiniz. İade için müşteri hizmetlerimizle iletişime geçin."
  },
  {
   question: "Kargo ücreti ne kadar?",
   answer: "500 TL ve üzeri siparişlerde kargo ücretsizdir. Altındaki siparişlerde kargo ücreti uygulanır."
  },
  {
   question: "Ödeme seçenekleri nelerdir?",
   answer: "Tüm kredi kartları ve banka kartları ile ödeme yapabilirsiniz. Taksit seçenekleri mevcuttur."
  }
 ];

 return (
  <div className="bg-white rounded-xl shadow-md p-8">
   <h2 className="text-2xl font-bold text-gray-900 mb-6">Sık Sorulan Sorular</h2>
   <div className="space-y-4">
    {faqs.map((faq, idx) => (
     <div key={idx} className={idx < faqs.length - 1 ? "border-b border-gray-200 pb-4" : ""}>
      <h3 className="font-semibold text-gray-900 mb-2">{faq.question}</h3>
      <p className="text-gray-600 text-sm">{faq.answer}</p>
     </div>
    ))}
   </div>
  </div>
 );
}
