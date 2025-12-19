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
import ProductSizeSelector from "@/app/components/product/ProductSizeSelector";
import ProductQuantitySelector from "@/app/components/product/ProductQuantitySelector";
import ProductActions from "@/app/components/product/ProductActions";
import ProductFeatures from "@/app/components/product/ProductFeatures";
import ProductDetails from "@/app/components/product/ProductDetails";

export default function UrunDetayPage() {
 const params = useParams();
 const slug = params?.slug;

 const { addToCart, addToFavorites, removeFromFavorites, isFavorite } = useCart();

 const [product, setProduct] = useState(null);
 const [loading, setLoading] = useState(true);
 const [selectedImage, setSelectedImage] = useState(0);
 const [selectedSize, setSelectedSize] = useState(null);
 const [selectedColor, setSelectedColor] = useState(null);
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
   const res = await fetch("/api/products?limit=100");
   const data = await res.json();

   if (data.success) {
    const foundProduct = data.data.find((p) => p.slug === slug);
    if (foundProduct) {
     setProduct(foundProduct);
     if (foundProduct.sizes && foundProduct.sizes.length > 0) {
      setSelectedSize(foundProduct.sizes[0]);
     }
     if (foundProduct.colors && foundProduct.colors.length > 0) {
      setSelectedColor(foundProduct.colors[0].name);
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

  if (product.stock === 0) {
   setToast({ show: true, message: "Bu ürün stokta bulunmamaktadır.", type: "error" });
   return;
  }

  if (product.sizes && product.sizes.length > 0 && !selectedSize) {
   setToast({ show: true, message: "Lütfen bir beden seçin", type: "error" });
   return;
  }

  if (quantity > 10) {
   setToast({ show: true, message: "Bir üründen en fazla 10 adet alabilirsiniz.", type: "error" });
   setQuantity(10);
   return;
  }

  addToCart(product, selectedSize, selectedColor, quantity);
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

 const hasDiscount = product.discountPrice && product.discountPrice < product.price;
 const displayPrice = hasDiscount ? product.discountPrice : product.price;
 const discountPercentage = hasDiscount
  ? Math.round(((product.price - product.discountPrice) / product.price) * 100)
  : 0;

 return (
  <div className="min-h-screen bg-gray-50 py-12">
   <Toast toast={toast} setToast={setToast} />

   <div className="container mx-auto px-4">
    <ProductBreadcrumb product={product} />

    <div className="grid lg:grid-cols-2 gap-12">
     <ProductImageGallery
      images={product.images}
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
       originalPrice={product.price}
      />

      <p className="text-gray-600 mb-6 leading-relaxed max-w-2xl wrap-break-word">
       {product.description}
      </p>

      <ProductStockStatus stock={product.stock} />

      <ProductColorSelector
       colors={product.colors}
       selectedColor={selectedColor}
       onColorSelect={setSelectedColor}
      />

      <ProductSizeSelector
       sizes={product.sizes}
       selectedSize={selectedSize}
       onSizeSelect={setSelectedSize}
      />

      <ProductQuantitySelector
       quantity={quantity}
       stock={product.stock}
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

      <ProductDetails product={product} />
     </div>
    </div>
   </div>
  </div>
 );
}
