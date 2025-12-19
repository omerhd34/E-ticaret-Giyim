"use client";
import { useState, useLayoutEffect, useEffect, useCallback } from "react";
import { useCart } from "@/context/CartContext";
import FavoritesLoading from "@/app/components/favorites/FavoritesLoading";
import FavoritesEmpty from "@/app/components/favorites/FavoritesEmpty";
import FavoritesHeader from "@/app/components/favorites/FavoritesHeader";
import FavoritesGrid from "@/app/components/favorites/FavoritesGrid";

export default function FavorilerPage() {
 const { favorites: localStorageFavorites } = useCart();
 const [isClient, setIsClient] = useState(false);
 const [products, setProducts] = useState([]);
 const [loading, setLoading] = useState(true);

 useLayoutEffect(() => {
  setIsClient(true);
 }, []);

 const fetchFavoriteProducts = useCallback(async () => {
  if (!isClient) return;

  setLoading(true);
  try {
   let favoriteIds = [];

   const localIds = localStorageFavorites
    .map(fav => {
     const id = fav._id || fav.id;
     return id ? String(id) : null;
    })
    .filter(Boolean);

   favoriteIds = [...localIds];

   try {
    const dbRes = await fetch("/api/user/favorites", {
     credentials: "include",
    });
    const dbData = await dbRes.json();

    if (dbData.success && dbData.favorites && dbData.favorites.length > 0) {
     const dbIds = dbData.favorites.map(id => String(id)).filter(Boolean);
     favoriteIds = [...new Set([...dbIds, ...localIds])];
    }
   } catch (error) {
   }

   if (favoriteIds.length === 0) {
    setProducts([]);
    setLoading(false);
    return;
   }

   const res = await fetch("/api/products?limit=1000");
   const data = await res.json();

   const allProducts = data.data || data.products || [];

   if (data.success && allProducts.length > 0) {
    const favoriteProducts = allProducts.filter(product => {
     const productId = String(product._id || product.id);
     return favoriteIds.includes(productId);
    });

    setProducts(favoriteProducts);

    if (typeof window !== "undefined") {
     localStorage.setItem("favorites", JSON.stringify(favoriteProducts));
     window.dispatchEvent(new Event("favoritesUpdated"));
    }
   } else {
    setProducts([]);
    if (typeof window !== "undefined") {
     localStorage.removeItem("favorites");
     window.dispatchEvent(new Event("favoritesUpdated"));
    }
   }
  } catch (error) {
   setProducts([]);
  } finally {
   setLoading(false);
  }
 }, [isClient, localStorageFavorites]);

 useEffect(() => {
  if (!isClient) return;
  fetchFavoriteProducts();
 }, [isClient, fetchFavoriteProducts]);

 if (!isClient || loading) {
  return <FavoritesLoading />;
 }

 if (products.length === 0) {
  return <FavoritesEmpty />;
 }

 return (
  <div className="min-h-screen bg-gray-50 py-12">
   <div className="container mx-auto px-4">
    <FavoritesHeader productCount={products.length} />
    <FavoritesGrid products={products} />
   </div>
  </div>
 );
}
