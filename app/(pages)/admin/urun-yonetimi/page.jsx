"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import axiosInstance from "@/lib/axios";
import Toast from "@/app/components/ui/Toast";
import ConfirmDialog from "@/app/components/auth/ConfirmDialog";
import AdminProductsHeader from "@/app/components/admin/AdminProductsHeader";
import AdminProductsStats from "@/app/components/admin/AdminProductsStats";
import ProductListTable from "@/app/components/admin/ProductListTable";
import ProductFormModal from "@/app/components/admin/ProductFormModal";

export default function AdminUrunYonetimiPage() {
 const router = useRouter();
 const [isAuthenticated, setIsAuthenticated] = useState(false);
 const [authLoading, setAuthLoading] = useState(true);

 const [products, setProducts] = useState([]);
 const [showProductModal, setShowProductModal] = useState(false);
 const [editingProduct, setEditingProduct] = useState(null);
 const [toast, setToast] = useState({ show: false, message: "", type: "success" });
 const [confirmDialog, setConfirmDialog] = useState({ show: false, message: "", onConfirm: null });

 useEffect(() => {
  checkAuth();
  // eslint-disable-next-line react-hooks/exhaustive-deps
 }, []);

 useEffect(() => {
  if (isAuthenticated) {
   fetchProducts();
  }
 }, [isAuthenticated]);

 const checkAuth = async () => {
  try {
   const res = await axiosInstance.get("/api/auth/check");
   const data = res.data;
   if (data.authenticated) {
    setIsAuthenticated(true);
   } else {
    router.push("/admin-giris");
   }
  } catch {
   router.push("/admin-giris");
  } finally {
   setAuthLoading(false);
  }
 };

 const handleLogout = async () => {
  try {
   await axiosInstance.post("/api/auth/logout");
   router.push("/admin-giris");
  } catch {
  }
 };

 const fetchProducts = async () => {
  try {
   const res = await axiosInstance.get("/api/products?limit=100");
   const data = res.data;
   if (data.success) {
    setProducts(data.data);
   }
  } catch {
  }
 };

 const editProduct = (product) => {
  setEditingProduct(product);
  setShowProductModal(true);
 };

 const resetForm = () => {
  setEditingProduct(null);
  setShowProductModal(false);
 };

 const handleProductSuccess = () => {
  setToast({ show: true, message: editingProduct ? "Ürün güncellendi" : "Ürün eklendi", type: "success" });
  setShowProductModal(false);
  setEditingProduct(null);
  fetchProducts();
 };

 const handleProductError = (message) => {
  setToast({ show: true, message, type: "error" });
 };

 const handleDeleteProduct = async (productId) => {
  setConfirmDialog({
   show: true,
   message: "Bu ürünü silmek istediğinize emin misiniz?",
   onConfirm: async () => {
    try {
     const res = await axiosInstance.delete(`/api/products/${productId}`);
     if (!res.data?.success) {
      setToast({ show: true, message: res.data?.message || "Ürün silinemedi", type: "error" });
      return;
     }
     setToast({ show: true, message: "Ürün silindi", type: "success" });
     fetchProducts();
    } catch {
     setToast({ show: true, message: "Ürün silinemedi", type: "error" });
    } finally {
     setConfirmDialog({ show: false, message: "", onConfirm: null });
    }
   }
  });
 };


 if (authLoading) {
  return (
   <div className="min-h-screen bg-gray-50 flex items-center justify-center">
    <div className="text-center">
     <div className="w-16 h-16 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
     <p className="text-gray-600 font-semibold">Yetki kontrol ediliyor...</p>
    </div>
   </div>
  );
 }

 if (!isAuthenticated) return null;

 return (
  <div className="min-h-screen bg-gray-50 pb-12">
   <Toast toast={toast} setToast={setToast} />
   <ConfirmDialog
    show={confirmDialog.show}
    message={confirmDialog.message}
    onConfirm={() => {
     if (confirmDialog.onConfirm) confirmDialog.onConfirm();
     setConfirmDialog({ show: false, message: "", onConfirm: null });
    }}
    onCancel={() => setConfirmDialog({ show: false, message: "", onConfirm: null })}
    confirmText="Sil"
    confirmColor="red"
   />
   <AdminProductsHeader onLogout={handleLogout} />
   <AdminProductsStats
    totalProducts={products.length}
    inStockProducts={products.filter(p => p.stock > 0).length}
   />

   <div className="container mx-auto px-4">
    <ProductListTable
     products={products}
     onEdit={editProduct}
     onDelete={handleDeleteProduct}
     onAddNew={() => {
      resetForm();
      setShowProductModal(true);
     }}
    />
   </div>

   <ProductFormModal
    show={showProductModal}
    editingProduct={editingProduct}
    onClose={resetForm}
    onSuccess={handleProductSuccess}
    onError={handleProductError}
   />
  </div>
 );
}

