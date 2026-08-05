const ORIGIN = 'https://abdullah-alshamrani-store-4nt0emcqm-moqawel1215-3361s-projects.vercel.app';
const OLD_PHONE = '0569600322';
const OLD_WA = '966569600322';
const PHONE = '0505782716';
const WA = '966505782716';

const LIGHT_LOGO_CSS = `
.header .nav{position:relative;justify-content:center}
.header .brand{position:absolute;inset-inline-start:50%;transform:translateX(50%);justify-content:center;width:min(470px,48vw)}
.header .brand-logo{width:100%;height:74px;filter:drop-shadow(0 8px 18px rgba(0,0,0,.28))}
.header .links{margin-inline-end:auto}
.header>.wrap>.btn{margin-inline-start:auto}
.header .brand-logo text:nth-of-type(1){fill:#f8fbff}
.header .brand-logo text:nth-of-type(2){fill:#86e8f6}
.header .brand-logo text:nth-of-type(3){fill:#ffd45a}
.header .brand-logo path[stroke="#153b70"]{stroke:#8bdff0}
.header .brand-logo path[fill="#071d35"]{fill:#0b3550;stroke:#64d9eb}
.header .brand-logo path[stroke="#0b65a0"]{stroke:#e8fbff}
@media(max-width:1040px){.header .nav{justify-content:center}.header .brand{position:static;transform:none;width:min(430px,72vw);margin-inline:auto}.header .brand-logo{height:70px}}
@media(max-width:640px){.header .nav{min-height:82px;padding-block:6px}.header .brand{width:min(360px,94vw);margin-inline:auto}.header .brand-logo{width:100%;height:68px}.mobilebar{grid-template-columns:repeat(5,1fr);gap:5px;padding:7px 7px calc(7px + env(safe-area-inset-bottom));background:rgba(3,18,30,.97);border-top:1px solid rgba(116,213,233,.32);box-shadow:0 -12px 34px rgba(0,0,0,.32);backdrop-filter:blur(18px)}.mobilebar a{position:relative;min-height:58px;padding:7px 3px 5px;border-radius:15px;color:#d9edf3;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:3px;font-size:10px;font-weight:700;line-height:1.1;transition:transform .2s ease,background .2s ease,color .2s ease}.mobilebar a:active{transform:scale(.96)}.mobilebar a:hover,.mobilebar a:focus-visible{background:rgba(34,211,238,.11);color:#fff}.mobilebar svg{width:24px;height:24px;margin:0;filter:drop-shadow(0 4px 8px rgba(0,0,0,.28))}.mobilebar a:nth-child(1){color:#f9d65c}.mobilebar a:nth-child(4){color:#70f09c;background:rgba(37,211,102,.09)}.mobilebar a:nth-child(5){color:#7dd8ff;background:rgba(19,159,221,.09)}.mobilebar a:nth-child(4)::before,.mobilebar a:nth-child(5)::before{content:'';position:absolute;inset:5px;border:1px solid currentColor;border-radius:13px;opacity:.22;pointer-events:none}}
`;

function brightenLogo(html) {
  return html
    .replaceAll('fill="#12356f"','fill="#f8fbff"')
    .replaceAll('fill="#0b6f9c"','fill="#86e8f6"')
    .replaceAll('fill="#d99a00"','fill="#ffd45a"')
    .replaceAll('stroke="#153b70"','stroke="#8bdff0"')
    .replaceAll('fill="#071d35" stroke="#123f75"','fill="#0b3550" stroke="#64d9eb"')
    .replaceAll('stroke="#0b65a0"','stroke="#e8fbff"');
}

function updateContact(html) {
  return html
    .replaceAll(OLD_WA, WA)
    .replaceAll(OLD_PHONE, PHONE);
}

module.exports = async (req, res) => {
  try {
    const url = new URL(req.url, ORIGIN);
    const upstream = await fetch(url, {
      headers: {
        'user-agent': req.headers['user-agent'] || 'Mozilla/5.0',
        'accept': req.headers.accept || '*/*'
      },
      redirect: 'follow'
    });

    res.statusCode = upstream.status;
    const contentType = upstream.headers.get('content-type') || 'text/plain; charset=utf-8';
    res.setHeader('Content-Type', contentType);
    res.setHeader('Cache-Control', 'no-store, no-cache, must-revalidate, proxy-revalidate, max-age=0');
    res.setHeader('CDN-Cache-Control', 'no-store');
    res.setHeader('Vercel-CDN-Cache-Control', 'no-store');
    res.setHeader('X-Content-Type-Options', 'nosniff');
    res.setHeader('Referrer-Policy', 'strict-origin-when-cross-origin');

    if (!contentType.includes('text/html')) {
      const bytes = Buffer.from(await upstream.arrayBuffer());
      return res.end(bytes);
    }

    let html = await upstream.text();
    html = brightenLogo(html);
    html = updateContact(html);
    html = html.replace('</style>', `${LIGHT_LOGO_CSS}</style>`);
    return res.end(html);
  } catch (error) {
    res.statusCode = 502;
    res.setHeader('Content-Type', 'text/plain; charset=utf-8');
    return res.end('تعذر تحميل الموقع مؤقتًا.');
  }
};
