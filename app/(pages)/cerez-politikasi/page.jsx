"use client";
import { HiShieldCheck } from "react-icons/hi";
import CookiePolicyHeader from "@/app/components/policy/CookiePolicyHeader";
import PolicySection from "@/app/components/policy/PolicySection";
import CookieTypesSection from "@/app/components/policy/CookieTypesSection";
import CookieManagementSection from "@/app/components/policy/CookieManagementSection";
import PolicyContactSection from "@/app/components/policy/PolicyContactSection";

export default function CerezPolitikasiPage() {
 return (
  <div className="min-h-screen bg-gray-50 py-12">
   <div className="container mx-auto px-4 max-w-4xl">
    <CookiePolicyHeader />

    <div className="bg-white rounded-xl shadow-md p-8 md:p-12 space-y-8">
     <PolicySection>
      <p className="text-gray-700 leading-relaxed">
       SHOP.CO olarak, web sitemizde çerezler kullanmaktayız. Bu Çerez Politikası, hangi çerezleri kullandığımızı,
       neden kullandığımızı ve çerezleri nasıl yönetebileceğinizi açıklamaktadır.
      </p>
     </PolicySection>

     <PolicySection icon={HiShieldCheck} title="Çerez Nedir?">
      <p className="leading-relaxed">
       Çerezler, web sitemizi ziyaret ettiğinizde cihazınıza (bilgisayar, tablet, telefon) kaydedilen küçük metin dosyalarıdır.
       Çerezler, web sitemizin düzgün çalışmasını sağlar ve kullanıcı deneyiminizi iyileştirir.
      </p>
      <p className="leading-relaxed">
       Çerezler şu bilgileri saklayabilir:
      </p>
      <ul className="list-disc list-inside space-y-2 ml-4">
       <li>Tercihleriniz ve ayarlarınız</li>
       <li>Sepetinizdeki ürünler</li>
       <li>Oturum bilgileriniz</li>
       <li>Site kullanım istatistikleri</li>
      </ul>
     </PolicySection>

     <CookieTypesSection />

     <PolicySection title="Üçüncü Taraf Çerezler">
      <p className="leading-relaxed">
       Web sitemizde aşağıdaki üçüncü taraf hizmetlerinin çerezleri kullanılmaktadır:
      </p>
      <ul className="list-disc list-inside space-y-2 ml-4">
       <li><strong>Google Analytics:</strong> Web sitesi kullanım istatistikleri için</li>
       <li><strong>Ödeme Sağlayıcıları:</strong> Güvenli ödeme işlemleri için</li>
       <li><strong>Sosyal Medya Platformları:</strong> Paylaşım ve giriş özellikleri için</li>
       <li><strong>Kargo Firmaları:</strong> Sipariş takibi için</li>
      </ul>
      <p className="leading-relaxed mt-4">
       Bu üçüncü taraf çerezlerin kullanımı, ilgili şirketlerin gizlilik politikalarına tabidir.
      </p>
     </PolicySection>

     <CookieManagementSection />

     <PolicySection title="Çerez Süreleri">
      <p className="leading-relaxed">
       Kullandığımız çerezler iki kategoriye ayrılır:
      </p>
      <ul className="list-disc list-inside space-y-2 ml-4">
       <li><strong>Oturum Çerezleri:</strong> Tarayıcıyı kapattığınızda otomatik olarak silinir</li>
       <li><strong>Kalıcı Çerezler:</strong> Belirli bir süre (genellikle 30-365 gün) cihazınızda kalır</li>
      </ul>
     </PolicySection>

     <PolicySection title="Politika Güncellemeleri">
      <p className="text-gray-700 leading-relaxed">
       Bu Çerez Politikası zaman zaman güncellenebilir. Önemli değişikliklerde size bildirim yapacağız.
       Güncel politikayı bu sayfadan takip edebilirsiniz.
      </p>
     </PolicySection>

     <PolicyContactSection />
    </div>
   </div>
  </div>
 );
}
