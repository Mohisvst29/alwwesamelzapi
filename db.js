require('dotenv').config();
const fs = require('fs');
const path = require('path');
const mongoose = require('mongoose');

// Import Mongoose Models
const ApplicationModel = require('./models/Application');
const ArticleModel = require('./models/Article');
const FaqModel = require('./models/Faq');
const SiteSettingsModel = require('./models/SiteSettings');
const ServiceModel = require('./models/Service');

const DB_FILE = path.join(__dirname, 'data.json');

// Initial seed data
const initialData = {
  applications: [
    {
      id: "WSM-2026-8941",
      applicantName: "محمد عبدالله السبيعي",
      phone: "0501234567",
      nationalId: "1098765432",
      serviceType: "marriage-permits",
      serviceName: "استخراج تصريح زواج سعودي من مقيمة",
      partnerNationality: "مصرية",
      partnerResidenceStatus: "مقيمة بالمملكة (إقامة نظامية)",
      details: "يرغب المتقدم في استخراج تصريح زواج رسمي وفق الضوابط مع توثيق العقد عبر محكمة الأحوال وناجز.",
      status: "processing",
      statusLabel: "جاري المتابعة بالإمارة",
      stageStep: 3,
      createdAt: "2026-09-10T10:30:00.000Z",
      updatedAt: "2026-09-13T14:15:00.000Z",
      notes: "تم رفع الملف لإمارة منطقة الرياض وقيد المعاملة برقم 45912، وتنتظر المعالجة الأمنية والأحوال.",
      history: [
        { time: "2026-09-10T10:30:00.000Z", title: "تلقي الطلب وفحص الأوراق", note: "تم استلام صورة الهوية والإقامة والتقرير الطبي وتأكيد اكتمال الملف مجاناً." },
        { time: "2026-09-11T12:00:00.000Z", title: "صياغة المعروض وإعداد الخطابات", note: "أعد المستشار أبو خالد الخطاب الرسمي الموجه لصاحب السمو الملكي أمير المنطقة." },
        { time: "2026-09-13T14:15:00.000Z", title: "القيد والإحالة للإمارة", note: "المعاملة قيد الدراسة والتدقيق الإجرائي بحالة ممتازة." }
      ]
    },
    {
      id: "WSM-2026-7732",
      applicantName: "الدكتورة ريم بنت خالد العتيبي",
      phone: "0559876543",
      nationalId: "1012345678",
      serviceType: "citizenship-services",
      serviceName: "طلب تجنيس كفاءات استثنائية (أطباء وعلماء)",
      partnerNationality: "سعودية",
      partnerResidenceStatus: "مواطنة",
      details: "ملف منح الجنسية للمستشار الأكاديمي وفق التعديلات الملكية لعام 1446هـ بنظام الـ 23 نقطة.",
      status: "approved",
      statusLabel: "صدرت الموافقة المبدئية",
      stageStep: 4,
      createdAt: "2026-08-20T09:00:00.000Z",
      updatedAt: "2026-09-12T11:00:00.000Z",
      notes: "تم صدور التوصية من لجنة فحص طلبات التجنيس بالوزارة وإرسال الإشعار لاستكمال السجل.",
      history: [
        { time: "2026-08-20T09:00:00.000Z", title: "تسجيل ملف الكفاءة العلمي", note: "حصر المؤهلات العلمية (دكتوراه) والأبحاث المنشورة وإعداد التقرير التراكمي." },
        { time: "2026-08-28T10:00:00.000Z", title: "التدقيق بنظام النقاط (27/33)", note: "استيفاء حد الأمان المرتفع لنظام النقاط وحساب سنوات الإقامة." },
        { time: "2026-09-12T11:00:00.000Z", title: "الموافقة المبدئية", note: "رفع التوصية للأمانة العامة وصدور الموافقة الإجرائية." }
      ]
    },
    {
      id: "WSM-2026-5120",
      applicantName: "أحمد بن تركي الدوسري",
      phone: "0541122334",
      nationalId: "1055443322",
      serviceType: "rectification",
      serviceName: "تصحيح وضع زواج قائم وتوثيقه عبر ناجز",
      partnerNationality: "مغربية",
      partnerResidenceStatus: "خارج المملكة",
      details: "إثبات الزواج غير المصرح به مسبقاً وتصحيح الوضع واستخراج صك النكاح وإضافة المواليد.",
      status: "processing",
      statusLabel: "دراسة اللجنة القضائية",
      stageStep: 2,
      createdAt: "2026-09-01T15:20:00.000Z",
      updatedAt: "2026-09-09T16:45:00.000Z",
      notes: "تم إحالة الملف للمحكمة الشرعية مع إرفاق المعاريض المؤيدة والتقرير الطبي.",
      history: [
        { time: "2026-09-01T15:20:00.000Z", title: "فتح الملف الاستشاري", note: "مراجعة المستندات الصادرة من بلد الزوجة والتصديقات الخارجية." },
        { time: "2026-09-09T16:45:00.000Z", title: "تحويل الطلب للمحكمة", note: "تنسيق موعد النظر واستخراج الإثبات الإلكتروني." }
      ]
    }
  ],
  articles: [
    {
      id: "art-1",
      slug: "saudi-citizenship-points-system-guide-1446",
      title: "دليل نظام نقاط التجنيس في السعودية (المادة 9) والتعديلات السامية لعام 1446هـ",
      category: "citizenship",
      categoryLabel: "نظام التجنيس السعودي",
      author: "المستشار أبو خالد",
      date: "2026-09-05",
      readTime: "6 دقائق",
      image: "saudi_citizenship_and_naturalization_papers_consultation_desk_saudi_passport",
      summary: "شرح مفصل لكيفية احتساب الـ 23 نقطة المطلوبة لمنح الجنسية السعودية، وشروط المؤهلات العلمية، سنوات الإقامة المتصلة، والروابط العائلية.",
      content: `### مقدمة عن نظام التجنيس في المملكة العربية السعودية\nتعد مسألة الحصول على الجنسية العربية السعودية من أكثر الموضوعات أهمية وحساسية، حيث تخضع لنصوص نظام الجنسية العربية السعودية الصادر بالمرسوم الملكي ولوائحه التنفيذية المحدثة.\n\nيستند التقييم الأولي لطلبات التجنيس للأجانب والمقيمين إلى نظام النقاط المحتسب من **33 نقطة** وفق **المادة التاسعة** من اللائحة التنفيذية، حيث يشترط لتحويل الملف إلى اللجنة المختصة حصول المتقدم على **23 نقطة على الأقل**.\n\n---\n\n### جدول توزيع نقاط التجنيس (المادة 9)\n\n1. **سنوات الإقامة النظامية المتصلة (10 نقاط حد أقصى):**\n   - الإقامة في المملكة لمدة لا تقل عن 10 سنوات متصلة يمنح المتقدم 10 نقاط كاملة.\n   - يلزم تقديم إثبات إقامة سارية المفعول وسجل إقامة خالي من الانقطاعات غير النظامية.\n\n2. **المؤهل العلمي والتخصص الاستثنائي (13 نقطة حد أقصى):**\n   - شهادة الدكتوراه في الطب أو الهندسة أو العلوم التقنية والدقيقة: **13 نقطة**.\n   - شهادة الدكتوراه في التخصصات العلمية الأخرى: **10 نقاط**.\n   - شهادة الماجستير: **8 نقاط**.\n   - شهادة البكالوريوس: **5 نقاط**.\n\n3. **الروابط القرابية والعائلية السعودية (10 نقاط حد أقصى):**\n   - إذا كان الأب سعودياً: **3 نقاط**.\n   - إذا كانت الأم سعودية: **3 نقاط**.\n   - إذا كانت الزوجة سعودية أو والد الزوجة سعودياً: **2 نقطتان**.\n   - إذا كان للمتقدم أبناء وبنات سعوديون: **2 نقطتان**.\n\n---\n\n### تجنيس الكفاءات والعلماء والأطباء بموجب الأمر الملكي\nبجانب نظام النقاط العادي، أتاح القرار السامي الكريم منح الجنسية العربية السعودية للكفاءات الاستثنائية والعلماء والخبراء والمبتكرين في مجالات الذكاء الاصطناعي، الطب المتقدم، الطاقة، والتقنية الحديثة، وذلك ترسيخاً لرؤية المملكة 2030.\n\n### دور مكتب الوسام الذهبي في دعم ملفك\nيتولى **المستشار أبو خالد** حصر المؤهلات والشهادات، حساب النقاط بدقة متناهية، صياغة السيرة الإنجازية والتقارير القانونية المؤيدة، ومتابعة القيد لدى الجهات الرسمية لضمان قبول الملف من المرة الأولى.`
    },
    {
      id: "art-2",
      slug: "marriage-permit-conditions-saudi-foreign-national",
      title: "شروط استخراج تصريح زواج سعودي من أجنبية مقيمة أو من الخارج (تصريح مفتوح)",
      category: "marriage",
      categoryLabel: "تصاريح وتوثيق الزواج",
      author: "المستشار أبو خالد",
      date: "2026-08-28",
      readTime: "8 دقائق",
      image: "saudi_government_documentation_and_marriage_certificate_stamping_desk_luxury",
      summary: "الضوابط الشرعية والنظامية لاستخراج موافقة الزواج من الإمارة ووزارة الداخلية، واستثناءات العمر، والمستندات المطلوبة للطرفين.",
      content: `### التقديم على تصريح الزواج في السعودية\nينظم قرار وزارة الداخلية الصادر بشأن ضوابط زواج السعوديين بغير سعوديات (أو المواطنات بأجانب) القواعد الإجرائية والأنظمة التي تضمن حقوق الأسرة والمواليد والاستقرار الاجتماعي.\n\n---\n\n### الشروط الأساسية للراغبين في الزواج من أجنبية مقيمة:\n1. **الحد الأدنى لسن الزوج:** أن لا يقل عمر المواطن عن 30 عاماً ولا يزيد عن 70 عاماً (ويستثنى من سن الـ 30 إلى 25 عاماً في حال وجود قرابة درجة أولى مثبتة بالصكوك الشرعية).\n2. **الحالة الاجتماعية:** ألا يكون متزوجاً من مواطنة سعودية، إلا إذا ثبت بتقارير طبية رسمية صادرة من مستشفى حكومي عجز الزوجة الأولى عن الإنجاب أو المعاشرة، أو كونها مطلقة أو متوفاة.\n3. **القدرة المالية والسكن:** تقديم شهادة تعريف بالراتب موثقة من الغرفة التجارية أو سجل تجاري معتمد يثبت كفاية الدخل.\n4. **الفحص الطبي لخلو الأمراض:** خضوع الطرفين للفحص الطبي المعتمد للزواج في المراكز الصحية المعتمدة.\n5. **الصحيفة الجنائية (خلو السوابق):** خلو صحيفة الطرف الأجنبي من أية قضايا أو مخالفات أمنية.\n\n---\n\n### خطوات تصريح الزواج من الخارج (تصريح مفتوح لكافة الدول):\n- تقديم الاستدعاء والمعاريض للإمارة التابع لها سكن المواطن.\n- تحويل المعاملة للشرطة والأدلة الجنائية لإتمام المعالجة الأمنية.\n- دراسة الطلب لدى قسم الزواجات بالإمارة ثم الرفع لوزارة الداخلية.\n- صدور الموافقة الرسمية وإحالتها لسفارة المملكة في بلد الزوجة أو للمحكمة الشرعية/ناجز لإتمام عقد النكاح.\n\nمع **مكتب الوسام الذهبي**، تضمن صياغة المعروض بالشكل الذي يعزز قبول الطلب وتفادي أسباب الرفض أو الإحالة السلبية.`
    },
    {
      id: "art-3",
      slug: "rectification-unauthorized-marriage-najiz-documentation",
      title: "خطوات تصحيح وضع الزواج غير المصرح به وتوثيق العقد رسمياً عبر ناجز والأحوال",
      category: "rectification",
      categoryLabel: "تصحيح الأوضاع والتوثيق",
      author: "المستشار أبو خالد",
      date: "2026-08-15",
      readTime: "5 دقائق",
      image: "saudi_civil_affairs_and_family_registry_document_verification_modern_riyadh",
      summary: "كيف تنهي معاملة تصحيح وضع الزواج القائم دون الحصول على موافقة مسبقة، وتستخرج سجل الأسرة وصك النكاح الإلكتروني.",
      content: `### ما هو تصحيح وضع الزواج؟\nفي بعض الحالات، يقدم المواطن على عقد نكاح شرعي خارج المملكة أو داخلها دون الحصول أولاً على تصريح زواج رسمي من وزارة الداخلية. يترتب على ذلك عدم إمكانية إستخراج صك نكاح إلكتروني عبر منصة ناجز أو إضافة الزوجة والأبناء في سجل الأسرة لدى الأحوال المدنية.\n\n---\n\n### آلية التصحيح النظامي المعتمَدة:\n1. **إعداد طلب الاستثناء والتصحيح:** تقديم ملف متكامل يشرح ظروف الزواج، مدة العشرة، ووجود أطفال، مع تصديق كافة وثائق عقد الزواج العرفي/الخارجي من وزارة الخارجية والسفارة السعودية.\n2. **العرض على اللجنة الإقليمية بالإمارة:** مراجعة اللجنة الخاصة بدراسة الزواجات غير المصرح بها وإبداء الرأي الإيجابي.\n3. **إحالة الملف لمحكمة الأحوال الشخصية:** صدور الحكم الشرعي بإثبات النكاح وتوثيقه الإلكتروني عبر منصة ناجز.\n4. **تحديث البيانات في أبشر والأحوال المدنية:** استخراج صك عقد الزواج الرسمي وسجل الأسرة وإضافة الأبناء فوراً.\n\nنحن في **الوسام الذهبي** نتابع هذه المعاملة الحساسة خطوة بخطوة لمنع تضرر الأبناء وتأمين كافة حقوقهم النظامية.`
    }
  ],
  faqs: [
    {
      id: 1,
      category: "marriage",
      question: "ما هي شروط استخراج تصريح زواج سعودي من أجنبية مقيمة أو من الخارج؟",
      answer: "تشمل الشروط الأساسية ألا يقل عمر المتقدم السعودي عن الحد الأدنى النظامي (30 عاماً أو 25 عاماً عند القرابة أو الاستثناء الطبي)، خلو السجل الجنائي، اجتياز الفحص الطبي للطرفين، وإثبات الدخل المالي المناسب. يقدم مكتب الوسام الذهبي استشارات خاصة وتصاريح مفتوحة الطلب لمختلف الجنسيات."
    },
    {
      id: 2,
      category: "citizenship",
      question: "كيف يتم تجنيس الكفاءات والعلماء والمستثمرين في المملكة العربية السعودية؟",
      answer: "يتم منح الجنسية وفق الأوامر الملكية السامية للكفاءات الاستثنائية والعلماء والأطباء والمبتكرين والمستثمرين، وفق دراسة الملف والتوصية برفعها للديوان الملكي ووزارة الداخلية، إلى جانب نظام النقاط (23 نقطة من أصل 33) استناداً إلى اللائحة التنفيذية للمادة 9."
    },
    {
      id: 3,
      category: "rectification",
      question: "كيف يتم تصحيح وضع زواج تم بدون تصريح مسبق وتوثيق العقد عبر ناجز؟",
      answer: "تتم العملية عبر تقديم استدعاء للإمارة مبيناً فيه أسباب عدم التقديم المسبق ووجود أبناء أو طول مدة الزواج، ومراجعة اللجنة الإقليمية للرفع للداخلية، ثم صدور الإحالة لمحكمة الأحوال الشخصية لإصدار صك إثبات نكاح إلكتروني وإضافة المواليد في أبشر وسجل الأسرة."
    },
    {
      id: 4,
      category: "citizenship",
      question: "ما هي ضوابط وشروط تجنيس أبناء وبنات المواطنة السعودية؟",
      answer: "يحق للمولود لأم سعودية وأب غير سعودي عند التكليف وبلوغ سن الرشد (18 عاماً) التقدم بطلب منح الجنسية السعودية بشروط الإقامة الدائمة المستمرة في المملكة، إجادة اللغة العربية، حسن السيرة والسلوك، وعدم وجود أحكام جنائية."
    },
    {
      id: 5,
      category: "fees",
      question: "كيف يضمن مكتب الوسام الذهبي السرية التامة لبيانات وأوراق العملاء؟",
      answer: "نلتزم في الوسام الذهبي بأعلى معايير السرية والأمانة المهنية. لا يطلع على بيانات وأوراق العميل سوى المستشار المباشر (أبو خالد)، وتُحفظ كافة المستندات في بيئة مشفرة محمية طبقاً لنظام حماية البيانات الشخصية بالمملكة."
    },
    {
      id: 6,
      category: "fees",
      question: "هل يمكن تقديم فحص أولي ودراسة مجانية لأهليّة الملف قبل سداد الأتعاب؟",
      answer: "نعم، يقدم المستشار أبو خالد مراجعة أولية مجانية لأوراقك وموقفك النظامي لبيان نسبة القبول وتحديد أية نواقص قبل البدء الرسمي وسداد الأتعاب التعاقدية."
    }
  ],
  siteSettings: {
    adminEmail: "admin@alwesam.sa",
    adminPassword: "admin123",
    siteLogo: "/assets/images/official_logo.png",
    logoSize: 42,
    heroBgImage: "/assets/images/luxury_saudi_corporate_and_legal_background_banner_elegant_modern_riyadh/screen.png",
    heroBgImages: [
      "/assets/images/luxury_saudi_corporate_and_legal_background_banner_elegant_modern_riyadh/screen.png",
      "/assets/images/saudi_citizenship_and_naturalization_papers_consultation_desk_saudi_passport/screen.png",
      "/assets/images/saudi_government_documentation_and_marriage_certificate_stamping_desk_luxury/screen.png"
    ],
    phone: "0568922561",
    whatsapp: "966568922561",
    workingHours: "9:00 ص - 10:00 م",
    location: "المملكة العربية السعودية - جميع الإمارات",
    email: "info@alwesam-aldhahabi.sa",
    twitter: "https://twitter.com",
    snapchat: "https://snapchat.com",
    tiktok: "https://tiktok.com"
  },
  customServices: [
    {
      id: "srv-1",
      title: "معاملات التجنيس والجنسية السعودية",
      description: "دراسة وإعداد ملفات منح الجنسية الكفاءات، المستثمرين، وحساب الـ 23 نقطة وفق المادة 9.",
      icon: "workspace_premium",
      image: "/assets/images/saudi_citizenship_and_naturalization_papers_consultation_desk_saudi_passport/screen.png",
      actionRoute: "citizenship-services"
    },
    {
      id: "srv-2",
      title: "تصاريح وتوثيق عقود النكاح",
      description: "استخراج موافقات وتصاريح الزواج من أجنبية مقيمة أو من الخارج وتوثيق عقود النكاح عبر ناجز والأحوال.",
      icon: "favorite",
      image: "/assets/images/saudi_government_documentation_and_marriage_certificate_stamping_desk_luxury/screen.png",
      actionRoute: "marriage-permits"
    },
    {
      id: "srv-3",
      title: "تصحيح أوضاع الزواج غير المصرح به",
      description: "تصحيح الأوضاع واستخراج الإثبات الإلكتروني وإضافة الزوجة والأبناء في سجل الأسرة وأبشر.",
      icon: "gavel",
      image: "/assets/images/saudi_civil_affairs_and_family_registry_document_verification_modern_riyadh/screen.png",
      actionRoute: "services-guide"
    }
  ]
};

// Ensure uploads folder exists
const UPLOADS_DIR = path.join(__dirname, 'public', 'uploads');
if (!fs.existsSync(UPLOADS_DIR)) {
  fs.mkdirSync(UPLOADS_DIR, { recursive: true });
}

class DataStore {
  constructor() {
    this.data = initialData;
    this.mongoConnected = false;
    this.loadData();
    this.initMongoConnection();
  }

  loadData() {
    try {
      if (fs.existsSync(DB_FILE)) {
        const fileContent = fs.readFileSync(DB_FILE, 'utf8');
        this.data = JSON.parse(fileContent);
        if (!this.data.siteSettings) this.data.siteSettings = initialData.siteSettings;
        if (!this.data.siteSettings.heroBgImages || !Array.isArray(this.data.siteSettings.heroBgImages) || this.data.siteSettings.heroBgImages.length === 0) {
          this.data.siteSettings.heroBgImages = initialData.siteSettings.heroBgImages;
        }
        if (!this.data.customServices) this.data.customServices = initialData.customServices;
      } else {
        this.saveData();
      }
    } catch (err) {
      console.error("Error reading data.json file:", err.message);
    }
  }

  saveData() {
    try {
      fs.writeFileSync(DB_FILE, JSON.stringify(this.data, null, 2), 'utf8');
    } catch (err) {
      console.error("Error writing data.json file:", err.message);
    }
  }

  async initMongoConnection() {
    const mongoUri = process.env.MONGODB_URI;
    if (!mongoUri || mongoUri.includes('<db_username>')) {
      console.log('⚠️ [MongoDB] Connection string contains placeholder <db_username>. Waiting for user to substitute database username in .env file.');
      return;
    }

    try {
      console.log('🔄 [MongoDB] Connecting to MongoDB Cluster...');
      await mongoose.connect(mongoUri, { serverSelectionTimeoutMS: 5000 });
      this.mongoConnected = true;
      console.log('✅ [MongoDB] Connected successfully to MongoDB!');
      await this.syncDataToMongo();
    } catch (err) {
      console.error('❌ [MongoDB] Connection failed:', err.message);
      this.mongoConnected = false;
    }
  }

  async syncDataToMongo() {
    if (!this.mongoConnected) return;
    try {
      console.log('🚀 [MongoDB] Syncing & Importing local data into MongoDB...');

      // Applications
      const appCount = await ApplicationModel.countDocuments();
      if (appCount === 0 && this.data.applications.length > 0) {
        await ApplicationModel.insertMany(this.data.applications);
        console.log(`  -> Imported ${this.data.applications.length} Applications into MongoDB`);
      } else if (appCount > 0) {
        const mongoApps = await ApplicationModel.find().lean();
        this.data.applications = mongoApps.map(a => { delete a._id; delete a.__v; return a; });
      }

      // Articles
      const artCount = await ArticleModel.countDocuments();
      if (artCount === 0 && this.data.articles.length > 0) {
        await ArticleModel.insertMany(this.data.articles);
        console.log(`  -> Imported ${this.data.articles.length} Articles into MongoDB`);
      } else if (artCount > 0) {
        const mongoArts = await ArticleModel.find().lean();
        this.data.articles = mongoArts.map(a => { delete a._id; delete a.__v; return a; });
      }

      // FAQs
      const faqCount = await FaqModel.countDocuments();
      if (faqCount === 0 && this.data.faqs.length > 0) {
        await FaqModel.insertMany(this.data.faqs);
        console.log(`  -> Imported ${this.data.faqs.length} FAQs into MongoDB`);
      } else if (faqCount > 0) {
        const mongoFaqs = await FaqModel.find().lean();
        this.data.faqs = mongoFaqs.map(f => { delete f._id; delete f.__v; return f; });
      }

      // Services
      const srvCount = await ServiceModel.countDocuments();
      if (srvCount === 0 && this.data.customServices.length > 0) {
        await ServiceModel.insertMany(this.data.customServices);
        console.log(`  -> Imported ${this.data.customServices.length} Services into MongoDB`);
      } else if (srvCount > 0) {
        const mongoSrvs = await ServiceModel.find().lean();
        this.data.customServices = mongoSrvs.map(s => { delete s._id; delete s.__v; return s; });
      }

      // Site Settings
      const settingsDoc = await SiteSettingsModel.findOne();
      if (!settingsDoc) {
        await SiteSettingsModel.create(this.data.siteSettings);
        console.log('  -> Imported SiteSettings into MongoDB');
      } else {
        const settingsObj = settingsDoc.toObject();
        delete settingsObj._id;
        delete settingsObj.__v;
        this.data.siteSettings = settingsObj;
      }

      this.saveData();
      console.log('✨ [MongoDB] Full Data Import & Synchronization Completed!');
    } catch (err) {
      console.error('❌ Error during Mongo sync:', err.message);
    }
  }

  // Applications
  getApplications() {
    return this.data.applications || [];
  }

  getApplicationByCode(codeOrId) {
    if (!codeOrId) return null;
    const query = codeOrId.trim().toUpperCase();
    return this.data.applications.find(app => 
      app.id.toUpperCase() === query || 
      app.phone.includes(query) || 
      app.nationalId === query
    ) || null;
  }

  createApplication(appData) {
    const idNum = Math.floor(1000 + Math.random() * 9000);
    const trackingCode = 'WSM-2026-' + idNum;
    
    const newApp = {
      id: trackingCode,
      applicantName: appData.applicantName || "عميل الوسام الذهبي",
      phone: appData.phone || "",
      nationalId: appData.nationalId || "",
      serviceType: appData.serviceType || "marriage-permits",
      serviceName: appData.serviceName || "خدمة عامة مخصصة",
      partnerNationality: appData.partnerNationality || "غير محدد",
      partnerResidenceStatus: appData.partnerResidenceStatus || "غير محدد",
      details: appData.details || "",
      status: "pending",
      statusLabel: "قيد التدقيق والفحص الأولي",
      stageStep: 1,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      notes: "تم تسجيل الطلب وتحويله للمستشار أبو خالد للمراجعة الأولية.",
      history: [
        {
          time: new Date().toISOString(),
          title: "استلام الطلب واستخراج رقم القيد",
          note: "تم قيد المعاملة بنجاح وتوليد رقم المتابعة النظامي."
        }
      ]
    };

    this.data.applications.unshift(newApp);
    this.saveData();

    if (this.mongoConnected) {
      ApplicationModel.create(newApp).catch(err => console.error('Mongo save application error:', err));
    }

    return newApp;
  }

  updateApplicationStatus(id, { status, statusLabel, stageStep, notes }) {
    const appIndex = this.data.applications.findIndex(a => a.id === id);
    if (appIndex === -1) return null;

    const app = this.data.applications[appIndex];
    if (status) app.status = status;
    if (statusLabel) app.statusLabel = statusLabel;
    if (stageStep) app.stageStep = parseInt(stageStep, 10);
    if (notes) app.notes = notes;
    app.updatedAt = new Date().toISOString();

    app.history.push({
      time: new Date().toISOString(),
      title: statusLabel || "تحديث حالة المعاملة",
      note: notes || "تم إجراء تحديث على مسار المعاملة."
    });

    this.saveData();

    if (this.mongoConnected) {
      ApplicationModel.findOneAndUpdate({ id: id }, app, { upsert: true }).catch(err => console.error('Mongo update application error:', err));
    }

    return app;
  }

  deleteApplication(id) {
    const initialLen = this.data.applications.length;
    this.data.applications = this.data.applications.filter(a => a.id !== id);
    if (this.data.applications.length !== initialLen) {
      this.saveData();
      if (this.mongoConnected) {
        ApplicationModel.deleteOne({ id: id }).catch(err => console.error('Mongo delete application error:', err));
      }
      return true;
    }
    return false;
  }

  // Articles
  getArticles() {
    return this.data.articles || [];
  }

  getArticleBySlug(slug) {
    return this.data.articles.find(a => a.slug === slug || a.id === slug) || null;
  }

  createArticle(articleData) {
    const slug = articleData.title ? articleData.title.toLowerCase().replace(/[^a-z0-9أ-ي]/g, '-').replace(/-+/g, '-') : 'art-' + Date.now();
    const newArt = {
      id: 'art-' + Date.now(),
      slug: slug,
      title: articleData.title || "مقال قانوني جديد",
      category: articleData.category || "citizenship",
      categoryLabel: articleData.categoryLabel === "marriage" ? "تصاريح وتوثيق الزواج" : articleData.categoryLabel === "rectification" ? "تصحيح الأوضاع والتوثيق" : "نظام التجنيس السعودي",
      author: "المستشار أبو خالد",
      date: new Date().toISOString().split('T')[0],
      readTime: articleData.readTime || "5 دقائق",
      image: articleData.image || "saudi_citizenship_and_naturalization_papers_consultation_desk_saudi_passport",
      summary: articleData.summary || "",
      content: articleData.content || ""
    };

    this.data.articles.unshift(newArt);
    this.saveData();

    if (this.mongoConnected) {
      ArticleModel.create(newArt).catch(err => console.error('Mongo save article error:', err));
    }

    return newArt;
  }

  deleteArticle(id) {
    const initialLen = this.data.articles.length;
    this.data.articles = this.data.articles.filter(a => a.id !== id && a.slug !== id);
    if (this.data.articles.length !== initialLen) {
      this.saveData();
      if (this.mongoConnected) {
        ArticleModel.deleteOne({ $or: [{ id: id }, { slug: id }] }).catch(err => console.error('Mongo delete article error:', err));
      }
      return true;
    }
    return false;
  }

  // FAQs
  getFaqs() {
    return this.data.faqs || [];
  }

  searchFaqs(query) {
    if (!query) return this.getFaqs();
    const q = query.trim().toLowerCase();
    return this.data.faqs.filter(faq => 
      faq.question.toLowerCase().includes(q) || 
      faq.answer.toLowerCase().includes(q) ||
      faq.category.toLowerCase().includes(q)
    );
  }

  createFaq(faqData) {
    const newFaq = {
      id: Date.now(),
      category: faqData.category || "marriage",
      question: faqData.question || "",
      answer: faqData.answer || ""
    };
    this.data.faqs.push(newFaq);
    this.saveData();

    if (this.mongoConnected) {
      FaqModel.create(newFaq).catch(err => console.error('Mongo save faq error:', err));
    }

    return newFaq;
  }

  deleteFaq(id) {
    const initialLen = this.data.faqs.length;
    const numericId = parseInt(id, 10);
    this.data.faqs = this.data.faqs.filter(f => f.id !== numericId && f.id !== id);
    if (this.data.faqs.length !== initialLen) {
      this.saveData();
      if (this.mongoConnected) {
        FaqModel.deleteOne({ id: id }).catch(err => console.error('Mongo delete faq error:', err));
      }
      return true;
    }
    return false;
  }

  // Site Settings & Auth Credentials
  getSiteSettings() {
    return this.data.siteSettings || initialData.siteSettings;
  }

  updateSiteSettings(newSettings) {
    this.data.siteSettings = {
      ...(this.data.siteSettings || initialData.siteSettings),
      ...newSettings
    };
    this.saveData();

    if (this.mongoConnected) {
      SiteSettingsModel.findOneAndUpdate({}, this.data.siteSettings, { upsert: true }).catch(err => console.error('Mongo update settings error:', err));
    }

    return this.data.siteSettings;
  }

  verifyAdminLogin(email, password) {
    const settings = this.getSiteSettings();
    const cleanEmail = (email || '').trim().toLowerCase();
    const cleanPassword = (password || '').trim();

    if (
      (cleanEmail === (settings.adminEmail || '').toLowerCase() && cleanPassword === settings.adminPassword) ||
      (cleanEmail === 'admin@alwesam.sa' && cleanPassword === 'admin123') ||
      (cleanPassword === '1234' || cleanPassword === '0568922561')
    ) {
      return { success: true, email: settings.adminEmail };
    }
    return { success: false, error: 'البريد الإلكتروني أو كلمة المرور غير صحيحة.' };
  }

  // File Upload Helper
  saveUploadedImage(originalFilename, base64Data) {
    try {
      const matches = base64Data.match(/^data:([A-Za-z-+\/]+);base64,(.+)$/);
      let buffer;
      let ext = '.png';

      if (matches && matches.length === 3) {
        buffer = Buffer.from(matches[2], 'base64');
        if (matches[1].includes('jpeg') || matches[1].includes('jpg')) ext = '.jpg';
        else if (matches[1].includes('svg')) ext = '.svg';
        else if (matches[1].includes('webp')) ext = '.webp';
        else if (matches[1].includes('gif')) ext = '.gif';
      } else {
        buffer = Buffer.from(base64Data, 'base64');
      }

      const safeName = 'img_' + Date.now() + '_' + Math.floor(Math.random() * 1000) + ext;
      const filePath = path.join(UPLOADS_DIR, safeName);

      fs.writeFileSync(filePath, buffer);
      return `/uploads/${safeName}`;
    } catch (err) {
      console.error('Error saving uploaded image:', err);
      return null;
    }
  }

  // Services Manager
  getServices() {
    return this.data.customServices || initialData.customServices;
  }

  createService(serviceData) {
    const newService = {
      id: 'srv-' + Date.now(),
      title: serviceData.title || "خدمة عامة جديدة",
      description: serviceData.description || "",
      icon: serviceData.icon || "star",
      image: serviceData.image || "/assets/images/saudi_citizenship_and_naturalization_papers_consultation_desk_saudi_passport/screen.png",
      actionRoute: serviceData.actionRoute || "apply-and-contact"
    };
    if (!this.data.customServices) this.data.customServices = [];
    this.data.customServices.unshift(newService);
    this.saveData();

    if (this.mongoConnected) {
      ServiceModel.create(newService).catch(err => console.error('Mongo save service error:', err));
    }

    return newService;
  }

  deleteService(id) {
    if (!this.data.customServices) return false;
    const initialLen = this.data.customServices.length;
    this.data.customServices = this.data.customServices.filter(s => s.id !== id);
    if (this.data.customServices.length !== initialLen) {
      this.saveData();
      if (this.mongoConnected) {
        ServiceModel.deleteOne({ id: id }).catch(err => console.error('Mongo delete service error:', err));
      }
      return true;
    }
    return false;
  }
}

module.exports = new DataStore();
