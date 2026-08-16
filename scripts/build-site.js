'use strict';

const fs = require('node:fs');
const path = require('node:path');
const { business, categories, homeFaqs, assistantFaqs, certificates } = require('../content/site');
const services = require('../content/services');
const posts = require('../content/posts');

const projectRoot = path.resolve(__dirname, '..');
const distRoot = path.join(projectRoot, 'dist');
const generatedRoutes = [];

function escapeHtml(value) {
  return String(value ?? '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

function escapeXml(value) {
  return escapeHtml(value);
}

function absoluteUrl(resourcePath) {
  if (/^https?:\/\//.test(resourcePath)) return resourcePath;
  return business.siteUrl + (resourcePath.startsWith('/') ? resourcePath : '/' + resourcePath);
}

function icon(name, className) {
  const paths = {
    phone: '<path d="M6.7 10.9a15.2 15.2 0 0 0 6.4 6.4l2.2-2.2c.3-.3.7-.4 1.1-.2 1 .4 2.2.6 3.4.6.6 0 1 .4 1 1V20c0 .6-.4 1-1 1C10.5 21 3 13.5 3 4.2c0-.6.4-1 1-1h3.5c.6 0 1 .4 1 1 0 1.2.2 2.3.6 3.4.1.4 0 .8-.3 1.1z" fill="currentColor"/>',
    whatsapp: '<path d="M12.1 2a9.8 9.8 0 0 0-8.5 14.7L2 22l5.4-1.4A9.9 9.9 0 1 0 12.1 2Zm0 17.7c-1.6 0-3.1-.4-4.4-1.2l-.3-.2-3.2.8.9-3.1-.2-.3a7.8 7.8 0 1 1 7.2 4Zm4.3-5.8c-.2-.1-1.5-.7-1.7-.8-.2-.1-.4-.1-.6.1l-.7.9c-.1.2-.3.2-.5.1-1.4-.7-2.3-1.2-3.2-2.8-.2-.4.2-.4.7-1.3.1-.2 0-.3 0-.5l-.8-1.9c-.2-.5-.4-.4-.6-.4h-.5c-.2 0-.5.1-.7.3-.3.3-1 1-1 2.4s1 2.7 1.2 3c.1.2 2 3 4.8 4.2 1.8.8 2.6.8 3.5.7.6-.1 1.5-.6 1.7-1.2.2-.6.2-1.1.2-1.2-.1-.1-.3-.2-.6-.3Z" fill="currentColor"/>',
    map: '<path d="M12 21s7-6.2 7-12A7 7 0 1 0 5 9c0 5.8 7 12 7 12Z" fill="none" stroke="currentColor" stroke-width="1.8"/><circle cx="12" cy="9" r="2.3" fill="none" stroke="currentColor" stroke-width="1.8"/>',
    clock: '<circle cx="12" cy="12" r="9" fill="none" stroke="currentColor" stroke-width="1.8"/><path d="M12 7v5l3.5 2" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/>',
    building: '<path d="M5 21V7l7-4 7 4v14M9 10h2M13 10h2M9 14h2M13 14h2M10 21v-3h4v3" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/>',
    finish: '<path d="M4 20h16M6 20V9l6-5 6 5v11M9 12h6M9 15h6" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/><path d="m18 4 .7 1.8L21 6.5l-2.3.8L18 9l-.7-1.7-2.3-.8 2.3-.7z" fill="currentColor"/>',
    mep: '<path d="M4 8h8v4H8v8M12 6h4v4h4v8h-6v-4h-4" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linejoin="round"/><path d="m15 2-3 5h3l-2 5 5-6h-3l2-4z" fill="currentColor"/>',
    supply: '<path d="M3 8 12 3l9 5-9 5zM3 8v9l9 5 9-5V8M12 13v9" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linejoin="round"/>',
    key: '<circle cx="8" cy="15" r="4" fill="none" stroke="currentColor" stroke-width="1.8"/><path d="m11 12 8-8 2 2-2 2 1.5 1.5-2 2L17 10l-3 3" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/>',
    facade: '<path d="M4 21h16M6 21V7h12v14M9 10h2v3H9zM13 10h2v3h-2zM9 16h6" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linejoin="round"/><path d="M3 7h18L17 3H7z" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linejoin="round"/>',
    ceiling: '<path d="M3 5h18M5 8h14M7 8v7h10V8M9 18h6M12 15v5" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/><circle cx="8" cy="12" r="1" fill="currentColor"/><circle cx="16" cy="12" r="1" fill="currentColor"/>',
    paint: '<path d="M5 4h10v6H5zM15 7h3a2 2 0 0 1 2 2v2a2 2 0 0 1-2 2h-6v3M12 16v5" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/>',
    tiles: '<path d="M4 4h7v7H4zM13 4h7v7h-7zM4 13h7v7H4zM13 13h7v7h-7z" fill="none" stroke="currentColor" stroke-width="1.6"/>',
    maintenance: '<path d="m14.6 6.4 3-3a4.8 4.8 0 0 1-6.3 6.3L5 16l3 3 6.3-6.3a4.8 4.8 0 0 1 6.3-6.3l-3 3z" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linejoin="round"/>',
    electric: '<path d="m13.5 2-8 11h6L10.5 22l8-12h-6z" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linejoin="round"/>',
    plumbing: '<path d="M4 14h9v-3a4 4 0 0 1 4-4h3M8 14v3M18 7V4h-3" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round"/><path d="M18 12c0 1.8-2 3.6-2 3.6S14 13.8 14 12a2 2 0 1 1 4 0Z" fill="currentColor"/>',
    check: '<path d="m5 12 4 4L19 6" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"/>',
    shield: '<path d="M12 3 5 6v5c0 4.7 2.8 8.2 7 10 4.2-1.8 7-5.3 7-10V6z" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linejoin="round"/><path d="m9 12 2 2 4-5" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/>',
    certificate: '<path d="M7 3h10a2 2 0 0 1 2 2v14H5V5a2 2 0 0 1 2-2Z" fill="none" stroke="currentColor" stroke-width="1.8"/><path d="M8 8h8M8 12h5M9 19v3l3-2 3 2v-3" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/>',
    quality: '<circle cx="12" cy="12" r="8" fill="none" stroke="currentColor" stroke-width="1.8"/><path d="m8.5 12 2.2 2.2 4.8-5" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round"/>',
    team: '<circle cx="9" cy="8" r="3" fill="none" stroke="currentColor" stroke-width="1.8"/><circle cx="17" cy="9" r="2.4" fill="none" stroke="currentColor" stroke-width="1.8"/><path d="M3 20c.4-4 2.3-6 6-6s5.6 2 6 6M15 14.5c3.5.2 5.4 2 5.8 5.5" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/>',
    calendar: '<rect x="3" y="5" width="18" height="16" rx="2" fill="none" stroke="currentColor" stroke-width="1.8"/><path d="M7 3v4M17 3v4M3 10h18" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/>',
    blog: '<path d="M5 3h11a3 3 0 0 1 3 3v15H8a3 3 0 0 1-3-3z" fill="none" stroke="currentColor" stroke-width="1.8"/><path d="M8 7h8M8 11h8M8 15h5" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/>',
    arrow: '<path d="M19 12H5m6-6-6 6 6 6" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round"/>',
    chevron: '<path d="m7 9 5 5 5-5" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round"/>',
    document: '<path d="M6 3h8l4 4v14H6z" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linejoin="round"/><path d="M14 3v5h5M9 12h6M9 16h6" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/>'
  };
  const body = paths[name] || paths.building;
  const classes = className ? ' class="' + escapeHtml(className) + '"' : '';
  return '<svg' + classes + ' viewBox="0 0 24 24" aria-hidden="true" focusable="false" xmlns="http://www.w3.org/2000/svg">' + body + '</svg>';
}

function brandMarkup() {
  return '<a class="site-brand" href="/" aria-label="الرئيسية — ' + escapeHtml(business.name) + '">' +
    '<span class="site-brand-mark"><img src="' + business.logo + '" alt="" width="55" height="55" decoding="async"></span>' +
    '<span class="site-brand-copy"><strong>' + escapeHtml(business.name.replace(' للتجارة والمقاولات', '')) + '</strong><small>للتجارة والمقاولات</small></span>' +
    '</a>';
}

function whatsappLink(message) {
  return 'https://wa.me/' + business.whatsapp + '?text=' + encodeURIComponent(message);
}

function currentAttribute(pathname, section) {
  const active = section === '/'
    ? pathname === '/'
    : pathname === section || pathname.startsWith(section);
  return active ? ' aria-current="page"' : '';
}

function header(pathname) {
  const megaGroups = categories.map(function (category) {
    const links = category.serviceSlugs.map(function (slug) {
      const service = services.find(function (item) { return item.slug === slug; });
      return service ? '<a href="/services/' + service.slug + '/">' + escapeHtml(service.shortTitle) + '</a>' : '';
    }).join('');
    return '<div class="site-mega-group"><strong>' + escapeHtml(category.title) + '</strong>' + links + '</div>';
  }).join('');

  return '<div class="site-topbar"><div class="container site-topbar-inner">' +
    '<div class="site-topbar-group"><span>' + icon('map') + escapeHtml(business.address) + '</span></div>' +
    '<div class="site-topbar-group"><span>' + icon('clock') + escapeHtml(business.hoursLabel) + '</span><a href="tel:' + business.phoneInternational + '">' + icon('phone') + escapeHtml(business.phoneDisplay) + '</a></div>' +
    '</div></div>' +
    '<header class="site-header"><div class="container site-header-inner">' +
    brandMarkup() +
    '<nav class="site-nav" id="site-navigation" data-navigation aria-label="التنقل الرئيسي"><ul class="site-nav-list">' +
    '<li><a class="site-nav-link" href="/"' + currentAttribute(pathname, '/') + '>الرئيسية</a></li>' +
    '<li class="site-services-item"><button class="site-services-toggle" type="button" data-services-toggle aria-expanded="false" aria-controls="services-mega-menu">خدماتنا ' + icon('chevron') + '</button>' +
    '<div class="site-mega-menu" id="services-mega-menu" data-services-menu><div class="site-mega-grid">' + megaGroups + '</div><a class="button button-secondary button-small site-mega-cta" href="/services/">عرض كل الخدمات</a></div></li>' +
    '<li><a class="site-nav-link" href="/about/"' + currentAttribute(pathname, '/about/') + '>من نحن</a></li>' +
    '<li><a class="site-nav-link" href="/certificates/"' + currentAttribute(pathname, '/certificates/') + '>الشهادات</a></li>' +
    '<li><a class="site-nav-link" href="/blog/"' + currentAttribute(pathname, '/blog/') + '>المدونة</a></li>' +
    '<li><a class="site-nav-link" href="/contact/"' + currentAttribute(pathname, '/contact/') + '>تواصل معنا</a></li>' +
    '</ul></nav>' +
    '<a class="button button-whatsapp button-small site-header-cta" href="' + whatsappLink('السلام عليكم، أرغب في الاستفسار عن خدمات المقاولات.') + '" target="_blank" rel="noopener noreferrer">' + icon('whatsapp') + ' واتساب</a>' +
    '<button class="site-menu-button" type="button" data-menu-button aria-expanded="false" aria-label="فتح القائمة" aria-controls="site-navigation"><span></span><span></span><span></span></button>' +
    '</div></header>';
}

function footer() {
  const serviceLinks = services.slice(0, 6).map(function (service) {
    return '<a href="/services/' + service.slug + '/">' + escapeHtml(service.shortTitle) + '</a>';
  }).join('');
  const postLinks = posts.slice(0, 4).map(function (post) {
    return '<a href="/blog/' + post.slug + '/">' + escapeHtml(post.title) + '</a>';
  }).join('');

  return '<footer class="site-footer"><div class="container">' +
    '<div class="footer-grid">' +
    '<div class="footer-brand">' + brandMarkup() + '<p>' + escapeHtml(business.description) + '</p></div>' +
    '<div><h2>خدمات رئيسية</h2><div class="footer-links">' + serviceLinks + '<a href="/services/">جميع الخدمات</a></div></div>' +
    '<div><h2>روابط مهمة</h2><div class="footer-links"><a href="/about/">من نحن</a><a href="/certificates/">الشهادات والوثائق</a><a href="/blog/">المدونة</a><a href="/contact/">تواصل معنا</a><a href="/privacy/">سياسة الخصوصية</a></div></div>' +
    '<div><h2>بيانات النشاط</h2><div class="footer-data"><span><strong>الهاتف:</strong> <a href="tel:' + business.phoneInternational + '">' + business.phoneDisplay + '</a></span><span><strong>الرقم الوطني الموحد:</strong> ' + business.nationalUnifiedNumber + '</span><span><strong>عضوية المقاولين:</strong> ' + business.contractorsMembership + '</span><span><strong>العنوان:</strong> ' + escapeHtml(business.address) + '</span><span><strong>الدوام:</strong> ' + escapeHtml(business.hoursLabel) + '</span></div></div>' +
    '</div>' +
    '<div class="developer-credit"><span>Developed by</span><a href="https://eslam-elshikh.com" target="_blank" rel="noopener noreferrer">Eslam Elshikh</a></div>' +
    '<div class="footer-bottom"><span>جميع الحقوق محفوظة © 2026 ' + escapeHtml(business.name) + '</span><span>مقاولات عامة • تشطيبات • صيانة • توريد مواد</span></div>' +
    '</div></footer>';
}

function floatingActions() {
  return '<div class="floating-actions" role="group" aria-label="تواصل سريع">' +
    '<a class="floating-action floating-action-whatsapp" href="' + whatsappLink('السلام عليكم، لدي استفسار عن خدمات المكتب.') + '" target="_blank" rel="noopener noreferrer" aria-label="تواصل عبر واتساب">' + icon('whatsapp') + '</a>' +
    '<a class="floating-action floating-action-call" href="tel:' + business.phoneInternational + '" aria-label="اتصال مباشر">' + icon('phone') + '</a>' +
    '</div>';
}

function robotSvg() {
  return '<svg class="ai-assistant-robot" viewBox="0 0 64 64" aria-hidden="true" xmlns="http://www.w3.org/2000/svg">' +
    '<defs><linearGradient id="ai-assistant-robot-body" x1="12" y1="14" x2="52" y2="54"><stop stop-color="#ffd785"/><stop offset="1" stop-color="#d98b16"/></linearGradient></defs>' +
    '<path d="M32 6v8" stroke="#ffd785" stroke-width="3" stroke-linecap="round"/><circle cx="32" cy="6" r="3.5" fill="#fff"/>' +
    '<rect x="10" y="14" width="44" height="40" rx="15" fill="url(#ai-assistant-robot-body)"/><rect x="15" y="19" width="34" height="29" rx="11" fill="#f8fbfd"/>' +
    '<path d="M15 29h34v8H15z" fill="#e6edf3"/><circle cx="25" cy="32" r="4" fill="#0a2035"/><circle cx="39" cy="32" r="4" fill="#0a2035"/>' +
    '<circle cx="23.8" cy="30.8" r="1.1" fill="#fff"/><circle cx="37.8" cy="30.8" r="1.1" fill="#fff"/><path d="M24 41c2.2 2 5 3 8 3s5.8-1 8-3" fill="none" stroke="#155989" stroke-width="2.7" stroke-linecap="round"/>' +
    '<path d="M10 28H7a3 3 0 0 0-3 3v4a3 3 0 0 0 3 3h3M54 28h3a3 3 0 0 1 3 3v4a3 3 0 0 1-3 3h-3" fill="none" stroke="#efa92f" stroke-width="3" stroke-linecap="round"/></svg>';
}

function assistantMarkup() {
  const questions = assistantFaqs.map(function (item, index) {
    const answerId = 'ai-assistant-answer-' + (index + 1);
    return '<div class="ai-assistant-item">' +
      '<button class="ai-assistant-question" type="button" aria-expanded="false" aria-controls="' + answerId + '">' + escapeHtml(item.question) + '</button>' +
      '<div class="ai-assistant-answer" id="' + answerId + '" hidden>' + escapeHtml(item.answer) + '</div>' +
      '</div>';
  }).join('');

  return '<div class="ai-assistant-root" data-whatsapp="' + business.whatsapp + '">' +
    '<div class="ai-assistant-launcher-wrap"><span class="ai-assistant-bubble">محتاج مساعدة لتشطيب أو بناء بيتك؟</span>' +
    '<button class="ai-assistant-launcher" type="button" aria-label="فتح مساعد المقاولات" aria-expanded="false" aria-controls="ai-assistant-panel">' + robotSvg() + '</button></div>' +
    '<div class="ai-assistant-overlay" hidden></div>' +
    '<aside class="ai-assistant-panel" id="ai-assistant-panel" role="dialog" aria-modal="true" aria-labelledby="ai-assistant-title" hidden>' +
    '<div class="ai-assistant-header"><span class="ai-assistant-avatar">' + robotSvg() + '</span><div class="ai-assistant-title"><strong id="ai-assistant-title">مساعد المقاولات الذكي</strong><small>إجابات سريعة وتواصل مباشر</small></div><button class="ai-assistant-close" type="button" aria-label="إغلاق المساعد">×</button></div>' +
    '<div class="ai-assistant-body"><div class="ai-assistant-welcome">أهلًا بك. اختر سؤالًا عن البناء أو التشطيب أو التوريد، أو اكتب تفاصيل مشروعك لإرسالها مباشرة عبر واتساب.</div><div class="ai-assistant-questions">' + questions + '</div></div>' +
    '<form class="ai-assistant-form"><textarea class="ai-assistant-message" rows="2" maxlength="1500" placeholder="اكتب نوع المشروع، الحي، المساحة وطلبك..." aria-label="تفاصيل طلبك" required></textarea><button class="ai-assistant-send" type="submit">إرسال عبر واتساب</button><p class="ai-assistant-error" role="alert" hidden></p></form>' +
    '</aside></div>';
}

function localBusinessSchema() {
  const offerItems = services.map(function (service) {
    return {
      '@type': 'Offer',
      itemOffered: {
        '@type': 'Service',
        name: service.shortTitle,
        url: absoluteUrl('/services/' + service.slug + '/')
      }
    };
  });
  const credentials = certificates.slice(0, 4).map(function (certificate) {
    return {
      '@type': 'EducationalOccupationalCredential',
      name: certificate.title,
      credentialCategory: certificate.subtitle,
      identifier: certificate.registrationNumber,
      image: absoluteUrl(certificate.original)
    };
  });
  return {
    '@type': 'HomeAndConstructionBusiness',
    '@id': business.siteUrl + '/#business',
    name: business.name,
    legalName: business.name,
    alternateName: business.englishName,
    description: business.description,
    url: business.siteUrl + '/',
    telephone: business.phoneInternational,
    logo: {
      '@type': 'ImageObject',
      url: absoluteUrl(business.logo),
      width: 512,
      height: 512
    },
    image: [absoluteUrl(business.heroImage)],
    hasMap: business.mapEmbedUrl,
    contactPoint: {
      '@type': 'ContactPoint',
      telephone: business.phoneInternational,
      contactType: 'customer service',
      availableLanguage: ['Arabic'],
      hoursAvailable: {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: ['Saturday', 'Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday'],
        opens: business.opens,
        closes: business.closes
      }
    },
    address: {
      '@type': 'PostalAddress',
      streetAddress: business.streetAddress,
      addressLocality: business.locality,
      addressRegion: business.region,
      postalCode: business.postalCode,
      addressCountry: business.country
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: business.latitude,
      longitude: business.longitude
    },
    openingHoursSpecification: {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: ['Saturday', 'Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday'],
      opens: business.opens,
      closes: business.closes
    },
    areaServed: {
      '@type': 'City',
      name: 'الرياض'
    },
    identifier: [
      { '@type': 'PropertyValue', propertyID: 'الرقم الوطني الموحد', value: business.nationalUnifiedNumber },
      { '@type': 'PropertyValue', propertyID: 'عضوية الهيئة السعودية للمقاولين', value: business.contractorsMembership },
      { '@type': 'PropertyValue', propertyID: 'رقم رخصة النشاط التجاري', value: business.municipalLicense }
    ],
    hasCredential: credentials,
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: 'خدمات المقاولات والتوريد',
      itemListElement: offerItems
    },
    knowsAbout: ['المقاولات العامة', 'بناء العظم', 'التشطيبات الداخلية', 'الترميم', 'الكهرباء', 'السباكة', 'توريد مواد البناء']
  };
}

function schemaGraph(page, extraNodes, faqs, breadcrumbs) {
  const webSite = {
    '@type': 'WebSite',
    '@id': business.siteUrl + '/#website',
    url: business.siteUrl + '/',
    name: business.name,
    inLanguage: 'ar-SA',
    publisher: { '@id': business.siteUrl + '/#business' }
  };
  const webPage = {
    '@type': page.schemaType || 'WebPage',
    '@id': absoluteUrl(page.path) + '#webpage',
    url: absoluteUrl(page.path),
    name: page.title,
    description: page.description,
    inLanguage: 'ar-SA',
    isPartOf: { '@id': business.siteUrl + '/#website' },
    about: { '@id': business.siteUrl + '/#business' },
    primaryImageOfPage: { '@type': 'ImageObject', url: absoluteUrl(page.image || business.heroImage) }
  };
  const crumbItems = (breadcrumbs || []).map(function (crumb, index) {
    return {
      '@type': 'ListItem',
      position: index + 1,
      name: crumb.name,
      item: absoluteUrl(crumb.path)
    };
  });
  const graph = [localBusinessSchema(), webSite, webPage];
  if (crumbItems.length > 1) {
    graph.push({
      '@type': 'BreadcrumbList',
      '@id': absoluteUrl(page.path) + '#breadcrumb',
      itemListElement: crumbItems
    });
  }
  if (Array.isArray(faqs) && faqs.length) {
    graph.push({
      '@type': 'FAQPage',
      '@id': absoluteUrl(page.path) + '#faq',
      mainEntity: faqs.map(function (item) {
        return {
          '@type': 'Question',
          name: item.question,
          acceptedAnswer: { '@type': 'Answer', text: item.answer }
        };
      })
    });
  }
  (extraNodes || []).forEach(function (node) { graph.push(node); });
  return JSON.stringify({ '@context': 'https://schema.org', '@graph': graph }).replace(/</g, '\\u003c');
}

function documentHead(page, schemaJson) {
  const canonical = absoluteUrl(page.path);
  const image = absoluteUrl(page.image || business.heroImage);
  const robots = page.noindex ? 'noindex,follow' : 'index,follow,max-image-preview:large,max-snippet:-1,max-video-preview:-1';
  const articleMeta = page.ogType === 'article'
    ? '<meta property="article:published_time" content="' + escapeHtml(page.datePublished || '') + '"><meta property="article:modified_time" content="' + escapeHtml(page.dateModified || '') + '">'
    : '';
  const heroPreload = page.preloadHero
    ? '<link rel="preload" href="' + business.heroWebp + '" as="image" type="image/webp" fetchpriority="high">'
    : '';

  return '<!DOCTYPE html><html lang="ar" dir="rtl"><head>' +
    '<meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1,viewport-fit=cover">' +
    '<title>' + escapeHtml(page.title) + '</title><meta name="description" content="' + escapeHtml(page.description) + '">' +
    '<meta name="robots" content="' + robots + '"><link rel="canonical" href="' + canonical + '"><link rel="alternate" hreflang="ar-SA" href="' + canonical + '">' +
    '<meta name="theme-color" content="#061421"><meta name="color-scheme" content="light">' +
    '<meta property="og:locale" content="ar_SA"><meta property="og:site_name" content="' + escapeHtml(business.name) + '"><meta property="og:type" content="' + escapeHtml(page.ogType || 'website') + '">' +
    '<meta property="og:title" content="' + escapeHtml(page.title) + '"><meta property="og:description" content="' + escapeHtml(page.description) + '"><meta property="og:url" content="' + canonical + '"><meta property="og:image" content="' + image + '"><meta property="og:image:alt" content="' + escapeHtml(page.imageAlt || 'واجهة مقر ' + business.name) + '">' +
    '<meta name="twitter:card" content="summary_large_image"><meta name="twitter:title" content="' + escapeHtml(page.title) + '"><meta name="twitter:description" content="' + escapeHtml(page.description) + '"><meta name="twitter:image" content="' + image + '">' +
    articleMeta +
    '<link rel="icon" href="/assets/images/logo.svg" type="image/svg+xml"><link rel="manifest" href="/site.webmanifest"><link rel="alternate" type="application/rss+xml" title="مدونة ' + escapeHtml(business.shortName) + '" href="/feed.xml">' +
    '<link rel="preload" href="/assets/fonts/tajawal-400.woff2" as="font" type="font/woff2" crossorigin><link rel="preload" href="/assets/fonts/noto-kufi-arabic-700.woff2" as="font" type="font/woff2" crossorigin>' + heroPreload +
    '<link rel="stylesheet" href="/assets/css/styles.css"><script type="application/ld+json">' + schemaJson + '</script>' +
    '<script src="/assets/js/main.js" defer></script><script src="/assets/js/assistant.js" defer></script></head>';
}

function pageDocument(page, content, options) {
  const settings = options || {};
  const schemaJson = schemaGraph(page, settings.extraNodes, settings.faqs, settings.breadcrumbs);
  return documentHead(page, schemaJson) + '<body><a class="skip-link" href="#main-content">تجاوز إلى المحتوى</a>' +
    header(page.path) + content + footer() + floatingActions() + assistantMarkup() +
    (settings.includeCertificateDialog ? certificateDialog() : '') + '</body></html>';
}

function breadcrumbsMarkup(items) {
  return '<nav class="breadcrumbs" aria-label="مسار التنقل">' + items.map(function (item, index) {
    const separator = index ? '<span aria-hidden="true">/</span>' : '';
    const content = index === items.length - 1
      ? '<span aria-current="page">' + escapeHtml(item.name) + '</span>'
      : '<a href="' + item.path + '">' + escapeHtml(item.name) + '</a>';
    return separator + content;
  }).join('') + '</nav>';
}

function pageHero(title, description, breadcrumbs, badges) {
  const badgeMarkup = (badges || []).length
    ? '<div class="page-hero-badges">' + badges.map(function (badge) { return '<span>' + escapeHtml(badge) + '</span>'; }).join('') + '</div>'
    : '';
  return '<section class="page-hero"><div class="container">' + breadcrumbsMarkup(breadcrumbs) +
    '<h1>' + escapeHtml(title) + '</h1><p>' + escapeHtml(description) + '</p>' + badgeMarkup + '</div></section>';
}

function sectionHeading(kicker, title, description) {
  return '<div class="section-heading"><span class="section-kicker">' + escapeHtml(kicker) + '</span><h2>' + escapeHtml(title) + '</h2>' +
    (description ? '<p>' + escapeHtml(description) + '</p>' : '') + '</div>';
}

function faqMarkup(faqs) {
  return '<div class="faq-list">' + faqs.map(function (item) {
    return '<details class="faq-item"><summary>' + escapeHtml(item.question) + '</summary><div class="faq-answer">' + escapeHtml(item.answer) + '</div></details>';
  }).join('') + '</div>';
}

function categoryCard(category) {
  const links = category.serviceSlugs.map(function (slug) {
    const service = services.find(function (item) { return item.slug === slug; });
    return service ? '<a href="/services/' + service.slug + '/">' + escapeHtml(service.shortTitle) + '</a>' : '';
  }).join('');
  return '<article class="category-card"><span class="category-icon">' + icon(category.icon) + '</span><h3>' + escapeHtml(category.title) + '</h3><p>' + escapeHtml(category.description) + '</p><div class="category-links">' + links + '</div></article>';
}

function serviceCard(service, index) {
  return '<article class="service-card"><div class="service-card-top"><span class="service-card-icon">' + icon(service.icon) + '</span><span class="service-card-number">' + String(index + 1).padStart(2, '0') + '</span></div>' +
    '<h3>' + escapeHtml(service.shortTitle) + '</h3><p>' + escapeHtml(service.summary) + '</p><a class="card-link" href="/services/' + service.slug + '/">تفاصيل الخدمة ' + icon('arrow') + '</a></article>';
}

function blogCard(post) {
  return '<article class="blog-card"><div class="blog-card-art">' + icon('blog') + '</div><div class="blog-card-content">' +
    '<div class="blog-meta"><span>' + escapeHtml(post.category) + '</span><span>•</span><time datetime="' + post.datePublished + '">' + post.datePublished + '</time></div>' +
    '<h3>' + escapeHtml(post.title) + '</h3><p>' + escapeHtml(post.summary) + '</p><a class="card-link" href="/blog/' + post.slug + '/">اقرأ المقال ' + icon('arrow') + '</a></div></article>';
}

function certificateCard(certificate) {
  const meta = [
    certificate.registrationNumber ? 'رقم: ' + certificate.registrationNumber : '',
    certificate.validUntil ? 'سارية حتى: ' + certificate.validUntil : '',
    certificate.status || ''
  ].filter(Boolean).map(function (item) { return '<span>' + escapeHtml(item) + '</span>'; }).join('');
  return '<article class="certificate-card"><button class="certificate-preview" type="button" data-certificate-src="' + certificate.original + '" data-certificate-title="' + escapeHtml(certificate.title) + '" aria-label="عرض ' + escapeHtml(certificate.title) + ' بحجم كامل">' +
    '<img src="' + certificate.thumb + '" alt="' + escapeHtml(certificate.title + ' — ' + certificate.subtitle) + '" width="' + certificate.width + '" height="' + certificate.height + '" loading="lazy" decoding="async"></button>' +
    '<div class="certificate-content"><h3>' + escapeHtml(certificate.title) + '</h3><p>' + escapeHtml(certificate.subtitle) + '</p><p>' + escapeHtml(certificate.description) + '</p><div class="certificate-meta">' + meta + '</div>' +
    '<a class="certificate-link" href="' + certificate.original + '" target="_blank" rel="noopener">فتح الوثيقة الأصلية ←</a></div></article>';
}

function certificateDialog() {
  return '<dialog class="certificate-dialog" data-certificate-dialog><div class="certificate-dialog-head"><strong data-certificate-dialog-title>وثيقة النشاط</strong><button class="certificate-dialog-close" type="button" data-certificate-dialog-close aria-label="إغلاق">×</button></div><div class="certificate-dialog-body"><img src="' + business.logo + '" width="512" height="512" data-certificate-dialog-image alt=""></div></dialog>';
}

function contactMapSection(kicker, title) {
  return '<section class="section section-soft" id="location"><div class="container">' +
    sectionHeading(kicker || 'موقعنا في الرياض', title || 'زورنا أو أرسل تفاصيل مشروعك', 'مقر النشاط في ظهرة لبن، ويمكن تنسيق المعاينة والتوريد في أحياء الرياض خلال ساعات العمل.') +
    '<div class="map-contact-grid"><div class="map-frame"><iframe src="' + business.mapEmbedUrl + '" title="موقع ' + escapeHtml(business.name) + ' في ظهرة لبن بالرياض" width="600" height="450" allowfullscreen loading="lazy" referrerpolicy="strict-origin-when-cross-origin"></iframe></div>' +
    '<aside class="contact-panel" aria-label="بيانات موقع النشاط والتواصل"><h2>بيانات التواصل</h2><p>أرسل نوع الخدمة والحي والمساحة وصور الموقع للحصول على تقييم أولي وتنسيق الموعد.</p><div class="contact-list">' +
    '<div class="contact-item">' + icon('phone') + '<div><strong>الهاتف والواتساب</strong><a href="tel:' + business.phoneInternational + '">' + business.phoneDisplay + '</a></div></div>' +
    '<div class="contact-item">' + icon('map') + '<div><strong>العنوان</strong><span>' + escapeHtml(business.address) + '</span></div></div>' +
    '<div class="contact-item">' + icon('clock') + '<div><strong>ساعات العمل</strong><span>' + escapeHtml(business.hoursLabel) + '<br>الجمعة: مغلق</span></div></div>' +
    '<div class="contact-item">' + icon('document') + '<div><strong>بيانات رسمية</strong><span>الرقم الوطني الموحد: ' + business.nationalUnifiedNumber + '<br>عضوية المقاولين: ' + business.contractorsMembership + '</span></div></div>' +
    '</div><div class="contact-actions"><a class="button button-whatsapp" href="' + whatsappLink('السلام عليكم، أرغب في طلب معاينة أو عرض سعر. الموقع/الحي: ') + '" target="_blank" rel="noopener noreferrer">' + icon('whatsapp') + ' أرسل طلبك عبر واتساب</a><a class="button button-ghost" href="tel:' + business.phoneInternational + '">' + icon('phone') + ' اتصال&#160;مباشر</a></div></aside></div>' +
    '</div></section>';
}

function ctaBand(title, description) {
  return '<section class="section-tight"><div class="container"><div class="cta-band"><div class="cta-band-grid"><div><h2>' + escapeHtml(title) + '</h2><p>' + escapeHtml(description) + '</p></div>' +
    '<div class="cta-band-actions"><a class="button button-primary" href="tel:' + business.phoneInternational + '">' + icon('phone') + ' اتصل&#160;الآن</a><a class="button button-whatsapp" href="' + whatsappLink('السلام عليكم، أرغب في الاستفسار وطلب عرض سعر.') + '" target="_blank" rel="noopener noreferrer">' + icon('whatsapp') + ' واتساب</a></div></div></div></div></section>';
}

function homePage() {
  const page = {
    path: '/',
    title: 'مكتب عبدالله عبدالرحمن الشمراني للتجارة والمقاولات | الرياض',
    description: 'مقاولات عامة في الرياض تشمل بناء العظم والتسليم مفتاح والتشطيبات والترميم والكهرباء والسباكة وتوريد مواد البناء من مكتب عبدالله الشمراني.',
    preloadHero: true,
    image: business.heroImage,
    imageAlt: 'واجهة محل مواد البناء والديكورات الجبسية التابع للمكتب في ظهرة لبن بالرياض'
  };
  const categoryCards = categories.map(categoryCard).join('');
  let runningIndex = 0;
  const serviceGroups = categories.map(function (category) {
    const groupServices = category.serviceSlugs.map(function (slug) {
      return services.find(function (service) { return service.slug === slug; });
    }).filter(Boolean);
    const cards = groupServices.map(function (service) {
      const card = serviceCard(service, runningIndex);
      runningIndex += 1;
      return card;
    }).join('');
    return '<div class="service-group" id="' + category.id + '"><div class="service-group-head"><div><h3>' + escapeHtml(category.title) + '</h3><p>' + escapeHtml(category.description) + '</p></div><a class="card-link" href="/services/#' + category.id + '">عرض القسم ' + icon('arrow') + '</a></div><div class="service-grid">' + cards + '</div></div>';
  }).join('');
  const certificateCards = certificates.map(certificateCard).join('');
  const latestPosts = posts.slice(0, 6).map(blogCard).join('');
  const breadcrumbs = [{ name: 'الرئيسية', path: '/' }];
  const itemListNode = {
    '@type': 'ItemList',
    '@id': business.siteUrl + '/#services',
    name: 'خدمات المكتب',
    itemListElement: services.map(function (service, index) {
      return {
        '@type': 'ListItem',
        position: index + 1,
        name: service.shortTitle,
        url: absoluteUrl('/services/' + service.slug + '/')
      };
    })
  };

  const content = '<main id="main-content">' +
    '<section class="hero"><div class="container hero-grid"><div class="hero-copy"><span class="hero-kicker">مقاولات وتوريد من جهة واحدة في الرياض</span>' +
    '<h1>' + escapeHtml(business.name.replace(' للتجارة والمقاولات', '')) + ' <span>للتجارة والمقاولات</span></h1>' +
    '<p class="hero-lead">نبني ونرمم ونشطب ونصون، ونوفر مواد البناء والكهرباء والسباكة بخطة واضحة تخدم الفلل والمنازل والمشروعات في الرياض من المعاينة حتى التسليم.</p>' +
    '<div class="hero-actions"><a class="button button-primary" href="tel:' + business.phoneInternational + '">' + icon('phone') + ' اتصل:&#160;' + business.phoneDisplay + '</a><a class="button button-whatsapp" href="' + whatsappLink('السلام عليكم، أرغب في الاستفسار عن خدمات المقاولات.') + '" target="_blank" rel="noopener noreferrer">' + icon('whatsapp') + ' تواصل واتساب</a><a class="button button-ghost" href="/services/">استكشف الخدمات</a></div>' +
    '<ul class="hero-points"><li>' + icon('check') + ' نطاق عمل وبنود واضحة</li><li>' + icon('check') + ' تنسيق التنفيذ والتوريد</li><li>' + icon('check') + ' شهادات ووثائق معروضة</li><li>' + icon('check') + ' خدمة داخل مدينة الرياض</li></ul></div>' +
    '<div class="hero-media"><picture><source srcset="' + business.heroWebp + '" type="image/webp"><img src="' + business.heroImage + '" alt="' + escapeHtml(page.imageAlt) + '" width="577" height="640" fetchpriority="high" decoding="async"></picture><div class="hero-media-caption"><strong>صورة المحل الفعلية</strong>شارع تبوك، حي ظهرة لبن، الرياض 13784</div></div></div></section>' +
    '<section class="trust-ribbon" aria-label="بيانات الثقة"><div class="container trust-ribbon-grid">' +
    '<div class="trust-ribbon-item"><span class="trust-ribbon-icon">' + icon('certificate') + '</span><div><strong>عضوية الهيئة السعودية للمقاولين</strong><span>رقم ' + business.contractorsMembership + '</span></div></div>' +
    '<div class="trust-ribbon-item"><span class="trust-ribbon-icon">' + icon('quality') + '</span><div><strong>شهادات نظم الإدارة</strong><span>ISO 9001 • 14001 • 45001</span></div></div>' +
    '<div class="trust-ribbon-item"><span class="trust-ribbon-icon">' + icon('document') + '</span><div><strong>بيانات نشاط ظاهرة</strong><span>الرقم الموحد ' + business.nationalUnifiedNumber + '</span></div></div>' +
    '<div class="trust-ribbon-item"><span class="trust-ribbon-icon">' + icon('clock') + '</span><div><strong>ساعات عمل ممتدة</strong><span>السبت–الخميس 4:30 ص–8:00 م</span></div></div>' +
    '</div></section>' +
    '<section class="section"><div class="container">' + sectionHeading('حلول متكاملة', 'أربعة أقسام تغطي دورة المشروع', 'من الإنشاء والتشطيب إلى الصيانة وتوريد المواد، مع صفحات مستقلة لكل خدمة وتفاصيل تساعدك على اتخاذ قرار واضح.') + '<div class="category-grid">' + categoryCards + '</div></div></section>' +
    '<section class="section section-soft section-grid-bg" id="services"><div class="container">' + sectionHeading('خدماتنا', 'اثنتا عشرة خدمة متخصصة', 'اختر الخدمة المناسبة للاطلاع على نطاقها ومراحلها والأسئلة الشائعة قبل طلب المعاينة.') + serviceGroups + '</div></section>' +
    '<section class="section section-dark"><div class="container">' + sectionHeading('لماذا نحن؟', 'إدارة عملية للمقاولات والتوريد', 'نركز على وضوح القرار وتنسيق التخصصات وحماية المراحل المنفذة بدل التعامل مع كل بند بمعزل عن بقية المشروع.') +
    '<div class="feature-grid"><article class="feature-card"><span class="feature-icon">' + icon('document') + '</span><h3>نطاق موثق</h3><p>تحديد البنود والكميات والاستثناءات ومسؤولية التوريد قبل التنفيذ.</p></article><article class="feature-card"><span class="feature-icon">' + icon('team') + '</span><h3>تنسيق التخصصات</h3><p>ربط العظم والكهرباء والسباكة والجبس والأرضيات في تسلسل واحد.</p></article><article class="feature-card"><span class="feature-icon">' + icon('quality') + '</span><h3>نقاط فحص مرحلية</h3><p>مراجعة الأعمال المخفية واختبارها قبل الإغلاق والانتقال للتشطيب.</p></article><article class="feature-card"><span class="feature-icon">' + icon('supply') + '</span><h3>توريد منظم</h3><p>جدولة المواد وفق تقدم المشروع لتقليل التخزين والهدر والتوقف.</p></article></div></div></section>' +
    '<section class="section"><div class="container">' + sectionHeading('طريقة العمل', 'أربع خطوات من الطلب إلى التسليم', 'مسار بسيط وواضح يساعد على جمع المعلومات واعتماد النطاق ومتابعة التنفيذ.') +
    '<div class="process-grid"><article class="process-card"><h3>طلب ومعاينة</h3><p>إرسال الموقع والمخطط والصور ثم تحديد الحاجة إلى زيارة ميدانية.</p></article><article class="process-card"><h3>نطاق وعرض</h3><p>تحديد البنود والمواد والمدة والدفعات والاستثناءات بصورة مكتوبة.</p></article><article class="process-card"><h3>تنفيذ ومتابعة</h3><p>ترتيب الفرق والتوريد ونقاط الفحص وتوثيق التغييرات قبل العمل.</p></article><article class="process-card"><h3>استلام وملاحظات</h3><p>فحص النطاق المنفذ وتسجيل الملاحظات وإغلاقها ثم التسليم.</p></article></div></div></section>' +
    '<section class="section section-soft" id="certificates"><div class="container"><div class="certificate-intro"><div class="certificate-intro-card"><span class="section-kicker">الثقة والشفافية</span><h2>الشهادات والوثائق الرسمية</h2><p>نعرض المستندات التي أرفقها صاحب النشاط كما هي، مع إمكانية فتح النسخة الأصلية وقراءة الرقم والتاريخ والنطاق من مصدر الوثيقة نفسها.</p><a class="button button-primary" href="/certificates/">صفحة الشهادات</a></div><div class="certificate-facts"><div class="certificate-fact"><strong>الرقم الوطني الموحد</strong><span>' + business.nationalUnifiedNumber + '</span></div><div class="certificate-fact"><strong>عضوية المقاولين</strong><span>' + business.contractorsMembership + '</span></div><div class="certificate-fact"><strong>رخصة النشاط</strong><span>' + business.municipalLicense + '</span></div><div class="certificate-fact"><strong>المقر</strong><span>ظهرة لبن، الرياض 13784</span></div></div></div><div class="certificate-grid">' + certificateCards + '</div></div></section>' +
    '<section class="section"><div class="container">' + sectionHeading('مركز المعرفة', 'أدلة عملية للبناء والتشطيب والصيانة', 'مقالات تساعد أصحاب المشروعات على فهم البنود والمواد والمراحل قبل التعاقد أو التنفيذ.') + '<div class="blog-grid">' + latestPosts + '</div><div class="blog-index-cta"><a class="button button-secondary" href="/blog/">كل المقالات ' + icon('arrow') + '</a></div></div></section>' +
    '<section class="section section-soft"><div class="container">' + sectionHeading('الأسئلة الشائعة', 'معلومات مهمة قبل طلب الخدمة', 'إجابات مباشرة عن التسعير والمعاينة والنطاق والتوريد وساعات العمل.') + faqMarkup(homeFaqs) + '</div></section>' +
    contactMapSection('موقع النشاط', 'الخريطة والعنوان وبيانات التواصل') +
    '</main>';

  return pageDocument(page, content, {
    extraNodes: [itemListNode],
    faqs: homeFaqs,
    breadcrumbs: breadcrumbs,
    includeCertificateDialog: true
  });
}

function servicesIndexPage() {
  const page = {
    path: '/services/',
    title: 'خدمات المقاولات والتشطيبات والتوريد في الرياض | مكتب عبدالله الشمراني',
    description: 'استعرض خدمات بناء العظم والتسليم مفتاح والترميم والتشطيبات والكهرباء والسباكة وتوريد المواد في الرياض، مع صفحة تفصيلية لكل خدمة.',
    schemaType: 'CollectionPage'
  };
  let index = 0;
  const groups = categories.map(function (category) {
    const cards = category.serviceSlugs.map(function (slug) {
      const service = services.find(function (item) { return item.slug === slug; });
      if (!service) return '';
      const result = serviceCard(service, index);
      index += 1;
      return result;
    }).join('');
    return '<section class="service-group" id="' + category.id + '"><div class="service-group-head"><div><h2>' + escapeHtml(category.title) + '</h2><p>' + escapeHtml(category.description) + '</p></div></div><div class="service-grid">' + cards + '</div></section>';
  }).join('');
  const crumbs = [{ name: 'الرئيسية', path: '/' }, { name: 'الخدمات', path: '/services/' }];
  const serviceList = {
    '@type': 'ItemList',
    '@id': absoluteUrl(page.path) + '#list',
    itemListElement: services.map(function (service, position) {
      return { '@type': 'ListItem', position: position + 1, name: service.shortTitle, url: absoluteUrl('/services/' + service.slug + '/') };
    })
  };
  const content = '<main id="main-content">' + pageHero('خدمات المقاولات والتشطيبات والتوريد', 'اثنتا عشرة صفحة خدمة متخصصة تغطي الإنشاء والتشطيب والصيانة والتوريد في الرياض، مع نطاق ومراحل وأسئلة شائعة لكل خدمة.', crumbs, ['الرياض', 'مقاولات عامة', 'تشطيبات وصيانة', 'توريد مواد']) +
    '<section class="section"><div class="container">' + groups + '</div></section>' +
    ctaBand('مشروعك يحتاج أكثر من خدمة؟', 'أرسل المخطط أو صور الموقع لنرتب نطاقًا يجمع الأعمال المترابطة دون تعارض.') + '</main>';
  return pageDocument(page, content, { extraNodes: [serviceList], breadcrumbs: crumbs });
}

function renderServiceSection(section) {
  const paragraphs = (section.paragraphs || []).map(function (paragraph) { return '<p>' + escapeHtml(paragraph) + '</p>'; }).join('');
  const subheading = section.subheading ? '<h3>' + escapeHtml(section.subheading) + '</h3>' : '';
  const bullets = (section.bullets || []).length ? '<ul>' + section.bullets.map(function (bullet) { return '<li>' + escapeHtml(bullet) + '</li>'; }).join('') + '</ul>' : '';
  return '<h2>' + escapeHtml(section.heading) + '</h2>' + paragraphs + subheading + bullets;
}

function serviceDetailPage(service) {
  const pathName = '/services/' + service.slug + '/';
  const page = {
    path: pathName,
    title: service.seoTitle,
    description: service.metaDescription
  };
  const category = categories.find(function (item) { return item.id === service.categoryId; });
  const related = services.filter(function (item) { return item.categoryId === service.categoryId && item.slug !== service.slug; }).slice(0, 3);
  const intro = service.intro.map(function (paragraph, index) { return '<p' + (index === 0 ? ' class="lead"' : '') + '>' + escapeHtml(paragraph) + '</p>'; }).join('');
  const sectionsMarkup = service.sections.map(renderServiceSection).join('');
  const relatedLinks = related.map(function (item) { return '<li><a href="/services/' + item.slug + '/">' + escapeHtml(item.shortTitle) + '</a></li>'; }).join('');
  const relatedCards = related.map(function (item, index) { return serviceCard(item, index); }).join('');
  const crumbs = [{ name: 'الرئيسية', path: '/' }, { name: 'الخدمات', path: '/services/' }, { name: service.shortTitle, path: pathName }];
  const serviceNode = {
    '@type': 'Service',
    '@id': absoluteUrl(pathName) + '#service',
    name: service.title,
    serviceType: service.shortTitle,
    description: service.summary,
    url: absoluteUrl(pathName),
    provider: { '@id': business.siteUrl + '/#business' },
    areaServed: { '@type': 'City', name: 'الرياض' },
    availableChannel: {
      '@type': 'ServiceChannel',
      servicePhone: {
        '@type': 'ContactPoint',
        telephone: business.phoneInternational,
        contactType: 'customer service',
        availableLanguage: 'Arabic'
      }
    }
  };

  const content = '<main id="main-content">' + pageHero(service.title, service.summary, crumbs, [category.title, 'خدمة داخل الرياض', 'معاينة حسب الحاجة']) +
    '<section class="section"><div class="container content-layout"><article class="prose">' +
    '<div class="service-card-icon service-detail-icon">' + icon(service.icon) + '</div>' + intro + sectionsMarkup +
    '<h2>الأسئلة الشائعة عن ' + escapeHtml(service.shortTitle) + '</h2>' + faqMarkup(service.faqs) +
    '</article><aside class="service-sidebar" aria-label="طلب الخدمة والخدمات المرتبطة"><div class="sidebar-card sidebar-card-dark"><h2>اطلب معاينة أو عرض سعر</h2><p>أرسل الحي والمساحة والمخطط أو الصور وتفاصيل الخدمة المطلوبة.</p><div class="sidebar-actions"><a class="button button-whatsapp" href="' + whatsappLink('السلام عليكم، أرغب في الاستفسار عن خدمة: ' + service.shortTitle + '. الموقع/الحي: ') + '" target="_blank" rel="noopener noreferrer">' + icon('whatsapp') + ' واتساب</a><a class="button button-ghost" href="tel:' + business.phoneInternational + '">' + icon('phone') + '&#160;' + business.phoneDisplay + '</a></div></div>' +
    '<div class="sidebar-card"><h3>بيانات النشاط</h3><p>' + escapeHtml(business.address) + '</p><p>' + escapeHtml(business.hoursLabel) + '</p></div>' +
    (relatedLinks ? '<div class="sidebar-card"><h3>خدمات مرتبطة</h3><ul class="sidebar-list">' + relatedLinks + '</ul></div>' : '') + '</aside></div></section>' +
    (relatedCards ? '<section class="section section-soft"><div class="container">' + sectionHeading('خدمات مرتبطة', 'قد تحتاج أيضًا إلى', 'خدمات من القسم نفسه يمكن دمجها في نطاق واحد بعد المعاينة.') + '<div class="service-grid">' + relatedCards + '</div></div></section>' : '') +
    ctaBand('جاهز لمناقشة ' + service.shortTitle + '؟', 'أرسل تفاصيل الموقع والصور لنحدد الخطوة التالية ونطاق المعاينة.') + '</main>';

  return pageDocument(page, content, { extraNodes: [serviceNode], faqs: service.faqs, breadcrumbs: crumbs });
}

function blogIndexPage() {
  const page = {
    path: '/blog/',
    title: 'مدونة المقاولات والبناء والتشطيبات في السعودية | مكتب عبدالله الشمراني',
    description: 'مقالات عملية عن المقاولات وبناء العظم والتسليم مفتاح والتشطيبات والكهرباء والسباكة وتوريد مواد البناء في السعودية.',
    schemaType: 'CollectionPage'
  };
  const crumbs = [{ name: 'الرئيسية', path: '/' }, { name: 'المدونة', path: '/blog/' }];
  const blogList = {
    '@type': 'ItemList',
    '@id': absoluteUrl(page.path) + '#articles',
    itemListElement: posts.map(function (post, index) {
      return { '@type': 'ListItem', position: index + 1, name: post.title, url: absoluteUrl('/blog/' + post.slug + '/') };
    })
  };
  const content = '<main id="main-content">' + pageHero('مدونة المقاولات والبناء والتشطيبات', 'أدلة مكتوبة لأصحاب الفلل والمنازل والمشروعات تساعد على فهم التكلفة والمراحل والمواد والصيانة قبل اتخاذ القرار.', crumbs, ['السعودية', 'البناء العظم', 'التشطيبات', 'كهرباء وسباكة']) +
    '<section class="section"><div class="container"><div class="blog-grid">' + posts.map(blogCard).join('') + '</div></div></section>' +
    ctaBand('لديك مشروع وتحتاج إجابة تخص موقعك؟', 'المقالات للتوعية العامة، أما التسعير والنطاق فيحتاجان معلومات المشروع ومعاينة عند الضرورة.') + '</main>';
  return pageDocument(page, content, { extraNodes: [blogList], breadcrumbs: crumbs });
}

function articleDetailPage(post) {
  const pathName = '/blog/' + post.slug + '/';
  const page = {
    path: pathName,
    title: post.seoTitle,
    description: post.metaDescription,
    ogType: 'article',
    datePublished: post.datePublished,
    dateModified: post.dateModified,
    schemaType: 'WebPage'
  };
  const crumbs = [{ name: 'الرئيسية', path: '/' }, { name: 'المدونة', path: '/blog/' }, { name: post.title, path: pathName }];
  const intro = post.intro.map(function (paragraph, index) { return '<p' + (index === 0 ? ' class="lead"' : '') + '>' + escapeHtml(paragraph) + '</p>'; }).join('');
  const sections = post.sections.map(renderServiceSection).join('');
  const related = posts.filter(function (item) { return item.slug !== post.slug; }).slice(0, 3);
  const articleNode = {
    '@type': 'BlogPosting',
    '@id': absoluteUrl(pathName) + '#article',
    headline: post.title,
    description: post.summary,
    datePublished: post.datePublished,
    dateModified: post.dateModified,
    inLanguage: 'ar-SA',
    mainEntityOfPage: { '@id': absoluteUrl(pathName) + '#webpage' },
    author: { '@id': business.siteUrl + '/#business' },
    publisher: { '@id': business.siteUrl + '/#business' },
    image: absoluteUrl(business.heroImage),
    articleSection: post.category,
    keywords: [post.category, 'مقاولات', 'الرياض', 'السعودية']
  };
  const content = '<main id="main-content">' + pageHero(post.title, post.summary, crumbs, [post.category, post.readingTime, 'آخر تحديث: ' + post.dateModified]) +
    '<section class="section"><div class="container content-layout"><article class="prose">' + intro + sections +
    '<div class="article-conclusion"><h2>الخلاصة</h2><p>' + escapeHtml(post.conclusion) + '</p></div></article>' +
    '<aside class="service-sidebar" aria-label="معلومات المقال وطلب تقييم المشروع"><div class="sidebar-card sidebar-card-dark"><h2>تحتاج تقييمًا لمشروعك؟</h2><p>أرسل المساحة والحي والمخطط أو الصور عبر واتساب.</p><div class="sidebar-actions"><a class="button button-whatsapp" href="' + whatsappLink('السلام عليكم، قرأت مقال: ' + post.title + ' ولدي استفسار عن مشروعي.') + '" target="_blank" rel="noopener noreferrer">' + icon('whatsapp') + ' اسأل عبر واتساب</a><a class="button button-ghost" href="/services/">استعرض الخدمات</a></div></div>' +
    '<div class="sidebar-card"><h3>بيانات المقال</h3><p>التصنيف: ' + escapeHtml(post.category) + '<br>وقت القراءة: ' + escapeHtml(post.readingTime) + '<br>تاريخ النشر: ' + post.datePublished + '</p></div></aside></div></section>' +
    '<section class="section section-soft"><div class="container">' + sectionHeading('اقرأ أيضًا', 'مقالات مرتبطة', 'موضوعات أخرى تساعدك في التخطيط للمشروع والتوريد والصيانة.') + '<div class="blog-grid">' + related.map(blogCard).join('') + '</div></div></section>' +
    ctaBand('حوّل المعلومات إلى خطة تنفيذ', 'ناقش احتياج مشروعك مع فريق المكتب وحدد نطاق المعاينة والخدمات المطلوبة.') + '</main>';
  return pageDocument(page, content, { extraNodes: [articleNode], breadcrumbs: crumbs });
}

function aboutPage() {
  const page = {
    path: '/about/',
    title: 'من نحن | مكتب عبدالله عبدالرحمن الشمراني للتجارة والمقاولات',
    description: 'تعرف على مكتب عبدالله الشمراني للتجارة والمقاولات في الرياض، وخدماته وقيمه وبياناته الرسمية ونهجه في إدارة البناء والتشطيب والصيانة والتوريد.',
    schemaType: 'AboutPage'
  };
  const crumbs = [{ name: 'الرئيسية', path: '/' }, { name: 'من نحن', path: '/about/' }];
  const content = '<main id="main-content">' + pageHero('من نحن', 'مكتب سعودي في الرياض يجمع المقاولات العامة والتشطيبات والصيانة وتوريد المواد ضمن نقطة تواصل واحدة وخطة عمل واضحة.', crumbs, ['مقر فعلي في ظهرة لبن', 'عضوية مقاول', 'وثائق وشهادات معروضة']) +
    '<section class="section"><div class="container content-layout"><article class="prose"><h2>عن المكتب</h2><p class="lead">' + escapeHtml(business.name) + ' يقدم خدمات البناء العظم والتسليم مفتاح والترميم والواجهات والتشطيبات الداخلية وأعمال الكهرباء والسباكة والصيانة، إلى جانب توريد مواد البناء والمستلزمات للمشروعات داخل الرياض.</p>' +
    '<p>تقوم طريقة عملنا على جمع المعلومات قبل التسعير، وتحديد مسؤوليات التنفيذ والتوريد، وترتيب التخصصات حتى لا تتعارض الأعمال المخفية مع التشطيبات. نوضح للعميل ما يحتاج معاينة أو مخططًا أو اعتمادًا فنيًا، ونتجنب الوعود العامة التي لا يمكن قياسها.</p>' +
    '<h2>رؤيتنا</h2><p>أن يكون المكتب جهة موثوقة لأصحاب الفلل والمباني والمقاولين في الرياض، تقدم تنفيذًا وتوريدًا منظمًا، وتساعد العميل على اتخاذ قرارات أفضل في المواد والمراحل والتكلفة.</p>' +
    '<h2>رسالتنا</h2><p>إدارة أعمال المقاولات والتشطيب والصيانة وفق نطاق واضح، والاهتمام بالتنسيق والاختبارات والتوثيق قبل إغلاق المراحل، مع توفير مواد ومستلزمات تتوافق مع احتياج المشروع.</p>' +
    '<h2>قيمنا في العمل</h2><ul><li><strong>الوضوح:</strong> شرح البنود والاستثناءات وآلية التغيير قبل التنفيذ.</li><li><strong>المسؤولية:</strong> توجيه الأعمال التي تحتاج مختصًا أو اعتمادًا هندسيًا إلى مسارها الصحيح.</li><li><strong>التنسيق:</strong> ربط التخصصات والمواد بالبرنامج بدل العمل المنفصل.</li><li><strong>الشفافية:</strong> عرض بيانات النشاط والمستندات التي قدمها صاحب المكتب كما هي.</li></ul>' +
    '<h2>معلومات النشاط</h2><p>الاسم: ' + escapeHtml(business.name) + '<br>الهاتف: ' + business.phoneDisplay + '<br>العنوان: ' + escapeHtml(business.address) + '<br>ساعات العمل: ' + escapeHtml(business.hoursLabel) + '<br>الرقم الوطني الموحد: ' + business.nationalUnifiedNumber + '<br>عضوية الهيئة السعودية للمقاولين: ' + business.contractorsMembership + '<br>رخصة النشاط: ' + business.municipalLicense + '</p></article>' +
    '<aside class="service-sidebar" aria-label="وثائق النشاط والتواصل"><div class="sidebar-card sidebar-card-dark"><h2>شاهد الوثائق</h2><p>السجل التجاري ورخصة النشاط وعضوية المقاولين وشهادات ISO متاحة في صفحة مستقلة.</p><a class="button button-primary" href="/certificates/">الشهادات والوثائق</a></div><div class="sidebar-card"><h3>تواصل معنا</h3><p>' + escapeHtml(business.hoursLabel) + '</p><div class="sidebar-actions"><a class="button button-whatsapp" href="' + whatsappLink('السلام عليكم، أرغب في التعرف على خدمات المكتب.') + '" target="_blank" rel="noopener noreferrer">' + icon('whatsapp') + ' واتساب</a></div></div></aside></div></section>' +
    '<section class="section section-dark"><div class="container">' + sectionHeading('نطاق الخبرة', 'من العظم إلى التوريد', 'أقسام مترابطة تسمح بتنسيق المشروع أو اختيار خدمة مستقلة حسب الاحتياج.') + '<div class="feature-grid">' +
    categories.map(function (category) { return '<article class="feature-card"><span class="feature-icon">' + icon(category.icon) + '</span><h3>' + escapeHtml(category.title) + '</h3><p>' + escapeHtml(category.description) + '</p></article>'; }).join('') +
    '</div></div></section>' + contactMapSection('مقرنا', 'مكتبنا في ظهرة لبن بالرياض') + '</main>';
  return pageDocument(page, content, { breadcrumbs: crumbs });
}

function certificatesPage() {
  const page = {
    path: '/certificates/',
    title: 'الشهادات والوثائق | مكتب عبدالله الشمراني للتجارة والمقاولات',
    description: 'عرض السجل التجاري ورخصة النشاط وعضوية الهيئة السعودية للمقاولين وشهادات ISO المرفقة باسم مكتب عبدالله الشمراني.',
    schemaType: 'CollectionPage'
  };
  const crumbs = [{ name: 'الرئيسية', path: '/' }, { name: 'الشهادات والوثائق', path: '/certificates/' }];
  const credentialsNode = {
    '@type': 'ItemList',
    '@id': absoluteUrl(page.path) + '#credentials',
    itemListElement: certificates.map(function (certificate, index) {
      return {
        '@type': 'ListItem',
        position: index + 1,
        name: certificate.title,
        url: absoluteUrl(certificate.original)
      };
    })
  };
  const content = '<main id="main-content">' + pageHero('الشهادات والوثائق الرسمية', 'الوثائق التالية مرفقة من صاحب النشاط وتُعرض بصورتها الأصلية. افتح أي بطاقة لقراءة البيانات والنطاق والتاريخ والرقم كما وردت في الوثيقة.', crumbs, ['ISO 9001', 'ISO 14001', 'ISO 45001', 'عضوية المقاولين']) +
    '<section class="section"><div class="container"><div class="prose certificate-disclosure"><h2>الشفافية في عرض بيانات النشاط</h2><p>توحيد الاسم والهاتف والعنوان وأرقام الوثائق بين صفحات الموقع يساعد العملاء ومحركات البحث على فهم هوية النشاط. عرض الوثائق لا يعني أن الموقع جهة تحقق رسمية؛ التحقق من أي شهادة أو رخصة يتم عبر الجهة المصدرة أو رمز الاستجابة الموجود في الوثيقة.</p><div class="prose-note">لا ننشر تقييمات أو أختامًا مصطنعة، ولا نضيف إلى البيانات المنظمة ادعاءات غير ظاهرة في المحتوى. جميع الأرقام أدناه من المستندات المرفقة.</div></div><div class="certificate-grid">' + certificates.map(certificateCard).join('') + '</div></div></section>' +
    ctaBand('تحتاج نسخة أو توضيحًا عن وثيقة؟', 'تواصل مع المكتب مباشرة باستخدام الرقم الموحد الظاهر في جميع صفحات الموقع.') + '</main>';
  return pageDocument(page, content, { extraNodes: [credentialsNode], breadcrumbs: crumbs, includeCertificateDialog: true });
}

function contactPage() {
  const page = {
    path: '/contact/',
    title: 'تواصل معنا | مكتب عبدالله الشمراني للتجارة والمقاولات بالرياض',
    description: 'اتصل أو تواصل واتساب مع مكتب عبدالله الشمراني على 0569600322، أو زر المقر في شارع تبوك بحي ظهرة لبن بالرياض خلال ساعات العمل.',
    schemaType: 'ContactPage'
  };
  const crumbs = [{ name: 'الرئيسية', path: '/' }, { name: 'تواصل معنا', path: '/contact/' }];
  const content = '<main id="main-content">' + pageHero('تواصل معنا', 'أرسل تفاصيل مشروع البناء أو التشطيب أو الصيانة أو قائمة المواد، وسنراجعها خلال ساعات العمل ونوضح الخطوة التالية.', crumbs, [business.phoneDisplay, 'ظهرة لبن — الرياض', 'السبت إلى الخميس']) +
    '<section class="section"><div class="container"><div class="category-grid">' +
    '<article class="category-card"><span class="category-icon">' + icon('phone') + '</span><h3>اتصال مباشر</h3><p>للاستفسار وتنسيق المعاينة خلال ساعات العمل.</p><a class="button button-secondary" href="tel:' + business.phoneInternational + '">' + business.phoneDisplay + '</a></article>' +
    '<article class="category-card"><span class="category-icon">' + icon('whatsapp') + '</span><h3>واتساب</h3><p>أرسل الحي والمساحة والصور أو قائمة المواد.</p><a class="button button-whatsapp" href="' + whatsappLink('السلام عليكم، لدي طلب جديد. نوع الخدمة: ') + '" target="_blank" rel="noopener noreferrer">إرسال الطلب</a></article>' +
    '<article class="category-card"><span class="category-icon">' + icon('map') + '</span><h3>العنوان</h3><p>' + escapeHtml(business.address) + '</p><a class="card-link" href="#map">عرض الخريطة ' + icon('arrow') + '</a></article>' +
    '<article class="category-card"><span class="category-icon">' + icon('clock') + '</span><h3>ساعات العمل</h3><p>' + escapeHtml(business.hoursLabel) + '<br>الجمعة: مغلق</p></article>' +
    '</div></div></section><div id="map">' + contactMapSection('الوصول إلى المقر', 'الخريطة المضمنة والعنوان الفعلي') + '</div>' +
    '<section class="section"><div class="container"><div class="prose"><h2>معلومات تساعدنا على خدمتك بسرعة</h2><ul><li>نوع الخدمة المطلوبة ومرحلة المشروع الحالية.</li><li>الحي ورابط الموقع ونوع العقار.</li><li>المساحة أو الأبعاد التقريبية وعدد الأدوار.</li><li>صور واضحة أو مخططات أو قائمة مواد.</li><li>الموعد المستهدف والميزانية التقريبية إن أمكن.</li></ul><p>لا ترسل بيانات حساسة أو وثائق شخصية عبر نموذج المساعد. يكفي وصف المشروع وبيانات التواصل التي تختار مشاركتها عبر واتساب.</p></div></div></section></main>';
  return pageDocument(page, content, { breadcrumbs: crumbs });
}

function privacyPage() {
  const page = {
    path: '/privacy/',
    title: 'سياسة الخصوصية | مكتب عبدالله الشمراني للتجارة والمقاولات',
    description: 'سياسة الخصوصية للموقع وتوضيح طريقة الانتقال إلى واتساب والخريطة والروابط الخارجية دون تخزين رسائل الزوار داخل الموقع.'
  };
  const crumbs = [{ name: 'الرئيسية', path: '/' }, { name: 'سياسة الخصوصية', path: '/privacy/' }];
  const content = '<main id="main-content">' + pageHero('سياسة الخصوصية', 'نوضح هنا بصورة مختصرة كيف يعمل الموقع والمساعد وروابط التواصل الخارجية.', crumbs) +
    '<section class="section"><div class="container"><article class="prose"><h2>البيانات التي يجمعها الموقع</h2><p>الموقع ثابت ولا يحتوي على حسابات مستخدمين أو قاعدة بيانات لتخزين رسائل الزوار. عند كتابة طلب في المساعد والضغط على الإرسال، يُنشئ المتصفح رابط واتساب يحتوي على النص بعد ترميزه وينقلك إلى واتساب؛ لا تُحفظ الرسالة داخل خادم الموقع.</p>' +
    '<h2>الخدمات الخارجية</h2><p>تتضمن صفحات الموقع خريطة Google مضمّنة وروابط إلى واتساب والاتصال الهاتفي وموقع المطور. عند فتح خدمة خارجية تخضع الزيارة لسياسة تلك الخدمة وإعدادات جهازك.</p>' +
    '<h2>السجلات التقنية</h2><p>قد تحتفظ منصة الاستضافة بسجلات تقنية وأمنية أساسية مثل عنوان IP ونوع المتصفح ووقت الطلب وفق سياساتها، بهدف تشغيل الخدمة والحماية وتحليل الأعطال.</p>' +
    '<h2>الوثائق والصور</h2><p>يعرض الموقع صورًا لوثائق نشاط تجاري قدمها صاحب النشاط للنشر. لا تعِد استخدام الصور أو رموز الاستجابة خارج غرض التحقق المشروع من بيانات النشاط.</p>' +
    '<h2>التواصل</h2><p>للاستفسارات المتعلقة بالموقع أو بيانات النشاط، تواصل على الرقم ' + business.phoneDisplay + '. تاريخ آخر تحديث لهذه السياسة: 16 أغسطس 2026.</p></article></div></section></main>';
  return pageDocument(page, content, { breadcrumbs: crumbs });
}

function notFoundPage() {
  const page = {
    path: '/404/',
    title: 'الصفحة غير موجودة | مكتب عبدالله الشمراني',
    description: 'تعذر العثور على الصفحة المطلوبة.',
    noindex: true
  };
  const content = '<main id="main-content"><section class="section"><div class="container"><div class="empty-state"><h1>404</h1><h2>الصفحة المطلوبة غير موجودة</h2><p>قد يكون الرابط تغير أو كُتب بطريقة غير صحيحة.</p><a class="button button-primary" href="/">العودة للرئيسية</a></div></div></section></main>';
  return pageDocument(page, content, { breadcrumbs: [{ name: 'الرئيسية', path: '/' }, { name: '404', path: '/404/' }] });
}

function ensureDirectory(directoryPath) {
  fs.mkdirSync(directoryPath, { recursive: true });
}

function writeTextFile(filePath, content) {
  ensureDirectory(path.dirname(filePath));
  fs.writeFileSync(filePath, content, 'utf8');
}

function writeRoute(route, html, metadata) {
  const normalized = route === '/' ? '' : route.replace(/^\/|\/$/g, '');
  const outputPath = normalized ? path.join(distRoot, normalized, 'index.html') : path.join(distRoot, 'index.html');
  writeTextFile(outputPath, html);
  generatedRoutes.push(Object.assign({
    path: route,
    lastmod: '2026-08-16',
    changefreq: route === '/' ? 'weekly' : 'monthly',
    priority: route === '/' ? '1.0' : '0.7'
  }, metadata || {}));
}

function serviceMarkdown(service) {
  const lines = [];
  lines.push('# ' + service.title);
  lines.push('');
  lines.push('**عنوان SEO:** ' + service.seoTitle);
  lines.push('');
  lines.push('**Meta Description:** ' + service.metaDescription);
  lines.push('');
  service.intro.forEach(function (paragraph) {
    lines.push(paragraph);
    lines.push('');
  });
  service.sections.forEach(function (section) {
    lines.push('## ' + section.heading);
    lines.push('');
    (section.paragraphs || []).forEach(function (paragraph) {
      lines.push(paragraph);
      lines.push('');
    });
    if (section.subheading) {
      lines.push('### ' + section.subheading);
      lines.push('');
    }
    (section.bullets || []).forEach(function (bullet) {
      lines.push('- ' + bullet);
    });
    if ((section.bullets || []).length) lines.push('');
  });
  lines.push('## الأسئلة الشائعة');
  lines.push('');
  service.faqs.forEach(function (faq) {
    lines.push('### ' + faq.question);
    lines.push('');
    lines.push(faq.answer);
    lines.push('');
  });
  return lines.join('\n');
}

function postMarkdown(post) {
  const lines = [];
  lines.push('# ' + post.title);
  lines.push('');
  lines.push('**عنوان SEO:** ' + post.seoTitle);
  lines.push('');
  lines.push('**Meta Description:** ' + post.metaDescription);
  lines.push('');
  lines.push('**التصنيف:** ' + post.category);
  lines.push('');
  lines.push('**تاريخ النشر:** ' + post.datePublished);
  lines.push('');
  post.intro.forEach(function (paragraph) {
    lines.push(paragraph);
    lines.push('');
  });
  post.sections.forEach(function (section) {
    lines.push('## ' + section.heading);
    lines.push('');
    (section.paragraphs || []).forEach(function (paragraph) {
      lines.push(paragraph);
      lines.push('');
    });
    if (section.subheading) {
      lines.push('### ' + section.subheading);
      lines.push('');
    }
    (section.bullets || []).forEach(function (bullet) {
      lines.push('- ' + bullet);
    });
    if ((section.bullets || []).length) lines.push('');
  });
  lines.push('## الخلاصة');
  lines.push('');
  lines.push(post.conclusion);
  lines.push('');
  return lines.join('\n');
}

function exportMarkdownContent() {
  const lines = [];
  lines.push('# محتوى SEO — ' + business.name);
  lines.push('');
  lines.push('هذا الملف يجمع المحتوى النصي الجاهز للنسخ لصفحات الخدمات والمقالات المنشورة في الموقع.');
  lines.push('');
  lines.push('## بيانات النشاط');
  lines.push('');
  lines.push('- الاسم: ' + business.name);
  lines.push('- الهاتف والواتساب: ' + business.phoneDisplay);
  lines.push('- العنوان: ' + business.address);
  lines.push('- ساعات العمل: ' + business.hoursLabel);
  lines.push('- الرقم الوطني الموحد: ' + business.nationalUnifiedNumber);
  lines.push('- عضوية الهيئة السعودية للمقاولين: ' + business.contractorsMembership);
  lines.push('');
  lines.push('---');
  lines.push('');
  lines.push('# صفحات الخدمات');
  lines.push('');
  services.forEach(function (service) {
    lines.push(serviceMarkdown(service));
    lines.push('---');
    lines.push('');
  });
  lines.push('# مقالات المدونة');
  lines.push('');
  posts.forEach(function (post) {
    lines.push(postMarkdown(post));
    lines.push('---');
    lines.push('');
  });
  writeTextFile(path.join(projectRoot, 'content', 'seo-content.md'), lines.join('\n'));
}

function writeSitemap() {
  const urls = generatedRoutes.map(function (route) {
    return '  <url><loc>' + escapeXml(absoluteUrl(route.path)) + '</loc><lastmod>' + route.lastmod + '</lastmod><changefreq>' + route.changefreq + '</changefreq><priority>' + route.priority + '</priority></url>';
  }).join('\n');
  const sitemap = '<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n' + urls + '\n</urlset>\n';
  writeTextFile(path.join(distRoot, 'sitemap.xml'), sitemap);
}

function writeFeed() {
  const items = posts.map(function (post) {
    const url = absoluteUrl('/blog/' + post.slug + '/');
    return '<item><title>' + escapeXml(post.title) + '</title><link>' + url + '</link><guid>' + url + '</guid><pubDate>' + new Date(post.datePublished + 'T08:00:00+03:00').toUTCString() + '</pubDate><description>' + escapeXml(post.summary) + '</description></item>';
  }).join('');
  const feed = '<?xml version="1.0" encoding="UTF-8"?><rss version="2.0"><channel><title>' + escapeXml('مدونة ' + business.shortName) + '</title><link>' + business.siteUrl + '/blog/</link><description>' + escapeXml('مقالات المقاولات والبناء والتشطيبات والصيانة') + '</description><language>ar-SA</language>' + items + '</channel></rss>';
  writeTextFile(path.join(distRoot, 'feed.xml'), feed);
}

function writeStaticMetadata() {
  const robots = 'User-agent: *\nAllow: /\n\nSitemap: ' + business.siteUrl + '/sitemap.xml\n';
  writeTextFile(path.join(distRoot, 'robots.txt'), robots);
  const manifest = {
    name: business.name,
    short_name: business.shortName,
    description: business.description,
    lang: 'ar',
    dir: 'rtl',
    start_url: '/',
    display: 'standalone',
    background_color: '#f4f7fa',
    theme_color: '#061421',
    icons: [
      { src: '/assets/images/logo.svg', sizes: 'any', type: 'image/svg+xml', purpose: 'any maskable' }
    ]
  };
  writeTextFile(path.join(distRoot, 'site.webmanifest'), JSON.stringify(manifest, null, 2));
}

function build() {
  fs.rmSync(distRoot, { recursive: true, force: true });
  ensureDirectory(distRoot);
  fs.cpSync(path.join(projectRoot, 'assets'), path.join(distRoot, 'assets'), { recursive: true });

  writeRoute('/', homePage(), { changefreq: 'weekly', priority: '1.0' });
  writeRoute('/services/', servicesIndexPage(), { changefreq: 'weekly', priority: '0.9' });
  services.forEach(function (service) {
    writeRoute('/services/' + service.slug + '/', serviceDetailPage(service), { changefreq: 'monthly', priority: '0.8' });
  });
  writeRoute('/blog/', blogIndexPage(), { changefreq: 'weekly', priority: '0.8' });
  posts.forEach(function (post) {
    writeRoute('/blog/' + post.slug + '/', articleDetailPage(post), { lastmod: post.dateModified, changefreq: 'monthly', priority: '0.7' });
  });
  writeRoute('/about/', aboutPage(), { changefreq: 'monthly', priority: '0.8' });
  writeRoute('/certificates/', certificatesPage(), { changefreq: 'monthly', priority: '0.8' });
  writeRoute('/contact/', contactPage(), { changefreq: 'monthly', priority: '0.8' });
  writeRoute('/privacy/', privacyPage(), { changefreq: 'yearly', priority: '0.3' });

  writeTextFile(path.join(distRoot, '404.html'), notFoundPage());
  writeSitemap();
  writeFeed();
  writeStaticMetadata();
  exportMarkdownContent();

  process.stdout.write('Built ' + generatedRoutes.length + ' indexable routes with ' + services.length + ' services and ' + posts.length + ' articles.\n');
}

build();
