export const products = [
 /*  {
   name: "83 inç LG OLED evo AI M5 4K 144Hz Video ve Ses Aktarımı ile Kablosuz Görüntü İletebilen TV",
   description: "83 inç LG OLED evo AI M5 4K 144Hz Video ve Ses Aktarımı ile Kablosuz Görüntü İletebilen TV",
   category: "Televizyon",
   brand: "LG",
   isNew: false,
   isFeatured: false,
   specifications: [
    {
     category: "Görüntü (Ekran)",
     items: [
      { key: "Ekran Türü", value: "4K OLED" },
      { key: "Ekran Çözünürlüğü", value: "4K Ultra HD (3,840 x 2,160)" },
      { key: "Yenileme Hızı", value: "120Hz Native (VRR 144Hz)" },
      { key: "Geniş Renk Gamı", value: "OLED Color" },
     ]
    },
    {
     category: "Görüntü (İşlemci)",
     items: [
      { key: "Görüntü İşlemcisi", value: "α11 AI Processor 4K Gen2" },
      { key: "AI Çözünürlük Yükseltme", value: "α11 AI 4K Süper Çözünürlük Yükseltici" },
      { key: "Dinamik Ton Eşleme", value: "Evet (OLED Dinamik Ton Eşleme Pro)" },
      { key: "AI Tür Seçimi", value: "Evet (SDR/HDR)" },
      { key: "AI Parlaklık Kontrolü", value: "Evet" },
      { key: "HDR (Yüksek Dinamik Aralık)", value: "Dolby Vision / HDR10 / HLG" },
      { key: "FILMMAKER MODE™", value: "Evet" },
      { key: "HFR (Yüksek Kare Hızı)", value: "4K 120 fps (HDMI, RF, USB)" },
      { key: "Yerel Karartma Teknolojisi", value: "Piksel Karartma" },
      { key: "Motion", value: "OLED Motion" },
      { key: "Görüntü Modu", value: "10 Mod" },
      { key: "Gelişmiş AI Görüntü", value: "Evet" },
      { key: "Otomatik Kalibrasyon", value: "Evet" },
      { key: "QFT (Quick Frame Transport)", value: "Evet" },
      { key: "Hızlı Medya Değiştirme", value: "Evet" },
     ]
    },
    {
     category: "Oyun",
     items: [
      { key: "G-Sync Uyumluluğu", value: "Evet" },
      { key: "FreeSync Uyumluluğu", value: "Evet" },
      { key: "HGIG Mode", value: "Evet" },
      { key: "Oyun Ayar Menüsü", value: "Evet (Oyun Sayfası)" },
      { key: "ALLM (Otomatik Düşük Gecikme Modu)", value: "Evet" },
      { key: "VRR (Değişken Yenileme Hızı)", value: "Evet (144Hz'e kadar)" },
      { key: "Oyun Performansı için Dolby Vision (4K 120Hz)", value: "Evet" },
      { key: "Tepki Süresi", value: "0.1ms'den az" },
     ]
    },
    {
     category: "Smart TV",
     items: [
      { key: "İşletim Sistemi", value: "webOS 25" },
      { key: "USB Kamera Uyumlu", value: "Evet" },
      { key: "Always Ready", value: "Evet" },
      { key: "Web Tarayıcısı", value: "Evet" },
      { key: "Eller Serbest Ses Kontrolü", value: "Evet" },
      { key: "Kontrol Sayfası", value: "Evet" },
      { key: "Akıllı Ses Tanıma", value: "Evet" },
      { key: "Sihirli Kumanda", value: "Yerleşik" },
      { key: "Çoklu Görünüm", value: "Evet" },
      { key: "Akıllı Telefon Uzaktan Uygulaması", value: "Evet (LG ThinQ)" },
      { key: "Apple Home Uyumluluğu", value: "Evet" },
      { key: "AI Chatbot", value: "Evet" },
      { key: "Google Cast", value: "Evet" },
      { key: "Google Home / Hub", value: "Evet" },
      { key: "Ses Kimliği", value: "Evet" },
      { key: "Apple Airplay ile çalışır", value: "Evet" },
     ]
    },
    {
     category: "Ses",
     items: [
      { key: "Dolby Atmos", value: "Evet" },
      { key: "AI Ses Pro", value: "α11 AI Ses Pro (Sanal 11.1.2 Yükseltme)" },
      { key: "Gelişmiş Net Ses", value: "Evet (AI Object Remastering)" },
      { key: "WiSA Hazır", value: "Evet (2.1 Kanala Kadar)" },
      { key: "LG Ses Senkronizasyonu", value: "Evet" },
      { key: "Ses Modu Paylaşımı", value: "Evet" },
      { key: "Eşzamanlı Ses Çıkışı", value: "Evet" },
      { key: "Bluetooth Surround Uyumlu", value: "Evet (2 Yönlü Oynatma)" },
      { key: "Ses Çıkışı (W)", value: "60" },
      { key: "AI Akustik Ayarlama", value: "Evet" },
      { key: "Ses Codec", value: "AC4, AC3(Dolby Digital), EAC3, HE-AAC, AAC, MP2, MP3, PCM, WMA, apt-X" },
      { key: "Hoparlör Yönü", value: "Aşağı Yönde Ses Verme" },
      { key: "Hoparlör Sistemi", value: "4.2. kanal" },
      { key: "WOW Orkestra", value: "Evet" },
     ]
    },
    {
     category: "Erişilebilirlik",
     items: [
      { key: "Yüksek Kontrast", value: "Evet" },
      { key: "Gri Ölçek", value: "Evet" },
      { key: "Renkleri Ters Çevir", value: "Evet" },
     ]
    },
    {
     category: "Boyutlar",
     items: [
      { key: "Ekran Büyüklüğü", value: "83 inç (210,5 cm)" },
      { key: "Genişlik (cm)", value: "184.7" },
      { key: "Yükseklik (cm)", value: "106.2" },
      { key: "Derinlik (cm)", value: "2.8" },
      { key: "Ağırlık (kg)", value: "38.3" },
      { key: "VESA Uyumluluğu", value: "400 x 400" },
     ]
    },
    {
     category: "Bağlantı",
     items: [
      { key: "HDMI Ses Dönüş Kanalı", value: "eARC (HDMI 2)" },
      { key: "Bluetooth Desteği", value: "Evet (v 5.3)" },
      { key: "Ethernet Girişi", value: "1 adet" },
      { key: "Simplink (HDMI CEC)", value: "Evet" },
      { key: "SPDIF (Optik Dijital Ses Çıkışı)", value: "1 adet" },
      { key: "CI Slot", value: "1 adet" },
      { key: "HDMI Giriş", value: "3 adet (4K 120Hz, eARC, VRR, ALLM, QMS, QFT (3 port) destekler)" },
      { key: "RF Girişi (Anten/Kablo)", value: "2 adet" },
      { key: "USB Girişi", value: "2 adet (v 2.0)" },
      { key: "Wi-Fi", value: "Evet (Wi-Fi 6)" },
     ]
    },
    {
     category: "Güç",
     items: [
      { key: "Güç Kaynağı (Voltaj, Hz)", value: "AC 100~240V 50-60Hz" },
      { key: "Bekleme Güç Tüketimi", value: "0,5 W'ın altında" },
     ]
    },
    {
     category: "Dahil Olan Aksesuarlar",
     items: [
      { key: "Kumanda", value: "MR25 Sihirli Kumanda" },
      { key: "Güç Kablosu", value: "Evet (Ekli)" },
     ]
    },
    {
     category: "Yayıncılık",
     items: [
      { key: "Analog TV Alıcısı", value: "Evet" },
      { key: "Dijital TV Alıcısı", value: "DVB-T2/T (Karasal), DVB-C (Kablo), DVB-S2/S (Uydu)" },
     ]
    },
   ],
   colors: [
    {
     name: "Siyah",
     hexCode: "#000000",
     price: 350000,
     discountPrice: null,
     serialNumber: "OLED83M59LA",
     images: ["/products/tv/OLED83M59LA-1.webp"],
     stock: 5,
     manualLink: "",
    }
   ]
  },
  {
   name: "77 inç LG OLED evo AI M5 4K 144Hz Video ve Ses Aktarımı ile Kablosuz Görüntü İletebilen TV",
   description: "77 inç LG OLED evo AI M5 4K 144Hz Video ve Ses Aktarımı ile Kablosuz Görüntü İletebilen TV",
   category: "Televizyon",
   brand: "LG",
   isNew: false,
   isFeatured: false,
   specifications: [
    {
     category: "Görüntü (Ekran)",
     items: [
      { key: "Ekran Türü", value: "4K OLED" },
      { key: "Ekran Çözünürlüğü", value: "4K Ultra HD (3,840 x 2,160)" },
      { key: "Yenileme Hızı", value: "120Hz Native (VRR 144Hz)" },
      { key: "Geniş Renk Gamı", value: "OLED Color" },
     ]
    },
    {
     category: "Görüntü (İşlemci)",
     items: [
      { key: "Görüntü İşlemcisi", value: "α11 AI Processor 4K Gen2" },
      { key: "AI Çözünürlük Yükseltme", value: "α11 AI 4K Süper Çözünürlük Yükseltici" },
      { key: "Dinamik Ton Eşleme", value: "Evet (OLED Dinamik Ton Eşleme Pro)" },
      { key: "AI Tür Seçimi", value: "Evet (SDR/HDR)" },
      { key: "AI Parlaklık Kontrolü", value: "Evet" },
      { key: "HDR (Yüksek Dinamik Aralık)", value: "Dolby Vision / HDR10 / HLG" },
      { key: "FILMMAKER MODE™", value: "Evet" },
      { key: "HFR (Yüksek Kare Hızı)", value: "4K 120 fps (HDMI, RF, USB)" },
      { key: "Yerel Karartma Teknolojisi", value: "Piksel Karartma" },
      { key: "Motion", value: "OLED Motion" },
      { key: "Görüntü Modu", value: "10 Mod" },
      { key: "Gelişmiş AI Görüntü", value: "Evet" },
      { key: "Otomatik Kalibrasyon", value: "Evet" },
      { key: "QFT (Quick Frame Transport)", value: "Evet" },
      { key: "Hızlı Medya Değiştirme", value: "Evet" },
     ]
    },
    {
     category: "Oyun",
     items: [
      { key: "G-Sync Uyumluluğu", value: "Evet" },
      { key: "FreeSync Uyumluluğu", value: "Evet" },
      { key: "HGIG Mode", value: "Evet" },
      { key: "Oyun Ayar Menüsü", value: "Evet (Oyun Sayfası)" },
      { key: "ALLM (Otomatik Düşük Gecikme Modu)", value: "Evet" },
      { key: "VRR (Değişken Yenileme Hızı)", value: "Evet (144Hz'e kadar)" },
      { key: "Oyun Performansı için Dolby Vision (4K 120Hz)", value: "Evet" },
      { key: "Tepki Süresi", value: "0.1ms'den az" },
     ]
    },
    {
     category: "Smart TV",
     items: [
      { key: "İşletim Sistemi", value: "webOS 25" },
      { key: "USB Kamera Uyumlu", value: "Evet" },
      { key: "Always Ready", value: "Evet" },
      { key: "Web Tarayıcısı", value: "Evet" },
      { key: "Eller Serbest Ses Kontrolü", value: "Evet" },
      { key: "Kontrol Sayfası", value: "Evet" },
      { key: "Akıllı Ses Tanıma", value: "Evet" },
      { key: "Sihirli Kumanda", value: "Yerleşik" },
      { key: "Çoklu Görünüm", value: "Evet" },
      { key: "Akıllı Telefon Uzaktan Uygulaması", value: "Evet (LG ThinQ)" },
      { key: "Apple Home Uyumluluğu", value: "Evet" },
      { key: "AI Chatbot", value: "Evet" },
      { key: "Google Cast", value: "Evet" },
      { key: "Google Home / Hub", value: "Evet" },
      { key: "Ses Kimliği", value: "Evet" },
      { key: "Apple Airplay ile çalışır", value: "Evet" },
     ]
    },
    {
     category: "Ses",
     items: [
      { key: "Dolby Atmos", value: "Evet" },
      { key: "AI Ses Pro", value: "α11 AI Ses Pro (Sanal 11.1.2 Yükseltme)" },
      { key: "Gelişmiş Net Ses", value: "Evet (AI Object Remastering)" },
      { key: "WiSA Hazır", value: "Evet (2.1 Kanala Kadar)" },
      { key: "LG Ses Senkronizasyonu", value: "Evet" },
      { key: "Ses Modu Paylaşımı", value: "Evet" },
      { key: "Eşzamanlı Ses Çıkışı", value: "Evet" },
      { key: "Bluetooth Surround Uyumlu", value: "Evet (2 Yönlü Oynatma)" },
      { key: "Ses Çıkışı (W)", value: "60" },
      { key: "AI Akustik Ayarlama", value: "Evet" },
      { key: "Ses Codec", value: "AC4, AC3(Dolby Digital), EAC3, HE-AAC, AAC, MP2, MP3, PCM, WMA, apt-X" },
      { key: "Hoparlör Yönü", value: "Aşağı Yönde Ses Verme" },
      { key: "Hoparlör Sistemi", value: "4.2. kanal" },
      { key: "WOW Orkestra", value: "Evet" },
     ]
    },
    {
     category: "Erişilebilirlik",
     items: [
      { key: "Yüksek Kontrast", value: "Evet" },
      { key: "Gri Ölçek", value: "Evet" },
      { key: "Renkleri Ters Çevir", value: "Evet" },
     ]
    },
    {
     category: "Boyutlar",
     items: [
      { key: "Ekran Büyüklüğü", value: "77 inç (195,58 cm)" },
      { key: "Genişlik (cm)", value: "171.2" },
      { key: "Yükseklik (cm)", value: "98.6" },
      { key: "Derinlik (cm)", value: "2.48" },
      { key: "Ağırlık (kg)", value: "33.1" },
      { key: "VESA Uyumluluğu", value: "300 x 300" },
     ]
    },
    {
     category: "Bağlantı",
     items: [
      { key: "HDMI Ses Dönüş Kanalı", value: "eARC (HDMI 2)" },
      { key: "Bluetooth Desteği", value: "Evet (v 5.3)" },
      { key: "Ethernet Girişi", value: "1 adet" },
      { key: "Simplink (HDMI CEC)", value: "Evet" },
      { key: "SPDIF (Optik Dijital Ses Çıkışı)", value: "1 adet" },
      { key: "CI Slot", value: "1 adet" },
      { key: "HDMI Giriş", value: "3 adet (4K 120Hz, eARC, VRR, ALLM, QMS, QFT (3 port) destekler)" },
      { key: "RF Girişi (Anten/Kablo)", value: "2 adet" },
      { key: "USB Girişi", value: "2 adet (v 2.0)" },
      { key: "Wi-Fi", value: "Evet (Wi-Fi 6)" },
     ]
    },
    {
     category: "Güç",
     items: [
      { key: "Güç Kaynağı (Voltaj, Hz)", value: "AC 100~240V 50-60Hz" },
      { key: "Bekleme Güç Tüketimi", value: "0,5 W'ın altında" },
     ]
    },
    {
     category: "Dahil Olan Aksesuarlar",
     items: [
      { key: "Kumanda", value: "MR25 Sihirli Kumanda" },
      { key: "Güç Kablosu", value: "Evet (Ekli)" },
     ]
    },
    {
     category: "Yayıncılık",
     items: [
      { key: "Analog TV Alıcısı", value: "Evet" },
      { key: "Dijital TV Alıcısı", value: "DVB-T2/T (Karasal), DVB-C (Kablo), DVB-S2/S (Uydu)" },
     ]
    },
   ],
   colors: [
    {
     name: "Siyah",
     hexCode: "#000000",
     price: 250000,
     discountPrice: null,
     serialNumber: "OLED77M59LA",
     images: ["/products/tv/OLED77M59LA-1.webp"],
     stock: 5,
     manualLink: "",
    }
   ]
  },
  {
   name: "83 inç LG OLED evo AI G5 4K 165Hz Smart TV AI Sihirli Kumanda webOS25 2025",
   description: "83 inç LG OLED evo AI G5 4K 165Hz Smart TV AI Sihirli Kumanda webOS25 2025",
   category: "Televizyon",
   brand: "LG",
   isNew: false,
   isFeatured: false,
   specifications: [
    {
     category: "Görüntü (Ekran)",
     items: [
      { key: "Ekran Türü", value: "4K OLED" },
      { key: "Ekran Çözünürlüğü", value: "4K Ultra HD (3,840 x 2,160)" },
      { key: "Yenileme Hızı", value: "120Hz Native (VRR 165Hz)" },
      { key: "Geniş Renk Gamı", value: "OLED Color" },
     ]
    },
    {
     category: "Görüntü (İşlemci)",
     items: [
      { key: "Görüntü İşlemcisi", value: "α11 AI Processor 4K Gen2" },
      { key: "AI Çözünürlük Yükseltme", value: "α11 AI 4K Süper Çözünürlük Yükseltici" },
      { key: "Dinamik Ton Eşleme", value: "Evet (OLED Dinamik Ton Eşleme Pro)" },
      { key: "AI Tür Seçimi", value: "Evet (SDR/HDR)" },
      { key: "AI Parlaklık Kontrolü", value: "Evet" },
      { key: "HDR (Yüksek Dinamik Aralık)", value: "Dolby Vision / HDR10 / HLG" },
      { key: "FILMMAKER MODE™", value: "Evet" },
      { key: "HFR (Yüksek Kare Hızı)", value: "4K 120 fps (HDMI, RF, USB)" },
      { key: "Yerel Karartma Teknolojisi", value: "Piksel Karartma" },
      { key: "Motion", value: "OLED Motion" },
      { key: "Görüntü Modu", value: "10 Mod" },
      { key: "Gelişmiş AI Görüntü", value: "Evet" },
      { key: "Otomatik Kalibrasyon", value: "Evet" },
      { key: "QFT (Quick Frame Transport)", value: "Evet" },
      { key: "Hızlı Medya Değiştirme", value: "Evet" },
     ]
    },
    {
     category: "Oyun",
     items: [
      { key: "G-Sync Uyumluluğu", value: "Evet" },
      { key: "FreeSync Uyumluluğu", value: "Evet" },
      { key: "HGIG Mode", value: "Evet" },
      { key: "Oyun Ayar Menüsü", value: "Evet (Oyun Sayfası)" },
      { key: "ALLM (Otomatik Düşük Gecikme Modu)", value: "Evet" },
      { key: "VRR (Değişken Yenileme Hızı)", value: "Evet (165Hz'e kadar)" },
      { key: "Oyun Performansı için Dolby Vision (4K 120Hz)", value: "Evet" },
      { key: "Tepki Süresi", value: "0.1ms'den az" },
     ]
    },
    {
     category: "Smart TV",
     items: [
      { key: "İşletim Sistemi", value: "webOS 25" },
      { key: "USB Kamera Uyumlu", value: "Evet" },
      { key: "Always Ready", value: "Evet" },
      { key: "Web Tarayıcısı", value: "Evet" },
      { key: "Eller Serbest Ses Kontrolü", value: "Evet" },
      { key: "Kontrol Sayfası", value: "Evet" },
      { key: "Akıllı Ses Tanıma", value: "Evet" },
      { key: "Sihirli Kumanda", value: "Yerleşik" },
      { key: "Çoklu Görünüm", value: "Evet" },
      { key: "Akıllı Telefon Uzaktan Uygulaması", value: "Evet (LG ThinQ)" },
      { key: "Apple Home Uyumluluğu", value: "Evet" },
      { key: "AI Chatbot", value: "Evet" },
      { key: "Google Cast", value: "Evet" },
      { key: "Google Home / Hub", value: "Evet" },
      { key: "Ses Kimliği", value: "Evet" },
      { key: "Apple Airplay ile çalışır", value: "Evet" },
     ]
    },
    {
     category: "Ses",
     items: [
      { key: "Dolby Atmos", value: "Evet" },
      { key: "AI Ses Pro", value: "α11 AI Ses Pro (Sanal 11.1.2 Yükseltme)" },
      { key: "Gelişmiş Net Ses", value: "Evet (AI Object Remastering)" },
      { key: "WiSA Hazır", value: "Evet (2.1 Kanala Kadar)" },
      { key: "LG Ses Senkronizasyonu", value: "Evet" },
      { key: "Ses Modu Paylaşımı", value: "Evet" },
      { key: "Eşzamanlı Ses Çıkışı", value: "Evet" },
      { key: "Bluetooth Surround Uyumlu", value: "Evet (2 Yönlü Oynatma)" },
      { key: "Ses Çıkışı (W)", value: "60" },
      { key: "AI Akustik Ayarlama", value: "Evet" },
      { key: "Ses Codec", value: "AC4, AC3(Dolby Digital), EAC3, HE-AAC, AAC, MP2, MP3, PCM, WMA, apt-X" },
      { key: "Hoparlör Yönü", value: "Aşağı Yönde Ses Verme" },
      { key: "Hoparlör Sistemi", value: "4.2. kanal" },
      { key: "WOW Orkestra", value: "Evet" },
     ]
    },
    {
     category: "Erişilebilirlik",
     items: [
      { key: "Yüksek Kontrast", value: "Evet" },
      { key: "Gri Ölçek", value: "Evet" },
      { key: "Renkleri Ters Çevir", value: "Evet" },
     ]
    },
    {
     category: "Boyutlar",
     items: [
      { key: "Ekran Büyüklüğü", value: "83 inç (210,5 cm)" },
      { key: "Genişlik (cm)", value: "184.7" },
      { key: "Yükseklik (cm)", value: "105.7" },
      { key: "Derinlik (cm)", value: "2.8" },
      { key: "Ağırlık (kg)", value: "39" },
      { key: "VESA Uyumluluğu", value: "400 x 400" },
     ]
    },
    {
     category: "Bağlantı",
     items: [
      { key: "HDMI Ses Dönüş Kanalı", value: "eARC (HDMI 2)" },
      { key: "Bluetooth Desteği", value: "Evet (v 5.3)" },
      { key: "Ethernet Girişi", value: "1 adet" },
      { key: "Simplink (HDMI CEC)", value: "Evet" },
      { key: "SPDIF (Optik Dijital Ses Çıkışı)", value: "1 adet" },
      { key: "CI Slot", value: "1 adet" },
      { key: "HDMI Giriş", value: "4 adet (4K 120Hz, eARC, VRR, ALLM, QMS, QFT (4 port) destekler)" },
      { key: "RF Girişi (Anten/Kablo)", value: "2 adet" },
      { key: "USB Girişi", value: "3 adet (v 2.0)" },
      { key: "Wi-Fi", value: "Evet (Wi-Fi 6)" },
     ]
    },
    {
     category: "Güç",
     items: [
      { key: "Güç Kaynağı (Voltaj, Hz)", value: "AC 100~240V 50-60Hz" },
      { key: "Bekleme Güç Tüketimi", value: "0,5 W'ın altında" },
     ]
    },
    {
     category: "Dahil Olan Aksesuarlar",
     items: [
      { key: "Kumanda", value: "MR25 Sihirli Kumanda" },
      { key: "Güç Kablosu", value: "Evet (Ekli)" },
     ]
    },
    {
     category: "Yayıncılık",
     items: [
      { key: "Analog TV Alıcısı", value: "Evet" },
      { key: "Dijital TV Alıcısı", value: "DVB-T2/T (Karasal), DVB-C (Kablo), DVB-S2/S (Uydu)" },
     ]
    },
   ],
   colors: [
    {
     name: "Siyah",
     hexCode: "#000000",
     price: 310000,
     discountPrice: null,
     serialNumber: "OLED83G55LW",
     images: ["/products/tv/OLED83G55LW-1.webp"],
     stock: 5,
     manualLink: "",
    }
   ]
  },
  {
   name: "77 inç LG OLED evo AI G5 4K 165Hz Smart TV AI Sihirli Kumanda webOS25 2025",
   description: "77 inç LG OLED evo AI G5 4K 165Hz Smart TV AI Sihirli Kumanda webOS25 2025",
   category: "Televizyon",
   brand: "LG",
   isNew: false,
   isFeatured: false,
   specifications: [
    {
     category: "Görüntü (Ekran)",
     items: [
      { key: "Ekran Türü", value: "4K OLED" },
      { key: "Ekran Çözünürlüğü", value: "4K Ultra HD (3,840 x 2,160)" },
      { key: "Yenileme Hızı", value: "120Hz Native (VRR 165Hz)" },
      { key: "Geniş Renk Gamı", value: "OLED Color" },
     ]
    },
    {
     category: "Görüntü (İşlemci)",
     items: [
      { key: "Görüntü İşlemcisi", value: "α11 AI Processor 4K Gen2" },
      { key: "AI Çözünürlük Yükseltme", value: "α11 AI 4K Süper Çözünürlük Yükseltici" },
      { key: "Dinamik Ton Eşleme", value: "Evet (OLED Dinamik Ton Eşleme Pro)" },
      { key: "AI Tür Seçimi", value: "Evet (SDR/HDR)" },
      { key: "AI Parlaklık Kontrolü", value: "Evet" },
      { key: "HDR (Yüksek Dinamik Aralık)", value: "Dolby Vision / HDR10 / HLG" },
      { key: "FILMMAKER MODE™", value: "Evet" },
      { key: "HFR (Yüksek Kare Hızı)", value: "4K 120 fps (HDMI, RF, USB)" },
      { key: "Yerel Karartma Teknolojisi", value: "Piksel Karartma" },
      { key: "Motion", value: "OLED Motion" },
      { key: "Görüntü Modu", value: "10 Mod" },
      { key: "Gelişmiş AI Görüntü", value: "Evet" },
      { key: "Otomatik Kalibrasyon", value: "Evet" },
      { key: "QFT (Quick Frame Transport)", value: "Evet" },
      { key: "Hızlı Medya Değiştirme", value: "Evet" },
     ]
    },
    {
     category: "Oyun",
     items: [
      { key: "G-Sync Uyumluluğu", value: "Evet" },
      { key: "FreeSync Uyumluluğu", value: "Evet" },
      { key: "HGIG Mode", value: "Evet" },
      { key: "Oyun Ayar Menüsü", value: "Evet (Oyun Sayfası)" },
      { key: "ALLM (Otomatik Düşük Gecikme Modu)", value: "Evet" },
      { key: "VRR (Değişken Yenileme Hızı)", value: "Evet (165Hz'e kadar)" },
      { key: "Oyun Performansı için Dolby Vision (4K 120Hz)", value: "Evet" },
      { key: "Tepki Süresi", value: "0.1ms'den az" },
     ]
    },
    {
     category: "Smart TV",
     items: [
      { key: "İşletim Sistemi", value: "webOS 25" },
      { key: "USB Kamera Uyumlu", value: "Evet" },
      { key: "Always Ready", value: "Evet" },
      { key: "Web Tarayıcısı", value: "Evet" },
      { key: "Eller Serbest Ses Kontrolü", value: "Evet" },
      { key: "Kontrol Sayfası", value: "Evet" },
      { key: "Akıllı Ses Tanıma", value: "Evet" },
      { key: "Sihirli Kumanda", value: "Yerleşik" },
      { key: "Çoklu Görünüm", value: "Evet" },
      { key: "Akıllı Telefon Uzaktan Uygulaması", value: "Evet (LG ThinQ)" },
      { key: "Apple Home Uyumluluğu", value: "Evet" },
      { key: "AI Chatbot", value: "Evet" },
      { key: "Google Cast", value: "Evet" },
      { key: "Google Home / Hub", value: "Evet" },
      { key: "Ses Kimliği", value: "Evet" },
      { key: "Apple Airplay ile çalışır", value: "Evet" },
     ]
    },
    {
     category: "Ses",
     items: [
      { key: "Dolby Atmos", value: "Evet" },
      { key: "AI Ses Pro", value: "α11 AI Ses Pro (Sanal 11.1.2 Yükseltme)" },
      { key: "Gelişmiş Net Ses", value: "Evet (AI Object Remastering)" },
      { key: "WiSA Hazır", value: "Evet (2.1 Kanala Kadar)" },
      { key: "LG Ses Senkronizasyonu", value: "Evet" },
      { key: "Ses Modu Paylaşımı", value: "Evet" },
      { key: "Eşzamanlı Ses Çıkışı", value: "Evet" },
      { key: "Bluetooth Surround Uyumlu", value: "Evet (2 Yönlü Oynatma)" },
      { key: "Ses Çıkışı (W)", value: "60" },
      { key: "AI Akustik Ayarlama", value: "Evet" },
      { key: "Ses Codec", value: "AC4, AC3(Dolby Digital), EAC3, HE-AAC, AAC, MP2, MP3, PCM, WMA, apt-X" },
      { key: "Hoparlör Yönü", value: "Aşağı Yönde Ses Verme" },
      { key: "Hoparlör Sistemi", value: "4.2. kanal" },
      { key: "WOW Orkestra", value: "Evet" },
     ]
    },
    {
     category: "Erişilebilirlik",
     items: [
      { key: "Yüksek Kontrast", value: "Evet" },
      { key: "Gri Ölçek", value: "Evet" },
      { key: "Renkleri Ters Çevir", value: "Evet" },
     ]
    },
    {
     category: "Boyutlar",
     items: [
      { key: "Ekran Büyüklüğü", value: "77 inç (195,58 cm)" },
      { key: "Genişlik (cm)", value: "171.2" },
      { key: "Yükseklik (cm)", value: "98.2" },
      { key: "Derinlik (cm)", value: "2.48" },
      { key: "Ağırlık (kg)", value: "33.6" },
      { key: "VESA Uyumluluğu", value: "300 x 300" },
     ]
    },
    {
     category: "Bağlantı",
     items: [
      { key: "HDMI Ses Dönüş Kanalı", value: "eARC (HDMI 2)" },
      { key: "Bluetooth Desteği", value: "Evet (v 5.3)" },
      { key: "Ethernet Girişi", value: "1 adet" },
      { key: "Simplink (HDMI CEC)", value: "Evet" },
      { key: "SPDIF (Optik Dijital Ses Çıkışı)", value: "1 adet" },
      { key: "CI Slot", value: "1 adet" },
      { key: "HDMI Giriş", value: "4 adet (4K 120Hz, eARC, VRR, ALLM, QMS, QFT (4 port) destekler)" },
      { key: "RF Girişi (Anten/Kablo)", value: "2 adet" },
      { key: "USB Girişi", value: "3 adet (v 2.0)" },
      { key: "Wi-Fi", value: "Evet (Wi-Fi 6)" },
     ]
    },
    {
     category: "Güç",
     items: [
      { key: "Güç Kaynağı (Voltaj, Hz)", value: "AC 100~240V 50-60Hz" },
      { key: "Bekleme Güç Tüketimi", value: "0,5 W'ın altında" },
     ]
    },
    {
     category: "Dahil Olan Aksesuarlar",
     items: [
      { key: "Kumanda", value: "MR25 Sihirli Kumanda" },
      { key: "Güç Kablosu", value: "Evet (Ekli)" },
     ]
    },
    {
     category: "Yayıncılık",
     items: [
      { key: "Analog TV Alıcısı", value: "Evet" },
      { key: "Dijital TV Alıcısı", value: "DVB-T2/T (Karasal), DVB-C (Kablo), DVB-S2/S (Uydu)" },
     ]
    },
   ],
   colors: [
    {
     name: "Siyah",
     hexCode: "#000000",
     price: 225000,
     discountPrice: null,
     serialNumber: "OLED77G55LW",
     images: ["/products/tv/OLED77G55LW-1.webp"],
     stock: 5,
     manualLink: "",
    }
   ]
  }, */
];

if (typeof module !== 'undefined' && module.exports) {
 module.exports = { products };
}