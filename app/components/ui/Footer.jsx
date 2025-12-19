"use client";
import Link from "next/link";
import { FaFacebook, FaInstagram, FaTwitter } from "react-icons/fa";
import { HiMail, HiPhone, HiLocationMarker } from "react-icons/hi";
import { MdCreditCard, MdLocalShipping, MdSecurity, MdRefresh } from "react-icons/md";

const SOCIAL_LINKS = [
 { icon: FaFacebook, href: "#", label: "Facebook" },
 { icon: FaInstagram, href: "#", label: "Instagram" },
 { icon: FaTwitter, href: "#", label: "Twitter" },
];

const QUICK_LINKS = [
 { name: "Ana Sayfa", href: "/" },
 { name: "Yeni Gelenler", href: "/kategori/yeni" },
 { name: "İndirimler", href: "/kategori/indirim" },
 { name: "Favorilerim", href: "/favoriler" },
 { name: "Sepetim", href: "/sepet" },
];

const CUSTOMER_SERVICE_LINKS = [
 { name: "Hesabım", href: "/hesabim" },
 { name: "Siparişlerim", href: "/hesabim" },
 { name: "Destek", href: "/destek" },
 { name: "İade & Değişim", href: "/iade-degisim" },
 { name: "Sık Sorulan Sorular", href: "/sss" },
];

const FEATURES = [
 { icon: MdLocalShipping, title: "Ücretsiz Kargo", description: "500 TL ve üzeri siparişlerde" },
 { icon: MdRefresh, title: "Kolay İade", description: "14 gün içinde iade garantisi" },
 { icon: MdSecurity, title: "Güvenli Ödeme", description: "256-bit SSL şifreleme" },
 { icon: MdCreditCard, title: "Taksit Seçenekleri", description: "Tüm kartlara taksit imkanı" },
];

const POLICY_LINKS = [
 { name: "Biz Kimiz", href: "/biz-kimiz" },
 { name: "Gizlilik Politikası", href: "/gizlilik-politikasi" },
 { name: "Kullanım Koşulları", href: "/kullanim-kosullari" },
 { name: "Çerez Politikası", href: "/cerez-politikasi" },
];

const Footer = () => {
 const currentYear = new Date().getFullYear();

 return (
  <footer className="bg-gray-900 text-gray-300 mt-auto">
   <div className="container mx-auto px-4 py-12">
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
     <div>
      <h3 className="text-2xl font-black text-white mb-4">SHOP.CO</h3>
      <p className="text-sm mb-4 leading-relaxed">
       Erkek giyim dünyasında en yeni trendleri keşfedin. Kaliteli ürünler, hızlı teslimat ve müşteri memnuniyeti önceliğimizdir.
      </p>
      <div className="flex gap-3 mt-6">
       {SOCIAL_LINKS.map((social) => {
        const Icon = social.icon;
        return (
         <Link
          key={social.label}
          href={social.href}
          className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-indigo-600 transition"
          aria-label={social.label}
         >
          <Icon size={18} />
         </Link>
        );
       })}
      </div>
     </div>

     <div>
      <h4 className="text-white font-bold mb-4">Hızlı Linkler</h4>
      <ul className="space-y-2">
       {QUICK_LINKS.map((link) => (
        <li key={link.href}>
         <Link href={link.href} className="hover:text-indigo-400 transition text-sm">
          {link.name}
         </Link>
        </li>
       ))}
      </ul>
     </div>

     <div>
      <h4 className="text-white font-bold mb-4">Müşteri Hizmetleri</h4>
      <ul className="space-y-2">
       {CUSTOMER_SERVICE_LINKS.map((link) => (
        <li key={link.name}>
         <Link href={link.href} className="hover:text-indigo-400 transition text-sm">
          {link.name}
         </Link>
        </li>
       ))}
      </ul>
     </div>

     <div>
      <h4 className="text-white font-bold mb-4">İletişim</h4>
      <ul className="space-y-3">
       <li className="flex items-start gap-3">
        <HiLocationMarker size={18} className="mt-0.5 text-indigo-400 shrink-0" />
        <span className="text-sm">
         Mimar Sinan Mahallesi, Orhangazi Caddesi
         <br />
         No: 10-12 Kat 1 Daire 5
         <br />
         İnegöl, Bursa
        </span>
       </li>
       <li className="flex items-center gap-3">
        <HiPhone size={18} className="text-indigo-400 shrink-0" />
        <Link href="tel:+905078492903" className="text-sm hover:text-indigo-400 transition">
         0507 849 29 03
        </Link>
       </li>
       <li className="flex items-center gap-3">
        <HiMail size={18} className="text-indigo-400 shrink-0" />
        <Link href="mailto:destek@shop.co" className="text-sm hover:text-indigo-400 transition">
         destek@shop.co
        </Link>
       </li>
      </ul>
     </div>
    </div>

    <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mt-12 pt-8 border-t border-gray-800">
     {FEATURES.map((feature) => {
      const Icon = feature.icon;
      return (
       <div key={feature.title} className="flex items-center gap-3">
        <div className="bg-indigo-600 p-3 rounded-lg">
         <Icon size={24} className="text-white" />
        </div>
        <div>
         <h5 className="text-white font-semibold text-sm">{feature.title}</h5>
         <p className="text-xs text-gray-400">{feature.description}</p>
        </div>
       </div>
      );
     })}
    </div>
   </div>

   <div className="border-t border-gray-800">
    <div className="container mx-auto px-4 py-6">
     <div className="flex flex-col md:flex-row justify-between items-center gap-4">
      <div className="flex flex-col gap-1">
       <p className="text-sm text-gray-400">
        © {currentYear} SHOP.CO. Tüm hakları saklıdır.
       </p>
       <p className="text-xs text-gray-500">
        Site tasarımı ve geliştirme:{" "}
        <Link
         href="https://www.omerhalisdemir.com.tr/"
         target="_blank"
         rel="noopener noreferrer"
         className="text-indigo-400 font-semibold hover:text-indigo-300 transition"
        >
         OHD
        </Link>
       </p>
      </div>
      <div className="flex gap-6 text-sm">
       {POLICY_LINKS.map((link) => (
        <Link key={link.href} href={link.href} className="hover:text-indigo-400 transition">
         {link.name}
        </Link>
       ))}
      </div>
     </div>
    </div>
   </div>
  </footer>
 );
};

export default Footer;
