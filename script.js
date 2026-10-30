// =====================================
//  ТОД ШИЛЭН ХИЙЦ — script.js
// =====================================

// ---- Custom Cursor ----
document.addEventListener('mousemove', (e) => {
  document.body.style.setProperty('--cx', e.clientX + 'px');
  document.body.style.setProperty('--cy', e.clientY + 'px');
});

// ---- Loader ----
window.addEventListener('load', () => {
  setTimeout(() => {
    const loader = document.getElementById('loader');
    if (loader) loader.classList.add('done');
  }, 1900);
});

// ---- Navbar scroll ----
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  if (window.scrollY > 60) {
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }
});

// ---- Mobile Menu ----
function toggleMenu() {
  const menu = document.getElementById('mobileMenu');
  const btn = document.getElementById('hamburger');
  menu.classList.toggle('open');
  btn.classList.toggle('active');
}
function closeMenu() {
  const menu = document.getElementById('mobileMenu');
  const btn = document.getElementById('hamburger');
  menu.classList.remove('open');
  btn.classList.remove('active');
}

// ---- Smooth anchor scroll ----
document.querySelectorAll('a[href^="#"]').forEach(link => {
  link.addEventListener('click', (e) => {
    const target = document.querySelector(link.getAttribute('href'));
    if (target) {
      e.preventDefault();
      const offset = 80;
      const top = target.getBoundingClientRect().top + window.scrollY - offset;
      window.scrollTo({ top, behavior: 'smooth' });
    }
  });
});

// ---- Scroll Reveal ----
const revealEls = document.querySelectorAll(
  '.product-card, .apoint, .cinfo, .gallery-item, .stat, .about-img-main, .about-img-second, .section-head, .hero-eyebrow, .hero-title, .hero-desc, .hero-actions'
);
revealEls.forEach(el => el.classList.add('reveal'));

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry, i) => {
    if (entry.isIntersecting) {
      setTimeout(() => {
        entry.target.classList.add('visible');
      }, 80);
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });

revealEls.forEach(el => observer.observe(el));

// ---- Counter Animation ----
function animateCounter(el) {
  const target = parseInt(el.dataset.target);
  const duration = 1800;
  const step = target / (duration / 16);
  let current = 0;
  const timer = setInterval(() => {
    current += step;
    if (current >= target) {
      current = target;
      clearInterval(timer);
    }
    el.textContent = Math.floor(current);
  }, 16);
}

const statsObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      document.querySelectorAll('.stat-num').forEach(animateCounter);
      statsObserver.disconnect();
    }
  });
}, { threshold: 0.5 });

const statsBar = document.querySelector('.stats-bar');
if (statsBar) statsObserver.observe(statsBar);

// ---- Active Nav Link ----
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-links a');
window.addEventListener('scroll', () => {
  let current = '';
  sections.forEach(sec => {
    const top = sec.offsetTop - 120;
    if (window.scrollY >= top) current = sec.id;
  });
  navLinks.forEach(link => {
    link.style.color = '';
    if (link.getAttribute('href') === '#' + current) {
      link.style.color = 'var(--gold)';
    }
  });
});

// ---- Lightbox ----
function openLightbox(src, caption) {
  const lb = document.getElementById('lightbox');
  document.getElementById('lightboxImg').src = src;
  document.getElementById('lightboxCaption').textContent = caption;
  lb.classList.add('open');
  document.body.style.overflow = 'hidden';
}
function closeLightbox() {
  document.getElementById('lightbox').classList.remove('open');
  document.body.style.overflow = '';
}
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') {
    closeLightbox();
    document.querySelectorAll('.modal').forEach(m => m.classList.remove('open'));
    document.body.style.overflow = '';
  }
});

// ---- Product Modals ----
function openModal(id) {
  document.getElementById(id).classList.add('open');
  document.body.style.overflow = 'hidden';
}
function closeModal(e, id) {
  if (e && e.target !== document.getElementById(id)) return;
  document.getElementById(id).classList.remove('open');
  document.body.style.overflow = '';
}

// ---- Contact Form ----
function handleOrder(e) {
  e.preventDefault();
  const btn = document.getElementById('orderBtn');
  btn.textContent = 'Илгээж байна...';
  btn.disabled = true;

  setTimeout(() => {
    btn.textContent = 'Захиалга илгээх →';
    btn.disabled = false;
    document.getElementById('orderSuccess').classList.add('show');
    document.getElementById('orderForm').reset();
    setTimeout(() => {
      document.getElementById('orderSuccess').classList.remove('show');
    }, 5000);
  }, 1500);
}

// ---- Parallax Hero ----
window.addEventListener('scroll', () => {
  const hero = document.querySelector('.hero-content');
  if (hero) {
    const scrolled = window.scrollY;
    hero.style.transform = `translateY(${scrolled * 0.2}px)`;
    hero.style.opacity = 1 - scrolled / 600;
  }
});

// ---- Image Error Fallback ----
document.querySelectorAll('img').forEach(img => {
  img.addEventListener('error', function () {
    // Show a styled placeholder if image not found
    const wrap = this.closest('.product-img-wrap, .gallery-item, .about-img-stack, .preview-card');
    if (this.classList.contains('product-img') || this.classList.contains('about-img-main') || this.classList.contains('about-img-second')) {
      this.style.display = 'none';
      const ph = document.createElement('div');
      ph.style.cssText = `
        width:100%; height:100%; min-height:280px;
        background: linear-gradient(135deg, #1a1a1a 0%, #2a2a2a 100%);
        display:flex; align-items:center; justify-content:center;
        color: rgba(201,168,76,0.4); font-size:3rem;
      `;
      ph.textContent = '🪞';
      if (this.parentNode) this.parentNode.insertBefore(ph, this);
    }
    if (this.classList.contains('logo-img') || this.classList.contains('footer-logo')) {
      this.style.display = 'none';
      const txt = document.createElement('span');
      txt.style.cssText = 'font-size:1.2rem; font-weight:700; color:#C9A84C; letter-spacing:0.05em;';
      txt.textContent = 'ТШХ';
      if (this.parentNode) this.parentNode.insertBefore(txt, this);
    }
  });
});

// ---- Tilt effect on product cards ----
document.querySelectorAll('.product-card').forEach(card => {
  card.addEventListener('mousemove', (e) => {
    const rect = card.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    card.style.transform = `perspective(800px) rotateY(${x * 6}deg) rotateX(${-y * 6}deg) translateY(-4px)`;
  });
  card.addEventListener('mouseleave', () => {
    card.style.transform = '';
  });
});

// ---- Gallery hover shimmer ----
document.querySelectorAll('.gallery-item').forEach(item => {
  item.style.cursor = 'none';
});

console.log('%c ТОД ШИЛЭН ХИЙЦ ', 'background:#C9A84C; color:#000; font-size:16px; padding:8px 16px; font-weight:bold;');
console.log('%c Шилэн бүтээгдэхүүний сайт ✓ ', 'color:#C9A84C; font-size:12px;');
