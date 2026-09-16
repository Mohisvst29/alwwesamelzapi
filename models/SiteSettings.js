const mongoose = require('mongoose');

const SiteSettingsSchema = new mongoose.Schema({
  adminEmail: { type: String, default: 'admin@alwesam.sa' },
  adminPassword: { type: String, default: 'admin123' },
  siteLogo: { type: String, default: '/assets/images/official_logo.png' },
  logoSize: { type: Number, default: 42 },
  heroBgImage: { type: String, default: '/assets/images/luxury_saudi_corporate_and_legal_background_banner_elegant_modern_riyadh/screen.png' },
  heroBgImages: [{ type: String }],
  phone: { type: String, default: '0568922561' },
  whatsapp: { type: String, default: '966568922561' },
  workingHours: { type: String, default: '9:00 ص - 10:00 م' },
  location: { type: String, default: 'المملكة العربية السعودية - جميع الإمارات' },
  email: { type: String, default: 'info@alwesam-aldhahabi.sa' },
  twitter: { type: String, default: 'https://twitter.com' },
  snapchat: { type: String, default: 'https://snapchat.com' },
  tiktok: { type: String, default: 'https://tiktok.com' }
}, { timestamps: true });

module.exports = mongoose.model('SiteSettings', SiteSettingsSchema);
