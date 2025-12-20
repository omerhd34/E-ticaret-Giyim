"use client";
import Link from "next/link";
import Image from "next/image";

const CATEGORIES = [
 { name: "Buzdolabı", img: "/buzdolabi.webp", url: "/kategori/beyaz-esya/buzdolabi" },
 { name: "Çamaşır Makinesi", img: "/camasir.png", url: "/kategori/beyaz-esya/camasir-makinesi" },
 { name: "Bulaşık Makinesi", img: "/bulasik.png", url: "/kategori/beyaz-esya/bulasik-makinesi" },
 { name: "Fırın", img: "/firin.png", url: "/kategori/beyaz-esya/firin" },
 { name: "Set Üstü Ocak", img: "/ocak.png", url: "/kategori/beyaz-esya/set-ustu-ocak" },
 { name: "Televizyon", img: "/tv.png", url: "/kategori/televizyon" },
 { name: "Elektrikli Süpürge", img: "/supurge.png", url: "/kategori/elektrikli-supurge" },
 { name: "Kurutma Makinesi", img: "/kurutma.png", url: "/kategori/beyaz-esya/kurutma-makinesi" },
 { name: "Ankastre", img: "/ankastre.png", url: "/kategori/ankastre" },
 { name: "Klima", img: "/klima.png", url: "/kategori/klima" },
 { name: "Su Arıtma Cihazı", img: "/suaritma.png", url: "/kategori/su-sebilleri-ve-su-aritma/su-aritma-cihazi" },
 { name: "Su Sebili", img: "/susebili.png", url: "/kategori/su-sebilleri-ve-su-aritma/su-sebili" },
];

export default function CategoryGrid() {
 return (
  <section className="container mx-auto px-4 py-12">
   <h2 className="text-3xl font-black text-gray-900 mb-8">Kategoriler</h2>
   <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
    {CATEGORIES.map((cat, idx) => (
     <Link
      key={idx}
      href={cat.url}
      className="group relative aspect-square overflow-hidden rounded-xl shadow-md hover:shadow-xl transition"
     >
      <Image
       width={500}
       height={500}
       src={cat.img}
       alt={cat.name}
       className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
      />
      <div className="absolute inset-0 bg-linear-to-t from-black/70 to-transparent flex items-end p-4">
       <h3 className="text-white font-bold text-lg">{cat.name}</h3>
      </div>
     </Link>
    ))}
   </div>
  </section>
 );
}
