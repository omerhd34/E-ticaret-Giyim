"use client";

export default function NewsletterSection() {
 return (
  <section className="bg-linear-to-r from-indigo-600 to-purple-600 py-16">
   <div className="container mx-auto px-4 text-center">
    <h2 className="text-3xl md:text-4xl font-black text-white mb-4">
     Kampanyalardan Haberdar Olun
    </h2>
    <p className="text-indigo-100 text-lg mb-8 max-w-2xl mx-auto">
     Özel indirimler ve yeni ürünler hakkında ilk siz haberdar olun
    </p>
    <div className="max-w-md mx-auto flex gap-3">
     <input
      type="email"
      placeholder="E-posta adresiniz"
      className="flex-1 px-6 py-4 rounded-full outline-none text-gray-800 font-medium border-2 border-white focus:border-yellow-300 transition"
     />
     <button className="bg-yellow-400 hover:bg-yellow-300 text-gray-900 px-8 py-4 rounded-full font-bold transition">
      Abone Ol
     </button>
    </div>
   </div>
  </section>
 );
}
