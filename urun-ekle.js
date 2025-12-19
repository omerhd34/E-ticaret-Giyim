const BASE_URL = process.env.BASE_URL || "http://localhost:3000";
const ADMIN_COOKIE = process.env.ADMIN_COOKIE || "admin-session=authenticated";

const products = [
 {
  name: "Pekmez",
  description: "Wild Wood is a brand that makes stylish and comfortable shoes for men and women.",
  price: 200,
  /* discountPrice: 199.99, */
  category: "Ayakkabı",
  subCategory: "Spor Ayakkabı",
  images: [
   "/1.jpeg",
   "/4.jpg",
   "/6.webp",
  ],
  colors: ["siyah", "beyaz", "mavi"],
  sizes: ["36", "37", "38", "39", "40", "41", "42", "43"],
  stock: 0,
  brand: "Wild Wood",
  isNew: false,
  isFeatured: false
 },
];

const normalizeColorName = (v) =>
 String(v || "")
  .trim()
  .toLowerCase()
  .replace(/İ/g, "i")
  .replace(/I/g, "i")
  .replace(/ı/g, "i")
  .normalize("NFKD")
  .replace(/[\u0300-\u036f]/g, "");

const COLOR_HEX_MAP = {
 siyah: "#000000",
 beyaz: "#ffffff",
 kirmizi: "#ef4444",
 mavi: "#3b82f6",
 yesil: "#22c55e",
 sari: "#facc15",
 turuncu: "#f97316",
 mor: "#a855f7",
 pembe: "#ec4899",
 gri: "#9ca3af",
 lacivert: "#1e3a8a",
 kahverengi: "#92400e",
 bej: "#e5d3b3",
};

const inferHexCode = (name) => {
 const raw = String(name || "").trim();
 if (!raw) return "";
 // Direkt hex girildiyse (#fff / #ffffff)
 if (/^#([0-9a-fA-F]{3}|[0-9a-fA-F]{6})$/.test(raw)) return raw;
 const key = normalizeColorName(raw);
 return COLOR_HEX_MAP[key] || "";
};

const normalizeColors = (colors) => {
 const arr = Array.isArray(colors) ? colors : [];
 return arr
  .map((c) => {
   if (typeof c === "string") {
    const name = c.trim();
    return name ? { name, hexCode: inferHexCode(name) || undefined } : null;
   }
   if (c && typeof c === "object") {
    const name = String(c.name || "").trim();
    if (!name) return null;
    const hexCode = c.hexCode ? String(c.hexCode).trim() : "";
    return { name, hexCode: (hexCode || inferHexCode(name) || undefined) };
   }
   return null;
  })
  .filter(Boolean);
};

// Tek ürün ekleme fonksiyonu
async function addProduct(product) {
 try {
  const payload = {
   ...product,
   colors: normalizeColors(product.colors),
  };

  const response = await fetch(`${BASE_URL}/api/products`, {
   method: "POST",
   headers: {
    "Content-Type": "application/json",
    "Cookie": ADMIN_COOKIE
   },
   body: JSON.stringify(payload)
  });

  const data = await response.json();

  if (data.success) {
   return { success: true, data: data.data };
  } else {
   return { success: false, error: data.error };
  }
 } catch (error) {
  return { success: false, error: error.message };
 }
}

// Çoklu ürün ekleme fonksiyonu
async function addMultipleProducts(productsArray) {
 const results = [];
 let successCount = 0;
 let errorCount = 0;


 for (let i = 0; i < productsArray.length; i++) {
  const product = productsArray[i];

  // Boş ürünleri atla
  if (!product.name || !product.description) {
   continue;
  }


  const result = await addProduct(product);
  results.push({ product: product.name, ...result });

  if (result.success) {
   successCount++;
  } else {
   errorCount++;
  }

  // API'ye çok hızlı istek göndermemek için kısa bir bekleme
  if (i < productsArray.length - 1) {
   await new Promise(resolve => setTimeout(resolve, 500));
  }
 }
 return results;
}

if (typeof require !== 'undefined' && require.main === module) {
 addMultipleProducts(products)
  .then(results => {
   const successCount = results.filter(r => r.success).length;
   process.exit(0);
  })
  .catch(error => {
   process.exit(1);
  });
} else {
 if (typeof window !== 'undefined') {
  window.addProduct = addProduct;
  window.addMultipleProducts = addMultipleProducts;
  window.products = products;
 }
}