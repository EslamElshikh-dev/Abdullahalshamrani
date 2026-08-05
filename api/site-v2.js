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
#ash-assistant-root{font-family:Tahoma,Arial,sans-serif;direction:rtl}
#ash-assistant-root [hidden]{display:none!important}
html.ash-lock,html.ash-lock body{overflow:hidden}
.ash-launcher-wrap{position:fixed;right:18px;bottom:24px;z-index:130;display:flex;flex-direction:row;direction:ltr;align-items:center;gap:11px}
.ash-help-label{order:1;position:relative;min-width:118px;padding:10px 15px;border:1px solid rgba(118,230,242,.48);border-radius:16px;background:linear-gradient(145deg,rgba(5,27,42,.98),rgba(14,61,83,.97));color:#f5fdff;font-size:12px;font-weight:900;line-height:1.25;text-align:center;box-shadow:0 12px 30px rgba(0,0,0,.27),inset 0 1px 0 rgba(255,255,255,.09);backdrop-filter:blur(12px);pointer-events:none;animation:ashBubbleFloat 4.4s ease-in-out infinite}
.ash-help-label::before{content:'';position:absolute;right:-6px;top:50%;width:12px;height:12px;transform:translateY(-50%) rotate(45deg);background:#0d3a50;border-top:1px solid rgba(118,230,242,.48);border-right:1px solid rgba(118,230,242,.48);border-radius:2px}
.ash-help-label::after{content:'';position:absolute;inset:1px;border-radius:15px;background:linear-gradient(105deg,transparent 30%,rgba(255,255,255,.13) 50%,transparent 70%);background-size:220% 100%;pointer-events:none;animation:ashBubbleShine 5.8s ease-in-out infinite}
.ash-launcher{order:2;position:relative;display:grid;place-items:center;width:66px;height:66px;padding:0;border:1px solid rgba(124,231,244,.68);border-radius:22px;background:linear-gradient(145deg,#123f59 0%,#061d2d 66%,#03131f 100%);color:#fff;cursor:pointer;box-shadow:0 16px 36px rgba(0,0,0,.38),0 0 0 5px rgba(59,214,236,.06),inset 0 1px 0 rgba(255,255,255,.14);animation:ashBotFloat 4.4s ease-in-out infinite,ashBotGlow 3.2s ease-in-out infinite;transition:transform .22s ease,box-shadow .22s ease}
.ash-launcher::before{content:'';position:absolute;inset:-7px;border:1px solid rgba(92,223,241,.22);border-radius:28px;animation:ashBotRing 3.2s ease-out infinite;pointer-events:none}
.ash-launcher::after{content:'';position:absolute;inset:7px;border-radius:16px;background:linear-gradient(180deg,rgba(255,255,255,.11),transparent 42%);pointer-events:none}
.ash-launcher:hover{transform:translateY(-3px) scale(1.025);box-shadow:0 20px 42px rgba(0,0,0,.42),0 0 25px rgba(66,219,239,.18),inset 0 1px 0 rgba(255,255,255,.16)}
.ash-launcher:focus-visible{outline:3px solid rgba(255,211,77,.8);outline-offset:4px}
.ash-bot-svg{position:relative;z-index:2;width:44px;height:44px;display:block;filter:drop-shadow(0 7px 10px rgba(0,0,0,.3))}
.ash-overlay{position:fixed;inset:0;z-index:138;background:rgba(1,12,20,.58);opacity:0;visibility:hidden;pointer-events:none;transition:opacity .22s ease,visibility .22s ease;backdrop-filter:blur(3px)}
.ash-overlay.is-open{opacity:1;visibility:visible;pointer-events:auto}
.ash-panel{position:fixed;right:18px;bottom:104px;z-index:140;width:min(400px,calc(100vw - 36px));max-height:calc(100vh - 132px);max-height:calc(100dvh - 132px);display:flex;flex-direction:column;overflow:hidden;border:1px solid rgba(119,221,235,.38);border-radius:24px;background:#f8fcfd;color:#163444;box-shadow:0 30px 80px rgba(0,0,0,.42);opacity:0;visibility:hidden;pointer-events:none;transform:translateY(16px) scale(.97);transform-origin:bottom right;transition:opacity .22s ease,visibility .22s ease,transform .22s ease}
.ash-panel.is-open{opacity:1;visibility:visible;pointer-events:auto;transform:translateY(0) scale(1)}
.ash-head{display:grid;grid-template-columns:42px 1fr 38px;align-items:center;gap:10px;padding:14px 14px 13px;background:linear-gradient(135deg,#061d2d,#0e4a62);color:#fff;border-bottom:1px solid rgba(255,255,255,.12)}
.ash-head-bot{display:grid;place-items:center;width:40px;height:40px;border-radius:13px;background:rgba(89,220,235,.1);border:1px solid rgba(89,220,235,.24)}
.ash-head-bot .ash-bot-svg{width:30px;height:30px}
.ash-head-copy{min-width:0}
.ash-head strong{display:block;font-size:15px;line-height:1.3}
.ash-head small{display:block;margin-top:2px;color:#bfe7ee;font-size:10.5px}
.ash-close{width:36px;height:36px;display:grid;place-items:center;padding:0;border:1px solid rgba(255,255,255,.22);border-radius:11px;background:rgba(255,255,255,.08);color:#fff;font-size:25px;line-height:1;cursor:pointer;transition:background .2s ease,transform .2s ease}
.ash-close:hover{background:rgba(255,255,255,.16);transform:rotate(4deg)}
.ash-close:focus-visible{outline:3px solid rgba(255,211,77,.75);outline-offset:2px}
.ash-body{padding:15px;overflow:auto;overscroll-behavior:contain;background:linear-gradient(180deg,#f9fdfe,#eff8fa)}
.ash-welcome{padding:12px 13px;border:1px solid #d4e8ed;border-radius:15px;background:#fff;color:#375968;font-size:12.5px;line-height:1.75;box-shadow:0 8px 22px rgba(5,34,49,.06)}
.ash-questions{display:grid;grid-template-columns:1fr 1fr;gap:8px;margin-top:11px}
.ash-q{min-height:47px;padding:9px 10px;border:1px solid #c9e0e6;border-radius:13px;background:#fff;color:#163f50;font:700 11.5px/1.55 Tahoma,Arial,sans-serif;cursor:pointer;box-shadow:0 6px 16px rgba(5,34,49,.05);transition:transform .18s ease,border-color .18s ease,background .18s ease}
.ash-q:hover{transform:translateY(-2px);border-color:#56cfe0;background:#f1fcfe}
.ash-q:focus-visible{outline:3px solid rgba(34,211,238,.34);outline-offset:1px}
.ash-answer{margin-top:11px;min-height:69px;padding:12px 13px;border:1px solid #cde4e9;border-radius:15px;background:#e9f8fb;color:#244d5d;font-size:12px;line-height:1.75}
.ash-form{display:grid;grid-template-columns:1fr auto;gap:8px;padding:12px;border-top:1px solid #d2e6eb;background:#fff}
.ash-message{width:100%;min-height:48px;max-height:105px;resize:vertical;padding:12px;border:1px solid #c7dfe5;border-radius:13px;background:#f8fcfd;color:#173b4b;font:13px/1.55 Tahoma,Arial,sans-serif;outline:none}
.ash-message:focus{border-color:#22c4db;box-shadow:0 0 0 3px rgba(34,196,219,.13)}
.ash-send{align-self:stretch;min-width:112px;padding:10px 13px;border:0;border-radius:13px;background:linear-gradient(135deg,#25d366,#13a84c);color:#fff;font:900 11.5px/1.4 Tahoma,Arial,sans-serif;cursor:pointer;box-shadow:0 10px 22px rgba(37,211,102,.22);transition:transform .18s ease,filter .18s ease}
.ash-send:hover{transform:translateY(-1px);filter:brightness(1.04)}
.ash-send:focus-visible{outline:3px solid rgba(37,211,102,.3);outline-offset:2px}
@keyframes ashBotFloat{0%,100%{transform:translateY(0)}50%{transform:translateY(-5px)}}
@keyframes ashBubbleFloat{0%,100%{transform:translateY(0)}50%{transform:translateY(-3px)}}
@keyframes ashBotGlow{0%,100%{box-shadow:0 16px 36px rgba(0,0,0,.38),0 0 0 5px rgba(59,214,236,.06),inset 0 1px 0 rgba(255,255,255,.14)}50%{box-shadow:0 18px 42px rgba(0,0,0,.42),0 0 24px rgba(66,219,239,.19),inset 0 1px 0 rgba(255,255,255,.16)}}
@keyframes ashBotRing{0%{opacity:.55;transform:scale(.92)}100%{opacity:0;transform:scale(1.17)}}
@keyframes ashBubbleShine{0%,68%,100%{background-position:130% 0}84%{background-position:-110% 0}}
@media(max-width:620px){.ash-launcher-wrap{right:12px;bottom:89px;gap:9px}.ash-launcher{width:60px;height:60px;border-radius:20px}.ash-bot-svg{width:40px;height:40px}.ash-help-label{min-width:108px;padding:9px 12px;font-size:11px}.ash-panel{right:8px;left:8px;bottom:82px;width:auto;max-height:calc(100vh - 104px);max-height:calc(100dvh - 104px);border-radius:22px;transform-origin:bottom center}.ash-head{grid-template-columns:38px 1fr 36px;padding:12px}.ash-head-bot{width:37px;height:37px}.ash-head-bot .ash-bot-svg{width:27px;height:27px}.ash-body{padding:12px}.ash-questions{grid-template-columns:1fr 1fr;gap:7px}.ash-q{min-height:44px;padding:8px;font-size:10.5px}.ash-form{grid-template-columns:1fr;padding:10px}.ash-message{min-height:46px;max-height:78px}.ash-send{min-height:43px}}
@media(max-width:390px){.ash-help-label{min-width:98px;font-size:10.5px}.ash-questions{grid-template-columns:1fr}.ash-panel{right:6px;left:6px}}
@media(prefers-reduced-motion:reduce){.ash-launcher,.ash-launcher::before,.ash-help-label,.ash-help-label::after{animation:none}.ash-launcher,.ash-close,.ash-q,.ash-send,.ash-overlay,.ash-panel{transition:none}}
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

const ASSISTANT_HTML = `<div id="ash-assistant-root">
  <div class="ash-launcher-wrap">
    <span class="ash-help-label">محتاج مساعدة؟</span>
    <button class="ash-launcher" id="ash-open" type="button" aria-label="فتح مساعد المتجر الذكي" aria-expanded="false" aria-controls="ash-panel">${ASSISTANT_SVG}</button>
  </div>
  <div class="ash-overlay" id="ash-overlay" hidden></div>
  <aside class="ash-panel" id="ash-panel" role="dialog" aria-modal="true" aria-labelledby="ash-title" hidden>
    <div class="ash-head">
      <span class="ash-head-bot">${ASSISTANT_SVG}</span>
      <div class="ash-head-copy"><strong id="ash-title">مساعد المتجر الذكي</strong><small>إجابات سريعة وتواصل مباشر</small></div>
      <button class="ash-close" id="ash-close" type="button" aria-label="إغلاق المساعد">×</button>
    </div>
    <div class="ash-body">
      <div class="ash-welcome">اختر سؤالًا سريعًا، أو اكتب طلبك لإرساله مباشرة عبر واتساب.</div>
      <div class="ash-questions">
        <button class="ash-q" type="button" data-answer="نوفر مواد بناء ومستلزمات سباكة وكهرباء ومواد جبسية ولمبات وإنارة حديثة، إلى جانب خدمات التأسيس والتشطيب والصيانة.">ما المنتجات والخدمات المتوفرة؟</button>
        <button class="ash-q" type="button" data-answer="نخدم ظهرة لبن ولبن وعرقة، وجميع أحياء شمال وشرق وغرب ووسط وجنوب الرياض بحسب نوع الطلب وتوفر الفريق.">ما الأحياء التي تغطيها الخدمة؟</button>
        <button class="ash-q" type="button" data-answer="أرسل اسم المنتج أو الخدمة، والحي، ونوع المبنى، والكمية أو صور العطل عبر واتساب للحصول على تقييم أولي.">كيف أطلب عرض سعر؟</button>
        <button class="ash-q" type="button" data-answer="تتوفر معالجة أعطال الكهرباء والسباكة العاجلة على مدار الساعة بحسب موقع البلاغ وتوفر الفريق.">هل توجد خدمة طوارئ؟</button>
        <button class="ash-q" type="button" data-answer="رقم الاتصال وواتساب هو 0505782716، وموقع المتجر في ظهرة لبن بمدينة الرياض.">كيف أتواصل مع المتجر؟</button>
      </div>
      <div class="ash-answer" id="ash-answer" aria-live="polite">اضغط على أحد الأسئلة لعرض الإجابة.</div>
    </div>
    <form class="ash-form" id="ash-form">
      <textarea class="ash-message" id="ash-message" placeholder="اكتب طلبك هنا..." aria-label="اكتب طلبك" required></textarea>
      <button class="ash-send" type="submit">إرسال عبر واتساب</button>
    </form>
  </aside>
</div>
<script>(function(){
  var root=document.getElementById('ash-assistant-root');
  if(!root)return;
  var panel=document.getElementById('ash-panel');
  var overlay=document.getElementById('ash-overlay');
  var openButton=document.getElementById('ash-open');
  var closeButton=document.getElementById('ash-close');
  var answer=document.getElementById('ash-answer');
  var closeTimer;
  function showAssistant(){
    clearTimeout(closeTimer);
    panel.hidden=false;
    overlay.hidden=false;
    requestAnimationFrame(function(){panel.classList.add('is-open');overlay.classList.add('is-open');});
    openButton.setAttribute('aria-expanded','true');
    document.documentElement.classList.add('ash-lock');
    setTimeout(function(){closeButton.focus();},80);
  }
  function hideAssistant(){
    panel.classList.remove('is-open');
    overlay.classList.remove('is-open');
    openButton.setAttribute('aria-expanded','false');
    document.documentElement.classList.remove('ash-lock');
    closeTimer=setTimeout(function(){panel.hidden=true;overlay.hidden=true;},240);
    openButton.focus();
  }
  openButton.addEventListener('click',showAssistant);
  closeButton.addEventListener('click',hideAssistant);
  overlay.addEventListener('click',hideAssistant);
  document.addEventListener('keydown',function(event){if(event.key==='Escape'&&!panel.hidden)hideAssistant();});
  root.querySelectorAll('.ash-q').forEach(function(button){button.addEventListener('click',function(){answer.textContent=button.getAttribute('data-answer')||'';});});
  document.getElementById('ash-form').addEventListener('submit',function(event){
    event.preventDefault();
    var message=document.getElementById('ash-message').value.trim();
    if(!message)return;
    window.open('https://wa.me/${WA}?text='+encodeURIComponent(message),'_blank','noopener,noreferrer');
  });
})();</script>`;

function brightenLogo(html) {
  return html
    .replaceAll('fill="#12356f"', 'fill="#f8fbff"')
    .replaceAll('fill="#0b6f9c"', 'fill="#86e8f6"')
    .replaceAll('fill="#d99a00"', 'fill="#ffd45a"')
    .replaceAll('stroke="#153b70"', 'stroke="#8bdff0"')
    .replaceAll('fill="#071d35" stroke="#123f75"', 'fill="#0b3550" stroke="#64d9eb"')
    .replaceAll('stroke="#0b65a0"', 'stroke="#e8fbff"');
}

function updateContact(html) {
  return html
    .replaceAll(OLD_WA, WA)
    .replaceAll(OLD_PHONE, PHONE);
}

function enhanceHtml(html) {
  let output = brightenLogo(updateContact(html));
  if (!output.includes('id="ash-assistant-root"')) {
    output = output.replace('</style>', `${LIGHT_LOGO_CSS}${ASSISTANT_CSS}</style>`);
    output = output.replace('</body>', `${ASSISTANT_HTML}</body>`);
  }
  return output;
}

module.exports = async (req, res) => {
  try {
    const url = new URL(req.url, ORIGIN);
    const upstream = await fetch(url, {
      method: req.method === 'HEAD' ? 'HEAD' : 'GET',
      headers: {
        'user-agent': req.headers['user-agent'] || 'Mozilla/5.0',
        accept: req.headers.accept || '*/*'
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
    res.setHeader('Permissions-Policy', 'camera=(), microphone=(), geolocation=()');

    if (req.method === 'HEAD') return res.end();

    if (!contentType.includes('text/html')) {
      const bytes = Buffer.from(await upstream.arrayBuffer());
      return res.end(bytes);
    }

    const html = enhanceHtml(await upstream.text());
    return res.end(html);
  } catch (error) {
    console.error('site proxy error', error);
    res.statusCode = 502;
    res.setHeader('Content-Type', 'text/plain; charset=utf-8');
    return res.end('تعذر تحميل الموقع مؤقتًا. يرجى المحاولة مرة أخرى.');
  }
};
