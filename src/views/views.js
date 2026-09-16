/**
 * Al-Wesam Al-Dhahabi UI Views Renderer Engine
 */
window.Views = {
  render(route, param) {
    const root = document.getElementById('app-root');
    if (!root) return;

    switch (route) {
      case 'home':
        root.innerHTML = this.renderHome();
        this.bindHomeEvents();
        break;
      case 'about-us':
        root.innerHTML = this.renderAbout();
        break;
      case 'citizenship-services':
        root.innerHTML = this.renderCitizenship();
        this.bindCalculatorEvents();
        break;
      case 'marriage-permits':
        root.innerHTML = this.renderMarriage();
        break;
      case 'services-guide':
        root.innerHTML = this.renderGuide();
        break;
      case 'legal-blog':
        if (param) {
          this.renderArticleDetail(param, root);
        } else {
          root.innerHTML = this.renderBlog();
          this.bindBlogEvents();
        }
        break;
      case 'faq':
        root.innerHTML = this.renderFaq();
        this.bindFaqEvents();
        break;
      case 'apply-and-contact':
        root.innerHTML = this.renderApply();
        this.bindApplyFormEvents();
        break;
      case 'track':
        root.innerHTML = this.renderTrack(param);
        this.bindTrackEvents();
        break;
      case 'admin':
        root.innerHTML = this.renderAdmin();
        this.bindAdminEvents();
        break;
      default:
        root.innerHTML = this.renderHome();
        this.bindHomeEvents();
    }
  },

  // ==========================================
  // 1. HOME VIEW
  // ==========================================
  renderHome() {
    const settings = Store.state.siteSettings || {};
    const heroBgImages = (settings.heroBgImages && settings.heroBgImages.length > 0) 
      ? settings.heroBgImages 
      : [settings.heroBgImage || "/assets/images/luxury_saudi_corporate_and_legal_background_banner_elegant_modern_riyadh/screen.png"];

    return `
      <!-- Sovereign Luxury Hero Banner Section -->
      <section class="relative w-full overflow-hidden bg-primary text-on-primary py-space-xl md:py-24">
        <!-- Full-Bleed High-Res Background Image Slider with Ambient Sovereign Gradient Overlay -->
        <div class="absolute inset-0 z-0" id="heroBgSliderContainer">
          ${heroBgImages.map((imgUrl, idx) => `
            <img src="${imgUrl}" alt="خلفية الوسام الذهبي ${idx + 1}" data-hero-slide="${idx}" class="absolute inset-0 w-full h-full object-cover object-center transition-opacity duration-1000 ease-in-out ${idx === 0 ? 'opacity-65 z-10' : 'opacity-0 z-0'}">
          `).join('')}
          <div class="absolute inset-0 z-20 bg-gradient-to-b from-primary/65 via-primary/45 to-primary/80 pointer-events-none"></div>

          ${heroBgImages.length > 1 ? `
            <div class="absolute bottom-4 left-1/2 -translate-x-1/2 z-30 flex items-center gap-2">
              ${heroBgImages.map((_, idx) => `
                <button data-hero-dot="${idx}" title="صورة ${idx + 1}" class="w-2.5 h-2.5 rounded-full transition-all duration-300 ${idx === 0 ? 'bg-secondary-fixed w-6' : 'bg-white/40 hover:bg-white/70'}"></button>
              `).join('')}
            </div>
          ` : ''}
        </div>

        <div class="relative z-10 max-w-7xl mx-auto px-gutter flex flex-col items-center text-center">
          <!-- Sovereign Verification Pill -->
          <div class="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-secondary-container text-on-secondary-fixed shadow-md mb-space-md whitespace-nowrap">
            <span class="material-symbols-outlined text-sm text-secondary-dark font-bold">verified</span>
            <span class="text-xs font-bold">المستشار التنفيذي المعتمد: أبو خالد | 0568922561</span>
          </div>

          <!-- Main Diplomatic Headline -->
          <h1 class="max-w-4xl text-2xl md:text-4xl lg:text-5xl text-white font-bold tracking-tight leading-tight mb-space-sm">
            الوسام الذهبي للخدمات العامة واستشارات التجنيس
            <span class="block text-secondary-fixed mt-2">وجهتكم الموثوقة لمعاملات الجنسية وتصاريح وتوثيق الزواج</span>
          </h1>

          <p class="max-w-3xl text-xs md:text-sm text-primary-fixed-dim leading-relaxed mb-space-lg">
            نخبة مختصة من المستشارين والخبراء لتيسير كافة الإجراءات النظامية واستخراج تصاريح الزواج وتوثيقها وإنجاز ملفات منح وتجنيس الكفاءات والمستثمرين وأسر المواطنين بأعلى مستويات السرية، الدقة والمصداقية التامة.
          </p>

          <!-- Action Suite Buttons -->
          <div class="flex flex-wrap items-center justify-center gap-3 mb-space-xl">
            <a href="https://wa.me/966568922561?text=%D8%A7%D9%84%D8%B3%D9%84%D8%A7%D9%85%20%D8%B9%D9%84%D9%8A%D9%83%D9%85%D8%8C%20%D8%A3%D8%B1%D8%BA%D8%A8%20%D9%81%D9%8A%20%D8%A7%D9%84%D8%A7%D8%B3%D8%AA%D9%81%D8%B3%D8%A7%D8%B1%20%D8%B9%D9%86%20%D8%AE%D8%AF%D9%85%D8%A7%D8%AA%20%D9%85%D9%83%D8%AA%D8%A8%20%D8%A7%D9%84%D9%88%D8%B3%D8%A7%D9%85%20%D8%A7%D9%84%D8%B0%D9%87%D8%A8%D9%8A" target="_blank" rel="noopener noreferrer" class="flex items-center gap-2 px-5 py-3 rounded-xl bg-secondary-container text-on-secondary-fixed hover:bg-secondary-fixed transition-all font-bold text-xs shadow-lg whitespace-nowrap">
              <span class="material-symbols-outlined text-base">chat</span>
              <span>طلب استشارة فورية عبر واتساب (أبو خالد)</span>
            </a>
            <a href="#citizenship-services" class="flex items-center gap-2 px-5 py-3 rounded-xl bg-surface-container-lowest/15 text-white hover:bg-surface-container-lowest/25 transition-all font-bold text-xs shadow-md border border-secondary/30 whitespace-nowrap">
              <span class="material-symbols-outlined text-base text-secondary-fixed">calculate</span>
              <span>حاسبة نقاط التجنيس (المادة 9)</span>
            </a>
            <a href="#track" class="flex items-center gap-2 px-5 py-3 rounded-xl bg-primary-container text-primary-fixed hover:bg-surface-container-high/20 transition-all font-bold text-xs border border-primary-fixed/20 whitespace-nowrap">
              <span class="material-symbols-outlined text-base text-secondary-fixed">search</span>
              <span>استعلام عن معاملة برقم القيد</span>
            </a>
          </div>

          <!-- Rapid Trust Pillars Bento -->
          <div class="w-full grid grid-cols-2 md:grid-cols-4 gap-space-sm">
            <div class="flex flex-col items-center justify-center p-3.5 rounded-xl bg-primary-container/80 backdrop-blur-md shadow-md border border-secondary/30 whitespace-nowrap">
              <span class="text-xl text-secondary-fixed font-bold">+15 عاماً</span>
              <span class="text-[11px] text-primary-fixed-dim mt-0.5">خبرة عريقة متخصصة</span>
            </div>
            <div class="flex flex-col items-center justify-center p-3.5 rounded-xl bg-primary-container/80 backdrop-blur-md shadow-md border border-secondary/30 whitespace-nowrap">
              <span class="text-xl text-white font-bold">100%</span>
              <span class="text-[11px] text-primary-fixed-dim mt-0.5">معاملات نظامية ومعتمدة</span>
            </div>
            <div class="flex flex-col items-center justify-center p-3.5 rounded-xl bg-primary-container/80 backdrop-blur-md shadow-md border border-secondary/30 whitespace-nowrap">
              <span class="material-symbols-outlined text-2xl text-secondary-fixed mb-0.5">lock</span>
              <span class="text-[11px] text-primary-fixed-dim">سرية وأمان مطلق للبيانات</span>
            </div>
            <div class="flex flex-col items-center justify-center p-3.5 rounded-xl bg-primary-container/80 backdrop-blur-md shadow-md border border-secondary/30 whitespace-nowrap">
              <span class="material-symbols-outlined text-2xl text-primary-fixed mb-0.5">assignment_turned_in</span>
              <span class="text-[11px] text-primary-fixed-dim">متابعة دقيقة حتى الصدور</span>
            </div>
          </div>
        </div>
      </section>

      <!-- Editorial Narrative Section -->
      <section class="max-w-7xl mx-auto px-gutter py-space-lg w-full">
        <div class="grid grid-cols-1 lg:grid-cols-12 gap-space-lg items-center">
          <div class="lg:col-span-6 relative">
            <div class="relative z-10 rounded-2xl overflow-hidden shadow-xl bg-surface-container-high aspect-[4/3] border-2 border-secondary/30">
              <img src="/assets/images/saudi_citizenship_and_naturalization_papers_consultation_desk_saudi_passport/screen.png" alt="Saudi consultation desk" class="w-full h-full object-cover">
              <div class="absolute inset-0 bg-gradient-to-t from-primary/80 via-transparent to-transparent"></div>
              <div class="absolute bottom-3 right-3 left-3 p-3 rounded-xl bg-surface-container-lowest/95 backdrop-blur-md shadow-md flex items-center justify-between">
                <div class="flex items-center gap-2">
                  <span class="material-symbols-outlined text-secondary text-xl">shield</span>
                  <div class="flex flex-col text-right">
                    <span class="text-xs text-primary font-bold">حماية قانونية وشفافية كاملة</span>
                    <span class="text-[10px] text-on-surface-variant">جميع الإجراءات تتم وفق اللائحة التنفيذية والأنظمة الملكية</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div class="lg:col-span-6 flex flex-col gap-space-xs">
            <div class="flex items-center gap-1.5 text-secondary text-xs font-bold">
              <span class="w-6 h-0.5 bg-secondary inline-block"></span>
              <span>المؤسسية والالتزام النظامي</span>
            </div>
            <h2 class="text-xl md:text-2xl text-primary font-bold leading-snug">
              ريادة واستباقية في حلول الأحوال المدنية، التوثيق، وشؤون الجنسية
            </h2>
            <p class="text-xs md:text-sm text-on-surface-variant leading-relaxed">
              يمثل مكتب <strong>الوسام الذهبي</strong> حلقة الوصل الاستشارية الموثوقة للأسر والمقيمين والكفاءات النادرة داخل المملكة العربية السعودية وخارجها. نضمن تقديم دراسات ملفات مستفيضة، وتفادي أسباب الرفض الشائعة، وتسريع الحصول على الموافقات الوزارية الرسمية بتوجيه دقيق من المستشار <strong>أبو خالد</strong>.
            </p>
            <div class="grid grid-cols-1 sm:grid-cols-2 gap-space-xs pt-1">
              <div class="p-3 rounded-xl bg-surface-container-low flex items-start gap-2 border border-secondary/20">
                <span class="material-symbols-outlined text-secondary text-lg shrink-0 mt-0.5">policy</span>
                <div>
                  <span class="text-xs text-primary font-bold block">إلمام بجميع اللوائح</span>
                  <p class="text-[11px] text-on-surface-variant mt-0.5">مواكبة يومية لأحدث تعاميم وزارة الداخلية والأحوال والعدل 1446هـ.</p>
                </div>
              </div>
              <div class="p-3 rounded-xl bg-surface-container-low flex items-start gap-2 border border-secondary/20">
                <span class="material-symbols-outlined text-secondary text-lg shrink-0 mt-0.5">travel_explore</span>
                <div>
                  <span class="text-xs text-primary font-bold block">تصاريح مفتوحة الطلب</span>
                  <p class="text-[11px] text-on-surface-variant mt-0.5">إمكانية التقديم لكافة الجنسيات والدول وفق المعايير والشروط.</p>
                </div>
              </div>
            </div>
            <div class="pt-1">
              <a href="tel:0568922561" class="inline-flex items-center gap-1 text-secondary font-bold text-xs hover:underline whitespace-nowrap">
                <span>تحدث الآن مع المستشار أبو خالد بخصوص حالتك</span>
                <span class="material-symbols-outlined text-sm">arrow_back</span>
              </a>
            </div>
          </div>
        </div>
      </section>

      <!-- Core Services Matrix -->
      <section class="w-full bg-surface-container-low py-space-lg" id="services-matrix">
        <div class="max-w-7xl mx-auto px-gutter">
          <div class="flex flex-col items-center text-center max-w-3xl mx-auto mb-space-lg">
            <div class="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-surface-container-highest text-secondary text-xs font-bold mb-1 whitespace-nowrap">
              <span class="material-symbols-outlined text-xs">view_compact</span>
              <span>خدماتنا الأساسية التخصصية</span>
            </div>
            <h2 class="text-xl md:text-2xl text-primary font-bold">
              منظومة المعاملات القانونية والتنفيذية الشاملة
            </h2>
            <p class="text-xs text-on-surface-variant mt-1">
              نقدم باقات خدمية متكاملة مدعومة بالخبرة الإجرائية لتوفير الوقت والجهد وتفادي الإشكاليات البيروقراطية.
            </p>
          </div>

          <div class="grid grid-cols-1 md:grid-cols-3 gap-space-md">
            <!-- Pillar 1: Citizenship -->
            <div class="flex flex-col rounded-2xl bg-surface-container-lowest p-space-md shadow-sm hover:shadow-md transition-all relative overflow-hidden border border-secondary/20">
              <div class="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-primary via-secondary to-primary"></div>
              <div class="flex items-center justify-between mb-2 mt-1">
                <div class="w-10 h-10 rounded-xl bg-primary text-secondary-fixed flex items-center justify-center shadow-sm">
                  <span class="material-symbols-outlined text-xl">id_card</span>
                </div>
                <span class="px-2.5 py-0.5 rounded-full bg-surface-container-high text-primary text-[11px] font-semibold whitespace-nowrap">نظام الجنسية السعودية</span>
              </div>
              <h3 class="text-base text-primary font-bold mb-1">معاملات التجنيس (كافة الفئات)</h3>
              <p class="text-[11px] text-on-surface-variant leading-relaxed mb-3">
                دراسة وصياغة ورفع ملفات طلبات منح الجنسية العربية السعودية للأفراد والعائلات وفق التعديلات الملكية ونظام الـ 23 نقطة.
              </p>
              <ul class="flex flex-col gap-1.5 mb-4 flex-grow text-[11px] text-on-surface">
                <li class="flex items-start gap-1.5"><span class="material-symbols-outlined text-xs text-secondary shrink-0 mt-0.5">check_circle</span>تجنيس المستثمرين ورواد الأعمال وأصحاب الملاءة.</li>
                <li class="flex items-start gap-1.5"><span class="material-symbols-outlined text-xs text-secondary shrink-0 mt-0.5">check_circle</span>تجنيس الكفاءات العلمية والأطباء والمهندسين.</li>
                <li class="flex items-start gap-1.5"><span class="material-symbols-outlined text-xs text-secondary shrink-0 mt-0.5">check_circle</span>معاملات تجنيس زوجة المواطن وزوج المواطنة.</li>
                <li class="flex items-start gap-1.5"><span class="material-symbols-outlined text-xs text-secondary shrink-0 mt-0.5">check_circle</span>تجنيس أبناء وبنات المواطنات واستخرج الجوازات.</li>
              </ul>
              <a href="#citizenship-services" class="w-full flex items-center justify-center gap-1.5 py-2 rounded-xl bg-primary text-on-primary hover:bg-primary-container transition-all font-bold text-xs whitespace-nowrap">
                <span class="material-symbols-outlined text-sm text-secondary-fixed">calculate</span>
                <span>حاسبة النقاط والتفاصيل</span>
              </a>
            </div>

            <!-- Pillar 2: Marriage Permits -->
            <div class="flex flex-col rounded-2xl bg-surface-container-lowest p-space-md shadow-sm hover:shadow-md transition-all relative overflow-hidden border border-secondary/20">
              <div class="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-secondary via-secondary-container to-secondary"></div>
              <div class="flex items-center justify-between mb-2 mt-1">
                <div class="w-10 h-10 rounded-xl bg-secondary-container text-on-secondary-fixed flex items-center justify-center shadow-sm">
                  <span class="material-symbols-outlined text-xl">favorite</span>
                </div>
                <span class="px-2.5 py-0.5 rounded-full bg-secondary-fixed/30 text-on-secondary-fixed text-[11px] font-semibold whitespace-nowrap">تصاريح مفتوحة الطلب</span>
              </div>
              <h3 class="text-base text-primary font-bold mb-1">تصاريح وتوثيق الزواج</h3>
              <p class="text-[11px] text-on-surface-variant leading-relaxed mb-3">
                استخراج الموافقات الرسمية للزواج من جنسيات عربية وأجنبية بدقة ومطابقة للأنظمة الشرعية والحكومية عبر الإمارة والداخلية.
              </p>
              <ul class="flex flex-col gap-1.5 mb-4 flex-grow text-[11px] text-on-surface">
                <li class="flex items-start gap-1.5"><span class="material-symbols-outlined text-xs text-secondary shrink-0 mt-0.5">check_circle</span>زواج المواطن من أجنبية مقيمة داخل المملكة.</li>
                <li class="flex items-start gap-1.5"><span class="material-symbols-outlined text-xs text-secondary shrink-0 mt-0.5">check_circle</span>زواج السعودي من مقيمة في الخارج (تصريح مفتوح).</li>
                <li class="flex items-start gap-1.5"><span class="material-symbols-outlined text-xs text-secondary shrink-0 mt-0.5">check_circle</span>زواج المواطنة السعودية من مقيم أجنبي.</li>
                <li class="flex items-start gap-1.5"><span class="material-symbols-outlined text-xs text-secondary shrink-0 mt-0.5">check_circle</span>استثناءات الأعمار، الفحص الطبي، وإعداد الملف.</li>
              </ul>
              <a href="#marriage-permits" class="w-full flex items-center justify-center gap-1.5 py-2 rounded-xl bg-secondary-container text-on-secondary-fixed hover:bg-secondary-fixed transition-all font-bold text-xs whitespace-nowrap">
                <span class="material-symbols-outlined text-sm">outgoing_mail</span>
                <span>استعراض شروط تصاريح الزواج</span>
              </a>
            </div>

            <!-- Pillar 3: Status Rectification -->
            <div class="flex flex-col rounded-2xl bg-surface-container-lowest p-space-md shadow-sm hover:shadow-md transition-all relative overflow-hidden border border-secondary/20">
              <div class="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-primary via-surface-tint to-primary"></div>
              <div class="flex items-center justify-between mb-2 mt-1">
                <div class="w-10 h-10 rounded-xl bg-surface-container-high text-primary flex items-center justify-center shadow-sm">
                  <span class="material-symbols-outlined text-xl">gavel</span>
                </div>
                <span class="px-2.5 py-0.5 rounded-full bg-surface-container-high text-on-surface-variant text-[11px] font-semibold whitespace-nowrap">وزارة العدل والأحوال</span>
              </div>
              <h3 class="text-base text-primary font-bold mb-1">تصحيح الأوضاع وتوثيق العقود</h3>
              <p class="text-[11px] text-on-surface-variant leading-relaxed mb-3">
                إثبات الزواجات السابقة غير المصرح بها رسمياً، إصدار صكوك الزواج عبر ناجز ومحاكم الأحوال الشخصية، وحل المعضلات الوثائقية.
              </p>
              <ul class="flex flex-col gap-1.5 mb-4 flex-grow text-[11px] text-on-surface">
                <li class="flex items-start gap-1.5"><span class="material-symbols-outlined text-xs text-secondary shrink-0 mt-0.5">check_circle</span>تصحيح وضع زواج قائم بدون تصريح مسبق.</li>
                <li class="flex items-start gap-1.5"><span class="material-symbols-outlined text-xs text-secondary shrink-0 mt-0.5">check_circle</span>توثيق عقود النكاح الصادرة من قنصليات ومحاكم أجنبية.</li>
                <li class="flex items-start gap-1.5"><span class="material-symbols-outlined text-xs text-secondary shrink-0 mt-0.5">check_circle</span>تسجيل المواليد وإصدار سجل الأسرة للمتزوجين.</li>
                <li class="flex items-start gap-1.5"><span class="material-symbols-outlined text-xs text-secondary shrink-0 mt-0.5">check_circle</span>تمثيل استشاري أمام لجان فحص وتصحيح الزواجات.</li>
              </ul>
              <a href="#apply-and-contact" class="w-full flex items-center justify-center gap-1.5 py-2 rounded-xl bg-surface-container-high text-primary hover:bg-surface-container-highest transition-all font-bold text-xs whitespace-nowrap">
                <span class="material-symbols-outlined text-sm">edit_document</span>
                <span>طلب تصحيح وثيقة</span>
              </a>
            </div>
          </div>
        </div>
      </section>

      <!-- Process Workflow Section -->
      <section class="max-w-7xl mx-auto px-gutter py-space-lg w-full">
        <div class="text-center max-w-2xl mx-auto mb-space-lg">
          <span class="text-[11px] text-secondary font-bold uppercase tracking-wider block mb-1">المنهجية المعتمدة</span>
          <h2 class="text-xl md:text-2xl text-primary font-bold">خطوات سير المعاملة بسلاسة ودقة</h2>
          <p class="text-xs text-on-surface-variant mt-1">
            نتبع مساراً استشارياً وإجرائياً واضحاً يضمن استيفاء جميع المتطلبات من الزيارة الأولى حتى استلام الصك أو التصريح النهائي.
          </p>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-4 gap-space-sm">
          <div class="flex flex-col p-4 rounded-2xl bg-surface-container-lowest shadow-sm border border-secondary/20 relative">
            <div class="flex items-center justify-between mb-2">
              <div class="w-9 h-9 rounded-xl bg-surface-container text-primary flex items-center justify-center font-bold text-sm">01</div>
              <span class="material-symbols-outlined text-secondary text-xl">folder_shared</span>
            </div>
            <h4 class="text-xs text-primary font-bold mb-1">فحص وتدقيق الملف</h4>
            <p class="text-[11px] text-on-surface-variant leading-relaxed">استلام مستندات الأطراف كاملة وفحصها من قبل المستشار للتأكد من مطابقتها لاشتراطات الإمارة واللائحة التنفيذية.</p>
          </div>

          <div class="flex flex-col p-4 rounded-2xl bg-surface-container-lowest shadow-sm border border-secondary/20 relative">
            <div class="flex items-center justify-between mb-2">
              <div class="w-9 h-9 rounded-xl bg-surface-container text-primary flex items-center justify-center font-bold text-sm">02</div>
              <span class="material-symbols-outlined text-secondary text-xl">draw</span>
            </div>
            <h4 class="text-xs text-primary font-bold mb-1">الصياغة والتجهيز القانوني</h4>
            <p class="text-[11px] text-on-surface-variant leading-relaxed">إعداد المعاريض الرسمية والخطابات الموجهة لجهات الاختصاص وإرفاق التقارير الطبية والمسوغات المطلوبة بدقة تامة.</p>
          </div>

          <div class="flex flex-col p-4 rounded-2xl bg-surface-container-lowest shadow-sm border border-secondary/20 relative">
            <div class="flex items-center justify-between mb-2">
              <div class="w-9 h-9 rounded-xl bg-secondary-container text-on-secondary-fixed flex items-center justify-center font-bold text-sm">03</div>
              <span class="material-symbols-outlined text-secondary text-xl">account_balance</span>
            </div>
            <h4 class="text-xs text-primary font-bold mb-1">الرفع والمتابعة الحكومية</h4>
            <p class="text-[11px] text-on-surface-variant leading-relaxed">تقييد المعاملة ومتابعتها عبر منصات الوزارة واللجان المختصة (الداخلية، إمارة المنطقة، الأحوال والعدل) خطوة بخطوة.</p>
          </div>

          <div class="flex flex-col p-4 rounded-2xl bg-surface-container-lowest shadow-sm border border-secondary/20 relative">
            <div class="flex items-center justify-between mb-2">
              <div class="w-9 h-9 rounded-xl bg-primary text-on-primary flex items-center justify-center font-bold text-sm">04</div>
              <span class="material-symbols-outlined text-secondary-fixed text-xl">verified</span>
            </div>
            <h4 class="text-xs text-primary font-bold mb-1">صدور الموافقة والتوثيق</h4>
            <p class="text-[11px] text-on-surface-variant leading-relaxed">استلام إشعار صدور الموافقة الرسمية، توثيق العقد عبر المأذون أو المحكمة، وتسليم الملف المعتمد للعميل بكل سلاسة.</p>
          </div>
        </div>
      </section>

      <!-- Instant Eligibility Banner -->
      <section class="max-w-7xl mx-auto px-gutter py-space-lg w-full">
        <div class="p-space-lg rounded-3xl bg-primary text-on-primary shadow-xl flex flex-col lg:flex-row items-center justify-between gap-space-lg border-2 border-secondary">
          <div class="flex flex-col gap-1 max-w-xl text-right">
            <div class="flex items-center gap-2 text-secondary-fixed">
              <span class="material-symbols-outlined text-lg">checklist</span>
              <span class="text-xs font-bold whitespace-nowrap">التقييم الأولي لجاهزية المعاملة</span>
            </div>
            <h3 class="text-xl text-white font-bold">
              هل تود معرفة مدى مطابقة ملفك للشروط الرسمية قبل البدء؟
            </h3>
            <p class="text-xs text-primary-fixed-dim leading-relaxed">
              أرسل بياناتك الأساسية (نوع المعاملة، بلد الطرف الآخر، صلة القرابة إن وجدت) عبر الواتساب وسيقوم المستشار أبو خالد بفحص الأهلية وتقديم المشورة الفورية.
            </p>
          </div>

          <div class="flex flex-col sm:flex-row items-center gap-2 shrink-0 w-full lg:w-auto">
            <a href="tel:0568922561" class="w-full sm:w-auto flex items-center justify-center gap-1.5 px-4 py-3 rounded-xl bg-surface-container-lowest text-primary hover:bg-surface-container-high transition-colors font-bold text-xs whitespace-nowrap">
              <span class="material-symbols-outlined text-primary text-base">call</span>
              <span dir="ltr">0568922561</span>
            </a>
            <a href="https://wa.me/966568922561?text=%D9%85%D8%B1%D8%AD%D8%A8%D8%A7%20%D8%A3%D8%A8%D9%88%20%D8%AE%D8%A7%D9%84%D8%AF%D8%8C%20%D8%A3%D8%B1%D8%BA%D8%A8%20%D9%81%D9%8A%20%D9%81%D8%AD%D8%B5%20%D8%A3%D9%87%D9%84%D9%8A%D8%A9%20%D9%85%D9%84%D9%81%20%D9%85%D8%B9%D8%A7%D9%85%D9%84%D8%AA%D9%8A" target="_blank" rel="noopener noreferrer" class="w-full sm:w-auto flex items-center justify-center gap-1.5 px-4 py-3 rounded-xl bg-secondary-container text-on-secondary-fixed font-bold text-xs shadow-md hover:bg-secondary-fixed transition-all whitespace-nowrap">
              <span class="material-symbols-outlined text-base">send</span>
              <span>إرسال الملف للتقييم المجاني</span>
            </a>
          </div>
        </div>
      </section>
    `;
  },

  bindHomeEvents() {},

  // ==========================================
  // 2. ABOUT US VIEW
  // ==========================================
  renderAbout() {
    return `
      <!-- 1. SOVEREIGN HERO SECTION -->
      <section class="relative w-full overflow-hidden bg-primary text-on-primary py-space-lg md:py-space-xl">
        <div class="max-w-7xl mx-auto px-gutter relative z-10">
          <div class="grid grid-cols-1 lg:grid-cols-12 gap-space-lg items-center">
            <div class="lg:col-span-7 flex flex-col gap-space-sm text-right">
              <div class="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-surface-container-lowest/10 w-fit text-secondary-fixed text-xs font-bold whitespace-nowrap">
                <span class="material-symbols-outlined text-sm" style="font-variation-settings: 'FILL' 1;">workspace_premium</span>
                <span>الريادة المؤسسية في الإجراءات والمعاملات السيادية</span>
              </div>
              <h1 class="text-2xl md:text-4xl text-white font-bold leading-tight">
                الوسام الذهبي.. <br>
                <span class="text-secondary-fixed">روّاد الاستشارات النظامية</span> وتسهيل المعاملات السيادية
              </h1>
              <p class="text-xs md:text-sm text-primary-fixed-dim leading-relaxed">
                مسيرة تفوق وخبرة نوعية تمتد لأكثر من 15 عاماً في خدمة المواطنين، المقيمين، ونخبة الكفاءات وأصحاب الخبرات التخصصية، بإشراف المستشار التنفيذي "أبو خالد". نعمل بتفانٍ لتذليل العقبات الإجرائية وإنهاء المعاملات وفق أرفع معايير الحوكمة والنظم السعودية المرعية.
              </p>
              <div class="flex flex-wrap items-center gap-2 pt-2">
                <a href="https://wa.me/966568922561?text=%D8%A7%D9%84%D8%B3%D9%84%D8%A7%D9%85%20%D8%B9%D9%84%D9%8A%D9%83%D9%85%D8%8C%20%D8%A3%D8%B1%D8%BA%D8%A8%20%D9%81%D9%8A%20%D8%A8%D8%AF%D8%A1%20%D8%A7%D8%B3%D8%AA%D8%B4%D8%A7%D8%B1%D8%A9%20%D8%AE%D8%A7%D8%B5%D8%A9" target="_blank" rel="noopener noreferrer" class="flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-secondary-container text-on-secondary-fixed font-bold text-xs hover:bg-secondary-fixed transition-all shadow-md whitespace-nowrap">
                  <span class="material-symbols-outlined text-base">chat</span>
                  <span>بدء استشارة سرية ومباشرة</span>
                </a>
                <a href="tel:0568922561" class="flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-surface-container-lowest/10 text-white hover:bg-surface-container-lowest/20 transition-all font-bold text-xs whitespace-nowrap">
                  <span class="material-symbols-outlined text-base text-secondary-fixed">call</span>
                  <span>اتصال مباشر: 0568922561</span>
                </a>
              </div>
            </div>
            <div class="lg:col-span-5 flex flex-col items-center justify-center">
              <div class="w-full max-w-sm bg-primary-container/90 rounded-2xl p-space-md shadow-xl border-2 border-secondary/30 flex flex-col items-center text-center">
                <div class="w-24 h-24 rounded-full bg-primary flex items-center justify-center mb-2 shadow-inner border-2 border-secondary">
                  <span class="material-symbols-outlined text-secondary-fixed text-4xl" style="font-variation-settings: 'FILL' 1;">shield_person</span>
                </div>
                <span class="text-base text-secondary-fixed font-bold">مكتب الوسام الذهبي</span>
                <span class="text-[11px] text-surface-container-low mb-3">للخدمات العامة وتصاريح وتوثيق الزواج والتجنيس</span>
                <div class="w-full bg-primary/80 rounded-xl p-2.5 flex justify-around items-center border border-secondary/20">
                  <div class="flex flex-col items-center whitespace-nowrap">
                    <span class="text-sm text-secondary-fixed font-bold">100%</span>
                    <span class="text-[10px] text-primary-fixed">مسار نظامي</span>
                  </div>
                  <div class="h-6 w-px bg-surface-container-highest/20"></div>
                  <div class="flex flex-col items-center whitespace-nowrap">
                    <span class="text-sm text-secondary-fixed font-bold">+15</span>
                    <span class="text-[10px] text-primary-fixed">عاماً خبرة</span>
                  </div>
                  <div class="h-6 w-px bg-surface-container-highest/20"></div>
                  <div class="flex flex-col items-center whitespace-nowrap">
                    <span class="text-sm text-secondary-fixed font-bold">VIP</span>
                    <span class="text-[10px] text-primary-fixed">عناية خاصة</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- 2. KEY PERFORMANCE METRICS BENTO ROW -->
      <section class="w-full py-space-md bg-surface-container-low border-b border-secondary/20">
        <div class="max-w-7xl mx-auto px-gutter">
          <div class="grid grid-cols-2 md:grid-cols-5 gap-space-xs">
            <div class="p-3 rounded-xl bg-surface-container-lowest shadow-sm flex flex-col items-center text-center border border-secondary/20 whitespace-nowrap">
              <span class="material-symbols-outlined text-secondary text-2xl mb-1">history_edu</span>
              <span class="text-lg text-primary font-bold">+15</span>
              <span class="text-xs text-on-surface font-semibold">عاماً خبرة معتمدة</span>
              <span class="text-[10px] text-on-surface-variant">في اللوائح والأوامر السامية</span>
            </div>
            <div class="p-3 rounded-xl bg-surface-container-lowest shadow-sm flex flex-col items-center text-center border border-secondary/20 whitespace-nowrap">
              <span class="material-symbols-outlined text-secondary text-2xl mb-1">task_alt</span>
              <span class="text-lg text-primary font-bold">+3,500</span>
              <span class="text-xs text-on-surface font-semibold">معاملة منجزة بنجاح</span>
              <span class="text-[10px] text-on-surface-variant">في شتى إمارات المملكة</span>
            </div>
            <div class="p-3 rounded-xl bg-surface-container-lowest shadow-sm flex flex-col items-center text-center border border-secondary/20 whitespace-nowrap">
              <span class="material-symbols-outlined text-secondary text-2xl mb-1">percent</span>
              <span class="text-lg text-primary font-bold">99.4%</span>
              <span class="text-xs text-on-surface font-semibold">نسبة القبول والموافقة</span>
              <span class="text-[10px] text-on-surface-variant">لدقة دراسة الشروط مسبقاً</span>
            </div>
            <div class="p-3 rounded-xl bg-surface-container-lowest shadow-sm flex flex-col items-center text-center border border-secondary/20 whitespace-nowrap">
              <span class="material-symbols-outlined text-secondary text-2xl mb-1">gavel</span>
              <span class="text-lg text-primary font-bold">100%</span>
              <span class="text-xs text-on-surface font-semibold">التزام بالأنظمة</span>
              <span class="text-[10px] text-on-surface-variant">إشراف قانوني كامل</span>
            </div>
            <div class="col-span-2 md:col-span-1 p-3 rounded-xl bg-surface-container-lowest shadow-sm flex flex-col items-center text-center border border-secondary/20 whitespace-nowrap">
              <span class="material-symbols-outlined text-secondary text-2xl mb-1">enhanced_encryption</span>
              <span class="text-lg text-primary font-bold">سرية تامة</span>
              <span class="text-xs text-on-surface font-semibold">حماية بيانات الأسرة</span>
              <span class="text-[10px] text-on-surface-variant">ميثاق شرف مهني صارم</span>
            </div>
          </div>
        </div>
      </section>

      <!-- 3. VISION, MISSION & VALUES GRID -->
      <section class="max-w-7xl mx-auto px-gutter py-space-lg w-full">
        <div class="text-center max-w-2xl mx-auto mb-space-md">
          <span class="text-[11px] text-secondary font-bold uppercase tracking-wider block mb-1">ركائز هويتنا المؤسسية</span>
          <h2 class="text-xl md:text-2xl text-primary font-bold">رؤيتنا، رسالتنا، ومنظومة قيمنا الراسخة</h2>
          <p class="text-xs text-on-surface-variant mt-1">نبني عملنا الاستشاري على أطر تجمع بين عمق الخبرة القانونية وسرعة الأداء الإداري.</p>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-space-md mb-space-md">
          <div class="p-4 rounded-2xl bg-surface-container-lowest shadow-sm border border-secondary/20 flex flex-col gap-2 text-right relative overflow-hidden">
            <div class="w-9 h-9 rounded-xl bg-primary text-secondary-fixed flex items-center justify-center font-bold text-sm">
              <span class="material-symbols-outlined text-xl" style="font-variation-settings: 'FILL' 1;">visibility</span>
            </div>
            <h3 class="font-bold text-base text-primary">رؤيتنا المؤسسية</h3>
            <p class="text-xs text-on-surface-variant leading-relaxed">
              أن نكون المرجع الاستشاري الأول والأكثر موثوقية في المملكة العربية السعودية في تيسير إجراءات معاملات التجنيس، تصاريح وتوثيق الزواج، والتوجيه القانوني السليم، مساهمين بفاعلية في استقرار الأسر وتمكين الكفاءات النوعية ضمن بيئة نظامية نموذجية.
            </p>
          </div>

          <div class="p-4 rounded-2xl bg-surface-container-lowest shadow-sm border border-secondary/20 flex flex-col gap-2 text-right relative overflow-hidden">
            <div class="w-9 h-9 rounded-xl bg-secondary-container text-on-secondary-fixed flex items-center justify-center font-bold text-sm">
              <span class="material-symbols-outlined text-xl" style="font-variation-settings: 'FILL' 1;">rocket_launch</span>
            </div>
            <h3 class="font-bold text-base text-primary">رسالتنا الاستشارية</h3>
            <p class="text-xs text-on-surface-variant leading-relaxed">
              تقديم حلول استشارية وإجرائية دقيقة، سريعة، ومبتكرة تختصر التعقيدات وترفع الأعباء البيروقراطية عن المواطنين والمقيمين. نلتزم باختصار زمن المعاملات أمام إمارات المناطق، وزارة الداخلية، وكالة الأحوال المدنية، والديوان الملكي.
            </p>
          </div>
        </div>

        <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-space-xs">
          <div class="p-3 rounded-xl bg-surface-container-low border border-outline-variant/30 flex flex-col gap-1 text-right">
            <span class="material-symbols-outlined text-secondary text-xl">balance</span>
            <span class="font-bold text-xs text-primary">النزاهة والشرعية النظامية</span>
            <p class="text-[11px] text-on-surface-variant leading-relaxed">التزام مطلق بالقنوات الرسمية والأنظمة الوزارية المعتمدة بلا أدنى تجاوز.</p>
          </div>
          <div class="p-3 rounded-xl bg-surface-container-low border border-outline-variant/30 flex flex-col gap-1 text-right">
            <span class="material-symbols-outlined text-secondary text-xl">shield</span>
            <span class="font-bold text-xs text-primary">السرية التامة للبيانات</span>
            <p class="text-[11px] text-on-surface-variant leading-relaxed">معاملة جميع الوثائق والبيانات الشخصية بسرية بالغة وفق تشفير صارم.</p>
          </div>
          <div class="p-3 rounded-xl bg-surface-container-low border border-outline-variant/30 flex flex-col gap-1 text-right">
            <span class="material-symbols-outlined text-secondary text-xl">fact_check</span>
            <span class="font-bold text-xs text-primary">الدقة واحتساب النقاط</span>
            <p class="text-[11px] text-on-surface-variant leading-relaxed">فحص أوراق المعاملة وتدقيق اشتراطات اللائحة بدقة متناهية وحساب النقاط.</p>
          </div>
          <div class="p-3 rounded-xl bg-surface-container-low border border-outline-variant/30 flex flex-col gap-1 text-right">
            <span class="material-symbols-outlined text-secondary text-xl">speed</span>
            <span class="font-bold text-xs text-primary">المتابعة الميدانية الحثيثة</span>
            <p class="text-[11px] text-on-surface-variant leading-relaxed">فريق مختص يتابع المعاملات عبر المنصات الإدارية المعتمدة والتواصل الميداني.</p>
          </div>
        </div>
      </section>

      <!-- 4. EXECUTIVE LEADERSHIP & MENTOR BIOGRAPHY -->
      <section class="w-full bg-surface-container-low py-space-lg">
        <div class="max-w-7xl mx-auto px-gutter">
          <div class="p-space-lg rounded-3xl bg-surface-container-lowest shadow-md border-2 border-secondary/30 grid grid-cols-1 lg:grid-cols-12 gap-space-md items-center">
            <div class="lg:col-span-5 relative rounded-2xl overflow-hidden shadow-lg aspect-[4/3] border border-secondary/30">
              <img src="/assets/images/saudi_citizenship_and_naturalization_papers_consultation_desk_saudi_passport/screen.png" alt="المستشار أبو خالد" class="w-full h-full object-cover">
              <div class="absolute inset-0 bg-gradient-to-t from-primary/90 via-primary/30 to-transparent"></div>
              <div class="absolute bottom-3 right-3 left-3 p-3 rounded-xl bg-surface-container-lowest/95 backdrop-blur-sm text-right">
                <span class="font-bold text-sm text-primary block">المستشار / أبو خالد</span>
                <span class="text-[11px] text-secondary font-semibold">المشرف العام ومؤسس مكتب الوسام الذهبي</span>
              </div>
            </div>

            <div class="lg:col-span-7 flex flex-col gap-space-xs text-right">
              <div class="flex items-center gap-1.5 text-secondary text-xs font-bold">
                <span class="material-symbols-outlined text-base">format_quote</span>
                <span>كلمة المشرف العام والمستشار التنفيذي</span>
              </div>
              <h3 class="text-base md:text-xl text-primary font-bold leading-snug">
                "نؤمن بأن كل معاملة زواج أو تجنيس تمثل استقراراً راسخاً لأسرة وبناءً لمستقبل وطن"
              </h3>
              <p class="text-xs text-on-surface-variant leading-relaxed">
                منذ أن انطلقنا في مكتب الوسام الذهبي، جعلنا غايتنا الأسمى إرساء معيار غير مسبوق في تسيير المعاملات المدنية والقانونية الحساسة. إن قضايا الأحوال الشخصية وتصاريح الزواج من الخارج أو الداخل، وكذلك معاملات منح الجنسية السعودية، ليست مجرد نماذج ورقية بل قرارات ترتبط باستقرار العائلات.
              </p>
              <div class="pt-2 flex flex-wrap items-center justify-between gap-2 border-t border-surface-container-high">
                <div class="flex items-center gap-2">
                  <div class="w-8 h-8 rounded-full bg-secondary-container text-on-secondary-fixed flex items-center justify-center font-bold text-xs">خ</div>
                  <div class="flex flex-col text-right">
                    <span class="text-xs font-bold text-primary">خالد بن فهد (أبو خالد)</span>
                    <span class="text-[10px] text-on-surface-variant">مستشار الإجراءات والمعاملات السيادية</span>
                  </div>
                </div>
                <a href="https://wa.me/966568922561?text=%D9%85%D8%B1%D8%AD%D8%A8%D8%A7%20%D8%A3%D8%A8%D9%88%20%D8%AE%D8%A7%D9%84%D8%AF%D8%8C%20%D8%A3%D8%B1%D8%BA%D8%A8%20%D9%81%D9%8A%20%D8%A7%D9%84%D8%AA%D9%88%D8%A7%D8%B5%D9%84%20%D8%A7%D9%84%D9%85%D8%A8%D8%A7%D8%B4%D8%B1" target="_blank" rel="noopener noreferrer" class="px-3.5 py-1.5 rounded-xl bg-secondary-container text-on-secondary-fixed font-bold text-xs hover:bg-secondary-fixed transition-colors flex items-center gap-1 whitespace-nowrap">
                  <span class="material-symbols-outlined text-sm">chat</span>
                  <span>تحدث مباشرة مع أبو خالد</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- 5. VALUE PROPOSITION COMPARISON TABLE -->
      <section class="max-w-7xl mx-auto px-gutter py-space-lg w-full">
        <div class="text-center max-w-2xl mx-auto mb-space-md">
          <span class="text-[11px] text-secondary font-bold uppercase tracking-wider block mb-1">الفارق في الأداء</span>
          <h2 class="text-xl md:text-2xl text-primary font-bold">لماذا يفضل المتعاملون اختيار مكتب الوسام الذهبي؟</h2>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-space-md">
          <div class="p-4 rounded-2xl bg-surface-container-lowest shadow-sm border border-secondary/20 flex flex-col gap-2 text-right">
            <div class="flex items-center justify-between border-b border-surface-container-high pb-2">
              <span class="font-bold text-sm text-primary flex items-center gap-1.5">
                <span class="material-symbols-outlined text-secondary text-lg">verified</span>
                معايير مكتب الوسام الذهبي
              </span>
              <span class="px-2.5 py-0.5 rounded-full bg-primary text-secondary-fixed text-[10px] font-bold">الأداء المعتمد</span>
            </div>
            <ul class="flex flex-col gap-2 text-xs text-on-surface pt-1">
              <li class="flex items-start gap-1.5"><span class="material-symbols-outlined text-sm text-secondary shrink-0 mt-0.5">check_circle</span><strong>فحص أولي مجاني:</strong> تقييم إمكانية استيفاء الشروط وحساب النقاط مسبقاً.</li>
              <li class="flex items-start gap-1.5"><span class="material-symbols-outlined text-sm text-secondary shrink-0 mt-0.5">check_circle</span><strong>وضوح وتوثيق:</strong> اتفاق شفاف بدون مصاريف مستترة أو وعود زائفة.</li>
              <li class="flex items-start gap-1.5"><span class="material-symbols-outlined text-sm text-secondary shrink-0 mt-0.5">check_circle</span><strong>متابعة ميدانية:</strong> فريق يتابع المعاملة يومياً في أنظمة الوزارات والإمارات.</li>
              <li class="flex items-start gap-1.5"><span class="material-symbols-outlined text-sm text-secondary shrink-0 mt-0.5">check_circle</span><strong>سرية مطلقة:</strong> أعلى درجات السرية في تداول بيانات النسب والوثائق.</li>
            </ul>
          </div>

          <div class="p-4 rounded-2xl bg-surface-container-low shadow-sm border border-outline-variant/30 flex flex-col gap-2 text-right opacity-90">
            <div class="flex items-center justify-between border-b border-outline-variant/30 pb-2">
              <span class="font-bold text-sm text-on-surface flex items-center gap-1.5">
                <span class="material-symbols-outlined text-error text-lg">warning</span>
                التقديم الفردي أو غير المتخصص
              </span>
              <span class="px-2.5 py-0.5 rounded-full bg-surface-container-high text-on-surface-variant text-[10px] font-semibold">مخاطر التعثر</span>
            </div>
            <ul class="flex flex-col gap-2 text-xs text-on-surface-variant pt-1">
              <li class="flex items-start gap-1.5"><span class="material-symbols-outlined text-sm text-error shrink-0 mt-0.5">cancel</span><strong>خطر الرفض والحفظ:</strong> بسبب نقص المستندات أو صياغة المعروض بشكل خاطئ.</li>
              <li class="flex items-start gap-1.5"><span class="material-symbols-outlined text-sm text-error shrink-0 mt-0.5">cancel</span><strong>إهدار الوقت:</strong> انتظار شهور طويلة في مراجعات روتينية دون دراية بأسباب التأخير.</li>
              <li class="flex items-start gap-1.5"><span class="material-symbols-outlined text-sm text-error shrink-0 mt-0.5">cancel</span><strong>غياب الدعم:</strong> عدم وجود متابعة ميدانية أو أرقام قيد موثقة.</li>
              <li class="flex items-start gap-1.5"><span class="material-symbols-outlined text-sm text-error shrink-0 mt-0.5">cancel</span><strong>المصاريف العشوائية:</strong> تكاليف غير محددة دون ضمانات نظامية قطعية.</li>
            </ul>
          </div>
        </div>
      </section>
    `;
  },

  bindHomeEvents() {
    if (window._heroSliderInterval) {
      clearInterval(window._heroSliderInterval);
      window._heroSliderInterval = null;
    }

    const slides = document.querySelectorAll('[data-hero-slide]');
    const dots = document.querySelectorAll('[data-hero-dot]');
    if (slides.length <= 1) return;

    let currentSlide = 0;
    const showSlide = (index) => {
      slides.forEach((slide, i) => {
        if (i === index) {
          slide.classList.remove('opacity-0', 'z-0');
          slide.classList.add('opacity-65', 'z-10');
        } else {
          slide.classList.remove('opacity-65', 'z-10');
          slide.classList.add('opacity-0', 'z-0');
        }
      });
      dots.forEach((dot, i) => {
        if (i === index) {
          dot.classList.remove('bg-white/40', 'w-2.5');
          dot.classList.add('bg-secondary-fixed', 'w-6');
        } else {
          dot.classList.remove('bg-secondary-fixed', 'w-6');
          dot.classList.add('bg-white/40', 'w-2.5');
        }
      });
      currentSlide = index;
    };

    dots.forEach((dot, idx) => {
      dot.addEventListener('click', () => {
        showSlide(idx);
      });
    });

    window._heroSliderInterval = setInterval(() => {
      let nextSlide = (currentSlide + 1) % slides.length;
      showSlide(nextSlide);
    }, 5000);
  },

  // ==========================================
  // 3. CITIZENSHIP SERVICES & CALCULATOR VIEW
  // ==========================================
  renderCitizenship() {
    return `
      <!-- Sovereign Executive Hero Header for Citizenship -->
      <section class="relative w-full bg-primary text-on-primary py-space-xl md:py-16 px-gutter overflow-hidden">
        <div class="absolute inset-0 z-0 opacity-55 pointer-events-none">
          <img src="/uploads/citizenship_passport_desk.jpg" alt="خلفية استشارات التجنيس" class="w-full h-full object-cover">
          <div class="absolute inset-0 bg-gradient-to-t from-primary/85 via-primary/55 to-primary/30"></div>
        </div>

        <div class="relative z-10 max-w-7xl mx-auto flex flex-col lg:flex-row items-center justify-between gap-space-lg">
          <div class="flex flex-col gap-space-xs max-w-3xl text-right">
            <div class="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-secondary-container text-on-secondary-fixed font-bold text-xs w-fit shadow-md whitespace-nowrap">
              <span class="material-symbols-outlined text-sm text-secondary-dark font-bold">workspace_premium</span>
              <span>شعبة شؤون الجنسية والتوثيق السيادي 1446هـ</span>
            </div>
            <h1 class="text-2xl md:text-4xl text-white font-bold leading-tight tracking-tight">
              خدمات ودراسة معاملات التجنيس ونظام الجنسية العربية السعودية
            </h1>
            <p class="text-xs md:text-sm text-primary-fixed-dim leading-relaxed">
              تجهيز ودراسة ملفات التقديم لجميع الفئات المشمولة بنظام الجنسية ولائحته التنفيذية (المواد 8، 9، 14، 16) والأوامر السامية الخاصة بتجنيس الكفاءات والعلماء والمستثمرين، مع متابعة دقيقة ومستمرة أمام الأحوال المدنية ووزارة الداخلية.
            </p>
            <div class="flex flex-wrap items-center gap-3 pt-2">
              <a href="#citizenship-calculator" class="px-5 py-3 rounded-xl bg-secondary-container text-on-secondary-fixed font-bold text-xs shadow-lg hover:bg-secondary-fixed transition-all flex items-center gap-1.5 whitespace-nowrap">
                <span class="material-symbols-outlined text-base">calculate</span>
                <span>حاسبة نقاط التجنيس (المادة 9)</span>
              </a>
              <a href="https://wa.me/966568922561?text=%D8%A7%D9%84%D8%B3%D9%84%D8%A7%D9%85%20%D8%B9%D9%84%D9%8A%D9%83%D9%85%D8%8C%20%D8%A3%D8%B1%D8%BA%D8%A8%20%D9%81%D9%8A%20%D8%A7%D9%84%D8%A7%D8%B3%D8%AA%D9%81%D8%B3%D8%A7%D8%B1%20%D8%B9%D9%86%20%D9%85%D8%B9%D8%A7%D9%85%D9%84%D8%A7%D8%AA%20%D8%A7%D9%84%D8%AA%D8%AC%D9%86%D9%8A%D8%B3" target="_blank" rel="noopener noreferrer" class="px-5 py-3 rounded-xl bg-surface-container-lowest/15 text-white hover:bg-surface-container-lowest/25 transition-all font-bold text-xs border border-secondary/30 flex items-center gap-1.5 whitespace-nowrap">
                <span class="material-symbols-outlined text-base text-secondary-fixed">chat</span>
                <span>استشارة فورية مع المستشار أبو خالد</span>
              </a>
            </div>
          </div>

          <!-- Feature Display Card -->
          <div class="shrink-0 w-full lg:w-96 relative">
            <div class="rounded-2xl overflow-hidden shadow-2xl border-2 border-secondary/40 bg-surface-container-lowest aspect-[4/3] relative">
              <img src="/uploads/citizenship_passport_desk.jpg" alt="طاولة فحص أوراق التجنيس" class="w-full h-full object-cover">
              <div class="absolute inset-0 bg-gradient-to-t from-primary/90 via-transparent to-transparent"></div>
              <div class="absolute bottom-3 right-3 left-3 p-3 rounded-xl bg-surface-container-lowest/95 backdrop-blur-md shadow-md text-right border border-secondary/20">
                <div class="flex items-center gap-2 mb-1">
                  <span class="material-symbols-outlined text-secondary text-lg">verified_user</span>
                  <span class="text-xs text-primary font-bold">سرية ودقة استشارية فائقة</span>
                </div>
                <p class="text-[10px] text-on-surface-variant">فحص استيفاء الشروط وحساب النقاط مسبقاً لمنع رفض الطلب.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- Interactive Article 9 Points Calculator Module -->
      <section class="max-w-5xl mx-auto px-gutter py-space-lg w-full" id="citizenship-calculator">
        <div class="p-space-lg rounded-3xl bg-surface-container-lowest shadow-xl border-2 border-secondary">
          <div class="flex flex-col md:flex-row md:items-center justify-between gap-2 mb-space-md border-b border-surface-container-high pb-3">
            <div class="text-right">
              <span class="text-[11px] text-secondary font-bold block uppercase tracking-wider">أداة تفاعلية معتمدة 1446هـ</span>
              <h2 class="font-bold text-xl md:text-2xl text-primary mt-0.5">حاسبة نقاط التجنيس (المادة 9 من اللائحة التنفيذية)</h2>
            </div>
            <div class="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-secondary-container text-on-secondary-fixed text-xs font-bold whitespace-nowrap shadow-sm">
              <span class="material-symbols-outlined text-secondary-dark text-sm">verified</span>
              <span>الحد الأدنى للنظر في الطلب: 23 / 33 نقطة</span>
            </div>
          </div>

          <form id="calculatorForm" class="flex flex-col gap-space-md">
            <!-- Parameter 1: Residence Years -->
            <div class="flex flex-col gap-1.5 text-right p-3 rounded-2xl bg-surface-container-low border border-secondary/20">
              <label class="font-bold text-xs md:text-sm text-primary flex items-center justify-between flex-wrap gap-1">
                <span>1. عدد سنوات الإقامة المستمرة النظامية في المملكة:</span>
                <span id="yearsValDisplay" class="text-secondary font-bold text-sm">10 سنوات فأكثر (10 نقاط)</span>
              </label>
              <input type="range" id="calcResidenceYears" min="1" max="15" value="10" class="w-full h-2.5 bg-surface-container-high rounded-lg appearance-none cursor-pointer accent-primary">
              <span class="text-[11px] text-outline">ملاحظة: يشترط وجود إقامة نظامية سارية المفعول دون انقطاع خلاف اللوائح.</span>
            </div>

            <!-- Parameter 2: Qualification -->
            <div class="flex flex-col gap-1.5 text-right p-3 rounded-2xl bg-surface-container-low border border-secondary/20">
              <label class="font-bold text-xs md:text-sm text-primary">2. المؤهل العلمي والتخصص الدراسي المعتمد:</label>
              <select id="calcDegree" class="w-full p-3 rounded-xl bg-surface-container-lowest border border-outline-variant text-xs md:text-sm text-primary font-bold focus:outline-none focus:ring-2 focus:ring-secondary">
                <option value="phd_tech" selected>دكتوراه في الطب أو الهندسة أو التكنولوجيا الدقيقة (13 نقطة)</option>
                <option value="phd_other">دكتوراه في التخصصات العلمية الأخرى (10 نقاط)</option>
                <option value="master">شهادة الماجستير (8 نقاط)</option>
                <option value="bachelor">شهادة البكالوريوس (5 نقاط)</option>
                <option value="none">دبلوم أو ثانوية عامة (0 نقطة)</option>
              </select>
            </div>

            <!-- Parameter 3: Family Ties -->
            <div class="flex flex-col gap-1.5 text-right p-3 rounded-2xl bg-surface-container-low border border-secondary/20">
              <label class="font-bold text-xs md:text-sm text-primary">3. صلات القرابة العائلية (اختر كل ما ينطبق بحالتك):</label>
              <div class="grid grid-cols-1 sm:grid-cols-2 gap-2">
                <label class="flex items-center gap-2 p-3 rounded-xl bg-surface-container-lowest border border-outline-variant cursor-pointer hover:bg-surface-container-high transition-colors whitespace-nowrap">
                  <input type="checkbox" value="mother" class="calc-family w-4 h-4 accent-primary">
                  <span class="text-xs font-bold text-on-surface">الأم سعودية (3 نقاط)</span>
                </label>
                <label class="flex items-center gap-2 p-3 rounded-xl bg-surface-container-lowest border border-outline-variant cursor-pointer hover:bg-surface-container-high transition-colors whitespace-nowrap">
                  <input type="checkbox" value="father" class="calc-family w-4 h-4 accent-primary">
                  <span class="text-xs font-bold text-on-surface">الأب أو والد الزوجة سعودي (3 نقاط)</span>
                </label>
                <label class="flex items-center gap-2 p-3 rounded-xl bg-surface-container-lowest border border-outline-variant cursor-pointer hover:bg-surface-container-high transition-colors whitespace-nowrap">
                  <input type="checkbox" value="spouse" class="calc-family w-4 h-4 accent-primary">
                  <span class="text-xs font-bold text-on-surface">الزوجة سعودية (2 نقطتان)</span>
                </label>
                <label class="flex items-center gap-2 p-3 rounded-xl bg-surface-container-lowest border border-outline-variant cursor-pointer hover:bg-surface-container-high transition-colors whitespace-nowrap">
                  <input type="checkbox" value="children" class="calc-family w-4 h-4 accent-primary">
                  <span class="text-xs font-bold text-on-surface">وجود أبناء وبنات سعوديون (2 نقطتان)</span>
                </label>
              </div>
            </div>

            <!-- Output Score Card -->
            <div id="calculatorResult" class="p-5 rounded-2xl bg-primary text-on-primary flex flex-col md:flex-row items-center justify-between gap-space-md border-2 border-secondary shadow-lg">
              <div class="flex flex-col items-center md:items-start text-center md:text-right">
                <span class="text-xs text-secondary-fixed font-bold">النتيجة التقديرية لمجموع نقاطك:</span>
                <span id="scoreDisplay" class="text-3xl md:text-4xl text-secondary-fixed font-bold mt-1">23 / 33</span>
                <span id="scoreStatusLabel" class="text-xs text-primary-fixed-dim font-bold mt-1">مؤهل لرفع الطلب (تجاوزت الحد الأدنى 23 نقطة)</span>
              </div>
              <div class="shrink-0 w-full md:w-auto">
                <a id="calcApplyBtn" href="https://wa.me/966568922561?text=%D9%85%D8%B1%D8%AD%D8%A8%D8%A7%20%D8%A3%D8%A8%D9%88%20%D8%AE%D8%A7%D9%84%D8%AF%D8%8C%20%D9%82%D9%85%D8%AA%20%D8%A8%D8%AD%D8%B3%D8%A7%D8%A8%20%D9%86%D9%82%D8%A7%D8%B7%D9%8A%20%D9%81%D9%8A%20%D8%A7%D9%84%D8%AA%D8%AC%D9%86%D9%8A%D8%B3%20%D9%88%D8%AD%D8%B6%D9%84%D8%AA%20%D8%B9%D9%84%D9%89%2023%20%D9%86%D9%82%D8%B7%D8%A9" target="_blank" rel="noopener noreferrer" class="w-full flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-secondary-container text-on-secondary-fixed font-bold text-xs hover:bg-secondary-fixed transition-colors shadow-md whitespace-nowrap">
                  <span class="material-symbols-outlined text-base">send</span>
                  <span>إرسال تقرير التقييم المباشر للمستشار أبو خالد</span>
                </a>
              </div>
            </div>
          </form>
        </div>
      </section>

      <!-- Comprehensive Citizenship Pathways Matrix -->
      <section class="max-w-7xl mx-auto px-gutter py-space-lg w-full">
        <div class="text-center max-w-3xl mx-auto mb-space-lg">
          <span class="text-[11px] text-secondary font-bold uppercase tracking-wider block mb-1">المسارات النظامية الشاملة</span>
          <h2 class="text-xl md:text-3xl text-primary font-bold">جميع مسارات التقديم على الجنسية العربية السعودية</h2>
          <p class="text-xs md:text-sm text-on-surface-variant mt-1.5">نقدم توجيهاً قانونياً وإجرائياً متكاملاً لكل حالة وفق اللائحة الرسمية والأوامر السامية.</p>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-space-md">
          <!-- Pathway 1: Rare Competencies & Scientists -->
          <div class="p-5 rounded-2xl bg-surface-container-lowest shadow-sm hover:shadow-md border border-secondary/30 flex flex-col justify-between text-right">
            <div>
              <div class="flex items-center justify-between mb-3">
                <div class="w-10 h-10 rounded-xl bg-primary text-secondary-fixed flex items-center justify-center font-bold">
                  <span class="material-symbols-outlined text-2xl">medical_services</span>
                </div>
                <span class="px-3 py-1 rounded-full bg-secondary-container text-on-secondary-fixed text-[10px] font-bold">الأمر السامي الكريم</span>
              </div>
              <h3 class="font-bold text-base text-primary mb-1.5">تجنيس الكفاءات والعلماء والأطباء</h3>
              <p class="text-xs text-on-surface-variant leading-relaxed mb-4">
                تجهيز ملفات استقطاب العلماء والباحثين والأطباء حاملي الزمالات العالمية في التخصصات النادرة، لإدخالها ضمن مسارات الأوامر السامية الكريمة بتوجيه مباشر.
              </p>
              <div class="p-3 rounded-xl bg-surface-container-low text-xs flex flex-col gap-1.5 mb-4">
                <div class="flex justify-between"><span class="text-outline">الاعتماد:</span><span class="text-primary font-bold">الهيئات المتخصصة</span></div>
                <div class="flex justify-between"><span class="text-outline">أبرز الشروط:</span><span class="text-primary font-bold">التميز العلمي والتخصص الدقيق</span></div>
              </div>
            </div>
            <a href="https://wa.me/966568922561?text=%D8%A3%D8%B1%D8%BA%D8%A8%20%D9%81%D9%8A%20%D8%A7%D8%B3%D8%AA%D8%B4%D8%A7%D8%B1%D8%A9%20%D8%AA%D8%AC%D9%86%D9%8A%D8%B3%20%D9%83%D9%81%D8%A7%D8%A1%D8%A9%20%D8%B7%D8%A8%D9%8A%D8%A9%20%D8%A3%D9%88%20%D8%B9%D9%84%D9%85%D9%8A%D8%A9" target="_blank" rel="noopener noreferrer" class="w-full py-2.5 rounded-xl bg-primary text-on-primary hover:bg-primary-container font-bold text-xs text-center flex items-center justify-center gap-1.5 transition-colors">
              <span class="material-symbols-outlined text-sm text-secondary-fixed">chat</span>
              <span>طلب استشارة الكفاءات</span>
            </a>
          </div>

          <!-- Pathway 2: Investors -->
          <div class="p-5 rounded-2xl bg-surface-container-lowest shadow-sm hover:shadow-md border border-secondary/30 flex flex-col justify-between text-right">
            <div>
              <div class="flex items-center justify-between mb-3">
                <div class="w-10 h-10 rounded-xl bg-primary text-secondary-fixed flex items-center justify-center font-bold">
                  <span class="material-symbols-outlined text-2xl">domain_add</span>
                </div>
                <span class="px-3 py-1 rounded-full bg-secondary-container text-on-secondary-fixed text-[10px] font-bold">الملاءة والاستثمار</span>
              </div>
              <h3 class="font-bold text-base text-primary mb-1.5">تجنيس كبار المستثمرين ورجال الأعمال</h3>
              <p class="text-xs text-on-surface-variant leading-relaxed mb-4">
                إعداد ملفات التجنيس لأصحاب التراخيص الاستثمارية (MISA) ورؤوس الأموال المساهمة في التنمية والتطوير العقاري والصناعي وفق القنوات الرسمية.
              </p>
              <div class="p-3 rounded-xl bg-surface-container-low text-xs flex flex-col gap-1.5 mb-4">
                <div class="flex justify-between"><span class="text-outline">الجهة:</span><span class="text-primary font-bold">لجنة الاستثمار والداخلية</span></div>
                <div class="flex justify-between"><span class="text-outline">المعايير:</span><span class="text-primary font-bold">الأصول والحجم الاستثماري</span></div>
              </div>
            </div>
            <a href="https://wa.me/966568922561?text=%D8%A3%D8%B1%D8%BA%D8%A8%20%D9%81%D9%8A%20%D8%A7%D8%B3%D8%AA%D8%B4%D8%A7%D8%B1%D8%A9%20%D8%AA%D8%AC%D9%86%D9%8A%D8%B3%20%D9%85%D8%B3%D8%AA%D8%AB%D9%85%D8%B1" target="_blank" rel="noopener noreferrer" class="w-full py-2.5 rounded-xl bg-primary text-on-primary hover:bg-primary-container font-bold text-xs text-center flex items-center justify-center gap-1.5 transition-colors">
              <span class="material-symbols-outlined text-sm text-secondary-fixed">chat</span>
              <span>طلب استشارة المستثمرين</span>
            </a>
          </div>

          <!-- Pathway 3: Article 16 Spouse -->
          <div class="p-5 rounded-2xl bg-surface-container-lowest shadow-sm hover:shadow-md border border-secondary/30 flex flex-col justify-between text-right">
            <div>
              <div class="flex items-center justify-between mb-3">
                <div class="w-10 h-10 rounded-xl bg-primary text-secondary-fixed flex items-center justify-center font-bold">
                  <span class="material-symbols-outlined text-2xl">favorite</span>
                </div>
                <span class="px-3 py-1 rounded-full bg-secondary-container text-on-secondary-fixed text-[10px] font-bold">المادة (16)</span>
              </div>
              <h3 class="font-bold text-base text-primary mb-1.5">تجنيس زوجة المواطن السعودي</h3>
              <p class="text-xs text-on-surface-variant leading-relaxed mb-4">
                احتساب ومتابعة النقاط المطلوبة لزوجة المواطن (شرط 17 نقطة كحد أدنى) مع توثيق مدة الزواج، الإقامة، وإنجاب الأبناء ومراجعة الأحوال المدنية.
              </p>
              <div class="p-3 rounded-xl bg-surface-container-low text-xs flex flex-col gap-1.5 mb-4">
                <div class="flex justify-between"><span class="text-outline">الشرط الأساسي:</span><span class="text-primary font-bold">عقد زواج رسمي مسجل</span></div>
                <div class="flex justify-between"><span class="text-outline">النقاط:</span><span class="text-primary font-bold">تجميع 17 نقطة نظامية</span></div>
              </div>
            </div>
            <a href="https://wa.me/966568922561?text=%D8%A3%D8%B1%D8%BA%D8%A8%20%D9%81%D9%8A%20%D8%A7%D8%B3%D8%AA%D8%B4%D8%A7%D8%B1%D8%A9%20%D8%AA%D8%AC%D9%86%D9%8A%D8%B3%20%D8%B2%D9%88%D8%AC%D8%A9%20%D9%85%D9%88%D8%A7%D8%B7%D9%86" target="_blank" rel="noopener noreferrer" class="w-full py-2.5 rounded-xl bg-primary text-on-primary hover:bg-primary-container font-bold text-xs text-center flex items-center justify-center gap-1.5 transition-colors">
              <span class="material-symbols-outlined text-sm text-secondary-fixed">chat</span>
              <span>استشارة تجنيس الزوجة</span>
            </a>
          </div>

          <!-- Pathway 4: Husband of Saudi Citizen -->
          <div class="p-5 rounded-2xl bg-surface-container-lowest shadow-sm hover:shadow-md border border-secondary/30 flex flex-col justify-between text-right">
            <div>
              <div class="flex items-center justify-between mb-3">
                <div class="w-10 h-10 rounded-xl bg-primary text-secondary-fixed flex items-center justify-center font-bold">
                  <span class="material-symbols-outlined text-2xl">supervisor_account</span>
                </div>
                <span class="px-3 py-1 rounded-full bg-secondary-container text-on-secondary-fixed text-[10px] font-bold">المواطنة السعودية</span>
              </div>
              <h3 class="font-bold text-base text-primary mb-1.5">تجنيس زوج المواطنة السعودية</h3>
              <p class="text-xs text-on-surface-variant leading-relaxed mb-4">
                فحص وتدقيق طلب زوج المواطنة مع استيفاء سنوات الإقامة الدائمة، سلامة السجل الجنائي والأمني، وتوفر العمل الشريف مع توثيق الأبناء.
              </p>
              <div class="p-3 rounded-xl bg-surface-container-low text-xs flex flex-col gap-1.5 mb-4">
                <div class="flex justify-between"><span class="text-outline">الإقامة:</span><span class="text-primary font-bold">متصلة وسارية المفعول</span></div>
                <div class="flex justify-between"><span class="text-outline">السجل الأمني:</span><span class="text-primary font-bold">خالٍ من الملاحظات</span></div>
              </div>
            </div>
            <a href="https://wa.me/966568922561?text=%D8%A3%D8%B1%D8%BA%D8%A8%20%D9%81%D9%8A%20%D8%A7%D8%B3%D8%AA%D8%B4%D8%A7%D8%B1%D8%A9%20%D8%AA%D8%AC%D9%86%D9%8A%D8%B3%20%D8%B2%D9%88%D8%AC%20%D9%85%D9%88%D8%A7%D8%B7%D9%86%D8%A9" target="_blank" rel="noopener noreferrer" class="w-full py-2.5 rounded-xl bg-primary text-on-primary hover:bg-primary-container font-bold text-xs text-center flex items-center justify-center gap-1.5 transition-colors">
              <span class="material-symbols-outlined text-sm text-secondary-fixed">chat</span>
              <span>استشارة تجنيس الزوج</span>
            </a>
          </div>

          <!-- Pathway 5: Article 8 Children -->
          <div class="p-5 rounded-2xl bg-surface-container-lowest shadow-sm hover:shadow-md border border-secondary/30 flex flex-col justify-between text-right">
            <div>
              <div class="flex items-center justify-between mb-3">
                <div class="w-10 h-10 rounded-xl bg-primary text-secondary-fixed flex items-center justify-center font-bold">
                  <span class="material-symbols-outlined text-2xl">family_restroom</span>
                </div>
                <span class="px-3 py-1 rounded-full bg-secondary-container text-on-secondary-fixed text-[10px] font-bold">المادة (8)</span>
              </div>
              <h3 class="font-bold text-base text-primary mb-1.5">تجنيس ابنة ومولود المواطنة السعودية</h3>
              <p class="text-xs text-on-surface-variant leading-relaxed mb-4">
                رفع واستكمال إجراءات ملف ابنة أو مولود المواطنة عند بلوغ سن الرشد (18 عاماً) وإثبات الإقامة الدائمة وتوفر المؤهل واللغة العربية.
              </p>
              <div class="p-3 rounded-xl bg-surface-container-low text-xs flex flex-col gap-1.5 mb-4">
                <div class="flex justify-between"><span class="text-outline">النافذة الزمنية:</span><span class="text-primary font-bold">خلال سنة من بلوغ 18</span></div>
                <div class="flex justify-between"><span class="text-outline">الإصدار:</span><span class="text-primary font-bold">عبر الأحوال المدنية</span></div>
              </div>
            </div>
            <a href="https://wa.me/966568922561?text=%D8%A3%D8%B1%D8%BA%D8%A8%20%D9%81%D9%8A%20%D8%A7%D8%B3%D8%AA%D8%B4%D8%A7%D8%B1%D8%A9%20%D8%AA%D8%AC%D9%86%D9%8A%D8%B3%20%D8%A3%D8%A8%D9%86%D8%A7%D8%A1%20%D9%88%D8%A8%D9%86%D8%A7%D8%AA%20%D9%85%D9%88%D8%A7%D8%B7%D9%86%D8%A9" target="_blank" rel="noopener noreferrer" class="w-full py-2.5 rounded-xl bg-primary text-on-primary hover:bg-primary-container font-bold text-xs text-center flex items-center justify-center gap-1.5 transition-colors">
              <span class="material-symbols-outlined text-sm text-secondary-fixed">chat</span>
              <span>استشارة أبناء المواطنة</span>
            </a>
          </div>

          <!-- Pathway 6: Passports & Documents -->
          <div class="p-5 rounded-2xl bg-surface-container-lowest shadow-sm hover:shadow-md border border-secondary/30 flex flex-col justify-between text-right">
            <div>
              <div class="flex items-center justify-between mb-3">
                <div class="w-10 h-10 rounded-xl bg-primary text-secondary-fixed flex items-center justify-center font-bold">
                  <span class="material-symbols-outlined text-2xl">badge</span>
                </div>
                <span class="px-3 py-1 rounded-full bg-secondary-container text-on-secondary-fixed text-[10px] font-bold">الجوازات والأحوال</span>
              </div>
              <h3 class="font-bold text-base text-primary mb-1.5">إصدار وتجديد جواز ووثائق أبناء المواطنة</h3>
              <p class="text-xs text-on-surface-variant leading-relaxed mb-4">
                تسهيل معاملة منح جوازات السفر الخاصة، وتحديث الإقامات الدائمة لأبناء المواطنة وحل مشاكل ربط السجل المدني مع الجوازات.
              </p>
              <div class="p-3 rounded-xl bg-surface-container-low text-xs flex flex-col gap-1.5 mb-4">
                <div class="flex justify-between"><span class="text-outline">الجهة:</span><span class="text-primary font-bold">الجوازات والأحوال المدنية</span></div>
                <div class="flex justify-between"><span class="text-outline">السرعة:</span><span class="text-primary font-bold">متابعة ميدانية حثيثة</span></div>
              </div>
            </div>
            <a href="https://wa.me/966568922561?text=%D8%A3%D8%B1%D8%BA%D8%A8%20%D9%81%D9%8A%20%D9%85%D8%B9%D8%A7%D9%85%D9%84%D8%A9%20%D8%AC%D9%88%D8%A7%D8%B2%D8%A7%D8%AA%20%D9%88%D9%88%D8%AB%D8%A7%D8%A6%D9%82%20%D8%A3%D8%A8%D9%86%D8%A7%D8%A1%20%D9%85%D9%88%D8%A7%D8%B7%D9%86%D8%A9" target="_blank" rel="noopener noreferrer" class="w-full py-2.5 rounded-xl bg-primary text-on-primary hover:bg-primary-container font-bold text-xs text-center flex items-center justify-center gap-1.5 transition-colors">
              <span class="material-symbols-outlined text-sm text-secondary-fixed">chat</span>
              <span>طلب الوثائق والجوازات</span>
            </a>
          </div>
        </div>
      </section>

      <!-- Requirements & Checklist Section -->
      <section class="w-full bg-surface-container-low py-space-lg">
        <div class="max-w-7xl mx-auto px-gutter">
          <div class="p-space-lg rounded-3xl bg-surface-container-lowest shadow-md border-2 border-secondary/20 grid grid-cols-1 lg:grid-cols-12 gap-space-md items-center">
            <div class="lg:col-span-7 text-right flex flex-col gap-2">
              <span class="text-[11px] text-secondary font-bold uppercase tracking-wider block">قائمة التجهيز والتدقيق مسبقاً</span>
              <h2 class="text-xl md:text-2xl text-primary font-bold">المستندات والشهادات المطلوبة لملف التجنيس</h2>
              <p class="text-xs text-on-surface-variant leading-relaxed">
                يقوم مكتب الوسام الذهبي بمراجعة وتصديق كافة الأوراق قبل رفعها للجنة التجنيس لمنع تعثر الملف أو إعادته للاستكمال.
              </p>
              <div class="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-2 text-xs text-on-surface">
                <div class="flex items-center gap-2 p-2.5 rounded-xl bg-surface-container-low border border-secondary/10">
                  <span class="material-symbols-outlined text-secondary text-base">check_circle</span>
                  <span>جواز سفر ساري المفعول مع إقامة نظامية</span>
                </div>
                <div class="flex items-center gap-2 p-2.5 rounded-xl bg-surface-container-low border border-secondary/10">
                  <span class="material-symbols-outlined text-secondary text-base">check_circle</span>
                  <span>شهادة صحيفة السوابق (خلو السجل الجنائي)</span>
                </div>
                <div class="flex items-center gap-2 p-2.5 rounded-xl bg-surface-container-low border border-secondary/10">
                  <span class="material-symbols-outlined text-secondary text-base">check_circle</span>
                  <span>معادلة وتصديق الشهادات العلمية العليا</span>
                </div>
                <div class="flex items-center gap-2 p-2.5 rounded-xl bg-surface-container-low border border-secondary/10">
                  <span class="material-symbols-outlined text-secondary text-base">check_circle</span>
                  <span>إثبات مصدر الدخل والمهنة المشروعة</span>
                </div>
              </div>
            </div>

            <div class="lg:col-span-5 p-5 rounded-2xl bg-primary text-on-primary text-right flex flex-col gap-3 border border-secondary">
              <div class="flex items-center gap-2 text-secondary-fixed font-bold text-sm">
                <span class="material-symbols-outlined text-xl">help</span>
                <span>هل تحتاج مساعدة في حساب النقاط وتجهيز ملفك؟</span>
              </div>
              <p class="text-xs text-primary-fixed-dim leading-relaxed">
                تواصل فوراً مع المستشار <strong>أبو خالد</strong> لفحص الحالة ومراجعة الشروط واستخراج رقم قيد للمعاملة.
              </p>
              <a href="tel:0568922561" class="w-full py-2.5 rounded-xl bg-secondary-container text-on-secondary-fixed font-bold text-xs hover:bg-secondary-fixed transition-colors flex items-center justify-center gap-2 shadow-md">
                <span class="material-symbols-outlined text-base">call</span>
                <span>تحدث مباشرة مع المستشار: 0568922561</span>
              </a>
            </div>
          </div>
        </div>
      </section>
    `;
  },

  bindCalculatorEvents() {
    const yearsInput = document.getElementById('calcResidenceYears');
    const yearsDisplay = document.getElementById('yearsValDisplay');
    const degreeInput = document.getElementById('calcDegree');
    const familyInputs = document.querySelectorAll('.calc-family');

    const updateCalc = () => {
      const years = yearsInput ? yearsInput.value : 10;
      if (yearsDisplay) {
        yearsDisplay.textContent = years >= 10 ? '10 سنوات فأكثر (10 نقاط)' : `${years} سنوات (${years} نقاط)`;
      }

      const degree = degreeInput ? degreeInput.value : 'phd_tech';
      const familyTies = Array.from(familyInputs).filter(i => i.checked).map(i => i.value);

      const result = Store.calculateCitizenshipPoints({ residenceYears: years, degree, familyTies });
      
      const scoreDisp = document.getElementById('scoreDisplay');
      const statusDisp = document.getElementById('scoreStatusLabel');
      const calcApplyBtn = document.getElementById('calcApplyBtn');

      if (scoreDisp) scoreDisp.textContent = `${result.score} / ${result.maxScore}`;
      if (statusDisp) statusDisp.textContent = result.statusLabel;

      if (calcApplyBtn) {
        const msg = encodeURIComponent(`مرحبا أبو خالد، قمت بحساب نقاطي للتجنيس في الموقع وحصلت على (${result.score} نقطة من أصل 33). أرغب في فحص الأوراق والحصول على استشارة.`);
        calcApplyBtn.href = `https://wa.me/966568922561?text=${msg}`;
      }
    };

    if (yearsInput) yearsInput.addEventListener('input', updateCalc);
    if (degreeInput) degreeInput.addEventListener('change', updateCalc);
    familyInputs.forEach(i => i.addEventListener('change', updateCalc));

    updateCalc();
  },

  // ==========================================
  // 4. MARRIAGE PERMITS VIEW
  // ==========================================
  renderMarriage() {
    return `
      <!-- Sovereign Executive Hero Header for Marriage Permits -->
      <section class="relative w-full bg-primary text-on-primary py-space-xl md:py-16 px-gutter overflow-hidden">
        <div class="absolute inset-0 z-0 opacity-55 pointer-events-none">
          <img src="/uploads/marriage_permit_seal.jpg" alt="خلفية تصاريح وتوثيق الزواج" class="w-full h-full object-cover">
          <div class="absolute inset-0 bg-gradient-to-t from-primary/85 via-primary/55 to-primary/30"></div>
        </div>

        <div class="relative z-10 max-w-7xl mx-auto flex flex-col lg:flex-row items-center justify-between gap-space-lg">
          <div class="flex flex-col gap-space-xs max-w-3xl text-right">
            <div class="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-secondary-container text-on-secondary-fixed font-bold text-xs w-fit shadow-md whitespace-nowrap">
              <span class="material-symbols-outlined text-sm text-secondary-dark font-bold">favorite</span>
              <span>معتمد وفق لائحة زواج السعودي بغير سعودية والسعودية بغير سعودي 1446هـ</span>
            </div>
            <h1 class="text-2xl md:text-4xl text-white font-bold leading-tight tracking-tight">
              استخراج تصاريح الزواج وتصحيح الأوضاع وتوثيق عقود النكاح رسمياً
            </h1>
            <p class="text-xs md:text-sm text-primary-fixed-dim leading-relaxed">
              استخراج وإنجاز موافقة تصاريح الزواج من الداخل والخارج لكافة الجنسيات والأوضاع الاجتماعية، وتوثيق عقود النكاح إلكترونياً عبر منصة ناجز، وتصحيح أوضاع الزواجات القائمة وإصدار تأشيرات الاستقدام الفورية.
            </p>
            <div class="flex flex-wrap items-center gap-3 pt-2">
              <a href="https://wa.me/966568922561?text=%D8%A7%D9%84%D8%B3%D9%84%D8%A7%D9%85%20%D8%B9%D9%84%D9%8A%D9%83%D9%85%D8%8C%20%D8%A3%D8%B1%D8%BA%D8%A8%20%D9%81%D9%8A%20%D8%A7%D9%84%D8%A7%D8%B3%D8%AA%D9%81%D8%B3%D8%A7%D8%B1%20%D8%B9%D9%86%20%D8%AA%D8%B5%D8%A7%D8%B1%D9%8A%D8%AD%20%D8%A7%D9%84%D8%B2%D9%88%D8%A7%D8%AC" target="_blank" rel="noopener noreferrer" class="px-5 py-3 rounded-xl bg-secondary-container text-on-secondary-fixed font-bold text-xs shadow-lg hover:bg-secondary-fixed transition-all flex items-center gap-1.5 whitespace-nowrap">
                <span class="material-symbols-outlined text-base">chat</span>
                <span>تقديم المعاملة عبر الواتساب (أبو خالد)</span>
              </a>
              <a href="tel:0568922561" class="px-5 py-3 rounded-xl bg-surface-container-lowest/15 text-white hover:bg-surface-container-lowest/25 transition-all font-bold text-xs border border-secondary/30 flex items-center gap-1.5 whitespace-nowrap">
                <span class="material-symbols-outlined text-base text-secondary-fixed">call</span>
                <span>اتصال مباشر: 0568922561</span>
              </a>
            </div>
          </div>

          <!-- Feature Image Frame -->
          <div class="shrink-0 w-full lg:w-96 relative">
            <div class="rounded-2xl overflow-hidden shadow-2xl border-2 border-secondary/40 bg-surface-container-lowest aspect-[4/3] relative">
              <img src="/uploads/marriage_permit_seal.jpg" alt="وثيقة عقد النكاح وختم التوثيق" class="w-full h-full object-cover">
              <div class="absolute inset-0 bg-gradient-to-t from-primary/90 via-transparent to-transparent"></div>
              <div class="absolute bottom-3 right-3 left-3 p-3 rounded-xl bg-surface-container-lowest/95 backdrop-blur-md shadow-md text-right border border-secondary/20">
                <div class="flex items-center gap-2 mb-1">
                  <span class="material-symbols-outlined text-secondary text-lg">gavel</span>
                  <span class="text-xs text-primary font-bold">توثيق رسمي إلكتروني عبر ناجز</span>
                </div>
                <p class="text-[10px] text-on-surface-variant">متابعة المعاملة أمام الإمارات، الداخلية، والشرطة حتى صدور الموافقة.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- Main Marriage Categories Suite -->
      <section class="max-w-7xl mx-auto px-gutter py-space-lg w-full">
        <div class="text-center max-w-3xl mx-auto mb-space-lg">
          <span class="text-[11px] text-secondary font-bold uppercase tracking-wider block mb-1">حلول شاملة لجميع الحالات</span>
          <h2 class="text-xl md:text-3xl text-primary font-bold">أنواع تصاريح وتوثيق الزواج المتاحة لدى المكتب</h2>
          <p class="text-xs md:text-sm text-on-surface-variant mt-1.5">نختصر التعقيدات الإدارية ونوفر متابعة ميدانية مستمرة لجميع إمارات المناطق.</p>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-space-md">
          <!-- Card M1 -->
          <div class="p-5 rounded-2xl bg-surface-container-lowest shadow-sm hover:shadow-md border border-secondary/30 flex flex-col justify-between text-right">
            <div>
              <div class="flex items-center justify-between mb-3">
                <div class="w-10 h-10 rounded-xl bg-secondary-container text-on-secondary-fixed flex items-center justify-center font-bold">
                  <span class="material-symbols-outlined text-2xl">home_work</span>
                </div>
                <span class="px-3 py-1 rounded-full bg-primary text-secondary-fixed text-[10px] font-bold">داخل المملكة</span>
              </div>
              <h3 class="font-bold text-base text-primary mb-1.5">تصريح زواج سعودي من أجنبية مقيمة</h3>
              <p class="text-xs text-on-surface-variant leading-relaxed mb-4">
                استخراج موافقة إمارة المنطقة ووزارة الداخلية لزواج المواطن من مقيمة داخل المملكة ذات إقامة نظامية وسارية المفعول، وتجهيز الفحص الجيني.
              </p>
              <ul class="text-xs text-on-surface flex flex-col gap-1.5 mb-4">
                <li class="flex items-center gap-1.5"><span class="material-symbols-outlined text-sm text-secondary">check</span>استثناءات سن الزواج (صلة القرابة).</li>
                <li class="flex items-center gap-1.5"><span class="material-symbols-outlined text-sm text-secondary">check</span>إنهاء موافقة الشرطة والأحوال.</li>
              </ul>
            </div>
            <a href="https://wa.me/966568922561?text=%D8%A3%D8%B1%D8%BA%D8%A8%20%D8%A8%D8%AA%D8%B5%D8%B1%D9%8A%D8%AD%20%D8%B2%D9%88%D8%A7%D8%AC%20%D8%B3%D8%B9%D9%88%D8%AF%D9%8A%20%D9%85%D9%86%20%D8%A3%D8%AC%D9%86%D8%A8%D9%8A%D8%A9%20%D9%85%D9%82%D9%8A%D9%85%D8%A9" target="_blank" rel="noopener noreferrer" class="w-full py-2.5 rounded-xl bg-secondary-container text-on-secondary-fixed hover:bg-secondary-fixed font-bold text-xs text-center flex items-center justify-center gap-1.5 transition-colors shadow-sm">
              <span class="material-symbols-outlined text-sm">chat</span>
              <span>طلب تصريح زواج مقيمة</span>
            </a>
          </div>

          <!-- Card M2 -->
          <div class="p-5 rounded-2xl bg-surface-container-lowest shadow-sm hover:shadow-md border border-secondary/30 flex flex-col justify-between text-right">
            <div>
              <div class="flex items-center justify-between mb-3">
                <div class="w-10 h-10 rounded-xl bg-secondary-container text-on-secondary-fixed flex items-center justify-center font-bold">
                  <span class="material-symbols-outlined text-2xl">public</span>
                </div>
                <span class="px-3 py-1 rounded-full bg-primary text-secondary-fixed text-[10px] font-bold">من الخارج</span>
              </div>
              <h3 class="font-bold text-base text-primary mb-1.5">تصريح زواج من الخارج (تصريح مفتوح)</h3>
              <p class="text-xs text-on-surface-variant leading-relaxed mb-4">
                استخراج موافقة الزواج الرسمية من كافة الدول العربية والأجنبية بنظام التصريح المفتوح، وإحالة الملف لسفارات المملكة بالخارج لعقد القران.
              </p>
              <ul class="text-xs text-on-surface flex flex-col gap-1.5 mb-4">
                <li class="flex items-center gap-1.5"><span class="material-symbols-outlined text-sm text-secondary">check</span>تسهيل المعالجة الأمنيـة والقيد.</li>
                <li class="flex items-center gap-1.5"><span class="material-symbols-outlined text-sm text-secondary">check</span>توثيق صك العقد عبر الخارجية وناجز.</li>
              </ul>
            </div>
            <a href="https://wa.me/966568922561?text=%D8%A3%D8%B1%D8%BA%D8%A8%20%D8%A8%D8%A7%D8%B3%D8%AA%D8%AE%D8%B1%D8%A7%D8%AC%20%D8%AA%D8%B5%D8%B1%D9%8A%D8%AD%20%D8%B2%D9%88%D8%A7%D8%AC%20%D9%85%D9%86%20%D8%A7%D9%84%D8%AE%D8%A7%D8%B1%D8%AC" target="_blank" rel="noopener noreferrer" class="w-full py-2.5 rounded-xl bg-secondary-container text-on-secondary-fixed hover:bg-secondary-fixed font-bold text-xs text-center flex items-center justify-center gap-1.5 transition-colors shadow-sm">
              <span class="material-symbols-outlined text-sm">chat</span>
              <span>طلب تصريح الخارج المفتوح</span>
            </a>
          </div>

          <!-- Card M3 -->
          <div class="p-5 rounded-2xl bg-surface-container-lowest shadow-sm hover:shadow-md border border-secondary/30 flex flex-col justify-between text-right">
            <div>
              <div class="flex items-center justify-between mb-3">
                <div class="w-10 h-10 rounded-xl bg-secondary-container text-on-secondary-fixed flex items-center justify-center font-bold">
                  <span class="material-symbols-outlined text-2xl">handshake</span>
                </div>
                <span class="px-3 py-1 rounded-full bg-primary text-secondary-fixed text-[10px] font-bold">المواطنات</span>
              </div>
              <h3 class="font-bold text-base text-primary mb-1.5">تصريح زواج مواطنة سعودية من أجنبي</h3>
              <p class="text-xs text-on-surface-variant leading-relaxed mb-4">
                تجهيز ملف زواج المواطنة من غير سعودي (مقيم أو خارجي)، وتدقيق شرط السكن والدخل وسلامة السجل ومتابعة اللجنة المختصة.
              </p>
              <ul class="text-xs text-on-surface flex flex-col gap-1.5 mb-4">
                <li class="flex items-center gap-1.5"><span class="material-symbols-outlined text-sm text-secondary">check</span>إثبات الدخل المالي وتوفير السكن.</li>
                <li class="flex items-center gap-1.5"><span class="material-symbols-outlined text-sm text-secondary">check</span>موافقة الإمارة والداخلية الرسمية.</li>
              </ul>
            </div>
            <a href="https://wa.me/966568922561?text=%D8%A3%D8%B1%D8%BA%D8%A8%20%D8%A8%D8%AA%D8%B5%D8%B1%D9%8A%D8%AD%20%D8%B2%D9%88%D8%A7%D8%AC%20%D9%85%D9%88%D8%A7%D8%B7%D9%86%D8%A9%20%D9%85%D9%86%20%D8%A3%D8%AC%D9%86%D8%A8%D9%8A" target="_blank" rel="noopener noreferrer" class="w-full py-2.5 rounded-xl bg-secondary-container text-on-secondary-fixed hover:bg-secondary-fixed font-bold text-xs text-center flex items-center justify-center gap-1.5 transition-colors shadow-sm">
              <span class="material-symbols-outlined text-sm">chat</span>
              <span>طلب زواج مواطنة من أجنبي</span>
            </a>
          </div>

          <!-- Card M4 -->
          <div class="p-5 rounded-2xl bg-surface-container-lowest shadow-sm hover:shadow-md border border-secondary/30 flex flex-col justify-between text-right">
            <div>
              <div class="flex items-center justify-between mb-3">
                <div class="w-10 h-10 rounded-xl bg-secondary-container text-on-secondary-fixed flex items-center justify-center font-bold">
                  <span class="material-symbols-outlined text-2xl">published_with_changes</span>
                </div>
                <span class="px-3 py-1 rounded-full bg-primary text-secondary-fixed text-[10px] font-bold">تصحيح الوضع</span>
              </div>
              <h3 class="font-bold text-base text-primary mb-1.5">تصحيح وضع زواج قائم بدون تصريح مسبق</h3>
              <p class="text-xs text-on-surface-variant leading-relaxed mb-4">
                صياغة الاسترحامات والالتماسات القانونية الرسمية لمعالجة الزواجات المنعقدة سابقاً دون تصريح مسبق، وتثبيت العقد وإضافة الأبناء.
              </p>
              <ul class="text-xs text-on-surface flex flex-col gap-1.5 mb-4">
                <li class="flex items-center gap-1.5"><span class="material-symbols-outlined text-sm text-secondary">check</span>معالجة وجود أطفال ومواليد.</li>
                <li class="flex items-center gap-1.5"><span class="material-symbols-outlined text-sm text-secondary">check</span>صياغة التماسات الإمارة والديوان.</li>
              </ul>
            </div>
            <a href="https://wa.me/966568922561?text=%D8%A3%D8%B1%D8%BA%D8%A8%20%D8%A8%D8%AA%D8%B5%DD8%AD%D9%8A%D8%AD%20%D9%88%D8%B6%D8%B9%20%D8%B2%D9%88%D8%A7%D8%AC%20%D9%82%D8%A7%D8%A6%D9%85%20%D8%A8%D8%AF%D9%88%D9%8BD%20%D8%AA%D8%B5%D8%B1%D9%8A%D8%AD" target="_blank" rel="noopener noreferrer" class="w-full py-2.5 rounded-xl bg-secondary-container text-on-secondary-fixed hover:bg-secondary-fixed font-bold text-xs text-center flex items-center justify-center gap-1.5 transition-colors shadow-sm">
              <span class="material-symbols-outlined text-sm">chat</span>
              <span>طلب تصحيح وضع زواج</span>
            </a>
          </div>

          <!-- Card M5 -->
          <div class="p-5 rounded-2xl bg-surface-container-lowest shadow-sm hover:shadow-md border border-secondary/30 flex flex-col justify-between text-right">
            <div>
              <div class="flex items-center justify-between mb-3">
                <div class="w-10 h-10 rounded-xl bg-secondary-container text-on-secondary-fixed flex items-center justify-center font-bold">
                  <span class="material-symbols-outlined text-2xl">gavel</span>
                </div>
                <span class="px-3 py-1 rounded-full bg-primary text-secondary-fixed text-[10px] font-bold">ناجز والعدل</span>
              </div>
              <h3 class="font-bold text-base text-primary mb-1.5">توثيق صك النكاح عبر منصة ناجز</h3>
              <p class="text-xs text-on-surface-variant leading-relaxed mb-4">
                إصدار وثيقة عقد زواج رقمية رسمية معتمدة من وزارة العدل ومحكمة الأحوال الشخصية وتصديق العقود الصادرة من السفارات الخارجية.
              </p>
              <ul class="text-xs text-on-surface flex flex-col gap-1.5 mb-4">
                <li class="flex items-center gap-1.5"><span class="material-symbols-outlined text-sm text-secondary">check</span>رقم صك إلكتروني رسمي فوري.</li>
                <li class="flex items-center gap-1.5"><span class="material-symbols-outlined text-sm text-secondary">check</span>تصديق الخارجية والجهات المختصة.</li>
              </ul>
            </div>
            <a href="https://wa.me/966568922561?text=%D8%A3%D8%B1%D8%BA%D8%A8%20%D8%A8%D8%AA%D9%88%D8%AB%D9%8A%D9%82%20%D8%B9%D9%82%D8%AF%20%D8%A7%D9%84%D8%B2%D9%88%D8%A7%D8%AC%20%D8%B9%D8%A8%D8%B1%20%D9%86%D8%A7%D8%AC%D8%B2" target="_blank" rel="noopener noreferrer" class="w-full py-2.5 rounded-xl bg-secondary-container text-on-secondary-fixed hover:bg-secondary-fixed font-bold text-xs text-center flex items-center justify-center gap-1.5 transition-colors shadow-sm">
              <span class="material-symbols-outlined text-sm">chat</span>
              <span>توثيق عقد الزواج الآن</span>
            </a>
          </div>

          <!-- Card M6 -->
          <div class="p-5 rounded-2xl bg-surface-container-lowest shadow-sm hover:shadow-md border border-secondary/30 flex flex-col justify-between text-right">
            <div>
              <div class="flex items-center justify-between mb-3">
                <div class="w-10 h-10 rounded-xl bg-secondary-container text-on-secondary-fixed flex items-center justify-center font-bold">
                  <span class="material-symbols-outlined text-2xl">group_add</span>
                </div>
                <span class="px-3 py-1 rounded-full bg-primary text-secondary-fixed text-[10px] font-bold">سجل الأسرة والتأشيرة</span>
              </div>
              <h3 class="font-bold text-base text-primary mb-1.5">إضافة الزوجة والأبناء واستقدام الزوجة</h3>
              <p class="text-xs text-on-surface-variant leading-relaxed mb-4">
                ربط سجل الأسرة في الأحوال المدنية بعد توثيق الزواج، وإضافة المواليد، وإصدار تأشيرة الاستقدام الفورية للزوجة من وزارة الخارجية.
              </p>
              <ul class="text-xs text-on-surface flex flex-col gap-1.5 mb-4">
                <li class="flex items-center gap-1.5"><span class="material-symbols-outlined text-sm text-secondary">check</span>إصدار سجل أسرة محدث فوراً.</li>
                <li class="flex items-center gap-1.5"><span class="material-symbols-outlined text-sm text-secondary">check</span>استخراج تأشيرة الإقامة الدائمة.</li>
              </ul>
            </div>
            <a href="https://wa.me/966568922561?text=%D8%A3%D8%B1%D8%BA%D8%A8%20%D8%A8%D8%AE%D8%AF%D9%85%D8%A9%20%D8%A5%D8%B6%D8%A7%D9%81%D8%A9%20%D8%A7%D9%84%D8%B2%D9%88%D8%AC%D8%A9%20%D9%88%D8%A7%D9%84%D8%A3%D8%A8%D9%86%D8%A7%D8%A1%20%D9%88%D8%A7%D8%B3%D8%AA%D9%82%D8%AF%D8%A7%D9%85%20%D8%A7%D9%84%D8%B2%D9%88%D8%AC%D8%A9" target="_blank" rel="noopener noreferrer" class="w-full py-2.5 rounded-xl bg-secondary-container text-on-secondary-fixed hover:bg-secondary-fixed font-bold text-xs text-center flex items-center justify-center gap-1.5 transition-colors shadow-sm">
              <span class="material-symbols-outlined text-sm">chat</span>
              <span>طلب الاستقدام وإضافة الأسرة</span>
            </a>
          </div>
        </div>
      </section>

      <!-- Legal Exceptions & Medical Box -->
      <section class="w-full bg-surface-container-low py-space-lg">
        <div class="max-w-7xl mx-auto px-gutter">
          <div class="p-space-lg rounded-3xl bg-surface-container-lowest shadow-md border-2 border-secondary/20 grid grid-cols-1 md:grid-cols-2 gap-space-md items-center">
            <div class="text-right flex flex-col gap-2">
              <span class="text-[11px] text-secondary font-bold uppercase tracking-wider block">ضوابط واستثناءات لائحة الزواج</span>
              <h2 class="text-xl md:text-2xl text-primary font-bold">استثناءات السن والفحص الطبي الجيني</h2>
              <p class="text-xs text-on-surface-variant leading-relaxed">
                يساعدك مكتب الوسام الذهبي في استيفاء الشروط الخاصة وتطبيق استثناءات سن الزواج عند وجود قرابة من الدرجة الأولى أو الثانية، أو في الحالات الإنسانية المعافاة بنصوص اللائحة.
              </p>
              <div class="flex flex-col gap-1.5 pt-2 text-xs text-on-surface">
                <div class="flex items-center gap-2"><span class="material-symbols-outlined text-secondary text-base">check_circle</span>استثناء السن في حال القرابة الموثقة بصلة نسب.</div>
                <div class="flex items-center gap-2"><span class="material-symbols-outlined text-secondary text-base">check_circle</span>تسهيل وحجز موعد الفحص الطبي الجيني المعتمد.</div>
                <div class="flex items-center gap-2"><span class="material-symbols-outlined text-secondary text-base">check_circle</span>معالجة وتدقيق صحيفة خلو السوابق والمفردات الراتبية.</div>
              </div>
            </div>

            <div class="p-6 rounded-2xl bg-primary text-on-primary text-right flex flex-col gap-3 border border-secondary shadow-lg">
              <span class="text-xs text-secondary-fixed font-bold uppercase">توافق تام مع منصتي أبشر وناجز</span>
              <h3 class="text-lg font-bold text-white">هل تواجه تعثراً أو ملاحظة في طلب الزواج؟</h3>
              <p class="text-xs text-primary-fixed-dim leading-relaxed">
                يتولى المستشار <strong>أبو خالد</strong> معالجة تحفظات اللجنة، وتوفير المستندات التكميلية، وإعادة الرفع بالطرق النظامية المعتمدة.
              </p>
              <div class="pt-1 flex flex-col sm:flex-row gap-2">
                <a href="https://wa.me/966568922561?text=%D8%A3%D8%B1%D8%BA%D8%A8%20%D9%81%D9%8A%20%D8%A7%D8%B3%D8%AA%D8%B4%D8%A7%D8%B1%D8%A9%20%D8%AE%D8%A7%D8%B5%D8%A9%20%D8%A8%D8%AA%D8%B5%D8%B1%D9%8A%D8%AD%20%D8%A7%D9%84%D8%B2%D9%88%D8%A7%D8%AC" target="_blank" rel="noopener noreferrer" class="w-full py-2.5 rounded-xl bg-secondary-container text-on-secondary-fixed font-bold text-xs hover:bg-secondary-fixed transition-colors flex items-center justify-center gap-1.5 shadow-md">
                  <span class="material-symbols-outlined text-base">chat</span>
                  <span>واتساب مباشرة</span>
                </a>
                <a href="tel:0568922561" class="w-full py-2.5 rounded-xl bg-surface-container-lowest/15 text-white font-bold text-xs hover:bg-surface-container-lowest/25 transition-colors flex items-center justify-center gap-1.5 border border-secondary/30">
                  <span class="material-symbols-outlined text-base text-secondary-fixed">call</span>
                  <span>0568922561</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    `;
  },

  // ==========================================
  // 5. SERVICES GUIDE VIEW
  // ==========================================
  renderGuide() {
    return `
      <!-- Sovereign Luxury Header Bar -->
      <section class="relative w-full bg-primary text-on-primary py-space-lg px-gutter">
        <div class="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-space-lg">
          <div class="space-y-1 max-w-2xl text-right">
            <div class="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-secondary/20 text-secondary-fixed font-bold text-xs whitespace-nowrap">
              <span class="material-symbols-outlined text-xs">verified</span>
              <span>منظومة الخدمات والحلول النظامية المعتمدة 1446هـ</span>
            </div>
            <h1 class="text-2xl md:text-3xl text-white font-bold leading-tight">
              خدماتنا الإجرائية والاستشارية المتكاملة
            </h1>
            <p class="text-xs md:text-sm text-primary-fixed-dim leading-relaxed">
              إنجاز قانوني وإداري رفيع المستوى بإشراف المستشار المعتمد أبو خالد. اختصاص تام في نظام الجنسية السعودية، وتصاريح الزواج، وتوثيق الأحوال المدنية والديوان الملكي.
            </p>
          </div>
          <div class="flex flex-wrap items-center gap-2 shrink-0">
            <a href="https://wa.me/966568922561?text=%D8%A7%D9%84%D8%B3%D9%84%D8%A7%D9%85%20%D8%B9%D9%84%D9%8A%D9%83%D9%85%D8%8C%20%D8%A3%D8%B1%D8%BA%D8%A8%20%D9%81%D9%8A%20%D8%A7%D9%84%D8%A7%D8%B3%D8%AA%D9%81%D8%B3%D8%A7%D8%B1%20%D8%B9%D9%86%20%D8%AE%D8%AF%D9%85%D8%A7%D8%AA%20%D9%85%D9%83%D8%AA%D8%A8%20%D8%A7%D9%84%D9%88%D8%B3%D8%A7%D9%85%20%D8%A7%D9%84%D8%B0%D9%87%D8%A8%D9%8A" target="_blank" rel="noopener noreferrer" class="px-4 py-2.5 rounded-xl bg-secondary-container text-on-secondary-fixed font-bold text-xs hover:bg-secondary-fixed transition-all flex items-center gap-1.5 shadow-md whitespace-nowrap">
              <span class="material-symbols-outlined text-base">chat</span>
              <span>استشارة فورية 0568922561</span>
            </a>
            <a href="tel:0568922561" class="px-4 py-2.5 rounded-xl bg-surface-container-lowest/10 text-white font-bold text-xs hover:bg-surface-container-lowest/20 transition-colors flex items-center gap-1 whitespace-nowrap">
              <span class="material-symbols-outlined text-base text-secondary-fixed">call</span>
              <span>اتصال مباشر</span>
            </a>
          </div>
        </div>
      </section>

      <!-- Category Filter Anchors -->
      <section class="w-full bg-surface-container py-2 border-b border-surface-container-high">
        <div class="max-w-7xl mx-auto px-gutter flex items-center justify-start md:justify-center gap-2 overflow-x-auto">
          <a href="#naturalization" class="px-3 py-1.5 rounded-full bg-surface-container-lowest text-primary font-bold text-xs shadow-sm hover:bg-primary hover:text-white transition-colors flex items-center gap-1 whitespace-nowrap">
            <span class="material-symbols-outlined text-xs text-secondary">workspace_premium</span>
            <span>معاملات التجنيس والجنسية</span>
          </a>
          <a href="#marriage-permits" class="px-3 py-1.5 rounded-full bg-surface-container-lowest text-primary font-bold text-xs shadow-sm hover:bg-primary hover:text-white transition-colors flex items-center gap-1 whitespace-nowrap">
            <span class="material-symbols-outlined text-xs text-secondary">assignment_turned_in</span>
            <span>تصاريح وتوثيق الزواج</span>
          </a>
          <a href="#civil-documentation" class="px-3 py-1.5 rounded-full bg-surface-container-lowest text-primary font-bold text-xs shadow-sm hover:bg-primary hover:text-white transition-colors flex items-center gap-1 whitespace-nowrap">
            <span class="material-symbols-outlined text-xs text-secondary">account_balance</span>
            <span>الأحوال المدنية والصكوك</span>
          </a>
          <a href="#track-matrix" class="px-3 py-1.5 rounded-full bg-surface-container-lowest text-primary font-bold text-xs shadow-sm hover:bg-primary hover:text-white transition-colors flex items-center gap-1 whitespace-nowrap">
            <span class="material-symbols-outlined text-xs text-secondary">flowsheet</span>
            <span>خطوات سير المعاملة</span>
          </a>
        </div>
      </section>

      <!-- SECTION 1: Naturalization & Saudi Citizenship Affairs -->
      <section class="max-w-7xl mx-auto px-gutter py-space-lg w-full" id="naturalization">
        <div class="p-space-lg rounded-3xl bg-primary text-on-primary shadow-xl border-2 border-secondary mb-space-md grid grid-cols-1 lg:grid-cols-12 gap-space-md items-center">
          <div class="lg:col-span-7 flex flex-col gap-2 text-right">
            <span class="px-3 py-1 rounded-full bg-secondary/20 text-secondary-fixed text-xs font-bold w-fit whitespace-nowrap">أنظمة الجنسية ومراسيم التجنيس الملكية</span>
            <h2 class="text-xl md:text-2xl text-white font-bold">معاملات التجنيس ونظام الجنسية العربية السعودية</h2>
            <p class="text-xs text-primary-fixed-dim leading-relaxed">
              دراسة وتجهيز ملفات التجنيس واستيفاء المعايير والنقاط وفق المواد (8، 9، 14، 16) واللوائح التنفيذية الصادرة بالأوامر السامية، مع متابعة دقيقة ومستمرة عبر الجهات المختصة ولجان الداخلية.
            </p>
            <div class="grid grid-cols-3 gap-2 pt-2">
              <div class="p-2 rounded-xl bg-primary-container/80 text-center">
                <span class="block text-sm text-secondary-fixed font-bold">98.4%</span>
                <span class="text-[10px] text-primary-fixed">استيفاء الملفات</span>
              </div>
              <div class="p-2 rounded-xl bg-primary-container/80 text-center">
                <span class="block text-sm text-secondary-fixed font-bold">سرية</span>
                <span class="text-[10px] text-primary-fixed">حماية قصوى</span>
              </div>
              <div class="p-2 rounded-xl bg-primary-container/80 text-center">
                <span class="block text-sm text-secondary-fixed font-bold">مباشر</span>
                <span class="text-[10px] text-primary-fixed">إشراف أبو خالد</span>
              </div>
            </div>
          </div>
          <div class="lg:col-span-5 relative rounded-2xl overflow-hidden aspect-[16/9] lg:aspect-[4/3] border border-secondary/30 shadow-md">
            <img src="/assets/images/saudi_citizenship_and_naturalization_papers_consultation_desk_saudi_passport/screen.png" alt="تجنيس وجنسية سعودية" class="w-full h-full object-cover">
          </div>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-space-md">
          <!-- Card 1 -->
          <div class="flex flex-col rounded-2xl bg-surface-container-lowest p-4 shadow-sm hover:shadow-md transition-all border border-secondary/20 text-right">
            <div class="flex items-center justify-between mb-2">
              <div class="w-10 h-10 rounded-xl bg-primary text-secondary-fixed flex items-center justify-center font-bold">
                <span class="material-symbols-outlined text-xl">domain_add</span>
              </div>
              <span class="px-2.5 py-0.5 rounded-full bg-secondary-fixed/30 text-on-secondary-fixed text-[10px] font-bold whitespace-nowrap">نظام النقاط والملاءة</span>
            </div>
            <h3 class="font-bold text-sm text-primary mb-1">تجنيس مقيم مستثمر</h3>
            <p class="text-[11px] text-on-surface-variant leading-relaxed mb-3">إعداد ملفات رؤوس الأموال الاستثمارية، وتراخيص وزارة الاستثمار (MISA)، وإثبات حجم الأصول والإسهام الاقتصادي واستيفاء الإقامة.</p>
            <div class="p-2 rounded-xl bg-surface-container-low text-[11px] flex flex-col gap-1 mb-3">
              <div class="flex justify-between"><span class="text-outline">جاهزية الأوراق</span><span class="text-primary font-bold">100% تدقيق مسبق</span></div>
              <div class="flex justify-between"><span class="text-outline">المسار</span><span class="text-primary font-bold">لجنة المستثمرين</span></div>
            </div>
            <a href="https://wa.me/966568922561?text=%D8%A3%D8%B1%D8%BA%D8%A8%20%D9%81%D9%8A%20%D8%A7%D8%B3%D8%AA%D8%B4%D8%A7%D8%B1%D8%A9%20%D8%AA%D8%AC%D9%86%D9%8A%D8%B3%20%D9%85%D9%82%D9%8A%D9%85%20%D9%85%D8%B3%D8%AA%D8%AB%D9%85%D8%B1" target="_blank" rel="noopener noreferrer" class="mt-auto w-full py-2 rounded-xl bg-primary text-on-primary hover:bg-primary-container transition-all font-bold text-xs text-center flex items-center justify-center gap-1 whitespace-nowrap">
              <span class="material-symbols-outlined text-xs text-secondary-fixed">send</span>
              <span>تقديم استشارة فورية</span>
            </a>
          </div>

          <!-- Card 2 -->
          <div class="flex flex-col rounded-2xl bg-surface-container-lowest p-4 shadow-sm hover:shadow-md transition-all border border-secondary/20 text-right">
            <div class="flex items-center justify-between mb-2">
              <div class="w-10 h-10 rounded-xl bg-primary text-secondary-fixed flex items-center justify-center font-bold">
                <span class="material-symbols-outlined text-xl">medical_services</span>
              </div>
              <span class="px-2.5 py-0.5 rounded-full bg-secondary-fixed/30 text-on-secondary-fixed text-[10px] font-bold whitespace-nowrap">الكفاءات النوعية</span>
            </div>
            <h3 class="font-bold text-sm text-primary mb-1">تجنيس الأطباء والاستشاريين والعلماء</h3>
            <p class="text-[11px] text-on-surface-variant leading-relaxed mb-3">معالجة طلبات الأطباء، حملة الدكتوراه، والباحثين المتخصصين ضمن مسارات استقطاب الكفاءات النادرة والمتميزة وفق التوجيهات الملكية.</p>
            <div class="p-2 rounded-xl bg-surface-container-low text-[11px] flex flex-col gap-1 mb-3">
              <div class="flex justify-between"><span class="text-outline">التصنيف</span><span class="text-primary font-bold">هيئة التخصصات</span></div>
              <div class="flex justify-between"><span class="text-outline">المسار</span><span class="text-primary font-bold">مسار الكفاءات</span></div>
            </div>
            <a href="https://wa.me/966568922561?text=%D8%A3%D8%B1%D8%BA%D8%A8%20%D9%81%D9%8A%20%D8%A7%D8%B3%D8%AA%D8%B4%D8%A7%D8%B1%D8%A9%20%D8%AA%D8%AC%D9%86%D9%8A%D8%B3%20%D8%B7%D8%A8%D9%8A%D8%A8%20%D8%A3%D9%88%20%D9%83%D9%81%D8%A7%D8%A1%D8%A9" target="_blank" rel="noopener noreferrer" class="mt-auto w-full py-2 rounded-xl bg-primary text-on-primary hover:bg-primary-container transition-all font-bold text-xs text-center flex items-center justify-center gap-1 whitespace-nowrap">
              <span class="material-symbols-outlined text-xs text-secondary-fixed">send</span>
              <span>تقديم استشارة فورية</span>
            </a>
          </div>

          <!-- Card 3 -->
          <div class="flex flex-col rounded-2xl bg-surface-container-lowest p-4 shadow-sm hover:shadow-md transition-all border border-secondary/20 text-right">
            <div class="flex items-center justify-between mb-2">
              <div class="w-10 h-10 rounded-xl bg-primary text-secondary-fixed flex items-center justify-center font-bold">
                <span class="material-symbols-outlined text-xl">favorite</span>
              </div>
              <span class="px-2.5 py-0.5 rounded-full bg-secondary-fixed/30 text-on-secondary-fixed text-[10px] font-bold whitespace-nowrap">المادة (16)</span>
            </div>
            <h3 class="font-bold text-sm text-primary mb-1">تجنيس زوجة مواطن سعودي</h3>
            <p class="text-[11px] text-on-surface-variant leading-relaxed mb-3">استيفاء نقاط عقد النكاح، ومدة الزواج، ورصيد الإقامة، وإنجاب الأبناء، وتقديم الطلب لدى الأحوال المدنية بمتابعة مستمرة.</p>
            <div class="p-2 rounded-xl bg-surface-container-low text-[11px] flex flex-col gap-1 mb-3">
              <div class="flex justify-between"><span class="text-outline">احتساب النقاط</span><span class="text-primary font-bold">17 نقطة كحد أدنى</span></div>
              <div class="flex justify-between"><span class="text-outline">الإقامة</span><span class="text-primary font-bold">سارية ومجددة</span></div>
            </div>
            <a href="https://wa.me/966568922561?text=%D8%A3%D8%B1%D8%BA%D8%A8%20%D9%81%D9%8A%20%D8%A7%D8%B3%D8%AA%D8%B4%D8%A7%D8%B1%D8%A9%20%D8%AA%D8%AC%D9%86%D9%8A%D8%B3%20%D8%B2%D9%88%D8%AC%D8%A9%20%D9%85%D9%88%D8%A7%D8%B7%D9%86" target="_blank" rel="noopener noreferrer" class="mt-auto w-full py-2 rounded-xl bg-primary text-on-primary hover:bg-primary-container transition-all font-bold text-xs text-center flex items-center justify-center gap-1 whitespace-nowrap">
              <span class="material-symbols-outlined text-xs text-secondary-fixed">send</span>
              <span>تقديم استشارة فورية</span>
            </a>
          </div>

          <!-- Card 4 -->
          <div class="flex flex-col rounded-2xl bg-surface-container-lowest p-4 shadow-sm hover:shadow-md transition-all border border-secondary/20 text-right">
            <div class="flex items-center justify-between mb-2">
              <div class="w-10 h-10 rounded-xl bg-primary text-secondary-fixed flex items-center justify-center font-bold">
                <span class="material-symbols-outlined text-xl">supervisor_account</span>
              </div>
              <span class="px-2.5 py-0.5 rounded-full bg-secondary-fixed/30 text-on-secondary-fixed text-[10px] font-bold whitespace-nowrap">الضوابط والاشتراطات</span>
            </div>
            <h3 class="font-bold text-sm text-primary mb-1">تجنيس زوج مواطنة سعودية</h3>
            <p class="text-[11px] text-on-surface-variant leading-relaxed mb-3">ترتيب مستندات استقرار الأسرة، وحساب نقاط مدة عقد الزواج، وسلامة السجل الجنائي وتوفر المهنة المشروعة وفق المادة.</p>
            <div class="p-2 rounded-xl bg-surface-container-low text-[11px] flex flex-col gap-1 mb-3">
              <div class="flex justify-between"><span class="text-outline">توثيق الزواج</span><span class="text-primary font-bold">عقد نظامي مسجل</span></div>
              <div class="flex justify-between"><span class="text-outline">السجل الأمني</span><span class="text-primary font-bold">خالٍ من الملاحظات</span></div>
            </div>
            <a href="https://wa.me/966568922561?text=%D8%A3%D8%B1%D8%BA%D8%A8%20%D9%81%D9%8A%20%D8%A7%D8%B3%D8%AA%D8%B4%D8%A7%D8%B1%D8%A9%20%D8%AA%D8%AC%D9%86%D9%8A%D8%B3%20%D8%B2%D9%88%D8%AC%20%D9%85%D9%88%D8%A7%D8%B7%D9%86%D8%A9" target="_blank" rel="noopener noreferrer" class="mt-auto w-full py-2 rounded-xl bg-primary text-on-primary hover:bg-primary-container transition-all font-bold text-xs text-center flex items-center justify-center gap-1 whitespace-nowrap">
              <span class="material-symbols-outlined text-xs text-secondary-fixed">send</span>
              <span>تقديم استشارة فورية</span>
            </a>
          </div>

          <!-- Card 5 -->
          <div class="flex flex-col rounded-2xl bg-surface-container-lowest p-4 shadow-sm hover:shadow-md transition-all border border-secondary/20 text-right">
            <div class="flex items-center justify-between mb-2">
              <div class="w-10 h-10 rounded-xl bg-primary text-secondary-fixed flex items-center justify-center font-bold">
                <span class="material-symbols-outlined text-xl">family_restroom</span>
              </div>
              <span class="px-2.5 py-0.5 rounded-full bg-secondary-fixed/30 text-on-secondary-fixed text-[10px] font-bold whitespace-nowrap">المادة (8)</span>
            </div>
            <h3 class="font-bold text-sm text-primary mb-1">تجنيس ابنة ومولود مواطنة سعودية</h3>
            <p class="text-[11px] text-on-surface-variant leading-relaxed mb-3">إجراءات تقديم ملف الابنة البالغة أو المولود لأم سعودية بعد بلوغ سن الرشد مع إثبات الإقامة الدائمة وإجادة اللغة.</p>
            <div class="p-2 rounded-xl bg-surface-container-low text-[11px] flex flex-col gap-1 mb-3">
              <div class="flex justify-between"><span class="text-outline">تاريخ التقديم</span><span class="text-primary font-bold">خلال سنة بعد سن 18</span></div>
              <div class="flex justify-between"><span class="text-outline">المستند</span><span class="text-primary font-bold">شهادة الميلاد وهنوية الأم</span></div>
            </div>
            <a href="https://wa.me/966568922561?text=%D8%A3%D8%B1%D8%BA%D8%A8%20%D9%81%D9%8A%20%D8%A7%D8%B3%D8%AA%D8%B4%D8%A7%D8%B1%D8%A9%20%D8%AA%D8%AC%D9%86%D9%8A%D8%B3%20%D8%A8%D9%86%D8%AA%20%D9%85%D9%88%D8%A7%D8%B7%D9%86%D8%A9" target="_blank" rel="noopener noreferrer" class="mt-auto w-full py-2 rounded-xl bg-primary text-on-primary hover:bg-primary-container transition-all font-bold text-xs text-center flex items-center justify-center gap-1 whitespace-nowrap">
              <span class="material-symbols-outlined text-xs text-secondary-fixed">send</span>
              <span>تقديم استشارة فورية</span>
            </a>
          </div>

          <!-- Card 6 -->
          <div class="flex flex-col rounded-2xl bg-surface-container-lowest p-4 shadow-sm hover:shadow-md transition-all border border-secondary/20 text-right">
            <div class="flex items-center justify-between mb-2">
              <div class="w-10 h-10 rounded-xl bg-primary text-secondary-fixed flex items-center justify-center font-bold">
                <span class="material-symbols-outlined text-xl">badge</span>
              </div>
              <span class="px-2.5 py-0.5 rounded-full bg-secondary-fixed/30 text-on-secondary-fixed text-[10px] font-bold whitespace-nowrap">وثائق السفر والإقامة</span>
            </div>
            <h3 class="font-bold text-sm text-primary mb-1">استخراج وتجديد جواز ووثائق أبناء مواطنة</h3>
            <p class="text-[11px] text-on-surface-variant leading-relaxed mb-3">تسهيل معاملة منح وثائق السفر، والإقامات الخاصة بأبناء المواطنة، وتصحيح أوضاع الأوراق الثبوتية وحل عوائق الربط.</p>
            <div class="p-2 rounded-xl bg-surface-container-low text-[11px] flex flex-col gap-1 mb-3">
              <div class="flex justify-between"><span class="text-outline">الخدمة</span><span class="text-primary font-bold">إصدار وتجديد نظامي</span></div>
              <div class="flex justify-between"><span class="text-outline">المرجعية</span><span class="text-primary font-bold">المديرية العامة للجوازات</span></div>
            </div>
            <a href="https://wa.me/966568922561?text=%D8%A3%D8%B1%D8%BA%D8%A8%20%D9%81%D9%8A%20%D9%85%D8%B9%D8%A7%D9%85%D9%84%D8%A9%20%D8%AC%D9%88%D8%A7%D8%B2%20%D8%B3%D9%81%D8%B1%20%D9%88%D9%88%D8%AB%D8%A7%D8%A6%D9%82%20%D8%A3%D8%A8%D9%86%D8%A7%D8%A1%20%D9%85%D9%88%D8%A7%D8%B7%D9%86%D8%A9" target="_blank" rel="noopener noreferrer" class="mt-auto w-full py-2 rounded-xl bg-primary text-on-primary hover:bg-primary-container transition-all font-bold text-xs text-center flex items-center justify-center gap-1 whitespace-nowrap">
              <span class="material-symbols-outlined text-xs text-secondary-fixed">send</span>
              <span>تقديم استشارة فورية</span>
            </a>
          </div>
        </div>
      </section>

      <!-- SECTION 2: Marriage Permits & Official Attestation -->
      <section class="max-w-7xl mx-auto px-gutter py-space-lg w-full" id="marriage-permits">
        <div class="p-space-lg rounded-3xl bg-surface-container-lowest shadow-xl border-2 border-secondary mb-space-md grid grid-cols-1 lg:grid-cols-12 gap-space-md items-center">
          <div class="lg:col-span-5 relative rounded-2xl overflow-hidden aspect-[16/9] lg:aspect-[4/3] border border-secondary/30 shadow-md">
            <img src="/assets/images/saudi_government_documentation_and_marriage_certificate_stamping_desk_luxury/screen.png" alt="تصاريح وتوثيق الزواج" class="w-full h-full object-cover">
          </div>
          <div class="lg:col-span-7 flex flex-col gap-2 text-right">
            <span class="px-3 py-1 rounded-full bg-secondary-container text-on-secondary-fixed text-xs font-bold w-fit whitespace-nowrap">لائحة زواج السعودي بغير سعودية والسعودية بغير سعودي</span>
            <h2 class="text-xl md:text-2xl text-primary font-bold">استخراج تصاريح الزواج الرسمية وتوثيق العقود</h2>
            <p class="text-xs text-on-surface-variant leading-relaxed">
              إنهاء جميع طلبات الزواج عبر إمارات المناطق ووزارة الداخلية وسفارات المملكة، مع تصحيح أوضاع الزواج القائم وتوثيقه عبر بوابة ناجز ومحاكم الأحوال الشخصية.
            </p>
            <div class="flex flex-wrap items-center gap-3 pt-2 text-xs font-bold text-primary">
              <span class="flex items-center gap-1"><span class="material-symbols-outlined text-secondary text-sm">check_circle</span>تصريح مفتوح الطلب</span>
              <span class="flex items-center gap-1"><span class="material-symbols-outlined text-secondary text-sm">check_circle</span>تصديق ناجز ووزارة العدل</span>
              <span class="flex items-center gap-1"><span class="material-symbols-outlined text-secondary text-sm">check_circle</span>تأشيرة الاستقدام الفورية</span>
            </div>
          </div>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-space-md">
          <!-- Card M1 -->
          <div class="flex flex-col rounded-2xl bg-surface-container-lowest p-4 shadow-sm hover:shadow-md transition-all border border-secondary/20 text-right">
            <div class="w-10 h-10 rounded-xl bg-secondary-container text-on-secondary-fixed flex items-center justify-center font-bold mb-2">
              <span class="material-symbols-outlined text-xl">public</span>
            </div>
            <h3 class="font-bold text-sm text-primary mb-1">تصريح زواج سعودي من أجنبية (من الخارج)</h3>
            <p class="text-[11px] text-on-surface-variant leading-relaxed mb-3">استخراج الموافقة الرسمية بنظام التصريح المفتوح، وإحالة المعاملة إلى سفارة المملكة بالخارج تمهيداً لعقد القران.</p>
            <ul class="text-[11px] text-on-surface flex flex-col gap-1 mb-3 flex-grow">
              <li class="flex items-center gap-1"><span class="text-secondary font-bold">•</span> السن والحالة الاجتماعية وفق النظام</li>
              <li class="flex items-center gap-1"><span class="text-secondary font-bold">•</span> الفحص الطبي الجيني المعتمد</li>
            </ul>
            <a href="https://wa.me/966568922561?text=%D8%A3%D8%B1%D8%BA%D8%A8%20%D8%A8%D8%A7%D8%B3%D8%AA%D8%AE%D8%B1%D8%A7%D8%AC%20%D8%AA%D8%B5%D8%B1%D9%8A%D8%AD%20%D8%B2%D9%88%D8%A7%D8%AC%20%D8%B3%D8%B9%D9%88%D8%AF%D9%8A%20%D9%85%D9%86%20%D8%A3%D8%AC%D9%86%D8%A8%D9%8A%D8%A9%20%D9%85%D9%86%20%D8%A7%D9%84%D8%AE%D8%A7%D8%B1%D8%AC" target="_blank" rel="noopener noreferrer" class="w-full py-2 rounded-xl bg-secondary-container text-on-secondary-fixed hover:bg-secondary-fixed transition-all font-bold text-xs text-center flex items-center justify-center gap-1 whitespace-nowrap">
              <span class="material-symbols-outlined text-xs">chat</span>
              <span>طلب تصريح الخارج</span>
            </a>
          </div>

          <!-- Card M2 -->
          <div class="flex flex-col rounded-2xl bg-surface-container-lowest p-4 shadow-sm hover:shadow-md transition-all border border-secondary/20 text-right">
            <div class="w-10 h-10 rounded-xl bg-secondary-container text-on-secondary-fixed flex items-center justify-center font-bold mb-2">
              <span class="material-symbols-outlined text-xl">home_work</span>
            </div>
            <h3 class="font-bold text-sm text-primary mb-1">تصريح زواج سعودي من مقيمة داخل المملكة</h3>
            <p class="text-[11px] text-on-surface-variant leading-relaxed mb-3">إنهاء موافقة إمارة المنطقة والشرطة لزواج المواطن من مقيمة ذات إقامة سارية ونظامية داخل المملكة تمهيداً للعقد.</p>
            <ul class="text-[11px] text-on-surface flex flex-col gap-1 mb-3 flex-grow">
              <li class="flex items-center gap-1"><span class="text-secondary font-bold">•</span> سريان الإقامة وجواز السفر</li>
              <li class="flex items-center gap-1"><span class="text-secondary font-bold">•</span> موافقة ولي الأمر الرسمية</li>
            </ul>
            <a href="https://wa.me/966568922561?text=%D8%A3%D8%B1%D8%BA%D8%A8%20%D8%A8%D8%AA%D8%B5%D8%B1%D9%8A%D8%AD%20%D8%B2%D9%88%D8%A7%D8%AC%20%D8%B3%D8%B9%D9%88%D8%AF%D9%8A%20%D9%85%D9%86%20%D8%A3%D8%AC%D9%86%D8%A8%D9%8A%D8%A9%20%D9%85%D9%82%D9%8A%D9%85%D8%A9" target="_blank" rel="noopener noreferrer" class="w-full py-2 rounded-xl bg-secondary-container text-on-secondary-fixed hover:bg-secondary-fixed transition-all font-bold text-xs text-center flex items-center justify-center gap-1 whitespace-nowrap">
              <span class="material-symbols-outlined text-xs">chat</span>
              <span>طلب تصريح مقيمة</span>
            </a>
          </div>

          <!-- Card M3 -->
          <div class="flex flex-col rounded-2xl bg-surface-container-lowest p-4 shadow-sm hover:shadow-md transition-all border border-secondary/20 text-right">
            <div class="w-10 h-10 rounded-xl bg-secondary-container text-on-secondary-fixed flex items-center justify-center font-bold mb-2">
              <span class="material-symbols-outlined text-xl">handshake</span>
            </div>
            <h3 class="font-bold text-sm text-primary mb-1">تصريح زواج مواطنة سعودية من أجنبي</h3>
            <p class="text-[11px] text-on-surface-variant leading-relaxed mb-3">إجراءات معاملات زواج المواطنة من مقيم، تدقيق شرط السكن، والدخل، وسلامة السجل، ورفع الطلب للجنة المختصة.</p>
            <ul class="text-[11px] text-on-surface flex flex-col gap-1 mb-3 flex-grow">
              <li class="flex items-center gap-1"><span class="text-secondary font-bold">•</span> تعريف بالراتب وإثبات السكن</li>
              <li class="flex items-center gap-1"><span class="text-secondary font-bold">•</span> خلو السجل الجنائي للمتقدم</li>
            </ul>
            <a href="https://wa.me/966568922561?text=%D8%A3%D8%B1%D8%BA%D8%A8%20%D8%A8%D8%AA%D8%B5%D8%B1%D9%8A%D8%AD%20%D8%B2%D9%88%D8%A7%D8%AC%20%D9%85%D9%88%D8%A7%D8%B7%D9%86%D8%A9%20%D9%85%D9%86%20%D8%A3%D8%AC%D9%86%D8%A8%D9%8A" target="_blank" rel="noopener noreferrer" class="w-full py-2 rounded-xl bg-secondary-container text-on-secondary-fixed hover:bg-secondary-fixed transition-all font-bold text-xs text-center flex items-center justify-center gap-1 whitespace-nowrap">
              <span class="material-symbols-outlined text-xs">chat</span>
              <span>تقديم الطلب</span>
            </a>
          </div>

          <!-- Card M4 -->
          <div class="flex flex-col rounded-2xl bg-surface-container-lowest p-4 shadow-sm hover:shadow-md transition-all border border-secondary/20 text-right">
            <div class="w-10 h-10 rounded-xl bg-secondary-container text-on-secondary-fixed flex items-center justify-center font-bold mb-2">
              <span class="material-symbols-outlined text-xl">published_with_changes</span>
            </div>
            <h3 class="font-bold text-sm text-primary mb-1">تصحيح وضع زواج قائم بدون تصريح mسبق</h3>
            <p class="text-[11px] text-on-surface-variant leading-relaxed mb-3">معالجة الزواجات المنعقدة دون ترخيص سابق، ورفع استرحامات وطلبات تصحيح الوضع لدى الإمارة والداخلية لتثبيت العقد.</p>
            <ul class="text-[11px] text-on-surface flex flex-col gap-1 mb-3 flex-grow">
              <li class="flex items-center gap-1"><span class="text-secondary font-bold">•</span> معالجة أوضاع وجود أبناء</li>
              <li class="flex items-center gap-1"><span class="text-secondary font-bold">•</span> صياغة الالتماسات الرسمية</li>
            </ul>
            <a href="https://wa.me/966568922561?text=%D8%A3%D8%B1%D8%BA%D8%A8%20%D8%A8%D8%AA%D8%B5%D8%AD%D9%8A%D8%AD%20%D9%88%D8%B6%D8%B9%20%D8%B2%D9%88%D8%A7%D8%AC%20%D8%A8%D8%AF%D9%88%D9%8BD%20%D8%AA%D8%B5%D8%B1%D9%8A%D8%AD" target="_blank" rel="noopener noreferrer" class="w-full py-2 rounded-xl bg-secondary-container text-on-secondary-fixed hover:bg-secondary-fixed transition-all font-bold text-xs text-center flex items-center justify-center gap-1 whitespace-nowrap">
              <span class="material-symbols-outlined text-xs">chat</span>
              <span>استشارة تصحيح الوضع</span>
            </a>
          </div>

          <!-- Card M5 -->
          <div class="flex flex-col rounded-2xl bg-surface-container-lowest p-4 shadow-sm hover:shadow-md transition-all border border-secondary/20 text-right">
            <div class="w-10 h-10 rounded-xl bg-secondary-container text-on-secondary-fixed flex items-center justify-center font-bold mb-2">
              <span class="material-symbols-outlined text-xl">gavel</span>
            </div>
            <h3 class="font-bold text-sm text-primary mb-1">توثيق وثيقة عقد الزواج عبر ناجز والعدل</h3>
            <p class="text-[11px] text-on-surface-variant leading-relaxed mb-3">إصدار وثيقة عقد زواج رقمية رسمية معتمدة من وزارة العدل بعد الحصول على الموافقة، وتصديق العقود الخارجية.</p>
            <ul class="text-[11px] text-on-surface flex flex-col gap-1 mb-3 flex-grow">
              <li class="flex items-center gap-1"><span class="text-secondary font-bold">•</span> إصدار رقم صك إلكتروني فوري</li>
              <li class="flex items-center gap-1"><span class="text-secondary font-bold">•</span> تصديق الخارجية والعدل</li>
            </ul>
            <a href="https://wa.me/966568922561?text=%D8%A3%D8%B1%D8%BA%D8%A8%20%D8%A8%D8%AA%D9%88%D8%AB%D9%8A%D9%82%20%D8%B9%D9%82%D8%AF%20%D8%B2%D9%88%D8%A7%D8%AC%20%D8%B9%D8%A8%D8%B1%20%D9%86%D8%A7%D8%AC%D8%B2" target="_blank" rel="noopener noreferrer" class="w-full py-2 rounded-xl bg-secondary-container text-on-secondary-fixed hover:bg-secondary-fixed transition-all font-bold text-xs text-center flex items-center justify-center gap-1 whitespace-nowrap">
              <span class="material-symbols-outlined text-xs">chat</span>
              <span>توثيق العقد الآن</span>
            </a>
          </div>

          <!-- Card M6 -->
          <div class="flex flex-col rounded-2xl bg-surface-container-lowest p-4 shadow-sm hover:shadow-md transition-all border border-secondary/20 text-right">
            <div class="w-10 h-10 rounded-xl bg-secondary-container text-on-secondary-fixed flex items-center justify-center font-bold mb-2">
              <span class="material-symbols-outlined text-xl">group_add</span>
            </div>
            <h3 class="font-bold text-sm text-primary mb-1">إضافة الأبناء واستقدام الزوجة بالربط الرسمي</h3>
            <p class="text-[11px] text-on-surface-variant leading-relaxed mb-3">إنهاء ربط سجل الأسرة في الأحوال المدنية، وإضافة المواليد، وإصدار تأشيرة الاستقدام العائلي الفورية للزوجة.</p>
            <ul class="text-[11px] text-on-surface flex flex-col gap-1 mb-3 flex-grow">
              <li class="flex items-center gap-1"><span class="text-secondary font-bold">•</span> إصدار سجل أسرة محدث فوراً</li>
              <li class="flex items-center gap-1"><span class="text-secondary font-bold">•</span> تسهيل تأشيرات المرافقة الدائمة</li>
            </ul>
            <a href="https://wa.me/966568922561?text=%D8%A3%D8%B1%D8%BA%D8%A8%20%D8%A8%D8%AE%D8%AF%D9%85%D8%A9%20%D8%A5%D8%B6%D8%A7%D9%81%D8%A9%20%D8%A7%D9%84%D8%A3%D8%A8%D9%86%D8%A7%D8%A1%20%D9%88%D8%A7%D8%B3%D8%AA%D9%82%D8%AF%D8%A7%D9%85%20%D8%A7%D9%84%D8%B2%D9%88%D8%AC%D8%A9" target="_blank" rel="noopener noreferrer" class="w-full py-2 rounded-xl bg-secondary-container text-on-secondary-fixed hover:bg-secondary-fixed transition-all font-bold text-xs text-center flex items-center justify-center gap-1 whitespace-nowrap">
              <span class="material-symbols-outlined text-xs">chat</span>
              <span>طلب الاستقدام والإضافة</span>
            </a>
          </div>
        </div>
      </section>

      <!-- SECTION 3: Process Flow Matrix -->
      <section class="max-w-7xl mx-auto px-gutter py-space-lg w-full" id="track-matrix">
        <div class="text-center max-w-2xl mx-auto mb-space-md">
          <span class="text-[11px] text-secondary font-bold uppercase tracking-wider block mb-1">مسار الإنجاز الدقيق</span>
          <h2 class="text-xl md:text-2xl text-primary font-bold">كيف تبدأ وتنجز معاملتك مع مكتب الوسام الذهبي؟</h2>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-4 gap-space-sm">
          <div class="p-4 rounded-2xl bg-surface-container-lowest shadow-sm border border-secondary/20 flex flex-col justify-between text-right">
            <div>
              <div class="flex items-center justify-between mb-2">
                <span class="w-8 h-8 rounded-full bg-primary text-white font-bold text-xs flex items-center justify-center">01</span>
                <span class="material-symbols-outlined text-secondary">forum</span>
              </div>
              <h4 class="font-bold text-xs text-primary mb-1">التواصل المبدئي والتدقيق</h4>
              <p class="text-[11px] text-on-surface-variant leading-relaxed">مراسلة المستشار أبو خالد وشرح حالة الملف ومراجعة الشروط الأوليّة مجاناً.</p>
            </div>
            <span class="text-[10px] text-secondary font-bold mt-2">خلال 30 دقيقة</span>
          </div>

          <div class="p-4 rounded-2xl bg-surface-container-lowest shadow-sm border border-secondary/20 flex flex-col justify-between text-right">
            <div>
              <div class="flex items-center justify-between mb-2">
                <span class="w-8 h-8 rounded-full bg-primary text-white font-bold text-xs flex items-center justify-center">02</span>
                <span class="material-symbols-outlined text-secondary">inventory</span>
              </div>
              <h4 class="font-bold text-xs text-primary mb-1">إعداد وحوكمة الملف</h4>
              <p class="text-[11px] text-on-surface-variant leading-relaxed">جمع وتصديق كافة المستندات المطلوبة، وحساب النقاط، وصياغة الخطابات.</p>
            </div>
            <span class="text-[10px] text-secondary font-bold mt-2">خلال 48 ساعة</span>
          </div>

          <div class="p-4 rounded-2xl bg-surface-container-lowest shadow-sm border border-secondary/20 flex flex-col justify-between text-right">
            <div>
              <div class="flex items-center justify-between mb-2">
                <span class="w-8 h-8 rounded-full bg-primary text-white font-bold text-xs flex items-center justify-center">03</span>
                <span class="material-symbols-outlined text-secondary">send_and_archive</span>
              </div>
              <h4 class="font-bold text-xs text-primary mb-1">الرفع والمتابعة اليومية</h4>
              <p class="text-[11px] text-on-surface-variant leading-relaxed">إيداع المعاملة لدى الإمارة أو وزارة الداخلية وتزويد العميل برقم القيد الفوري.</p>
            </div>
            <span class="text-[10px] text-secondary font-bold mt-2">تحديث إلكتروني مستمر</span>
          </div>

          <div class="p-4 rounded-2xl bg-surface-container-lowest shadow-sm border border-secondary/20 flex flex-col justify-between text-right">
            <div>
              <div class="flex items-center justify-between mb-2">
                <span class="w-8 h-8 rounded-full bg-secondary-container text-on-secondary-fixed font-bold text-xs flex items-center justify-center">04</span>
                <span class="material-symbols-outlined text-primary">verified</span>
              </div>
              <h4 class="font-bold text-xs text-primary mb-1">صدور القرار وتسليم الوثيقة</h4>
              <p class="text-[11px] text-on-surface-variant leading-relaxed">استلام الموافقة النهائية أو صك الزواج واعتماد التوثيق لدى الأحوال والجوازات.</p>
            </div>
            <span class="text-[10px] text-secondary font-bold mt-2">تسليم نظامي معتمد</span>
          </div>
        </div>
      </section>

      <!-- SECTION 4: Comparative Specs Table -->
      <section class="max-w-7xl mx-auto px-gutter py-space-lg w-full">
        <div class="mb-space-md text-right">
          <h3 class="text-base md:text-xl text-primary font-bold">مقارنة وتفاصيل المسارات الإجرائية</h3>
          <p class="text-xs text-on-surface-variant mt-0.5">ملخص شامل للشروط والمدد التقريبية والمستندات لكل مسار:</p>
        </div>

        <div class="overflow-x-auto rounded-2xl bg-surface-container-lowest shadow-sm border border-secondary/20">
          <table class="w-full text-right border-collapse text-xs">
            <thead>
              <tr class="bg-surface-container text-primary font-bold border-b border-surface-container-high">
                <th class="p-3">نوع الخدمة / المعاملة</th>
                <th class="p-3">الجهة المرجعية المختصة</th>
                <th class="p-3">أبرز الشروط النظامية</th>
                <th class="p-3">طلب مباشر</th>
              </tr>
            </thead>
            <tbody class="divide-y divide-surface-container-high text-on-surface">
              <tr class="hover:bg-surface-container-low transition-colors">
                <td class="p-3 font-bold text-primary">تجنيس زوجة مواطن (المادة 16)</td>
                <td class="p-3 text-on-surface-variant">الأحوال المدنية / الداخلية</td>
                <td class="p-3 text-on-surface-variant">عقد زواج نظامي + نقاط الإقامة + إنجاب</td>
                <td class="p-3">
                  <a href="https://wa.me/966568922561?text=%D8%A7%D8%B3%D8%AA%D9%81%D8%B3%D8%A7%D8%B1%20%D8%AA%D8%AC%D9%86%D9%8A%D8%B3%20%D8%B2%D9%88%D8%AC%D8%A9%20%D9%85%D9%88%D8%A7%D8%B7%D9%86" target="_blank" rel="noopener noreferrer" class="text-secondary font-bold hover:underline flex items-center gap-1 whitespace-nowrap">
                    <span>تواصل</span>
                    <span class="material-symbols-outlined text-xs">arrow_back</span>
                  </a>
                </td>
              </tr>
              <tr class="hover:bg-surface-container-low transition-colors">
                <td class="p-3 font-bold text-primary">تصريح زواج سعودي من أجنبية (خارج)</td>
                <td class="p-3 text-on-surface-variant">إمارة المنطقة / وزارة الداخلية</td>
                <td class="p-3 text-on-surface-variant">بلوغ السن النظامي + الفحص الطبي + خلو موانع</td>
                <td class="p-3">
                  <a href="https://wa.me/966568922561?text=%D8%A7%D8%B3%D8%AA%D9%81%D8%B3%D8%A7%D8%B1%20%D8%AA%D8%B5%D8%B1%D9%8A%D8%AD%20%D8%B2%D9%88%D8%A7%D8%AC%20%D8%AE%D8%A7%D8%B1%D8%AC%D9%8A" target="_blank" rel="noopener noreferrer" class="text-secondary font-bold hover:underline flex items-center gap-1 whitespace-nowrap">
                    <span>تواصل</span>
                    <span class="material-symbols-outlined text-xs">arrow_back</span>
                  </a>
                </td>
              </tr>
              <tr class="hover:bg-surface-container-low transition-colors">
                <td class="p-3 font-bold text-primary">تجنيس الكفاءات والكوادر الطبية</td>
                <td class="p-3 text-on-surface-variant">الأمر الملكي ولجان الاستقطاب</td>
                <td class="p-3 text-on-surface-variant">شهادات دكتوراه/استشاري + خبرة معتمدة داخل المملكة</td>
                <td class="p-3">
                  <a href="https://wa.me/966568922561?text=%D8%A7%D8%B3%D8%AA%D9%81%D8%B3%D8%A7%D8%B1%20%D8%AA%D8%AC%D9%86%D9%8A%D8%B3%20%D9%83%D9%81%D8%A7%D8%A1%D8%A7%D8%AA%20%D9%88%D8%A3%D8%B7%D8%A8%D8%A7%D8%A1" target="_blank" rel="noopener noreferrer" class="text-secondary font-bold hover:underline flex items-center gap-1 whitespace-nowrap">
                    <span>تواصل</span>
                    <span class="material-symbols-outlined text-xs">arrow_back</span>
                  </a>
                </td>
              </tr>
              <tr class="hover:bg-surface-container-low transition-colors">
                <td class="p-3 font-bold text-primary">تصحيح زواج قائم بدون تصريح</td>
                <td class="p-3 text-on-surface-variant">اللجان الخاصة / وزارة الداخلية</td>
                <td class="p-3 text-on-surface-variant">إثبات قيام الرابطة الزوجية + إشهار + وجود أطفال</td>
                <td class="p-3">
                  <a href="https://wa.me/966568922561?text=%D8%A7%D8%B3%D8%AA%D9%81%D8%B3%D8%A7%D8%B1%20%D8%AA%D8%B5%D8%AD%D9%8A%D8%AD%20%D8%B2%D9%88%D8%A7%D8%AC%20%D9%82%D8%A7%D8%A6%D9%85" target="_blank" rel="noopener noreferrer" class="text-secondary font-bold hover:underline flex items-center gap-1 whitespace-nowrap">
                    <span>تواصل</span>
                    <span class="material-symbols-outlined text-xs">arrow_back</span>
                  </a>
                </td>
              </tr>
              <tr class="hover:bg-surface-container-low transition-colors">
                <td class="p-3 font-bold text-primary">توثيق العقد عبر بوابة ناجز والعدل</td>
                <td class="p-3 text-on-surface-variant">محاكم الأحوال الشخصية / العدل</td>
                <td class="p-3 text-on-surface-variant">وجود الموافقة المسبقة أو أمر المحكمة المختصة</td>
                <td class="p-3">
                  <a href="https://wa.me/966568922561?text=%D8%A7%D8%B3%D8%AA%D9%81%D8%B3%D8%A7%D8%B1%20%D8%AA%D9%88%D8%AB%D9%8A%D9%82%20%D9%86%D8%A7%D8%AC%D8%B2" target="_blank" rel="noopener noreferrer" class="text-secondary font-bold hover:underline flex items-center gap-1 whitespace-nowrap">
                    <span>تواصل</span>
                    <span class="material-symbols-outlined text-xs">arrow_back</span>
                  </a>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      <!-- SECTION 5: VIP Call to Action Box -->
      <section class="max-w-7xl mx-auto px-gutter py-space-lg w-full">
        <div class="p-space-lg rounded-3xl bg-primary text-on-primary shadow-xl border-2 border-secondary flex flex-col md:flex-row items-center justify-between gap-space-md">
          <div class="text-right max-w-xl">
            <span class="text-xs text-secondary-fixed font-bold block mb-1">مستشارك الخاص جاهز للإجابة الفورية</span>
            <h3 class="text-xl font-bold text-white mb-1">هل تحتاج لتقييم قانوني أولي لمعاملتك خلال دقائق؟</h3>
            <p class="text-xs text-primary-fixed-dim leading-relaxed">تواصل مباشرة مع المستشار أبو خالد عبر الواتساب، وأرسل تفاصيل المعاملة لنزودك بكافة المتطلبات والمسار النظامي.</p>
          </div>
          <div class="flex flex-col sm:flex-row items-center gap-2 shrink-0 w-full md:w-auto">
            <a href="https://wa.me/966568922561?text=%D9%85%D8%B1%D8%AD%D8%A8%D8%A7%D9%8B%D8%8C%20%D8%A3%D8%B1%D8%BA%D8%A8%20%D8%A8%D8%AA%D9%82%D9%8A%D9%8A%D9%85%20%D9%85%D8%B9%D8%A7%D9%85%D9%84%D8%AA%D9%8A%20%D9%85%D8%B9%20%D8%A7%D9%84%D9%85%D8%B3%D8%AA%D8%B4%D8%A7%D8%B1%20%D8%A3%D8%A8%D9%88%20%D8%AE%D8%A7%D9%84%D8%AF" target="_blank" rel="noopener noreferrer" class="w-full sm:w-auto px-4 py-3 rounded-xl bg-secondary-container text-on-secondary-fixed font-bold text-xs hover:bg-secondary-fixed transition-all flex items-center justify-center gap-1.5 shadow-md whitespace-nowrap">
              <span class="material-symbols-outlined text-base">send</span>
              <span>واتساب المستشار 0568922561</span>
            </a>
            <a href="tel:0568922561" class="w-full sm:w-auto px-4 py-3 rounded-xl bg-surface-container-lowest text-primary font-bold text-xs hover:bg-surface-container-high transition-colors flex items-center justify-center gap-1 whitespace-nowrap">
              <span class="material-symbols-outlined text-base">phone_in_talk</span>
              <span>اتصال فوري</span>
            </a>
          </div>
        </div>
      </section>
    `;
  },

  // ==========================================
  // 6. LEGAL BLOG VIEW
  // ==========================================
  renderBlog() {
    const articles = Store.state.articles.length > 0 ? Store.state.articles : [
      {
        slug: "saudi-citizenship-points-system-guide-1446",
        title: "دليل نظام نقاط التجنيس في السعودية (المادة 9) والتعديلات السامية لعام 1446هـ",
        categoryLabel: "نظام التجنيس السعودي",
        date: "2026-09-05",
        readTime: "6 دقائق",
        summary: "شرح مفصل لكيفية احتساب الـ 23 نقطة المطلوبة لمنح الجنسية السعودية، وشروط المؤهلات العلمية وسنوات الإقامة."
      },
      {
        slug: "marriage-permit-conditions-saudi-foreign-national",
        title: "شروط استخراج تصريح زواج سعودي من أجنبية مقيمة أو من الخارج (تصريح مفتوح)",
        categoryLabel: "تصاريح وتوثيق الزواج",
        date: "2026-08-28",
        readTime: "8 دقائق",
        summary: "الضوابط الشرعية والنظامية لاستخراج موافقة الزواج من الإمارة ووزارة الداخلية والمستندات المطلوبة للطرفين."
      },
      {
        slug: "rectification-unauthorized-marriage-najiz-documentation",
        title: "خطوات تصحيح وضع الزواج غير المصرح به وتوثيق العقد رسمياً عبر ناجز والأحوال",
        categoryLabel: "تصحيح الأوضاع والتوثيق",
        date: "2026-08-15",
        readTime: "5 دقائق",
        summary: "كيف تنهي معاملة تصحيح وضع الزواج القائم دون الحصول على موافقة مسبقة وتستخرج صك النكاح الإلكتروني."
      }
    ];

    return `
      <section class="relative w-full bg-primary text-on-primary py-space-lg px-gutter">
        <div class="max-w-7xl mx-auto flex flex-col gap-2 max-w-3xl text-right">
          <span class="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-secondary/20 text-secondary-fixed font-bold text-xs w-fit whitespace-nowrap">
            <span class="material-symbols-outlined text-xs">menu_book</span>
            الجريدة والمدونة القانونية المعتمدة
          </span>
          <h1 class="text-2xl md:text-3xl text-white font-bold leading-tight">
            المقالات والدلائل الإجرائية لأنظمة الجنسية وتصاريح الزواج
          </h1>
          <p class="text-xs md:text-sm text-primary-fixed-dim leading-relaxed">
            شروحات موثقة، تحليلات نظامية تفصيلية، وأدلة إجرائية مبسطة تشمل نظام الجنسية العربية السعودية، استخراج تصاريح الزواج من الإمارة، وتصحيح الأوضاع برعاية المستشار أبو خالد.
          </p>
        </div>
      </section>

      <section class="max-w-7xl mx-auto px-gutter py-space-lg w-full">
        <div class="grid grid-cols-1 md:grid-cols-3 gap-space-md">
          ${articles.map(art => `
            <article class="flex flex-col rounded-2xl bg-surface-container-lowest p-4 shadow-sm hover:shadow-md transition-all border border-secondary/20 text-right">
              <div class="flex items-center justify-between text-[11px] text-secondary font-bold mb-1.5 whitespace-nowrap">
                <span>${art.categoryLabel}</span>
                <span>${art.readTime}</span>
              </div>
              <h3 class="font-bold text-sm text-primary mb-1.5 leading-snug">
                <a href="#legal-blog/${art.slug}" class="hover:text-secondary transition-colors">${art.title}</a>
              </h3>
              <p class="text-[11px] text-on-surface-variant leading-relaxed mb-3 flex-grow">${art.summary}</p>
              <div class="pt-2 border-t border-surface-container-high flex items-center justify-between text-[11px]">
                <span class="text-outline">${art.date}</span>
                <a href="#legal-blog/${art.slug}" class="text-primary font-bold hover:underline flex items-center gap-1 whitespace-nowrap">
                  <span>قراءة المقال</span>
                  <span class="material-symbols-outlined text-xs">arrow_back</span>
                </a>
              </div>
            </article>
          `).join('')}
        </div>
      </section>
    `;
  },

  bindBlogEvents() {},

  async renderArticleDetail(slug, root) {
    root.innerHTML = `
      <div class="flex items-center justify-center min-h-[40vh]">
        <div class="w-8 h-8 border-4 border-primary border-t-secondary rounded-full animate-spin"></div>
      </div>
    `;

    const article = await Store.fetchArticleBySlug(slug);
    if (!article) {
      root.innerHTML = `
        <div class="max-w-4xl mx-auto px-gutter py-space-lg text-center">
          <h2 class="font-bold text-xl text-primary mb-2">المقال غير موجود</h2>
          <a href="#legal-blog" class="text-secondary font-bold text-xs underline">العودة لقائمة المقالات</a>
        </div>
      `;
      return;
    }

    root.innerHTML = `
      <article class="max-w-3xl mx-auto px-gutter py-space-lg text-right">
        <div class="mb-space-md">
          <a href="#legal-blog" class="inline-flex items-center gap-1 text-xs text-secondary font-bold hover:underline mb-3 whitespace-nowrap">
            <span class="material-symbols-outlined text-sm">arrow_forward</span>
            <span>العودة للمدونة</span>
          </a>
          <span class="px-3 py-1 rounded-full bg-secondary-container text-on-secondary-fixed text-xs font-bold block w-fit mb-2 whitespace-nowrap">${article.categoryLabel}</span>
          <h1 class="font-bold text-xl md:text-3xl text-primary leading-tight mb-2">${article.title}</h1>
          <div class="flex items-center gap-3 text-xs text-outline font-label-sm border-b border-surface-container-high pb-3 whitespace-nowrap">
            <span>بقلم: ${article.author}</span>
            <span>•</span>
            <span>التاريخ: ${article.date}</span>
            <span>•</span>
            <span>زمن القراءة: ${article.readTime}</span>
          </div>
        </div>

        <div class="prose max-w-none text-on-surface text-xs md:text-sm leading-relaxed space-y-3 font-body-lg">
          ${article.content ? article.content.split('\n').map(p => p.trim() ? `<p>${p}</p>` : '').join('') : `<p>${article.summary}</p>`}
        </div>

        <div class="mt-space-lg p-4 rounded-2xl bg-primary text-on-primary flex flex-col md:flex-row items-center justify-between gap-space-md">
          <div class="text-right">
            <h3 class="font-bold text-sm text-secondary-fixed mb-0.5">هل لديك حالة مشابهة وترغب في الاستشارة؟</h3>
            <p class="text-xs text-primary-fixed-dim">تواصل الآن مع المستشار أبو خالد لمعاينة وثائقك وفحص الملف مجاناً.</p>
          </div>
          <a href="https://wa.me/966568922561?text=${encodeURIComponent('مرحبا أبو خالد، قرأت مقال (' + article.title + ') وأرغب في استشارة نظامية.')}" target="_blank" rel="noopener noreferrer" class="px-4 py-2.5 rounded-xl bg-secondary-container text-on-secondary-fixed font-bold text-xs hover:bg-secondary-fixed transition-colors shrink-0 whitespace-nowrap">
            محادثة المستشار عبر واتساب
          </a>
        </div>
      </article>
    `;
  },

  // ==========================================
  // 7. FAQ VIEW
  // ==========================================
  renderFaq() {
    const faqs = Store.state.faqs.length > 0 ? Store.state.faqs : [
      {
        category: "marriage",
        question: "ما هي شروط استخراج تصريح زواج سعودي من أجنبية مقيمة أو من الخارج؟",
        answer: "تشمل الشروط الأساسية ألا يقل عمر المتقدم السعودي عن الحد الأدنى النظامي (30 عاماً أو 25 عاماً في حالات الاستثناء وقرابة الدرجة الأولى)، خلو السجل الجنائي، اجتياز الفحص الطبي للطرفين، وإثبات الدخل المالي المناسب. يقدم مكتب الوسام الذهبي استشارات خاصة وتصاريح مفتوحة الطلب لمختلف الجنسيات."
      },
      {
        category: "citizenship",
        question: "كيف يتم تجنيس الكفاءات والعلماء والمستثمرين في المملكة العربية السعودية؟",
        answer: "يتم منح الجنسية وفق الأوامر الملكية السامية للكفاءات الاستثنائية والعلماء والأطباء والمبتكرين والمستثمرين، وفق دراسة الملف والتوصية برفعها للديوان الملكي ووزارة الداخلية، إلى جانب نظام النقاط (23 نقطة من أصل 33) استناداً إلى اللائحة التنفيذية للمادة 9."
      },
      {
        category: "rectification",
        question: "كيف يتم تصحيح وضع زواج تم بدون تصريح مسبق وتوثيق العقد عبر ناجز؟",
        answer: "تتم العملية عبر تقديم استدعاء للإمارة مبيناً فيه أسباب عدم التقديم المسبق ووجود أبناء أو طول مدة الزواج، ومراجعة اللجنة الإقليمية للرفع للداخلية، ثم صدور الإحالة لمحكمة الأحوال الشخصية لإصدار صك إثبات نكاح إلكتروني وإضافة المواليد في أبشر وسجل الأسرة."
      }
    ];

    return `
      <section class="relative w-full bg-primary text-on-primary py-space-lg px-gutter">
        <div class="max-w-7xl mx-auto flex flex-col items-center text-center max-w-3xl">
          <span class="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-secondary/20 text-secondary-fixed font-bold text-xs mb-2 whitespace-nowrap">
            <span class="material-symbols-outlined text-xs">quiz</span>
            الدليل الإجرائي المعتمد
          </span>
          <h1 class="text-2xl md:text-3xl text-white font-bold leading-tight mb-2">
            الأسئلة الشائعة وإجابات الأنظمة المعتمدة
          </h1>
          <p class="text-xs md:text-sm text-primary-fixed-dim leading-relaxed mb-4">
            إجابات نظامية شاملة ودقيقة أعدت وأشرف عليها المستشار التنفيذي أبو خالد، مستندة إلى الأوامر الملكية، واللوائح التنفيذية لنظام الجنسية وتصاريح الزواج في المملكة.
          </p>

          <div class="w-full max-w-xl relative">
            <input type="text" id="faqSearchInput" placeholder="ابحث بكلمات مفتاحية (مثال: تجنيس، تصريح زواج، نقاط، ناجز)..." class="w-full p-3 pr-10 rounded-xl bg-surface-container-lowest text-on-surface font-body-md text-xs shadow-lg focus:outline-none focus:ring-2 focus:ring-secondary">
            <span class="material-symbols-outlined text-secondary absolute right-3 top-3 text-lg">search</span>
          </div>
        </div>
      </section>

      <section class="max-w-4xl mx-auto px-gutter py-space-lg w-full">
        <div class="flex flex-col gap-space-sm" id="faqListContainer">
          ${faqs.map(faq => `
            <details class="group rounded-2xl bg-surface-container-lowest p-4 shadow-sm border border-secondary/20 transition-all text-right">
              <summary class="flex items-center justify-between cursor-pointer list-none font-bold text-xs md:text-sm text-primary">
                <span>${faq.question}</span>
                <span class="material-symbols-outlined text-secondary transition-transform duration-200 group-open:-rotate-180 text-base">expand_more</span>
              </summary>
              <div class="mt-2 pt-2 text-xs text-on-surface-variant leading-relaxed border-t border-surface-container-high">
                ${faq.answer}
              </div>
            </details>
          `).join('')}
        </div>
      </section>
    `;
  },

  bindFaqEvents() {
    const input = document.getElementById('faqSearchInput');
    if (input) {
      input.addEventListener('input', (e) => {
        Store.fetchFaqs(e.target.value);
      });
    }
  },

  // ==========================================
  // 8. APPLICATION & CONTACT VIEW
  // ==========================================
  renderApply() {
    return `
      <section class="relative w-full bg-primary text-on-primary py-space-lg px-gutter">
        <div class="max-w-7xl mx-auto flex flex-col items-center text-center max-w-3xl">
          <span class="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-secondary/20 text-secondary-fixed font-bold text-xs mb-2 whitespace-nowrap">
            <span class="material-symbols-outlined text-xs">edit_note</span>
            استمارة القيد والدراسة الفورية
          </span>
          <h1 class="text-2xl md:text-3xl text-white font-bold leading-tight mb-2">
            ابدأ معاملتك الآن - قيد واستشارة مباشرة مع المستشار أبو خالد
          </h1>
          <p class="text-xs md:text-sm text-primary-fixed-dim leading-relaxed">
            قم بتعبئة بيانات الطلب الأساسية للحصول على استجابة فورية وقيد رقم متابعة مخصص لمعاملتك.
          </p>
        </div>
      </section>

      <section class="max-w-4xl mx-auto px-gutter py-space-lg w-full">
        <div class="bg-surface-container-lowest p-space-md md:p-space-lg rounded-3xl shadow-xl border-2 border-secondary">
          <form id="applyForm" class="flex flex-col gap-space-md text-right">
            <div class="grid grid-cols-1 md:grid-cols-2 gap-space-sm">
              <div class="flex flex-col gap-1">
                <label class="font-bold text-xs text-primary">الاسم الكامل <span class="text-secondary">*</span></label>
                <input type="text" name="applicantName" required placeholder="الاسم الثلاثي أو الرباعي" class="p-2.5 rounded-xl bg-surface-container-low border border-outline-variant text-xs focus:outline-none focus:ring-2 focus:ring-secondary">
              </div>

              <div class="flex flex-col gap-1">
                <label class="font-bold text-xs text-primary">رقم الجوال (واتساب) <span class="text-secondary">*</span></label>
                <input type="tel" name="phone" required placeholder="05XXXXXXXX" class="p-2.5 rounded-xl bg-surface-container-low border border-outline-variant text-xs focus:outline-none focus:ring-2 focus:ring-secondary dir-ltr">
              </div>

              <div class="flex flex-col gap-1">
                <label class="font-bold text-xs text-primary">رقم الهوية الوطنية / الإقامة</label>
                <input type="text" name="nationalId" placeholder="10XXXXXXXX" class="p-2.5 rounded-xl bg-surface-container-low border border-outline-variant text-xs focus:outline-none focus:ring-2 focus:ring-secondary dir-ltr">
              </div>

              <div class="flex flex-col gap-1">
                <label class="font-bold text-xs text-primary">نوع الخدمة المطلوب التقديم عليها <span class="text-secondary">*</span></label>
                <select name="serviceType" required class="p-2.5 rounded-xl bg-surface-container-low border border-outline-variant text-xs focus:outline-none focus:ring-2 focus:ring-secondary font-bold">
                  <option value="marriage-permits">تصريح زواج سعودي من أجنبية مقيمة</option>
                  <option value="marriage-permits-open">تصريح زواج من الخارج (تصريح مفتوح)</option>
                  <option value="citizenship-services">معاملة تجنيس (كفاءات / مستثمرين / أبناء مواطنات)</option>
                  <option value="rectification">تصحيح وضع زواج وتوثيق عقد إلكتروني عبر ناجز</option>
                  <option value="other">استشارة عامة في الأحوال المدنية والمعاملات</option>
                </select>
              </div>
            </div>

            <div class="grid grid-cols-1 md:grid-cols-2 gap-space-sm">
              <div class="flex flex-col gap-1">
                <label class="font-bold text-xs text-primary">جنسية الطرف الآخر (الزوج / الزوجة)</label>
                <input type="text" name="partnerNationality" placeholder="مثال: مصري، مغربية، يمني..." class="p-2.5 rounded-xl bg-surface-container-low border border-outline-variant text-xs focus:outline-none focus:ring-2 focus:ring-secondary">
              </div>

              <div class="flex flex-col gap-1">
                <label class="font-bold text-xs text-primary">حالة إقامة الطرف الآخر</label>
                <select name="partnerResidenceStatus" class="p-2.5 rounded-xl bg-surface-container-low border border-outline-variant text-xs focus:outline-none focus:ring-2 focus:ring-secondary font-bold">
                  <option value="مقيمة بالمملكة">مقيمة داخل المملكة (إقامة سارية)</option>
                  <option value="خارج المملكة">موجودة خارج المملكة العربية السعودية</option>
                  <option value="زيارة أو مولودة">زيارة عائلية أو مولودة بالمملكة</option>
                </select>
              </div>
            </div>

            <div class="flex flex-col gap-1">
              <label class="font-bold text-xs text-primary">تفاصيل المعاملة والاستفسار الخاص</label>
              <textarea name="details" rows="3" placeholder="اذكر أية تفاصيل إضافية مثل السن، وجود صلة قرابة، أو سوابق التقديم للإمارة..." class="p-2.5 rounded-xl bg-surface-container-low border border-outline-variant text-xs focus:outline-none focus:ring-2 focus:ring-secondary"></textarea>
            </div>

            <button type="submit" class="w-full py-3.5 rounded-xl bg-primary text-on-primary hover:bg-primary-container transition-all font-bold text-xs shadow-lg flex items-center justify-center gap-2 whitespace-nowrap">
              <span class="material-symbols-outlined text-secondary-fixed text-base">send</span>
              <span>قيد المعاملة واستخراج رقم المتابعة</span>
            </button>
          </form>
        </div>
      </section>
    `;
  },

  bindApplyFormEvents() {
    const form = document.getElementById('applyForm');
    if (form) {
      form.addEventListener('submit', async (e) => {
        e.preventDefault();
        const formData = new FormData(form);
        const data = Object.fromEntries(formData.entries());

        const newApp = await Store.submitApplication(data);
        if (newApp) {
          Router.navigate(`track/${newApp.id}`);
        }
      });
    }
  },

  // ==========================================
  // 9. PUBLIC TRACKER VIEW
  // ==========================================
  renderTrack(param) {
    return `
      <section class="relative w-full bg-primary text-on-primary py-space-lg px-gutter">
        <div class="max-w-7xl mx-auto flex flex-col items-center text-center max-w-3xl">
          <span class="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-secondary/20 text-secondary-fixed font-bold text-xs mb-2 whitespace-nowrap">
            <span class="material-symbols-outlined text-xs">find_in_page</span>
            نظام الاستعلام الإلكتروني الموحد
          </span>
          <h1 class="text-2xl md:text-3xl text-white font-bold leading-tight mb-2">
            متابعة حالة المعاملة برقم القيد أو الهوية
          </h1>
          <p class="text-xs md:text-sm text-primary-fixed-dim leading-relaxed mb-4">
            أدخل رقم القيد المخصص لمعاملتك (مثل: WSM-2026-8941) لمشاهدة خطة سيرها الميدانية وملاحظات المستشار أبو خالد.
          </p>

          <form id="trackForm" class="w-full max-w-xl flex items-center gap-2">
            <input type="text" id="trackInput" value="${param || ''}" placeholder="أدخل رقم القيد WSM-2026-XXXX أو رقم الجوال..." class="w-full p-3 rounded-xl bg-surface-container-lowest text-on-surface font-body-md text-xs shadow-lg focus:outline-none focus:ring-2 focus:ring-secondary uppercase dir-ltr font-bold">
            <button type="submit" class="px-4 py-3 rounded-xl bg-secondary-container text-on-secondary-fixed font-bold text-xs hover:bg-secondary-fixed transition-colors shrink-0 shadow-lg flex items-center gap-1 whitespace-nowrap">
              <span class="material-symbols-outlined text-sm">search</span>
              <span>استعلام</span>
            </button>
          </form>
        </div>
      </section>

      <section class="max-w-4xl mx-auto px-gutter py-space-lg w-full" id="trackResultContainer">
        <!-- Timeline output -->
      </section>
    `;
  },

  bindTrackEvents() {
    const form = document.getElementById('trackForm');
    const input = document.getElementById('trackInput');
    const container = document.getElementById('trackResultContainer');

    const performLookup = async (code) => {
      if (!code || !container) return;
      container.innerHTML = `
        <div class="flex items-center justify-center p-space-lg">
          <div class="w-8 h-8 border-4 border-primary border-t-secondary rounded-full animate-spin"></div>
        </div>
      `;

      const app = await Store.trackApplication(code);
      if (!app) {
        container.innerHTML = `
          <div class="p-4 rounded-2xl bg-surface-container-lowest shadow-md text-center border border-red-200">
            <span class="material-symbols-outlined text-3xl text-error mb-1">search_off</span>
            <h3 class="font-bold text-sm text-primary mb-1">لم نتمكن من العثور على معاملة مطابقة</h3>
            <p class="text-xs text-on-surface-variant mb-3">يرجى التأكد من كتابة رقم القيد الصحيح أو التواصل المباشر مع مكتب المستشار أبو خالد.</p>
            <a href="https://wa.me/966568922561?text=${encodeURIComponent('مرحبا أبو خالد، استعلمت عن رقم القيد (' + code + ') ولم أجد النتيجة، أرجو المساعدة.')}" target="_blank" rel="noopener noreferrer" class="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-secondary-container text-on-secondary-fixed font-bold text-xs whitespace-nowrap">
              <span class="material-symbols-outlined text-sm">chat</span>
              <span>محادثة المستشار للمساعدة</span>
            </a>
          </div>
        `;
        return;
      }

      container.innerHTML = `
        <div class="bg-surface-container-lowest rounded-3xl p-space-md md:p-space-lg shadow-xl border-2 border-secondary printable-area text-right">
          <div class="flex flex-col md:flex-row md:items-center justify-between gap-2 border-b border-surface-container-high pb-3 mb-4">
            <div>
              <div class="flex items-center gap-2">
                <span class="px-2.5 py-0.5 rounded-full bg-primary text-secondary-fixed font-bold text-xs whitespace-nowrap">${app.id}</span>
                <span class="text-[11px] text-outline whitespace-nowrap">تاريخ القيد: ${new Date(app.createdAt).toLocaleDateString('ar-SA')}</span>
              </div>
              <h2 class="font-bold text-lg text-primary mt-1">${app.serviceName}</h2>
              <span class="text-xs text-on-surface-variant">صاحب الطلب: ${app.applicantName} | هاتف: ${app.phone}</span>
            </div>

            <div class="flex flex-col items-start md:items-end shrink-0">
              <span class="px-3 py-1 rounded-full bg-secondary-container text-on-secondary-fixed font-bold text-xs whitespace-nowrap">${app.statusLabel}</span>
              <span class="text-[10px] text-outline mt-0.5 whitespace-nowrap">آخر تحديث: ${new Date(app.updatedAt).toLocaleTimeString('ar-SA')}</span>
            </div>
          </div>

          <!-- Progress Bar Steps -->
          <div class="grid grid-cols-4 gap-2 mb-space-lg text-center">
            <div class="flex flex-col items-center gap-1 ${app.stageStep >= 1 ? 'text-primary font-bold' : 'text-outline'}">
              <div class="w-7 h-7 rounded-full ${app.stageStep >= 1 ? 'bg-primary text-secondary-fixed' : 'bg-surface-container'} flex items-center justify-center text-xs">1</div>
              <span class="text-[10px] whitespace-nowrap">فحص الملف</span>
            </div>
            <div class="flex flex-col items-center gap-1 ${app.stageStep >= 2 ? 'text-primary font-bold' : 'text-outline'}">
              <div class="w-7 h-7 rounded-full ${app.stageStep >= 2 ? 'bg-primary text-secondary-fixed' : 'bg-surface-container'} flex items-center justify-center text-xs">2</div>
              <span class="text-[10px] whitespace-nowrap">الصياغة والخطابات</span>
            </div>
            <div class="flex flex-col items-center gap-1 ${app.stageStep >= 3 ? 'text-primary font-bold' : 'text-outline'}">
              <div class="w-7 h-7 rounded-full ${app.stageStep >= 3 ? 'bg-primary text-secondary-fixed' : 'bg-surface-container'} flex items-center justify-center text-xs">3</div>
              <span class="text-[10px] whitespace-nowrap">متابعة الإمارة/الداخلية</span>
            </div>
            <div class="flex flex-col items-center gap-1 ${app.stageStep >= 4 ? 'text-primary font-bold' : 'text-outline'}">
              <div class="w-7 h-7 rounded-full ${app.stageStep >= 4 ? 'bg-primary text-secondary-fixed' : 'bg-surface-container'} flex items-center justify-center text-xs">4</div>
              <span class="text-[10px] whitespace-nowrap">الموافقة والتوثيق</span>
            </div>
          </div>

          <!-- Notes Callout -->
          <div class="p-3 rounded-2xl bg-surface-container-low border border-secondary/30 mb-4">
            <span class="font-bold text-xs text-primary flex items-center gap-1 mb-0.5">
              <span class="material-symbols-outlined text-secondary text-sm">sticky_note_2</span>
              ملاحظة وتوجيه المستشار أبو خالد:
            </span>
            <p class="text-xs text-on-surface-variant leading-relaxed">${app.notes || 'المعاملة تواصل مسارها الإجرائي بشكل ممتاز.'}</p>
          </div>

          <!-- History Timeline -->
          <div class="flex flex-col gap-2">
            <h4 class="font-bold text-xs text-primary">سجل المحطات والمتابعات الميدانية:</h4>
            <div class="space-y-2">
              ${(app.history || []).map(h => `
                <div class="flex items-start gap-2 p-2.5 rounded-xl bg-surface-container-lowest border border-surface-container-high">
                  <span class="material-symbols-outlined text-secondary text-sm shrink-0 mt-0.5">check_circle</span>
                  <div class="flex flex-col">
                    <span class="font-bold text-xs text-primary">${h.title}</span>
                    <span class="text-[11px] text-on-surface-variant mt-0.5">${h.note}</span>
                    <span class="text-[10px] text-outline mt-0.5">${new Date(h.time).toLocaleString('ar-SA')}</span>
                  </div>
                </div>
              `).join('')}
            </div>
          </div>

          <div class="mt-4 pt-3 border-t border-surface-container-high flex flex-wrap items-center justify-between gap-2 no-print">
            <button onclick="window.print()" class="px-3.5 py-1.5 rounded-xl bg-surface-container text-primary font-bold text-xs hover:bg-surface-container-high transition-colors flex items-center gap-1 whitespace-nowrap">
              <span class="material-symbols-outlined text-sm">print</span>
              <span>طباعة ملخص المعاملة</span>
            </button>
            <a href="https://wa.me/966568922561?text=${encodeURIComponent('مرحبا أبو خالد، أتابع المعاملة رقم (' + app.id + ') وأود الاستفسار.')}" target="_blank" rel="noopener noreferrer" class="px-3.5 py-1.5 rounded-xl bg-secondary-container text-on-secondary-fixed font-bold text-xs hover:bg-secondary-fixed transition-colors flex items-center gap-1 whitespace-nowrap">
              <span class="material-symbols-outlined text-sm">chat</span>
              <span>تواصل مباشر مع المستشار</span>
            </a>
          </div>
        </div>
      `;
    };

    if (form) {
      form.addEventListener('submit', (e) => {
        e.preventDefault();
        const code = input ? input.value.trim() : '';
        if (code) {
          Router.navigate(`track/${code}`);
        }
      });
    }

    const currentParam = Store.state.routeParams.param;
    if (currentParam) {
      performLookup(currentParam);
    }
  },

  // ==========================================
  // 10. EXECUTIVE ADMIN PORTAL VIEW
  // ==========================================
  // ==========================================
  // 10. EXECUTIVE ADMIN PORTAL VIEW
  // ==========================================
  renderAdmin() {
    const isAuthed = sessionStorage.getItem('admin_authed') === 'true';
    const settings = Store.state.siteSettings || {
      adminEmail: "admin@alwesam.sa",
      adminPassword: "admin123",
      siteLogo: "/assets/images/official_logo.png",
      logoSize: 42,
      heroBgImage: "/assets/images/luxury_saudi_corporate_and_legal_background_banner_elegant_modern_riyadh/screen.png",
      phone: "0568922561",
      whatsapp: "966568922561",
      workingHours: "9:00 ص - 10:00 م",
      location: "المملكة العربية السعودية - جميع الإمارات",
      email: "info@alwesam-aldhahabi.sa"
    };

    if (!isAuthed) {
      return `
        <section class="min-h-[75vh] flex items-center justify-center py-space-xl px-gutter bg-surface-container-low">
          <div class="bg-surface-container-lowest rounded-3xl p-space-xl max-w-md w-full shadow-2xl border-2 border-secondary text-center">
            <div class="w-16 h-16 rounded-full bg-primary-container text-secondary-fixed mx-auto mb-space-md flex items-center justify-center border-2 border-secondary shadow-md">
              <span class="material-symbols-outlined text-3xl">shield</span>
            </div>

            <h2 class="text-xl font-bold text-primary mb-1">لوحة التحكم الإشرافية العليا</h2>
            <p class="text-xs text-on-surface-variant leading-relaxed mb-space-lg">
              بوابة خاصة بالمستشار التنفيذي **أبو خالد** وإدارة مكتب الوسام الذهبي.
            </p>

            <form id="adminAuthForm" class="flex flex-col gap-space-md text-right">
              <div class="flex flex-col gap-1.5">
                <label class="font-bold text-xs text-primary">البريد الإلكتروني للوحة</label>
                <div class="relative">
                  <input type="email" id="adminEmailInput" required value="admin@alwesam.sa" placeholder="admin@alwesam.sa" class="w-full p-3 pl-10 rounded-xl bg-surface-container-low text-xs border border-outline-variant font-bold text-left text-primary focus:border-secondary transition-all" dir="ltr">
                  <span class="material-symbols-outlined absolute left-3 top-2.5 text-outline text-lg">mail</span>
                </div>
              </div>

              <div class="flex flex-col gap-1.5">
                <label class="font-bold text-xs text-primary">كلمة المرور / الرمز السري</label>
                <div class="relative">
                  <input type="password" id="adminPasswordInput" required placeholder="••••••••" class="w-full p-3 pl-10 rounded-xl bg-surface-container-low text-xs border border-outline-variant font-bold text-center tracking-widest text-primary focus:border-secondary transition-all">
                  <span class="material-symbols-outlined absolute left-3 top-2.5 text-outline text-lg">lock</span>
                </div>
                <span class="text-[10px] text-outline text-center">الافتراضي: admin@alwesam.sa / admin123 أو PIN (1234)</span>
              </div>

              <button type="submit" class="py-3 rounded-xl bg-primary text-secondary-fixed font-bold text-xs hover:bg-primary-container transition-all shadow-lg flex items-center justify-center gap-2">
                <span class="material-symbols-outlined text-sm">login</span>
                <span>تسجيل الدخول للوحة الإشراف</span>
              </button>
            </form>
          </div>
        </section>
      `;
    }

    const stats = Store.state.adminStats || { total: 0, processing: 0, approved: 0, pending: 0 };
    const applications = Store.state.applications || [];
    const articles = Store.state.articles || [];
    const faqs = Store.state.faqs || [];
    const services = Store.state.customServices || [];

    const activeTab = window._adminTab || 'applications';

    return `
      <!-- Sovereign Top Admin Header -->
      <section class="relative w-full bg-primary text-on-primary py-space-md px-gutter border-b-2 border-secondary/30 shadow-lg">
        <div class="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-space-md text-right">
          <div class="flex items-center gap-3">
            <div class="w-12 h-12 rounded-full bg-surface-container-lowest text-primary flex items-center justify-center border-2 border-secondary shadow-md shrink-0">
              <span class="material-symbols-outlined text-2xl text-secondary-dark">admin_panel_settings</span>
            </div>
            <div>
              <div class="flex items-center gap-2">
                <h1 class="font-bold text-lg text-white">لوحة التحكم الاحترافية العليا</h1>
                <span class="px-2.5 py-0.5 rounded-full bg-secondary-container text-on-secondary-fixed text-[10px] font-bold">المستشار أبو خالد</span>
              </div>
              <span class="text-xs text-primary-fixed-dim">التحكم الكامل بالشعار، الصور، الخدمات، أرقام التواصل، والبريد الإلكتروني</span>
            </div>
          </div>

          <div class="flex items-center gap-2">
            <button id="adminRefreshBtn" class="px-3.5 py-2 rounded-xl bg-primary-container text-secondary-fixed hover:bg-surface-container-high/20 font-bold text-xs flex items-center gap-1.5 border border-secondary/30 transition-all shadow-sm">
              <span class="material-symbols-outlined text-base">refresh</span>
              <span>تحديث البيانات</span>
            </button>
            <button id="adminLogoutBtn" class="px-3.5 py-2 rounded-xl bg-error/20 text-red-200 hover:bg-error/30 font-bold text-xs flex items-center gap-1.5 border border-red-500/30 transition-all">
              <span class="material-symbols-outlined text-base">lock</span>
              <span>قفل اللوحة</span>
            </button>
          </div>
        </div>

        <!-- Comprehensive Sub Navigation Tabs Bar -->
        <div class="max-w-7xl mx-auto pt-space-md flex items-center gap-1.5 overflow-x-auto text-xs font-bold no-scrollbar">
          <button data-admin-tab="applications" class="px-3.5 py-2 rounded-t-xl transition-all flex items-center gap-1 whitespace-nowrap ${
            activeTab === 'applications' ? 'bg-surface text-primary border-t-2 border-x border-secondary' : 'bg-primary-container/60 text-primary-fixed-dim hover:text-white'
          }">
            <span class="material-symbols-outlined text-base">assignment</span>
            <span>المعاملات (${applications.length})</span>
          </button>

          <button data-admin-tab="media" class="px-3.5 py-2 rounded-t-xl transition-all flex items-center gap-1 whitespace-nowrap ${
            activeTab === 'media' ? 'bg-surface text-primary border-t-2 border-x border-secondary' : 'bg-primary-container/60 text-primary-fixed-dim hover:text-white'
          }">
            <span class="material-symbols-outlined text-base">image</span>
            <span>الشعار والصور من الجهاز</span>
          </button>

          <button data-admin-tab="services" class="px-3.5 py-2 rounded-t-xl transition-all flex items-center gap-1 whitespace-nowrap ${
            activeTab === 'services' ? 'bg-surface text-primary border-t-2 border-x border-secondary' : 'bg-primary-container/60 text-primary-fixed-dim hover:text-white'
          }">
            <span class="material-symbols-outlined text-base">grid_view</span>
            <span>إدارة الخدمات المخصصة</span>
          </button>

          <button data-admin-tab="contact" class="px-3.5 py-2 rounded-t-xl transition-all flex items-center gap-1 whitespace-nowrap ${
            activeTab === 'contact' ? 'bg-surface text-primary border-t-2 border-x border-secondary' : 'bg-primary-container/60 text-primary-fixed-dim hover:text-white'
          }">
            <span class="material-symbols-outlined text-base">call</span>
            <span>أرقام التواصل والروابط</span>
          </button>

          <button data-admin-tab="credentials" class="px-3.5 py-2 rounded-t-xl transition-all flex items-center gap-1 whitespace-nowrap ${
            activeTab === 'credentials' ? 'bg-surface text-primary border-t-2 border-x border-secondary' : 'bg-primary-container/60 text-primary-fixed-dim hover:text-white'
          }">
            <span class="material-symbols-outlined text-base">key</span>
            <span>البريد وكلمة السر</span>
          </button>

          <button data-admin-tab="articles" class="px-3.5 py-2 rounded-t-xl transition-all flex items-center gap-1 whitespace-nowrap ${
            activeTab === 'articles' ? 'bg-surface text-primary border-t-2 border-x border-secondary' : 'bg-primary-container/60 text-primary-fixed-dim hover:text-white'
          }">
            <span class="material-symbols-outlined text-base">article</span>
            <span>المدونة (${articles.length})</span>
          </button>

          <button data-admin-tab="faqs" class="px-3.5 py-2 rounded-t-xl transition-all flex items-center gap-1 whitespace-nowrap ${
            activeTab === 'faqs' ? 'bg-surface text-primary border-t-2 border-x border-secondary' : 'bg-primary-container/60 text-primary-fixed-dim hover:text-white'
          }">
            <span class="material-symbols-outlined text-base">help</span>
            <span>الأسئلة الشائعة (${faqs.length})</span>
          </button>

          <button data-admin-tab="analytics" class="px-3.5 py-2 rounded-t-xl transition-all flex items-center gap-1 whitespace-nowrap ${
            activeTab === 'analytics' ? 'bg-surface text-primary border-t-2 border-x border-secondary' : 'bg-primary-container/60 text-primary-fixed-dim hover:text-white'
          }">
            <span class="material-symbols-outlined text-base">analytics</span>
            <span>التقارير</span>
          </button>
        </div>
      </section>

      <!-- Main Admin Content Area -->
      <section class="max-w-7xl mx-auto px-gutter py-space-lg w-full">
        ${activeTab === 'applications' ? this.renderAdminApplicationsTab(stats, applications) : ''}
        ${activeTab === 'media' ? this.renderAdminMediaTab(settings) : ''}
        ${activeTab === 'services' ? this.renderAdminServicesTab(services) : ''}
        ${activeTab === 'contact' ? this.renderAdminContactTab(settings) : ''}
        ${activeTab === 'credentials' ? this.renderAdminCredentialsTab(settings) : ''}
        ${activeTab === 'articles' ? this.renderAdminArticlesTab(articles) : ''}
        ${activeTab === 'faqs' ? this.renderAdminFaqsTab(faqs) : ''}
        ${activeTab === 'analytics' ? this.renderAdminAnalyticsTab(stats, applications) : ''}
      </section>

      <!-- MODALS SUITE -->
      ${this.renderAdminModals()}
    `;
  },

  // --- TAB 1: APPLICATIONS MANAGER ---
  renderAdminApplicationsTab(stats, applications) {
    return `
      <!-- KPI Metrics Bar -->
      <div class="grid grid-cols-2 md:grid-cols-4 gap-space-sm mb-space-md">
        <div class="p-4 rounded-2xl bg-surface-container-lowest shadow-sm border border-secondary/20 flex flex-col text-right">
          <div class="flex items-center justify-between">
            <span class="text-xs text-outline font-bold">إجمالي الطلبات القائمة</span>
            <span class="material-symbols-outlined text-primary text-xl">folder_open</span>
          </div>
          <span class="text-3xl text-primary font-bold mt-1">${stats.total}</span>
        </div>
        <div class="p-4 rounded-2xl bg-surface-container-lowest shadow-sm border border-secondary/20 flex flex-col text-right">
          <div class="flex items-center justify-between">
            <span class="text-xs text-outline font-bold">قيد الدراسة بالإمارة/الداخلية</span>
            <span class="material-symbols-outlined text-secondary text-xl">pending_actions</span>
          </div>
          <span class="text-3xl text-secondary-dark font-bold mt-1">${stats.processing}</span>
        </div>
        <div class="p-4 rounded-2xl bg-surface-container-lowest shadow-sm border border-secondary/20 flex flex-col text-right">
          <div class="flex items-center justify-between">
            <span class="text-xs text-outline font-bold">الموافقات الصادرة</span>
            <span class="material-symbols-outlined text-emerald-600 text-xl">verified</span>
          </div>
          <span class="text-3xl text-emerald-700 font-bold mt-1">${stats.approved}</span>
        </div>
        <div class="p-4 rounded-2xl bg-surface-container-lowest shadow-sm border border-secondary/20 flex flex-col text-right">
          <div class="flex items-center justify-between">
            <span class="text-xs text-outline font-bold">قيد الفحص الأولي</span>
            <span class="material-symbols-outlined text-amber-600 text-xl">query_builder</span>
          </div>
          <span class="text-3xl text-amber-700 font-bold mt-1">${stats.pending}</span>
        </div>
      </div>

      <!-- Controls & Actions Toolbar -->
      <div class="bg-surface-container-lowest rounded-3xl p-space-md shadow-lg border border-secondary/20">
        <div class="flex flex-col md:flex-row items-center justify-between gap-space-sm pb-space-md border-b border-surface-container-high">
          <div class="flex items-center gap-2 w-full md:w-auto">
            <div class="relative w-full md:w-80">
              <input type="text" id="adminSearchInput" placeholder="بحث برقم القيد، الاسم، أو الجوال..." class="w-full pl-9 pr-3 py-2 rounded-xl bg-surface-container-low text-xs border border-outline-variant font-bold text-right focus:border-secondary">
              <span class="material-symbols-outlined absolute left-2.5 top-2.5 text-outline text-base">search</span>
            </div>
            <select id="adminStatusFilter" class="p-2 rounded-xl bg-surface-container-low text-xs border border-outline-variant font-bold text-primary">
              <option value="all">جميع الحالات</option>
              <option value="processing">قيد المتابعة بالإمارة</option>
              <option value="approved">موافقة صادرة</option>
              <option value="pending">قيد التدقيق الأولي</option>
            </select>
          </div>

          <button id="openNewAppModalBtn" class="px-4 py-2 rounded-xl bg-primary text-secondary-fixed hover:bg-primary-container transition-all font-bold text-xs flex items-center gap-1.5 shadow-md whitespace-nowrap w-full md:w-auto justify-center">
            <span class="material-symbols-outlined text-base">add_circle</span>
            <span>تسجيل معاملة جديدة يدويًا</span>
          </button>
        </div>

        <!-- Table Container -->
        <div class="overflow-x-auto mt-space-sm">
          <table class="w-full text-right text-xs">
            <thead>
              <tr class="bg-surface-container-low text-primary font-bold border-b border-surface-container-high">
                <th class="p-3 whitespace-nowrap">رقم القيد</th>
                <th class="p-3 whitespace-nowrap">صاحب المعاملة</th>
                <th class="p-3 whitespace-nowrap">نوع الخدمة المطلوب</th>
                <th class="p-3 whitespace-nowrap">رقم الجوال</th>
                <th class="p-3 whitespace-nowrap">الحالة الميدانية</th>
                <th class="p-3 whitespace-nowrap">المرحلة</th>
                <th class="p-3 text-center whitespace-nowrap">الإجراءات التفاعلية</th>
              </tr>
            </thead>
            <tbody class="divide-y divide-surface-container-high" id="adminTableBody">
              ${applications.length === 0 ? `
                <tr>
                  <td colspan="7" class="p-8 text-center text-outline font-bold">لا توجد معاملات مسجلة حالياً في السجل.</td>
                </tr>
              ` : applications.map(app => `
                <tr class="hover:bg-surface-container-low transition-colors">
                  <td class="p-3 font-bold text-primary whitespace-nowrap">${app.id}</td>
                  <td class="p-3 font-bold text-on-surface whitespace-nowrap">
                    <div>${app.applicantName}</div>
                    <div class="text-[10px] text-outline font-normal">${app.nationalId ? 'هوية: ' + app.nationalId : ''}</div>
                  </td>
                  <td class="p-3 whitespace-nowrap">${app.serviceName}</td>
                  <td class="p-3 dir-ltr text-right font-bold whitespace-nowrap">${app.phone}</td>
                  <td class="p-3 whitespace-nowrap">
                    <span class="px-2.5 py-1 rounded-full text-[10px] font-bold ${
                      app.status === 'approved' ? 'bg-emerald-100 text-emerald-800 border border-emerald-300' :
                      app.status === 'processing' ? 'bg-amber-100 text-amber-800 border border-amber-300' : 'bg-surface-container text-primary'
                    }">
                      ${app.statusLabel}
                    </span>
                  </td>
                  <td class="p-3 font-bold whitespace-nowrap">المرحلة ${app.stageStep || 1}/4</td>
                  <td class="p-3 text-center whitespace-nowrap">
                    <div class="flex items-center justify-center gap-1.5">
                      <button data-admin-edit="${app.id}" title="تحديث حالة المسار" class="px-2.5 py-1 rounded-lg bg-primary text-secondary-fixed font-bold hover:bg-primary-container transition-colors text-[11px] flex items-center gap-1">
                        <span class="material-symbols-outlined text-xs">edit</span>
                        <span>تحديث</span>
                      </button>
                      <button data-admin-view="${app.id}" title="عرض ملف المعاملة والسجل" class="px-2.5 py-1 rounded-lg bg-surface-container-high text-primary font-bold hover:bg-surface-container-highest transition-colors text-[11px] flex items-center gap-1">
                        <span class="material-symbols-outlined text-xs">visibility</span>
                        <span>الملف</span>
                      </button>
                      <a href="https://wa.me/966${app.phone.replace(/^0/, '')}?text=${encodeURIComponent(`السلام عليكم ورحمة الله وبركاته، أخي الكريم (${app.applicantName})، يسر مكتب الوسام الذهبي برئاسة المستشار أبو خالد إفادتكم بتحديث مسار معاملتكم رقم (${app.id}):\nالحالة: ${app.statusLabel}\nملاحظة المستشار: ${app.notes || 'معاملتكم تسير بالشكل النظامي المطلوب.'}`)}" target="_blank" rel="noopener noreferrer" title="مراسلة العميل بالواتساب" class="p-1 rounded-lg bg-emerald-600 text-white font-bold hover:bg-emerald-700 transition-colors text-[11px] flex items-center justify-center">
                        <span class="material-symbols-outlined text-xs">chat</span>
                      </a>
                      <button data-admin-delete="${app.id}" title="حذف المعاملة" class="p-1 rounded-lg bg-red-100 text-red-700 hover:bg-red-200 transition-colors text-[11px] flex items-center justify-center">
                        <span class="material-symbols-outlined text-xs">delete</span>
                      </button>
                    </div>
                  </td>
                </tr>
              `).join('')}
            </tbody>
          </table>
        </div>
      </div>
    `;
  },

  // --- TAB 2: LOGO & MEDIA MANAGER ---
  renderAdminMediaTab(settings) {
    return `
      <div class="bg-surface-container-lowest rounded-3xl p-space-md shadow-lg border border-secondary/20 flex flex-col gap-space-md text-right">
        <div class="pb-space-sm border-b border-surface-container-high">
          <h3 class="font-bold text-base text-primary">إدارة الشعار وحجمه وصور خلفية الموقع من الجهاز</h3>
          <p class="text-xs text-outline">ارفع صورة الشعار وصورة خلفية الهيرو مباشرة من جهازك وتتحكم بالحجم بدقة</p>
        </div>

        <!-- Logo Management Card -->
        <div class="p-space-md rounded-2xl bg-surface-container-low border border-outline-variant grid grid-cols-1 md:grid-cols-2 gap-space-md items-center">
          <div class="flex flex-col gap-space-sm">
            <h4 class="font-bold text-sm text-primary flex items-center gap-1.5">
              <span class="material-symbols-outlined text-secondary">workspace_premium</span>
              <span>1. رفع الشعار الرسمي والتحكم بالحجم</span>
            </h4>
            <p class="text-xs text-on-surface-variant leading-relaxed">
              اختر ملف الصورة من كمبيوترك أو جوالك (PNG/JPG/SVG/WEBP) ثم اضبط حجم عرض الشعار بالبكسل.
            </p>

            <form id="logoUploadForm" class="flex flex-col gap-2 mt-2">
              <label class="font-bold text-xs text-primary">اختر ملف الشعار من الجهاز:</label>
              <input type="file" id="logoFileInput" accept="image/*" class="p-2 rounded-xl bg-surface-container-lowest border border-outline-variant text-xs">
              <button type="submit" class="py-2.5 px-4 rounded-xl bg-primary text-secondary-fixed font-bold text-xs hover:bg-primary-container transition-all shadow-md flex items-center justify-center gap-1.5">
                <span class="material-symbols-outlined text-base">cloud_upload</span>
                <span>رفع الشعار الجديد وتطبيقه</span>
              </button>
            </form>
          </div>

          <!-- Logo Preview & Size Range Slider -->
          <div class="flex flex-col items-center justify-center p-space-md rounded-2xl bg-surface-container-lowest border border-secondary/30 shadow-inner gap-3">
            <span class="text-xs text-outline font-bold">معاينة الشعار الحالية بالموقع</span>
            <div class="p-3 rounded-full bg-surface-container border-2 border-secondary shadow-md flex items-center justify-center">
              <img src="${settings.siteLogo || '/assets/images/official_logo.png'}" id="logoLivePreview" alt="الشعار الحالي" style="width: ${settings.logoSize || 42}px; height: ${settings.logoSize || 42}px;" class="object-contain transition-all">
            </div>

            <!-- Size Slider -->
            <div class="w-full max-w-xs flex flex-col gap-1 text-center mt-2">
              <div class="flex justify-between items-center text-xs font-bold text-primary">
                <span>حجم الشعار:</span>
                <span id="logoSizeVal">${settings.logoSize || 42}px</span>
              </div>
              <input type="range" id="logoSizeSlider" min="25" max="150" value="${settings.logoSize || 42}" class="w-full accent-secondary">
              <span class="text-[10px] text-outline">حرك الشريط لزيادة أو تصغير حجم الشعار</span>
            </div>
          </div>
        </div>

        <!-- Site Hero Background Image Management Card -->
        <div class="p-space-md rounded-2xl bg-surface-container-low border border-outline-variant flex flex-col gap-space-md">
          <div>
            <h4 class="font-bold text-sm text-primary flex items-center gap-1.5">
              <span class="material-symbols-outlined text-secondary">wallpaper</span>
              <span>2. إضافة وإدارة صور خلفيات الموقع الهيرو (Hero Banner Slider) من الجهاز</span>
            </h4>
            <p class="text-xs text-on-surface-variant leading-relaxed mt-1">
              يمكنك رفع أكثر من صورة من جهازك للخلفية لتعمل كسلايدر متقلب تلقائياً، مع إمكانية معاينة وحذف أي صورة.
            </p>
          </div>

          <form id="heroBgMultiUploadForm" class="flex flex-col gap-2">
            <label class="font-bold text-xs text-primary">اختر صورة واحدة أو أكثر من الجهاز:</label>
            <div class="flex flex-col sm:flex-row gap-2">
              <input type="file" id="heroBgMultiFileInput" multiple accept="image/*" class="p-2 rounded-xl bg-surface-container-lowest border border-outline-variant text-xs flex-1">
              <button type="submit" class="py-2.5 px-5 rounded-xl bg-primary text-secondary-fixed font-bold text-xs hover:bg-primary-container transition-all shadow-md flex items-center justify-center gap-1.5 whitespace-nowrap">
                <span class="material-symbols-outlined text-base">cloud_upload</span>
                <span>رفع وإضافة الصور للرئيسية</span>
              </button>
            </div>
          </form>

          <!-- Uploaded Backgrounds Grid Preview -->
          <div class="flex flex-col gap-2 mt-2">
            <span class="text-xs font-bold text-primary">الصور المضافة حالياً لخلفية الهيرو (${(settings.heroBgImages || []).length} صور):</span>
            <div class="grid grid-cols-2 md:grid-cols-4 gap-3">
              ${((settings.heroBgImages && settings.heroBgImages.length > 0) 
                ? settings.heroBgImages 
                : [settings.heroBgImage || '/assets/images/luxury_saudi_corporate_and_legal_background_banner_elegant_modern_riyadh/screen.png']
              ).map((imgUrl, idx) => `
                <div class="relative group rounded-xl overflow-hidden border border-secondary shadow-md aspect-video bg-surface">
                  <img src="${imgUrl}" alt="خلفية ${idx + 1}" class="w-full h-full object-cover">
                  <div class="absolute inset-0 bg-primary/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2 p-2">
                    <button data-hero-bg-delete="${idx}" title="حذف هذه الصورة" class="p-1.5 rounded-lg bg-red-600 text-white hover:bg-red-700 transition-colors shadow">
                      <span class="material-symbols-outlined text-sm">delete</span>
                    </button>
                  </div>
                  <span class="absolute bottom-1 right-1 px-1.5 py-0.5 rounded bg-black/60 text-white text-[10px] font-bold">صورة ${idx + 1}</span>
                </div>
              `).join('')}
            </div>
          </div>
        </div>
      </div>
    `;
  },

  // --- TAB 3: CUSTOM SERVICES MANAGER ---
  renderAdminServicesTab(services) {
    return `
      <div class="bg-surface-container-lowest rounded-3xl p-space-md shadow-lg border border-secondary/20 flex flex-col gap-space-md text-right">
        <div class="flex flex-col md:flex-row items-center justify-between gap-space-sm pb-space-md border-b border-surface-container-high">
          <div>
            <h3 class="font-bold text-base text-primary">إدارة الخدمات المخصصة وصورها</h3>
            <p class="text-xs text-outline">إضافة خدمات جديدة، رف صورها الخاصة من الجهاز، وتحديد تفاصيلها</p>
          </div>

          <button id="openNewServiceModalBtn" class="px-4 py-2 rounded-xl bg-primary text-secondary-fixed hover:bg-primary-container transition-all font-bold text-xs flex items-center gap-1.5 shadow-md whitespace-nowrap">
            <span class="material-symbols-outlined text-base">add_circle</span>
            <span>إضافة خدمة مخصصة جديدة</span>
          </button>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-3 gap-space-md">
          ${services.map(srv => `
            <div class="p-4 rounded-2xl bg-surface-container-low border border-outline-variant flex flex-col justify-between gap-3 shadow-sm">
              <div class="flex flex-col gap-2">
                <div class="h-32 rounded-xl overflow-hidden bg-surface border border-outline-variant relative">
                  <img src="${srv.image}" alt="${srv.title}" class="w-full h-full object-cover">
                  <span class="material-symbols-outlined absolute top-2 right-2 bg-primary text-secondary-fixed p-1.5 rounded-lg text-lg shadow-md">${srv.icon || 'star'}</span>
                </div>
                <h4 class="font-bold text-sm text-primary leading-snug">${srv.title}</h4>
                <p class="text-xs text-on-surface-variant leading-relaxed line-clamp-3">${srv.description}</p>
              </div>

              <div class="flex items-center justify-between pt-2 border-t border-surface-container-high">
                <span class="text-[10px] text-outline font-semibold">المسار: ${srv.actionRoute}</span>
                <button data-service-delete="${srv.id}" class="px-2.5 py-1 rounded-lg bg-red-100 text-red-700 hover:bg-red-200 transition-colors font-bold text-[11px] flex items-center gap-1">
                  <span class="material-symbols-outlined text-xs">delete</span>
                  <span>حذف الخدمة</span>
                </button>
              </div>
            </div>
          `).join('')}
        </div>
      </div>
    `;
  },

  // --- TAB 4: CONTACT & PHONES MANAGER ---
  renderAdminContactTab(settings) {
    return `
      <div class="bg-surface-container-lowest rounded-3xl p-space-md shadow-lg border border-secondary/20 text-right">
        <div class="pb-space-md border-b border-surface-container-high mb-space-md">
          <h3 class="font-bold text-base text-primary">إدارة أرقام الهاتف والواتساب ورابط التواصل</h3>
          <p class="text-xs text-outline">تعديل أرقام الجوال والواتساب وتأثيرها الفوري بجميع أزرار الاتصال والموقع</p>
        </div>

        <form id="adminContactForm" class="grid grid-cols-1 md:grid-cols-2 gap-space-md text-xs">
          <div class="flex flex-col gap-1">
            <label class="font-bold text-primary">رقم الجوال المباشر للاتصال</label>
            <input type="text" id="settingPhone" required value="${settings.phone || '0568922561'}" placeholder="0568922561" class="p-3 rounded-xl bg-surface-container-low border border-outline-variant font-bold text-right">
          </div>

          <div class="flex flex-col gap-1">
            <label class="font-bold text-primary">رقم الواتساب مع المفتاح الدولي</label>
            <input type="text" id="settingWhatsapp" required value="${settings.whatsapp || '966568922561'}" placeholder="966568922561" class="p-3 rounded-xl bg-surface-container-low border border-outline-variant font-bold text-right">
          </div>

          <div class="flex flex-col gap-1">
            <label class="font-bold text-primary">ساعات العمل والتواصل الرسمية</label>
            <input type="text" id="settingWorkingHours" value="${settings.workingHours || '9:00 ص - 10:00 م'}" placeholder="9:00 ص - 10:00 م" class="p-3 rounded-xl bg-surface-container-low border border-outline-variant font-bold">
          </div>

          <div class="flex flex-col gap-1">
            <label class="font-bold text-primary">العنوان الإقليمي والمقرات</label>
            <input type="text" id="settingLocation" value="${settings.location || 'المملكة العربية السعودية - جميع الإمارات'}" placeholder="المملكة العربية السعودية" class="p-3 rounded-xl bg-surface-container-low border border-outline-variant font-bold">
          </div>

          <div class="flex flex-col gap-1">
            <label class="font-bold text-primary">البريد الإلكتروني العام للاستفسارات</label>
            <input type="email" id="settingEmail" value="${settings.email || 'info@alwesam-aldhahabi.sa'}" placeholder="info@alwesam-aldhahabi.sa" class="p-3 rounded-xl bg-surface-container-low border border-outline-variant font-bold text-left" dir="ltr">
          </div>

          <div class="flex flex-col gap-1">
            <label class="font-bold text-primary">رابط حساب تويتر (X)</label>
            <input type="text" id="settingTwitter" value="${settings.twitter || ''}" placeholder="https://x.com/..." class="p-3 rounded-xl bg-surface-container-low border border-outline-variant text-left" dir="ltr">
          </div>

          <button type="submit" class="md:col-span-2 py-3 rounded-xl bg-primary text-secondary-fixed font-bold text-xs hover:bg-primary-container transition-all shadow-md flex items-center justify-center gap-1.5">
            <span class="material-symbols-outlined text-base">save</span>
            <span>حفظ وتحديث كافة أرقام وبيانات التواصل بالموقع</span>
          </button>
        </form>
      </div>
    `;
  },

  // --- TAB 5: CREDENTIALS MANAGER ---
  renderAdminCredentialsTab(settings) {
    return `
      <div class="bg-surface-container-lowest rounded-3xl p-space-md shadow-lg border border-secondary/20 max-w-xl mx-auto text-right">
        <div class="pb-space-md border-b border-surface-container-high mb-space-md">
          <h3 class="font-bold text-base text-primary">تغيير البريد الإلكتروني وكلمة المرور للوحة التحكم</h3>
          <p class="text-xs text-outline">قم بتحديث بيانات الدخول الخاصة بالمدير والمستشار لتأمين اللوحة</p>
        </div>

        <form id="adminCredentialsForm" class="flex flex-col gap-space-md text-xs">
          <div class="flex flex-col gap-1">
            <label class="font-bold text-primary">البريد الإلكتروني الجديد للوحة</label>
            <input type="email" id="credEmail" required value="${settings.adminEmail || 'admin@alwesam.sa'}" class="p-3 rounded-xl bg-surface-container-low border border-outline-variant font-bold text-left" dir="ltr">
          </div>

          <div class="flex flex-col gap-1">
            <label class="font-bold text-primary">كلمة المرور الجديدة للوحة</label>
            <input type="password" id="credPassword" required value="${settings.adminPassword || 'admin123'}" class="p-3 rounded-xl bg-surface-container-low border border-outline-variant font-bold text-center tracking-widest">
          </div>

          <button type="submit" class="py-3 rounded-xl bg-primary text-secondary-fixed font-bold text-xs hover:bg-primary-container transition-all shadow-md flex items-center justify-center gap-1.5">
            <span class="material-symbols-outlined text-base">lock_reset</span>
            <span>حفظ بيانات الدخول الجديدة</span>
          </button>
        </form>
      </div>
    `;
  },

  // --- TAB 6: ARTICLES MANAGER ---
  renderAdminArticlesTab(articles) {
    return `
      <div class="bg-surface-container-lowest rounded-3xl p-space-md shadow-lg border border-secondary/20">
        <div class="flex flex-col md:flex-row items-center justify-between gap-space-sm pb-space-md border-b border-surface-container-high">
          <div>
            <h3 class="font-bold text-base text-primary">إدارة المدونة والمقالات القانونية</h3>
            <p class="text-xs text-outline">إضافة وتعديل الشروحات والأنظمة الصادرة عن المستشار أبو خالد</p>
          </div>

          <button id="openNewArticleModalBtn" class="px-4 py-2 rounded-xl bg-primary text-secondary-fixed hover:bg-primary-container transition-all font-bold text-xs flex items-center gap-1.5 shadow-md whitespace-nowrap">
            <span class="material-symbols-outlined text-base">add_circle</span>
            <span>نشر مقال قانوني جديد</span>
          </button>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-space-md mt-space-md">
          ${articles.map(art => `
            <div class="p-4 rounded-2xl bg-surface-container-low border border-outline-variant flex flex-col justify-between gap-3 text-right">
              <div>
                <div class="flex items-center justify-between mb-2">
                  <span class="px-2.5 py-0.5 rounded-full bg-secondary-container text-on-secondary-fixed text-[10px] font-bold">
                    ${art.categoryLabel || art.category}
                  </span>
                  <span class="text-[11px] text-outline">${art.date}</span>
                </div>
                <h4 class="font-bold text-sm text-primary leading-tight mb-2">${art.title}</h4>
                <p class="text-xs text-on-surface-variant line-clamp-2 leading-relaxed">${art.summary}</p>
              </div>

              <div class="flex items-center justify-between pt-2 border-t border-surface-container-high text-xs">
                <span class="text-[11px] text-outline font-semibold">كاتب المقال: ${art.author}</span>
                <button data-article-delete="${art.id}" class="px-3 py-1 rounded-lg bg-red-100 text-red-700 hover:bg-red-200 transition-colors font-bold text-[11px] flex items-center gap-1">
                  <span class="material-symbols-outlined text-xs">delete</span>
                  <span>حذف المقال</span>
                </button>
              </div>
            </div>
          `).join('')}
        </div>
      </div>
    `;
  },

  // --- TAB 7: FAQ MANAGER ---
  renderAdminFaqsTab(faqs) {
    return `
      <div class="bg-surface-container-lowest rounded-3xl p-space-md shadow-lg border border-secondary/20">
        <div class="flex flex-col md:flex-row items-center justify-between gap-space-sm pb-space-md border-b border-surface-container-high">
          <div>
            <h3 class="font-bold text-base text-primary">إدارة بنك الأسئلة الشائعة</h3>
            <p class="text-xs text-outline">إضافة أسئلة وإجابات موثقة لاستفسارات العملاء الشائعة</p>
          </div>

          <button id="openNewFaqModalBtn" class="px-4 py-2 rounded-xl bg-primary text-secondary-fixed hover:bg-primary-container transition-all font-bold text-xs flex items-center gap-1.5 shadow-md whitespace-nowrap">
            <span class="material-symbols-outlined text-base">add_circle</span>
            <span>إضافة سؤال شائع جديد</span>
          </button>
        </div>

        <div class="flex flex-col gap-space-sm mt-space-md">
          ${faqs.map(faq => `
            <div class="p-4 rounded-2xl bg-surface-container-low border border-outline-variant flex flex-col gap-2 text-right">
              <div class="flex items-center justify-between">
                <span class="px-2.5 py-0.5 rounded-full bg-primary-container text-secondary-fixed text-[10px] font-bold">
                  تصنيف: ${faq.category === 'marriage' ? 'تصاريح الزواج' : faq.category === 'citizenship' ? 'التجنيس' : faq.category === 'rectification' ? 'تصحيح الأوضاع' : 'الرسوم والأمان'}
                </span>
                <button data-faq-delete="${faq.id}" class="px-2.5 py-1 rounded-lg bg-red-100 text-red-700 hover:bg-red-200 transition-colors font-bold text-[11px] flex items-center gap-1">
                  <span class="material-symbols-outlined text-xs">delete</span>
                  <span>حذف</span>
                </button>
              </div>
              <h4 class="font-bold text-xs text-primary leading-snug">س: ${faq.question}</h4>
              <p class="text-xs text-on-surface-variant leading-relaxed bg-surface-container-lowest p-2.5 rounded-xl border border-surface-container-high">ج: ${faq.answer}</p>
            </div>
          `).join('')}
        </div>
      </div>
    `;
  },

  // --- TAB 8: EXECUTIVE ANALYTICS ---
  renderAdminAnalyticsTab(stats, applications) {
    const marriageApps = applications.filter(a => a.serviceType === 'marriage-permits').length;
    const citizenshipApps = applications.filter(a => a.serviceType === 'citizenship-services').length;
    const rectApps = applications.filter(a => a.serviceType === 'rectification').length;

    return `
      <div class="flex flex-col gap-space-md">
        <!-- Printable Executive Report Card -->
        <div class="bg-surface-container-lowest rounded-3xl p-space-md shadow-lg border border-secondary/20 flex items-center justify-between">
          <div>
            <h3 class="font-bold text-base text-primary">التقرير الإحصائي والتنفيذي السنوي</h3>
            <p class="text-xs text-outline">ملخص إنجاز المعاملات ومؤشرات الأداء السيادية لمكتب الوسام الذهبي</p>
          </div>

          <button onclick="window.print()" class="px-4 py-2 rounded-xl bg-primary text-secondary-fixed hover:bg-primary-container transition-all font-bold text-xs flex items-center gap-1.5 shadow-md whitespace-nowrap">
            <span class="material-symbols-outlined text-base">print</span>
            <span>طباعة تقرير المتابعة المكتبي</span>
          </button>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-3 gap-space-md">
          <div class="p-5 rounded-3xl bg-surface-container-lowest border border-secondary/20 shadow-md text-right">
            <span class="text-xs text-outline font-bold">معاملات تصاريح الزواج</span>
            <div class="text-3xl font-bold text-primary mt-2">${marriageApps}</div>
            <span class="text-[11px] text-secondary-dark font-semibold mt-1 block">نسبة ${(stats.total ? Math.round((marriageApps / stats.total) * 100) : 0)}% من إجمالي المعاملات</span>
          </div>

          <div class="p-5 rounded-3xl bg-surface-container-lowest border border-secondary/20 shadow-md text-right">
            <span class="text-xs text-outline font-bold">ملفات طلبات التجنيس (المادة 9)</span>
            <div class="text-3xl font-bold text-primary mt-2">${citizenshipApps}</div>
            <span class="text-[11px] text-secondary-dark font-semibold mt-1 block">نسبة ${(stats.total ? Math.round((citizenshipApps / stats.total) * 100) : 0)}% من إجمالي المعاملات</span>
          </div>

          <div class="p-5 rounded-3xl bg-surface-container-lowest border border-secondary/20 shadow-md text-right">
            <span class="text-xs text-outline font-bold">معاملات تصحيح وضع الزواج</span>
            <div class="text-3xl font-bold text-primary mt-2">${rectApps}</div>
            <span class="text-[11px] text-secondary-dark font-semibold mt-1 block">نسبة ${(stats.total ? Math.round((rectApps / stats.total) * 100) : 0)}% من إجمالي المعاملات</span>
          </div>
        </div>
      </div>
    `;
  },

  // --- RENDER MODALS ---
  renderAdminModals() {
    return `
      <!-- Modal 1: Update Application Status & Step -->
      <div id="adminModal" class="hidden fixed inset-0 z-50 flex items-center justify-center p-4 modal-backdrop">
        <div class="bg-surface-container-lowest rounded-3xl max-w-lg w-full p-space-md shadow-2xl border-2 border-secondary">
          <div class="flex items-center justify-between pb-2 mb-3 border-b border-surface-container-high">
            <h3 class="font-bold text-sm text-primary" id="modalAppIdTitle">تحديث حالة المعاملة</h3>
            <button id="closeModalBtn" class="text-outline hover:text-primary"><span class="material-symbols-outlined text-lg">close</span></button>
          </div>

          <form id="adminUpdateForm" class="flex flex-col gap-space-sm text-right">
            <input type="hidden" id="modalAppId" name="id">

            <div class="flex flex-col gap-1">
              <label class="font-bold text-xs text-primary">حالة المعاملة العامة (Status Code)</label>
              <select id="modalStatus" name="status" class="p-2.5 rounded-xl bg-surface-container-low text-xs border border-outline-variant font-bold">
                <option value="pending">⏳ قيد الفحص والتدقيق الأولي (Pending)</option>
                <option value="processing">🔄 قيد الدراسة والمتابعة الميدانية (Processing)</option>
                <option value="approved">✅ تمت الموافقة المبدئية / الاعتماد (Approved)</option>
                <option value="completed">🎉 المعاملة منجزة ومكتملة بالكامل (Completed)</option>
                <option value="rejected">❌ مرفوضة أو بحاجة استكمال أوراق (Rejected)</option>
              </select>
            </div>

            <div class="flex flex-col gap-1">
              <label class="font-bold text-xs text-primary">المرحلة الإجرائية (1 - 4)</label>
              <select id="modalStageStep" name="stageStep" class="p-2.5 rounded-xl bg-surface-container-low text-xs border border-outline-variant font-bold">
                <option value="1">المرحلة 1: التدقيق والفحص الأولي</option>
                <option value="2">المرحلة 2: الصياغة وإعداد المعاريض والخطابات</option>
                <option value="3">المرحلة 3: القيد والإحالة للإمارة / الداخلية</option>
                <option value="4">المرحلة 4: صدور الموافقة والتوثيق النهائي</option>
              </select>
            </div>

            <div class="flex flex-col gap-1">
              <label class="font-bold text-xs text-primary">عنوان الحالة الحالية الميدانية</label>
              <input type="text" id="modalStatusLabel" name="statusLabel" required placeholder="مثال: جاري المتابعة بالإمارة برقم 45912" class="p-2.5 rounded-xl bg-surface-container-low text-xs border border-outline-variant font-bold">
            </div>

            <div class="flex flex-col gap-1">
              <label class="font-bold text-xs text-primary">ملاحظة وتوجيه المستشار أبو خالد للعميل</label>
              <textarea id="modalNotes" name="notes" rows="3" placeholder="ملاحظة تظهر للعميل فوراً عند الاستعلام برقم القيد..." class="p-2.5 rounded-xl bg-surface-container-low text-xs border border-outline-variant text-xs"></textarea>
            </div>

            <button type="submit" class="py-3 rounded-xl bg-primary text-secondary-fixed font-bold text-xs hover:bg-primary-container transition-colors shadow-md whitespace-nowrap flex items-center justify-center gap-1.5">
              <span class="material-symbols-outlined text-base">save</span>
              <span>حفظ التحديث وإبلاغ العميل</span>
            </button>
          </form>
        </div>
      </div>

      <!-- Modal 2: View Full Application Details -->
      <div id="adminViewDetailsModal" class="hidden fixed inset-0 z-50 flex items-center justify-center p-4 modal-backdrop">
        <div class="bg-surface-container-lowest rounded-3xl max-w-xl w-full p-space-md shadow-2xl border-2 border-secondary max-h-[90vh] overflow-y-auto">
          <div class="flex items-center justify-between pb-2 mb-3 border-b border-surface-container-high">
            <h3 class="font-bold text-sm text-primary" id="viewModalTitle">تفاصيل المعاملة الكاملة</h3>
            <button id="closeViewModalBtn" class="text-outline hover:text-primary"><span class="material-symbols-outlined text-lg">close</span></button>
          </div>

          <div id="viewModalContent" class="flex flex-col gap-space-sm text-right text-xs">
            <!-- Content filled dynamically -->
          </div>
        </div>
      </div>

      <!-- Modal 3: Manual New Application Creation -->
      <div id="adminNewAppModal" class="hidden fixed inset-0 z-50 flex items-center justify-center p-4 modal-backdrop">
        <div class="bg-surface-container-lowest rounded-3xl max-w-lg w-full p-space-md shadow-2xl border-2 border-secondary">
          <div class="flex items-center justify-between pb-2 mb-3 border-b border-surface-container-high">
            <h3 class="font-bold text-sm text-primary">تسجيل معاملة جديدة يدويًا (عميل مكتب)</h3>
            <button id="closeNewAppModalBtn" class="text-outline hover:text-primary"><span class="material-symbols-outlined text-lg">close</span></button>
          </div>

          <form id="adminCreateAppForm" class="flex flex-col gap-space-sm text-right text-xs">
            <div class="flex flex-col gap-1">
              <label class="font-bold text-primary">اسم صاحب المعاملة كامل</label>
              <input type="text" id="newAppName" required placeholder="الاسم الرباعي..." class="p-2.5 rounded-xl bg-surface-container-low border border-outline-variant font-bold">
            </div>

            <div class="grid grid-cols-2 gap-2">
              <div class="flex flex-col gap-1">
                <label class="font-bold text-primary">رقم الجوال</label>
                <input type="text" id="newAppPhone" required placeholder="05xxxxxxxx" class="p-2.5 rounded-xl bg-surface-container-low border border-outline-variant font-bold text-right">
              </div>
              <div class="flex flex-col gap-1">
                <label class="font-bold text-primary">رقم الهوية الوطنية</label>
                <input type="text" id="newAppNationalId" placeholder="10xxxxxxxx" class="p-2.5 rounded-xl bg-surface-container-low border border-outline-variant font-bold">
              </div>
            </div>

            <div class="flex flex-col gap-1">
              <label class="font-bold text-primary">نوع الخدمة المطلوب</label>
              <select id="newAppServiceType" class="p-2.5 rounded-xl bg-surface-container-low border border-outline-variant font-bold">
                <option value="marriage-permits">استخراج تصريح زواج من أجنبية مقيمة أو من الخارج</option>
                <option value="citizenship-services">معاملات تجنيس الكفاءات والمستثمرين والأبناء</option>
                <option value="rectification">تصحيح وضع زواج غير مصرح به وتوثيق ناجز</option>
              </select>
            </div>

            <div class="flex flex-col gap-1">
              <label class="font-bold text-primary">تفاصيل المعاملة والطلب</label>
              <textarea id="newAppDetails" rows="3" placeholder="ملاحظات تفصيلية حول المعاملة..." class="p-2.5 rounded-xl bg-surface-container-low border border-outline-variant"></textarea>
            </div>

            <button type="submit" class="py-3 rounded-xl bg-primary text-secondary-fixed font-bold text-xs hover:bg-primary-container transition-colors shadow-md">
              قيد المعاملة واستخراج رقم القيد
            </button>
          </form>
        </div>
      </div>

      <!-- Modal 4: New Custom Service Modal -->
      <div id="adminNewServiceModal" class="hidden fixed inset-0 z-50 flex items-center justify-center p-4 modal-backdrop">
        <div class="bg-surface-container-lowest rounded-3xl max-w-lg w-full p-space-md shadow-2xl border-2 border-secondary">
          <div class="flex items-center justify-between pb-2 mb-3 border-b border-surface-container-high">
            <h3 class="font-bold text-sm text-primary">إضافة خدمة مخصصة جديدة</h3>
            <button id="closeNewServiceModalBtn" class="text-outline hover:text-primary"><span class="material-symbols-outlined text-lg">close</span></button>
          </div>

          <form id="adminCreateServiceForm" class="flex flex-col gap-space-sm text-right text-xs">
            <div class="flex flex-col gap-1">
              <label class="font-bold text-primary">اسم الخدمة</label>
              <input type="text" id="newSrvTitle" required placeholder="مثال: توثيق عقد نكاح إلكتروني..." class="p-2.5 rounded-xl bg-surface-container-low border border-outline-variant font-bold">
            </div>

            <div class="flex flex-col gap-1">
              <label class="font-bold text-primary">وصف الخدمة التفصيلي</label>
              <textarea id="newSrvDesc" rows="3" required placeholder="وصف الخدمة والإجراءات..." class="p-2.5 rounded-xl bg-surface-container-low border border-outline-variant"></textarea>
            </div>

            <div class="flex flex-col gap-1">
              <label class="font-bold text-primary">اختر صورة الخدمة من الكمبيوتر/الجوال</label>
              <input type="file" id="newSrvImageFile" accept="image/*" class="p-2 rounded-xl bg-surface-container-low border border-outline-variant text-xs">
            </div>

            <button type="submit" class="py-3 rounded-xl bg-primary text-secondary-fixed font-bold text-xs hover:bg-primary-container transition-colors shadow-md">
              حفظ وإضافة الخدمة فوراً
            </button>
          </form>
        </div>
      </div>

      <!-- Modal 5: New Article Modal -->
      <div id="adminNewArticleModal" class="hidden fixed inset-0 z-50 flex items-center justify-center p-4 modal-backdrop">
        <div class="bg-surface-container-lowest rounded-3xl max-w-lg w-full p-space-md shadow-2xl border-2 border-secondary">
          <div class="flex items-center justify-between pb-2 mb-3 border-b border-surface-container-high">
            <h3 class="font-bold text-sm text-primary">نشر مقال قانوني جديد</h3>
            <button id="closeNewArticleModalBtn" class="text-outline hover:text-primary"><span class="material-symbols-outlined text-lg">close</span></button>
          </div>

          <form id="adminCreateArticleForm" class="flex flex-col gap-space-sm text-right text-xs">
            <div class="flex flex-col gap-1">
              <label class="font-bold text-primary">عنوان المقال القانوني</label>
              <input type="text" id="newArtTitle" required placeholder="عنوان المقال..." class="p-2.5 rounded-xl bg-surface-container-low border border-outline-variant font-bold">
            </div>

            <div class="flex flex-col gap-1">
              <label class="font-bold text-primary">التصنيف</label>
              <select id="newArtCategory" class="p-2.5 rounded-xl bg-surface-container-low border border-outline-variant font-bold">
                <option value="citizenship">نظام التجنيس السعودي (المادة 9)</option>
                <option value="marriage">تصاريح وتوثيق الزواج</option>
                <option value="rectification">تصحيح الأوضاع والتوثيق</option>
              </select>
            </div>

            <div class="flex flex-col gap-1">
              <label class="font-bold text-primary">الملخص التجريبي للمقال</label>
              <textarea id="newArtSummary" rows="2" required placeholder="ملخص قصير يظهر في البطاقات..." class="p-2.5 rounded-xl bg-surface-container-low border border-outline-variant"></textarea>
            </div>

            <div class="flex flex-col gap-1">
              <label class="font-bold text-primary">محتوى المقال كاملاً (Markdown)</label>
              <textarea id="newArtContent" rows="5" required placeholder="أدخل نص المقال الكامل والشروحات..." class="p-2.5 rounded-xl bg-surface-container-low border border-outline-variant font-mono text-xs"></textarea>
            </div>

            <button type="submit" class="py-3 rounded-xl bg-primary text-secondary-fixed font-bold text-xs hover:bg-primary-container transition-colors shadow-md">
              نشر المقال فوراً
            </button>
          </form>
        </div>
      </div>

      <!-- Modal 6: New FAQ Modal -->
      <div id="adminNewFaqModal" class="hidden fixed inset-0 z-50 flex items-center justify-center p-4 modal-backdrop">
        <div class="bg-surface-container-lowest rounded-3xl max-w-lg w-full p-space-md shadow-2xl border-2 border-secondary">
          <div class="flex items-center justify-between pb-2 mb-3 border-b border-surface-container-high">
            <h3 class="font-bold text-sm text-primary">إضافة سؤال شائع جديد</h3>
            <button id="closeNewFaqModalBtn" class="text-outline hover:text-primary"><span class="material-symbols-outlined text-lg">close</span></button>
          </div>

          <form id="adminCreateFaqForm" class="flex flex-col gap-space-sm text-right text-xs">
            <div class="flex flex-col gap-1">
              <label class="font-bold text-primary">التصنيف</label>
              <select id="newFaqCategory" class="p-2.5 rounded-xl bg-surface-container-low border border-outline-variant font-bold">
                <option value="marriage">تصاريح الزواج</option>
                <option value="citizenship">معاملات التجنيس</option>
                <option value="rectification">تصحيح الأوضاع</option>
                <option value="fees">السرية والرسوم</option>
              </select>
            </div>

            <div class="flex flex-col gap-1">
              <label class="font-bold text-primary">نص السؤال</label>
              <input type="text" id="newFaqQuestion" required placeholder="ما هي الشروط..." class="p-2.5 rounded-xl bg-surface-container-low border border-outline-variant font-bold">
            </div>

            <div class="flex flex-col gap-1">
              <label class="font-bold text-primary">الإجابة الموثقة</label>
              <textarea id="newFaqAnswer" rows="4" required placeholder="الإجابة التفصيلية..." class="p-2.5 rounded-xl bg-surface-container-low border border-outline-variant"></textarea>
            </div>

            <button type="submit" class="py-3 rounded-xl bg-primary text-secondary-fixed font-bold text-xs hover:bg-primary-container transition-colors shadow-md">
              حفظ وإضافة السؤال
            </button>
          </form>
        </div>
      </div>
    `;
  },

  // --- BIND ALL ADMIN EVENTS & EVENT LISTENERS ---
  bindAdminEvents() {
    // 1. Authentication Form (Email + Password or PIN)
    const authForm = document.getElementById('adminAuthForm');
    if (authForm) {
      authForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        const email = document.getElementById('adminEmailInput').value.trim();
        const password = document.getElementById('adminPasswordInput').value.trim();

        const success = await Store.loginAdmin(email, password);
        if (success) {
          Views.render('admin');
        }
      });
      return;
    }

    // Fetch initial admin data
    Store.fetchAdminApplications();
    Store.fetchServices();

    // 2. Refresh Button
    const refreshBtn = document.getElementById('adminRefreshBtn');
    if (refreshBtn) {
      refreshBtn.addEventListener('click', () => {
        Store.fetchAdminApplications();
        Store.fetchServices();
        Store.fetchSettings();
        Views.render('admin');
      });
    }

    // 3. Logout / Lock Button
    const logoutBtn = document.getElementById('adminLogoutBtn');
    if (logoutBtn) {
      logoutBtn.addEventListener('click', () => {
        sessionStorage.removeItem('admin_authed');
        sessionStorage.removeItem('admin_email');
        Store.showToast('تم قفل اللوحة الإشرافية');
        Views.render('admin');
      });
    }

    // 4. Tab Switching
    document.querySelectorAll('[data-admin-tab]').forEach(tabBtn => {
      tabBtn.addEventListener('click', () => {
        window._adminTab = tabBtn.getAttribute('data-admin-tab');
        Views.render('admin');
      });
    });

    // 5. Logo File Upload & Logo Size Slider
    const logoUploadForm = document.getElementById('logoUploadForm');
    const logoFileInput = document.getElementById('logoFileInput');
    const logoSlider = document.getElementById('logoSizeSlider');

    if (logoUploadForm && logoFileInput) {
      logoUploadForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        if (logoFileInput.files && logoFileInput.files[0]) {
          const uploadedUrl = await Store.uploadFile(logoFileInput.files[0]);
          if (uploadedUrl) {
            await Store.updateSettings({ siteLogo: uploadedUrl });
            Views.render('admin');
          }
        } else {
          Store.showToast('يرجى اختيار صورة من جهازك أولاً', 'error');
        }
      });
    }

    if (logoSlider) {
      logoSlider.addEventListener('input', (e) => {
        const val = e.target.value;
        const valLabel = document.getElementById('logoSizeVal');
        const preview = document.getElementById('logoLivePreview');
        if (valLabel) valLabel.textContent = `${val}px`;
        if (preview) {
          preview.style.width = `${val}px`;
          preview.style.height = `${val}px`;
        }
      });

      logoSlider.addEventListener('change', async (e) => {
        const size = parseInt(e.target.value, 10);
        await Store.updateSettings({ logoSize: size });
      });
    }

    // 6. Hero Banner Background Images Multi Upload & Deletion
    const heroBgMultiUploadForm = document.getElementById('heroBgMultiUploadForm');
    const heroBgMultiFileInput = document.getElementById('heroBgMultiFileInput');

    if (heroBgMultiUploadForm && heroBgMultiFileInput) {
      heroBgMultiUploadForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        const files = Array.from(heroBgMultiFileInput.files || []);
        if (files.length === 0) {
          Store.showToast('يرجى اختيار صورة واحدة على الأقل من جهازك', 'error');
          return;
        }

        Store.showToast(`جاري رفع ${files.length} صور...`);
        const currentSettings = Store.state.siteSettings || {};
        const currentImages = Array.isArray(currentSettings.heroBgImages) ? [...currentSettings.heroBgImages] : [];

        for (const file of files) {
          const uploadedUrl = await Store.uploadFile(file);
          if (uploadedUrl) {
            currentImages.push(uploadedUrl);
          }
        }

        await Store.updateSettings({ heroBgImages: currentImages, heroBgImage: currentImages[0] || '' });
        Views.render('admin');
      });
    }

    document.querySelectorAll('[data-hero-bg-delete]').forEach(btn => {
      btn.addEventListener('click', async () => {
        const idx = parseInt(btn.getAttribute('data-hero-bg-delete'), 10);
        const currentSettings = Store.state.siteSettings || {};
        let currentImages = Array.isArray(currentSettings.heroBgImages) ? [...currentSettings.heroBgImages] : [];

        if (currentImages.length <= 1) {
          Store.showToast('يجب الاحتفاظ بصورة خلفية واحدة على الأقل للموقع', 'error');
          return;
        }

        if (confirm('هل أنت تأكد من رغبتك في حذف هذه الصورة من خلفيات الموقع؟')) {
          currentImages.splice(idx, 1);
          await Store.updateSettings({ heroBgImages: currentImages, heroBgImage: currentImages[0] });
          Views.render('admin');
        }
      });
    });

    // 7. Contact Phones & Social Settings Form
    const contactForm = document.getElementById('adminContactForm');
    if (contactForm) {
      contactForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        const phone = document.getElementById('settingPhone').value.trim();
        const whatsapp = document.getElementById('settingWhatsapp').value.trim();
        const workingHours = document.getElementById('settingWorkingHours').value.trim();
        const location = document.getElementById('settingLocation').value.trim();
        const email = document.getElementById('settingEmail').value.trim();
        const twitter = document.getElementById('settingTwitter').value.trim();

        await Store.updateSettings({ phone, whatsapp, workingHours, location, email, twitter });
        Views.render('admin');
      });
    }

    // 8. Change Credentials Form (Admin Email & Password)
    const credForm = document.getElementById('adminCredentialsForm');
    if (credForm) {
      credForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        const adminEmail = document.getElementById('credEmail').value.trim();
        const adminPassword = document.getElementById('credPassword').value.trim();

        await Store.updateSettings({ adminEmail, adminPassword });
        Store.showToast('تم تحديث البريد الإلكتروني وكلمة السر بنجاح!');
        Views.render('admin');
      });
    }

    // 9. Custom Services Manager (Add & Delete Services)
    const openNewServiceBtn = document.getElementById('openNewServiceModalBtn');
    const newSrvModal = document.getElementById('adminNewServiceModal');
    const closeNewSrvBtn = document.getElementById('closeNewServiceModalBtn');
    const createSrvForm = document.getElementById('adminCreateServiceForm');

    if (openNewServiceBtn && newSrvModal) {
      openNewServiceBtn.addEventListener('click', () => newSrvModal.classList.remove('hidden'));
    }
    if (closeNewSrvBtn && newSrvModal) {
      closeNewSrvBtn.addEventListener('click', () => newSrvModal.classList.add('hidden'));
    }

    if (createSrvForm) {
      createSrvForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        const title = document.getElementById('newSrvTitle').value;
        const description = document.getElementById('newSrvDesc').value;
        const fileInput = document.getElementById('newSrvImageFile');

        let image = '/assets/images/saudi_citizenship_and_naturalization_papers_consultation_desk_saudi_passport/screen.png';
        if (fileInput && fileInput.files && fileInput.files[0]) {
          const uploadedUrl = await Store.uploadFile(fileInput.files[0]);
          if (uploadedUrl) image = uploadedUrl;
        }

        const created = await Store.createCustomService({ title, description, image, icon: 'star' });
        if (created) {
          newSrvModal.classList.add('hidden');
          Views.render('admin');
        }
      });
    }

    document.querySelectorAll('[data-service-delete]').forEach(btn => {
      btn.addEventListener('click', async () => {
        const id = btn.getAttribute('data-service-delete');
        if (confirm('هل أنت تأكد من رغبتك في حذف هذه الخدمة المخصصة؟')) {
          await Store.deleteCustomService(id);
          Views.render('admin');
        }
      });
    });

    // 10. Applications Search & Filter & Modal Bindings
    const searchInput = document.getElementById('adminSearchInput');
    const filterSelect = document.getElementById('adminStatusFilter');

    const filterApps = () => {
      const q = (searchInput ? searchInput.value : '').trim().toLowerCase();
      const status = filterSelect ? filterSelect.value : 'all';

      const rows = document.querySelectorAll('#adminTableBody tr');
      rows.forEach(row => {
        const text = row.innerText.toLowerCase();
        const matchesQuery = !q || text.includes(q);
        const matchesStatus = status === 'all' || text.includes(
          status === 'processing' ? 'قيد المتابعة' : status === 'approved' ? 'موافقة' : 'فحص'
        );
        if (matchesQuery && matchesStatus) {
          row.style.display = '';
        } else {
          row.style.display = 'none';
        }
      });
    };

    if (searchInput) searchInput.addEventListener('input', filterApps);
    if (filterSelect) filterSelect.addEventListener('change', filterApps);

    // Table Actions (Edit / View / Delete)
    const tableBody = document.getElementById('adminTableBody');
    const modal = document.getElementById('adminModal');
    const closeModalBtn = document.getElementById('closeModalBtn');
    const updateForm = document.getElementById('adminUpdateForm');
    const viewModal = document.getElementById('adminViewDetailsModal');
    const closeViewModalBtn = document.getElementById('closeViewModalBtn');

    if (tableBody) {
      tableBody.addEventListener('click', async (e) => {
        const editBtn = e.target.closest('[data-admin-edit]');
        if (editBtn) {
          const appId = editBtn.getAttribute('data-admin-edit');
          const app = (Store.state.applications || []).find(a => a.id === appId);
          if (app && modal) {
            document.getElementById('modalAppIdTitle').textContent = `تحديث معاملة: ${app.id} (${app.applicantName})`;
            document.getElementById('modalAppId').value = app.id;
            if (document.getElementById('modalStatus')) document.getElementById('modalStatus').value = app.status || 'processing';
            document.getElementById('modalStageStep').value = app.stageStep || 1;
            document.getElementById('modalStatusLabel').value = app.statusLabel || '';
            document.getElementById('modalNotes').value = app.notes || '';
            modal.classList.remove('hidden');
          }
        }

        const viewBtn = e.target.closest('[data-admin-view]');
        if (viewBtn) {
          const appId = viewBtn.getAttribute('data-admin-view');
          const app = (Store.state.applications || []).find(a => a.id === appId);
          if (app && viewModal) {
            document.getElementById('viewModalTitle').textContent = `الملف التفصيلي: ${app.id}`;
            const content = document.getElementById('viewModalContent');
            content.innerHTML = `
              <div class="p-3 rounded-2xl bg-surface-container-low border border-outline-variant flex flex-col gap-1">
                <span class="font-bold text-primary">صاحب الطلب: ${app.applicantName}</span>
                <span>رقم الجوال: ${app.phone} | الهوية: ${app.nationalId || 'غير مدخلة'}</span>
                <span>نوع المعاملة: ${app.serviceName}</span>
              </div>
              <div class="p-3 rounded-2xl bg-surface-container-low border border-outline-variant">
                <span class="font-bold text-primary block mb-1">تفاصيل الطلب:</span>
                <p class="text-on-surface-variant leading-relaxed">${app.details || app.notes || 'لا توجد ملاحظات إضافية'}</p>
              </div>
            `;
            viewModal.classList.remove('hidden');
          }
        }

        const delBtn = e.target.closest('[data-admin-delete]');
        if (delBtn) {
          const appId = delBtn.getAttribute('data-admin-delete');
          if (confirm(`هل أنت تأكد من رغبتك في حذف المعاملة رقم (${appId}) نهائياً؟`)) {
            await Store.deleteAdminApplication(appId);
            Views.render('admin');
          }
        }
      });
    }

    if (closeModalBtn && modal) closeModalBtn.addEventListener('click', () => modal.classList.add('hidden'));
    if (closeViewModalBtn && viewModal) closeViewModalBtn.addEventListener('click', () => viewModal.classList.add('hidden'));

    if (updateForm) {
      updateForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        const id = document.getElementById('modalAppId').value;
        const status = document.getElementById('modalStatus') ? document.getElementById('modalStatus').value : 'processing';
        const stageStep = document.getElementById('modalStageStep').value;
        const statusLabel = document.getElementById('modalStatusLabel').value;
        const notes = document.getElementById('modalNotes').value;

        const updated = await Store.updateApplicationStatus(id, {
          status,
          stageStep,
          statusLabel,
          notes
        });

        if (updated && modal) {
          modal.classList.add('hidden');
          Views.render('admin');
        }
      });
    }

    // Direct Quick Inline Status Change from Table Row
    document.querySelectorAll('[data-admin-quick-status]').forEach(selectEl => {
      selectEl.addEventListener('change', async () => {
        const appId = selectEl.getAttribute('data-admin-quick-status');
        const newStatus = selectEl.value;
        
        let label = 'قيد الدراسة والمتابعة';
        if (newStatus === 'approved') label = 'تمت الموافقة الرسمية';
        else if (newStatus === 'completed') label = 'المعاملة مكتملة بالكامل';
        else if (newStatus === 'pending') label = 'قيد التدقيق والفحص الأولي';
        else if (newStatus === 'rejected') label = 'مرفوضة / بحاجة استكمال أوراق';

        await Store.updateApplicationStatus(appId, { status: newStatus, statusLabel: label });
        Store.showToast(`تم تحديث حالة المعاملة (${appId}) إلى: ${label}`);
        Views.render('admin');
      });
    });

    // Manual New Application Modal
    const openNewAppModalBtn = document.getElementById('openNewAppModalBtn');
    const newAppModal = document.getElementById('adminNewAppModal');
    const closeNewAppModalBtn = document.getElementById('closeNewAppModalBtn');
    const createAppForm = document.getElementById('adminCreateAppForm');

    if (openNewAppModalBtn && newAppModal) openNewAppModalBtn.addEventListener('click', () => newAppModal.classList.remove('hidden'));
    if (closeNewAppModalBtn && newAppModal) closeNewAppModalBtn.addEventListener('click', () => newAppModal.classList.add('hidden'));

    if (createAppForm) {
      createAppForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        const name = document.getElementById('newAppName').value;
        const phone = document.getElementById('newAppPhone').value;
        const nationalId = document.getElementById('newAppNationalId').value;
        const serviceType = document.getElementById('newAppServiceType').value;
        const details = document.getElementById('newAppDetails').value;
        const serviceName = serviceType === 'marriage-permits' ? 'استخراج تصريح زواج من أجنبية' : 'معاملة تجنيس وتوثيقات';

        const created = await Store.submitApplication({ applicantName: name, phone, nationalId, serviceType, serviceName, details });
        if (created) {
          newAppModal.classList.add('hidden');
          Store.fetchAdminApplications();
          Views.render('admin');
        }
      });
    }

    // Article & FAQ Modals & Deletions
    const openNewArticleBtn = document.getElementById('openNewArticleModalBtn');
    const newArtModal = document.getElementById('adminNewArticleModal');
    const closeNewArtBtn = document.getElementById('closeNewArticleModalBtn');
    const createArtForm = document.getElementById('adminCreateArticleForm');

    if (openNewArticleBtn && newArtModal) openNewArticleBtn.addEventListener('click', () => newArtModal.classList.remove('hidden'));
    if (closeNewArtBtn && newArtModal) closeNewArtBtn.addEventListener('click', () => newArtModal.classList.add('hidden'));

    if (createArtForm) {
      createArtForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        const title = document.getElementById('newArtTitle').value;
        const category = document.getElementById('newArtCategory').value;
        const summary = document.getElementById('newArtSummary').value;
        const content = document.getElementById('newArtContent').value;

        const created = await Store.createArticle({ title, category, summary, content });
        if (created) {
          newArtModal.classList.add('hidden');
          Views.render('admin');
        }
      });
    }

    document.querySelectorAll('[data-article-delete]').forEach(btn => {
      btn.addEventListener('click', async () => {
        const id = btn.getAttribute('data-article-delete');
        if (confirm('هل أنت تأكد من حذف المقال؟')) {
          await Store.deleteArticle(id);
          Views.render('admin');
        }
      });
    });

    const openNewFaqBtn = document.getElementById('openNewFaqModalBtn');
    const newFaqModal = document.getElementById('adminNewFaqModal');
    const closeNewFaqBtn = document.getElementById('closeNewFaqModalBtn');
    const createFaqForm = document.getElementById('adminCreateFaqForm');

    if (openNewFaqBtn && newFaqModal) openNewFaqBtn.addEventListener('click', () => newFaqModal.classList.remove('hidden'));
    if (closeNewFaqBtn && newFaqModal) closeNewFaqBtn.addEventListener('click', () => newFaqModal.classList.add('hidden'));

    if (createFaqForm) {
      createFaqForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        const category = document.getElementById('newFaqCategory').value;
        const question = document.getElementById('newFaqQuestion').value;
        const answer = document.getElementById('newFaqAnswer').value;

        const created = await Store.createFaq({ category, question, answer });
        if (created) {
          newFaqModal.classList.add('hidden');
          Views.render('admin');
        }
      });
    }

    document.querySelectorAll('[data-faq-delete]').forEach(btn => {
      btn.addEventListener('click', async () => {
        const id = btn.getAttribute('data-faq-delete');
        if (confirm('هل أنت تأكد من حذف السؤال؟')) {
          await Store.deleteFaq(id);
          Views.render('admin');
        }
      });
    });
  }
};


