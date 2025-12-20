"use client";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { useCart } from "@/context/CartContext";
import Toast from "@/app/components/ui/Toast";
import ProductLoading from "@/app/components/product/ProductLoading";
import ProductNotFound from "@/app/components/product/ProductNotFound";
import ProductBreadcrumb from "@/app/components/product/ProductBreadcrumb";
import ProductImageGallery from "@/app/components/product/ProductImageGallery";
import ProductRating from "@/app/components/product/ProductRating";
import ProductPrice from "@/app/components/product/ProductPrice";
import ProductStockStatus from "@/app/components/product/ProductStockStatus";
import ProductColorSelector from "@/app/components/product/ProductColorSelector";
import ProductQuantitySelector from "@/app/components/product/ProductQuantitySelector";
import ProductActions from "@/app/components/product/ProductActions";
import ProductFeatures from "@/app/components/product/ProductFeatures";
import ProductAllFeatures from "@/app/components/product/ProductAllFeatures";

export default function UrunDetayPage() {
 const params = useParams();
 const slug = params?.slug;

 const { addToCart, addToFavorites, removeFromFavorites, isFavorite } = useCart();

 const [product, setProduct] = useState(null);
 const [loading, setLoading] = useState(true);
 const [selectedImage, setSelectedImage] = useState(0);
 const [selectedColor, setSelectedColor] = useState(null);
 const [selectedColorObj, setSelectedColorObj] = useState(null);
 const [quantity, setQuantity] = useState(1);
 const [addedToCart, setAddedToCart] = useState(false);
 const [canRate, setCanRate] = useState(false);
 const [userRating, setUserRating] = useState(0);
 const [hoverRating, setHoverRating] = useState(0);
 const [ratingSubmitted, setRatingSubmitted] = useState(false);
 const [checkingRating, setCheckingRating] = useState(true);
 const [ratingMessage, setRatingMessage] = useState("");
 const [toast, setToast] = useState({ show: false, message: "", type: "success" });

 useEffect(() => {
  if (slug) {
   fetchProduct();
  }
  // eslint-disable-next-line react-hooks/exhaustive-deps
 }, [slug]);

 const fetchProduct = async () => {
  setLoading(true);
  try {
   const res = await fetch("/api/products?limit=1000");
   const data = await res.json();

   if (data.success) {
    const foundProduct = data.data.find((p) => p.slug === slug);
    if (foundProduct) {
     // Yeni URL formatına yönlendir
     const { getProductUrl } = await import("@/app/utils/productUrl");
     const firstColor = foundProduct.colors && foundProduct.colors.length > 0 && typeof foundProduct.colors[0] === 'object'
      ? foundProduct.colors[0]
      : null;
     const serialNumber = firstColor?.serialNumber || foundProduct.serialNumber;
     const newUrl = getProductUrl(foundProduct, serialNumber);

     // Eğer yeni URL farklıysa yönlendir
     if (newUrl !== `/urun/${slug}`) {
      window.location.href = newUrl;
      return;
     }

     setProduct(foundProduct);
     if (foundProduct.colors && foundProduct.colors.length > 0) {
      const firstColorObj = typeof foundProduct.colors[0] === 'object' ? foundProduct.colors[0] : { name: foundProduct.colors[0] };
      setSelectedColor(firstColorObj.name);
      setSelectedColorObj(firstColorObj);
      setSelectedImage(0);
     }
     checkCanRate(foundProduct._id);
    }
   }
  } catch (error) {
  } finally {
   setLoading(false);
  }
 };

 const checkCanRate = async (productId) => {
  try {
   setCheckingRating(true);
   const res = await fetch(`/api/products/${productId}/rating`, {
    credentials: "include",
   });
   const data = await res.json();
   if (data.success) {
    setCanRate(data.canRate);
    setRatingMessage(data.message || "");
    if (data.userRating) {
     setUserRating(Number(data.userRating) || 0);
    }
   }
  } catch (error) {
   setCanRate(false);
   setRatingMessage("");
  } finally {
   setCheckingRating(false);
  }
 };

 const handleSubmitRating = async (rating) => {
  if (!product || !canRate) return;

  try {
   const res = await fetch(`/api/products/${product._id}/rating`, {
    method: "POST",
    headers: {
     "Content-Type": "application/json",
    },
    credentials: "include",
    body: JSON.stringify({ rating }),
   });

   const data = await res.json();

   if (data.success) {
    setRatingSubmitted(true);
    setCanRate(false);
    setProduct({
     ...product,
     rating: data.data.rating,
     reviewCount: data.data.reviewCount,
    });
    setToast({ show: true, message: "Puanınız başarıyla kaydedildi!", type: "success" });
   } else {
    setToast({ show: true, message: data.message || "Puan verilemedi", type: "error" });
   }
  } catch (error) {
   setToast({ show: true, message: "Bir hata oluştu. Lütfen tekrar deneyin.", type: "error" });
  }
 };

 const handleAddToCart = () => {
  if (!product) return;

  const stockToCheck = colorStock !== undefined ? colorStock : product.stock;
  if (stockToCheck === 0) {
   setToast({ show: true, message: "Bu ürün stokta bulunmamaktadır.", type: "error" });
   return;
  }

  if (quantity > 10) {
   setToast({ show: true, message: "Bir üründen en fazla 10 adet alabilirsiniz.", type: "error" });
   setQuantity(10);
   return;
  }

  // Renk bazlı ürün bilgileriyle sepet ekle
  const productToAdd = {
   ...product,
   price: colorPrice,
   discountPrice: colorDiscountPrice,
   serialNumber: colorSerialNumber,
   images: colorImages,
   stock: stockToCheck,
  };

  addToCart(productToAdd, null, selectedColor, quantity);
  setAddedToCart(true);
  setTimeout(() => setAddedToCart(false), 2000);
 };

 const handleFavoriteToggle = () => {
  if (!product) return;

  if (isFavorite(product._id)) {
   removeFromFavorites(product._id);
  } else {
   addToFavorites(product);
  }
 };

 if (loading) {
  return <ProductLoading />;
 }

 if (!product) {
  return <ProductNotFound />;
 }

 // Seçili renk objesini bul
 const currentColorObj = selectedColorObj || (product.colors && product.colors.length > 0
  ? (typeof product.colors[0] === 'object' ? product.colors[0] : null)
  : null);

 // Renk bazlı fiyat, resim ve seri numarası
 const colorPrice = currentColorObj?.price || product.price;
 const colorDiscountPrice = currentColorObj?.discountPrice !== undefined ? currentColorObj.discountPrice : product.discountPrice;
 const colorImages = currentColorObj?.images && currentColorObj.images.length > 0 ? currentColorObj.images : product.images;
 const colorSerialNumber = currentColorObj?.serialNumber || product.serialNumber;
 const colorStock = currentColorObj?.stock !== undefined ? currentColorObj.stock : product.stock;

 const hasDiscount = colorDiscountPrice && colorDiscountPrice < colorPrice;
 const displayPrice = hasDiscount ? colorDiscountPrice : colorPrice;
 const discountPercentage = hasDiscount
  ? Math.round(((colorPrice - colorDiscountPrice) / colorPrice) * 100)
  : 0;

 // Renk değiştiğinde resimleri ve fiyatı güncelle
 const handleColorSelect = (colorName) => {
  setSelectedColor(colorName);
  const color = product.colors.find(c => {
   if (typeof c === 'object') {
    return c.name === colorName;
   }
   return c === colorName;
  });
  if (color && typeof color === 'object') {
   setSelectedColorObj(color);
   setSelectedImage(0);
  } else {
   setSelectedColorObj(null);
  }
 };

 return (
  <div className="min-h-screen bg-gray-50 py-12">
   <Toast toast={toast} setToast={setToast} />

   <div className="container mx-auto px-4">
    <ProductBreadcrumb product={product} />

    <div className="grid lg:grid-cols-2 gap-12">
     <ProductImageGallery
      images={colorImages}
      selectedImage={selectedImage}
      onImageSelect={setSelectedImage}
      isNew={product.isNew}
      discountPercentage={discountPercentage}
      productName={product.name}
     />

     <div>
      {product.brand && (
       <p className="text-sm text-gray-500 uppercase tracking-wide mb-2">
        {product.brand}
        {colorSerialNumber && (
         <span className="ml-2 font-mono text-gray-600 normal-case">- {colorSerialNumber}</span>
        )}
       </p>
      )}
      {!product.brand && colorSerialNumber && (
       <p className="text-sm text-gray-500 mb-2">
        <span className="font-mono text-gray-600">Seri No: {colorSerialNumber}</span>
       </p>
      )}

      <h1 className="text-3xl font-black text-gray-900 mb-4">{product.name}</h1>

      <ProductRating
       product={product}
       checkingRating={checkingRating}
       canRate={canRate}
       ratingSubmitted={ratingSubmitted}
       hoverRating={hoverRating}
       userRating={userRating}
       onHoverRating={setHoverRating}
       onRatingSubmit={handleSubmitRating}
      />

      <ProductPrice
       displayPrice={displayPrice}
       hasDiscount={hasDiscount}
       originalPrice={colorPrice}
      />

      <p className="text-gray-600 mb-6 leading-relaxed max-w-2xl wrap-break-word">
       {product.description}
      </p>

      <ProductStockStatus stock={colorStock} />

      <ProductColorSelector
       colors={product.colors}
       selectedColor={selectedColor}
       onColorSelect={handleColorSelect}
      />

      <ProductQuantitySelector
       quantity={quantity}
       stock={colorStock}
       onQuantityChange={setQuantity}
      />

      <ProductActions
       productId={product._id}
       stock={product.stock}
       addedToCart={addedToCart}
       isFavorite={isFavorite(product._id)}
       onAddToCart={handleAddToCart}
       onFavoriteToggle={handleFavoriteToggle}
      />

      <ProductFeatures />
     </div>
    </div>

    {/* Tüm Özellikler Bölümü */}
    <div className="mt-12">
     <ProductAllFeatures product={product} selectedColor={selectedColor} />
    </div>
   </div>
  </div>
 );
}
