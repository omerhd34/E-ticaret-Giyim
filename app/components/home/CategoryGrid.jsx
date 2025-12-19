"use client";
import Link from "next/link";
import Image from "next/image";

const CATEGORIES = [
 { name: "Tişört", img: "/1.jpeg", url: "/kategori/giyim/tisort" },
 { name: "Gömlek", img: "/1.jpeg", url: "/kategori/giyim/gomlek" },
 { name: "Pantolon", img: "/3.jpg", url: "/kategori/giyim/pantolon" },
 { name: "Ayakkabı", img: "/4.jpg", url: "/kategori/ayakkabi" },
 { name: "Sweatshirt", img: "/5.webp", url: "/kategori/giyim/sweatshirt" },
 { name: "Mont", img: "/6.webp", url: "/kategori/giyim/dis-giyim" },
 { name: "Aksesuar", img: "/4.jpg", url: "/kategori/aksesuar" },
 { name: "Spor", img: "/3.jpg", url: "/kategori/giyim/esofman" },
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
