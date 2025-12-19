import mongoose from 'mongoose';

const ProductSchema = new mongoose.Schema({
 name: {
  type: String,
  required: [true, 'Ürün adı gereklidir'],
  trim: true,
 },
 slug: {
  type: String,
  required: true,
  unique: true,
  lowercase: true,
 },
 description: {
  type: String,
  required: [true, 'Ürün açıklaması gereklidir'],
 },
 price: {
  type: Number,
  required: [true, 'Fiyat gereklidir'],
  min: 0,
 },
 discountPrice: {
  type: Number,
  default: null,
  min: 0,
 },
 category: {
  type: String,
  required: [true, 'Kategori gereklidir'],
 },
 subCategory: {
  type: String,
  default: '',
 },
 images: [{
  type: String,
  required: true,
 }],
 sizes: [{
  type: String,
  enum: ['XS', 'S', 'M', 'L', 'XL', 'XXL', '3XL', '36', '37', '38', '39', '40', '41', '42', '43', '44', '45', '46', '47', '48', '49', '50'],
 }],
 colors: [{
  name: String,
  hexCode: String,
 }],
 stock: {
  type: Number,
  required: true,
  min: 0,
  default: 0,
 },
 brand: {
  type: String,
  default: '',
 },
 material: {
  type: String,
  default: '',
 },
 tags: [{
  type: String,
 }],
 isNew: {
  type: Boolean,
  default: false,
 },
 isFeatured: {
  type: Boolean,
  default: false,
 },
 rating: {
  type: Number,
  default: 0,
  min: 0,
  max: 5,
 },
 reviewCount: {
  type: Number,
  default: 0,
 },
 ratings: [{
  userId: {
   type: mongoose.Schema.Types.ObjectId,
   ref: 'User',
   required: true,
  },
  rating: {
   type: Number,
   required: true,
   min: 1,
   max: 5,
  },
  createdAt: {
   type: Date,
   default: Date.now,
  },
  updatedAt: {
   type: Date,
   default: Date.now,
  },
 }],
 soldCount: {
  type: Number,
  default: 0,
 },
 viewCount: {
  type: Number,
  default: 0,
 },
}, {
 timestamps: true
});

ProductSchema.index({ name: 'text', description: 'text', tags: 'text' });

export default mongoose.models.Product || mongoose.model('Product', ProductSchema);

