'use strict';

const business = {
  name: 'مكتب عبدالله عبدالرحمن الشمراني التجارية',
  shortName: 'مكتب عبدالله الشمراني',
  englishName: 'Abdullah Abdulrahman Alshamrani Office Commercial',
  schemaType: 'HardwareStore',
  siteUrl: 'https://abdullah-alshamrani-store.vercel.app',
  description: 'مواد بناء وديكورات جبسية ومستلزمات كهرباء وسباكة في ظهرة لبن بالرياض، مع خدمات المقاولات والتشطيب والصيانة حسب نطاق الطلب.',
  phoneDisplay: '0569600322',
  phoneInternational: '+966569600322',
  whatsapp: '966569600322',
  address: 'JGMP+9C8، شارع تبوك، حي ظهرة لبن، الرياض 13784، المملكة العربية السعودية',
  streetAddress: 'شارع تبوك، حي ظهرة لبن',
  locality: 'الرياض',
  region: 'منطقة الرياض',
  postalCode: '13784',
  country: 'SA',
  latitude: 24.6334096,
  longitude: 46.5360867,
  hoursLabel: 'تواصل معنا لتأكيد مواعيد زيارة المحل',
  contentUpdatedAt: '2026-10-08',
  nationalUnifiedNumber: '7051429590',
  contractorsMembership: '2026202614',
  municipalLicense: '470621985477',
  heroImage: '/assets/images/hero/store-front.jpg',
  heroWebp: '/assets/images/hero/store-front.webp',
  logo: '/assets/images/logo.svg',
  mapsUrl: 'https://maps.app.goo.gl/xP1R3HWDcSMma2Lt8?g_st=ac',
  mapEmbedUrl: 'https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d8575.676451190091!2d46.5360867!3d24.6334096!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3e2f1f000c77d361%3A0xd0e187b64140faed!2z2KfZhNmF2YjYp9ivINio2YbYp9ihINin2YTYr9uM2qnZiNix2KfYqiDYp9mE2KzYqNiz24zbgw!5e1!3m2!1sar!2sin!4v1786844041256!5m2!1sar!2sin'
};

const categories = [
  {
    id: 'general-contracting',
    title: 'المقاولات العامة والإنشاءات',
    icon: 'building',
    description: 'إدارة وتنفيذ مشروعات البناء العظم والتسليم مفتاح وترميم الواجهات والمباني بخطوات واضحة من المعاينة إلى التسليم.',
    serviceSlugs: ['building-shell-riyadh', 'turnkey-construction-riyadh', 'villa-facade-renovation-riyadh']
  },
  {
    id: 'finishing-decoration',
    title: 'التشطيبات والديكورات',
    icon: 'finish',
    description: 'حلول تشطيب داخلية متناسقة تشمل الجبس والدهانات وورق الحائط والأرضيات مع تنسيق المواد والألوان والتفاصيل.',
    serviceSlugs: ['interior-finishing-decoration-riyadh', 'gypsum-board-suspended-ceilings-riyadh', 'painting-wallpaper-riyadh', 'ceramic-tile-porcelain-flooring-riyadh']
  },
  {
    id: 'mep-maintenance',
    title: 'أعمال السباكة والكهرباء',
    icon: 'mep',
    description: 'تأسيس وصيانة شبكات الكهرباء والسباكة ومعالجة أعطال الصرف مع مراعاة السلامة وسهولة الصيانة المستقبلية.',
    serviceSlugs: ['electrical-plumbing-installation-riyadh', 'electrical-plumbing-maintenance-drainage-riyadh']
  },
  {
    id: 'materials-supply',
    title: 'توريد المواد والمستلزمات',
    icon: 'supply',
    description: 'تجهيز وتوريد مواد البناء والكهرباء والسباكة بكميات منظمة تتوافق مع مرحلة المشروع والمواصفات المطلوبة.',
    serviceSlugs: ['building-materials-supply-riyadh', 'electrical-materials-supply-riyadh', 'plumbing-materials-supply-riyadh']
  }
];

const homeFaqs = [
  {
    question: 'ما الخدمات التي يقدمها مكتب عبدالله الشمراني التجارية؟',
    answer: 'نقدم أعمال المقاولات العامة والبناء العظم والتسليم مفتاح والترميم والتشطيبات والجبس والدهانات والأرضيات، إضافة إلى تأسيس وصيانة الكهرباء والسباكة وتوريد مواد البناء والمستلزمات داخل الرياض.'
  },
  {
    question: 'هل يمكن طلب معاينة قبل إعداد عرض السعر؟',
    answer: 'نعم، تبدأ المشروعات التي تحتاج قياسات أو تشخيصًا ميدانيًا بمعاينة يتم تنسيقها مسبقًا. بعد المعاينة نحدد نطاق العمل والكميات والمدة المتوقعة والعناصر الداخلة في العرض بصورة أوضح.'
  },
  {
    question: 'كيف يتم احتساب تكلفة البناء أو التشطيب؟',
    answer: 'تتأثر التكلفة بالمساحة وحالة الموقع والمخططات ومستوى المواد والتفاصيل المطلوبة ومدة التنفيذ. لذلك لا نعتمد سعرًا عامًا مضللًا؛ نراجع المتطلبات ثم نقدم عرضًا يوضح البنود والكميات وما يشمله التنفيذ.'
  },
  {
    question: 'هل تنفذون مشروعات تسليم مفتاح؟',
    answer: 'نعم، يمكن إدارة المشروع من الأعمال الإنشائية والتأسيسات وحتى التشطيبات النهائية والتسليم وفق نطاق متفق عليه وجدول مراحل واضح، مع تنسيق أعمال المقاولين والتوريد داخل مسار واحد.'
  },
  {
    question: 'هل يمكن توريد المواد دون تنفيذ؟',
    answer: 'نعم، نوفر توريد مواد البناء ومستلزمات الكهرباء والسباكة فقط، كما يمكن دمج التوريد مع التنفيذ عندما يحتاج العميل إلى جهة واحدة تراجع توافق المواد مع الأعمال.'
  },
  {
    question: 'ما نطاق الخدمة داخل الرياض؟',
    answer: 'مقر النشاط في ظهرة لبن بالرياض، ونخدم المشروعات والطلبات في أحياء الرياض بحسب حجم العمل وطبيعته وإمكانية الوصول. يمكن إرسال الموقع والحي عبر واتساب لتأكيد الموعد.'
  },
  {
    question: 'ما المعلومات المطلوبة للحصول على تقييم أولي؟',
    answer: 'أرسل نوع الخدمة، الحي، نوع العقار، المساحة التقريبية، صورًا أو مخططًا إن وجد، والموعد المستهدف. هذه المعلومات تساعد على تقديم رد أولي أدق قبل المعاينة.'
  },
  {
    question: 'هل تشمل الصيانة أعطال الكهرباء والسباكة والصرف؟',
    answer: 'نعم، تشمل الخدمة تشخيص أعطال الكهرباء والسباكة والتسربات والانسدادات ومشكلات الصرف، ثم تحديد الإجراء والقطع المطلوبة. الاستجابة تكون خلال ساعات العمل وبحسب توفر الفريق وطبيعة البلاغ.'
  },
  {
    question: 'كيف أتأكد من موعد زيارة المحل؟',
    answer: 'اتصل على 0569600322 أو تواصل عبر واتساب لتأكيد موعد زيارة المحل قبل التوجه إلى المقر في شارع تبوك بحي ظهرة لبن. ويمكن إرسال تفاصيل طلب المواد أو الخدمة لتنسيق الموعد المناسب.'
  },
  {
    question: 'هل توجد وثائق وشهادات للنشاط؟',
    answer: 'يعرض الموقع صور السجل التجاري ورخصة النشاط وعضوية الهيئة السعودية للمقاولين وشهادات ISO المرفقة من صاحب النشاط. يمكن فتح كل وثيقة داخل قسم الشهادات للاطلاع على بياناتها كما وردت في الأصل.'
  }
];

const assistantFaqs = [
  {
    question: 'أبغى أبني عظم، ما أول خطوة؟',
    answer: 'ابدأ بإرسال موقع المشروع ومساحة الأرض والمخططات وحالة التراخيص إن وجدت. نراجع النطاق المطلوب ثم ننسق معاينة أو اجتماعًا لتحديد البنود والجدول والتكلفة المبدئية.'
  },
  {
    question: 'كم سعر متر التشطيب؟',
    answer: 'لا يوجد سعر واحد دقيق لكل المشروعات؛ يتغير السعر حسب حالة العظم ومستوى المواد وعدد دورات المياه والمطابخ وأعمال الجبس والإنارة والأرضيات. أرسل المساحة ومستوى التشطيب للحصول على تقدير أقرب للواقع.'
  },
  {
    question: 'هل توفرون تسليم مفتاح؟',
    answer: 'نعم، يمكن تنفيذ مشروع متكامل من التأسيسات والأعمال الإنشائية حتى التشطيب والتسليم، وفق نطاق مكتوب ومراحل واضحة يتم اعتمادها قبل البدء.'
  },
  {
    question: 'هل تنفذون ترميم فلل قديمة؟',
    answer: 'نعم، تبدأ أعمال الترميم بفحص الحالة الحالية وتحديد العناصر التي تحتاج إزالة أو إصلاح أو تحديث، ثم ترتيب أعمال السباكة والكهرباء والعزل والتشطيب حتى لا تتكرر الأعمال.'
  },
  {
    question: 'كيف أطلب عرض سعر؟',
    answer: 'اكتب نوع الخدمة والحي والمساحة وأرفق وصفًا واضحًا أو صورًا للموقع. سنراجع البيانات ونوضح إذا كان التقييم يحتاج معاينة قبل إصدار عرض مفصل.'
  },
  {
    question: 'هل توفرون مواد البناء فقط؟',
    answer: 'نعم، نوفر مستلزمات ومواد البناء والكهرباء والسباكة، ويمكن تنسيق التوريد على دفعات حسب تقدم المشروع لتقليل التخزين والهدر.'
  },
  {
    question: 'هل تنفذون الكهرباء والسباكة معًا؟',
    answer: 'نعم، نوفر تأسيس وصيانة الكهرباء والسباكة ضمن خطة منسقة، وهو ما يساعد على ضبط المسارات والمناسيب وتقليل التعارض مع الجبس والأرضيات والنجارة.'
  },
  {
    question: 'كم يستغرق تشطيب الفيلا؟',
    answer: 'تعتمد المدة على المساحة وحالة المشروع ومستوى التفاصيل وتوفر المواد والاعتمادات. بعد مراجعة النطاق نضع جدول مراحل يوضح الأعمال المتتابعة ونقاط التسليم.'
  },
  {
    question: 'هل تخدمون جميع أحياء الرياض؟',
    answer: 'المقر في ظهرة لبن، ونخدم أحياء الرياض بحسب طبيعة وحجم الطلب. أرسل موقعك عبر واتساب لتأكيد إمكانية الخدمة والموعد المناسب.'
  },
  {
    question: 'ما أوقات التواصل؟',
    answer: 'تواصل معنا على 0569600322 لتأكيد موعد الزيارة أو المعاينة. يمكنك أيضًا كتابة طلبك هنا وإرساله عبر واتساب لتنسيق الوقت المناسب.'
  }
];

const certificates = [
  {
    slug: 'iso-14001',
    title: 'شهادة ISO 14001:2015',
    subtitle: 'نظام الإدارة البيئية (EMS)',
    description: 'شهادة امتثال لنظام الإدارة البيئية ضمن نطاق أعمال الإنشاءات والتشطيبات والصيانة كما هو موضح في الوثيقة.',
    registrationNumber: 'KSA407EMS',
    issueDate: '12/07/2026',
    validUntil: '11/07/2027',
    expiryDate: '11/07/2029',
    thumb: '/assets/images/certificates/thumbs/iso-14001.webp',
    original: '/assets/images/certificates/original/iso-14001.jpg',
    width: 1098,
    height: 1536
  },
  {
    slug: 'iso-9001',
    title: 'شهادة ISO 9001:2015',
    subtitle: 'نظام إدارة الجودة',
    description: 'شهادة امتثال لنظام إدارة الجودة ضمن النطاق المهني الموضح في الوثيقة المرفقة.',
    registrationNumber: 'KSA989QMS',
    issueDate: '12/07/2026',
    validUntil: '11/07/2027',
    expiryDate: '11/07/2029',
    thumb: '/assets/images/certificates/thumbs/iso-9001.webp',
    original: '/assets/images/certificates/original/iso-9001.jpg',
    width: 1085,
    height: 1536
  },
  {
    slug: 'sca-membership',
    title: 'شهادة عضوية الهيئة السعودية للمقاولين',
    subtitle: 'عضوية مقاول مسجلة',
    description: 'شهادة عضوية باسم النشاط صادرة عن الهيئة السعودية للمقاولين وفق البيانات الظاهرة في الوثيقة.',
    registrationNumber: '2026202614',
    issueDate: '09/07/2026',
    validUntil: '09/07/2027',
    thumb: '/assets/images/certificates/thumbs/sca-membership.webp',
    original: '/assets/images/certificates/original/sca-membership.jpg',
    width: 1036,
    height: 1536
  },
  {
    slug: 'iso-45001',
    title: 'شهادة ISO 45001:2018',
    subtitle: 'إدارة الصحة والسلامة المهنية',
    description: 'شهادة امتثال لنظام إدارة الصحة والسلامة المهنية ضمن النطاق الموضح في الوثيقة.',
    registrationNumber: 'KSA459OH&S',
    issueDate: '12/07/2026',
    validUntil: '11/07/2027',
    expiryDate: '11/07/2029',
    thumb: '/assets/images/certificates/thumbs/iso-45001.webp',
    original: '/assets/images/certificates/original/iso-45001.jpg',
    width: 1097,
    height: 1536
  },
  {
    slug: 'commercial-registration',
    title: 'شهادة السجل التجاري',
    subtitle: 'وزارة التجارة',
    description: 'صورة شهادة السجل التجاري المرفقة باسم مكتب عبدالله عبدالرحمن الشمراني التجارية.',
    registrationNumber: '7051429590',
    issueDate: '01/09/2025',
    status: 'نشط وفق الوثيقة المرفقة',
    thumb: '/assets/images/certificates/thumbs/commercial-registration.webp',
    original: '/assets/images/certificates/original/commercial-registration.jpg',
    width: 1536,
    height: 1078
  },
  {
    slug: 'commercial-license',
    title: 'رخصة نشاط تجاري',
    subtitle: 'خدمات بلدي — أمانة منطقة الرياض',
    description: 'رخصة نشاط باسم المكتب لتركيب الأسقف الداخلية والحواجز وتلبيس الجدران بالأخشاب، في شارع تبوك بحي ظهرة لبن بالرياض.',
    registrationNumber: '470621985477',
    validUntil: '1448/07/02 هـ',
    thumb: '/assets/images/certificates/thumbs/commercial-license.webp',
    original: '/assets/images/certificates/original/commercial-license.jpg',
    width: 1087,
    height: 1536
  }
];

module.exports = {
  business,
  categories,
  homeFaqs,
  assistantFaqs,
  certificates
};
