"use client";
import { HiLightBulb, HiHeart, HiTrendingUp } from "react-icons/hi";
import AboutHeader from "@/app/components/about/AboutHeader";
import AboutSection from "@/app/components/about/AboutSection";
import ValuesGrid from "@/app/components/about/ValuesGrid";
import WhyChooseUs from "@/app/components/about/WhyChooseUs";
import ContactSection from "@/app/components/about/ContactSection";
import SirketBilgileri from "@/app/components/about/SirketBilgileri";

export default function BizKimizPage() {
 return (
  <div className="min-h-screen bg-gray-50 py-12">
   <div className="container mx-auto px-4 max-w-4xl">
    <AboutHeader />

    <div className="mb-8">
     <SirketBilgileri />
    </div>

    <div className="bg-white rounded-xl shadow-md p-8 md:p-12 space-y-8">
     <AboutSection icon={HiLightBulb} title="Hikayemiz">
      <p>
       PROFILO, 2024 yılında beyaz eşya sektöründe modern ve kaliteli ürünleri müşterilerimize ulaştırmak amacıyla kuruldu.
       Müşterilerimizin ev ihtiyaçlarını karşılamak ve onlara en iyi alışveriş deneyimini sunmak için çalışıyoruz.
      </p>
      <p>
       Başlangıçta küçük bir ekip olarak başladığımız yolculuğumuzda, müşteri memnuniyetini her şeyin üzerinde tutarak
       büyüdük ve geliştik. Bugün, binlerce mutlu müşteriye hizmet veren, güvenilir bir e-ticaret platformu haline geldik.
      </p>
     </AboutSection>

     <AboutSection icon={HiHeart} title="Misyonumuz">
      <p>
       Misyonumuz, beyaz eşya dünyasında en kaliteli ürünleri, en uygun fiyatlarla müşterilerimize sunmak ve
       onlara unutulmaz bir alışveriş deneyimi yaşatmaktır.
      </p>
      <p>
       Müşterilerimizin güvenini kazanmak, şeffaf ve dürüst bir hizmet anlayışıyla çalışmak,
       sürekli gelişim ve yenilikçilik ilkelerimizdir.
      </p>
     </AboutSection>

     <AboutSection icon={HiTrendingUp} title="Vizyonumuz">
      <p>
       Türkiye&apos;nin en güvenilir ve tercih edilen beyaz eşya e-ticaret platformu olmak,
       müşterilerimize her zaman en iyi hizmeti sunmak ve sektörde öncü bir konuma gelmek vizyonumuzdur.
      </p>
      <p>
       Gelecekte, daha geniş bir ürün yelpazesi, gelişmiş teknoloji altyapısı ve uluslararası pazarlara
       açılarak büyümeyi hedefliyoruz.
      </p>
     </AboutSection>

     <ValuesGrid />
     <WhyChooseUs />
     <ContactSection />
    </div>
   </div>
  </div>
 );
}

