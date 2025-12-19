import nodemailer from 'nodemailer';

const createTransporter = () => {
 if (process.env.EMAIL_HOST && process.env.EMAIL_PORT) {
  return nodemailer.createTransport({
   host: process.env.EMAIL_HOST,
   port: parseInt(process.env.EMAIL_PORT, 10),
   secure: process.env.EMAIL_PORT === '465',
   auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASSWORD,
   },
  });
 }

 if (process.env.EMAIL_USER && process.env.EMAIL_PASSWORD &&
  (process.env.EMAIL_USER.includes('@outlook.com') ||
   process.env.EMAIL_USER.includes('@hotmail.com') ||
   process.env.EMAIL_USER.includes('@office365.com'))) {

  const originalPassword = process.env.EMAIL_PASSWORD.trim();
  const cleanPassword = originalPassword.replace(/-/g, '').trim();

  return nodemailer.createTransport({
   host: 'smtp-mail.outlook.com',
   port: 587,
   secure: false,
   requireTLS: true,
   auth: {
    user: process.env.EMAIL_USER.trim(),
    pass: cleanPassword,
   },
   tls: {
    ciphers: 'SSLv3',
    rejectUnauthorized: false
   },
   debug: process.env.NODE_ENV === 'development',
   logger: process.env.NODE_ENV === 'development'
  });
 }

 if (process.env.EMAIL_USER && process.env.EMAIL_PASSWORD) {
  return nodemailer.createTransport({
   service: 'gmail',
   auth: {
    user: process.env.EMAIL_USER.trim(),
    pass: process.env.EMAIL_PASSWORD.trim(),
   },
  });
 }

 return null;
};

// Kullanıcıya email doğrulama e-postası gönder
export const sendEmailVerificationEmail = async ({
 userEmail,
 userName,
 verificationCode,
 verificationLink,
}) => {
 try {
  const transporter = createTransporter();
  if (!transporter) {
   console.error("E-posta ayarları eksik. Email doğrulama gönderilemedi.");
   return { success: false, error: "E-posta ayarları eksik" };
  }

  if (!userEmail) {
   return { success: false, error: "Kullanıcı e-postası yok" };
  }

  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";
  const safeName = userName || "Kullanıcı";

  const mailOptions = {
   from: process.env.EMAIL_FROM || process.env.EMAIL_USER || "noreply@shopco.com",
   to: userEmail,
   subject: `✅ SHOP.CO - Email Doğrulama Kodu`,
   html: `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Email Doğrulama</title>
      </head>
      <body style="margin:0;padding:0;background:#f3f4f6;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Arial,sans-serif;color:#111827;">
        <table role="presentation" style="width:100%;border-collapse:collapse;background:#f3f4f6;padding:24px 0;">
          <tr>
            <td align="center" style="padding:24px;">
              <table role="presentation" style="width:100%;max-width:640px;border-collapse:collapse;">
                <tr>
                  <td style="background:linear-gradient(135deg,#4f46e5 0%,#7c3aed 100%);padding:28px 24px;border-radius:18px 18px 0 0;">
                    <div style="font-weight:800;font-size:22px;letter-spacing:-0.3px;color:#fff;">
                      SHOP<span style="color:#fbbf24;">.CO</span>
                    </div>
                    <div style="margin-top:6px;font-weight:900;font-size:24px;color:#fff;">
                      Email Doğrulama
                    </div>
                    <div style="margin-top:6px;color:rgba(255,255,255,.9);font-size:13px;">
                      Hesabınızı aktifleştirin
                    </div>
                  </td>
                </tr>

                <tr>
                  <td style="background:#fff;padding:22px 24px;border-left:1px solid #e5e7eb;border-right:1px solid #e5e7eb;">
                    <div style="font-size:14px;color:#111827;font-weight:800;">Merhaba ${safeName},</div>
                    <div style="margin-top:8px;font-size:13px;color:#374151;line-height:1.6;">
                      SHOP.CO'ya hoş geldiniz! Hesabınızı aktifleştirmek için aşağıdaki doğrulama kodunu kullanabilir veya doğrudan linke tıklayabilirsiniz.
                    </div>

                    <div style="margin-top:20px;background:#f9fafb;border:2px solid #4f46e5;border-radius:14px;padding:20px;text-align:center;">
                      <div style="font-size:12px;color:#6b7280;font-weight:700;text-transform:uppercase;letter-spacing:.06em;margin-bottom:8px;">Doğrulama Kodu</div>
                      <div style="font-size:32px;font-weight:900;color:#4f46e5;letter-spacing:4px;font-family:monospace;">
                        ${verificationCode}
                      </div>
                    </div>

                    <div style="margin-top:20px;">
                      <div style="font-size:12px;color:#6b7280;font-weight:700;text-transform:uppercase;letter-spacing:.06em;margin-bottom:8px;">Veya Linke Tıklayın</div>
                      <a href="${verificationLink}"
                         style="background:#4f46e5;color:#fff;text-decoration:none;font-weight:900;font-size:14px;padding:14px 18px;border-radius:12px;display:inline-block;">
                        Email'i Doğrula →
                      </a>
                    </div>

                    <div style="margin-top:18px;background:#fff7ed;border:1px solid #fed7aa;border-radius:14px;padding:12px 14px;color:#9a3412;font-size:13px;line-height:1.6;">
                      <strong>Not:</strong> Bu kod 1 saat geçerlidir. Eğer bu işlemi siz yapmadıysanız, bu e-postayı görmezden gelebilirsiniz.
                    </div>
                  </td>
                </tr>

                <tr>
                  <td style="background:#fff;border:1px solid #e5e7eb;border-top:none;padding:16px 24px;border-radius:0 0 18px 18px;">
                    <div style="color:#6b7280;font-size:12px;line-height:1.6;">
                      Sorunuz olursa bizimle iletişime geçebilirsiniz.
                    </div>
                    <div style="color:#9ca3af;font-size:12px;margin-top:8px;">
                      © ${new Date().getFullYear()} SHOP.CO
                    </div>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
        </table>
      </body>
    </html>
   `,
  };

  const info = await transporter.sendMail(mailOptions);
  return { success: true, messageId: info.messageId };
 } catch (error) {
  console.error("sendEmailVerificationEmail error:", error);
  return { success: false, error: error.message || String(error) };
 }
};

export const sendAdminNewOrderEmail = async ({
 adminEmail,
 orderId,
 userName,
 userEmail,
 userPhone,
 total,
 paymentMethod,
 addressSummary,
}) => {
 try {
  const transporter = createTransporter();

  if (!transporter) {
   console.error('E-posta ayarları eksik. Admin bildirimi gönderilemedi.');
   return { success: false, error: 'E-posta ayarları eksik' };
  }

  const to = adminEmail || process.env.ADMIN_EMAIL || process.env.EMAIL_USER;
  if (!to) {
   return { success: false, error: 'ADMIN_EMAIL tanımlı değil' };
  }

  const mailOptions = {
   from: process.env.EMAIL_FROM || process.env.EMAIL_USER || 'noreply@shopco.com',
   to,
   subject: `🛒 Yeni Sipariş: ${orderId}`,
   html: `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Yeni Sipariş</title>
        <style>
          @media only screen and (max-width: 600px) {
            .container { padding: 16px !important; }
            .card { padding: 18px !important; }
            .title { font-size: 20px !important; }
            .cta { width: 100% !important; display: block !important; }
          }
        </style>
      </head>
      <body style="margin:0;padding:0;background:#f3f4f6;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Arial,sans-serif;color:#111827;">
        <table role="presentation" style="width:100%;border-collapse:collapse;background:#f3f4f6;padding:24px 0;">
          <tr>
            <td align="center" class="container" style="padding:24px;">
              <table role="presentation" style="width:100%;max-width:640px;border-collapse:collapse;">
                <!-- Header -->
                <tr>
                  <td style="background:linear-gradient(135deg,#4f46e5 0%,#7c3aed 100%);padding:28px 24px;border-radius:18px 18px 0 0;">
                    <div style="font-weight:800;font-size:22px;letter-spacing:-0.3px;color:#fff;">
                      SHOP<span style="color:#fbbf24;">.CO</span>
                    </div>
                    <div class="title" style="margin-top:6px;font-weight:900;font-size:24px;color:#fff;">
                      Yeni sipariş alındı
                    </div>
                    <div style="margin-top:6px;color:rgba(255,255,255,.85);font-size:13px;">
                      Sipariş No: <span style="font-weight:800;">${orderId}</span>
                    </div>
                  </td>
                </tr>

                <!-- Body -->
                <tr>
                  <td class="card" style="background:#fff;padding:22px 24px;border-left:1px solid #e5e7eb;border-right:1px solid #e5e7eb;">
                    <table role="presentation" style="width:100%;border-collapse:collapse;">
                      <tr>
                        <td style="padding:0 0 12px 0;">
                          <div style="font-size:12px;color:#6b7280;font-weight:700;text-transform:uppercase;letter-spacing:.06em;">Sipariş Özeti</div>
                        </td>
                      </tr>
                      <tr>
                        <td style="padding:0;">
                          <table role="presentation" style="width:100%;border-collapse:separate;border-spacing:0;overflow:hidden;border-radius:14px;border:1px solid #e5e7eb;">
                            <tr>
                              <td style="padding:14px 16px;background:#f9fafb;border-bottom:1px solid #e5e7eb;">
                                <div style="display:flex;justify-content:space-between;gap:12px;align-items:center;">
                                  <div style="color:#374151;font-size:13px;font-weight:700;">Ödeme</div>
                                  <div style="color:#111827;font-size:13px;font-weight:900;">${paymentMethod || '-'}</div>
                                </div>
                              </td>
                            </tr>
                            <tr>
                              <td style="padding:14px 16px;">
                                <div style="display:flex;justify-content:space-between;gap:12px;align-items:center;">
                                  <div style="color:#374151;font-size:13px;font-weight:700;">Tutar</div>
                                  <div style="color:#4f46e5;font-size:18px;font-weight:900;">${Number(total || 0).toFixed(2)} ₺</div>
                                </div>
                              </td>
                            </tr>
                          </table>
                        </td>
                      </tr>

                      <tr>
                        <td style="padding:18px 0 10px 0;">
                          <div style="font-size:12px;color:#6b7280;font-weight:700;text-transform:uppercase;letter-spacing:.06em;">Müşteri Bilgileri</div>
                        </td>
                      </tr>
                      <tr>
                        <td style="padding:0;">
                          <table role="presentation" style="width:100%;border-collapse:separate;border-spacing:0;border-radius:14px;border:1px solid #e5e7eb;">
                            <tr>
                              <td style="padding:12px 16px;border-bottom:1px solid #e5e7eb;">
                                <div style="font-size:12px;color:#6b7280;font-weight:700;">Müşteri</div>
                                <div style="font-size:14px;color:#111827;font-weight:900;margin-top:2px;">${userName || '-'}</div>
                              </td>
                            </tr>
                            <tr>
                              <td style="padding:12px 16px;border-bottom:1px solid #e5e7eb;">
                                <div style="font-size:12px;color:#6b7280;font-weight:700;">E-posta</div>
                                <div style="font-size:14px;color:#111827;font-weight:800;margin-top:2px;">${userEmail || '-'}</div>
                              </td>
                            </tr>
                            <tr>
                              <td style="padding:12px 16px;">
                                <div style="font-size:12px;color:#6b7280;font-weight:700;">Telefon</div>
                                <div style="font-size:14px;color:#111827;font-weight:800;margin-top:2px;">${userPhone || '-'}</div>
                              </td>
                            </tr>
                          </table>
                        </td>
                      </tr>

                      <tr>
                        <td style="padding:18px 0 10px 0;">
                          <div style="font-size:12px;color:#6b7280;font-weight:700;text-transform:uppercase;letter-spacing:.06em;">Adres</div>
                        </td>
                      </tr>
                      <tr>
                        <td style="padding:0;">
                          <div style="background:#fff;border:1px solid #e5e7eb;border-radius:14px;padding:14px 16px;color:#111827;font-size:13px;line-height:1.6;">
                            ${addressSummary || '-'}
                          </div>
                        </td>
                      </tr>

                      <tr>
                        <td style="padding:18px 0 0 0;">
                          <a class="cta"
                             href="${process.env.NEXT_PUBLIC_BASE_URL ? `${process.env.NEXT_PUBLIC_BASE_URL}/admin/son-siparisler` : 'http://localhost:3000/admin/son-siparisler'}"
                             style="background:#4f46e5;color:#ffffff;text-decoration:none;font-weight:900;font-size:14px;padding:14px 18px;border-radius:12px;display:inline-block;">
                            Admin Paneline Git →
                          </a>
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>

                <!-- Footer -->
                <tr>
                  <td style="background:#fff;border:1px solid #e5e7eb;border-top:none;padding:16px 24px;border-radius:0 0 18px 18px;">
                    <div style="color:#6b7280;font-size:12px;line-height:1.6;">
                      Bu e-posta otomatik oluşturuldu. Sipariş detaylarını admin panelinden görüntüleyebilirsiniz.
                    </div>
                    <div style="color:#9ca3af;font-size:12px;margin-top:8px;">
                      © ${new Date().getFullYear()} SHOP.CO
                    </div>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
        </table>
      </body>
    </html>
   `,
  };

  const info = await transporter.sendMail(mailOptions);
  return { success: true, messageId: info.messageId };
 } catch (error) {
  console.error('Admin sipariş bildirimi e-posta hatası:', error);
  return { success: false, error: error.message };
 }
};

// Admin'e iade talebi bildirimi e-postası gönder
export const sendAdminReturnRequestEmail = async ({
 adminEmail,
 orderId,
 userName,
 userEmail,
 userPhone,
 total,
 deliveredAt,
 note,
}) => {
 try {
  const transporter = createTransporter();
  if (!transporter) {
   console.error('E-posta ayarları eksik. İade talebi bildirimi gönderilemedi.');
   return { success: false, error: 'E-posta ayarları eksik' };
  }

  const to = adminEmail || process.env.ADMIN_EMAIL || process.env.EMAIL_USER;
  if (!to) {
   return { success: false, error: 'ADMIN_EMAIL tanımlı değil' };
  }

  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000';
  const deliveredText = deliveredAt ? new Date(deliveredAt).toLocaleString("tr-TR") : "-";

  const mailOptions = {
   from: process.env.EMAIL_FROM || process.env.EMAIL_USER || 'noreply@shopco.com',
   to,
   subject: `↩️ İade Talebi: ${orderId}`,
   html: `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>İade Talebi</title>
      </head>
      <body style="margin:0;padding:0;background:#f3f4f6;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Arial,sans-serif;color:#111827;">
        <table role="presentation" style="width:100%;border-collapse:collapse;background:#f3f4f6;padding:24px 0;">
          <tr>
            <td align="center" style="padding:24px;">
              <table role="presentation" style="width:100%;max-width:640px;border-collapse:collapse;">
                <tr>
                  <td style="background:linear-gradient(135deg,#111827 0%,#4f46e5 100%);padding:28px 24px;border-radius:18px 18px 0 0;">
                    <div style="font-weight:800;font-size:22px;letter-spacing:-0.3px;color:#fff;">
                      SHOP<span style="color:#fbbf24;">.CO</span>
                    </div>
                    <div style="margin-top:6px;font-weight:900;font-size:24px;color:#fff;">
                      İade talebi oluşturuldu
                    </div>
                    <div style="margin-top:6px;color:rgba(255,255,255,.85);font-size:13px;">
                      Sipariş No: <span style="font-weight:800;">${orderId}</span>
                    </div>
                  </td>
                </tr>

                <tr>
                  <td style="background:#fff;padding:22px 24px;border-left:1px solid #e5e7eb;border-right:1px solid #e5e7eb;">
                    <div style="font-size:12px;color:#6b7280;font-weight:700;text-transform:uppercase;letter-spacing:.06em;">Müşteri</div>
                    <div style="margin-top:6px;font-size:14px;font-weight:900;color:#111827;">${userName || "-"}</div>
                    <div style="margin-top:4px;font-size:13px;color:#374151;">${userEmail || "-"}</div>
                    <div style="margin-top:2px;font-size:13px;color:#374151;">${userPhone || "-"}</div>

                    <div style="margin-top:18px;border:1px solid #e5e7eb;border-radius:14px;overflow:hidden;">
                      <div style="background:#f9fafb;padding:12px 14px;border-bottom:1px solid #e5e7eb;display:flex;justify-content:space-between;">
                        <div style="font-size:13px;font-weight:700;color:#374151;">Teslim Tarihi</div>
                        <div style="font-size:13px;font-weight:900;color:#111827;">${deliveredText}</div>
                      </div>
                      <div style="padding:12px 14px;display:flex;justify-content:space-between;">
                        <div style="font-size:13px;font-weight:700;color:#374151;">Sipariş Tutarı</div>
                        <div style="font-size:16px;font-weight:900;color:#4f46e5;">${Number(total || 0).toFixed(2)} ₺</div>
                      </div>
                    </div>

                    ${note ? `
                      <div style="margin-top:16px;">
                        <div style="font-size:12px;color:#6b7280;font-weight:700;text-transform:uppercase;letter-spacing:.06em;">Not</div>
                        <div style="margin-top:6px;background:#fff7ed;border:1px solid #fed7aa;border-radius:14px;padding:12px 14px;color:#9a3412;font-size:13px;line-height:1.6;">
                          ${String(note).replace(/</g, "&lt;").replace(/>/g, "&gt;")}
                        </div>
                      </div>
                    ` : ""}

                    <div style="margin-top:18px;">
                      <a href="${baseUrl}/admin/son-siparisler"
                         style="background:#4f46e5;color:#fff;text-decoration:none;font-weight:900;font-size:14px;padding:14px 18px;border-radius:12px;display:inline-block;">
                        Admin Panelinde Gör →
                      </a>
                    </div>
                  </td>
                </tr>

                <tr>
                  <td style="background:#fff;border:1px solid #e5e7eb;border-top:none;padding:16px 24px;border-radius:0 0 18px 18px;">
                    <div style="color:#6b7280;font-size:12px;line-height:1.6;">
                      Bu e-posta otomatik oluşturuldu. İade talebini admin panelinden yönetebilirsiniz.
                    </div>
                    <div style="color:#9ca3af;font-size:12px;margin-top:8px;">
                      © ${new Date().getFullYear()} SHOP.CO
                    </div>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
        </table>
      </body>
    </html>
   `,
  };

  const info = await transporter.sendMail(mailOptions);
  return { success: true, messageId: info.messageId };
 } catch (error) {
  console.error("sendAdminReturnRequestEmail error:", error);
  return { success: false, error: error.message || String(error) };
 }
};

// Müşteriye iade talebi onayı e-postası gönder
export const sendUserReturnApprovedEmail = async ({
 userEmail,
 userName,
 orderId,
 explanation,
}) => {
 try {
  const transporter = createTransporter();
  if (!transporter) {
   console.error("E-posta ayarları eksik. Müşteri iade onayı gönderilemedi.");
   return { success: false, error: "E-posta ayarları eksik" };
  }

  if (!userEmail) {
   return { success: false, error: "Kullanıcı e-postası yok" };
  }

  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";
  const safeName = userName || "Müşterimiz";
  const safeExplanation = explanation
   ? String(explanation).slice(0, 2000)
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
   : null;

  // Opsiyonel env: iade gönderim adresi / talimatları
  const returnAddress = process.env.RETURN_ADDRESS
   ? String(process.env.RETURN_ADDRESS).slice(0, 2000).replace(/</g, "&lt;").replace(/>/g, "&gt;")
   : "SHOP.CO İade Yeri\nAtatürk Mah. Örnek Sk. No: 12\nKat: 2 Daire: 5\nKadıköy / İstanbul\nTel: 0 (212) 555 55 55";
  // Elden teslim için (örnek) teslim adresi
  const handDeliveryAddress = process.env.HAND_DELIVERY_ADDRESS
   ? String(process.env.HAND_DELIVERY_ADDRESS).slice(0, 2000).replace(/</g, "&lt;").replace(/>/g, "&gt;")
   : "SHOP.CO Teslim Noktası\nAtatürk Mah. Örnek Sk. No: 12\nKat: 2 Daire: 5\nKadıköy / İstanbul\nTel: 0 (212) 555 55 55\nHafta içi: 10:00 - 18:00";
  const returnWindowText = "Ürünü 1-2 gün içinde kargoya vermelisiniz.";
  const shippingFeeText = "Kargo ücreti müşteriye aittir.";
  const handDeliveryText = "Dilerseniz ürünü elden de teslim edebilirsiniz.";
  const returnAddressHtml = String(returnAddress || "").replace(/\n/g, "<br/>");
  const handDeliveryAddressHtml = String(handDeliveryAddress || "").replace(/\n/g, "<br/>");

  const mailOptions = {
   from: process.env.EMAIL_FROM || process.env.EMAIL_USER || "noreply@shopco.com",
   to: userEmail,
   subject: `✅ İade Talebiniz Onaylandı - ${orderId}`,
   html: `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>İade Talebi Onayı</title>
      </head>
      <body style="margin:0;padding:0;background:#f3f4f6;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Arial,sans-serif;color:#111827;">
        <table role="presentation" style="width:100%;border-collapse:collapse;background:#f3f4f6;padding:24px 0;">
          <tr>
            <td align="center" style="padding:24px;">
              <table role="presentation" style="width:100%;max-width:640px;border-collapse:collapse;">
                <tr>
                  <td style="background:linear-gradient(135deg,#10b981 0%,#059669 100%);padding:28px 24px;border-radius:18px 18px 0 0;">
                    <div style="font-weight:800;font-size:22px;letter-spacing:-0.3px;color:#fff;">
                      SHOP<span style="color:#fbbf24;">.CO</span>
                    </div>
                    <div style="margin-top:6px;font-weight:900;font-size:24px;color:#fff;">
                      İade talebiniz onaylandı
                    </div>
                    <div style="margin-top:6px;color:rgba(255,255,255,.9);font-size:13px;">
                      Sipariş No: <span style="font-weight:800;">${orderId}</span>
                    </div>
                  </td>
                </tr>

                <tr>
                  <td style="background:#fff;padding:22px 24px;border-left:1px solid #e5e7eb;border-right:1px solid #e5e7eb;">
                    <div style="font-size:14px;color:#111827;font-weight:800;">Merhaba ${safeName},</div>
                    <div style="margin-top:8px;font-size:13px;color:#374151;line-height:1.6;">
                      İade talebiniz onaylanmıştır. Aşağıdaki talimatları takip ederek iade sürecini başlatabilirsiniz.
                    </div>

                    ${safeExplanation ? `
                      <div style="margin-top:16px;">
                        <div style="font-size:12px;color:#6b7280;font-weight:700;text-transform:uppercase;letter-spacing:.06em;">İade Açıklaması</div>
                        <div style="margin-top:6px;background:#ecfdf5;border:1px solid #bbf7d0;border-radius:14px;padding:12px 14px;color:#065f46;font-size:13px;line-height:1.6;">
                          ${safeExplanation}
                        </div>
                      </div>
                    ` : ""}

                    ${returnAddress ? `
                      <div style="margin-top:16px;">
                        <div style="font-size:12px;color:#6b7280;font-weight:700;text-transform:uppercase;letter-spacing:.06em;">İade Gönderim Adresi</div>
                        <div style="margin-top:6px;background:#f9fafb;border:1px solid #e5e7eb;border-radius:14px;padding:12px 14px;color:#111827;font-size:13px;line-height:1.6;">
                          ${returnAddressHtml}
                        </div>
                      </div>
                    ` : ""}

                    <div style="margin-top:16px;">
                      <div style="font-size:12px;color:#6b7280;font-weight:700;text-transform:uppercase;letter-spacing:.06em;">Elden Teslim (Opsiyonel)</div>
                      <div style="margin-top:6px;background:#eef2ff;border:1px solid #c7d2fe;border-radius:14px;padding:12px 14px;color:#1e3a8a;font-size:13px;line-height:1.7;">
                        <div style="font-weight:900;margin-bottom:6px;">${handDeliveryText}</div>
                        <div>${handDeliveryAddressHtml}</div>
                      </div>
                    </div>

                    <div style="margin-top:16px;">
                      <div style="font-size:12px;color:#6b7280;font-weight:700;text-transform:uppercase;letter-spacing:.06em;">Önemli Bilgiler</div>
                      <div style="margin-top:6px;background:#fff7ed;border:1px solid #fed7aa;border-radius:14px;padding:12px 14px;color:#9a3412;font-size:13px;line-height:1.7;">
                        <div style="font-weight:800;margin-bottom:6px;">Lütfen dikkat:</div>
                        <ul style="margin:0;padding-left:18px;">
                          <li style="margin:4px 0;">${returnWindowText}</li>
                          <li style="margin:4px 0;">${shippingFeeText}</li>
                        </ul>
                      </div>
                    </div>

                    <div style="margin-top:18px;">
                      <a href="${baseUrl}/hesabim?tab=siparisler"
                         style="background:#4f46e5;color:#fff;text-decoration:none;font-weight:900;font-size:14px;padding:14px 18px;border-radius:12px;display:inline-block;">
                        Siparişlerime Git →
                      </a>
                    </div>
                  </td>
                </tr>

                <tr>
                  <td style="background:#fff;border:1px solid #e5e7eb;border-top:none;padding:16px 24px;border-radius:0 0 18px 18px;">
                    <div style="color:#6b7280;font-size:12px;line-height:1.6;">
                      Sorunuz olursa bizimle iletişime geçebilirsiniz.
                    </div>
                    <div style="color:#9ca3af;font-size:12px;margin-top:8px;">
                      © ${new Date().getFullYear()} SHOP.CO
                    </div>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
        </table>
      </body>
    </html>
   `,
  };

  const info = await transporter.sendMail(mailOptions);
  return { success: true, messageId: info.messageId };
 } catch (error) {
  console.error("sendUserReturnApprovedEmail error:", error);
  return { success: false, error: error.message || String(error) };
 }
};

// Favori ürün fiyat değişikliği e-postası gönder
export const sendPriceChangeEmail = async (userEmail, userName, productName, oldPrice, newPrice, productUrl) => {
 try {
  const transporter = createTransporter();

  if (!transporter) {
   console.error('E-posta ayarları eksik. Bildirim gönderilemedi.');
   return { success: false, error: 'E-posta ayarları eksik' };
  }

  const priceChange = newPrice < oldPrice ? 'düştü' : 'arttı';
  const priceChangePercent = Math.abs(((newPrice - oldPrice) / oldPrice) * 100).toFixed(1);

  const isPriceDrop = newPrice < oldPrice;
  const priceColor = isPriceDrop ? '#10b981' : '#ef4444';
  const iconEmoji = isPriceDrop ? '📉' : '📈';
  const gradientColor = isPriceDrop
   ? 'linear-gradient(135deg, #10b981 0%, #059669 100%)'
   : 'linear-gradient(135deg, #ef4444 0%, #dc2626 100%)';

  const mailOptions = {
   from: process.env.EMAIL_FROM || process.env.EMAIL_USER || 'noreply@shopco.com',
   to: userEmail,
   subject: `${isPriceDrop ? '🎉' : '📢'} Favori Ürününüzde Fiyat Değişikliği - ${productName}`,
   html: `
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="utf-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Fiyat Değişikliği</title>
          <style>
            .header-bg {
              background-color: #667eea !important;
              background: #667eea !important;
            }
            .shop-text {
              color: #ffffff !important;
            }
            .email-container {
              background-color: #ffffff !important;
            }
            .content-bg {
              background-color: #ffffff !important;
            }
            .price-card-bg {
              background-color: #f9fafb !important;
            }
            @media only screen and (max-width: 600px) {
              .content-padding { padding: 20px 15px !important; }
              .header-padding { padding: 30px 20px !important; }
              .title-text { font-size: 20px !important; }
              .greeting-text { font-size: 15px !important; }
              .message-text { font-size: 15px !important; }
              .price-card { padding: 20px 15px !important; }
              .old-price-text { font-size: 18px !important; }
              .new-price-text { font-size: 32px !important; }
              .change-text { font-size: 18px !important; }
              .button-padding { padding: 14px 30px !important; font-size: 15px !important; }
            }
          </style>
        </head>
        <body style="margin: 0; padding: 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; background-color: #f3f4f6 !important;">
          <table role="presentation" style="width: 100%; border-collapse: collapse; background-color: #f3f4f6 !important; padding: 20px;">
            <tr>
              <td align="center" style="padding: 20px 0;">
                <table role="presentation" class="email-container" style="width: 100%; max-width: 600px; background-color: #ffffff !important; border-radius: 16px; overflow: hidden; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);">
                  <!-- Header -->
                  <tr>
                    <td class="header-padding header-bg" style="padding: 40px 30px; text-align: center;">
                      <h1 style="margin: 0; font-size: 32px; font-weight: 800; letter-spacing: -0.5px;">
                        <span class="shop-text" style="color: #ffffff !important;">SHOP</span><span style="color: #fbbf24 !important;">.CO</span>
                      </h1>
                    </td>
                  </tr>
                  
                  <!-- Content -->
                  <tr>
                    <td class="content-padding content-bg" style="padding: 40px 30px; background-color: #ffffff !important;">
                      <!-- Icon -->
                      <table role="presentation" style="width: 100%; border-collapse: collapse; margin-bottom: 20px;">
                        <tr>
                          <td align="center" style="padding: 0;">
                            <table role="presentation" style="border-collapse: collapse; margin: 0 auto;">
                              <tr>
                                <td style="background-color: ${priceColor} !important; width: 80px; height: 80px; border-radius: 50%; text-align: center; vertical-align: middle;">
                                  <span style="font-size: 40px; line-height: 80px; display: block;">
                                    ${iconEmoji}
                                  </span>
                                </td>
                              </tr>
                            </table>
                          </td>
                        </tr>
                      </table>
                      
                      <!-- Title -->
                      <h2 class="title-text" style="color: #1f2937 !important; margin: 0 0 10px 0; font-size: 24px; font-weight: 700; text-align: center;">
                        Favori Ürününüzde Fiyat Değişikliği
                      </h2>
                      
                      <!-- Greeting -->
                      <p class="greeting-text" style="color: #374151 !important; margin: 0 0 20px 0; font-size: 16px; text-align: center;">
                        Merhaba <strong style="color: #1f2937 !important;">${userName}</strong>,
                      </p>
                      
                      <!-- Message -->
                      <p class="message-text" style="color: #4b5563 !important; margin: 0 0 30px 0; font-size: 16px; line-height: 1.6; text-align: center;">
                        Favorilerinizdeki <strong style="color: #1f2937 !important;">"${productName}"</strong> ürününün fiyatı <strong style="color: ${priceColor} !important;">${priceChange}</strong>!
                      </p>
                      
                      <!-- Price Card -->
                      <table role="presentation" class="price-card price-card-bg" style="width: 100%; border-collapse: collapse; background-color: #f9fafb !important; border-radius: 12px; margin: 30px 0; border: 2px solid ${priceColor} !important;">
                        <tr>
                          <td style="padding: 30px 20px; text-align: center;">
                              <!-- Old Price -->
                            <table role="presentation" style="width: 100%; border-collapse: collapse;">
                              <tr>
                                <td align="center" style="padding-bottom: 15px;">
                                  <p style="margin: 0 0 8px 0; color: #6b7280 !important; font-size: 12px; font-weight: 600; text-transform: uppercase; letter-spacing: 1px;">
                                    ESKİ FİYAT
                                  </p>
                                  <p class="old-price-text" style="margin: 0; color: #9ca3af !important; text-decoration: line-through; font-size: 22px; font-weight: 600;">
                                    ${oldPrice.toFixed(2)} ₺
                                  </p>
                                </td>
                              </tr>
                              
                              <!-- Arrow -->
                              <tr>
                                <td align="center" style="padding: 15px 0;">
                                  <table role="presentation" style="border-collapse: collapse; margin: 0 auto;">
                                    <tr>
                                      <td style="background-color: ${priceColor} !important; border-radius: 50%; width: 50px; height: 50px; text-align: center; vertical-align: middle;">
                                        <span style="color: #ffffff !important; font-size: 24px; font-weight: bold; line-height: 50px; display: block;">
                                          ${isPriceDrop ? '↓' : '↑'}
                                        </span>
                                      </td>
                                    </tr>
                                  </table>
                                </td>
                              </tr>
                              
                              <!-- New Price -->
                              <tr>
                                <td align="center" style="padding-bottom: 15px;">
                                  <p style="margin: 0 0 8px 0; color: #374151 !important; font-size: 12px; font-weight: 600; text-transform: uppercase; letter-spacing: 1px;">
                                    YENİ FİYAT
                                  </p>
                                  <p class="new-price-text" style="margin: 0; color: ${priceColor} !important; font-size: 42px; font-weight: 800; line-height: 1.2;">
                                    ${newPrice.toFixed(2)} ₺
                                  </p>
                                </td>
                              </tr>
                              
                              <!-- Change -->
                              <tr>
                                <td align="center" style="padding-top: 20px; border-top: 1px solid #e5e7eb;">
                                  <p style="margin: 0 0 5px 0; color: #374151 !important; font-size: 11px; font-weight: 600; text-transform: uppercase; letter-spacing: 1px;">
                                    DEĞİŞİM
                                  </p>
                                  <p class="change-text" style="margin: 0; color: ${priceColor} !important; font-size: 22px; font-weight: 700;">
                                    %${priceChangePercent} ${priceChange}
                                  </p>
                                </td>
                              </tr>
                            </table>
                          </td>
                        </tr>
                      </table>
                      
                      <!-- CTA Button -->
                      <table role="presentation" style="width: 100%; border-collapse: collapse; margin: 35px 0;">
                        <tr>
                          <td align="center" style="padding: 0;">
                            <table role="presentation" style="border-collapse: collapse; border-radius: 12px; overflow: hidden;">
                              <tr>
                                <td class="button-padding" style="background-color: #667eea !important; padding: 16px 40px; border-radius: 12px;">
                                  <a href="${productUrl}" style="display: inline-block; color: #ffffff !important; text-decoration: none !important; font-weight: 700; font-size: 16px; line-height: 1.5;">
                                    Ürünü Görüntüle →
                                  </a>
                                </td>
                              </tr>
                            </table>
                          </td>
                        </tr>
                      </table>
                      
                      <!-- Footer Note -->
                      <p style="color: #6b7280 !important; font-size: 12px; margin: 30px 0 0 0; padding-top: 25px; border-top: 1px solid #e5e7eb; text-align: center; line-height: 1.6;">
                        Bu bildirimi almak istemiyorsanız, <a href="${process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'}/hesabim" style="color: #667eea !important; text-decoration: underline;">hesap ayarlarınızdan</a> e-posta bildirimlerini kapatabilirsiniz.
                      </p>
                    </td>
                  </tr>
                  
                  <!-- Footer -->
                  <tr>
                    <td style="background-color: #f9fafb !important; padding: 25px 30px; text-align: center; border-top: 1px solid #e5e7eb;">
                      <p style="margin: 0; color: #6b7280 !important; font-size: 12px;">
                        © ${new Date().getFullYear()} SHOP.CO - Tüm hakları saklıdır.
                      </p>
                    </td>
                  </tr>
                </table>
              </td>
            </tr>
          </table>
        </body>
        </html>
      `,
   text: `
        Favori Ürününüzde Fiyat Değişikliği
        
        Merhaba ${userName},
        
        Favorilerinizdeki "${productName}" ürününün fiyatı ${priceChange}!
        
        Eski Fiyat: ${oldPrice.toFixed(2)} ₺
        Yeni Fiyat: ${newPrice.toFixed(2)} ₺
        Değişim: %${priceChangePercent} ${priceChange}
        
        Ürünü görüntülemek için: ${productUrl}
        
        © ${new Date().getFullYear()} SHOP.CO
      `,
  };

  const info = await transporter.sendMail(mailOptions);
  return { success: true, messageId: info.messageId };
 } catch (error) {
  console.error('E-posta gönderme hatası:', error);
  return { success: false, error: error.message };
 }
};

// Favori ürün stok eklendi e-postası gönder
export const sendStockAvailableEmail = async (userEmail, userName, productName, productUrl) => {
 try {
  const transporter = createTransporter();

  if (!transporter) {
   console.error('E-posta ayarları eksik. Bildirim gönderilemedi.');
   return { success: false, error: 'E-posta ayarları eksik' };
  }

  const mailOptions = {
   from: process.env.EMAIL_FROM || process.env.EMAIL_USER || 'noreply@shopco.com',
   to: userEmail,
   subject: `🎉 Favori Ürününüz Stokta - ${productName}`,
   html: `
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="utf-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Stok Bildirimi</title>
          <style>
            .email-container {
              background-color: #ffffff !important;
            }
            .content-bg {
              background-color: #ffffff !important;
            }
            @media only screen and (max-width: 600px) {
              .content-padding { padding: 20px 15px !important; }
              .header-padding { padding: 30px 20px !important; }
              .title-text { font-size: 20px !important; }
              .greeting-text { font-size: 15px !important; }
              .message-text { font-size: 15px !important; }
              .button-padding { padding: 14px 30px !important; font-size: 15px !important; }
            }
          </style>
        </head>
        <body style="margin: 0; padding: 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; background-color: #f3f4f6 !important;">
          <table role="presentation" style="width: 100%; border-collapse: collapse; background-color: #f3f4f6 !important; padding: 20px;">
            <tr>
              <td align="center" style="padding: 20px 0;">
                <table role="presentation" class="email-container" style="width: 100%; max-width: 600px; background-color: #ffffff !important; border-radius: 16px; overflow: hidden; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);">
                  <!-- Header -->
                  <tr>
                    <td class="header-padding" style="background-color: #667eea !important; background: #667eea !important; padding: 40px 30px; text-align: center;">
                      <h1 style="margin: 0; font-size: 32px; font-weight: 800; letter-spacing: -0.5px;">
                        <span class="shop-text" style="color: #ffffff !important;">SHOP</span><span style="color: #fbbf24 !important;">.CO</span>
                      </h1>
                    </td>
                  </tr>
                  
                  <!-- Content -->
                  <tr>
                    <td class="content-padding content-bg" style="padding: 40px 30px; background-color: #ffffff !important;">
                      <!-- Icon -->
                      <table role="presentation" style="width: 100%; border-collapse: collapse; margin-bottom: 20px;">
                        <tr>
                          <td align="center" style="padding: 0;">
                            <table role="presentation" style="border-collapse: collapse; margin: 0 auto;">
                              <tr>
                                <td style="background-color: #10b981 !important; width: 80px; height: 80px; border-radius: 50%; text-align: center; vertical-align: middle;">
                                  <span style="font-size: 40px; line-height: 80px; display: block;">
                                    ✅
                                  </span>
                                </td>
                              </tr>
                            </table>
                          </td>
                        </tr>
                      </table>
                      
                      <!-- Title -->
                      <h2 class="title-text" style="color: #1f2937 !important; margin: 0 0 10px 0; font-size: 24px; font-weight: 700; text-align: center;">
                        Favori Ürününüz Stokta!
                      </h2>
                      
                      <!-- Greeting -->
                      <p class="greeting-text" style="color: #374151 !important; margin: 0 0 20px 0; font-size: 16px; text-align: center;">
                        Merhaba <strong style="color: #1f2937 !important;">${userName}</strong>,
                      </p>
                      
                      <!-- Message -->
                      <p class="message-text" style="color: #4b5563 !important; margin: 0 0 30px 0; font-size: 16px; line-height: 1.6; text-align: center;">
                        Favorilerinizdeki <strong style="color: #1f2937 !important;">"${productName}"</strong> ürünü artık stokta!
                      </p>
                      
                      <!-- CTA Button -->
                      <table role="presentation" style="width: 100%; border-collapse: collapse; margin: 35px 0;">
                        <tr>
                          <td align="center" style="padding: 0;">
                            <table role="presentation" style="border-collapse: collapse; border-radius: 12px; overflow: hidden;">
                              <tr>
                                <td class="button-padding" style="background-color: #667eea !important; padding: 16px 40px; border-radius: 12px;">
                                  <a href="${productUrl}" style="display: inline-block; color: #ffffff !important; text-decoration: none !important; font-weight: 700; font-size: 16px; line-height: 1.5;">
                                    Ürünü Görüntüle →
                                  </a>
                                </td>
                              </tr>
                            </table>
                          </td>
                        </tr>
                      </table>
                      
                      <!-- Footer Note -->
                      <p style="color: #6b7280 !important; font-size: 12px; margin: 30px 0 0 0; padding-top: 25px; border-top: 1px solid #e5e7eb; text-align: center; line-height: 1.6;">
                        Bu bildirimi almak istemiyorsanız, <a href="${process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'}/hesabim" style="color: #667eea !important; text-decoration: underline;">hesap ayarlarınızdan</a> e-posta bildirimlerini kapatabilirsiniz.
                      </p>
                    </td>
                  </tr>
                  
                  <!-- Footer -->
                  <tr>
                    <td style="background-color: #f9fafb !important; padding: 25px 30px; text-align: center; border-top: 1px solid #e5e7eb;">
                      <p style="margin: 0; color: #6b7280 !important; font-size: 12px;">
                        © ${new Date().getFullYear()} SHOP.CO - Tüm hakları saklıdır.
                      </p>
                    </td>
                  </tr>
                </table>
              </td>
            </tr>
          </table>
        </body>
        </html>
      `,
   text: `
        Favori Ürününüz Stokta
        
        Merhaba ${userName},
        
        Favorilerinizdeki "${productName}" ürünü artık stokta!
        
        Ürünü görüntülemek için: ${productUrl}
        
        © ${new Date().getFullYear()} SHOP.CO
      `,
  };

  const info = await transporter.sendMail(mailOptions);
  return { success: true, messageId: info.messageId };
 } catch (error) {
  console.error('E-posta gönderme hatası:', error);
  return { success: false, error: error.message };
 }
};


