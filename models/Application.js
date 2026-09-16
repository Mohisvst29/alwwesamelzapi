const mongoose = require('mongoose');

const HistorySchema = new mongoose.Schema({
  time: { type: String, default: () => new Date().toISOString() },
  title: String,
  note: String
}, { _id: false });

const ApplicationSchema = new mongoose.Schema({
  id: { type: String, required: true, unique: true },
  applicantName: { type: String, required: true },
  phone: { type: String, required: true },
  nationalId: { type: String, default: '' },
  serviceType: { type: String, default: 'marriage-permits' },
  serviceName: { type: String, default: 'خدمة عامة' },
  partnerNationality: { type: String, default: 'غير محدد' },
  partnerResidenceStatus: { type: String, default: 'غير محدد' },
  details: { type: String, default: '' },
  status: { type: String, default: 'pending' },
  statusLabel: { type: String, default: 'قيد التدقيق والفحص الأولي' },
  stageStep: { type: Number, default: 1 },
  createdAt: { type: String, default: () => new Date().toISOString() },
  updatedAt: { type: String, default: () => new Date().toISOString() },
  notes: { type: String, default: '' },
  history: [HistorySchema]
}, { timestamps: true });

module.exports = mongoose.model('Application', ApplicationSchema);
