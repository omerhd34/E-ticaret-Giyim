import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import dbConnect from "@/lib/dbConnect";
import User from "@/models/User";
import normalizeText from "@/lib/normalizeText";
import { sendUserReturnApprovedEmail } from "@/lib/notifications";

async function requireAdmin() {
 const cookieStore = await cookies();
 const session = cookieStore.get("admin-session");
 return session && session.value === "authenticated";
}

export async function PATCH(request, { params }) {
 try {
  if (!(await requireAdmin())) {
   return NextResponse.json({ success: false, message: "Yetkisiz" }, { status: 401 });
  }

  await dbConnect();

  const resolvedParams = await params;
  const { orderId } = resolvedParams;
  const body = await request.json();
  const { status, returnRequestStatus } = body || {};

  if (!orderId) {
   return NextResponse.json({ success: false, message: "Sipariş bulunamadı" }, { status: 400 });
  }
  const hasStatusUpdate = Boolean(status && String(status).trim());
  const hasReturnUpdate = Boolean(returnRequestStatus && String(returnRequestStatus).trim());
  if (!hasStatusUpdate && !hasReturnUpdate) {
   return NextResponse.json(
    { success: false, message: "Güncellenecek alan yok" },
    { status: 400 }
   );
  }

  // Status güncellenecekse validasyon
  let nextStatus = null;
  let statusNorm = "";
  if (hasStatusUpdate) {
   nextStatus = String(status).trim();
   statusNorm = normalizeText(nextStatus);
   // Admin siparişi iptal edemesin (UI’dan bağımsız güvence)
   if (statusNorm.includes("iptal")) {
    return NextResponse.json(
     { success: false, message: "Admin siparişi iptal edemez" },
     { status: 403 }
    );
   }
  }

  // Order embedded olduğu için user içinde ara
  const user = await User.findOne({ "orders.orderId": String(orderId) });
  if (!user) {
   return NextResponse.json({ success: false, message: "Sipariş bulunamadı" }, { status: 404 });
  }

  const idx = (user.orders || []).findIndex((o) => o.orderId === String(orderId));
  if (idx === -1) {
   return NextResponse.json({ success: false, message: "Sipariş bulunamadı" }, { status: 404 });
  }

  // Teslim edildiyse admin bir daha status değiştiremesin (iade talebi güncellemesi hariç)
  const currentStatusNorm = normalizeText(user.orders[idx]?.status);
  if (hasStatusUpdate && currentStatusNorm.includes("teslim")) {
   return NextResponse.json(
    { success: false, message: "Teslim edilen siparişin durumu değiştirilemez" },
    { status: 403 }
   );
  }

  const now = new Date();
  const update = { "orders.$.updatedAt": now };

  if (hasStatusUpdate) {
   update["orders.$.status"] = nextStatus;
   // Teslim edildi olarak işaretlenirse teslim tarihini sabitle
   if (statusNorm.includes("teslim") && !user.orders[idx].deliveredAt) {
    update["orders.$.deliveredAt"] = now;
   }
  }

  if (hasReturnUpdate) {
   const nextReturn = String(returnRequestStatus).trim();
   const norm = normalizeText(nextReturn);
   if (norm === normalizeText("İptal Edildi")) {
    return NextResponse.json(
     { success: false, message: "Admin iade talebini iptal edemez." },
     { status: 403 }
    );
   }
   const allowed = new Set([
    normalizeText("Talep Edildi"),
    normalizeText("Onaylandı"),
    normalizeText("Reddedildi"),
    normalizeText("İptal Edildi"),
    normalizeText("Tamamlandı"),
   ]);
   if (!allowed.has(norm)) {
    return NextResponse.json(
     { success: false, message: "Geçersiz iade durumu" },
     { status: 400 }
    );
   }
   update["orders.$.returnRequest.status"] = nextReturn;
   // İade onaylandıysa 5 gün sayacı için zaman damgası
   if (norm === normalizeText("Onaylandı")) {
    update["orders.$.returnRequest.approvedAt"] = now;
    update["orders.$.returnRequest.completedAt"] = null;
    update["orders.$.returnRequest.cancelledAt"] = null;
    update["orders.$.returnRequest.cancelReason"] = "";
   }
   // Admin "iade tamamlandı" işaretlerse ürünün geri ulaştığını kabul et
   if (norm === normalizeText("Tamamlandı")) {
    update["orders.$.returnRequest.completedAt"] = now;
    // tamamlandıysa otomatik iptal devre dışı kalsın
    update["orders.$.returnRequest.cancelledAt"] = null;
    update["orders.$.returnRequest.cancelReason"] = "";
   }
   // requestedAt yoksa set et (eski kayıtlara destek)
   if (!user.orders[idx].returnRequest?.requestedAt) {
    update["orders.$.returnRequest.requestedAt"] = now;
   }
   if (user.orders[idx].returnRequest == null) {
    // note alanı yoksa boş olarak başlat (şema uyumu)
    update["orders.$.returnRequest.note"] = "";
   }
  }

  const upd = await User.updateOne(
   { _id: user._id, "orders.orderId": String(orderId) },
   { $set: update }
  );
  if ((upd?.matchedCount ?? 0) === 0) {
   return NextResponse.json(
    { success: false, message: "Sipariş bulunamadı (güncelleme yapılamadı)" },
    { status: 404 }
   );
  }

  // Müşteriye e-posta: iade onayı (best-effort)
  if (hasReturnUpdate) {
   const nextReturn = String(returnRequestStatus).trim();
   const norm = normalizeText(nextReturn);
   if (norm === normalizeText("Onaylandı")) {
    try {
     const order = user.orders?.[idx] || {};
     const explanation = order?.returnRequest?.note || process.env.RETURN_APPROVED_EXPLANATION || "";
     await sendUserReturnApprovedEmail({
      userEmail: user.email,
      userName: user.name,
      orderId: String(orderId),
      explanation,
     });
    } catch {
     // mail hatası sipariş güncellemesini bozmasın
    }
   }
  }

  return NextResponse.json({
   success: true,
   message: hasReturnUpdate && !hasStatusUpdate
    ? "İade durumu güncellendi."
    : hasReturnUpdate && hasStatusUpdate
     ? "Sipariş ve iade durumu güncellendi."
     : "Sipariş durumu güncellendi.",
  });
 } catch (error) {
  return NextResponse.json(
   { success: false, message: "Durum güncellenemedi.", error: error.message },
   { status: 500 }
  );
 }
}

