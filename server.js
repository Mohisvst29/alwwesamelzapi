const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const path = require('path');
const fs = require('fs');
const db = require('./db');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));

// Serve static files from public directory & uploads
app.use(express.static(path.join(__dirname, 'public')));
app.use('/uploads', express.static(path.join(__dirname, 'public', 'uploads')));
app.use('/src', express.static(path.join(__dirname, 'src')));

// Also serve images from adjacent workspace image directories if requested
const imageDirs = [
  'image.png',
  'luxury_saudi_corporate_and_legal_background_banner_elegant_modern_riyadh',
  'saudi_citizenship_and_naturalization_papers_consultation_desk_saudi_passport',
  'saudi_civil_affairs_and_family_registry_document_verification_modern_riyadh',
  'saudi_government_documentation_and_marriage_certificate_stamping_desk_luxury'
];

imageDirs.forEach(dirName => {
  const dirPath = path.join(__dirname, '..', dirName);
  if (fs.existsSync(dirPath)) {
    app.use(`/assets/images/${dirName}`, express.static(dirPath));
  }
});

// --- REST API ENDPOINTS ---

// 0. Admin Login & Auth API
app.post('/api/admin/login', (req, res) => {
  try {
    const { email, password } = req.body;
    const result = db.verifyAdminLogin(email, password);
    if (result.success) {
      res.json({ success: true, email: result.email });
    } else {
      res.status(401).json({ success: false, error: result.error });
    }
  } catch (err) {
    res.status(500).json({ success: false, error: 'خطأ في عملية تسجيل الدخول.' });
  }
});

// 0.1 Site Settings API
app.get('/api/settings', (req, res) => {
  try {
    const settings = db.getSiteSettings();
    res.json({ success: true, settings });
  } catch (err) {
    res.status(500).json({ success: false, error: 'خطأ في جلب إعدادات الموقع.' });
  }
});

app.post('/api/settings', (req, res) => {
  try {
    const updated = db.updateSiteSettings(req.body);
    res.json({ success: true, message: 'تم حفظ الإعدادات بنجاح.', settings: updated });
  } catch (err) {
    res.status(500).json({ success: false, error: 'خطأ في حفظ الإعدادات.' });
  }
});

// 0.2 Image Upload API
app.post('/api/upload', (req, res) => {
  try {
    const { filename, base64 } = req.body;
    if (!base64) {
      return res.status(400).json({ success: false, error: 'ملف الصورة مطلوب.' });
    }
    const imageUrl = db.saveUploadedImage(filename || 'uploaded_img.png', base64);
    if (imageUrl) {
      res.json({ success: true, url: imageUrl, message: 'تم رفع الصورة بنجاح!' });
    } else {
      res.status(500).json({ success: false, error: 'فشل في حفظ ملف الصورة.' });
    }
  } catch (err) {
    res.status(500).json({ success: false, error: 'خطأ أثناء عملية رفع الصورة.' });
  }
});

// 0.3 Custom Services API
app.get('/api/services', (req, res) => {
  try {
    const services = db.getServices();
    res.json({ success: true, services });
  } catch (err) {
    res.status(500).json({ success: false, error: 'خطأ في جلب الخدمات.' });
  }
});

app.post('/api/services', (req, res) => {
  try {
    const newService = db.createService(req.body);
    res.status(201).json({ success: true, service: newService });
  } catch (err) {
    res.status(500).json({ success: false, error: 'خطأ في إضافة الخدمة.' });
  }
});

app.delete('/api/services/:id', (req, res) => {
  try {
    const deleted = db.deleteService(req.params.id);
    if (!deleted) {
      return res.status(404).json({ success: false, error: 'الخدمة غير موجودة.' });
    }
    res.json({ success: true, message: 'تم حذف الخدمة بنجاح.' });
  } catch (err) {
    res.status(500).json({ success: false, error: 'خطأ في حذف الخدمة.' });
  }
});

// 1. Service Applications API
app.post('/api/applications', (req, res) => {
  try {
    const appData = req.body;
    if (!appData.applicantName || !appData.phone) {
      return res.status(400).json({ success: false, error: 'الاسم ورقم الجوال مطلوبان لاستكمال قيد الطلب.' });
    }
    const newApp = db.createApplication(appData);
    res.status(201).json({
      success: true,
      message: 'تم تسجيل معاملتك بنجاح وقيدها في السجل الرسمي.',
      application: newApp
    });
  } catch (err) {
    res.status(500).json({ success: false, error: 'حدث خطأ في الخادم أثناء قيد الطلب.' });
  }
});

// 2. Application Status Tracker API
app.get('/api/applications/track/:code', (req, res) => {
  try {
    const code = req.params.code;
    const application = db.getApplicationByCode(code);
    if (!application) {
      return res.status(404).json({
        success: false,
        error: 'لم نتمكن من العثور على معاملة برقم القيد أو الهوية المدخلة. يرجى التثبت من الرقم أو التواصل مع المستشار أبو خالد (0568922561).'
      });
    }
    res.json({ success: true, application });
  } catch (err) {
    res.status(500).json({ success: false, error: 'خطأ في جلب بيانات المعاملة.' });
  }
});

// 3. Admin Applications Management API
app.get('/api/admin/applications', (req, res) => {
  try {
    const applications = db.getApplications();
    const stats = {
      total: applications.length,
      processing: applications.filter(a => a.status === 'processing').length,
      approved: applications.filter(a => a.status === 'approved').length,
      pending: applications.filter(a => a.status === 'pending').length
    };
    res.json({ success: true, applications, stats });
  } catch (err) {
    res.status(500).json({ success: false, error: 'خطأ في جلب بيانات اللوحة.' });
  }
});

app.patch('/api/admin/applications/:id', (req, res) => {
  try {
    const id = req.params.id;
    const updateData = req.body;
    const updatedApp = db.updateApplicationStatus(id, updateData);
    if (!updatedApp) {
      return res.status(404).json({ success: false, error: 'المعاملة غير موجودة.' });
    }
    res.json({ success: true, message: 'تم تحديث حالة المعاملة بنجاح.', application: updatedApp });
  } catch (err) {
    res.status(500).json({ success: false, error: 'خطأ في تحديث حالة المعاملة.' });
  }
});

app.delete('/api/admin/applications/:id', (req, res) => {
  try {
    const deleted = db.deleteApplication(req.params.id);
    if (!deleted) {
      return res.status(404).json({ success: false, error: 'المعاملة غير موجودة.' });
    }
    res.json({ success: true, message: 'تم حذف المعاملة بنجاح.' });
  } catch (err) {
    res.status(500).json({ success: false, error: 'خطأ في حذف المعاملة.' });
  }
});

// 4. Blog & Articles API
app.get('/api/articles', (req, res) => {
  try {
    const category = req.query.category;
    let articles = db.getArticles();
    if (category && category !== 'all') {
      articles = articles.filter(a => a.category === category);
    }
    res.json({ success: true, articles });
  } catch (err) {
    res.status(500).json({ success: false, error: 'خطأ في جلب المقالات.' });
  }
});

app.get('/api/articles/:slug', (req, res) => {
  try {
    const article = db.getArticleBySlug(req.params.slug);
    if (!article) {
      return res.status(404).json({ success: false, error: 'المقال غير موجود.' });
    }
    res.json({ success: true, article });
  } catch (err) {
    res.status(500).json({ success: false, error: 'خطأ في جلب المقال.' });
  }
});

app.post('/api/articles', (req, res) => {
  try {
    const newArt = db.createArticle(req.body);
    res.status(201).json({ success: true, article: newArt });
  } catch (err) {
    res.status(500).json({ success: false, error: 'خطأ في إضافة المقال.' });
  }
});

app.delete('/api/articles/:id', (req, res) => {
  try {
    const deleted = db.deleteArticle(req.params.id);
    if (!deleted) {
      return res.status(404).json({ success: false, error: 'المقال غير موجود.' });
    }
    res.json({ success: true, message: 'تم حذف المقال بنجاح.' });
  } catch (err) {
    res.status(500).json({ success: false, error: 'خطأ في حذف المقال.' });
  }
});

// 5. FAQ API
app.get('/api/faqs', (req, res) => {
  try {
    const query = req.query.q;
    const faqs = query ? db.searchFaqs(query) : db.getFaqs();
    res.json({ success: true, faqs });
  } catch (err) {
    res.status(500).json({ success: false, error: 'خطأ في جلب الأسئلة الشائعة.' });
  }
});

app.post('/api/faqs', (req, res) => {
  try {
    const newFaq = db.createFaq(req.body);
    res.status(201).json({ success: true, faq: newFaq });
  } catch (err) {
    res.status(500).json({ success: false, error: 'خطأ في إضافة السؤال الشائع.' });
  }
});

app.delete('/api/faqs/:id', (req, res) => {
  try {
    const deleted = db.deleteFaq(req.params.id);
    if (!deleted) {
      return res.status(404).json({ success: false, error: 'السؤال الشائع غير موجود.' });
    }
    res.json({ success: true, message: 'تم حذف السؤال الشائع بنجاح.' });
  } catch (err) {
    res.status(500).json({ success: false, error: 'خطأ في حذف السؤال.' });
  }
});

// --- SEO ENDPOINTS ---

// Dynamic Sitemap XML Endpoint
app.get('/sitemap.xml', (req, res) => {
  const baseUrl = req.protocol + '://' + req.get('host');
  const articles = db.getArticles();
  
  const staticPages = [
    '',
    'about-us',
    'citizenship-services',
    'marriage-permits',
    'services-guide',
    'legal-blog',
    'faq',
    'apply-and-contact',
    'track'
  ];

  let xml = `<?xml version="1.0" encoding="UTF-8"?>\n`;
  xml += `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n`;

  staticPages.forEach(p => {
    xml += `  <url>\n`;
    xml += `    <loc>${baseUrl}/#${p}</loc>\n`;
    xml += `    <lastmod>${new Date().toISOString().split('T')[0]}</lastmod>\n`;
    xml += `    <changefreq>daily</changefreq>\n`;
    xml += `    <priority>${p === '' ? '1.0' : '0.8'}</priority>\n`;
    xml += `  </url>\n`;
  });

  articles.forEach(art => {
    xml += `  <url>\n`;
    xml += `    <loc>${baseUrl}/#legal-blog/${art.slug}</loc>\n`;
    xml += `    <lastmod>${art.date || new Date().toISOString().split('T')[0]}</lastmod>\n`;
    xml += `    <changefreq>weekly</changefreq>\n`;
    xml += `    <priority>0.7</priority>\n`;
    xml += `  </url>\n`;
  });

  xml += `</urlset>`;

  res.header('Content-Type', 'application/xml');
  res.send(xml);
});

// Robots.txt Endpoint
app.get('/robots.txt', (req, res) => {
  const baseUrl = req.protocol + '://' + req.get('host');
  let robots = `User-agent: *\n`;
  robots += `Allow: /\n`;
  robots += `Disallow: /api/admin\n`;
  robots += `Sitemap: ${baseUrl}/sitemap.xml\n`;
  res.header('Content-Type', 'text/plain');
  res.send(robots);
});

// Catch-all route to serve SPA html
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

// Start listening
app.listen(PORT, () => {
  console.log(`====================================================`);
  console.log(`   الوسام الذهبي - خادم API والخدمات الفول ستاك`);
  console.log(`   المنفذ: http://localhost:${PORT}`);
  console.log(`   خريطة الموقع: http://localhost:${PORT}/sitemap.xml`);
  console.log(`   ملف الروبرتات: http://localhost:${PORT}/robots.txt`);
  console.log(`   المستشار المسؤول: أبو خالد (0568922561)`);
  console.log(`====================================================`);
});
