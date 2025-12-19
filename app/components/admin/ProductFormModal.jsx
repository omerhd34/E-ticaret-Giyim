"use client";
import { useState, useEffect } from "react";
import { HiX, HiUpload } from "react-icons/hi";
import Image from "next/image";
import { MENU_ITEMS } from "@/app/components/ui/Header";
import axiosInstance from "@/lib/axios";

const MAX_IMAGES = 5;
const MAX_DESCRIPTION = 200;
const MAX_NAME = 25;
const MAX_BRAND = 20;

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
 if (!raw) return undefined;
 if (/^#([0-9a-fA-F]{3}|[0-9a-fA-F]{6})$/.test(raw)) return raw;
 const key = normalizeColorName(raw);
 return COLOR_HEX_MAP[key];
};

const getAvailableSizes = (category) => {
 if (!category) return [];
 const allSizes = {
  letterSizes: ["XS", "S", "M", "L", "XL", "XXL", "3XL"],
  numberSizes: ["36", "37", "38", "39", "40", "41", "42", "43", "44", "45", "46", "47", "48", "49", "50"],
  allSizes: ["XS", "S", "M", "L", "XL", "XXL", "3XL", "36", "37", "38", "39", "40", "41", "42", "43", "44", "45", "46", "47", "48", "49", "50"]
 };
 switch (category) {
  case "Ayakkabı":
   return allSizes.numberSizes;
  case "Giyim":
   return allSizes.letterSizes;
  case "Aksesuar":
   return [];
  case "İndirimler":
  case "YENİ GELENLER":
   return allSizes.allSizes;
  default:
   return allSizes.allSizes;
 }
};

const subCategoryOptions = {};
MENU_ITEMS.forEach((item) => {
 if (item.subCategories && item.subCategories.length > 0) {
  subCategoryOptions[item.name] = item.subCategories.map((subCat) => subCat.name);
 }
});

/**
 * Product Form Modal Component
 * 
 * @param {boolean} show - Modal görünür mü?
 * @param {Object} editingProduct - Düzenlenen ürün (null ise yeni ürün)
 * @param {function} onClose - Modal kapatma callback'i
 * @param {function} onSuccess - Form başarıyla gönderildiğinde callback
 * @param {function} onError - Hata durumunda callback (message ile)
 */
export default function ProductFormModal({ show, editingProduct, onClose, onSuccess, onError }) {
 const [form, setForm] = useState({
  name: "",
  description: "",
  price: "",
  discountPrice: "",
  category: "",
  subCategory: "",
  images: [],
  sizes: [],
  colorsText: "",
  stock: "",
  brand: "",
  material: "",
  tags: "",
  isNew: false,
  isFeatured: false,
 });

 const [uploadingImage, setUploadingImage] = useState(false);
 const [imagePreview, setImagePreview] = useState([]);
 const [loading, setLoading] = useState(false);

 // Editing product veya show değiştiğinde formu doldur/temizle
 useEffect(() => {
  if (show && editingProduct) {
   const colorNames = Array.isArray(editingProduct.colors)
    ? editingProduct.colors
     .map((c) => (typeof c === "string" ? c : (c?.name || "")))
     .map((x) => String(x).trim())
     .filter(Boolean)
    : [];
   setForm({
    name: editingProduct.name,
    description: editingProduct.description,
    price: editingProduct.price,
    discountPrice: editingProduct.discountPrice || "",
    category: editingProduct.category,
    subCategory: editingProduct.subCategory,
    images: editingProduct.images,
    sizes: Array.isArray(editingProduct.sizes) ? editingProduct.sizes : (editingProduct.sizes ? editingProduct.sizes.split(",").map(s => s.trim()).filter(Boolean) : []),
    colorsText: colorNames.join(", "),
    stock: editingProduct.stock,
    brand: editingProduct.brand,
    material: editingProduct.material,
    tags: editingProduct.tags ? editingProduct.tags.join(", ") : "",
    isNew: editingProduct.isNew,
    isFeatured: editingProduct.isFeatured,
   });
   setImagePreview(editingProduct.images);
  } else if (!show) {
   // Modal kapandığında formu temizle
   setForm({
    name: "",
    description: "",
    price: "",
    discountPrice: "",
    category: "",
    subCategory: "",
    images: [],
    sizes: [],
    colorsText: "",
    stock: "",
    brand: "",
    material: "",
    tags: "",
    isNew: false,
    isFeatured: false,
   });
   setImagePreview([]);
  }
 }, [editingProduct, show]);

 const toggleSize = (size) => {
  const currentSizes = form.sizes || [];
  if (currentSizes.includes(size)) {
   setForm({ ...form, sizes: currentSizes.filter(s => s !== size) });
  } else {
   setForm({ ...form, sizes: [...currentSizes, size] });
  }
 };

 const handleImageUpload = async (e) => {
  const file = e.target.files?.[0];
  if (!file) return;
  const currentCount = (form.images || []).length;
  if (currentCount >= MAX_IMAGES) {
   if (onError) onError(`En fazla ${MAX_IMAGES} görsel ekleyebilirsiniz.`);
   try { e.target.value = ""; } catch { }
   return;
  }
  setUploadingImage(true);
  try {
   const formData = new FormData();
   formData.append("file", file);
   const res = await axiosInstance.post("/api/upload", formData, {
    headers: { "Content-Type": "multipart/form-data" },
   });
   if (res.data?.success && res.data?.url) {
    const url = res.data.url;
    setForm(prev => {
     const prevImages = prev.images || [];
     if (prevImages.length >= MAX_IMAGES) return prev;
     return { ...prev, images: [...prevImages, url] };
    });
    setImagePreview(prev => {
     const prevList = prev || [];
     if (prevList.length >= MAX_IMAGES) return prevList;
     return [...prevList, url];
    });
   } else {
    if (onError) onError("Görsel yüklenemedi");
   }
  } catch {
   if (onError) onError("Görsel yüklenemedi");
  } finally {
   setUploadingImage(false);
  }
 };

 const removeImage = (idx) => {
  setForm(prev => ({ ...prev, images: (prev.images || []).filter((_, i) => i !== idx) }));
  setImagePreview(prev => (prev || []).filter((_, i) => i !== idx));
 };

 const handleSubmit = async (e) => {
  e.preventDefault();
  setLoading(true);

  const nameVal = String(form.name || "").trim();
  if (nameVal.length > MAX_NAME) {
   if (onError) onError(`Ürün adı en fazla ${MAX_NAME} karakter olabilir.`);
   setLoading(false);
   return;
  }
  const brandVal = String(form.brand || "").trim();
  if (brandVal.length > MAX_BRAND) {
   if (onError) onError(`Marka en fazla ${MAX_BRAND} karakter olabilir.`);
   setLoading(false);
   return;
  }

  const desc = String(form.description || "");
  if (desc.length > MAX_DESCRIPTION) {
   if (onError) onError(`Açıklama en fazla ${MAX_DESCRIPTION} karakter olabilir.`);
   setLoading(false);
   return;
  }

  const stockValue = parseInt(form.stock);
  if (isNaN(stockValue) || stockValue < 0) {
   if (onError) onError("Stok değeri en az 0 olmalıdır!");
   setLoading(false);
   return;
  }

  const priceValue = parseFloat(form.price);
  const discountPriceValue = form.discountPrice ? parseFloat(form.discountPrice) : null;
  if (isNaN(priceValue) || priceValue <= 0) {
   if (onError) onError("Fiyat geçerli bir pozitif sayı olmalıdır!");
   setLoading(false);
   return;
  }
  if (discountPriceValue !== null && (isNaN(discountPriceValue) || discountPriceValue <= 0)) {
   if (onError) onError("İndirimli fiyat geçerli bir sayı olmalıdır!");
   setLoading(false);
   return;
  }

  try {
   const normalizedColors = String(form.colorsText || "")
    .split(/[,\n;:]+/g)
    .map((x) => x.trim())
    .filter(Boolean);

   const payload = {
    ...form,
    price: Number(priceValue),
    discountPrice: discountPriceValue !== null ? Number(discountPriceValue) : undefined,
    stock: Number(stockValue),
    tags: form.tags ? form.tags.split(",").map(t => t.trim()).filter(Boolean) : [],
    colors: normalizedColors.map((name) => ({ name, hexCode: inferHexCode(name) })),
   };
   delete payload.colorsText;

   let res;
   if (editingProduct?._id) {
    res = await axiosInstance.put(`/api/products/${editingProduct._id}`, payload);
   } else {
    res = await axiosInstance.post("/api/products", payload);
   }

   if (!res.data?.success) {
    if (onError) onError(res.data?.error || res.data?.message || "İşlem başarısız");
    return;
   }

   if (onSuccess) onSuccess();
  } catch (err) {
   const status = err?.response?.status;
   const apiMsg = err?.response?.data?.error || err?.response?.data?.message;
   const msg = apiMsg || err?.message || "İşlem başarısız";
   if (onError) onError(status ? `${msg} (HTTP ${status})` : msg);
  } finally {
   setLoading(false);
  }
 };

 if (!show) return null;

 return (
  <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
   <div className="bg-white rounded-xl shadow-2xl w-full max-w-3xl max-h-[90vh] overflow-y-auto">
    <div className="sticky top-0 bg-white border-b px-6 py-4 flex items-center justify-between">
     <h3 className="text-xl font-bold">{editingProduct ? "Ürün Düzenle" : "Yeni Ürün Ekle"}</h3>
     <button
      onClick={onClose}
      className="text-gray-500 hover:text-gray-800 transition"
     >
      <HiX size={24} />
     </button>
    </div>

    <form onSubmit={handleSubmit} className="p-6 space-y-5">
     <div className="grid md:grid-cols-2 gap-4">
      <div>
       <div className="flex items-center justify-between gap-3 mb-2">
        <label className="block text-sm font-semibold text-gray-700">Ürün Adı</label>
        <span className={`text-xs ${String(form.name || "").length > MAX_NAME ? "text-red-600 font-semibold" : "text-gray-500"}`}>
         {String(form.name || "").length}/{MAX_NAME}
        </span>
       </div>
       <input
        value={form.name}
        onChange={(e) => setForm({ ...form, name: e.target.value })}
        className="w-full border rounded-lg px-4 py-3"
        maxLength={MAX_NAME}
        required
       />
      </div>
      <div>
       <div className="flex items-center justify-between gap-3 mb-2">
        <label className="block text-sm font-semibold text-gray-700">Marka</label>
        <span className={`text-xs ${String(form.brand || "").length > MAX_BRAND ? "text-red-600 font-semibold" : "text-gray-500"}`}>
         {String(form.brand || "").length}/{MAX_BRAND}
        </span>
       </div>
       <input
        value={form.brand}
        onChange={(e) => setForm({ ...form, brand: e.target.value })}
        className="w-full border rounded-lg px-4 py-3"
        maxLength={MAX_BRAND}
       />
      </div>
     </div>

     <div>
      <div className="flex items-center justify-between gap-3 mb-2">
       <label className="block text-sm font-semibold text-gray-700">Açıklama</label>
       <span className={`text-xs ${String(form.description || "").length > MAX_DESCRIPTION ? "text-red-600 font-semibold" : "text-gray-500"}`}>
        {String(form.description || "").length}/{MAX_DESCRIPTION}
       </span>
      </div>
      <textarea
       value={form.description}
       onChange={(e) => setForm({ ...form, description: e.target.value })}
       className="w-full border rounded-lg px-4 py-3 min-h-[110px]"
       maxLength={MAX_DESCRIPTION}
       required
      />
     </div>

     <div className="grid md:grid-cols-3 gap-4">
      <div>
       <label className="block text-sm font-semibold text-gray-700 mb-2">Fiyat (₺)</label>
       <input
        type="text"
        inputMode="decimal"
        value={form.price}
        onChange={(e) => {
         const value = e.target.value;
         if (value === '' || /^\d*\.?\d*$/.test(value)) {
          setForm({ ...form, price: value });
         }
        }}
        onKeyDown={(e) => {
         if (!/[0-9.]/.test(e.key) && !['Backspace', 'Delete', 'ArrowLeft', 'ArrowRight', 'ArrowUp', 'ArrowDown', 'Tab'].includes(e.key)) {
          e.preventDefault();
         }
        }}
        className="w-full border rounded-lg px-4 py-3"
        required
       />
      </div>
      <div>
       <label className="block text-sm font-semibold text-gray-700 mb-2">İndirimli Fiyat (₺)</label>
       <input
        type="text"
        inputMode="decimal"
        value={form.discountPrice}
        onChange={(e) => {
         const value = e.target.value;
         if (value === '' || /^\d*\.?\d*$/.test(value)) {
          setForm({ ...form, discountPrice: value });
         }
        }}
        onKeyDown={(e) => {
         if (!/[0-9.]/.test(e.key) && !['Backspace', 'Delete', 'ArrowLeft', 'ArrowRight', 'ArrowUp', 'ArrowDown', 'Tab'].includes(e.key)) {
          e.preventDefault();
         }
        }}
        className="w-full border rounded-lg px-4 py-3"
       />
      </div>
      <div>
       <label className="block text-sm font-semibold text-gray-700 mb-2">Stok</label>
       <input
        type="text"
        inputMode="numeric"
        value={form.stock}
        onChange={(e) => {
         const value = e.target.value;
         if (value === '' || /^\d+$/.test(value)) {
          setForm({ ...form, stock: value });
         }
        }}
        onKeyDown={(e) => {
         if (!/[0-9]/.test(e.key) && !['Backspace', 'Delete', 'ArrowLeft', 'ArrowRight', 'ArrowUp', 'ArrowDown', 'Tab'].includes(e.key)) {
          e.preventDefault();
         }
        }}
        className="w-full border rounded-lg px-4 py-3"
        required
       />
      </div>
     </div>

     <div className="grid md:grid-cols-2 gap-4">
      <div>
       <label className="block text-sm font-semibold text-gray-700 mb-2">Kategori</label>
       <select
        value={form.category}
        onChange={(e) => setForm({ ...form, category: e.target.value, subCategory: "" })}
        className="w-full border rounded-lg px-4 py-3 cursor-pointer"
        required
       >
        <option value="">Seçiniz</option>
        {MENU_ITEMS.map((item) => (
         <option key={item.name} value={item.name}>{item.name}</option>
        ))}
       </select>
      </div>
      <div>
       <label className="block text-sm font-semibold text-gray-700 mb-2">Alt Kategori</label>
       <select
        value={form.subCategory}
        onChange={(e) => setForm({ ...form, subCategory: e.target.value })}
        className="w-full border rounded-lg px-4 py-3 cursor-pointer"
       >
        <option value="">Seçiniz</option>
        {(subCategoryOptions[form.category] || []).map((sc) => (
         <option key={sc} value={sc}>{sc}</option>
        ))}
       </select>
      </div>
     </div>

     <div>
      <p className="block text-sm font-semibold text-gray-700 mb-2">Görseller {" "}
       <span className="text-sm text-gray-700">({(form.images || []).length} görsel)</span>
      </p>

      <div className="mt-4 flex items-center gap-3">
       {(() => {
        const isMaxed = (form.images || []).length >= MAX_IMAGES;
        const disabled = uploadingImage || isMaxed;
        return (
         <label
          title={isMaxed ? `Maksimum ${MAX_IMAGES} görsel eklenebilir` : "Görsel Yükle"}
          className={`shrink-0 self-center inline-flex items-center justify-center gap-2 px-3 py-2 rounded-lg text-sm font-semibold transition ${disabled ? "bg-gray-300 text-gray-600 cursor-not-allowed" : "bg-indigo-600 hover:bg-indigo-700 text-white cursor-pointer"}`}
         >
          <HiUpload size={16} />
          <input type="file" className="hidden" onChange={handleImageUpload} disabled={disabled} />
         </label>
        );
       })()}

       <div className="flex-1">
        {(imagePreview || []).length > 0 ? (
         <div className="grid grid-cols-3 md:grid-cols-5 gap-3">
          {imagePreview.map((src, idx) => (
           <div key={idx} className="relative group">
            <Image src={src} alt="preview" width={120} height={120} className="w-full h-24 object-cover rounded-lg" />
            <button
             type="button"
             onClick={() => removeImage(idx)}
             className="absolute top-2 right-2 bg-black/70 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition"
             title="Kaldır"
            >
             <HiX size={16} />
            </button>
           </div>
          ))}
         </div>
        ) : (
         <div className="text-sm text-gray-500">Henüz görsel eklenmedi.</div>
        )}
       </div>
      </div>
     </div>

     <div>
      <label className="block text-sm font-semibold text-gray-700 mb-2">Bedenler</label>
      <div className="flex flex-wrap gap-2">
       {getAvailableSizes(form.category).map((size) => {
        const selected = (form.sizes || []).includes(size);
        return (
         <button
          type="button"
          key={size}
          onClick={() => toggleSize(size)}
          className={`px-3 py-2 rounded-lg text-sm font-semibold border transition cursor-pointer ${selected ? "bg-indigo-600 text-white border-indigo-600" : "bg-white text-gray-700 border-gray-300 hover:border-indigo-400"}`}
         >
          {size}
         </button>
        );
       })}
      </div>
     </div>

     <div className="grid md:grid-cols-2 gap-4">
      <div>
       <label className="block text-sm font-semibold text-gray-700 mb-2">Renkler (virgülle)</label>
       <input
        value={form.colorsText || ""}
        onChange={(e) => {
         const value = e.target.value;
         if (!/[0-9]/.test(value)) {
          setForm({ ...form, colorsText: value });
         }
        }}
        onKeyDown={(e) => {
         if (/[0-9]/.test(e.key)) {
          e.preventDefault();
         }
        }}
        className="w-full border rounded-lg px-4 py-3"
        placeholder="mavi, kırmızı, siyah (veya mavi:kırmızı)"
       />
      </div>
      <div>
       <label className="block text-sm font-semibold text-gray-700 mb-2">Etiketler (virgülle)</label>
       <input
        value={form.tags}
        onChange={(e) => setForm({ ...form, tags: e.target.value })}
        className="w-full border rounded-lg px-4 py-3"
       />
      </div>
     </div>

     <div className="flex items-center gap-4">
      <label className="inline-flex items-center gap-2 text-sm font-semibold text-gray-700">
       <input
        type="checkbox"
        checked={Boolean(form.isNew)}
        onChange={(e) => setForm({ ...form, isNew: e.target.checked })}
       />
       Yeni Ürün
      </label>
      <label className="inline-flex items-center gap-2 text-sm font-semibold text-gray-700">
       <input
        type="checkbox"
        checked={Boolean(form.isFeatured)}
        onChange={(e) => setForm({ ...form, isFeatured: e.target.checked })}
       />
       Öne Çıkan
      </label>
     </div>

     <div className="flex justify-end gap-3 pt-2">
      <button
       type="button"
       onClick={onClose}
       className="px-6 py-3 rounded-lg bg-gray-200 hover:bg-gray-300 text-gray-800 font-semibold transition cursor-pointer"
      >
       Vazgeç
      </button>
      <button
       type="submit"
       disabled={loading}
       className={`px-6 py-3 rounded-lg font-semibold transition ${loading ? "bg-gray-300 text-gray-600 cursor-not-allowed" : "bg-indigo-600 hover:bg-indigo-700 text-white cursor-pointer"}`}
      >
       {loading ? "Kaydediliyor..." : (editingProduct ? "Güncelle" : "Kaydet")}
      </button>
     </div>
    </form>
   </div>
  </div>
 );
}
