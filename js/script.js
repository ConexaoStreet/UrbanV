/* ============================================================
   URBAN V — js/script.js
   Premium Streetwear Experience
   ============================================================ */

(function () {
  'use strict';

  /* ──────────────────────────────────────────────
     CONSTANTS
  ────────────────────────────────────────────── */
  const WPP_NUMBER = '5511919730067';
  const PRODUCTS_PATH = 'products.json';

  /* ──────────────────────────────────────────────
     STATE
  ────────────────────────────────────────────── */
  let cart = [];
  let products = [];
  let currentFilter = 'all';
  let testimonialIndex = 0;
  let testimonialTotal = 0;
  let introComplete = false;

  /* ──────────────────────────────────────────────
     DOM HELPERS
  ────────────────────────────────────────────── */
  const $ = (sel, ctx = document) => ctx.querySelector(sel);
  const $$ = (sel, ctx = document) => [...ctx.querySelectorAll(sel)];
  const on = (el, ev, fn, opts) => el && el.addEventListener(ev, fn, opts);

  /* ──────────────────────────────────────────────
     1 & 2. INTRO CINEMATOGRÁFICA + CANVAS
  ────────────────────────────────────────────── */
  function initIntro() {
    const intro = $('#intro');
    const canvas = $('#introCanvas');
    if (!intro || !canvas) { finishIntro(); return; }

    const ctx = canvas.getContext('2d');
    let W, H, particles, raf;

    function resize() {
      W = canvas.width = window.innerWidth;
      H = canvas.height = window.innerHeight;
    }
    resize();
    on(window, 'resize', resize);

    /* Particles */
    function makeParticle() {
      return {
        x: Math.random() * W,
        y: Math.random() * H,
        vx: (Math.random() - 0.5) * 0.4,
        vy: (Math.random() - 0.5) * 0.4,
        size: Math.random() * 1.5 + 0.3,
        alpha: Math.random() * 0.6 + 0.1,
        color: Math.random() > 0.85 ? '#39FF14' : '#ffffff',
      };
    }

    const COUNT = window.innerWidth < 768 ? 60 : 120;
    particles = Array.from({ length: COUNT }, makeParticle);

    /* Lines */
    const lines = Array.from({ length: 8 }, () => ({
      x: Math.random() * W,
      y: Math.random() * H,
      len: Math.random() * 120 + 40,
      angle: Math.random() * Math.PI,
      alpha: Math.random() * 0.12 + 0.03,
      speed: (Math.random() - 0.5) * 0.5,
    }));

    function drawFrame() {
      ctx.clearRect(0, 0, W, H);

      /* Grid */
      ctx.strokeStyle = 'rgba(255,255,255,0.025)';
      ctx.lineWidth = 0.5;
      const step = 60;
      for (let x = 0; x < W; x += step) {
        ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x, H); ctx.stroke();
      }
      for (let y = 0; y < H; y += step) {
        ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(W, y); ctx.stroke();
      }

      /* Lines */
      lines.forEach(l => {
        l.x += Math.cos(l.angle) * l.speed;
        l.y += Math.sin(l.angle) * l.speed;
        if (l.x < -200) l.x = W + 100;
        if (l.x > W + 200) l.x = -100;
        if (l.y < -200) l.y = H + 100;
        if (l.y > H + 200) l.y = -100;
        ctx.save();
        ctx.globalAlpha = l.alpha;
        ctx.strokeStyle = '#39FF14';
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.moveTo(l.x, l.y);
        ctx.lineTo(l.x + Math.cos(l.angle) * l.len, l.y + Math.sin(l.angle) * l.len);
        ctx.stroke();
        ctx.restore();
      });

      /* Particles */
      particles.forEach(p => {
        p.x += p.vx; p.y += p.vy;
        if (p.x < 0) p.x = W;
        if (p.x > W) p.x = 0;
        if (p.y < 0) p.y = H;
        if (p.y > H) p.y = 0;
        ctx.save();
        ctx.globalAlpha = p.alpha;
        ctx.fillStyle = p.color;
        if (p.color === '#39FF14') {
          ctx.shadowColor = '#39FF14';
          ctx.shadowBlur = 6;
        }
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      });

      raf = requestAnimationFrame(drawFrame);
    }
    drawFrame();

    /* GSAP timeline */
    const letters = $$('.intro-brand span');
    const tag = $('.intro-tag');
    const loaderWrap = $('.intro-loader');
    const loaderBar = $('.intro-loader-bar');

    const tl = gsap.timeline({ onComplete: finishIntro });

    tl.to(letters, {
      opacity: 1, y: 0, skewY: 0,
      duration: 0.7, stagger: 0.06,
      ease: 'power4.out',
    })
    .to(tag, { opacity: 1, y: 0, duration: 0.5, ease: 'power3.out' }, '-=0.3')
    .to(loaderWrap, { opacity: 1, duration: 0.3 }, '-=0.2')
    .to(loaderBar, { width: '100%', duration: 1.4, ease: 'power2.inOut' }, '-=0.1')
    .to([letters, tag, loaderWrap], {
      opacity: 0, y: -40, duration: 0.5, stagger: 0.04, ease: 'power3.in',
    }, '+=0.2')
    .to(intro, {
      opacity: 0, duration: 0.6, ease: 'power2.inOut',
      onComplete: () => {
        cancelAnimationFrame(raf);
        intro.style.display = 'none';
      },
    }, '-=0.2');
  }

  /* 3. REMOVE loading APÓS INTRO */
  function finishIntro() {
    if (introComplete) return;
    introComplete = true;
    document.body.classList.remove('loading');
    initHeroAnimations();
    initScrollAnimations();
    initHeroCanvas();
    initVCanvas();
    setTimeout(() => {
      const scrollEl = $('.hero-scroll');
      if (scrollEl) gsap.to(scrollEl, { opacity: 1, duration: 1, ease: 'power2.out' });
    }, 800);
  }

  /* ──────────────────────────────────────────────
     4. HEADER SCROLL
  ────────────────────────────────────────────── */
  function initHeader() {
    const header = $('#header');
    if (!header) return;
    const onScroll = () => {
      header.classList.toggle('scrolled', window.scrollY > 40);
    };
    on(window, 'scroll', onScroll, { passive: true });
    onScroll();
  }

  /* ──────────────────────────────────────────────
     5 & 6. MENU MOBILE
  ────────────────────────────────────────────── */
  function initMobileMenu() {
    const ham = $('#hamburger');
    const menu = $('#mobileMenu');
    if (!ham || !menu) return;

    function toggle(force) {
      const open = force !== undefined ? force : !ham.classList.contains('active');
      ham.classList.toggle('active', open);
      menu.classList.toggle('active', open);
      document.body.classList.toggle('menu-open', open);
      ham.setAttribute('aria-expanded', open);
    }

    on(ham, 'click', () => toggle());

    $$('.mm-link', menu).forEach(link => {
      on(link, 'click', () => {
        toggle(false);
      });
    });

    on(document, 'keydown', e => {
      if (e.key === 'Escape' && menu.classList.contains('active')) toggle(false);
    });
  }

  /* ──────────────────────────────────────────────
     7. CURSOR CUSTOMIZADO
  ────────────────────────────────────────────── */
  function initCursor() {
    const cursor = $('#cursor');
    const trail = $('#cursorTrail');
    if (!cursor || !trail || window.matchMedia('(hover: none)').matches) return;

    let mx = -100, my = -100, tx = -100, ty = -100;

    on(document, 'mousemove', e => {
      mx = e.clientX; my = e.clientY;
      gsap.to(cursor, { x: mx, y: my, duration: 0.05, ease: 'none' });
    });

    function animTrail() {
      tx += (mx - tx) * 0.12;
      ty += (my - ty) * 0.12;
      gsap.set(trail, { x: tx, y: ty });
      requestAnimationFrame(animTrail);
    }
    animTrail();

    const hoverEls = 'a, button, .product-card, .drop-card, .filter, .lb-visual';
    on(document, 'mouseover', e => {
      if (e.target.closest(hoverEls)) {
        trail.classList.add('hovering');
      }
    });
    on(document, 'mouseout', e => {
      if (e.target.closest(hoverEls)) {
        trail.classList.remove('hovering');
      }
    });
  }

  /* ──────────────────────────────────────────────
     8. SCROLL ANIMATIONS (data-aos)
  ────────────────────────────────────────────── */
  function initScrollAnimations() {
    const items = $$('[data-aos]');
    if (!items.length) return;

    const obs = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const el = entry.target;
          const delay = el.dataset.aosDelay || 0;
          setTimeout(() => el.classList.add('in-view'), Number(delay));
          obs.unobserve(el);
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

    items.forEach(el => obs.observe(el));

    /* reveal-text */
    const revealEls = $$('.reveal-text');
    const revObs = new IntersectionObserver(entries => {
      entries.forEach(e => {
        if (e.isIntersecting) {
          gsap.to(e.target, { opacity: 1, y: 0, duration: 0.7, ease: 'power3.out' });
          revObs.unobserve(e.target);
        }
      });
    }, { threshold: 0.2 });
    revealEls.forEach(el => revObs.observe(el));
  }

  /* ──────────────────────────────────────────────
     9. SPLIT WORDS REVEAL
  ────────────────────────────────────────────── */
  function initSplitWords() {
    $$('.split-words').forEach(el => {
      const html = el.innerHTML;
      /* wrap each word but preserve spans like .accent-text */
      el.innerHTML = html.replace(/(<[^>]+>.*?<\/[^>]+>|[^\s<]+)/g, match => {
        if (match.startsWith('<')) return match;
        return `<span class="word"><span class="word-inner">${match}</span></span>`;
      });
    });

    const obs = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        const inners = $$('.word-inner', entry.target);
        gsap.to(inners, {
          y: 0, duration: 0.9, stagger: 0.06, ease: 'power4.out',
        });
        obs.unobserve(entry.target);
      });
    }, { threshold: 0.2 });

    $$('.split-words').forEach(el => obs.observe(el));
  }

  /* ──────────────────────────────────────────────
     10. HERO GSAP ANIMATIONS
  ────────────────────────────────────────────── */
  function initHeroAnimations() {
    const tl = gsap.timeline({ delay: 0.1 });

    tl.to('.hero-eyebrow', { opacity: 1, duration: 0.6, ease: 'power3.out' })
      .to('.ht-1', { y: 0, opacity: 1, duration: 0.8, ease: 'power4.out' }, '-=0.3')
      .to('.ht-2', { y: 0, opacity: 1, duration: 0.8, ease: 'power4.out' }, '-=0.6')
      .to('.ht-3', { y: 0, opacity: 1, duration: 0.8, ease: 'power4.out' }, '-=0.6')
      .to('.hero-sub',     { opacity: 1, y: 0, duration: 0.6, ease: 'power3.out' }, '-=0.4')
      .to('.hero-actions', { opacity: 1, y: 0, duration: 0.6, ease: 'power3.out' }, '-=0.4')
      .to('.hero-stats',   { opacity: 1, y: 0, duration: 0.6, ease: 'power3.out' }, '-=0.3');

    /* ScrollTrigger para parallax do hero */
    if (typeof ScrollTrigger !== 'undefined') {
      gsap.registerPlugin(ScrollTrigger);

      gsap.to('.hero-content', {
        yPercent: 20, ease: 'none',
        scrollTrigger: {
          trigger: '.hero',
          start: 'top top',
          end: 'bottom top',
          scrub: true,
        },
      });

      /* Drops section entrance */
      gsap.utils.toArray('.drop-card').forEach((card, i) => {
        gsap.from(card, {
          opacity: 0, y: 60, duration: 0.8,
          delay: i * 0.1, ease: 'power3.out',
          scrollTrigger: {
            trigger: card,
            start: 'top 88%',
            toggleActions: 'play none none none',
          },
        });
      });

      /* Product cards */
      ScrollTrigger.create({
        trigger: '.products-section',
        start: 'top 80%',
        onEnter: () => animateProductCards(),
      });

      /* Pillars */
      gsap.utils.toArray('.pillar').forEach((el, i) => {
        gsap.from(el, {
          opacity: 0, x: -30, duration: 0.6, delay: i * 0.12, ease: 'power3.out',
          scrollTrigger: { trigger: el, start: 'top 90%' },
        });
      });

      /* Stats in lookbook */
      gsap.utils.toArray('.lb-stat').forEach((el, i) => {
        gsap.from(el, {
          opacity: 0, y: 20, duration: 0.5, delay: i * 0.1, ease: 'power3.out',
          scrollTrigger: { trigger: el, start: 'top 90%' },
        });
      });
    }
  }

  function animateProductCards() {
    const cards = $$('.product-card:not(.hidden)');
    gsap.from(cards, {
      opacity: 0, y: 50, scale: 0.96,
      duration: 0.6, stagger: 0.08, ease: 'power3.out',
    });
  }

  /* ──────────────────────────────────────────────
     11. HERO CANVAS PARTICLES
  ────────────────────────────────────────────── */
  function initHeroCanvas() {
    const canvas = $('#heroCanvas');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let W, H, pts, animId;
    const isMobile = window.innerWidth < 768;
    const COUNT = isMobile ? 30 : 70;

    function resize() {
      W = canvas.width = canvas.offsetWidth;
      H = canvas.height = canvas.offsetHeight;
    }
    resize();
    on(window, 'resize', () => { resize(); buildPts(); });

    function buildPts() {
      pts = Array.from({ length: COUNT }, () => ({
        x: Math.random() * W, y: Math.random() * H,
        vx: (Math.random() - 0.5) * 0.3,
        vy: (Math.random() - 0.5) * 0.3,
        size: Math.random() * 1.2 + 0.2,
        alpha: Math.random() * 0.3 + 0.05,
        green: Math.random() > 0.9,
      }));
    }
    buildPts();

    let mx = W / 2, my = H / 2;
    on(window, 'mousemove', e => {
      const r = canvas.getBoundingClientRect();
      mx = e.clientX - r.left;
      my = e.clientY - r.top;
    });

    function draw() {
      ctx.clearRect(0, 0, W, H);
      pts.forEach((p, i) => {
        /* subtle mouse repulsion */
        const dx = mx - p.x, dy = my - p.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 120) {
          p.vx -= (dx / dist) * 0.02;
          p.vy -= (dy / dist) * 0.02;
        }
        p.vx *= 0.99; p.vy *= 0.99;
        p.x += p.vx; p.y += p.vy;
        if (p.x < 0) p.x = W; if (p.x > W) p.x = 0;
        if (p.y < 0) p.y = H; if (p.y > H) p.y = 0;

        /* connect nearby */
        for (let j = i + 1; j < pts.length; j++) {
          const q = pts[j];
          const d = Math.hypot(p.x - q.x, p.y - q.y);
          if (d < 100) {
            ctx.save();
            ctx.globalAlpha = (1 - d / 100) * 0.06;
            ctx.strokeStyle = '#ffffff';
            ctx.lineWidth = 0.5;
            ctx.beginPath(); ctx.moveTo(p.x, p.y); ctx.lineTo(q.x, q.y); ctx.stroke();
            ctx.restore();
          }
        }

        ctx.save();
        ctx.globalAlpha = p.alpha;
        ctx.fillStyle = p.green ? '#39FF14' : '#ffffff';
        if (p.green) { ctx.shadowColor = '#39FF14'; ctx.shadowBlur = 8; }
        ctx.beginPath(); ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2); ctx.fill();
        ctx.restore();
      });
      animId = requestAnimationFrame(draw);
    }
    draw();
  }

  /* ──────────────────────────────────────────────
     12. V CANVAS (HERO 3D VISUAL)
  ────────────────────────────────────────────── */
  function initVCanvas() {
    const canvas = $('#vCanvas');
    if (!canvas || window.innerWidth < 900) return;
    const ctx = canvas.getContext('2d');
    let W, H, angle = 0, animId;

    function resize() {
      W = canvas.width = canvas.offsetWidth;
      H = canvas.height = canvas.offsetHeight;
    }
    resize();
    on(window, 'resize', resize);

    /* Build V shape vertices */
    function getVPts(cx, cy, size, rot) {
      const pts = [];
      const arms = [
        { x: -0.5, y: -0.5 }, { x: 0, y: 0.5 }, { x: 0.5, y: -0.5 },
      ];
      arms.forEach(p => {
        const rx = p.x * Math.cos(rot) - p.y * Math.sin(rot);
        const ry = p.x * Math.sin(rot) + p.y * Math.cos(rot);
        pts.push({ x: cx + rx * size, y: cy + ry * size });
      });
      return pts;
    }

    let mx = 0, my = 0;
    on(window, 'mousemove', e => {
      const r = canvas.getBoundingClientRect();
      mx = ((e.clientX - r.left) / W - 0.5) * 0.3;
      my = ((e.clientY - r.top) / H - 0.5) * 0.3;
    });

    function draw() {
      ctx.clearRect(0, 0, W, H);
      angle += 0.008;
      const cx = W / 2, cy = H / 2;
      const size = Math.min(W, H) * 0.35;
      const rot = angle + mx;

      /* Outer glow rings */
      for (let r = 0; r < 4; r++) {
        const radius = size * (0.6 + r * 0.18);
        const alpha = 0.04 - r * 0.008;
        ctx.save();
        ctx.strokeStyle = '#39FF14';
        ctx.globalAlpha = alpha;
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.arc(cx, cy, radius, 0, Math.PI * 2);
        ctx.stroke();
        ctx.restore();
      }

      /* Orbit dots */
      for (let i = 0; i < 8; i++) {
        const a = (i / 8) * Math.PI * 2 + angle * 0.5;
        const r = size * 0.75;
        const ox = cx + Math.cos(a) * r;
        const oy = cy + Math.sin(a) * r;
        ctx.save();
        ctx.globalAlpha = 0.25;
        ctx.fillStyle = i % 3 === 0 ? '#39FF14' : 'rgba(255,255,255,0.6)';
        if (i % 3 === 0) { ctx.shadowColor = '#39FF14'; ctx.shadowBlur = 10; }
        ctx.beginPath(); ctx.arc(ox, oy, i % 3 === 0 ? 3 : 1.5, 0, Math.PI * 2); ctx.fill();
        ctx.restore();
      }

      /* Grid lines through center */
      [-0.4, -0.2, 0, 0.2, 0.4].forEach(t => {
        const ox = cx + Math.cos(rot + Math.PI / 2) * t * size * 2;
        const oy = cy + Math.sin(rot + Math.PI / 2) * t * size * 2;
        ctx.save();
        ctx.globalAlpha = 0.04;
        ctx.strokeStyle = '#39FF14';
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.moveTo(ox - Math.cos(rot) * size * 2, oy - Math.sin(rot) * size * 2);
        ctx.lineTo(ox + Math.cos(rot) * size * 2, oy + Math.sin(rot) * size * 2);
        ctx.stroke();
        ctx.restore();
      });

      /* V letter rendered as font on canvas */
      ctx.save();
      ctx.translate(cx + mx * 60, cy + my * 40);
      ctx.rotate(Math.sin(angle * 0.5) * 0.05);

      /* Shadow layers for depth */
      for (let i = 4; i >= 0; i--) {
        ctx.save();
        ctx.shadowColor = '#39FF14';
        ctx.shadowBlur = 40 + i * 20;
        ctx.font = `bold ${size * 1.6}px 'Bebas Neue', sans-serif`;
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.globalAlpha = 0.04 - i * 0.005;
        ctx.fillStyle = '#39FF14';
        ctx.fillText('V', 0, 0);
        ctx.restore();
      }

      /* Main V */
      ctx.shadowColor = '#39FF14';
      ctx.shadowBlur = 30;
      ctx.font = `bold ${size * 1.6}px 'Bebas Neue', sans-serif`;
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';

      /* Gradient fill */
      const grad = ctx.createLinearGradient(0, -size * 0.8, 0, size * 0.8);
      grad.addColorStop(0, 'rgba(255,255,255,0.9)');
      grad.addColorStop(0.4, 'rgba(57,255,20,0.7)');
      grad.addColorStop(1, 'rgba(57,255,20,0.1)');
      ctx.fillStyle = grad;
      ctx.globalAlpha = 0.85;
      ctx.fillText('V', 0, 0);

      /* Scanlines overlay on V */
      ctx.globalAlpha = 0.06;
      ctx.fillStyle = 'rgba(0,0,0,1)';
      for (let y = -size; y < size; y += 4) {
        ctx.fillRect(-size, y, size * 2, 2);
      }

      ctx.restore();

      animId = requestAnimationFrame(draw);
    }
    draw();
  }

  /* ──────────────────────────────────────────────
     13 & 14. RENDER PRODUCTS FROM JSON
  ────────────────────────────────────────────── */
  const ICON_MAP = {
    'Camisetas':  'UV',
    'Moletons':   'UV',
    'Calças':     'UV',
    'Bonés':      'UV',
    'Acessórios': 'UV',
  };

  const BG_MAP = {
    'Camisetas':  'linear-gradient(160deg,#0d0d0d 0%,#1a1a1a 100%)',
    'Moletons':   'linear-gradient(160deg,#0d0d16 0%,#1a1030 100%)',
    'Calças':     'linear-gradient(160deg,#0d0d0d 0%,#111520 100%)',
    'Bonés':      'linear-gradient(160deg,#0a100a 0%,#0f1f0f 100%)',
    'Acessórios': 'linear-gradient(160deg,#100d14 0%,#1c1030 100%)',
  };

  const BADGE_CLASS = {
    'NOVO':      'pc-badge-green',
    'DROP 02':   'pc-badge-purple',
    'LIMITADO':  'pc-badge-silver',
    'CLÁSSICO':  'pc-badge-silver',
    'DROP 01':   'pc-badge-purple',
    'EXCLUSIVO': 'pc-badge-green',
  };

  function renderProducts(list) {
    const grid = $('#productsGrid');
    if (!grid) return;
    grid.innerHTML = '';

    if (!list.length) {
      grid.innerHTML = '<p style="color:var(--gray-text);text-align:center;grid-column:1/-1;padding:60px 0">Nenhum produto encontrado.</p>';
      return;
    }

    list.forEach(p => {
      const badgeCls = BADGE_CLASS[p.badge] || 'pc-badge-green';
      const bg = BG_MAP[p.category] || BG_MAP['Camisetas'];
      const price = `R$ ${p.price.toFixed(2).replace('.', ',')}`;

      const card = document.createElement('article');
      card.className = 'product-card';
      card.dataset.category = p.category;
      card.dataset.id = p.id;
      card.setAttribute('aria-label', p.name);

      card.innerHTML = `
        <div class="pc-image">
          <div class="pc-image-bg" style="background:${bg}"></div>
          <div class="pc-icon" aria-hidden="true">UV</div>
          <div class="pc-badge ${badgeCls}">${p.badge}</div>
          <div class="pc-hover-actions" aria-hidden="true">
            <button class="btn btn-primary btn-sm pc-add-hover" data-id="${p.id}" aria-label="Adicionar ${p.name} ao carrinho">+ Carrinho</button>
            <button class="btn btn-outline btn-sm pc-detail" data-id="${p.id}" aria-label="Ver detalhes de ${p.name}">Detalhes</button>
          </div>
        </div>
        <div class="pc-body">
          <div class="pc-category">${p.category}</div>
          <h3 class="pc-name">${p.name}</h3>
          <p class="pc-desc">${p.description}</p>
          <div class="pc-footer">
            <span class="pc-price">${price}</span>
            <button class="pc-add btn" data-id="${p.id}" aria-label="Adicionar ao carrinho">+</button>
          </div>
        </div>
      `;

      /* Events */
      on(card.querySelector('.pc-add'), 'click', (e) => {
        e.stopPropagation();
        addToCart(p.id);
      });
      on(card.querySelector('.pc-add-hover'), 'click', (e) => {
        e.stopPropagation();
        addToCart(p.id);
      });
      on(card.querySelector('.pc-detail'), 'click', (e) => {
        e.stopPropagation();
        showToast(`${p.name} — ${price}`);
      });

      grid.appendChild(card);
    });
  }

  /* ──────────────────────────────────────────────
     15. FILTROS DE CATEGORIA
  ────────────────────────────────────────────── */
  function initFilters() {
    $$('.filter').forEach(btn => {
      on(btn, 'click', () => {
        $$('.filter').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        currentFilter = btn.dataset.filter;
        filterProducts(currentFilter);
      });
    });
  }

  function filterProducts(cat) {
    const cards = $$('.product-card');
    cards.forEach((card, i) => {
      const match = cat === 'all' || card.dataset.category === cat;
      card.classList.toggle('hidden', !match);
      if (match) {
        gsap.fromTo(card, { opacity: 0, y: 30 }, {
          opacity: 1, y: 0, duration: 0.5,
          delay: i * 0.05, ease: 'power3.out',
        });
      }
    });
  }

  /* ──────────────────────────────────────────────
     CART — helpers
  ────────────────────────────────────────────── */
  function saveCart() {
    try { localStorage.setItem('urbanv_cart', JSON.stringify(cart)); } catch (_) {}
  }

  function loadCart() {
    try {
      const s = localStorage.getItem('urbanv_cart');
      if (s) cart = JSON.parse(s);
    } catch (_) { cart = []; }
  }

  function cartTotal() {
    return cart.reduce((s, i) => s + i.price * i.qty, 0);
  }

  function cartCount() {
    return cart.reduce((s, i) => s + i.qty, 0);
  }

  function updateBadge() {
    const badge = $('#cartBadge');
    if (!badge) return;
    const n = cartCount();
    badge.textContent = n;
    badge.classList.toggle('visible', n > 0);
  }

  function fmt(v) { return `R$ ${v.toFixed(2).replace('.', ',')}`; }

  /* ──────────────────────────────────────────────
     16 & 20. ADD TO CART
  ────────────────────────────────────────────── */
  function addToCart(id) {
    const product = products.find(p => p.id == id);
    if (!product) return;

    const existing = cart.find(i => i.id == id);
    if (existing) {
      existing.qty += 1;
    } else {
      cart.push({ id: product.id, name: product.name, price: product.price, category: product.category, qty: 1 });
    }
    saveCart();
    updateBadge();
    renderCartItems();
    showToast(`${product.name} adicionado! 🔥`);
    openCart();
  }

  /* ──────────────────────────────────────────────
     17–19. CART SIDEBAR
  ────────────────────────────────────────────── */
  function initCart() {
    on($('#cartBtn'),    'click', openCart);
    on($('#csClose'),    'click', closeCart);
    on($('#cartOverlay'),'click', closeCart);
    on($('#clearCart'),  'click', () => {
      if (!cart.length) return;
      cart = []; saveCart(); updateBadge(); renderCartItems();
      showToast('Carrinho limpo.');
    });
    on($('#checkoutBtn'), 'click', openCheckout);

    renderCartItems();
    updateBadge();
  }

  function openCart() {
    $('#cartSidebar').classList.add('active');
    $('#cartOverlay').classList.add('active');
    $('#cartSidebar').removeAttribute('aria-hidden');
    document.body.style.overflow = 'hidden';
  }

  function closeCart() {
    $('#cartSidebar').classList.remove('active');
    $('#cartOverlay').classList.remove('active');
    $('#cartSidebar').setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  }

  function renderCartItems() {
    const empty = $('#csEmpty');
    const list  = $('#csItems');
    const footer = $('#csFooter');
    const sub   = $('#csSubtotal');
    if (!list) return;

    const hasItems = cart.length > 0;
    if (empty)  empty.style.display  = hasItems ? 'none' : 'flex';
    if (list)   list.style.display   = hasItems ? 'flex' : 'none';
    if (footer) footer.style.display = hasItems ? 'flex' : 'none';

    list.innerHTML = '';

    cart.forEach(item => {
      const li = document.createElement('li');
      li.className = 'cs-item';
      li.dataset.id = item.id;

      li.innerHTML = `
        <div class="csi-img">
          <div class="csi-img-bg" style="background:${BG_MAP[item.category] || '#111'}">UV</div>
        </div>
        <div class="csi-info">
          <div class="csi-name">${item.name}</div>
          <div class="csi-cat">${item.category}</div>
          <div class="csi-controls">
            <div class="csi-qty">
              <button class="csi-minus" aria-label="Diminuir quantidade">−</button>
              <span>${item.qty}</span>
              <button class="csi-plus"  aria-label="Aumentar quantidade">+</button>
            </div>
            <span class="csi-price">${fmt(item.price * item.qty)}</span>
          </div>
        </div>
        <button class="csi-remove" aria-label="Remover item">✕</button>
      `;

      on(li.querySelector('.csi-minus'), 'click', () => changeQty(item.id, -1));
      on(li.querySelector('.csi-plus'),  'click', () => changeQty(item.id, +1));
      on(li.querySelector('.csi-remove'),'click', () => removeItem(item.id));

      list.appendChild(li);
    });

    if (sub) sub.textContent = fmt(cartTotal());

    /* Update checkout total if open */
    const cmTotal = $('#cmTotal');
    if (cmTotal) cmTotal.textContent = fmt(cartTotal());
  }

  function changeQty(id, delta) {
    const item = cart.find(i => i.id == id);
    if (!item) return;
    item.qty = Math.max(1, item.qty + delta);
    saveCart(); updateBadge(); renderCartItems();
  }

  function removeItem(id) {
    cart = cart.filter(i => i.id != id);
    saveCart(); updateBadge(); renderCartItems();
  }

  /* ──────────────────────────────────────────────
     26–30. CHECKOUT MODAL
  ────────────────────────────────────────────── */
  function initCheckout() {
    on($('#cmClose'),      'click', closeCheckout);
    on($('#modalOverlay'), 'click', closeCheckout);
    on($('#cmForm'),       'submit', handleCheckoutSubmit);
  }

  function openCheckout() {
    if (!cart.length) { showToast('Adicione produtos ao carrinho primeiro.'); return; }
    closeCart();

    /* Summary */
    const summary = $('#cmSummary');
    if (summary) {
      summary.innerHTML = cart.map(i =>
        `<p>${i.name} x${i.qty} <span>${fmt(i.price * i.qty)}</span></p>`
      ).join('') + `<p style="border-top:1px solid rgba(255,255,255,0.06);margin-top:8px;padding-top:8px;font-weight:700;color:var(--white)">Total <span style="color:var(--accent-green)">${fmt(cartTotal())}</span></p>`;
    }

    const cmTotal = $('#cmTotal');
    if (cmTotal) cmTotal.textContent = fmt(cartTotal());

    $('#modalOverlay').classList.add('active');
    $('#checkoutModal').classList.add('active');
    document.body.style.overflow = 'hidden';
  }

  function closeCheckout() {
    $('#modalOverlay').classList.remove('active');
    $('#checkoutModal').classList.remove('active');
    document.body.style.overflow = '';
  }

  function validateForm(form) {
    let valid = true;
    $$('input[required], textarea[required], select[required]', form).forEach(field => {
      field.classList.remove('error');
      if (!field.value.trim()) {
        field.classList.add('error');
        valid = false;
      }
    });
    return valid;
  }

  function handleCheckoutSubmit(e) {
    e.preventDefault();
    const form = e.target;

    if (!validateForm(form)) {
      showToast('Preencha todos os campos obrigatórios.');
      return;
    }

    const name    = form.name.value.trim();
    const wpp     = form.whatsapp.value.trim();
    const address = form.address.value.trim();
    const payment = form.payment.value;
    const notes   = form.notes.value.trim();

    /* Build WhatsApp message */
    let msg = `🛍️ *PEDIDO URBAN V*\n\n`;
    msg += `👤 *Cliente:* ${name}\n`;
    msg += `📱 *WhatsApp:* ${wpp}\n`;
    msg += `📍 *Endereço:* ${address}\n`;
    msg += `💳 *Pagamento:* ${payment}\n\n`;
    msg += `📦 *Produtos:*\n`;
    cart.forEach(i => {
      msg += `• ${i.name} x${i.qty} — ${fmt(i.price * i.qty)}\n`;
    });
    msg += `\n💰 *Total: ${fmt(cartTotal())}*\n`;
    if (notes) msg += `\n📝 *Obs:* ${notes}`;

    const url = `https://wa.me/${WPP_NUMBER}?text=${encodeURIComponent(msg)}`;
    window.open(url, '_blank', 'noopener,noreferrer');

    showToast('Pedido enviado! Abrindo WhatsApp... ✅');
    cart = []; saveCart(); updateBadge(); renderCartItems();
    closeCheckout();
    form.reset();
  }

  /* ──────────────────────────────────────────────
     31. BOTÕES NOTIFICAR
  ────────────────────────────────────────────── */
  function initNotifyBtns() {
    $$('.btn-notify').forEach(btn => {
      on(btn, 'click', () => {
        const product = btn.dataset.product || 'Drop';
        const msg = `Olá! Quero ser notificado quando o *${product}* da Urban V estiver disponível! 🔔`;
        const url = `https://wa.me/${WPP_NUMBER}?text=${encodeURIComponent(msg)}`;
        window.open(url, '_blank', 'noopener,noreferrer');
        showToast('Abrindo WhatsApp para notificação...');
      });
    });
  }

  /* ──────────────────────────────────────────────
     32. CARROSSEL DE DEPOIMENTOS
  ────────────────────────────────────────────── */
  function initTestimonials() {
    const slider = $('#tSlider');
    const dotsWrap = $('#tDots');
    const prevBtn = $('#tPrev');
    const nextBtn = $('#tNext');
    if (!slider) return;

    const cards = $$('.t-card', slider);
    testimonialTotal = cards.length;
    testimonialIndex = 0;

    function getVisible() {
      return window.innerWidth >= 900 ? 3 : window.innerWidth >= 600 ? 2 : 1;
    }

    function maxIndex() {
      return Math.max(0, testimonialTotal - getVisible());
    }

    /* Build dots */
    function buildDots() {
      if (!dotsWrap) return;
      dotsWrap.innerHTML = '';
      const max = maxIndex() + 1;
      for (let i = 0; i < max; i++) {
        const d = document.createElement('div');
        d.className = 't-dot' + (i === testimonialIndex ? ' active' : '');
        d.setAttribute('aria-label', `Depoimento ${i + 1}`);
        on(d, 'click', () => goTo(i));
        dotsWrap.appendChild(d);
      }
    }

    function goTo(i) {
      testimonialIndex = Math.max(0, Math.min(i, maxIndex()));
      const vis = getVisible();
      const cardW = cards[0].offsetWidth + 20;
      gsap.to(slider, { x: -testimonialIndex * cardW, duration: 0.55, ease: 'power3.out' });
      $$('.t-dot', dotsWrap).forEach((d, idx) => d.classList.toggle('active', idx === testimonialIndex));
    }

    on(prevBtn, 'click', () => goTo(testimonialIndex - 1));
    on(nextBtn, 'click', () => goTo(testimonialIndex + 1));

    /* Touch/drag */
    let startX = 0, dragging = false;
    on(slider, 'touchstart', e => { startX = e.touches[0].clientX; dragging = true; }, { passive: true });
    on(slider, 'touchend',   e => {
      if (!dragging) return;
      const diff = startX - e.changedTouches[0].clientX;
      if (Math.abs(diff) > 50) goTo(testimonialIndex + (diff > 0 ? 1 : -1));
      dragging = false;
    });

    on(window, 'resize', () => { buildDots(); goTo(Math.min(testimonialIndex, maxIndex())); });

    buildDots();
  }

  /* ──────────────────────────────────────────────
     33. TOAST
  ────────────────────────────────────────────── */
  let toastTimer;
  function showToast(msg) {
    const toast = $('#toast');
    if (!toast) return;
    clearTimeout(toastTimer);
    toast.textContent = msg;
    toast.classList.add('show');
    toastTimer = setTimeout(() => toast.classList.remove('show'), 3000);
  }

  /* ──────────────────────────────────────────────
     SMOOTH SCROLL PARA LINKS ÂNCORA
  ────────────────────────────────────────────── */
  function initSmoothScroll() {
    $$('a[href^="#"]').forEach(a => {
      on(a, 'click', e => {
        const target = document.querySelector(a.getAttribute('href'));
        if (!target) return;
        e.preventDefault();
        const offset = target.getBoundingClientRect().top + window.scrollY - 72;
        window.scrollTo({ top: offset, behavior: 'smooth' });
      });
    });
  }

  /* ──────────────────────────────────────────────
     V-LETTER ANIMATION IN ABOUT
  ────────────────────────────────────────────── */
  function initAboutVisual() {
    if (typeof ScrollTrigger === 'undefined') return;
    const av = $('.about-visual');
    if (!av) return;
    ScrollTrigger.create({
      trigger: av,
      start: 'top 80%',
      onEnter: () => {
        gsap.from('.av-letter', { opacity: 0, scale: 1.4, duration: 1.2, ease: 'power4.out' });
        gsap.from('.av-badge', { opacity: 0, x: 30, duration: 0.8, delay: 0.3, ease: 'power3.out' });
        gsap.from('.av-lines span', { width: 0, duration: 0.8, stagger: 0.1, delay: 0.4, ease: 'power3.out' });
      },
    });
  }

  /* ──────────────────────────────────────────────
     PARALLAX ON LOOKBOOK ITEMS
  ────────────────────────────────────────────── */
  function initParallax() {
    if (typeof ScrollTrigger === 'undefined') return;
    $$('.lb-visual').forEach(el => {
      gsap.to(el, {
        yPercent: -8,
        ease: 'none',
        scrollTrigger: {
          trigger: el,
          start: 'top bottom',
          end: 'bottom top',
          scrub: true,
        },
      });
    });
  }

  /* ──────────────────────────────────────────────
     CTA BIG V PARALLAX
  ────────────────────────────────────────────── */
  function initCTA() {
    if (typeof ScrollTrigger === 'undefined') return;
    gsap.to('.cta-bg-v', {
      yPercent: -20,
      ease: 'none',
      scrollTrigger: {
        trigger: '.cta-section',
        start: 'top bottom',
        end: 'bottom top',
        scrub: true,
      },
    });
  }

  /* ──────────────────────────────────────────────
     34. LOAD PRODUCTS.JSON — erro handling
  ────────────────────────────────────────────── */
  async function loadProducts() {
    try {
      const res = await fetch(PRODUCTS_PATH);
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      products = await res.json();
    } catch (err) {
      console.warn('[Urban V] Não foi possível carregar products.json. Usando fallback.', err);
      products = [
        { id: 1, name: 'Camiseta Oversized Urban V Concrete', price: 79.90, category: 'Camisetas', description: 'Algodão pesado 300g, corte oversized exclusivo.', badge: 'NOVO',      accent: '#39FF14' },
        { id: 2, name: 'Moletom Urban V Night Motion',        price: 149.90, category: 'Moletons',  description: 'Fleece premium 400g, capuz duplo reforçado.',  badge: 'DROP 02',   accent: '#7B2FBE' },
        { id: 3, name: 'Calça Cargo Urban V Core',            price: 129.90, category: 'Calças',    description: 'Multipockets estratégicos, caimento streetwear perfeito.', badge: 'LIMITADO', accent: '#C0C0C0' },
        { id: 4, name: 'Boné Urban V Signature',              price: 59.90,  category: 'Bonés',     description: 'Dad hat estruturado, bordado V metálico.',    badge: 'CLÁSSICO',   accent: '#39FF14' },
        { id: 5, name: 'Shoulder Bag Urban V Street',         price: 69.90,  category: 'Acessórios',description: 'Nylon resistente 600D, tira ajustável.',      badge: 'DROP 01',    accent: '#7B2FBE' },
        { id: 6, name: 'Camiseta Urban V Neon Grid',          price: 89.90,  category: 'Camisetas', description: 'Estampa exclusiva grid urbano, tintura reativa.', badge: 'EXCLUSIVO', accent: '#39FF14' },
      ];
    }
    renderProducts(products);
  }

  /* ──────────────────────────────────────────────
     KEYBOARD TRAP FOR MODALS / A11Y
  ────────────────────────────────────────────── */
  function initA11y() {
    on(document, 'keydown', e => {
      if (e.key === 'Escape') {
        if ($('#checkoutModal').classList.contains('active')) { closeCheckout(); return; }
        if ($('#cartSidebar').classList.contains('active'))   { closeCart();     return; }
        if ($('#mobileMenu').classList.contains('active'))    {
          $('#hamburger').click(); return;
        }
      }
    });
  }

  /* ──────────────────────────────────────────────
     INIT — MAIN ENTRY
  ────────────────────────────────────────────── */
  async function init() {
    /* Register GSAP plugins */
    if (typeof gsap !== 'undefined' && typeof ScrollTrigger !== 'undefined') {
      gsap.registerPlugin(ScrollTrigger);
    }

    /* Sync inits that don't depend on intro */
    initHeader();
    initMobileMenu();
    initCursor();
    initFilters();
    initSplitWords();
    initA11y();
    initSmoothScroll();

    /* Load products */
    await loadProducts();

    /* Cart & Checkout */
    loadCart();
    initCart();
    initCheckout();
    initNotifyBtns();

    /* Testimonials */
    initTestimonials();

    /* Parallax & CTA */
    initParallax();
    initCTA();
    initAboutVisual();

    /* Start intro (triggers hero + scroll animations on complete) */
    if (typeof gsap !== 'undefined') {
      initIntro();
    } else {
      /* Fallback if GSAP fails to load */
      finishIntro();
    }
  }

  /* Start when DOM is ready */
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

})();
