"use client";
import Link from "next/link";
import Image from "next/image";

export default function BannerSection() {
 return (
  <section className="container mx-auto px-4 py-12">
   <div className="relative bg-linear-to-r from-amber-500 to-orange-600 rounded-3xl overflow-hidden shadow-xl">
    <div className="grid md:grid-cols-2 items-center">
     <div className="p-12 text-white">
      <span className="inline-block bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full text-sm font-semibold mb-4">
       ⚡ Özel İndirim
      </span>
      <h2 className="text-4xl md:text-5xl font-black mb-4">
       Tüm Ürünlerde
       <br />
       <span className="text-yellow-200">%30&apos;a Varan İndirim</span>
      </h2>
      <p className="text-lg mb-6 text-orange-100">
       Sezonun en iyi fırsatlarını kaçırmayın
      </p>
      <Link
       href="/kategori/indirim"
       className="inline-block bg-white text-orange-600 px-8 py-4 rounded-full font-bold text-lg hover:bg-yellow-200 transition shadow-lg"
      >
       Hemen Keşfet
      </Link>
     </div>
     <div className="hidden md:block max-h-96 overflow-hidden">
      <Image
       src="/5.webp"
       width={700}
       height={700}
       alt="Sale Banner"
       className="w-full h-full object-cover"
      />
     </div>
    </div>
   </div>
  </section>
 );
}
