const mongoose = require('mongoose');

const ArticleSchema = new mongoose.Schema({
  id: { type: String, required: true, unique: true },
  slug: { type: String, required: true, unique: true },
  title: { type: String, required: true },
  category: { type: String, default: 'citizenship' },
  categoryLabel: { type: String, default: 'نظام التجنيس السعودي' },
  author: { type: String, default: 'المستشار أبو خالد' },
  date: { type: String, default: () => new Date().toISOString().split('T')[0] },
  readTime: { type: String, default: '5 دقائق' },
  image: { type: String, default: '' },
  summary: { type: String, default: '' },
  content: { type: String, default: '' }
}, { timestamps: true });

module.exports = mongoose.model('Article', ArticleSchema);
