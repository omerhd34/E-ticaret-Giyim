import "./globals.css";
import ClientProviders from "./ClientProviders";

export const metadata = {
 metadataBase: new URL(process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'),
 title: {
  default: 'Yazıcı Ticaret - Profilo ve LG Beyaz Eşya ve Elektronik E-Ticaret',
  template: '%s | Yazıcı Ticaret'
 },
 description: 'Yazıcı Ticaret - Profilo ve LG markası beyaz eşya ve elektronik ürünlerinin satışını yapan güvenilir e-ticaret platformu. Buzdolabı, çamaşır makinesi, bulaşık makinesi, klima ve daha fazlası. Tüm Türkiye\'ye nakliye ve montaj hizmeti.',
 keywords: [
  'profilo',
  'lg',
  'beyaz eşya',
  'elektronik',
  'buzdolabı',
  'çamaşır makinesi',
  'bulaşık makinesi',
  'klima',
  'ankastre',
  'e-ticaret',
  'yazıcı ticaret',
  'profilo satış',
  'beyaz eşya satış',
  'elektronik ürünler'
 ],
 creator: 'Ömer Halis Demir',
 openGraph: {
  type: 'website',
  locale: 'tr_TR',
  url: process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000',
  siteName: 'Yazıcı Ticaret',
  title: 'Yazıcı Ticaret - Profilo VE LG Beyaz Eşya ve Elektronik E-Ticaret',
  description: 'Profilo ve LG markası beyaz eşya ve elektronik ürünlerinin satışını yapan güvenilir e-ticaret platformu. Tüm Türkiye\'ye nakliye ve montaj hizmeti.',
  images: [
   {
    url: '/icon.svg',
    width: 1200,
    height: 630,
    alt: 'Yazıcı Ticaret',
   },
  ],
 },
 robots: {
  index: true,
  follow: true,
  googleBot: {
   index: true,
   follow: true,
   'max-video-preview': -1,
   'max-image-preview': 'large',
   'max-snippet': -1,
  },
  yandex: {
   index: true,
   follow: true,
  },
 },
 verification: {
  // https://search.google.com/search-console/about
  google: '',
 },
};

export default function RootLayout({ children }) {
 return (
  <html lang="tr">
   <body className="antialiased min-h-screen flex flex-col">
    <ClientProviders>
     {children}
    </ClientProviders>
   </body>
  </html>
 );
}

