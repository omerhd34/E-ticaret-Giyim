const mongoose = require('mongoose');
const fs = require('fs');
const path = require('path');

// .env.local dosyasını oku
const envPath = path.join(__dirname, '..', '.env.local');
if (fs.existsSync(envPath)) {
 const envFile = fs.readFileSync(envPath, 'utf8');
 envFile.split('\n').forEach(line => {
  const match = line.match(/^([^=]+)=(.*)$/);
  if (match) {
   const key = match[1].trim();
   const value = match[2].trim().replace(/^["']|["']$/g, '');
   process.env[key] = value;
  }
 });
}

// Product modelini doğru şekilde import et
const ProductSchema = new mongoose.Schema({
 name: String,
 slug: String,
 serialNumber: String,
 colors: [{
  name: String,
  serialNumber: String,
  price: Number,
  discountPrice: Number,
  images: [String],
  stock: Number,
 }],
 soldCount: { type: Number, default: 0 },
}, { timestamps: true });

let Product;
if (mongoose.models.Product) {
 Product = mongoose.models.Product;
} else {
 Product = mongoose.model('Product', ProductSchema);
}

async function updateSoldCount() {
 try {
  const mongoUri = process.env.MONGODB_URI;
  if (!mongoUri) {
   console.error('MONGODB_URI environment variable is not set');
   process.exit(1);
  }

  await mongoose.connect(mongoUri);
  console.log('MongoDB bağlantısı başarılı');

  // User modelini import et
  const UserSchema = new mongoose.Schema({
   orders: Array,
  }, { strict: false });
  const User = mongoose.models.User || mongoose.model('User', UserSchema);

  // Tüm kullanıcıları ve siparişlerini al
  const users = await User.find({}).select('orders').lean();
  console.log(`Toplam ${users.length} kullanıcı bulundu`);

  // Seri numarasına göre satış sayılarını hesapla
  const salesBySerial = new Map(); // serialNumber -> { count, totalAmount, productId }

  for (const user of users) {
   if (!Array.isArray(user.orders)) continue;

   for (const order of user.orders) {
    // Sadece teslim edilmiş siparişleri say
    if (!order.status || !order.status.includes('Teslim')) continue;

    if (!Array.isArray(order.items)) continue;

    for (const item of order.items) {
     const serialNumber = item.serialNumber || item.productId || '';
     const quantity = Number(item.quantity || 1) || 1;
     const price = Number(item.price || 0) || 0;

     if (!serialNumber) continue;

     if (!salesBySerial.has(serialNumber)) {
      salesBySerial.set(serialNumber, {
       count: 0,
       totalAmount: 0,
       productId: item.productId || null,
      });
     }

     const sales = salesBySerial.get(serialNumber);
     sales.count += quantity;
     sales.totalAmount += price * quantity;
    }
   }
  }

  console.log(`\nToplam ${salesBySerial.size} farklı seri numarası bulundu\n`);

  // Seri numarasına göre satış sayılarını sırala
  const sortedSales = Array.from(salesBySerial.entries())
   .sort((a, b) => b[1].count - a[1].count);

  // İlk 10 en çok satanı göster
  console.log('=== İLK 10 EN ÇOK SATAN ÜRÜN (Sipariş Verilerine Göre) ===');
  for (let i = 0; i < Math.min(10, sortedSales.length); i++) {
   const [serialNumber, sales] = sortedSales[i];
   console.log(`${i + 1}. Seri: ${serialNumber} - Satış: ${sales.count} adet - Toplam: ${sales.totalAmount.toFixed(2)} ₺`);
  }

  // Tüm ürünleri al
  const allProducts = await Product.find({});

  // Her ürün için soldCount'u güncelle
  let updatedCount = 0;
  for (const product of allProducts) {
   let maxSoldCount = 0;

   // Ürünün renk varyantlarını kontrol et
   if (product.colors && Array.isArray(product.colors) && product.colors.length > 0) {
    for (const color of product.colors) {
     if (color.serialNumber && salesBySerial.has(color.serialNumber)) {
      const sales = salesBySerial.get(color.serialNumber);
      maxSoldCount = Math.max(maxSoldCount, sales.count);
     }
    }
   } else if (product.serialNumber && salesBySerial.has(product.serialNumber)) {
    const sales = salesBySerial.get(product.serialNumber);
    maxSoldCount = sales.count;
   }

   // soldCount'u güncelle
   if (product.soldCount !== maxSoldCount) {
    product.soldCount = maxSoldCount;
    await product.save();
    updatedCount++;
   }
  }

  console.log(`\n✓ ${updatedCount} ürünün soldCount değeri güncellendi`);

  // Güncellenmiş soldCount'a göre sırala ve göster
  const updatedProducts = await Product.find({}).sort({ soldCount: -1 }).limit(10).lean();
  console.log('\n=== GÜNCELLENMİŞ İLK 10 EN ÇOK SATAN ÜRÜN ===');
  for (let i = 0; i < updatedProducts.length; i++) {
   const product = updatedProducts[i];
   const serialNumbers = product.colors && product.colors.length > 0
    ? product.colors.map(c => c.serialNumber).filter(Boolean).join(', ')
    : (product.serialNumber || 'N/A');
   console.log(`${i + 1}. ${product.name} - Seri: ${serialNumbers} - soldCount: ${product.soldCount || 0}`);
  }

  console.log('\nİşlem tamamlandı!');

  await mongoose.disconnect();
 } catch (error) {
  console.error('Hata:', error);
  await mongoose.disconnect();
  process.exit(1);
 }
}

updateSoldCount();
