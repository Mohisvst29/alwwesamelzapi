const mongoose = require('mongoose');

const ServiceSchema = new mongoose.Schema({
  id: { type: String, required: true, unique: true },
  title: { type: String, required: true },
  description: { type: String, default: '' },
  icon: { type: String, default: 'star' },
  image: { type: String, default: '' },
  actionRoute: { type: String, default: 'apply-and-contact' }
}, { timestamps: true });

module.exports = mongoose.model('Service', ServiceSchema);
