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

 throw new Error('E-posta ayarları eksik. Lütfen .env.local dosyanıza EMAIL_USER ve EMAIL_PASSWORD ekleyin.');
};

export const sendPasswordResetEmail = async (email, resetUrl) => {
 try {
  const transporter = createTransporter();

  // E-posta içeriği
  const mailOptions = {
   from: process.env.EMAIL_FROM || process.env.EMAIL_USER || 'noreply@shopco.com',
   to: email,
   subject: 'Şifre Sıfırlama - SHOP.CO',
   html: `
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="utf-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Şifre Sıfırlama</title>
        </head>
        <body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
          <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 30px; text-align: center; border-radius: 10px 10px 0 0;">
            <h1 style="color: white; margin: 0; font-size: 28px;">SHOP<span style="color: #fbbf24;">.CO</span></h1>
          </div>
          <div style="background: #f9fafb; padding: 30px; border-radius: 0 0 10px 10px; border: 1px solid #e5e7eb;">
            <h2 style="color: #1f2937; margin-top: 0;">Şifre Sıfırlama Talebi</h2>
            <p style="color: #4b5563;">Merhaba,</p>
            <p style="color: #4b5563;">Şifrenizi sıfırlamak için aşağıdaki linke tıklayın:</p>
            <div style="text-align: center; margin: 30px 0;">
              <a href="${resetUrl}" style="display: inline-block; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 15px 30px; text-decoration: none; border-radius: 8px; font-weight: bold; font-size: 16px;">Şifremi Sıfırla</a>
            </div>
            <p style="color: #4b5563; font-size: 14px;">Veya bu linki kopyalayıp tarayıcınıza yapıştırabilirsiniz:</p>
            <p style="color: #667eea; word-break: break-all; font-size: 12px; background: #f3f4f6; padding: 10px; border-radius: 5px;">${resetUrl}</p>
            <p style="color: #9ca3af; font-size: 12px; margin-top: 30px; padding-top: 20px; border-top: 1px solid #e5e7eb;">
              <strong>Önemli:</strong> Bu link 1 saat süreyle geçerlidir. Eğer bu talebi siz yapmadıysanız, bu e-postayı görmezden gelebilirsiniz.
            </p>
          </div>
          <div style="text-align: center; margin-top: 20px; color: #9ca3af; font-size: 12px;">
            <p>© ${new Date().getFullYear()} SHOP.CO - Tüm hakları saklıdır.</p>
          </div>
        </body>
        </html>
      `,
   text: `
        Şifre Sıfırlama Talebi
        
        Merhaba,
        
        Şifrenizi sıfırlamak için aşağıdaki linke tıklayın:
        ${resetUrl}
        
        Bu link 1 saat süreyle geçerlidir.
        
        Eğer bu talebi siz yapmadıysanız, bu e-postayı görmezden gelebilirsiniz.
        
        © ${new Date().getFullYear()} SHOP.CO
      `,
  };

  const info = await transporter.sendMail(mailOptions);

  return { success: true, messageId: info.messageId };
 } catch (error) {
  throw error;
 }
};
