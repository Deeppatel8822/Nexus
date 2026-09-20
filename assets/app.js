// Page navigation
function show(name){
  document.querySelectorAll('.page').forEach(p=>p.classList.remove('active'));
  document.getElementById('page-'+name).classList.add('active');
  window.scrollTo({top:0,behavior:'smooth'});
  // Update nav active state
  document.querySelectorAll('.nav-links a').forEach(a=>a.classList.remove('active'));
  const map={home:'nl-home',about:'nl-about',spices:'nl-products',cumin:'nl-products',cardamom:'nl-products',pepper:'nl-products',turmeric:'nl-products',chilli:'nl-products',coriander:'nl-products',fennel:'nl-products',fenugreek:'nl-products',mustard:'nl-products',packaging:'nl-products',chemicals:'nl-products',process:'nl-process',certs:'nl-certs',contact:'nl-contact'};
  if(map[name]){const el=document.getElementById(map[name]);if(el)el.classList.add('active')}
}

// ═══ FORM SUBMISSION — Email (PHP backend) + WhatsApp ═══
// Email is sent via send-enquiry.php on your Hostinger server (upload it
// to the same folder as this HTML file — see Go-Live guide). No third-party
// account needed. WhatsApp works immediately, no setup required either way.
const ENQUIRY_ENDPOINT = 'send-enquiry.php';
const WHATSAPP_NUMBER = '918758988822'; // country code + number, no + or spaces

function collectFormData(cardEl){
  const data = {};
  cardEl.querySelectorAll('input, select, textarea').forEach(el=>{
    if (el.classList.contains('hp-field')) return; // skip honeypot
    const label = el.closest('.fr, .field-row')?.querySelector('label')?.textContent?.trim() || el.placeholder || el.name || 'Field';
    if(el.value && el.value.trim() && !el.value.startsWith('—')) data[label] = el.value.trim();
  });
  return data;
}

function detectProductName(){
  const activePage = document.querySelector('.page.active');
  const h1 = activePage ? activePage.querySelector('h1') : null;
  return h1 ? h1.textContent.trim() : 'General Enquiry';
}

function ensureHoneypot(cardEl){
  // Adds an invisible field bots tend to auto-fill; real visitors never see it.
  if (cardEl.querySelector('.hp-field')) return cardEl.querySelector('.hp-field');
  const hp = document.createElement('input');
  hp.type = 'text';
  hp.name = 'website_url';
  hp.className = 'hp-field';
  hp.tabIndex = -1;
  hp.autocomplete = 'off';
  hp.style.cssText = 'position:absolute;left:-9999px;width:1px;height:1px;opacity:0;';
  cardEl.appendChild(hp);
  return hp;
}

function submitForm(btn){
  const card = btn.closest('.fcard');
  const data = card ? collectFormData(card) : {};
  const product = detectProductName();
  const honeypot = card ? ensureHoneypot(card) : null;

  // Show confirmation toast immediately for responsiveness
  const t = document.getElementById('toast');
  t.classList.add('show');
  setTimeout(()=>t.classList.remove('show'), 4000);

  const emailField = Object.keys(data).find(k => /email/i.test(k));
  const payload = new URLSearchParams();
  payload.set('product_name', product);
  payload.set('fields', JSON.stringify(data));
  payload.set('email', emailField ? data[emailField] : '');
  payload.set('website_url', honeypot ? honeypot.value : '');

  fetch(ENQUIRY_ENDPOINT, {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: payload.toString()
  })
  .then(res => res.json())
  .then(result => {
    if (!result.success) console.warn('Enquiry email issue:', result.message);
  })
  .catch(err => console.error('Enquiry send failed (check send-enquiry.php is uploaded):', err));
}

function sendWhatsAppEnquiry(btn){
  const card = btn.closest('.fcard');
  const data = card ? collectFormData(card) : {};
  const product = detectProductName();
  let msg = `New Enquiry — ${product}\n\n`;
  Object.keys(data).forEach(key => { msg += `${key}: ${data[key]}\n`; });
  if (Object.keys(data).length === 0) msg = `Hello, I'd like to enquire about ${product}.`;
  window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(msg)}`, '_blank');
}


// Sticky nav shadow on scroll
window.addEventListener('scroll',()=>{
  document.getElementById('nav').classList.toggle('scrolled',window.scrollY>10);
});

// ═══ LANGUAGE SWITCHER ═══
// Translates main navigation + home hero. Product page content (specs, FAQs,
// descriptions) stays in English in this version — translating 2,000-word
// researched product pages accurately needs professional/native review before
// publishing, so it's marked as a next step for the developer, not auto-translated here.
const translations = {
  en: {
    'nl-home':'Home','nl-about':'About Us','nl-products':'Products ▾','nl-process':'Export Process','nl-certs':'Certifications','nl-contact':'Contact',
    'nl-quote-btn':'Request Quote',
    't-hero-tag':'🇮🇳 Ahmedabad, India &nbsp;·&nbsp; Exporting to 30+ Countries',
    't-hero-h1':"India's trusted<br>exporter of<br><em>spices, packaging<br>& chemicals</em>",
    't-hero-sub':'Nexus Global Exim connects international buyers with certified Indian products — competitive CIF/FOB pricing, complete documentation, and a quote in 24 hours.',
    't-hero-btn1':'Send an enquiry','t-hero-btn2':'View products'
  },
  ar: {
    'nl-home':'الرئيسية','nl-about':'من نحن','nl-products':'المنتجات ▾','nl-process':'عملية التصدير','nl-certs':'الشهادات','nl-contact':'اتصل بنا',
    'nl-quote-btn':'اطلب عرض سعر',
    't-hero-tag':'🇮🇳 أحمد آباد، الهند &nbsp;·&nbsp; التصدير إلى أكثر من 30 دولة',
    't-hero-h1':'المُصدّر الهندي الموثوق<br>للتوابل ومواد التغليف<br><em>والمواد الكيميائية</em>',
    't-hero-sub':'تربط شركة Nexus Global Exim المشترين الدوليين بمنتجات هندية معتمدة — أسعار CIF/FOB تنافسية، وثائق كاملة، وعرض سعر خلال 24 ساعة.',
    't-hero-btn1':'أرسل استفسار','t-hero-btn2':'عرض المنتجات'
  },
  zh: {
    'nl-home':'首页','nl-about':'关于我们','nl-products':'产品 ▾','nl-process':'出口流程','nl-certs':'认证','nl-contact':'联系我们',
    'nl-quote-btn':'索取报价',
    't-hero-tag':'🇮🇳 印度艾哈迈达巴德 &nbsp;·&nbsp; 出口至30多个国家',
    't-hero-h1':'值得信赖的印度<br>香料、包装<br><em>及化工产品出口商</em>',
    't-hero-sub':'Nexus Global Exim 为国际买家提供经认证的印度产品——具有竞争力的CIF/FOB价格、完整单证，24小时内报价。',
    't-hero-btn1':'发送询价','t-hero-btn2':'查看产品'
  }
};

function setLang(lang){
  const dict = translations[lang] || translations.en;
  Object.keys(dict).forEach(id=>{
    const el = document.getElementById(id);
    if(el) el.innerHTML = dict[id];
  });
  document.getElementById('lang-current').textContent = lang.toUpperCase();
  document.documentElement.setAttribute('dir', lang==='ar' ? 'rtl' : 'ltr');
  document.getElementById('lang-panel').classList.remove('open');
}

// Close language panel if clicking outside it
document.addEventListener('click', (e)=>{
  const panel = document.getElementById('lang-panel');
  const btn = document.querySelector('.lang-btn');
  if(panel && panel.classList.contains('open') && !panel.contains(e.target) && e.target!==btn){
    panel.classList.remove('open');
  }
});
