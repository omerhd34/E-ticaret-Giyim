import mongoose from 'mongoose';

const AdminSchema = new mongoose.Schema({
 username: {
  type: String,
  required: [true, 'Kullanıcı adı gereklidir'],
  unique: true,
  trim: true,
 },
 password: {
  type: String,
  required: [true, 'Şifre gereklidir'],
 },
 role: {
  type: String,
  default: 'admin',
  enum: ['admin', 'super-admin'],
 },
 createdAt: {
  type: Date,
  default: Date.now,
 },
});

export default mongoose.models.Admin || mongoose.model('Admin', AdminSchema);

