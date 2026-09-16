const mongoose = require('mongoose');

const FaqSchema = new mongoose.Schema({
  id: { type: mongoose.Schema.Types.Mixed, required: true },
  category: { type: String, default: 'marriage' },
  question: { type: String, required: true },
  answer: { type: String, required: true }
}, { timestamps: true });

module.exports = mongoose.model('Faq', FaqSchema);
