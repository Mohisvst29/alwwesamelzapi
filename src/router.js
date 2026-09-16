/**
 * Al-Wesam Al-Dhahabi Client Router & Dynamic SEO Handler
 */
window.Router = {
  routes: {
    'home': { title: 'الوسام الذهبي | الرئيسية - معاملات التجنيس وتصاريح وتوثيق الزواج', metaDesc: 'مكتب الوسام الذهبي للخدمات العامة واستشارات التجنيس وتصاريح الزواج برئاسة المستشار أبو خالد.' },
    'about-us': { title: 'من نحن | مكتب الوسام الذهبي للخدمات العامة والاستشارات', metaDesc: 'خبرة عريقة ممتدة لأكثر من 15 عاماً في خدمة المواطنين والمقيمين والكفاءات في المملكة العربية السعودية.' },
    'citizenship-services': { title: 'خدمات ومعاملات التجنيس والجنسية السعودية | حاسبة النقاط', metaDesc: 'دليل كامل لمعاملات منح الجنسية السعودية للكفاءات، المستثمرين، وزوجات وأبناء المواطنات مع حاسبة الـ 23 نقطة.' },
    'marriage-permits': { title: 'استخراج تصاريح وتوثيق الزواج | الوسام الذهبي', metaDesc: 'استخراج موافقات وتصاريح الزواج من أجنبية مقيمة أو من الخارج وتوثيق عقود النكاح عبر ناجز والأحوال المدنية.' },
    'services-guide': { title: 'دليل الخدمات الشاملة والإجراءات الرسمية | الوسام الذهبي', metaDesc: 'الدليل الإجرائي المتكامل لخدمات الأحوال المدنية، التوثيق، الشؤون السيادية، ومتابعة الإمارات.' },
    'legal-blog': { title: 'المدونة والمقالات القانونية | الوسام الذهبي', metaDesc: 'شروحات وتحليلات للأوامر الملكية واللوائح التنفيذية لنظام الجنسية وتصاريح الزواج في المملكة.' },
    'faq': { title: 'الأسئلة الشائعة حول التجنيس وتصاريح الزواج | الوسام الذهبي', metaDesc: 'إجابات موثقة لأبرز الأسئلة والاستفسارات النظامية بإشراف المستشار التنفيذي أبو خالد.' },
    'apply-and-contact': { title: 'طلب خدمة واستشارة فورية | المستشار أبو خالد 0568922561', metaDesc: 'قدم طلبك وفحص ملفك أهليتك مجاناً عبر النموذج أو التواصل المباشر مع المستشار أبو خالد.' },
    'track': { title: 'متابعة حالة المعاملة برقم القيد | الوسام الذهبي', metaDesc: 'استعلم عن حالة مسار معاملتك وخطوات سيرها بالإمارة والداخلية برقم القيد أو الهوية.' },
    'admin': { title: 'لوحة التحكم الإشرافية | المستشار أبو خالد', metaDesc: 'بوابة الإدارة العليا لمتابعة وتحديث حالات طلبات التجنيس وتصاريح الزواج.' }
  },

  init() {
    window.addEventListener('hashchange', () => this.handleRoute());
    this.handleRoute();
  },

  navigate(path) {
    window.location.hash = path;
  },

  handleRoute() {
    const hash = window.location.hash.replace('#', '') || 'home';
    const parts = hash.split('/');
    const mainRoute = parts[0] || 'home';
    const param = parts[1] || null;

    Store.state.currentRoute = mainRoute;
    Store.state.routeParams = { param };

    // Update Document Title & SEO Meta Tags
    const routeConfig = this.routes[mainRoute] || this.routes['home'];
    document.title = routeConfig.title;

    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) {
      metaDesc.setAttribute('content', routeConfig.metaDesc);
    }

    // Highlight Active Nav Links with Exact Screenshot Styling (Solid Dark Green Pill for Active Item)
    document.querySelectorAll('[data-route]').forEach(el => {
      const routeAttr = el.getAttribute('data-route');
      if (routeAttr === mainRoute) {
        el.className = 'nav-item px-3.5 py-1.5 rounded-xl whitespace-nowrap transition-all bg-[#0b3c2a] text-white font-bold shadow-sm';
      } else {
        el.className = 'nav-item px-3 py-1.5 rounded-xl whitespace-nowrap transition-all text-on-surface-variant hover:text-primary font-semibold';
      }
    });

    // Scroll to top cleanly
    window.scrollTo({ top: 0, behavior: 'smooth' });

    // Render corresponding view
    Views.render(mainRoute, param);
  }
};
