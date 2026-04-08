/* ══════════════════════════════════════════════════════════════
   Paulina Osuna Portfolio — JS
   ══════════════════════════════════════════════════════════════ */
'use strict';

/* ─── Project data ─────────────────────────────────────────── */
const PROJECTS = [
  {
    title:    'Long Play Record Store',
    category: 'Lighting Design',
    location: 'Ensenada, México',
    image:    'https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?auto=format&fit=crop&w=1200&q=80',
    desc:     'Crafted to evoke the warmth and moody ambiance of a mid-century vintage shop. Track lighting and pendants with a retro flair emit a soft, warm glow that highlights the vinyl records and creates an inviting atmosphere — a nod to the classic record stores of the past, with a modern twist.',
    features: [
      'Mid-century modern-inspired fixtures in warm finishes (brass, copper, wood)',
      'Soft, warm LED lighting (2700K–3000K) to reduce glare and create a relaxing ambiance',
      'Strategically placed track lighting to highlight featured records and create visual interest',
      'Dimmable lighting controls to adjust ambiance according to the time of day or special events',
    ],
  },
  {
    title:    'Transmisiones González',
    category: 'Lighting Design',
    location: 'Ensenada, México',
    image:    'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1200&q=80',
    desc:     'Paying homage to mid-century style with a modern twist. The intent is to create a welcoming and functional atmosphere that provides clear visibility for customers and staff — a space that is both inviting and efficient.',
    features: [
      'Mid-century inspired fixtures with metal and glass finishes',
      'Cool white LED lighting (3500K–4000K) for enhanced visibility',
      'Focused lighting on work areas and product displays',
      'Adequate lighting levels for an automotive shop, with a minimum of 500 lux in work areas',
    ],
  },
  {
    title:    'Mariscos Playa Azul',
    category: 'Lighting & Interior Design',
    location: 'Ensenada, México',
    image:    'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?auto=format&fit=crop&w=1200&q=80',
    desc:     'A comprehensive design package celebrating the restaurant\'s rich history. Lighting and interior design blend vintage charm with modern functionality, creating a lively, beachy atmosphere that honors the legacy of Mariscos Playa Azul.',
    features: [
      'Warm, inviting lighting (2700K–3000K) with a mix of pendant lights, sconces, and table lamps',
      'Reclaimed wood accents, nautical elements, and vintage decor to evoke a classic coastal eatery',
      'Adequate lighting levels: 300–500 lux in dining areas and 500–700 lux in food prep areas',
      'Comfortable seating, natural textures, and coastal colors to create a welcoming ambiance',
    ],
  },
  {
    title:    'TJ Water',
    category: 'Lighting Design',
    location: 'Tijuana, México',
    image:    'https://images.unsplash.com/photo-1576013551627-0cc20b96c2a7?auto=format&fit=crop&w=1200&q=80',
    desc:     'Crafted to be modern, clean, and functional. The goal is to create a welcoming and efficient space for customers and staff, prioritizing clarity and ease of use throughout.',
    features: [
      'Bright, neutral LED lighting (3500K–4000K) for clarity and visibility',
      'Sleek, minimalist fixtures that complement the dispensary\'s modern aesthetic',
      'Adequate lighting levels: 500–700 lux in service areas and 300–500 lux in customer areas',
    ],
  },
  {
    title:    'Casa Paulina',
    category: 'Architecture & Lighting Design',
    location: 'Ensenada, México',
    image:    'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1200&q=80',
    desc:     'A serene retreat blending traditional Mexican chukum plaster with mid-century modern elements. The multi-level layout creates a sense of safety and tranquility — a peaceful sanctuary that invites relaxation and connection with the surroundings.',
    features: [
      'Chukum plaster walls and ceilings, providing a warm, earthy texture and natural beauty',
      'Abundant natural light filtered through strategically placed windows and skylights',
      'Mid-century modern accents: clean lines, organic shapes, and functional elegance',
      'Multiple levels, creating a sense of depth and visual interest',
      'Warm, inviting lighting (2700K–3000K) that highlights the chukum texture',
    ],
  },
];


/* ─── Nav: hidden at top, slides in on scroll ──────────────── */
const nav = document.getElementById('nav');

function syncNav() {
  nav.classList.toggle('is-scrolled', window.scrollY > 30);
}
window.addEventListener('scroll', syncNav, { passive: true });
syncNav();


/* ─── Mobile hamburger menu ─────────────────────────────────── */
const hamburger = document.getElementById('hamburger');
const navLinks  = document.getElementById('navLinks');

hamburger.addEventListener('click', () => {
  const open = navLinks.classList.toggle('is-open');
  hamburger.setAttribute('aria-expanded', String(open));
  document.body.style.overflow = open ? 'hidden' : '';
});

navLinks.querySelectorAll('.nav__link').forEach(link => {
  link.addEventListener('click', closeMenu);
});

document.addEventListener('click', e => {
  if (
    navLinks.classList.contains('is-open') &&
    !navLinks.contains(e.target) &&
    !hamburger.contains(e.target)
  ) {
    closeMenu();
  }
});

function closeMenu() {
  navLinks.classList.remove('is-open');
  hamburger.setAttribute('aria-expanded', 'false');
  document.body.style.overflow = '';
}


/* ─── Scroll reveal (IntersectionObserver) ──────────────────── */
const io = new IntersectionObserver(
  entries => entries.forEach(e => {
    if (e.isIntersecting) {
      e.target.classList.add('in-view');
      io.unobserve(e.target);
    }
  }),
  { threshold: 0.06, rootMargin: '0px 0px -30px 0px' }
);
document.querySelectorAll('.reveal-up').forEach(el => io.observe(el));

/* Hero card reveals immediately on load */
window.addEventListener('load', () => {
  const heroCard = document.querySelector('.hero-card');
  if (heroCard) setTimeout(() => heroCard.classList.add('in-view'), 80);
});


/* ─── Hero card: Paulina slides right, Osuna slides left on hover ─ */
(function () {
  const card    = document.querySelector('.hero-card');
  const paulina = card && card.querySelector('.hero-card__paulina');
  const osuna   = card && card.querySelector('.hero-card__osuna');
  if (!card || !paulina || !osuna) return;

  const EASE_IN  = 'cubic-bezier(0.16, 1, 0.3, 1)';
  const SPRING   = 'cubic-bezier(0.34, 1.56, 0.64, 1)'; /* overshoot spring */
  const P_SHIFT  = '72px';
  const O_SHIFT  = '152px'; /* 80px more than Paulina */

  card.addEventListener('mouseenter', () => {
    paulina.style.transition = `transform 0.55s ${EASE_IN}`;
    osuna.style.transition   = `transform 0.55s ${EASE_IN}`;
    paulina.style.transform  = `translateX(calc(-50% + ${P_SHIFT}))`;
    osuna.style.transform    = `translateX(calc(-50% - ${O_SHIFT}))`;
  });

  card.addEventListener('mouseleave', () => {
    paulina.style.transition = `transform 0.75s ${SPRING}`;
    osuna.style.transition   = `transform 0.75s ${SPRING}`;
    paulina.style.transform  = 'translateX(-50%)';
    osuna.style.transform    = 'translateX(-50%)';
  });
}());


/* ─── Hero parallax on scroll ──────────────────────────────── */
(function () {
  const hero  = document.querySelector('.hero-card');
  if (!hero) return;
  const brush = hero.querySelector('.hero-card__brush');
  const logo  = hero.querySelector('.hero-card__logo');
  const label = hero.querySelector('.hero-card__label');
  const nav   = hero.querySelector('.hero-card__nav');

  let ticking = false;

  window.addEventListener('scroll', () => {
    if (ticking) return;
    ticking = true;
    requestAnimationFrame(() => {
      const y = window.scrollY;
      const h = hero.offsetHeight;
      if (y > h) { ticking = false; return; } /* past hero, skip */
      if (brush) brush.style.transform = `translateY(calc(-50% + ${y * 0.25}px))`;
      ticking = false;
    });
  }, { passive: true });
}());


/* ─── Smooth scroll for hash links ─────────────────────────── */
document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener('click', function (e) {
    const target = document.querySelector(this.getAttribute('href'));
    if (!target) return;
    e.preventDefault();
    target.scrollIntoView({ behavior: 'smooth', block: 'start' });
  });
});


/* ─── Modal ─────────────────────────────────────────────────── */
const modal               = document.getElementById('modal');
const modalBackdrop       = document.getElementById('modalBackdrop');
const modalClose          = document.getElementById('modalClose');
const modalImg            = document.getElementById('modalImg');
const modalCat            = document.getElementById('modalCat');
const modalTitle          = document.getElementById('modalTitle');
const modalDesc           = document.getElementById('modalDesc');
const modalLoc            = document.getElementById('modalLocation');
const modalFeaturesToggle = document.getElementById('modalFeaturesToggle');
const modalFeaturesList   = document.getElementById('modalFeaturesList');

modalFeaturesToggle.addEventListener('click', () => {
  const isOpen = modalFeaturesList.classList.toggle('is-open');
  modalFeaturesList.style.maxHeight = isOpen ? modalFeaturesList.scrollHeight + 'px' : '0';
  modalFeaturesToggle.textContent = isOpen ? '− Features' : '+ Features';
  modalFeaturesToggle.setAttribute('aria-expanded', String(isOpen));
});

function openModal(index) {
  const p = PROJECTS[index];
  if (!p) return;
  modalImg.src           = p.image;
  modalImg.alt           = p.title;
  modalCat.textContent   = p.category;
  modalTitle.textContent = p.title;
  modalDesc.textContent  = p.desc;
  modalLoc.textContent   = p.location;

  modalFeaturesList.innerHTML = p.features.map(f => `<li>${f}</li>`).join('');
  modalFeaturesList.classList.remove('is-open');
  modalFeaturesList.style.maxHeight = '0';
  modalFeaturesToggle.textContent = '+ Features';
  modalFeaturesToggle.setAttribute('aria-expanded', 'false');

  modal.removeAttribute('hidden');
  document.body.style.overflow = 'hidden';
  modalClose.focus();
}

function closeModal() {
  modal.setAttribute('hidden', '');
  document.body.style.overflow = '';
  if (lastFocusedCard) lastFocusedCard.focus();
}

let lastFocusedCard = null;

/* Open modal on card click or keyboard (Enter / Space) */
document.querySelectorAll('.pc').forEach(card => {
  const open = () => {
    lastFocusedCard = card;
    openModal(Number(card.dataset.index));
  };
  card.addEventListener('click', open);
  card.addEventListener('keydown', e => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      open();
    }
  });
});

/* Close triggers */
modalClose.addEventListener('click', closeModal);
modalBackdrop.addEventListener('click', closeModal);
document.addEventListener('keydown', e => {
  if (e.key === 'Escape' && !modal.hasAttribute('hidden')) closeModal();
});

/* Focus trap inside modal */
modal.addEventListener('keydown', e => {
  if (e.key !== 'Tab') return;
  const focusable = modal.querySelectorAll(
    'button, [href], input, [tabindex]:not([tabindex="-1"])'
  );
  const first = focusable[0];
  const last  = focusable[focusable.length - 1];
  if (e.shiftKey) {
    if (document.activeElement === first) { e.preventDefault(); last.focus(); }
  } else {
    if (document.activeElement === last)  { e.preventDefault(); first.focus(); }
  }
});


/* ─── Contact card & modal ──────────────────────────────── */
const contactCard        = document.querySelector('.contact-card');
const contactModal       = document.getElementById('contactModal');
const contactModalClose  = document.getElementById('contactModalClose');
const contactModalBackdrop = document.getElementById('contactModalBackdrop');
const contactForm        = document.getElementById('contactForm');

function openContactModal() {
  contactModal.removeAttribute('hidden');
  document.body.style.overflow = 'hidden';
  contactModalClose.focus();
}

function closeContactModal() {
  contactModal.setAttribute('hidden', '');
  document.body.style.overflow = '';
  if (contactCard) contactCard.focus();
}

if (contactCard) {
  contactCard.addEventListener('click', openContactModal);
  contactCard.addEventListener('keydown', e => {
    if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); openContactModal(); }
  });
}

contactModalClose.addEventListener('click', closeContactModal);
contactModalBackdrop.addEventListener('click', closeContactModal);
document.addEventListener('keydown', e => {
  if (e.key === 'Escape' && !contactModal.hasAttribute('hidden')) closeContactModal();
});

contactForm.addEventListener('submit', e => {
  e.preventDefault();
  const name    = document.getElementById('contactName').value.trim();
  const subject = encodeURIComponent(name ? `Portfolio inquiry from ${name}` : 'Portfolio inquiry');
  window.location.href = `mailto:osunamancilla@gmail.com?subject=${subject}`;
  closeContactModal();
});

/* Focus trap for contact modal */
contactModal.addEventListener('keydown', e => {
  if (e.key !== 'Tab') return;
  const focusable = contactModal.querySelectorAll(
    'button, [href], input, textarea, [tabindex]:not([tabindex="-1"])'
  );
  const first = focusable[0];
  const last  = focusable[focusable.length - 1];
  if (e.shiftKey) {
    if (document.activeElement === first) { e.preventDefault(); last.focus(); }
  } else {
    if (document.activeElement === last) { e.preventDefault(); first.focus(); }
  }
});


/* ─── Paper grain overlay (canvas-based, cards only) ────────── */
(function () {
  const SIZE = 256;
  const canvas = document.createElement('canvas');
  canvas.width = canvas.height = SIZE;
  const ctx = canvas.getContext('2d');
  const imgData = ctx.createImageData(SIZE, SIZE);
  for (let i = 0; i < imgData.data.length; i += 4) {
    const v = Math.random() * 255 | 0;
    imgData.data[i] = imgData.data[i + 1] = imgData.data[i + 2] = v;
    imgData.data[i + 3] = 255;
  }
  ctx.putImageData(imgData, 0, 0);
  const url = canvas.toDataURL();
  const style = document.createElement('style');
  style.textContent = `
    .hero-card::after,
    .pc::after,
    .about-card::after,
    .contact-card::after {
      content: '';
      position: absolute;
      inset: 0;
      z-index: 10;
      pointer-events: none;
      opacity: 0.07;
      background: url(${url}) repeat;
      background-size: 256px 256px;
      border-radius: inherit;
    }
  `;
  document.head.appendChild(style);
}());


/* ─── Blur-up image loader ──────────────────────────────────── */
function revealImg(img) {
  img.classList.add('is-loaded');
  const wrap = img.closest('.pc__img');
  if (wrap) wrap.classList.add('img-loaded');
}

document.querySelectorAll('img').forEach(img => {
  if (img.complete && img.naturalWidth) {
    revealImg(img);
  } else {
    img.addEventListener('load', () => revealImg(img), { once: true });
  }
});
