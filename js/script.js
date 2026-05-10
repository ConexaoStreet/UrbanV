/* ============================================================
   URBAN V — js/script.js v2 (Master)
   Streetwear Premium Store — GitHub Pages Compatible
   ============================================================ */
'use strict';

/* ──────────────────────────────────────────────────────────
   CONSTANTS
────────────────────────────────────────────────────────── */
const WPP  = '5511919730067';
const PIX_KEY = '5511919730067'; // Chave Pix (altere aqui)
const PRODUCTS_URL = 'products.json';

/* ──────────────────────────────────────────────────────────
   PRODUCTS FALLBACK (caso fetch falhe em file://)
────────────────────────────────────────────────────────── */
const PRODUCTS_FALLBACK = [
  { id:1,  name:'Camiseta Oversized Concrete', slug:'camiseta-oversized-concrete', price:89.90,  oldPrice:119.90, category:'Camisetas', description:'Algodão pesado 300g, corte oversized exclusivo Urban V.',         longDescription:'A Camiseta Oversized Concrete é feita em algodão 100% penteado 300g/m², com corte oversized exclusivo Urban V. Acabamento premium com costura dupla reforçada nas barras e gola com ribana de alta elasticidade. Tingida em tom grafite profundo com estampa Urban V em serigrafia de alta definição.', badge:'MAIS VENDIDO', featured:true,  bestSeller:true,  stock:42, sizes:['P','M','G','GG','XG'],  images:[], accent:'#FF4D2E', createdAt:'2024-01-10', sales:234, rating:4.8, reviewsCount:0 },
  { id:2,  name:'Camiseta Neon Grid',          slug:'camiseta-neon-grid',          price:99.90,  oldPrice:null,   category:'Camisetas', description:'Estampa exclusiva grid urbano, tintura reativa. Drop especial.', longDescription:'A Camiseta Neon Grid traz estampa exclusiva desenvolvida pelo time de arte da Urban V. Grid urbano em tintura reativa com efeito de profundidade. Malha premium 280g algodão penteado, corte semi-oversized.',          badge:'EXCLUSIVO',   featured:true,  bestSeller:false, stock:18, sizes:['P','M','G','GG'],       images:[], accent:'#C98A4B', createdAt:'2024-02-15', sales:87,  rating:4.6, reviewsCount:0 },
  { id:3,  name:'Regata Urban Essential',       slug:'regata-urban-essential',       price:69.90,  oldPrice:null,   category:'Camisetas', description:'Regata structured fit, algodão premium 260g. Ideal para layering.', longDescription:'A Regata Urban Essential foi projetada para o verão streetwear. Malha 260g algodão penteado com structured fit. Acabamento em barra curva e alças largas para máximo conforto.', badge:'NOVO',        featured:false, bestSeller:false, stock:35, sizes:['PP','P','M','G','GG'], images:[], accent:'#FF4D2E', createdAt:'2024-03-01', sales:43,  rating:4.5, reviewsCount:0 },
  { id:4,  name:'Moletom Night Motion',         slug:'moletom-night-motion',         price:149.90, oldPrice:189.90, category:'Moletons',  description:'Fleece premium 400g, capuz duplo reforçado. Movimento na noite.',   longDescription:'O Moletom Night Motion é a peça mais quente do catálogo Urban V. Fleece 100% algodão 400g/m². Capuz com dupla camada e cordão encerado, bolso canguru reforçado. Costuras flatlock para máximo conforto.',              badge:'PROMOÇÃO',    featured:true,  bestSeller:true,  stock:27, sizes:['P','M','G','GG','XG'],  images:[], accent:'#C98A4B', createdAt:'2024-01-20', sales:189, rating:4.9, reviewsCount:0 },
  { id:5,  name:'Moletom Urban Core Hood',      slug:'moletom-urban-core-hood',      price:169.90, oldPrice:null,   category:'Moletons',  description:'Hoodie premium com patch bordado, fleece interno macio 420g.',    longDescription:'O Urban Core Hood define o que é hoodie premium streetwear. Fleece de dupla face: externo com textura suave, interno felpudo 420g. Patch bordado Urban V no peito, logo tonal nas costas. Capuz estruturado, caimento oversized calculado.',    badge:'PREMIUM',     featured:false, bestSeller:false, stock:15, sizes:['M','G','GG','XG'],     images:[], accent:'#FF4D2E', createdAt:'2024-02-01', sales:56,  rating:4.7, reviewsCount:0 },
  { id:6,  name:'Jaqueta Oversized Street',     slug:'jaqueta-oversized-street',     price:219.90, oldPrice:269.90, category:'Moletons',  description:'Jaqueta corta-vento oversized, forro polar, bolsos laterais e peito.', longDescription:'A Jaqueta Oversized Street é a peça de outono/inverno da Urban V. Exterior em nylon corta-vento de alta densidade, forro polar interno. Zíper YKK duplo sentido, bolsos com zíper laterais e peito.', badge:'LIMITADO',    featured:true,  bestSeller:false, stock:8,  sizes:['P','M','G','GG'],       images:[], accent:'#C98A4B', createdAt:'2024-03-10', sales:34,  rating:4.9, reviewsCount:0 },
  { id:7,  name:'Calça Cargo Core',             slug:'calca-cargo-core',             price:129.90, oldPrice:null,   category:'Calças',    description:'Multipockets estratégicos, caimento streetwear perfeito. O cargo que define.', longDescription:'A Calça Cargo Core é construída para quem vive o streetwear de verdade. Tecido twill 98% algodão 2% elastano. 6 bolsos estratégicos, costura reforçada em todos os pontos de tensão.',          badge:'BEST SELLER', featured:true,  bestSeller:true,  stock:31, sizes:['38','40','42','44','46','48'], images:[], accent:'#FF4D2E', createdAt:'2024-01-15', sales:167, rating:4.8, reviewsCount:0 },
  { id:8,  name:'Bermuda Street Cargo',         slug:'bermuda-street-cargo',         price:99.90,  oldPrice:null,   category:'Calças',    description:'Bermuda cargo com elástico, 4 bolsos e logo bordado. Streetwear puro.', longDescription:'A Bermuda Street Cargo traz toda a funcionalidade da cargo em versão para o verão. Tecido ripstop leve e resistente. 4 bolsos com velcro, cintura com elástico e cordão.',                   badge:'NOVO',        featured:false, bestSeller:false, stock:22, sizes:['38','40','42','44','46'], images:[], accent:'#C98A4B', createdAt:'2024-03-05', sales:29,  rating:4.5, reviewsCount:0 },
  { id:9,  name:'Boné Signature',               slug:'bone-signature',               price:69.90,  oldPrice:null,   category:'Bonés',     description:'Dad hat estruturado, aba curvada, bordado V metálico. Identidade no topo.', longDescription:'O Boné Signature é o acessório símbolo da Urban V. Dad hat com estrutura média, aba pré-curvada. Logo V bordado em fio metálico na frente, Urban V bordado tonal na faixa interna.', badge:'CLÁSSICO',    featured:true,  bestSeller:true,  stock:58, sizes:['Único'],                images:[], accent:'#FF4D2E', createdAt:'2024-01-05', sales:312, rating:4.9, reviewsCount:0 },
  { id:10, name:'Boné Dad Hat Urban',           slug:'bone-dad-hat-urban',           price:59.90,  oldPrice:null,   category:'Bonés',     description:'Dad hat 6 painéis, aba reta, bordado frontal UV. Essencial urbano.',    longDescription:'O Boné Dad Hat Urban é o clássico reimaginado. 6 painéis em twill de algodão, perfil baixo e aba não estruturada. Bordado UV em fio de cor contrastante na frente. Fecho em velcro ajustável.',    badge:'NOVO',        featured:false, bestSeller:false, stock:44, sizes:['Único'],                images:[], accent:'#C98A4B', createdAt:'2024-02-20', sales:71,  rating:4.6, reviewsCount:0 },
  { id:11, name:'Shoulder Bag Street',          slug:'shoulder-bag-street',          price:79.90,  oldPrice:99.90,  category:'Acessórios',description:'Nylon 600D resistente, tira ajustável, bolso frontal Urban V.',         longDescription:'A Shoulder Bag Street é a parceira perfeita para o dia a dia urbano. Nylon 600D de alta resistência à água. Compartimento principal espaçoso, bolso frontal com zíper, alça ajustável de 40–80cm.',   badge:'PROMOÇÃO',    featured:true,  bestSeller:false, stock:19, sizes:['Único'],                images:[], accent:'#FF4D2E', createdAt:'2024-01-25', sales:98,  rating:4.7, reviewsCount:0 },
  { id:12, name:'Cinto Tático Urban V',         slug:'cinto-tatico-urban',           price:49.90,  oldPrice:null,   category:'Acessórios',description:'Nylon tático com fivela metálica, regulagem completa. Streetwear funcional.', longDescription:'O Cinto Tático Urban V traz funcionalidade militar para o streetwear. Tira em nylon 38mm de alta resistência, fivela metálica heavy-duty com regulagem por clipe. Compatível com cintura 70–110cm.', badge:'NOVO',        featured:false, bestSeller:false, stock:67, sizes:['Único'],                images:[], accent:'#C98A4B', createdAt:'2024-03-15', sales:22,  rating:4.4, reviewsCount:0 }
];

/* ──────────────────────────────────────────────────────────
   CATEGORY BG / BADGE MAPS
────────────────────────────────────────────────────────── */
const BG_MAP = {
  'Camisetas' :'linear-gradient(160deg,#0d0d0d 0%,#1a1a2e 100%)',
  'Moletons'  :'linear-gradient(160deg,#100c08 0%,#2a1500 100%)',
  'Calças'    :'linear-gradient(160deg,#0d0d0d 0%,#111520 100%)',
  'Bonés'     :'linear-gradient(160deg,#0a100a 0%,#0f1f0f 100%)',
  'Acessórios':'linear-gradient(160deg,#100d14 0%,#1c1030 100%)',
};

const BADGE_CLS = (b) => {
  const map = { 'MAIS VENDIDO':'pc-badge-red','BEST SELLER':'pc-badge-red','PROMOÇÃO':'pc-badge-red','EXCLUSIVO':'pc-badge-gold','PREMIUM':'pc-badge-gold','LIMITADO':'pc-badge-gold','CLÁSSICO':'pc-badge-silver','NOVO':'pc-badge-silver','DROP 01':'pc-badge-red','DROP 02':'pc-badge-gold' };
  return map[b] || 'pc-badge-silver';
};

/* ──────────────────────────────────────────────────────────
   HELPERS
────────────────────────────────────────────────────────── */
const $  = (s, c=document) => c.querySelector(s);
const $$ = (s, c=document) => [...c.querySelectorAll(s)];
const on = (el, ev, fn, opts) => el && el.addEventListener(ev, fn, opts);
const fmt = v => `R$ ${Number(v).toFixed(2).replace('.',',')}`;
const esc = s => String(s).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;');
const uid = () => Math.random().toString(36).slice(2,10).toUpperCase();
const isPage = name => window.location.pathname.endsWith(name) || window.location.pathname.endsWith(name.replace('.html',''));

/* ──────────────────────────────────────────────────────────
   STORAGE HELPERS
────────────────────────────────────────────────────────── */
const Store = {
  get(k, def=null) { try { const v=localStorage.getItem(k); return v!==null?JSON.parse(v):def; } catch{ return def; } },
  set(k,v){ try{ localStorage.setItem(k,JSON.stringify(v)); }catch{} },
  remove(k){ try{ localStorage.removeItem(k); }catch{} },
};

/* ──────────────────────────────────────────────────────────
   CART MODULE
────────────────────────────────────────────────────────── */
const Cart = {
  KEY: 'urbanv_cart',
  get items(){ return Store.get(this.KEY, []); },
  save(items){ Store.set(this.KEY, items); },
  add(product, size, qty=1){
    const items = this.items;
    const key = `${product.id}_${size}`;
    const ex = items.find(i => i.key === key);
    if(ex){ ex.qty = Math.min(ex.qty + qty, 99); }
    else { items.push({ key, id:product.id, name:product.name, price:product.price, category:product.category, size, qty }); }
    this.save(items);
    updateBadge();
  },
  remove(key){ this.save(this.items.filter(i => i.key !== key)); updateBadge(); },
  changeQty(key, delta){
    const items = this.items;
    const item = items.find(i => i.key === key);
    if(!item) return;
    item.qty = Math.max(1, item.qty + delta);
    this.save(items); updateBadge();
  },
  clear(){ Store.remove(this.KEY); updateBadge(); },
  total(){ return this.items.reduce((s,i) => s + i.price*i.qty, 0); },
  count(){ return this.items.reduce((s,i) => s + i.qty, 0); },
};

/* ──────────────────────────────────────────────────────────
   AUTH MODULE
────────────────────────────────────────────────────────── */
const Auth = {
  USER_KEY:'urbanv_users', SESSION_KEY:'urbanv_session',
  users(){ return Store.get(this.USER_KEY, []); },
  session(){ return Store.get(this.SESSION_KEY, null); },
  isLogged(){ return !!this.session(); },
  register(name,email,whatsapp,password){
    const users = this.users();
    if(users.find(u=>u.email===email)) return {ok:false,msg:'E-mail já cadastrado.'};
    users.push({name,email,whatsapp,password,createdAt:new Date().toISOString()});
    Store.set(this.USER_KEY, users);
    return {ok:true};
  },
  login(email,password){
    const user = this.users().find(u=>u.email===email && u.password===password);
    if(!user) return {ok:false,msg:'E-mail ou senha incorretos.'};
    Store.set(this.SESSION_KEY,{email:user.email,name:user.name,whatsapp:user.whatsapp});
    return {ok:true,user};
  },
  logout(){ Store.remove(this.SESSION_KEY); },
  currentUser(){
    const s = this.session();
    if(!s) return null;
    return this.users().find(u=>u.email===s.email) || null;
  },
};

/* ──────────────────────────────────────────────────────────
   ORDERS MODULE
────────────────────────────────────────────────────────── */
const Orders = {
  KEY:'urbanv_orders',
  all(){ return Store.get(this.KEY,[]); },
  mine(){
    const s = Auth.session();
    if(!s) return [];
    return this.all().filter(o=>o.userEmail===s.email);
  },
  add(order){
    const orders = this.all();
    orders.unshift({...order, id:'UV'+uid(), date:new Date().toISOString(), status:'pending'});
    Store.set(this.KEY, orders);
    return orders[0].id;
  },
  getById(id){ return this.all().find(o=>o.id===id)||null; },
};

/* ──────────────────────────────────────────────────────────
   REVIEWS MODULE
────────────────────────────────────────────────────────── */
const Reviews = {
  KEY:'urbanv_reviews',
  all(){ return Store.get(this.KEY,[]); },
  forProduct(pid){ return this.all().filter(r=>r.productId==pid); },
  canReview(pid, userEmail){
    const orders = Orders.all().filter(o=>o.userEmail===userEmail && o.status==='pending');
    const hasOrder = orders.some(o=>o.items.some(i=>i.id==pid));
    const alreadyReviewed = this.all().some(r=>r.productId==pid && r.userEmail===userEmail);
    return hasOrder && !alreadyReviewed;
  },
  add(review){
    const reviews = this.all();
    reviews.push({...review, id:uid(), date:new Date().toISOString()});
    Store.set(this.KEY, reviews);
  },
  avgRating(pid){
    const rs = this.forProduct(pid);
    if(!rs.length) return 0;
    return rs.reduce((s,r)=>s+r.rating,0)/rs.length;
  },
};

/* ──────────────────────────────────────────────────────────
   TOAST
────────────────────────────────────────────────────────── */
let toastTimer;
function showToast(msg, type='default'){
  const el = $('#toast');
  if(!el) return;
  clearTimeout(toastTimer);
  el.textContent = msg;
  el.className = 'toast show';
  if(type==='success') el.classList.add('success');
  if(type==='error')   el.classList.add('error');
  toastTimer = setTimeout(() => el.classList.remove('show'), 3200);
}

/* ──────────────────────────────────────────────────────────
   UPDATE BADGE
────────────────────────────────────────────────────────── */
function updateBadge(){
  const badge = $('#cartBadge');
  if(!badge) return;
  const n = Cart.count();
  badge.textContent = n;
  badge.classList.toggle('visible', n>0);
}

/* ──────────────────────────────────────────────────────────
   HEADER
────────────────────────────────────────────────────────── */
function initHeader(){
  const header = $('#header');
  if(!header) return;
  on(window,'scroll',()=>{ header.classList.toggle('scrolled', window.scrollY>40); },{passive:true});
  // Active nav link
  const path = window.location.pathname;
  $$('.nav-link, .mm-link').forEach(a=>{
    const href = a.getAttribute('href')||'';
    if(href && !href.startsWith('#') && path.endsWith(href)) a.classList.add('active');
  });
  // Auth label in header
  updateAuthHeader();
}

function updateAuthHeader(){
  $$('.nav-auth-label').forEach(el=>{
    el.textContent = Auth.isLogged() ? 'Minha Conta' : 'Entrar';
    el.setAttribute('href', Auth.isLogged() ? 'conta.html' : 'login.html');
  });
}

/* ──────────────────────────────────────────────────────────
   MOBILE MENU
────────────────────────────────────────────────────────── */
function initMobileMenu(){
  const ham  = $('#hamburger');
  const menu = $('#mobileMenu');
  if(!ham||!menu) return;
  const toggle = (force) => {
    const open = force!==undefined ? force : !ham.classList.contains('active');
    ham.classList.toggle('active',open);
    menu.classList.toggle('active',open);
    document.body.classList.toggle('menu-open',open);
    ham.setAttribute('aria-expanded',open);
  };
  on(ham,'click',()=>toggle());
  $$('.mm-link',menu).forEach(a=>on(a,'click',()=>toggle(false)));
  on(document,'keydown',e=>{ if(e.key==='Escape' && menu.classList.contains('active')) toggle(false); });
}

/* ──────────────────────────────────────────────────────────
   CURSOR
────────────────────────────────────────────────────────── */
function initCursor(){
  const cursor=$('#cursor'), trail=$('#cursorTrail');
  if(!cursor||!trail||window.matchMedia('(hover:none)').matches) return;
  let mx=-100,my=-100,tx=-100,ty=-100;
  on(document,'mousemove',e=>{
    mx=e.clientX; my=e.clientY;
    if(typeof gsap!=='undefined') gsap.to(cursor,{x:mx,y:my,duration:0.05,ease:'none'});
    else { cursor.style.transform=`translate(${mx-5}px,${my-5}px)`; }
  });
  const animate=()=>{ tx+=(mx-tx)*0.1; ty+=(my-ty)*0.1; trail.style.transform=`translate(${tx-18}px,${ty-18}px)`; requestAnimationFrame(animate); };
  animate();
  const hoverSel='a,button,.product-card,.drop-card,.filter,.lb-visual,.size-btn,.payment-method,.cat-card';
  on(document,'mouseover',e=>{ if(e.target.closest(hoverSel)) trail.classList.add('hovering'); });
  on(document,'mouseout',e=>{  if(e.target.closest(hoverSel)) trail.classList.remove('hovering'); });
}

/* ──────────────────────────────────────────────────────────
   SMOOTH SCROLL (anchors only)
────────────────────────────────────────────────────────── */
function initSmoothScroll(){
  $$('a[href^="#"]').forEach(a=>{
    on(a,'click',e=>{
      const t=document.querySelector(a.getAttribute('href'));
      if(!t) return;
      e.preventDefault();
      window.scrollTo({top:t.getBoundingClientRect().top+window.scrollY-72,behavior:'smooth'});
    });
  });
}

/* ──────────────────────────────────────────────────────────
   SCROLL REVEAL
────────────────────────────────────────────────────────── */
function initScrollReveal(){
  const obs=new IntersectionObserver(entries=>{
    entries.forEach(e=>{
      if(!e.isIntersecting) return;
      const delay=e.target.dataset.aosDelay||0;
      setTimeout(()=>e.target.classList.add('in-view'),+delay);
      obs.unobserve(e.target);
    });
  },{threshold:0.1,rootMargin:'0px 0px -40px 0px'});
  $$('[data-aos]').forEach(el=>obs.observe(el));
  // Reveal text
  const ro=new IntersectionObserver(entries=>{
    entries.forEach(e=>{
      if(!e.isIntersecting) return;
      if(typeof gsap!=='undefined') gsap.to(e.target,{opacity:1,y:0,duration:0.7,ease:'power3.out'});
      else { e.target.style.opacity=1; e.target.style.transform='none'; }
      ro.unobserve(e.target);
    });
  },{threshold:0.15});
  $$('.reveal-text').forEach(el=>ro.observe(el));
}

/* ──────────────────────────────────────────────────────────
   SPLIT WORDS
────────────────────────────────────────────────────────── */
function initSplitWords(){
  $$('.split-words').forEach(el=>{
    el.innerHTML = el.innerHTML.replace(/(<[^>]+>.*?<\/[^>]+>|[^\s<]+)/g, m => {
      if(m.startsWith('<')) return m;
      return `<span class="word"><span class="word-inner">${m}</span></span>`;
    });
  });
  const obs=new IntersectionObserver(entries=>{
    entries.forEach(e=>{
      if(!e.isIntersecting) return;
      if(typeof gsap!=='undefined') gsap.to($$('.word-inner',e.target),{y:0,duration:0.85,stagger:0.055,ease:'power4.out'});
      obs.unobserve(e.target);
    });
  },{threshold:0.15});
  $$('.split-words').forEach(el=>obs.observe(el));
}

/* ──────────────────────────────────────────────────────────
   CART SIDEBAR
────────────────────────────────────────────────────────── */
function initCartUI(){
  on($('#cartBtn'),'click',openCart);
  on($('#csClose'),'click',closeCart);
  on($('#cartOverlay'),'click',closeCart);
  on($('#clearCart'),'click',()=>{
    if(!Cart.count()) return;
    Cart.clear(); renderCartSidebar();
    showToast('Carrinho limpo.');
  });
  on($('#checkoutBtn'),'click',()=>{
    if(!Cart.count()){ showToast('Adicione produtos ao carrinho primeiro.','error'); return; }
    window.location.href='pagamento.html';
  });
  on(document,'keydown',e=>{ if(e.key==='Escape') closeCart(); });
  renderCartSidebar();
  updateBadge();
}

function openCart(){
  $('#cartSidebar')&&$('#cartSidebar').classList.add('active');
  $('#cartOverlay')&&$('#cartOverlay').classList.add('active');
  document.body.style.overflow='hidden';
}
function closeCart(){
  $('#cartSidebar')&&$('#cartSidebar').classList.remove('active');
  $('#cartOverlay')&&$('#cartOverlay').classList.remove('active');
  document.body.style.overflow='';
}

function renderCartSidebar(){
  const empty=$('#csEmpty'), list=$('#csItems'), footer=$('#csFooter'), sub=$('#csSubtotal');
  if(!list) return;
  const items=Cart.items;
  const has=items.length>0;
  if(empty) empty.style.display=has?'none':'flex';
  list.style.display=has?'flex':'none';
  if(footer) footer.style.display=has?'flex':'none';
  list.innerHTML='';
  items.forEach(item=>{
    const li=document.createElement('li');
    li.className='cs-item';
    li.innerHTML=`
      <div class="csi-img" style="background:${BG_MAP[item.category]||'#111'}">UV</div>
      <div class="csi-info">
        <div class="csi-name">${esc(item.name)}</div>
        <div class="csi-size">TAM: ${esc(item.size)}</div>
        <div class="csi-controls">
          <div class="csi-qty">
            <button class="csi-minus" aria-label="Diminuir">−</button>
            <span>${item.qty}</span>
            <button class="csi-plus" aria-label="Aumentar">+</button>
          </div>
          <span class="csi-price">${fmt(item.price*item.qty)}</span>
        </div>
      </div>
      <button class="csi-remove" aria-label="Remover">✕</button>`;
    on(li.querySelector('.csi-minus'),'click',()=>{ Cart.changeQty(item.key,-1); renderCartSidebar(); });
    on(li.querySelector('.csi-plus'), 'click',()=>{ Cart.changeQty(item.key,+1); renderCartSidebar(); });
    on(li.querySelector('.csi-remove'),'click',()=>{ Cart.remove(item.key); renderCartSidebar(); showToast('Item removido.'); });
    list.appendChild(li);
  });
  if(sub) sub.textContent=fmt(Cart.total());
}

/* rename for HTML compatibility */
window.openCart=openCart;

/* ──────────────────────────────────────────────────────────
   PRODUCT CARD BUILDER
────────────────────────────────────────────────────────── */
function buildProductCard(p, linkPrefix='produto.html'){
  const hasOld=p.oldPrice&&p.oldPrice>p.price;
  const disc=hasOld?Math.round(100-(p.price/p.oldPrice*100))+'%':'';
  const stars=renderStarsHTML(p.rating);
  const bg=BG_MAP[p.category]||'linear-gradient(160deg,#0d0d0d,#1a1a1a)';
  const bc=BADGE_CLS(p.badge);
  const card=document.createElement('article');
  card.className='product-card';
  card.dataset.category=p.category;
  card.dataset.id=p.id;
  card.setAttribute('aria-label',p.name);
  card.innerHTML=`
    <div class="pc-image">
      <div class="pc-image-bg" style="background:${bg}"></div>
      <div class="pc-icon" aria-hidden="true">UV</div>
      <div class="pc-badge ${bc}">${esc(p.badge)}</div>
      ${hasOld?`<div class="pc-old-price">${fmt(p.oldPrice)}</div>`:''}
      <div class="pc-hover-actions" aria-hidden="true">
        <a href="${linkPrefix}?id=${p.id}" class="btn btn-primary btn-sm">Ver Produto</a>
        <button class="btn btn-outline btn-sm pc-add-quick" data-id="${p.id}" aria-label="Adicionar ao carrinho">+ Carrinho</button>
      </div>
    </div>
    <div class="pc-body">
      <div class="pc-stars">${stars}</div>
      <div class="pc-category">${esc(p.category)}</div>
      <h3 class="pc-name">${esc(p.name)}</h3>
      <p class="pc-desc">${esc(p.description)}</p>
      <div class="pc-footer">
        <div>
          ${hasOld?`<span class="pc-price-old">${fmt(p.oldPrice)}</span>`:''}
          <span class="pc-price">${fmt(p.price)}</span>
        </div>
        <button class="pc-add" data-id="${p.id}" aria-label="Adicionar ao carrinho">+</button>
      </div>
    </div>`;
  // Quick add events — open product page for size selection
  const goProduct = () => window.location.href=`${linkPrefix}?id=${p.id}`;
  on(card.querySelector('.pc-add'),'click',e=>{ e.stopPropagation(); goProduct(); });
  on(card.querySelector('.pc-add-quick'),'click',e=>{ e.stopPropagation(); goProduct(); });
  on(card,'click',e=>{ if(!e.target.closest('button')&&!e.target.closest('a')) window.location.href=`${linkPrefix}?id=${p.id}`; });
  return card;
}

function renderStarsHTML(rating=0){
  let html='';
  for(let i=1;i<=5;i++) html+=`<span class="pc-star${i<=Math.round(rating)?'':' empty'}">★</span>`;
  return html;
}

/* ──────────────────────────────────────────────────────────
   FETCH PRODUCTS
────────────────────────────────────────────────────────── */
async function fetchProducts(){
  try{
    const r=await fetch(PRODUCTS_URL);
    if(!r.ok) throw new Error('HTTP '+r.status);
    return await r.json();
  }catch{
    return PRODUCTS_FALLBACK;
  }
}

/* ──────────────────────────────────────────────────────────
   ═══════════════════════════════════════════════════════
   INDEX PAGE
   ═══════════════════════════════════════════════════════
────────────────────────────────────────────────────────── */
async function initIndexPage(){
  initIntro();
  initHeroCanvas();
  if(window.innerWidth>=900) initVCanvas();
  initTestimonials();
  initCategoryCount();

  const products=await fetchProducts();

  // Featured products (max 4)
  const featured=products.filter(p=>p.featured).slice(0,4);
  const grid=$('#featuredGrid');
  if(grid){
    const prefix=isPage('index.html')||location.pathname==='/'||location.pathname.endsWith('/')?'produto.html':'produto.html';
    featured.forEach(p=>grid.appendChild(buildProductCard(p,prefix)));
    if(typeof gsap!=='undefined'){
      const obs=new IntersectionObserver(entries=>{
        entries.forEach(e=>{
          if(!e.isIntersecting) return;
          gsap.from($$('.product-card',grid),{opacity:0,y:50,stagger:0.08,duration:0.7,ease:'power3.out'});
          obs.unobserve(e.target);
        });
      },{threshold:0.1});
      obs.observe(grid);
    }
  }

  // Testimonials from reviews (supplement with examples if none)
  renderHomeTestimonials();

  // GSAP hero
  if(typeof gsap!=='undefined'){
    gsap.registerPlugin(ScrollTrigger);
    const tl=gsap.timeline({delay:0.2});
    tl.to('.hero-eyebrow',{opacity:1,duration:0.6,ease:'power3.out'})
      .to('.ht-1',{y:0,opacity:1,duration:0.8,ease:'power4.out'},'-=0.3')
      .to('.ht-2',{y:0,opacity:1,duration:0.8,ease:'power4.out'},'-=0.55')
      .to('.ht-3',{y:0,opacity:1,duration:0.8,ease:'power4.out'},'-=0.55')
      .to('.hero-sub',{opacity:1,y:0,duration:0.6,ease:'power3.out'},'-=0.4')
      .to('.hero-actions',{opacity:1,y:0,duration:0.6,ease:'power3.out'},'-=0.35')
      .to('.hero-stats',{opacity:1,y:0,duration:0.6,ease:'power3.out'},'-=0.3');
    gsap.to('.hero-content',{yPercent:18,ease:'none',scrollTrigger:{trigger:'.hero',start:'top top',end:'bottom top',scrub:true}});
    gsap.to('.cta-bg-v',{yPercent:-20,ease:'none',scrollTrigger:{trigger:'.cta-section',start:'top bottom',end:'bottom top',scrub:true}});
  }
}

function renderHomeTestimonials(){
  const wrap=$('#liveReviews');
  if(!wrap) return;
  const allReviews=Reviews.all();
  if(!allReviews.length){
    wrap.innerHTML=`<p class="no-reviews-msg" style="color:var(--gray-text);text-align:center;padding:40px 20px;font-size:15px;grid-column:1/-1">As primeiras avaliações da Urban V vão aparecer aqui após as compras. Seja um dos primeiros!</p>`;
    return;
  }
  const recent=allReviews.slice(0,6);
  wrap.innerHTML='';
  recent.forEach(r=>{
    const initials=(r.name||'UV').split(' ').map(w=>w[0]).slice(0,2).join('').toUpperCase();
    const stars='★'.repeat(r.rating)+'☆'.repeat(5-r.rating);
    const div=document.createElement('div');
    div.className='t-card';
    div.innerHTML=`
      <div class="t-stars">${stars}</div>
      <p>"${esc(r.comment)}"</p>
      <div class="t-author">
        <div class="t-avatar">${initials}</div>
        <div><strong>${esc(r.name)}</strong><span>${esc(r.productName||'Urban V')}</span></div>
      </div>`;
    wrap.appendChild(div);
  });
}

/* ──────────────────────────────────────────────────────────
   INTRO CINEMATOGRÁFICA
────────────────────────────────────────────────────────── */
let introComplete=false;
function initIntro(){
  const intro=$('#intro');
  if(!intro){ finishIntro(); return; }
  const canvas=$('#introCanvas');
  if(!canvas){ finishIntro(); return; }
  const ctx=canvas.getContext('2d');
  let W,H,pts,raf;
  const resize=()=>{ W=canvas.width=window.innerWidth; H=canvas.height=window.innerHeight; };
  resize();
  on(window,'resize',resize);
  const N=window.innerWidth<768?50:110;
  const mkP=()=>({x:Math.random()*W,y:Math.random()*H,vx:(Math.random()-.5)*.5,vy:(Math.random()-.5)*.5,size:Math.random()*1.4+.2,alpha:Math.random()*.5+.08,hot:Math.random()>.88});
  pts=Array.from({length:N},mkP);
  const lines=Array.from({length:6},()=>({x:Math.random()*W,y:Math.random()*H,len:Math.random()*100+50,angle:Math.random()*Math.PI,alpha:Math.random()*.1+.02,speed:(Math.random()-.5)*.6}));
  const draw=()=>{
    ctx.clearRect(0,0,W,H);
    ctx.strokeStyle='rgba(255,255,255,0.02)'; ctx.lineWidth=.5;
    for(let x=0;x<W;x+=60){ctx.beginPath();ctx.moveTo(x,0);ctx.lineTo(x,H);ctx.stroke();}
    for(let y=0;y<H;y+=60){ctx.beginPath();ctx.moveTo(0,y);ctx.lineTo(W,y);ctx.stroke();}
    lines.forEach(l=>{ l.x+=Math.cos(l.angle)*l.speed; l.y+=Math.sin(l.angle)*l.speed; if(l.x<-200)l.x=W+100; if(l.x>W+200)l.x=-100; if(l.y<-200)l.y=H+100; if(l.y>H+200)l.y=-100; ctx.save();ctx.globalAlpha=l.alpha;ctx.strokeStyle='#FF4D2E';ctx.lineWidth=1;ctx.beginPath();ctx.moveTo(l.x,l.y);ctx.lineTo(l.x+Math.cos(l.angle)*l.len,l.y+Math.sin(l.angle)*l.len);ctx.stroke();ctx.restore(); });
    pts.forEach(p=>{ p.x+=p.vx;p.y+=p.vy;if(p.x<0)p.x=W;if(p.x>W)p.x=0;if(p.y<0)p.y=H;if(p.y>H)p.y=0; ctx.save();ctx.globalAlpha=p.alpha;ctx.fillStyle=p.hot?'#FF4D2E':'#fff';if(p.hot){ctx.shadowColor='#FF4D2E';ctx.shadowBlur=8;}ctx.beginPath();ctx.arc(p.x,p.y,p.size,0,Math.PI*2);ctx.fill();ctx.restore(); });
    raf=requestAnimationFrame(draw);
  };
  draw();
  if(typeof gsap==='undefined'){ setTimeout(()=>{ cancelAnimationFrame(raf); intro.style.display='none'; document.body.classList.remove('loading'); finishIntro(); },2500); return; }
  const letters=$$('.intro-brand span');
  const tl=gsap.timeline({onComplete:()=>{ cancelAnimationFrame(raf); gsap.to(intro,{opacity:0,duration:0.5,ease:'power2.inOut',onComplete:()=>{ intro.style.display='none'; }}); document.body.classList.remove('loading'); finishIntro(); }});
  tl.to(letters,{opacity:1,y:0,skewY:0,duration:0.65,stagger:0.06,ease:'power4.out'})
    .to('.intro-tag',{opacity:1,y:0,duration:0.5,ease:'power3.out'},'-=0.2')
    .to('.intro-loader',{opacity:1,duration:0.3},'-=0.1')
    .to('.intro-loader-bar',{width:'100%',duration:1.3,ease:'power2.inOut'},'-=0.1')
    .to([letters,'.intro-tag','.intro-loader'],{opacity:0,y:-40,duration:0.45,stagger:0.04,ease:'power3.in'},'+=0.2');
}
function finishIntro(){
  if(introComplete) return;
  introComplete=true;
  const scrollEl=$('.hero-scroll');
  if(scrollEl) setTimeout(()=>{ scrollEl.style.opacity=1; },900);
}

/* ──────────────────────────────────────────────────────────
   HERO CANVAS
────────────────────────────────────────────────────────── */
function initHeroCanvas(){
  const canvas=$('#heroCanvas');
  if(!canvas) return;
  const ctx=canvas.getContext('2d');
  let W,H,pts;
  const N=window.innerWidth<768?25:60;
  const resize=()=>{ W=canvas.width=canvas.offsetWidth; H=canvas.height=canvas.offsetHeight; buildPts(); };
  const buildPts=()=>{ pts=Array.from({length:N},()=>({x:Math.random()*W,y:Math.random()*H,vx:(Math.random()-.5)*.28,vy:(Math.random()-.5)*.28,size:Math.random()*1.1+.2,alpha:Math.random()*.25+.04,hot:Math.random()>.9})); };
  resize();
  on(window,'resize',()=>{ W=canvas.width=canvas.offsetWidth; H=canvas.height=canvas.offsetHeight; buildPts(); });
  let mx=W/2,my=H/2;
  on(window,'mousemove',e=>{ const r=canvas.getBoundingClientRect(); mx=e.clientX-r.left; my=e.clientY-r.top; });
  const draw=()=>{
    ctx.clearRect(0,0,W,H);
    pts.forEach((p,i)=>{ const dx=mx-p.x,dy=my-p.y,dist=Math.sqrt(dx*dx+dy*dy); if(dist<130){p.vx-=(dx/dist)*.018;p.vy-=(dy/dist)*.018;} p.vx*=.99;p.vy*=.99;p.x+=p.vx;p.y+=p.vy;if(p.x<0)p.x=W;if(p.x>W)p.x=0;if(p.y<0)p.y=H;if(p.y>H)p.y=0;for(let j=i+1;j<pts.length;j++){const q=pts[j],d=Math.hypot(p.x-q.x,p.y-q.y);if(d<90){ctx.save();ctx.globalAlpha=(1-d/90)*.05;ctx.strokeStyle='#fff';ctx.lineWidth=.5;ctx.beginPath();ctx.moveTo(p.x,p.y);ctx.lineTo(q.x,q.y);ctx.stroke();ctx.restore();}} ctx.save();ctx.globalAlpha=p.alpha;ctx.fillStyle=p.hot?'#FF4D2E':'#fff';if(p.hot){ctx.shadowColor='#FF4D2E';ctx.shadowBlur=10;}ctx.beginPath();ctx.arc(p.x,p.y,p.size,0,Math.PI*2);ctx.fill();ctx.restore(); });
    requestAnimationFrame(draw);
  };
  draw();
}

/* ──────────────────────────────────────────────────────────
   V CANVAS
────────────────────────────────────────────────────────── */
function initVCanvas(){
  const canvas=$('#vCanvas');
  if(!canvas) return;
  const ctx=canvas.getContext('2d');
  let W,H,angle=0;
  const resize=()=>{ W=canvas.width=canvas.offsetWidth; H=canvas.height=canvas.offsetHeight; };
  resize();
  on(window,'resize',resize);
  let mx=0,my=0;
  on(window,'mousemove',e=>{ const r=canvas.getBoundingClientRect(); mx=((e.clientX-r.left)/W-.5)*.28; my=((e.clientY-r.top)/H-.5)*.28; });
  const draw=()=>{
    ctx.clearRect(0,0,W,H);
    angle+=0.008;
    const cx=W/2,cy=H/2,size=Math.min(W,H)*.35;
    for(let r=0;r<4;r++){ctx.save();ctx.strokeStyle='#FF4D2E';ctx.globalAlpha=0.035-r*.007;ctx.lineWidth=1;ctx.beginPath();ctx.arc(cx,cy,size*(0.6+r*.18),0,Math.PI*2);ctx.stroke();ctx.restore();}
    for(let i=0;i<8;i++){const a=(i/8)*Math.PI*2+angle*.5,r=size*.75,ox=cx+Math.cos(a)*r,oy=cy+Math.sin(a)*r;ctx.save();ctx.globalAlpha=0.22;ctx.fillStyle=i%3===0?'#FF4D2E':'rgba(255,255,255,0.5)';if(i%3===0){ctx.shadowColor='#FF4D2E';ctx.shadowBlur=10;}ctx.beginPath();ctx.arc(ox,oy,i%3===0?3:1.5,0,Math.PI*2);ctx.fill();ctx.restore();}
    ctx.save();ctx.translate(cx+mx*55,cy+my*35);ctx.rotate(Math.sin(angle*.5)*.05);
    ctx.shadowColor='#FF4D2E';ctx.shadowBlur=30;
    ctx.font=`bold ${size*1.6}px 'Bebas Neue',sans-serif`;ctx.textAlign='center';ctx.textBaseline='middle';
    const g=ctx.createLinearGradient(0,-size*.8,0,size*.8);g.addColorStop(0,'rgba(255,255,255,.9)');g.addColorStop(.4,'rgba(255,77,46,.8)');g.addColorStop(1,'rgba(255,77,46,.1)');
    ctx.fillStyle=g;ctx.globalAlpha=.82;ctx.fillText('V',0,0);ctx.restore();
    requestAnimationFrame(draw);
  };
  draw();
}

/* ──────────────────────────────────────────────────────────
   TESTIMONIALS CAROUSEL
────────────────────────────────────────────────────────── */
function initTestimonials(){
  const slider=$('#tSlider'),dots=$('#tDots'),prev=$('#tPrev'),next=$('#tNext');
  if(!slider) return;
  let idx=0;
  const cards=$$('.t-card',slider);
  const total=cards.length;
  const vis=()=>window.innerWidth>=900?3:window.innerWidth>=600?2:1;
  const maxIdx=()=>Math.max(0,total-vis());
  const buildDots=()=>{
    if(!dots) return;
    dots.innerHTML='';
    for(let i=0;i<=maxIdx();i++){
      const d=document.createElement('div');d.className='t-dot'+(i===idx?' active':'');
      on(d,'click',()=>goTo(i));dots.appendChild(d);
    }
  };
  const goTo=i=>{
    idx=Math.max(0,Math.min(i,maxIdx()));
    const cw=(cards[0]?.offsetWidth||280)+20;
    if(typeof gsap!=='undefined') gsap.to(slider,{x:-idx*cw,duration:0.5,ease:'power3.out'});
    else slider.style.transform=`translateX(${-idx*cw}px)`;
    $$('.t-dot',dots).forEach((d,j)=>d.classList.toggle('active',j===idx));
  };
  on(prev,'click',()=>goTo(idx-1));
  on(next,'click',()=>goTo(idx+1));
  let sx=0;
  on(slider,'touchstart',e=>{ sx=e.touches[0].clientX; },{passive:true});
  on(slider,'touchend',e=>{ const diff=sx-e.changedTouches[0].clientX;if(Math.abs(diff)>45)goTo(idx+(diff>0?1:-1)); });
  on(window,'resize',()=>{ buildDots();goTo(Math.min(idx,maxIdx())); });
  buildDots();
}

/* ──────────────────────────────────────────────────────────
   CATEGORY COUNT (index page)
────────────────────────────────────────────────────────── */
async function initCategoryCount(){
  const els=$$('[data-cat-count]');
  if(!els.length) return;
  const products=await fetchProducts();
  els.forEach(el=>{
    const cat=el.dataset.catCount;
    const count=cat==='all'?products.length:products.filter(p=>p.category===cat).length;
    el.textContent=count+' '+(count===1?'peça':'peças');
  });
}

/* ──────────────────────────────────────────────────────────
   ═══════════════════════════════════════════════════════
   PRODUTOS PAGE
   ═══════════════════════════════════════════════════════
────────────────────────────────────────────────────────── */
let allProducts=[];
let filtered=[];
let currentFilter='all';
let currentSort='newest';
let searchQ='';

async function initProdutosPage(){
  allProducts=await fetchProducts();
  renderSkeletons();
  applyFiltersAndSort();

  // Filter buttons
  $$('.filter').forEach(btn=>{
    on(btn,'click',()=>{
      $$('.filter').forEach(b=>b.classList.remove('active'));
      btn.classList.add('active');
      currentFilter=btn.dataset.filter;
      applyFiltersAndSort();
    });
  });

  // Search
  const searchEl=$('#searchInput');
  if(searchEl){
    let debounce;
    on(searchEl,'input',e=>{ clearTimeout(debounce); debounce=setTimeout(()=>{ searchQ=e.target.value.trim().toLowerCase(); applyFiltersAndSort(); },260); });
  }

  // Sort
  const sortEl=$('#sortSelect');
  if(sortEl){ on(sortEl,'change',e=>{ currentSort=e.target.value; applyFiltersAndSort(); }); }

  if(typeof gsap!=='undefined') gsap.registerPlugin(ScrollTrigger);
}

function renderSkeletons(){
  const grid=$('#productsGrid');
  if(!grid) return;
  grid.innerHTML='';
  for(let i=0;i<8;i++){
    const sk=document.createElement('div');
    sk.className='sk-card';
    sk.innerHTML=`<div class="sk-img skeleton"></div><div class="sk-body"><div class="sk-line skeleton"></div><div class="sk-line short skeleton"></div><div class="sk-line price skeleton"></div></div>`;
    grid.appendChild(sk);
  }
}

function applyFiltersAndSort(){
  let list=[...allProducts];
  if(currentFilter!=='all' && currentFilter!=='Mais vendidos' && currentFilter!=='Promoções'){
    list=list.filter(p=>p.category===currentFilter);
  } else if(currentFilter==='Mais vendidos'){
    list=list.filter(p=>p.bestSeller);
  } else if(currentFilter==='Promoções'){
    list=list.filter(p=>p.oldPrice&&p.oldPrice>p.price);
  }
  if(searchQ) list=list.filter(p=>p.name.toLowerCase().includes(searchQ)||p.description.toLowerCase().includes(searchQ)||p.category.toLowerCase().includes(searchQ));
  // Sort
  if(currentSort==='price_asc') list.sort((a,b)=>a.price-b.price);
  else if(currentSort==='price_desc') list.sort((a,b)=>b.price-a.price);
  else if(currentSort==='bestseller') list.sort((a,b)=>b.sales-a.sales);
  else list.sort((a,b)=>new Date(b.createdAt)-new Date(a.createdAt));
  filtered=list;
  renderProductGrid(filtered);
  const countEl=$('#resultsCount');
  if(countEl) countEl.textContent=`${filtered.length} produto${filtered.length!==1?'s':''} encontrado${filtered.length!==1?'s':''}`;
}

function renderProductGrid(list){
  const grid=$('#productsGrid');
  if(!grid) return;
  grid.innerHTML='';
  if(!list.length){
    grid.innerHTML=`<div class="empty-state"><div class="empty-icon">◈</div><h3>Nenhum produto encontrado</h3><p>Tente outro filtro ou termo de busca.</p></div>`;
    return;
  }
  list.forEach(p=>{ const card=buildProductCard(p); grid.appendChild(card); });
  if(typeof gsap!=='undefined'){
    gsap.from($$('.product-card',grid),{opacity:0,y:40,stagger:0.06,duration:0.55,ease:'power3.out'});
  }
}

/* ──────────────────────────────────────────────────────────
   ═══════════════════════════════════════════════════════
   PRODUTO DETAIL PAGE
   ═══════════════════════════════════════════════════════
────────────────────────────────────────────────────────── */
async function initProdutoPage(){
  const params=new URLSearchParams(window.location.search);
  const id=+params.get('id');
  const products=await fetchProducts();
  const product=products.find(p=>p.id===id);
  if(!product){ $('#pdContent')&&($('#pdContent').innerHTML='<p style="color:var(--gray-text);text-align:center;padding:80px 20px">Produto não encontrado.</p>'); return; }

  // Meta
  document.title=`${product.name} — Urban V`;

  // Breadcrumb
  const bc=$('#pdBreadcrumb');
  if(bc) bc.innerHTML=`<a href="index.html">Início</a><span>›</span><a href="produtos.html">Produtos</a><span>›</span><span style="color:var(--white)">${esc(product.name)}</span>`;

  // Image
  const mainImg=$('#pdMainImg');
  if(mainImg){ mainImg.style.background=BG_MAP[product.category]||'#111'; const icon=document.createElement('div'); icon.className='pd-img-icon'; icon.textContent='UV'; mainImg.appendChild(icon); const badge=document.createElement('div'); badge.className=`pd-img-badge ${BADGE_CLS(product.badge)}`; badge.textContent=product.badge; mainImg.appendChild(badge); }

  // Thumbs
  const thumbWrap=$('#pdThumbs');
  if(thumbWrap){ for(let i=0;i<3;i++){ const t=document.createElement('div'); t.className='pd-thumb'+(i===0?' active':''); t.innerHTML=`<div class="pd-thumb-icon">UV</div>`; t.style.background=BG_MAP[product.category]||'#111'; on(t,'click',()=>{ $$('.pd-thumb').forEach(x=>x.classList.remove('active')); t.classList.add('active'); }); thumbWrap.appendChild(t); } }

  // Info
  const setEl=(id,html)=>{ const el=$(id); if(el) el.innerHTML=html; };
  const setText=(id,text)=>{ const el=$(id); if(el) el.textContent=text; };
  setText('#pdName',product.name);
  setText('#pdCategory',product.category);
  setText('#pdDescription',product.longDescription||product.description);
  // Prices
  const priceEl=$('#pdPrice');
  if(priceEl) priceEl.textContent=fmt(product.price);
  const oldEl=$('#pdOldPrice');
  if(oldEl){ if(product.oldPrice&&product.oldPrice>product.price){ oldEl.textContent=fmt(product.oldPrice); oldEl.style.display='block'; } else oldEl.style.display='none'; }
  const discEl=$('#pdDiscount');
  if(discEl){ if(product.oldPrice&&product.oldPrice>product.price){ discEl.textContent='-'+Math.round(100-(product.price/product.oldPrice*100))+'%'; discEl.style.display='inline-flex'; } else discEl.style.display='none'; }
  // Rating
  const r=Reviews.avgRating(id)||product.rating;
  const rCount=Reviews.forProduct(id).length||product.reviewsCount;
  const starsEl=$('#pdStars');
  if(starsEl){ let h=''; for(let i=1;i<=5;i++) h+=`<span class="pd-star">${i<=Math.round(r)?'★':'☆'}</span>`; starsEl.innerHTML=h; }
  setText('#pdRatingCount',`(${rCount} avaliações)`);

  // Sizes
  const sizeGrid=$('#sizeGrid');
  let selectedSize=null;
  if(sizeGrid){
    sizeGrid.innerHTML='';
    product.sizes.forEach(s=>{
      const btn=document.createElement('button');
      btn.className='size-btn'; btn.textContent=s; btn.setAttribute('aria-label','Tamanho '+s);
      on(btn,'click',()=>{ $$('.size-btn',sizeGrid).forEach(b=>b.classList.remove('active')); btn.classList.add('active'); selectedSize=s; });
      sizeGrid.appendChild(btn);
    });
    if(product.sizes.length===1){ const btn=$('.size-btn',sizeGrid); btn.classList.add('active'); selectedSize=product.sizes[0]; }
  }

  // Quantity
  let qty=1;
  const qtyVal=$('#qtyVal');
  on($('#qtyMinus'),'click',()=>{ qty=Math.max(1,qty-1); if(qtyVal) qtyVal.textContent=qty; });
  on($('#qtyPlus'), 'click',()=>{ qty=Math.min(product.stock,qty+1); if(qtyVal) qtyVal.textContent=qty; });

  // Add to cart
  const addToCartFn=()=>{
    if(!selectedSize){ showToast('Selecione um tamanho antes.','error'); sizeGrid&&sizeGrid.classList.add('shake'); setTimeout(()=>sizeGrid&&sizeGrid.classList.remove('shake'),600); return; }
    Cart.add(product,selectedSize,qty);
    showToast(`${product.name} (${selectedSize}) adicionado! 🔥`,'success');
    openCart();
  };
  on($('#addToCartBtn'),'click',addToCartFn);
  on($('#buyNowBtn'),'click',()=>{ addToCartFn(); if(selectedSize) window.location.href='pagamento.html'; });

  // Related
  const related=products.filter(p=>p.category===product.category&&p.id!==product.id).slice(0,4);
  const relGrid=$('#relatedGrid');
  if(relGrid) related.forEach(p=>relGrid.appendChild(buildProductCard(p)));

  // Reviews
  renderProductReviews(id);

  // GSAP
  if(typeof gsap!=='undefined'){
    gsap.from('.pd-info>*',{opacity:0,y:30,stagger:0.07,duration:0.7,ease:'power3.out',delay:0.2});
  }
}

function renderProductReviews(pid){
  const wrap=$('#reviewsWrap');
  if(!wrap) return;
  const rs=Reviews.forProduct(pid);
  const avg=Reviews.avgRating(pid);
  const countEl=$('#revCount');
  if(countEl) countEl.textContent=rs.length;
  const avgEl=$('#revAvg');
  if(avgEl) avgEl.textContent=avg?avg.toFixed(1):'-';
  const starsWrap=$('#revStars');
  if(starsWrap){ starsWrap.innerHTML=''; for(let i=1;i<=5;i++){const s=document.createElement('span');s.className='rb-star';s.textContent=i<=Math.round(avg)?'★':'☆';starsWrap.appendChild(s);} }
  const list=$('#reviewsList');
  if(!list) return;
  if(!rs.length){
    list.innerHTML=`<div class="no-reviews"><div class="no-reviews-icon">★</div><p>Nenhuma avaliação ainda para este produto.<br>As avaliações aparecem após a compra.</p></div>`;
    return;
  }
  list.innerHTML='';
  rs.forEach(r=>{
    const initials=(r.name||'UV').split(' ').map(w=>w[0]).slice(0,2).join('').toUpperCase();
    const div=document.createElement('div');
    div.className='review-card';
    div.innerHTML=`
      <div class="rc-header">
        <div class="rc-author"><div class="rc-avatar">${initials}</div><div><div class="rc-name">${esc(r.name)}</div><div class="rc-date">${new Date(r.date).toLocaleDateString('pt-BR')}</div></div></div>
        <div class="rc-stars">${'<span class="rc-star">★</span>'.repeat(r.rating)+'<span class="rc-star" style="opacity:.2">★</span>'.repeat(5-r.rating)}</div>
      </div>
      <p class="rc-text">"${esc(r.comment)}"</p>`;
    list.appendChild(div);
  });
}

/* ──────────────────────────────────────────────────────────
   ═══════════════════════════════════════════════════════
   PAGAMENTO PAGE
   ═══════════════════════════════════════════════════════
────────────────────────────────────────────────────────── */
function initPagamentoPage(){
  const items=Cart.items;
  if(!items.length){ window.location.href='produtos.html'; return; }

  // Render summary
  renderCheckoutSummary();

  // Payment methods
  $$('.payment-method').forEach(pm=>{
    on(pm,'click',()=>{
      $$('.payment-method').forEach(x=>x.classList.remove('active'));
      pm.classList.add('active');
      const method=pm.dataset.method;
      const pixBox=$('#pixBox');
      if(pixBox) pixBox.classList.toggle('show',method==='pix');
    });
  });
  // Select first by default
  const firstPm=$('.payment-method');
  if(firstPm){ firstPm.classList.add('active'); const pb=$('#pixBox'); if(pb) pb.classList.toggle('show',firstPm.dataset.method==='pix'); }

  // Pix key & copy
  const pixKeyEl=$('#pixKey');
  if(pixKeyEl) pixKeyEl.textContent=PIX_KEY;
  on($('#copyPixBtn'),'click',()=>{
    navigator.clipboard.writeText(PIX_KEY).then(()=>showToast('Chave Pix copiada! ✓','success')).catch(()=>{ const ta=document.createElement('textarea'); ta.value=PIX_KEY; document.body.appendChild(ta); ta.select(); document.execCommand('copy'); document.body.removeChild(ta); showToast('Chave Pix copiada! ✓','success'); });
  });

  // CEP auto (simulado)
  const cepEl=$('#fCep');
  if(cepEl){ on(cepEl,'blur',e=>{ const cep=e.target.value.replace(/\D/g,''); if(cep.length===8) simulateCEP(cep); }); }

  // Submit
  const form=$('#paymentForm');
  on(form,'submit',e=>{ e.preventDefault(); handlePaymentSubmit(form); });

  // Máscaras
  maskPhone('#fWpp');
  maskCPF('#fCpf');
  maskCEP('#fCep');
}

function renderCheckoutSummary(){
  const items=Cart.items;
  const listEl=$('#csSummaryItems');
  if(listEl){
    listEl.innerHTML='';
    items.forEach(i=>{
      const row=document.createElement('div');
      row.className='cs-item-row';
      row.innerHTML=`<div class="cs-item-info"><div class="cs-item-name">${esc(i.name)}</div><div class="cs-item-detail">Tam: ${esc(i.size)} · Qtd: ${i.qty}</div></div><div class="cs-item-price">${fmt(i.price*i.qty)}</div>`;
      listEl.appendChild(row);
    });
  }
  const subtotal=Cart.total();
  const shipping=subtotal>=299?0:19.90;
  const total=subtotal+shipping;
  const set=(id,v)=>{ const el=$(id); if(el) el.textContent=v; };
  set('#csSubtotalVal',fmt(subtotal));
  set('#csShippingVal',shipping===0?'Grátis':fmt(shipping));
  set('#csTotalVal',fmt(total));
  set('#csTotalBottom',fmt(total));
  if($('#csShippingVal')&&shipping===0) $('#csShippingVal').style.color='var(--wpp-green)';
}

function handlePaymentSubmit(form){
  const required=$$('[required]',form);
  let valid=true;
  required.forEach(f=>{ f.classList.remove('error'); if(!f.value.trim()){ f.classList.add('error'); valid=false; } });
  const activePm=$('.payment-method.active');
  if(!activePm){ showToast('Selecione a forma de pagamento.','error'); return; }
  if(!valid){ showToast('Preencha todos os campos obrigatórios.','error'); return; }

  const fd=new FormData(form);
  const name=fd.get('name')||'';
  const wpp=fd.get('whatsapp')||'';
  const email=fd.get('email')||'';
  const cep=fd.get('cep')||'';
  const rua=fd.get('rua')||'';
  const num=fd.get('numero')||'';
  const bairro=fd.get('bairro')||'';
  const cidade=fd.get('cidade')||'';
  const estado=fd.get('estado')||'';
  const comp=fd.get('complemento')||'';
  const notes=fd.get('notes')||'';
  const payment=activePm.dataset.method==='pix'?'PIX':activePm.dataset.method==='card'?'Cartão de crédito':'Dinheiro/Combinar';

  const items=Cart.items;
  const subtotal=Cart.total();
  const shipping=subtotal>=299?0:19.90;
  const total=subtotal+shipping;

  // Save order
  const orderData={ userEmail:email, name, whatsapp:wpp, address:`${rua}, ${num}${comp?', '+comp:''} - ${bairro}, ${cidade}/${estado}, CEP ${cep}`, payment, notes, items:[...items], subtotal, shipping, total };
  const orderId=Orders.add(orderData);

  // WhatsApp message
  let msg=`🛍️ *NOVO PEDIDO — URBAN V*\n`;
  msg+=`📋 *Pedido:* ${orderId}\n\n`;
  msg+=`👤 *Nome:* ${name}\n`;
  msg+=`📱 *WhatsApp:* ${wpp}\n`;
  if(email) msg+=`📧 *E-mail:* ${email}\n`;
  msg+=`\n📍 *Endereço:*\n${rua}, ${num}${comp?', '+comp:''}\n${bairro} — ${cidade}/${estado}\nCEP: ${cep}\n\n`;
  msg+=`📦 *Produtos:*\n`;
  items.forEach(i=>{ msg+=`• ${i.name} (${i.size}) x${i.qty} — ${fmt(i.price*i.qty)}\n`; });
  msg+=`\n💰 *Subtotal:* ${fmt(subtotal)}\n`;
  msg+=`🚚 *Frete:* ${shipping===0?'Grátis':fmt(shipping)}\n`;
  msg+=`💳 *Total:* ${fmt(total)}\n`;
  msg+=`💳 *Pagamento:* ${payment}\n`;
  if(notes) msg+=`\n📝 *Observações:* ${notes}`;
  if(payment==='PIX') msg+=`\n\n✅ *Após o PIX, envie o comprovante neste WhatsApp.*`;

  Cart.clear();
  window.open(`https://wa.me/${WPP}?text=${encodeURIComponent(msg)}`,'_blank','noopener,noreferrer');
  showToast('Pedido enviado! Abrindo WhatsApp... ✅','success');

  // Redirect to success state
  setTimeout(()=>{ window.location.href=`conta.html`; },2000);
}

function simulateCEP(cep){
  const set=(id,v)=>{ const el=$(id); if(el&&!el.value) el.value=v; };
  // Simulate — in production call ViaCEP API
  set('#fBairro','Centro'); set('#fCidade','São Paulo'); set('#fEstado','SP');
  showToast('CEP localizado!','success');
}

function maskPhone(sel){ const el=$(sel); if(!el) return; on(el,'input',()=>{ let v=el.value.replace(/\D/g,''); if(v.length>11)v=v.slice(0,11); if(v.length>6) v=v.replace(/^(\d{2})(\d{5})(\d)/,'($1) $2-$3'); else if(v.length>2) v=v.replace(/^(\d{2})(\d)/,'($1) $2'); el.value=v; }); }
function maskCPF(sel){ const el=$(sel); if(!el) return; on(el,'input',()=>{ let v=el.value.replace(/\D/g,'').slice(0,11); if(v.length>9)v=v.replace(/^(\d{3})(\d{3})(\d{3})(\d)/,'$1.$2.$3-$4'); else if(v.length>6)v=v.replace(/^(\d{3})(\d{3})(\d)/,'$1.$2.$3'); else if(v.length>3)v=v.replace(/^(\d{3})(\d)/,'$1.$2'); el.value=v; }); }
function maskCEP(sel){ const el=$(sel); if(!el) return; on(el,'input',()=>{ let v=el.value.replace(/\D/g,'').slice(0,8); if(v.length>5)v=v.replace(/^(\d{5})(\d)/,'$1-$2'); el.value=v; }); }

/* ──────────────────────────────────────────────────────────
   ═══════════════════════════════════════════════════════
   LOGIN PAGE
   ═══════════════════════════════════════════════════════
────────────────────────────────────────────────────────── */
function initLoginPage(){
  if(Auth.isLogged()){ window.location.href='conta.html'; return; }

  // Tabs
  $$('.auth-tab').forEach(tab=>{
    on(tab,'click',()=>{
      $$('.auth-tab').forEach(t=>t.classList.remove('active'));
      $$('.auth-form').forEach(f=>f.classList.remove('active'));
      tab.classList.add('active');
      const target=$(tab.dataset.target);
      if(target) target.classList.add('active');
    });
  });

  // Login form
  on($('#loginForm'),'submit',e=>{
    e.preventDefault();
    const email=$('#lEmail').value.trim();
    const pass=$('#lPass').value;
    const res=Auth.login(email,pass);
    if(res.ok){ showToast('Bem-vindo de volta!','success'); setTimeout(()=>window.location.href='conta.html',800); }
    else showToast(res.msg,'error');
  });

  // Register form
  on($('#registerForm'),'submit',e=>{
    e.preventDefault();
    const name=$('#rName').value.trim();
    const email=$('#rEmail').value.trim();
    const wpp=$('#rWpp').value.trim();
    const pass=$('#rPass').value;
    const pass2=$('#rPass2').value;
    if(!name||!email||!pass){ showToast('Preencha todos os campos.','error'); return; }
    if(pass.length<6){ showToast('Senha deve ter pelo menos 6 caracteres.','error'); return; }
    if(pass!==pass2){ showToast('Senhas não coincidem.','error'); return; }
    const res=Auth.register(name,email,wpp,pass);
    if(res.ok){ Auth.login(email,pass); showToast('Conta criada! Bem-vindo à Urban V 🔥','success'); setTimeout(()=>window.location.href='conta.html',900); }
    else showToast(res.msg,'error');
  });

  // Forgot password (simulado)
  on($('#forgotLink'),'click',()=>{ showToast('Recuperação de senha: entre em contato via WhatsApp.'); window.open(`https://wa.me/${WPP}?text=${encodeURIComponent('Olá! Preciso recuperar minha senha da Urban V.')}`, '_blank','noopener,noreferrer'); });

  maskPhone('#rWpp');
}

/* ──────────────────────────────────────────────────────────
   ═══════════════════════════════════════════════════════
   CONTA PAGE
   ═══════════════════════════════════════════════════════
────────────────────────────────────────────────────────── */
function initContaPage(){
  if(!Auth.isLogged()){ window.location.href='login.html'; return; }
  const user=Auth.currentUser();
  if(!user){ Auth.logout(); window.location.href='login.html'; return; }

  // Header
  const initials=user.name.split(' ').map(w=>w[0]).slice(0,2).join('').toUpperCase();
  const setText=(id,t)=>{ const el=$(id); if(el) el.textContent=t; };
  setText('#accountName',user.name);
  setText('#accountEmail',user.email);
  setText('#accountInitials',initials);
  setText('#uiName',user.name);
  setText('#uiEmail',user.email);
  setText('#uiWpp',user.whatsapp||'—');
  setText('#uiDate',new Date(user.createdAt).toLocaleDateString('pt-BR'));

  // Nav
  $$('.account-nav-link').forEach(link=>{
    on(link,'click',()=>{
      $$('.account-nav-link').forEach(l=>l.classList.remove('active'));
      $$('.account-panel').forEach(p=>p.classList.remove('active'));
      link.classList.add('active');
      const target=$(link.dataset.target);
      if(target) target.classList.add('active');
    });
  });

  // Logout
  on($('#logoutBtn'),'click',()=>{ Auth.logout(); window.location.href='index.html'; });

  // Orders
  renderMyOrders();

  // Support
  on($('#supportBtn'),'click',()=>{ window.open(`https://wa.me/${WPP}?text=${encodeURIComponent('Olá! Preciso de suporte na Urban V.')}`, '_blank','noopener,noreferrer'); });

  // Review modal
  initReviewModal(user);
}

function renderMyOrders(){
  const wrap=$('#ordersList');
  if(!wrap) return;
  const orders=Orders.mine();
  if(!orders.length){
    wrap.innerHTML=`<div class="no-orders"><div class="no-orders-icon">📦</div><p>Você ainda não fez pedidos.<br><a href="produtos.html" style="color:var(--accent-primary)">Ir às compras →</a></p></div>`;
    return;
  }
  wrap.innerHTML='';
  orders.forEach(o=>{
    const card=document.createElement('div');
    card.className='order-card';
    const statusMap={pending:'AGUARDANDO PAGAMENTO',confirmed:'CONFIRMADO',shipped:'ENVIADO',done:'ENTREGUE',canceled:'CANCELADO'};
    const statusCls={pending:'pending',confirmed:'done',shipped:'done',done:'done',canceled:'canceled'};
    const itemsText=o.items.map(i=>`${i.name} (${i.size}) ×${i.qty}`).join(', ');
    card.innerHTML=`
      <div class="oc-header">
        <div>
          <div class="oc-id">#${o.id}</div>
          <div class="oc-date">${new Date(o.date).toLocaleDateString('pt-BR')} às ${new Date(o.date).toLocaleTimeString('pt-BR',{hour:'2-digit',minute:'2-digit'})}</div>
        </div>
        <span class="oc-status ${statusCls[o.status]||'pending'}">${statusMap[o.status]||'AGUARDANDO'}</span>
      </div>
      <div class="oc-items">${esc(itemsText)}</div>
      <div class="oc-footer">
        <span class="oc-total">${fmt(o.total)}</span>
        <div style="display:flex;gap:8px;flex-wrap:wrap">
          <button class="btn btn-wpp btn-sm review-trigger" data-order='${JSON.stringify(o).replace(/'/g,"\\'")}' style="gap:6px">Avaliar compra</button>
          <a href="https://wa.me/${WPP}?text=${encodeURIComponent(`Olá! Quero verificar o status do pedido #${o.id}`)}" target="_blank" class="btn btn-outline btn-sm">Status no WhatsApp</a>
        </div>
      </div>`;
    wrap.appendChild(card);
  });
  // Bind review triggers
  $$('.review-trigger').forEach(btn=>{
    on(btn,'click',()=>{ try{ openReviewModal(JSON.parse(btn.dataset.order)); }catch{} });
  });
}

let reviewOrder=null;
function initReviewModal(user){
  const overlay=$('#reviewOverlay');
  const modal=$('#reviewModal');
  const closeBtn=$('#rmClose');
  on(closeBtn,'click',closeReviewModal);
  on(overlay,'click',closeReviewModal);
  // Stars
  let selectedRating=0;
  $$('.star-pick').forEach(star=>{
    on(star,'mouseover',()=>{ const r=+star.dataset.val; $$('.star-pick').forEach((s,i)=>{ s.classList.toggle('active',i<r); }); });
    on(star,'click',()=>{ selectedRating=+star.dataset.val; $$('.star-pick').forEach((s,i)=>{ s.classList.toggle('active',i<selectedRating); }); });
    on($('#starPicker'),'mouseleave',()=>{ $$('.star-pick').forEach((s,i)=>{ s.classList.toggle('active',i<selectedRating); }); });
  });
  // Submit
  on($('#reviewForm'),'submit',e=>{
    e.preventDefault();
    if(!selectedRating){ showToast('Selecione uma nota.','error'); return; }
    const comment=$('#reviewComment').value.trim();
    if(!comment){ showToast('Escreva um comentário.','error'); return; }
    if(!reviewOrder) return;
    // Save one review per product in order
    reviewOrder.items.forEach(item=>{
      Reviews.add({ productId:item.id, productName:item.name, orderId:reviewOrder.id, userEmail:user.email, name:user.name, rating:selectedRating, comment });
    });
    closeReviewModal();
    showToast('Avaliação enviada! Obrigado 🙌','success');
    renderMyOrders();
  });
}

function openReviewModal(order){
  reviewOrder=order;
  const names=$('#reviewProductName');
  if(names) names.textContent=order.items.map(i=>i.name).join(', ');
  $('#reviewOverlay')&&$('#reviewOverlay').classList.add('active');
  $('#reviewModal')&&$('#reviewModal').classList.add('active');
  document.body.style.overflow='hidden';
}
function closeReviewModal(){
  $('#reviewOverlay')&&$('#reviewOverlay').classList.remove('active');
  $('#reviewModal')&&$('#reviewModal').classList.remove('active');
  document.body.style.overflow='';
}

/* ──────────────────────────────────────────────────────────
   PAGE TRANSITION
────────────────────────────────────────────────────────── */
function initPageTransition(){
  const overlay=document.createElement('div');
  overlay.className='page-transition';
  overlay.id='pageTransition';
  document.body.appendChild(overlay);
  $$('a[href]').forEach(a=>{
    const href=a.getAttribute('href');
    if(!href||href.startsWith('#')||href.startsWith('http')||href.startsWith('mailto')||href.startsWith('tel')||href.endsWith('.json')) return;
    on(a,'click',e=>{
      e.preventDefault();
      overlay.classList.add('out');
      setTimeout(()=>window.location.href=href, 350);
    });
  });
}

/* ──────────────────────────────────────────────────────────
   MAIN INIT
────────────────────────────────────────────────────────── */
async function init(){
  if(typeof gsap!=='undefined'&&typeof ScrollTrigger!=='undefined') gsap.registerPlugin(ScrollTrigger);

  // Global init
  initHeader();
  initMobileMenu();
  initCursor();
  initSmoothScroll();
  initScrollReveal();
  initSplitWords();
  initCartUI();
  updateBadge();
  initPageTransition();

  // Detect page
  const path=window.location.pathname;
  const page=path.split('/').pop()||'index.html';

  if(page===''||page==='index.html'||path==='/'||path.endsWith('/')){
    document.body.classList.add('loading');
    await initIndexPage();
  } else if(page==='produtos.html'){
    await initProdutosPage();
  } else if(page==='produto.html'){
    await initProdutoPage();
  } else if(page==='pagamento.html'){
    initPagamentoPage();
  } else if(page==='login.html'){
    initLoginPage();
  } else if(page==='conta.html'){
    initContaPage();
  }
}

if(document.readyState==='loading') document.addEventListener('DOMContentLoaded',init);
else init();
