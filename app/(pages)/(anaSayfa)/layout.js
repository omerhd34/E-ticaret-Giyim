export const metadata = {
 title: 'Ana Sayfa - Yazıcı Ticaret | Profilo ve LG Beyaz Eşya',
 description: 'Yazıcı Ticaret\'e hoş geldiniz! Profilo ve LG markası beyaz eşya ve elektronik ürünlerinde en uygun fiyatlar. Buzdolabı, çamaşır makinesi, bulaşık makinesi, klima ve daha fazlası. Tüm Türkiye\'ye nakliye ve montaj hizmeti.',
 openGraph: {
  title: 'Yazıcı Ticaret - Profilo ve LG Beyaz Eşya ve Elektronik',
  description: 'Profilo ve LG markası beyaz eşya ve elektronik ürünlerinde en uygun fiyatlar. Tüm Türkiye\'ye nakliye ve montaj hizmeti.',
  url: process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000',
  siteName: 'Yazıcı Ticaret',
  images: [
   {
    url: '/icon.svg',
    width: 1200,
    height: 630,
    alt: 'Yazıcı Ticaret - Profilo ve LG Beyaz Eşya',
   },
  ],
  locale: 'tr_TR',
  type: 'website',
 },
 alternates: {
  canonical: process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000',
 },
};

export default function AnaSayfaLayout({ children }) {
 return children;
}

