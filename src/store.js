/**
 * Al-Wesam Al-Dhahabi Reactive Data Store & API Client
 */
window.Store = {
  // Local state
  state: {
    currentRoute: 'home',
    routeParams: {},
    applications: [],
    articles: [],
    faqs: [],
    customServices: [],
    siteSettings: {
      adminEmail: "admin@alwesam.sa",
      adminPassword: "admin123",
      siteLogo: "/assets/images/official_logo.png",
      logoSize: 42,
      heroBgImage: "/assets/images/luxury_saudi_corporate_and_legal_background_banner_elegant_modern_riyadh/screen.png",
      phone: "0568922561",
      whatsapp: "966568922561",
      workingHours: "9:00 ص - 10:00 م",
      location: "المملكة العربية السعودية - جميع الإمارات",
      email: "info@alwesam-aldhahabi.sa",
      twitter: "https://twitter.com",
      snapchat: "https://snapchat.com",
      tiktok: "https://tiktok.com"
    },
    adminStats: { total: 0, processing: 0, approved: 0, pending: 0 },
    loading: false,
    toast: null
  },

  listeners: [],

  subscribe(listener) {
    this.listeners.push(listener);
  },

  notify() {
    this.listeners.forEach(fn => fn(this.state));
    this.applyGlobalSettings();
  },

  applyGlobalSettings() {
    const settings = this.state.siteSettings;
    if (!settings) return;

    // 1. Dynamic Logos & Sizes
    document.querySelectorAll('[data-site-logo]').forEach(img => {
      if (settings.siteLogo) img.src = settings.siteLogo;
      if (settings.logoSize) {
        img.style.width = `${settings.logoSize}px`;
        img.style.height = `${settings.logoSize}px`;
      }
    });

    // 2. Dynamic Phones
    document.querySelectorAll('[data-site-phone]').forEach(el => {
      if (el.tagName === 'A') el.href = `tel:${settings.phone}`;
      el.textContent = settings.phone;
    });

    // 3. Dynamic WhatsApp
    document.querySelectorAll('[data-site-whatsapp]').forEach(el => {
      if (el.tagName === 'A') el.href = `https://wa.me/${settings.whatsapp.replace(/\+/g, '')}`;
    });
  },

  // --- API CALL HELPERS ---
  async fetchSettings() {
    try {
      const res = await fetch('/api/settings');
      const data = await res.json();
      if (data.success && data.settings) {
        this.state.siteSettings = data.settings;
        this.notify();
      }
    } catch (err) {
      console.error('Error fetching settings:', err);
    }
  },

  async updateSettings(newSettings) {
    try {
      const res = await fetch('/api/settings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newSettings)
      });
      const data = await res.json();
      if (data.success) {
        this.state.siteSettings = data.settings;
        this.showToast('تم حفظ وتحديث إعدادات الموقع بنجاح!');
        this.notify();
        return data.settings;
      } else {
        this.showToast(data.error || 'فشل في حفظ الإعدادات', 'error');
        return null;
      }
    } catch (err) {
      this.showToast('خطأ في الاتصال بالخادم', 'error');
      return null;
    }
  },

  async loginAdmin(email, password) {
    try {
      const res = await fetch('/api/admin/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      });
      const data = await res.json();
      if (data.success) {
        sessionStorage.setItem('admin_authed', 'true');
        sessionStorage.setItem('admin_email', data.email);
        this.showToast('تم تسجيل الدخول بنجاح!');
        return true;
      } else {
        this.showToast(data.error || 'خطأ في بيانات الدخول', 'error');
        return false;
      }
    } catch (err) {
      this.showToast('خطأ بالاتصال بالخادم', 'error');
      return false;
    }
  },

  async uploadFile(file) {
    return new Promise((resolve) => {
      const reader = new FileReader();
      reader.onload = async (e) => {
        try {
          const base64 = e.target.result;
          const res = await fetch('/api/upload', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ filename: file.name, base64 })
          });
          const data = await res.json();
          if (data.success) {
            this.showToast('تم رفع الصورة بنجاح!');
            resolve(data.url);
          } else {
            this.showToast(data.error || 'فشل في رفع الصورة', 'error');
            resolve(null);
          }
        } catch (err) {
          this.showToast('خطأ أثناء رفع الصورة', 'error');
          resolve(null);
        }
      };
      reader.readAsDataURL(file);
    });
  },

  async fetchServices() {
    try {
      const res = await fetch('/api/services');
      const data = await res.json();
      if (data.success) {
        this.state.customServices = data.services;
        this.notify();
      }
    } catch (err) {
      console.error('Error fetching services:', err);
    }
  },

  async createCustomService(serviceData) {
    try {
      const res = await fetch('/api/services', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(serviceData)
      });
      const data = await res.json();
      if (data.success) {
        this.showToast('تم إضافة الخدمة المخصصة بنجاح!');
        this.fetchServices();
        return data.service;
      } else {
        this.showToast(data.error || 'فشل في الإضافة', 'error');
        return null;
      }
    } catch (err) {
      this.showToast('خطأ في الاتصال بالخادم', 'error');
      return null;
    }
  },

  async deleteCustomService(id) {
    try {
      const res = await fetch(`/api/services/${id}`, { method: 'DELETE' });
      const data = await res.json();
      if (data.success) {
        this.showToast('تم حذف الخدمة بنجاح');
        this.fetchServices();
        return true;
      } else {
        this.showToast(data.error || 'فشل في الحذف', 'error');
        return false;
      }
    } catch (err) {
      this.showToast('خطأ أثناء حذف الخدمة', 'error');
      return false;
    }
  },

  // API Call Helpers
  async fetchArticles(category = 'all') {
    try {
      const res = await fetch(`/api/articles?category=${category}`);
      const data = await res.json();
      if (data.success) {
        this.state.articles = data.articles;
        this.notify();
      }
    } catch (err) {
      console.error('Error fetching articles:', err);
    }
  },

  async fetchArticleBySlug(slug) {
    try {
      const res = await fetch(`/api/articles/${slug}`);
      const data = await res.json();
      return data.success ? data.article : null;
    } catch (err) {
      console.error('Error fetching article:', err);
      return null;
    }
  },

  async fetchFaqs(query = '') {
    try {
      const res = await fetch(`/api/faqs?q=${encodeURIComponent(query)}`);
      const data = await res.json();
      if (data.success) {
        this.state.faqs = data.faqs;
        this.notify();
      }
    } catch (err) {
      console.error('Error fetching faqs:', err);
    }
  },

  async submitApplication(formData) {
    try {
      const res = await fetch('/api/applications', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      const data = await res.json();
      if (data.success) {
        this.showToast(`تم تسجيل معاملتك بنجاح! رقم القيد: ${data.application.id}`);
        return data.application;
      } else {
        this.showToast(data.error || 'فشل في تسجيل المعاملة', 'error');
        return null;
      }
    } catch (err) {
      this.showToast('خطأ في الاتصال بالخادم', 'error');
      return null;
    }
  },

  async trackApplication(codeOrId) {
    try {
      const res = await fetch(`/api/applications/track/${encodeURIComponent(codeOrId)}`);
      const data = await res.json();
      if (data.success) {
        return data.application;
      } else {
        this.showToast(data.error || 'لم يتم العثور على معاملة برقم القيد المدخل', 'error');
        return null;
      }
    } catch (err) {
      this.showToast('خطأ في استعلام المعاملة', 'error');
      return null;
    }
  },

  async fetchAdminApplications() {
    try {
      const res = await fetch('/api/admin/applications');
      const data = await res.json();
      if (data.success) {
        this.state.applications = data.applications;
        this.state.adminStats = data.stats;
        this.notify();
      }
    } catch (err) {
      console.error('Error fetching admin applications:', err);
    }
  },

  async updateApplicationStatus(id, updateData) {
    try {
      const res = await fetch(`/api/admin/applications/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updateData)
      });
      const data = await res.json();
      if (data.success) {
        this.showToast(`تم تحديث حالة المعاملة (${id}) بنجاح`);
        this.fetchAdminApplications();
        return data.application;
      } else {
        this.showToast(data.error || 'فشل في التحديث', 'error');
        return null;
      }
    } catch (err) {
      this.showToast('خطأ في الاتصال بالخادم', 'error');
      return null;
    }
  },

  async deleteAdminApplication(id) {
    try {
      const res = await fetch(`/api/admin/applications/${id}`, { method: 'DELETE' });
      const data = await res.json();
      if (data.success) {
        this.showToast(`تم حذف المعاملة رقم (${id}) بنجاح`);
        this.fetchAdminApplications();
        return true;
      } else {
        this.showToast(data.error || 'فشل في الحذف', 'error');
        return false;
      }
    } catch (err) {
      this.showToast('خطأ أثناء عملية الحذف', 'error');
      return false;
    }
  },

  async createArticle(articleData) {
    try {
      const res = await fetch('/api/articles', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(articleData)
      });
      const data = await res.json();
      if (data.success) {
        this.showToast('تم إضافة المقال القانوني بنجاح!');
        this.fetchArticles();
        return data.article;
      } else {
        this.showToast(data.error || 'فشل في نشر المقال', 'error');
        return null;
      }
    } catch (err) {
      this.showToast('خطأ في الاتصال بالخادم', 'error');
      return null;
    }
  },

  async deleteArticle(id) {
    try {
      const res = await fetch(`/api/articles/${id}`, { method: 'DELETE' });
      const data = await res.json();
      if (data.success) {
        this.showToast('تم حذف المقال بنجاح');
        this.fetchArticles();
        return true;
      } else {
        this.showToast(data.error || 'فشل في حذف المقال', 'error');
        return false;
      }
    } catch (err) {
      this.showToast('خطأ أثناء حذف المقال', 'error');
      return false;
    }
  },

  async createFaq(faqData) {
    try {
      const res = await fetch('/api/faqs', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(faqData)
      });
      const data = await res.json();
      if (data.success) {
        this.showToast('تم إضافة السؤال الشائع بنجاح!');
        this.fetchFaqs();
        return data.faq;
      } else {
        this.showToast(data.error || 'فشل في الإضافة', 'error');
        return null;
      }
    } catch (err) {
      this.showToast('خطأ في الاتصال بالخادم', 'error');
      return null;
    }
  },

  async deleteFaq(id) {
    try {
      const res = await fetch(`/api/faqs/${id}`, { method: 'DELETE' });
      const data = await res.json();
      if (data.success) {
        this.showToast('تم حذف السؤال الشائع بنجاح');
        this.fetchFaqs();
        return true;
      } else {
        this.showToast(data.error || 'فشل في الحذف', 'error');
        return false;
      }
    } catch (err) {
      this.showToast('خطأ أثناء حذف السؤال', 'error');
      return false;
    }
  },

  // Article 9 Saudi Citizenship Points Calculation Logic
  calculateCitizenshipPoints({ residenceYears, degree, familyTies }) {
    let score = 0;

    // 1. Residence Years (max 10 points for 10+ years)
    const years = parseInt(residenceYears, 10) || 0;
    if (years >= 10) {
      score += 10;
    } else if (years >= 5) {
      score += years;
    }

    // 2. Degree (max 13 points)
    if (degree === 'phd_tech') score += 13;
    else if (degree === 'phd_other') score += 10;
    else if (degree === 'master') score += 8;
    else if (degree === 'bachelor') score += 5;

    // 3. Family Ties (max 10 points)
    if (familyTies.includes('mother')) score += 3;
    if (familyTies.includes('father')) score += 3;
    if (familyTies.includes('spouse')) score += 2;
    if (familyTies.includes('children')) score += 2;

    const isEligible = score >= 23;
    return {
      score,
      maxScore: 33,
      required: 23,
      isEligible,
      statusLabel: isEligible 
        ? 'مؤهل لرفع الطلب (تجاوزت الحد الأدنى 23 نقطة)' 
        : 'بحاجة لاستكمال النقاط (الحد الأدنى 23 نقطة)'
    };
  }
};
