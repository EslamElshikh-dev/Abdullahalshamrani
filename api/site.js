const { products, services, articles, areas } = require('./data');

const SITE = 'https://abdullah-alshamrani-store.vercel.app';
const PHONE = '0569600322';
const WA = '966569600322';
const ADDRESS = '7895 تبوك 3050، ظهرة لبن، الرياض 13784';
const HERO_IMAGE = 'https://i.ibb.co/RT23wCCS/Screenshot.jpg?v=20260802-final';

const esc = (s='') => String(s).replace(/[&<>\"]/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','\"':'&quot;'}[c]));
const itemBy = (list, slug) => list.find(x => x.slug === slug);

function icon(name, cls='') {
  const common = `class="${cls}" viewBox="0 0 24 24" aria-hidden="true"`;
  const icons = {
    home:`<svg ${common}><path d="M3 10.8 12 3l9 7.8v9.7a.5.5 0 0 1-.5.5H15v-6H9v6H3.5a.5.5 0 0 1-.5-.5z" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linejoin="round"/></svg>`,
    grid:`<svg ${common}><rect x="3" y="3" width="7" height="7" rx="1.4" fill="none" stroke="currentColor" stroke-width="1.8"/><rect x="14" y="3" width="7" height="7" rx="1.4" fill="none" stroke="currentColor" stroke-width="1.8"/><rect x="3" y="14" width="7" height="7" rx="1.4" fill="none" stroke="currentColor" stroke-width="1.8"/><rect x="14" y="14" width="7" height="7" rx="1.4" fill="none" stroke="currentColor" stroke-width="1.8"/></svg>`,
    tools:`<svg ${common}><path d="m14.7 6.3 3-3a5 5 0 0 1-6.5 6.5L5 16l3 3 6.2-6.2a5 5 0 0 1 6.5-6.5l-3 3z" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linejoin="round"/><path d="m4 4 5 5" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/></svg>`,
    phone:`<svg ${common}><path d="M6.6 10.8a15.5 15.5 0 0 0 6.6 6.6l2.2-2.2c.3-.3.7-.4 1-.2 1.1.4 2.3.6 3.6.6.6 0 1 .4 1 1V20c0 .6-.4 1-1 1C10.6 21 3 13.4 3 4c0-.6.4-1 1-1h3.5c.6 0 1 .4 1 1 0 1.2.2 2.4.6 3.6.1.4 0 .8-.3 1.1z" fill="currentColor"/></svg>`,
    whatsapp:`<svg ${common}><path d="M12.1 2a9.8 9.8 0 0 0-8.5 14.7L2 22l5.4-1.4A9.9 9.9 0 1 0 12.1 2Zm0 17.7c-1.6 0-3.1-.4-4.4-1.2l-.3-.2-3.2.8.9-3.1-.2-.3a7.8 7.8 0 1 1 7.2 4Zm4.3-5.8c-.2-.1-1.5-.7-1.7-.8-.2-.1-.4-.1-.6.1l-.7.9c-.1.2-.3.2-.5.1-1.4-.7-2.3-1.2-3.2-2.8-.2-.4.2-.4.7-1.3.1-.2 0-.3 0-.5l-.8-1.9c-.2-.5-.4-.4-.6-.4h-.5c-.2 0-.5.1-.7.3-.3.3-1 1-1 2.4s1 2.7 1.2 3c.1.2 2 3 4.8 4.2 1.8.8 2.6.8 3.5.7.6-.1 1.5-.6 1.7-1.2.2-.6.2-1.1.2-1.2-.1-.1-.3-.2-.6-.3Z" fill="currentColor"/></svg>`,
    map:`<svg ${common}><path d="M12 21s7-6.2 7-12A7 7 0 1 0 5 9c0 5.8 7 12 7 12Z" fill="none" stroke="currentColor" stroke-width="1.8"/><circle cx="12" cy="9" r="2.3" fill="none" stroke="currentColor" stroke-width="1.8"/></svg>`,
    blog:`<svg ${common}><path d="M5 3h11a3 3 0 0 1 3 3v15H8a3 3 0 0 1-3-3z" fill="none" stroke="currentColor" stroke-width="1.8"/><path d="M8 7h8M8 11h8M8 15h5" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/></svg>`,
    bricks:`<svg ${common}><path d="M3 6h8v5H3zM13 6h8v5h-8zM7 13h8v5H7zM3 13h2v5H3zM17 13h4v5h-4z" fill="none" stroke="currentColor" stroke-width="1.6"/></svg>`,
    column:`<svg ${common}><path d="M5 5h14M7 8h10M8 8v9M12 8v9M16 8v9M6 17h12M5 20h14M7 3h10" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round"/></svg>`,
    faucet:`<svg ${common}><path d="M4 14h9v-3a4 4 0 0 1 4-4h3M8 14v3M18 7V4h-3" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round"/><path d="M18 12c0 1.8-2 3.6-2 3.6S14 13.8 14 12a2 2 0 1 1 4 0Z" fill="currentColor"/></svg>`,
    bolt:`<svg ${common}><path d="m13.5 2-8 11h6L10.5 22l8-12h-6z" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linejoin="round"/></svg>`,
    bulb:`<svg ${common}><path d="M9 18h6M10 21h4M8.5 15.5A7 7 0 1 1 15.5 15.5c-.8.6-1.1 1.1-1.2 1.5h-4.6c-.1-.4-.4-.9-1.2-1.5Z" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/></svg>`,
    pipe:`<svg ${common}><path d="M4 5h6v5H7v7h7v-3h5v6h-6v-3H6a2 2 0 0 1-2-2z" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linejoin="round"/></svg>`,
    shower:`<svg ${common}><path d="M5 20V8a5 5 0 0 1 10 0M11 8h8" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/><path d="M14 11v2M17 11v3M20 11v2" stroke="currentColor" stroke-width="1.7" stroke-linecap="round"/></svg>`,
    wrench:`<svg ${common}><path d="M14.5 6.5a4.7 4.7 0 0 1-6 6L4 17l3 3 4.5-4.5a4.7 4.7 0 0 0 6-6l-3 3-3-3z" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linejoin="round"/></svg>`,
    cable:`<svg ${common}><path d="M7 3v5M4.5 5.5h5M17 16v5M14.5 18.5h5M7 8c0 6 10 2 10 8" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/></svg>`,
    switch:`<svg ${common}><rect x="5" y="3" width="14" height="18" rx="2" fill="none" stroke="currentColor" stroke-width="1.8"/><circle cx="12" cy="9" r="2" fill="none" stroke="currentColor" stroke-width="1.8"/><path d="M9 16h6" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/></svg>`,
    toolbox:`<svg ${common}><path d="M4 8h16v11H4zM9 8V5h6v3M4 12h16M10 12v2h4v-2" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linejoin="round"/></svg>`,
    sparkles:`<svg ${common}><path d="m12 3 1.2 3.3L16.5 7.5l-3.3 1.2L12 12l-1.2-3.3-3.3-1.2 3.3-1.2zM18 13l.8 2.2L21 16l-2.2.8L18 19l-.8-2.2L15 16l2.2-.8zM6 13l.8 2.2L9 16l-2.2.8L6 19l-.8-2.2L3 16l2.2-.8z" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linejoin="round"/></svg>`,
    house:`<svg ${common}><path d="M3 11 12 4l9 7v9H3zM8 20v-6h8v6" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linejoin="round"/></svg>`,
    emergency:`<svg ${common}><path d="M8 18h8M9 18v-6a3 3 0 0 1 6 0v6M7 21h10M5 8l-2-2M19 8l2-2M12 5V2" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/></svg>`
  };
  return icons[name] || icons.tools;
}

function logo() {
  return `<svg class="brand-logo" viewBox="0 0 640 150" role="img" aria-label="شعار مكتب عبدالله الشمراني للتجارة">
  <defs><linearGradient id="lg1" x1="0" y1="0" x2="1" y2="1"><stop stop-color="#31d9ef"/><stop offset="1" stop-color="#08789d"/></linearGradient><linearGradient id="lg2" x1="0" y1="0" x2="1" y2="1"><stop stop-color="#ffe36b"/><stop offset="1" stop-color="#f2a600"/></linearGradient></defs>
  <g transform="translate(8 7)"><path d="M65 3 126 39v68L65 143 4 107V39Z" fill="#071d35" stroke="#123f75" stroke-width="4"/><path d="M18 78 65 39l47 39v39H18Z" fill="none" stroke="url(#lg1)" stroke-width="9" stroke-linejoin="round"/><path d="M34 75v42h62V75M55 117V84h20v33" fill="none" stroke="#0b65a0" stroke-width="7"/><path d="m78 49-20 35h17l-8 30 29-42H79l12-23Z" fill="url(#lg2)"/><path d="M13 119c26-7 42-4 59 2 20 7 36 6 53-2-19 20-40 25-62 17-18-7-32-6-50 0Z" fill="url(#lg1)"/><path d="M23 128c19-2 32 2 45 7 18 7 32 5 46-3-15 17-31 21-50 14-16-6-27-7-41-3Z" fill="url(#lg2)"/></g>
  <g font-family="Tahoma,Arial,sans-serif" text-anchor="start"><text x="620" y="48" direction="rtl" font-size="31" font-weight="800" fill="#12356f">مكتب عبدالله الشمراني</text><text x="620" y="82" direction="rtl" font-size="19" font-weight="700" fill="#0b6f9c">للتجارة</text><path d="M175 94h440" stroke="#153b70" stroke-width="3"/><text x="620" y="124" direction="rtl" font-size="17" font-weight="700" fill="#d99a00">مواد بناء • سباكة • كهرباء • ديكورات</text></g></svg>`;
}

function faq(title) {
  return [
    [`ما الذي تتضمنه خدمة ${title}؟`, `نبدأ بفهم الاحتياج وطبيعة المبنى والموقع والكمية أو العطل، ثم نوضح المواد والخطوات المتوقعة ونطاق الخدمة. الهدف تقديم حل واضح ومناسب بدل تنفيذ جزئي لا يعالج السبب أو لا يتوافق مع بقية مراحل المشروع.`],
    [`هل تتوفر ${title} في جميع أحياء الرياض؟`, `نخدم ظهرة لبن ولبن وعرقة وأحياء شمال وشرق وغرب ووسط وجنوب الرياض. يعتمد موعد الوصول أو التوريد على موقع العميل وحجم الطلب وطبيعة الخدمة، ويمكن تأكيد التغطية مباشرة عبر الاتصال أو الواتساب.`],
    [`هل يمكن طلب عرض سعر قبل البدء؟`, `نعم، يمكن إرسال نوع المبنى والحي والمساحة أو الكمية المطلوبة وصور الموقع إن وجدت. تساعد هذه المعلومات في تكوين تصور أولي، وقد تكون المعاينة ضرورية في الأعمال الفنية قبل اعتماد السعر النهائي.`],
    [`هل توفرون المواد مع التنفيذ؟`, `نعم، يجمع النشاط بين متجر للمستلزمات وخدمات التأسيس والتشطيب والصيانة، ويمكن شراء المنتجات فقط أو طلب التنفيذ فقط أو تنسيق الاثنين معًا حسب احتياج المشروع.`],
    [`كيف أختار المنتج أو الحل المناسب؟`, `نراجع الاستخدام والمقاس والكمية والميزانية وطبيعة الموقع، ثم نوضح الفروق العملية بين البدائل من حيث الملاءمة والجودة وسهولة الصيانة والتوافق مع بقية مكونات المشروع.`],
    [`هل الخدمة مناسبة للفلل والمنازل والمحلات؟`, `نعم، نخدم الفلل والمنازل والشقق والمحلات ومشروعات الترميم والتجديد. تختلف طريقة العمل والمواد حسب طبيعة المبنى وحجم الأحمال أو الشبكات، لذلك يتم تخصيص التوصية لكل حالة.`],
    [`هل توجد خدمة طوارئ؟`, `تتوفر خدمة طوارئ كهرباء وسباكة 24/7 بحسب موقع البلاغ وتوفر الفريق. أرسل وصف المشكلة وصورًا واضحة والحي ورقم التواصل لتسريع التقييم وتجهيز الأدوات والقطع المناسبة.`],
    [`كيف أتواصل بخصوص ${title}؟`, `يمكنك الاتصال مباشرة على ${PHONE} أو إرسال رسالة واتساب تتضمن اسم الخدمة أو المنتج والحي ونوع المبنى والتفاصيل، كما يمكن زيارة المتجر في ${ADDRESS}.`]
  ];
}

function schema(page, faqs=[]) {
  const graph = [
    {'@type':['HardwareStore','HomeAndConstructionBusiness'],'@id':`${SITE}/#business`,name:'مكتب عبدالله عبدالرحمن الشمراني للتجارة',telephone:'+966569600322',url:SITE,address:{'@type':'PostalAddress',streetAddress:'7895 تبوك 3050 ظهرة لبن',addressLocality:'الرياض',postalCode:'13784',addressCountry:'SA'},areaServed:{'@type':'City',name:'الرياض'},priceRange:'$$'},
    {'@type':'WebPage','@id':`${SITE}${page.path}#webpage`,url:`${SITE}${page.path}`,name:page.title,description:page.description,isPartOf:{'@type':'WebSite','@id':`${SITE}/#website`,name:'مكتب عبدالله الشمراني للتجارة',url:SITE}}
  ];
  if (faqs.length) graph.push({'@type':'FAQPage',mainEntity:faqs.map(([q,a])=>({'@type':'Question',name:q,acceptedAnswer:{'@type':'Answer',text:a}}))});
  return JSON.stringify({'@context':'https://schema.org','@graph':graph}).replace(/</g,'\\u003c');
}

function css() { return `
:root{--navy:#041725;--navy2:#0a3248;--cyan:#22d3ee;--gold:#ffc42f;--paper:#f5fafc;--text:#173242;--muted:#637986;--line:#d8e8ee;--green:#25d366;--shadow:0 18px 45px rgba(5,34,49,.12)}*{box-sizing:border-box}html{scroll-behavior:smooth}body{margin:0;font-family:Tahoma,Arial,sans-serif;background:var(--paper);color:var(--text);line-height:1.85}a{text-decoration:none;color:inherit}svg,img{max-width:100%}.wrap{width:min(1180px,92%);margin:auto}.top{background:#020e17;color:#dff7ff;text-align:center;padding:7px 10px;font-size:13px}.header{position:sticky;top:0;z-index:80;background:rgba(4,23,37,.97);border-bottom:1px solid #25566a;color:#fff;backdrop-filter:blur(14px)}.nav{min-height:88px;display:flex;align-items:center;justify-content:space-between;gap:24px}.brand{display:flex;align-items:center;min-width:0}.brand-logo{width:340px;height:78px;display:block}.links{display:flex;gap:16px;font-size:14px;white-space:nowrap}.links a{color:#d4e8ee}.links a:hover{color:var(--gold)}.btn{display:inline-flex;align-items:center;justify-content:center;gap:8px;min-height:48px;padding:11px 19px;border-radius:14px;font-weight:800;border:1px solid transparent;transition:.25s}.btn:hover{transform:translateY(-2px)}.btn svg{width:21px;height:21px}.gold{background:linear-gradient(135deg,#ffe06b,#f5aa00);color:#061725;box-shadow:0 12px 28px rgba(245,170,0,.22)}.cyan{background:linear-gradient(135deg,#34e2f3,#0da5c8);color:#051a25}.outline{border-color:#71a7b8;color:#fff}.hero{color:#fff;background:radial-gradient(circle at 14% 18%,#176078 0,transparent 34%),linear-gradient(145deg,#02111c,#0a3248);padding:76px 0 64px;overflow:hidden}.hero-grid{display:grid;grid-template-columns:1.05fr .95fr;gap:44px;align-items:center}.eyebrow{color:var(--gold);font-weight:800}.hero h1{font-size:clamp(2.2rem,5vw,4.65rem);line-height:1.18;margin:8px 0 18px}.hero p{font-size:17px;color:#d1e6ec}.actions{display:flex;flex-wrap:wrap;gap:11px;margin-top:25px}.hero-media{position:relative;border:1px solid #2e7086;border-radius:30px;overflow:hidden;background:#061725;box-shadow:0 30px 65px rgba(0,0,0,.35);animation:float 5s ease-in-out infinite}.hero-media img{width:100%;aspect-ratio:16/11;object-fit:cover;display:block}.hero-media:after{content:'';position:absolute;inset:0;background:linear-gradient(to top,rgba(2,17,28,.52),transparent 48%);pointer-events:none}.hero-badge{position:absolute;right:18px;bottom:18px;z-index:2;background:rgba(4,23,37,.9);border:1px solid #5a8797;border-radius:14px;padding:10px 14px;color:#fff;font-size:13px}.section{padding:72px 0}.dark{background:var(--navy);color:#fff}.title{text-align:center;max-width:790px;margin:0 auto 38px}.title span{color:#0798b7;font-weight:800}.dark .title span{color:var(--gold)}.title h2{font-size:clamp(1.85rem,3vw,2.85rem);line-height:1.35;margin:6px}.title p,.card p,.prose p{color:var(--muted)}.dark .title p,.dark .card p{color:#bfd6dd}.grid{display:grid;grid-template-columns:repeat(3,1fr);gap:20px}.card{background:#fff;border:1px solid var(--line);border-radius:23px;padding:26px;box-shadow:var(--shadow);transition:.3s}.card:hover{transform:translateY(-7px)}.dark .card{background:#0b2d40;border-color:#275467}.service-icon{width:76px;height:76px;margin:0 auto 15px;border-radius:22px;display:grid;place-items:center;color:#067c9b;background:linear-gradient(145deg,#e7fbff,#fff3cf);box-shadow:inset 0 0 0 1px #b9e2ea}.service-icon svg{width:39px;height:39px}.card h3{text-align:center;margin:7px 0}.card p{text-align:center;font-size:14px}.more{display:block;text-align:center;color:#0788a5;font-weight:800;margin-top:12px}.page-hero{background:linear-gradient(135deg,#041725,#0d3f58);color:#fff;padding:60px 0}.page-hero h1{font-size:clamp(2rem,4vw,3.6rem);line-height:1.28;margin:12px 0}.crumb{color:#b6d7e1;font-size:13px}.layout{display:grid;grid-template-columns:minmax(0,1fr) 320px;gap:28px}.prose{background:#fff;border:1px solid var(--line);border-radius:24px;padding:34px;box-shadow:var(--shadow)}.prose h2{margin-top:32px}.side{position:sticky;top:110px;height:max-content}.box{background:#fff;border:1px solid var(--line);border-radius:20px;padding:22px;margin-bottom:17px}.faq details{background:#fff;border:1px solid var(--line);border-radius:15px;margin:11px 0;padding:15px 18px}.faq summary{font-weight:800;cursor:pointer}.areas{display:flex;flex-wrap:wrap;gap:9px;justify-content:center}.tag{background:#fff;border:1px solid var(--line);padding:8px 13px;border-radius:30px}.article-list{display:grid;gap:14px}.article-link{display:block;padding:15px;border:1px solid var(--line);border-radius:14px;background:#fff}.article-link small{color:var(--muted)}.map iframe{width:100%;height:430px;border:0;border-radius:22px}.cta{background:linear-gradient(135deg,#0d3f58,#041725);color:#fff;border-radius:28px;padding:38px;display:flex;align-items:center;justify-content:space-between;gap:20px}.footer{background:#020d16;color:#b9d0d8;padding:58px 0 112px;border-top:1px solid #1d4556}.foot-grid{display:grid;grid-template-columns:1.5fr 1fr 1.2fr 1.45fr;gap:30px}.footer-logo{max-width:300px;background:#fff;border-radius:16px;padding:10px;margin-bottom:15px}.footer h3{color:#fff;font-size:16px;margin-top:0}.footer a{display:block;font-size:13px;margin:7px 0;color:#c5dce3}.footer p{font-size:13px}.footer .article-mini{padding:7px 0;border-bottom:1px solid #173746}.copyright{text-align:center;border-top:1px solid #173746;margin-top:30px;padding-top:18px;font-size:12px}.floating{position:fixed;left:18px;bottom:22px;z-index:90;display:flex;flex-direction:column;gap:11px}.floating a{width:58px;height:58px;border-radius:50%;display:grid;place-items:center;color:#fff;box-shadow:0 10px 28px rgba(0,0,0,.38);animation:pulse 2.2s infinite;border:2px solid rgba(255,255,255,.8)}.floating svg{width:30px;height:30px}.floating .wa{background:#25d366}.floating .call{background:#139fdd;animation-delay:.7s}.mobilebar{display:none}@keyframes float{50%{transform:translateY(-10px)}}@keyframes pulse{0%,100%{box-shadow:0 0 0 0 rgba(34,211,238,.45),0 10px 28px rgba(0,0,0,.38)}50%{box-shadow:0 0 0 12px rgba(34,211,238,0),0 10px 28px rgba(0,0,0,.38)}}@media(max-width:1040px){.links{display:none}.brand-logo{width:300px}.hero-grid,.layout{grid-template-columns:1fr}.grid{grid-template-columns:repeat(2,1fr)}.side{position:static}.foot-grid{grid-template-columns:1fr 1fr}}@media(max-width:640px){body{padding-bottom:76px}.top{font-size:12px}.nav{min-height:74px}.brand-logo{width:255px;height:62px}.header>.wrap>.btn{display:none}.hero{padding:52px 0}.hero h1{font-size:2.2rem;text-align:center}.hero .eyebrow,.hero p{text-align:center}.hero .actions{justify-content:center}.hero .actions .btn{flex:1 1 45%;padding:10px 8px;font-size:13px}.hero .actions .outline{flex-basis:100%}.hero-media{margin-top:18px}.grid,.foot-grid{grid-template-columns:1fr}.section{padding:52px 0}.prose{padding:22px}.cta{display:block;text-align:center}.cta .actions{justify-content:center}.floating{left:12px;bottom:88px}.floating a{width:52px;height:52px}.mobilebar{display:grid;grid-template-columns:repeat(5,1fr);position:fixed;right:0;left:0;bottom:0;z-index:85;background:rgba(4,23,37,.98);color:#fff;border-top:1px solid #28566a;padding:8px 3px 5px;box-shadow:0 -8px 25px rgba(0,0,0,.25)}.mobilebar a{text-align:center;font-size:10px;color:#e8f6f9}.mobilebar svg{display:block;width:23px;height:23px;margin:0 auto 3px}.mobilebar .wa-nav{color:#6df099}.footer{padding-bottom:125px}.footer-logo{margin-inline:auto}.footer h3,.footer p,.footer a{text-align:center}.article-mini{text-align:center}}
`; }

function head(page, faqs=[]) {
  return `<!doctype html><html lang="ar" dir="rtl"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1,viewport-fit=cover"><title>${esc(page.seoTitle || page.title)}</title><meta name="description" content="${esc(page.description.slice(0,160))}"><meta name="robots" content="index,follow,max-image-preview:large"><link rel="canonical" href="${SITE}${page.path}"><meta property="og:locale" content="ar_SA"><meta property="og:type" content="website"><meta property="og:title" content="${esc(page.title)}"><meta property="og:description" content="${esc(page.description.slice(0,190))}"><meta property="og:image" content="${HERO_IMAGE}"><meta name="theme-color" content="#041725"><style>${css()}</style><script type="application/ld+json">${schema(page, faqs)}</script></head>`;
}

function header() {
  return `<body><div class="top">بيع وتوريد وتنفيذ في الرياض • طوارئ كهرباء وسباكة 24/7 • ${PHONE}</div><header class="header"><div class="wrap nav"><a class="brand" href="/">${logo()}</a><nav class="links"><a href="/">الرئيسية</a><a href="/products/">المنتجات</a><a href="/services/">الخدمات</a><a href="/areas/riyadh/">أحياء الرياض</a><a href="/blog/">المدونة</a><a href="/about/">من نحن</a></nav><a class="btn gold" href="tel:${PHONE}">${icon('phone')} اتصل الآن</a></div></header>`;
}

function footer() {
  const latest = articles.slice(-5).reverse();
  return `<section class="section"><div class="wrap cta"><div><h2>أرسل احتياجك الآن</h2><p>اذكر المنتج أو الخدمة والحي ونوع المبنى والكمية أو تفاصيل العطل.</p></div><div class="actions"><a class="btn gold" href="tel:${PHONE}">${icon('phone')} اتصال مباشر</a><a class="btn cyan" target="_blank" rel="noopener" href="https://wa.me/${WA}?text=${encodeURIComponent('السلام عليكم، أرغب بطلب عرض سعر')}">${icon('whatsapp')} واتساب</a></div></div></section><footer class="footer"><div class="wrap foot-grid"><div><div class="footer-logo">${logo()}</div><p>متجر مواد بناء ومستلزمات سباكة وكهرباء ومواد جبسية وإنارة حديثة، مع خدمات التأسيس والتشطيب والصيانة والطوارئ في الرياض.</p><p>${ADDRESS}<br><a href="tel:${PHONE}">${PHONE}</a></p></div><div><h3>عناصر التنقل</h3><a href="/">الرئيسية</a><a href="/products/">المنتجات</a><a href="/services/">الخدمات</a><a href="/areas/riyadh/">نطاق الخدمة</a><a href="/about/">من نحن</a><a href="/contact/">تواصل معنا</a></div><div><h3>الخدمات</h3>${services.slice(0,6).map(x=>`<a href="/services/${x.slug}/">${esc(x.title)}</a>`).join('')}</div><div><h3>أحدث المقالات</h3>${latest.map(x=>`<a class="article-mini" href="/blog/${x.slug}/">${esc(x.title)}</a>`).join('')}</div></div><div class="wrap copyright">© 2026 مكتب عبدالله عبدالرحمن الشمراني للتجارة — جميع الحقوق محفوظة.</div></footer><div class="floating"><a class="wa" href="https://wa.me/${WA}" target="_blank" rel="noopener" aria-label="واتساب">${icon('whatsapp')}</a><a class="call" href="tel:${PHONE}" aria-label="اتصال">${icon('phone')}</a></div><nav class="mobilebar" aria-label="التنقل السفلي"><a href="/">${icon('home')}الرئيسية</a><a href="/products/">${icon('grid')}المنتجات</a><a href="/services/">${icon('tools')}الخدمات</a><a class="wa-nav" href="https://wa.me/${WA}">${icon('whatsapp')}واتساب</a><a href="tel:${PHONE}">${icon('phone')}اتصال</a></nav></body></html>`;
}

function cards(list, base) {
  return list.map(x=>`<article class="card"><div class="service-icon">${icon(x.icon)}</div><h3>${esc(x.title)}</h3><p>${esc(x.description.slice(0,245))}...</p><a class="more" href="/${base}/${x.slug}/">عرض التفاصيل ←</a></article>`).join('');
}

function faqHtml(faqs) { return `<div class="faq">${faqs.map(([q,a])=>`<details><summary>${esc(q)}</summary><p>${esc(a)}</p></details>`).join('')}</div>`; }

function homePage() {
  const page = {path:'/', title:'مواد بناء وسباكة وكهرباء وديكورات بالرياض', seoTitle:'مكتب عبدالله الشمراني للتجارة | مواد بناء وسباكة وكهرباء بالرياض', description:'متجر مواد بناء ومستلزمات سباكة وكهرباء ومواد جبسية وديكورات وإنارة حديثة في ظهرة لبن، مع خدمات التأسيس والتشطيب والصيانة والطوارئ 24/7.'};
  const faqs = faq('المنتجات والخدمات');
  return head(page,faqs)+header()+`<main><section class="hero"><div class="wrap hero-grid"><div><div class="eyebrow">متجر وخدمات تنفيذ متكاملة في الرياض</div><h1>كل احتياجات البناء والسباكة والكهرباء تحت سقف واحد</h1><p>منتجات مختارة للمشروعات والمنازل، مع خدمات التأسيس والتشطيب والصيانة وتغطية جميع أحياء الرياض.</p><div class="actions"><a class="btn gold" href="tel:${PHONE}">${icon('phone')} اتصل الآن</a><a class="btn cyan" href="https://wa.me/${WA}">${icon('whatsapp')} اطلب عبر واتساب</a><a class="btn outline" href="/contact/">${icon('map')} زيارة المتجر</a></div></div><div class="hero-media"><img src="${HERO_IMAGE}" alt="متجر مواد بناء وسباكة وكهرباء وديكورات في الرياض" width="900" height="620" fetchpriority="high"><div class="hero-badge">مواد بناء • سباكة • كهرباء • إنارة</div></div></div></section><section class="section"><div class="wrap"><div class="title"><span>أقسام المتجر</span><h2>منتجات تخدم كل مراحل المشروع</h2><p>اختيارات منظمة من مواد البناء والسباكة والكهرباء والديكور والإنارة.</p></div><div class="grid">${cards(products,'products')}</div></div></section><section class="section dark"><div class="wrap"><div class="title"><span>التنفيذ والصيانة</span><h2>خدمات من التأسيس حتى الطوارئ</h2><p>حلول السباكة والكهرباء والإنارة والترميم للفلل والمنازل.</p></div><div class="grid">${cards(services,'services')}</div></div></section><section class="section"><div class="wrap"><div class="title"><span>نطاق البيع والخدمة</span><h2>نخدم جميع أحياء الرياض</h2></div><div class="areas">${areas.slice(0,48).map(x=>`<span class="tag">${esc(x)}</span>`).join('')}</div></div></section><section class="section"><div class="wrap"><div class="title"><span>الأسئلة الشائعة</span><h2>معلومات قبل الشراء أو التنفيذ</h2></div>${faqHtml(faqs)}</div></section></main>`+footer();
}

function listingPage(type) {
  const isProducts = type==='products', list = isProducts?products:services;
  const page = {path:`/${type}/`,title:isProducts?'منتجات متجر عبدالله الشمراني':'خدمات التأسيس والتشطيب والصيانة',seoTitle:isProducts?'مواد بناء وسباكة وكهرباء وإنارة بالرياض':'خدمات سباكة وكهرباء وصيانة بالرياض',description:isProducts?'تصفح أقسام مواد البناء والمواد الجبسية والأدوات الصحية ومستلزمات الكهرباء والإنارة الحديثة في الرياض.':'تصفح خدمات تأسيس وتشطيب وصيانة السباكة والكهرباء وتركيب الإنارة وترميم الواجهات والطوارئ في الرياض.'};
  const faqs=faq(page.title);
  return head(page,faqs)+header()+`<main><section class="page-hero"><div class="wrap"><div class="crumb"><a href="/">الرئيسية</a> / ${page.title}</div><h1>${page.title}</h1><p>${page.description}</p></div></section><section class="section"><div class="wrap"><div class="grid">${cards(list,type)}</div></div></section><section class="section"><div class="wrap"><div class="title"><h2>الأسئلة الشائعة</h2></div>${faqHtml(faqs)}</div></section></main>`+footer();
}

function detailPage(item,type) {
  const page={path:`/${type}/${item.slug}/`,title:item.title,seoTitle:`${item.title} في الرياض | مكتب عبدالله الشمراني`,description:item.description};
  const faqs=faq(item.title);
  const sections=(item.sections||[]).map(([h,p])=>`<h2>${esc(h)}</h2><p>${esc(p)}</p>`).join('');
  return head(page,faqs)+header()+`<main><section class="page-hero"><div class="wrap"><div class="crumb"><a href="/">الرئيسية</a> / <a href="/${type}/">${type==='products'?'المنتجات':'الخدمات'}</a> / ${esc(item.title)}</div><h1>${esc(item.title)}</h1><p>${esc(item.description.slice(0,330))}</p></div></section><section class="section"><div class="wrap layout"><article class="prose"><div class="service-icon">${icon(item.icon)}</div><h2>حل متكامل يخدم احتياجك</h2><p>${esc(item.description)}</p>${sections}<h2>الأسئلة الشائعة</h2>${faqHtml(faqs)}</article><aside class="side"><div class="box"><div class="service-icon">${icon(item.icon)}</div><h3>اطلب ${esc(item.title)}</h3><p>أرسل الحي والتفاصيل والصور أو الكمية المطلوبة.</p><a class="btn cyan" href="https://wa.me/${WA}?text=${encodeURIComponent('السلام عليكم، أرغب بالاستفسار عن '+item.title)}">${icon('whatsapp')} واتساب</a></div><div class="box"><h3>العنوان</h3><p>${ADDRESS}</p><a class="btn gold" href="tel:${PHONE}">${icon('phone')} اتصل الآن</a></div></aside></div></section></main>`+footer();
}

function blogPage() {
  const page={path:'/blog/',title:'مدونة مواد البناء والسباكة والكهرباء',seoTitle:'مدونة مواد البناء والسباكة والكهرباء في الرياض',description:'مقالات وأدلة عملية عن اختيار مواد البناء ومستلزمات السباكة والكهرباء والإنارة وتأسيس الفلل والصيانة والترميم.'};
  return head(page)+header()+`<main><section class="page-hero"><div class="wrap"><div class="crumb"><a href="/">الرئيسية</a> / المدونة</div><h1>${page.title}</h1><p>${page.description}</p></div></section><section class="section"><div class="wrap grid">${articles.map(a=>`<article class="card"><div class="service-icon">${icon('blog')}</div><h3>${esc(a.title)}</h3><p>${esc(a.summary)}</p><a class="more" href="/blog/${a.slug}/">قراءة المقال ←</a></article>`).join('')}</div></section></main>`+footer();
}

function articlePage(article) {
  const page={path:`/blog/${article.slug}/`,title:article.title,seoTitle:`${article.title} | دليل شامل`,description:article.summary};
  const faqs=faq(article.title);
  return head(page,faqs)+header()+`<main><section class="page-hero"><div class="wrap"><div class="crumb"><a href="/">الرئيسية</a> / <a href="/blog/">المدونة</a> / ${esc(article.title)}</div><h1>${esc(article.title)}</h1><p>${esc(article.summary)}</p></div></section><section class="section"><div class="wrap layout"><article class="prose"><p>${esc(article.summary)} يساعد هذا المحتوى أصحاب المنازل والفلل والمقاولين على اتخاذ قرار أوضح، وتقليل الأخطاء التي تظهر عند الشراء أو التنفيذ دون تخطيط.</p>${article.points.map((p,i)=>`<h2>${i+1}. ${esc(p)}</h2><p>${esc(p)} ويُفضّل توثيق المقاسات والكميات والصور قبل الشراء أو بدء العمل، ثم مراجعة التوافق بين المواد والخطوات التالية في المشروع. التخطيط بهذه الطريقة يقلل الهدر ويمنح الفريق صورة أوضح عن المطلوب.</p>`).join('')}<h2>أسئلة شائعة</h2>${faqHtml(faqs)}</article><aside class="side"><div class="box"><h3>تحتاج مساعدة؟</h3><p>أرسل احتياجك وصور الموقع عبر واتساب.</p><a class="btn cyan" href="https://wa.me/${WA}">${icon('whatsapp')} واتساب</a></div></aside></div></section></main>`+footer();
}

function infoPage(kind) {
  const map = {
    about:['من نحن','مكتب عبدالله عبدالرحمن الشمراني للتجارة متجر محلي في ظهرة لبن بالرياض يوفر مواد البناء ومستلزمات السباكة والكهرباء والمواد الجبسية والإنارة، ويجمع بين البيع وخدمات التأسيس والتشطيب والصيانة.','نعمل على تسهيل تجهيز المشروع من جهة واحدة، ونساعد العميل على اختيار المنتج أو الخدمة وفق الاستخدام والكمية والميزانية، مع تغطية واسعة لأحياء مدينة الرياض.'],
    contact:['تواصل معنا','تواصل مع متجر عبدالله الشمراني لطلب المنتجات أو خدمات السباكة والكهرباء والإنارة والترميم في الرياض.','يمكنك الاتصال أو إرسال تفاصيل الطلب والعنوان والصور عبر واتساب، أو زيارة المتجر في ظهرة لبن.'],
    privacy:['سياسة الخصوصية','نوضح في هذه الصفحة طريقة التعامل مع بيانات التواصل التي يرسلها العميل عند الاستفسار أو طلب الخدمة.','لا يطلب الموقع إنشاء حساب، ولا يتم بيع بيانات العملاء. قد تُستخدم معلومات الاتصال والرسائل للرد على الطلب وتنسيق الخدمة فقط.'],
    terms:['شروط الاستخدام','تنظم هذه الشروط استخدام الموقع وطلب المنتجات والخدمات والمعلومات المعروضة.','المحتوى للتعريف بالخدمات والمنتجات، ويُعتمد السعر والتوفر والموعد ونطاق التنفيذ بعد التواصل ومراجعة تفاصيل الطلب أو المعاينة عند الحاجة.']
  };
  const [title,description,body]=map[kind];
  const page={path:`/${kind}/`,title,seoTitle:`${title} | مكتب عبدالله الشمراني للتجارة`,description};
  const mapHtml=kind==='contact'?`<h2>موقع المتجر</h2><div class="map"><iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d226.66938039017683!2d46.536286512582855!3d24.633675167665153!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3e2f1f000c77d361%3A0xd0e187b64140faed!2z2KfZhNmF2YjYp9ivINio2YbYp9ihINin2YTYr9uM2qnZiNix2KfYqiDYp9mE2KzYqNiz24zbgw!5e0!3m2!1sar!2ssa!4v1785669659007!5m2!1sar!2ssa" loading="lazy" allowfullscreen referrerpolicy="strict-origin-when-cross-origin"></iframe></div>`:'';
  return head(page)+header()+`<main><section class="page-hero"><div class="wrap"><div class="crumb"><a href="/">الرئيسية</a> / ${title}</div><h1>${title}</h1><p>${description}</p></div></section><section class="section"><div class="wrap prose"><h2>${title}</h2><p>${body}</p><p>العنوان: ${ADDRESS}. رقم الاتصال والواتساب: ${PHONE}.</p>${mapHtml}</div></section></main>`+footer();
}

function areasPage() {
  const page={path:'/areas/riyadh/',title:'أحياء الرياض التي يشملها البيع والخدمة',seoTitle:'مواد بناء وسباكة وكهرباء في جميع أحياء الرياض',description:'نطاق بيع وتوريد مواد البناء والسباكة والكهرباء والإنارة وخدمات التأسيس والتشطيب والصيانة في جميع أحياء الرياض.'};
  const faqs=faq('البيع والخدمة في أحياء الرياض');
  return head(page,faqs)+header()+`<main><section class="page-hero"><div class="wrap"><div class="crumb"><a href="/">الرئيسية</a> / أحياء الرياض</div><h1>${page.title}</h1><p>${page.description}</p></div></section><section class="section"><div class="wrap"><div class="areas">${areas.map(a=>`<span class="tag">${esc(a)}</span>`).join('')}</div><div class="prose" style="margin-top:28px"><h2>خدمة محلية تبدأ من ظهرة لبن</h2><p>يقع المتجر في ظهرة لبن، ونخدم طلبات المنتجات والتوريد والتنفيذ في أحياء غرب وشمال وشرق ووسط وجنوب الرياض. يختلف وقت التوصيل أو الوصول حسب موقع العميل وحجم الطلب وطبيعة العمل.</p><h2>الأسئلة الشائعة</h2>${faqHtml(faqs)}</div></div></section></main>`+footer();
}

function sitemap() {
  const urls=['/','/products/','/services/','/blog/','/areas/riyadh/','/about/','/contact/','/privacy/','/terms/',...products.map(x=>`/products/${x.slug}/`),...services.map(x=>`/services/${x.slug}/`),...articles.map(x=>`/blog/${x.slug}/`)];
  return `<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${urls.map((u,i)=>`<url><loc>${SITE}${u}</loc><changefreq>${u.includes('/blog/')?'monthly':'weekly'}</changefreq><priority>${i===0?'1.0':'0.8'}</priority></url>`).join('')}</urlset>`;
}

module.exports = (req,res) => {
  res.setHeader('Cache-Control','no-store, no-cache, must-revalidate, proxy-revalidate, max-age=0');
  res.setHeader('CDN-Cache-Control','no-store');
  res.setHeader('Vercel-CDN-Cache-Control','no-store');
  res.setHeader('Pragma','no-cache');
  const path=(new URL(req.url,'https://x.local')).pathname.replace(/\/{2,}/g,'/');
  if(path==='/robots.txt'){res.setHeader('Content-Type','text/plain; charset=utf-8');return res.end(`User-agent: *\nAllow: /\nSitemap: ${SITE}/sitemap.xml\n`)}
  if(path==='/sitemap.xml'){res.setHeader('Content-Type','application/xml; charset=utf-8');return res.end(sitemap())}
  let html;
  if(path==='/') html=homePage();
  else if(path==='/products/'||path==='/products') html=listingPage('products');
  else if(path==='/services/'||path==='/services') html=listingPage('services');
  else if(path==='/blog/'||path==='/blog') html=blogPage();
  else if(path==='/areas/riyadh/'||path==='/areas/riyadh') html=areasPage();
  else if(/^\/(about|contact|privacy|terms)\/?$/.test(path)) html=infoPage(path.split('/')[1]);
  else if(path.startsWith('/products/')){const x=itemBy(products,path.split('/')[2]); if(x) html=detailPage(x,'products')}
  else if(path.startsWith('/services/')){const x=itemBy(services,path.split('/')[2]); if(x) html=detailPage(x,'services')}
  else if(path.startsWith('/blog/')){const x=itemBy(articles,path.split('/')[2]); if(x) html=articlePage(x)}
  if(!html){res.statusCode=404; const page={path, title:'الصفحة غير موجودة',description:'تعذر العثور على الصفحة المطلوبة.'}; html=head(page)+header()+`<main><section class="page-hero"><div class="wrap"><h1>404</h1><p>الصفحة المطلوبة غير موجودة.</p><a class="btn gold" href="/">العودة للرئيسية</a></div></section></main>`+footer()}
  res.setHeader('Content-Type','text/html; charset=utf-8');res.end(html);
};
