/* ══════════════════════════════════════════════════════════════
   Paulina Osuna Portfolio — JS
   ══════════════════════════════════════════════════════════════ */
'use strict';

/* ─── Project data ─────────────────────────────────────────── */
const PROJECTS = [
  {
    title:    'Long Play Record Store',
    category: 'Lighting Design',
    location: 'Tijuana, México',
    image:    'https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?auto=format&fit=crop&w=1200&q=80',
    desc:     'A record store where every fixture is a deliberate choice. I designed warm, directional lighting to pull focus onto vinyl collections and create intimate pockets of discovery — drawing from the nostalgia of analog sound, where atmosphere is as important as the music itself.',
  },
  {
    title:    'Transmisiones González',
    category: 'Lighting Design',
    location: 'Tijuana, México',
    image:    'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1200&q=80',
    desc:     'A layered lighting scheme for a commercial space where light does the work of wayfinding and atmosphere at once. Task illumination defines key work areas; ambient warmth softens the periphery. The goal: a space that feels cared-for from the moment you walk in.',
  },
  {
    title:    'Mariscos Playa Azul',
    category: 'Lighting & Interior Design',
    location: 'Tijuana, México',
    image:    'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?auto=format&fit=crop&w=1200&q=80',
    desc:     'A coastal seafood restaurant where I balanced the freshness of Pacific daylight with the warmth of a seaside evening. Interior design and lighting were conceived together — every material choice and fixture placement evoking the horizon where sky meets water.',
  },
  {
    title:    'TJ Water',
    category: 'Lighting Design',
    location: 'Tijuana, México',
    image:    'https://images.unsplash.com/photo-1576013551627-0cc20b96c2a7?auto=format&fit=crop&w=1200&q=80',
    desc:     'Architectural lighting for a water facility where utility meets craft. Exterior illumination that respects its industrial context while establishing a clear presence at night — proof that even infrastructure can carry dignity when light is considered carefully.',
  },
  {
    title:    'AG Airbnb',
    category: 'Lighting Design',
    location: 'Tijuana, México',
    image:    'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?auto=format&fit=crop&w=1200&q=80',
    desc:     'A short-term rental designed to feel like a well-curated home. I layered lighting across ambient, accent, and task levels — warm tones that settle guests in from the moment they arrive.',
  },
  {
    title:    'Casa Paulina',
    category: 'Architecture & Lighting Design',
    location: 'Tijuana, México',
    image:    'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1200&q=80',
    desc:     'A residential project where architectural and lighting design were conceived from the ground up as a single discipline. The home\'s structure and its illumination are inseparable — each wall, opening, and surface designed with full awareness of how light would inhabit it.',
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
const modal         = document.getElementById('modal');
const modalBackdrop = document.getElementById('modalBackdrop');
const modalClose    = document.getElementById('modalClose');
const modalImg      = document.getElementById('modalImg');
const modalCat      = document.getElementById('modalCat');
const modalTitle    = document.getElementById('modalTitle');
const modalDesc     = document.getElementById('modalDesc');
const modalLoc      = document.getElementById('modalLocation');

function openModal(index) {
  const p = PROJECTS[index];
  if (!p) return;
  modalImg.src              = p.image;
  modalImg.alt              = p.title;
  modalCat.textContent      = p.category;
  modalTitle.textContent    = p.title;
  modalDesc.textContent     = p.desc;
  modalLoc.textContent      = p.location;
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
