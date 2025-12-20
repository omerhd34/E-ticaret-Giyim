"use client";
import ProductCard from "@/app/components/ui/ProductCard";
import { getProductUrl } from "@/app/utils/productUrl";

export default function CategoryProducts({ loading, products, sortBy, onClearFilters }) {
 if (loading) {
  return (
   <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
    {[...Array(9)].map((_, i) => (
     <div
      key={i}
      className="bg-white rounded-xl overflow-hidden shadow-sm animate-pulse"
     >
      <div className="aspect-3/4 bg-gray-200"></div>
      <div className="p-4 space-y-3">
       <div className="h-4 bg-gray-200 rounded w-3/4"></div>
       <div className="h-4 bg-gray-200 rounded w-1/2"></div>
      </div>
     </div>
    ))}
   </div>
  );
 }

 if (products.length === 0) {
  return (
   <div className="bg-white rounded-xl shadow-sm p-12 text-center">
    <p className="text-gray-500 text-lg">Ürün bulunamadı</p>
    <button
     onClick={onClearFilters}
     className="mt-4 text-indigo-600 hover:text-indigo-800 font-semibold"
    >
     Filtreleri Temizle
    </button>
   </div>
  );
 }

 // Her ürün için tüm renk varyantlarını ayrı kartlar olarak göster
 const expandedProducts = [];
 products.forEach((product, originalIndex) => {
  if (product.colors && product.colors.length > 0) {
   // Her renk varyantı için ayrı bir kart oluştur
   product.colors.forEach((color) => {
    if (typeof color === 'object' && color.serialNumber) {
     // Renk bazlı fiyatı hesapla
     const colorPrice = color.price || product.price;
     const colorDiscountPrice = color.discountPrice !== undefined ? color.discountPrice : product.discountPrice;
     const finalPrice = (colorDiscountPrice && colorDiscountPrice < colorPrice) ? colorDiscountPrice : colorPrice;

     expandedProducts.push({
      ...product,
      _colorVariantId: `${product._id}-${color.serialNumber}`, // Unique key için
      _selectedColor: color,
      _finalPrice: finalPrice, // Sıralama için kullanılacak fiyat
      _originalIndex: originalIndex, // Orijinal sıralamayı korumak için
     });
    }
   });
  } else {
   // Renk yoksa normal ürünü ekle
   const finalPrice = (product.discountPrice && product.discountPrice < product.price) ? product.discountPrice : product.price;
   expandedProducts.push({
    ...product,
    _finalPrice: finalPrice, // Sıralama için kullanılacak fiyat
    _originalIndex: originalIndex, // Orijinal sıralamayı korumak için
   });
  }
 });

 // Sıralama yap (eğer sortBy varsa)
 let sortedProducts = expandedProducts;
 if (sortBy) {
  sortedProducts = [...expandedProducts].sort((a, b) => {
   if (sortBy === 'price') {
    // Fiyat: Düşükten Yükseğe
    const priceDiff = (a._finalPrice || 0) - (b._finalPrice || 0);
    // Fiyat eşitse orijinal sıralamayı koru
    return priceDiff !== 0 ? priceDiff : (a._originalIndex || 0) - (b._originalIndex || 0);
   } else if (sortBy === '-price') {
    // Fiyat: Yüksekten Düşüğe
    const priceDiff = (b._finalPrice || 0) - (a._finalPrice || 0);
    // Fiyat eşitse orijinal sıralamayı koru
    return priceDiff !== 0 ? priceDiff : (a._originalIndex || 0) - (b._originalIndex || 0);
   } else if (sortBy === '-soldCount') {
    // En Çok Satan
    const soldCountDiff = (b.soldCount || 0) - (a.soldCount || 0);
    // soldCount eşitse orijinal sıralamayı koru (API'den gelen sıralama)
    return soldCountDiff !== 0 ? soldCountDiff : (a._originalIndex || 0) - (b._originalIndex || 0);
   } else if (sortBy === '-rating') {
    // En Yüksek Puan
    const ratingDiff = (b.rating || 0) - (a.rating || 0);
    // Rating eşitse orijinal sıralamayı koru
    return ratingDiff !== 0 ? ratingDiff : (a._originalIndex || 0) - (b._originalIndex || 0);
   } else if (sortBy === 'name') {
    // İsim: A'dan Z'ye
    return (a.name || '').localeCompare(b.name || '', 'tr');
   } else if (sortBy === '-name') {
    // İsim: Z'den A'ya
    return (b.name || '').localeCompare(a.name || '', 'tr');
   } else if (sortBy === '-createdAt') {
    // Tarih: Yeni'den Eski'ye
    return new Date(b.createdAt || 0) - new Date(a.createdAt || 0);
   } else if (sortBy === 'createdAt') {
    // Tarih: Eski'den Yeni'ye
    return new Date(a.createdAt || 0) - new Date(b.createdAt || 0);
   }
   return 0;
  });
 }

 return (
  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
   {sortedProducts.map((product) => {
    // Eğer renk varyantı varsa, o renge özel bir product objesi oluştur
    if (product._selectedColor) {
     const colorVariant = {
      ...product,
      // Renk varyantına özel bilgileri ürün seviyesine kopyala
      price: product._selectedColor.price || product.price,
      discountPrice: product._selectedColor.discountPrice !== undefined ? product._selectedColor.discountPrice : product.discountPrice,
      images: product._selectedColor.images && product._selectedColor.images.length > 0 ? product._selectedColor.images : product.images,
      serialNumber: product._selectedColor.serialNumber || product.serialNumber,
      stock: product._selectedColor.stock !== undefined ? product._selectedColor.stock : product.stock,
      // colors array'ini sadece bu rengi içerecek şekilde ayarla (ProductCard ilk rengi kullanır)
      colors: [product._selectedColor],
     };
     return <ProductCard key={product._colorVariantId} product={colorVariant} />;
    }
    return <ProductCard key={product._id} product={product} />;
   })}
  </div>
 );
}
