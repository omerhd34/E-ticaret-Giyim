"use client";
import { HiUser, HiEye, HiLockClosed } from "react-icons/hi";
import PrivacyPolicyHeader from "@/app/components/policy/PrivacyPolicyHeader";
import PolicySection from "@/app/components/policy/PolicySection";
import PolicyContactSection from "@/app/components/policy/PolicyContactSection";

export default function GizlilikPolitikasiPage() {
 return (
  <div className="min-h-screen bg-gray-50 py-12">
   <div className="container mx-auto px-4 max-w-4xl">
    <PrivacyPolicyHeader />

    <div className="bg-white rounded-xl shadow-md p-8 md:p-12 space-y-8">
     <PolicySection>
      <p className="text-gray-700 leading-relaxed">
       PROFILO olarak, gizliliğinize saygı duyuyor ve kişisel bilgilerinizin korunmasına büyük önem veriyoruz.
       Bu Gizlilik Politikası, web sitemizi kullandığınızda topladığımız bilgileri, bu bilgileri nasıl kullandığımızı
       ve paylaştığımızı açıklamaktadır.
      </p>
     </PolicySection>

     <PolicySection icon={HiUser} title="Toplanan Bilgiler">
      <p className="leading-relaxed">
       Sizden aşağıdaki bilgileri toplayabiliriz:
      </p>
      <ul className="list-disc list-inside space-y-2 ml-4">
       <li><strong>Kişisel Bilgiler:</strong> Ad, soyad, e-posta adresi, telefon numarası, adres bilgileri</li>
       <li><strong>Ödeme Bilgileri:</strong> Kredi kartı bilgileri (güvenli ödeme sağlayıcıları aracılığıyla işlenir)</li>
       <li><strong>Hesap Bilgileri:</strong> Kullanıcı adı, şifre (şifrelenmiş olarak saklanır)</li>
       <li><strong>Teknik Bilgiler:</strong> IP adresi, tarayıcı türü, cihaz bilgileri, çerezler</li>
       <li><strong>Kullanım Bilgileri:</strong> Sipariş geçmişi, favori ürünler, alışveriş tercihleri</li>
      </ul>
     </PolicySection>

     <PolicySection icon={HiEye} title="Bilgilerinizin Kullanımı">
      <p className="leading-relaxed">
       Topladığımız bilgileri aşağıdaki amaçlarla kullanıyoruz:
      </p>
      <ul className="list-disc list-inside space-y-2 ml-4">
       <li>Siparişlerinizi işlemek ve teslim etmek</li>
       <li>Hesabınızı yönetmek ve müşteri hizmetleri sunmak</li>
       <li>Ürün ve hizmetlerimizi geliştirmek</li>
       <li>Size özel kampanyalar ve teklifler sunmak</li>
       <li>Yasal yükümlülüklerimizi yerine getirmek</li>
       <li>Güvenlik ve dolandırıcılık önleme</li>
       <li>Web sitemizin işleyişini iyileştirmek</li>
      </ul>
     </PolicySection>

     <PolicySection icon={HiLockClosed} title="Bilgi Paylaşımı">
      <p className="leading-relaxed">
       Kişisel bilgilerinizi aşağıdaki durumlar dışında üçüncü taraflarla paylaşmıyoruz:
      </p>
      <ul className="list-disc list-inside space-y-2 ml-4">
       <li><strong>Hizmet Sağlayıcılar:</strong> Kargo, ödeme işleme ve diğer hizmet sağlayıcılarımız</li>
       <li><strong>Yasal Zorunluluklar:</strong> Yasalara uyum için gerekli durumlarda</li>
       <li><strong>İş Ortakları:</strong> Güvenilir iş ortaklarımızla (sadece gerekli olduğunda)</li>
       <li><strong>İzin Verdiğiniz Durumlar:</strong> Açıkça izin verdiğiniz durumlarda</li>
      </ul>
     </PolicySection>

     <PolicySection title="Çerezler (Cookies)">
      <p className="leading-relaxed">
       Web sitemiz, deneyiminizi iyileştirmek için çerezler kullanmaktadır. Çerezler, web sitemizi ziyaret ettiğinizde
       cihazınıza kaydedilen küçük metin dosyalarıdır. Çerezleri tarayıcı ayarlarınızdan yönetebilirsiniz.
      </p>
      <p className="leading-relaxed">
       Kullandığımız çerez türleri:
      </p>
      <ul className="list-disc list-inside space-y-2 ml-4">
       <li><strong>Zorunlu Çerezler:</strong> Web sitesinin çalışması için gerekli</li>
       <li><strong>Performans Çerezleri:</strong> Site performansını analiz etmek için</li>
       <li><strong>İşlevsellik Çerezleri:</strong> Tercihlerinizi hatırlamak için</li>
       <li><strong>Hedefleme Çerezleri:</strong> Size özel içerik sunmak için</li>
      </ul>
     </PolicySection>

     <PolicySection title="Güvenlik">
      <p className="leading-relaxed">
       Bilgilerinizin güvenliğini sağlamak için endüstri standardı güvenlik önlemleri alıyoruz:
      </p>
      <ul className="list-disc list-inside space-y-2 ml-4">
       <li>SSL şifreleme ile veri aktarımı</li>
       <li>Güvenli sunucu altyapısı</li>
       <li>Düzenli güvenlik denetimleri</li>
       <li>Şifrelerin şifrelenmiş saklanması</li>
       <li>Erişim kontrolleri ve yetkilendirme</li>
      </ul>
     </PolicySection>

     <PolicySection title="Haklarınız">
      <p className="leading-relaxed">
       KVKK (Kişisel Verilerin Korunması Kanunu) kapsamında aşağıdaki haklara sahipsiniz:
      </p>
      <ul className="list-disc list-inside space-y-2 ml-4">
       <li>Kişisel verilerinizin işlenip işlenmediğini öğrenme</li>
       <li>İşlenen kişisel verileriniz hakkında bilgi talep etme</li>
       <li>Kişisel verilerinizin silinmesini veya yok edilmesini isteme</li>
       <li>Kişisel verilerinizin düzeltilmesini isteme</li>
       <li>Kişisel verilerinizin aktarılmasını isteme</li>
       <li>İşleme itiraz etme</li>
      </ul>
     </PolicySection>

     <PolicyContactSection
      description="Gizlilik politikamız hakkında sorularınız veya haklarınızı kullanmak istiyorsanız, bizimle iletişime geçebilirsiniz:"
      email="info@yazici.gen.tr"
     />

     <PolicySection title="Politika Değişiklikleri">
      <p className="text-gray-700 leading-relaxed">
       Bu Gizlilik Politikası zaman zaman güncellenebilir. Önemli değişikliklerde size bildirim yapacağız.
       Güncel politikayı bu sayfadan takip edebilirsiniz.
      </p>
     </PolicySection>
    </div>
   </div>
  </div>
 );
}
