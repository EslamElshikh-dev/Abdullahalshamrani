const ORIGIN = 'https://abdullah-alshamrani-store-na7soaxqx-moqawel1215-3361s-projects.vercel.app';
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

const ASSISTANT_CSS = `
.ash-launcher-wrap{right:16px!important;left:auto!important;bottom:24px!important;display:flex!important;flex-direction:row!important;direction:ltr!important;align-items:center!important;gap:11px!important}
.ash-help-label{position:relative!important;order:1!important;overflow:visible!important;min-width:116px!important;padding:10px 15px!important;border:1px solid rgba(118,230,242,.48)!important;border-radius:16px!important;background:linear-gradient(145deg,rgba(5,27,42,.97),rgba(14,61,83,.96))!important;color:#f5fdff!important;font-size:11.5px!important;font-weight:900!important;line-height:1.25!important;text-align:center!important;box-shadow:0 12px 30px rgba(0,0,0,.27),inset 0 1px 0 rgba(255,255,255,.09)!important;backdrop-filter:blur(12px)!important;animation:ashBubbleFloat 4.2s ease-in-out infinite!important}
.ash-help-label::before{content:''!important;position:absolute!important;right:-6px!important;top:50%!important;width:12px!important;height:12px!important;transform:translateY(-50%) rotate(45deg)!important;background:#0d3a50!important;border-top:1px solid rgba(118,230,242,.48)!important;border-right:1px solid rgba(118,230,242,.48)!important;border-radius:2px!important}
.ash-help-label::after{content:''!important;position:absolute!important;inset:1px!important;overflow:hidden!important;border-radius:15px!important;background:linear-gradient(105deg,transparent 30%,rgba(255,255,255,.13) 50%,transparent 70%)!important;background-size:220% 100%!important;pointer-events:none!important;animation:ashBubbleShine 5.5s ease-in-out infinite!important}
.ash-launcher{order:2!important;position:relative!important;display:grid!important;place-items:center!important;width:66px!important;height:66px!important;padding:0!important;border:1px solid rgba(124,231,244,.68)!important;border-radius:22px!important;background:linear-gradient(145deg,#123f59 0%,#061d2d 66%,#03131f 100%)!important;color:#fff!important;font-size:0!important;cursor:pointer!important;box-shadow:0 16px 36px rgba(0,0,0,.38),0 0 0 5px rgba(59,214,236,.06),inset 0 1px 0 rgba(255,255,255,.14)!important;animation:ashBotFloat 4.2s ease-in-out infinite,ashBotGlow 3s ease-in-out infinite!important;transition:transform .25s ease,box-shadow .25s ease!important}
.ash-launcher::before{content:''!important;position:absolute!important;inset:-7px!important;border:1px solid rgba(92,223,241,.22)!important;border-radius:28px!important;animation:ashBotRing 3s ease-out infinite!important;pointer-events:none!important}
.ash-launcher::after{content:''!important;position:absolute!important;inset:7px!important;border-radius:16px!important;background:linear-gradient(180deg,rgba(255,255,255,.11),transparent 42%)!important;pointer-events:none!important}
.ash-launcher:hover{transform:translateY(-3px) scale(1.025)!important;box-shadow:0 20px 42px rgba(0,0,0,.42),0 0 25px rgba(66,219,239,.18),inset 0 1px 0 rgba(255,255,255,.16)!important}
.ash-launcher:focus-visible{outline:3px solid rgba(255,211,77,.75)!important;outline-offset:4px!important}
.ash-launcher .ash-bot-svg{position:relative;z-index:2;width:44px!important;height:44px!important;display:block!important;filter:drop-shadow(0 7px 10px rgba(0,0,0,.3))!important}
.ash-head-bot{display:grid!important;place-items:center!important;width:36px!important;height:36px!important;border-radius:12px!important;background:rgba(89,220,235,.1)!important;border:1px solid rgba(89,220,235,.22)!important}
.ash-head-bot .ash-bot-svg{width:28px!important;height:28px!important;display:block!important}
@keyframes ashBotFloat{0%,100%{transform:translateY(0)}50%{transform:translateY(-5px)}}
@keyframes ashBubbleFloat{0%,100%{transform:translateY(0)}50%{transform:translateY(-3px)}}
@keyframes ashBotGlow{0%,100%{box-shadow:0 16px 36px rgba(0,0,0,.38),0 0 0 5px rgba(59,214,236,.06),inset 0 1px 0 rgba(255,255,255,.14)}50%{box-shadow:0 18px 42px rgba(0,0,0,.42),0 0 24px rgba(66,219,239,.19),inset 0 1px 0 rgba(255,255,255,.16)}}
@keyframes ashBotRing{0%{opacity:.55;transform:scale(.92)}100%{opacity:0;transform:scale(1.17)}}
@keyframes ashBubbleShine{0%,65%,100%{background-position:130% 0}82%{background-position:-110% 0}}
@media(max-width:620px){.ash-launcher-wrap{right:12px!important;bottom:88px!important;gap:9px!important}.ash-launcher{width:60px!important;height:60px!important;border-radius:20px!important}.ash-launcher .ash-bot-svg{width:40px!important;height:40px!important}.ash-help-label{min-width:106px!important;padding:9px 12px!important;font-size:10.5px!important}}
@media(prefers-reduced-motion:reduce){.ash-launcher,.ash-launcher::before,.ash-help-label,.ash-help-label::after{animation:none!important;transition:none!important}}
`;

const ASSISTANT_SVG = `<svg class="ash-bot-svg" viewBox="0 0 64 64" aria-hidden="true" xmlns="http://www.w3.org/2000/svg">
  <path d="M32 6.5v7" stroke="#FFD45A" stroke-width="3.2" stroke-linecap="round"/>
  <circle cx="32" cy="6.5" r="3.5" fill="#FFD45A"/>
  <rect x="11" y="15" width="42" height="38" rx="15" fill="#82EAF4"/>
  <rect x="15" y="19" width="34" height="29" rx="11" fill="#DDFBFF"/>
  <path d="M15 29h34v8H15z" fill="#B6F3F8" opacity=".75"/>
  <circle cx="25" cy="31.5" r="4" fill="#073348"/>
  <circle cx="39" cy="31.5" r="4" fill="#073348"/>
  <circle cx="23.7" cy="30.2" r="1.15" fill="#FFF"/>
  <circle cx="37.7" cy="30.2" r="1.15" fill="#FFF"/>
  <path d="M24 41c2.2 2.1 5 3.1 8 3.1s5.8-1 8-3.1" fill="none" stroke="#0B4A62" stroke-width="2.8" stroke-linecap="round"/>
  <path d="M11 28H7.8A3.8 3.8 0 0 0 4 31.8v3.4A3.8 3.8 0 0 0 7.8 39H11M53 28h3.2a3.8 3.8 0 0 1 3.8 3.8v3.4a3.8 3.8 0 0 1-3.8 3.8H53" fill="none" stroke="#55D7E7" stroke-width="3" stroke-linecap="round"/>
  <path d="M20 53v4.5M44 53v4.5" stroke="#FFD45A" stroke-width="3" stroke-linecap="round"/>
</svg>`;

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

function enhanceAssistant(html) {
  html = html.replace(
    '<button class="ash-launcher" id="ash-open" aria-label="فتح المساعد">🤖</button>',
    `<button class="ash-launcher" id="ash-open" aria-label="فتح المساعد الذكي">${ASSISTANT_SVG}</button>`
  );
  html = html.replace(
    '<div class="ash-head"><span>🤖</span><strong>',
    `<div class="ash-head"><span class="ash-head-bot">${ASSISTANT_SVG}</span><strong>`
  );
  html = html.replace('</style>', `${LIGHT_LOGO_CSS}${ASSISTANT_CSS}</style>`);
  return html;
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
    html = enhanceAssistant(html);
    return res.end(html);
  } catch (error) {
    res.statusCode = 502;
    res.setHeader('Content-Type', 'text/plain; charset=utf-8');
    return res.end('تعذر تحميل الموقع مؤقتًا.');
  }
};
