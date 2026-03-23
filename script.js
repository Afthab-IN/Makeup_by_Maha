/* ============================================
   MAHA BRIDAL STUDIO - Main JavaScript v4
   Enhanced Edition with Welcome Popup & More
   ============================================ */

const CONFIG = {
  // Gallery images - Row 1 (left scroll) — real Instagram images (no duplicates with row 2)
  galleryRow1: [
    { src: 'images/portfolio/bride-1.png', label: 'Bridal Glam', url: 'https://www.instagram.com/maha__mua/' },
    { src: 'images/portfolio/bride-3.png', label: 'Bridal Elegance', url: 'https://www.instagram.com/maha__mua/' },
    { src: 'images/portfolio/bride-5.png', label: 'Engagement Look', url: 'https://www.instagram.com/maha__mua/' },
    { src: 'images/portfolio/bride-7.png', label: 'Bridal Beauty', url: 'https://www.instagram.com/maha__mua/' },
    { src: 'images/portfolio/bride-9.png', label: 'Classic Bride', url: 'https://www.instagram.com/maha__mua/' },
  ],
  // Gallery images - Row 2 (right scroll) — completely different images (no overlap with row 1)
  galleryRow2: [
    { src: 'images/portfolio/bride-2.png', label: 'Wedding Day', url: 'https://www.instagram.com/maha__mua/' },
    { src: 'images/portfolio/bride-4.png', label: 'Traditional Bride', url: 'https://www.instagram.com/maha__mua/' },
    { src: 'images/portfolio/bride-6.png', label: 'Reception Glam', url: 'https://www.instagram.com/maha__mua/' },
    { src: 'images/portfolio/bride-8.png', label: 'Bridal Styling', url: 'https://www.instagram.com/maha__mua/' },
  ],
  whatsappNumber: '916385124295',
  testimonialInterval: 5000,
};

// ==========================================
// PRELOADER + WELCOME POPUP
// ==========================================
window.addEventListener('load', () => {
  // ALWAYS scroll to top on page load/refresh
  window.scrollTo({ top: 0, behavior: 'instant' });
  if (window.location.hash) {
    history.replaceState(null, null, window.location.pathname);
  }

  // Add page-loaded class for entrance animation
  document.body.classList.add('page-loaded');

  setTimeout(() => {
    document.getElementById('preloader').classList.add('loaded');
    document.querySelector('.hero').classList.add('in-view');

    // Show welcome popup after preloader finishes (every refresh)
    setTimeout(() => {
      const welcomePopup = document.getElementById('welcomePopup');
      if (welcomePopup) {
        welcomePopup.classList.add('active');
      }
    }, 400);

    setTimeout(setupReveal, 300);

    // Start hero text typing effect
    setTimeout(heroTypeEffect, 500);

    // Start About Section Image Slider
    initAboutSlider();
  }, 1800);
});

// Also handle beforeunload to reset scroll
window.addEventListener('beforeunload', () => {
  window.scrollTo({ top: 0, behavior: 'instant' });
});

// ==========================================
// WELCOME POPUP HANDLERS
// ==========================================
const welcomePopup = document.getElementById('welcomePopup');
const welcomePopupClose = document.getElementById('welcomePopupClose');
const welcomePopupCta = document.getElementById('welcomePopupCta');

function closeWelcomePopup() {
  if (welcomePopup) {
    welcomePopup.classList.remove('active');
  }
}

if (welcomePopupClose) {
  welcomePopupClose.addEventListener('click', closeWelcomePopup);
}

if (welcomePopupCta) {
  welcomePopupCta.addEventListener('click', closeWelcomePopup);
}

if (welcomePopup) {
  welcomePopup.addEventListener('click', (e) => {
    if (e.target === welcomePopup) {
      closeWelcomePopup();
    }
  });
}

// Close with Escape key
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape' && welcomePopup && welcomePopup.classList.contains('active')) {
    closeWelcomePopup();
  }
});

// ==========================================
// HERO TYPING EFFECT
// ==========================================
function heroTypeEffect() {
  const heroAccent = document.querySelector('.hero-accent');
  if (!heroAccent) return;

  const originalText = heroAccent.textContent;
  heroAccent.textContent = '';
  heroAccent.style.borderRight = '2px solid var(--primary)';

  let i = 0;
  const typeInterval = setInterval(() => {
    if (i < originalText.length) {
      heroAccent.textContent += originalText.charAt(i);
      i++;
    } else {
      clearInterval(typeInterval);
      // Remove cursor after typing
      setTimeout(() => {
        heroAccent.style.borderRight = 'none';
      }, 1500);
    }
  }, 50);
}

// ==========================================
// THEME SWITCHER
// ==========================================
const themeSwitcher = document.getElementById('themeSwitcher');
if (themeSwitcher) {
  const savedTheme = localStorage.getItem('maha-theme') || 'emerald';
  document.documentElement.setAttribute('data-theme', savedTheme);
  themeSwitcher.querySelectorAll('.theme-btn').forEach(btn => {
    btn.classList.toggle('active', btn.dataset.theme === savedTheme);
  });

  themeSwitcher.addEventListener('click', (e) => {
    const btn = e.target.closest('.theme-btn');
    if (!btn) return;
    const theme = btn.dataset.theme;
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('maha-theme', theme);
    themeSwitcher.querySelectorAll('.theme-btn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    showToast(`Theme: ${theme === 'emerald' ? 'Emerald Elegance 🍃' : theme === 'sapphire' ? 'Sapphire Sparkle 💎' : 'Amethyst Aura 🔮'}`);
  });
}

// ==========================================
// NAVIGATION
// ==========================================
const navbar = document.getElementById('navbar');
const navToggle = document.getElementById('navToggle');
const navLinks = document.getElementById('navLinks');

let lastScrollY = 0;

window.addEventListener('scroll', () => {
  const currentScrollY = window.scrollY;

  // Navbar scroll effect
  navbar.classList.toggle('scrolled', currentScrollY > 80);

  // Back to top button
  document.getElementById('backToTop').classList.toggle('visible', currentScrollY > 600);

  // Update active nav link
  updateActiveNavLink();

  // Show/hide floating WhatsApp based on scroll position
  const whatsappBtn = document.getElementById('floatingWhatsapp');
  if (whatsappBtn) {
    if (currentScrollY > 300) {
      whatsappBtn.style.opacity = '1';
      whatsappBtn.style.transform = 'translateY(0)';
    }
  }

  lastScrollY = currentScrollY;
});

navToggle.addEventListener('click', () => {
  navToggle.classList.toggle('active');
  navLinks.classList.toggle('active');
});

navLinks.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    navToggle.classList.remove('active');
    navLinks.classList.remove('active');
  });
});

function updateActiveNavLink() {
  const sections = document.querySelectorAll('section[id]');
  const scrollPos = window.scrollY + 200;
  sections.forEach(section => {
    const top = section.offsetTop;
    const height = section.offsetHeight;
    const id = section.getAttribute('id');
    const link = navLinks.querySelector(`a[href="#${id}"]`);
    if (link) {
      if (scrollPos >= top && scrollPos < top + height) {
        navLinks.querySelectorAll('a').forEach(a => a.classList.remove('active'));
        link.classList.add('active');
      }
    }
  });
}

// ==========================================
// HERO PARTICLES (enhanced with varied sizes)
// ==========================================
(function createParticles() {
  const container = document.getElementById('heroParticles');
  for (let i = 0; i < 40; i++) {
    const p = document.createElement('div');
    p.classList.add('particle');
    p.style.left = Math.random() * 100 + '%';
    const size = Math.random() * 5 + 2;
    p.style.width = size + 'px';
    p.style.height = size + 'px';
    p.style.animationDuration = (Math.random() * 5 + 4) + 's';
    p.style.animationDelay = (Math.random() * 8) + 's';
    // Add a slight glow to some particles
    if (Math.random() > 0.7) {
      p.style.boxShadow = `0 0 ${Math.random() * 8 + 4}px var(--particle-color)`;
    }
    container.appendChild(p);
  }
})();

// ==========================================
// SCROLL REVEAL ANIMATIONS
// ==========================================
function setupReveal() {
  const els = document.querySelectorAll('.reveal, .reveal-left, .reveal-right');

  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('in-view');
        }
      });
    }, {
      threshold: 0.1,
      rootMargin: '0px 0px -30px 0px'
    });

    els.forEach(el => observer.observe(el));
  } else {
    // Fallback: show all elements
    els.forEach(el => el.classList.add('in-view'));
  }
}
// Initial call
setupReveal();


// FILMSTRIP GALLERY (with Instagram links)
// ==========================================
function buildGallery() {
  const row1 = document.getElementById('galleryRow1');
  const row2 = document.getElementById('galleryRow2');
  if (!row1 || !row2) return;

  const row1Images = CONFIG.galleryRow1;
  const row2Images = CONFIG.galleryRow2;

  const buildRow = (container, imgs) => {
    // Triple the images to ensure long enough strip for seamless scroll
    const tripled = [...imgs, ...imgs, ...imgs];
    tripled.forEach((img) => {
      const item = document.createElement('div');
      item.classList.add('gallery-item');

      const link = document.createElement('a');
      link.href = img.url;
      link.target = '_blank';
      link.rel = 'noopener';
      link.innerHTML = `
        <img src="${img.src}" alt="${img.label}" loading="lazy">
        <div class="gallery-item-overlay">
          <span class="gallery-item-label">${img.label}</span>
          <span class="gallery-item-icon">📸 View on Instagram</span>
        </div>
      `;

      item.appendChild(link);
      container.appendChild(item);
    });
  };

  buildRow(row1, row1Images);
  buildRow(row2, row2Images);
}
buildGallery();

// ==========================================
// TESTIMONIALS SLIDER
// ==========================================
let currentTestimonial = 0;
const testimonialsTrack = document.getElementById('testimonialsTrack');
const testimonialsDots = document.querySelectorAll('.testimonials-dot');

function goToTestimonial(index) {
  currentTestimonial = index;
  testimonialsTrack.style.transform = `translateX(${-index * 100}%)`;
  testimonialsDots.forEach((d, i) => d.classList.toggle('active', i === index));
}

testimonialsDots.forEach(dot => {
  dot.addEventListener('click', () => goToTestimonial(parseInt(dot.dataset.index)));
});

let testimonialTimer = setInterval(() => goToTestimonial((currentTestimonial + 1) % 3), CONFIG.testimonialInterval);
const slider = document.querySelector('.testimonials-slider');
if (slider) {
  slider.addEventListener('mouseenter', () => clearInterval(testimonialTimer));
  slider.addEventListener('mouseleave', () => {
    testimonialTimer = setInterval(() => goToTestimonial((currentTestimonial + 1) % 3), CONFIG.testimonialInterval);
  });
}

// ==========================================
// CONTACT FORM → WhatsApp
// ==========================================
const contactForm = document.getElementById('contactForm');
if (contactForm) {
  contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const name = document.getElementById('name').value.trim();
    const phone = document.getElementById('phone').value.trim();
    const email = document.getElementById('email').value.trim();
    const eventType = document.getElementById('eventType').value;
    const eventDate = document.getElementById('eventDate').value;
    const message = document.getElementById('message').value.trim();

    if (!name || !phone || !eventType) {
      showToast('Please fill in your name, phone number, and event type.');
      return;
    }

    let waMsg = `Hi Maha! 👋\n\nI'd like to inquire about your services.\n\n📋 *Inquiry Details:*\n`;
    waMsg += `• *Name:* ${name}\n• *Phone:* ${phone}\n`;
    if (email) waMsg += `• *Email:* ${email}\n`;
    waMsg += `• *Event Type:* ${eventType}\n`;
    if (eventDate) waMsg += `• *Event Date:* ${eventDate}\n`;
    if (message) waMsg += `\n💬 *Message:*\n${message}\n`;
    waMsg += `\n— Sent from Makeup by Maha Website`;

    window.open(`https://wa.me/${CONFIG.whatsappNumber}?text=${encodeURIComponent(waMsg)}`, '_blank');
    showToast('Redirecting to WhatsApp... ✨');
    contactForm.reset();
  });
}

// ==========================================
// TOAST (enhanced with auto-dismiss animation)
// ==========================================
function showToast(msg, duration = 3000) {
  const toast = document.getElementById('toast');
  toast.textContent = msg;
  toast.classList.add('show');
  setTimeout(() => toast.classList.remove('show'), duration);
}

// ==========================================
// BACK TO TOP
// ==========================================
document.getElementById('backToTop').addEventListener('click', () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
});

// ==========================================
// FLOATING WHATSAPP - Auto show tooltip
// ==========================================
(function autoShowWhatsappTooltip() {
  const whatsappBtn = document.getElementById('floatingWhatsapp');
  const tooltip = whatsappBtn?.querySelector('.floating-whatsapp-tooltip');
  if (!tooltip) return;

  // Auto-show tooltip after 5 seconds for first-time visitors
  setTimeout(() => {
    tooltip.style.opacity = '1';
    tooltip.style.visibility = 'visible';
    tooltip.style.transform = 'translateX(-50%) translateY(-5px)';

    setTimeout(() => {
      tooltip.style.opacity = '';
      tooltip.style.visibility = '';
      tooltip.style.transform = '';
    }, 4000);
  }, 8000);
})();



// ==========================================
// SMOOTH SCROLL
// ==========================================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if (target) window.scrollTo({ top: target.offsetTop - 80, behavior: 'smooth' });
  });
});

// ==========================================
// PARALLAX HERO
// ==========================================
window.addEventListener('scroll', () => {
  const hero = document.querySelector('.hero-bg');
  if (hero && window.scrollY < window.innerHeight) {
    hero.style.transform = `scale(${1 + window.scrollY * 0.0003}) translateY(${window.scrollY * 0.3}px)`;
  }
});

// ==========================================
// CURSOR SPARKLES (enhanced)
// ==========================================
document.addEventListener('mousemove', (e) => {
  if (Math.random() > 0.95) {
    const s = document.createElement('div');
    const size = Math.random() * 6 + 3;
    s.style.cssText = `position:fixed;left:${e.clientX}px;top:${e.clientY}px;width:${size}px;height:${size}px;background:var(--primary);border-radius:50%;pointer-events:none;z-index:9998;animation:sparkle 0.8s ease-out forwards;`;
    document.body.appendChild(s);
    setTimeout(() => s.remove(), 800);
  }
});

const sparkleCSS = document.createElement('style');
sparkleCSS.textContent = `
  @keyframes sparkle {
    0% { opacity: 1; transform: scale(1) translate(0, 0); }
    50% { opacity: 0.8; }
    100% { opacity: 0; transform: scale(0) translate(${Math.random() * 40 - 20}px, ${Math.random() * 40 - 20}px); }
  }
`;
document.head.appendChild(sparkleCSS);

// ==========================================
// IMAGE LAZY LOAD WITH FADE-IN
// ==========================================
(function setupLazyFadeIn() {
  const images = document.querySelectorAll('img[loading="lazy"]');
  images.forEach(img => {
    img.style.opacity = '0';
    img.style.transition = 'opacity 0.6s ease';
    if (img.complete) {
      img.style.opacity = '1';
    } else {
      img.addEventListener('load', () => {
        img.style.opacity = '1';
      });
    }
  });
})();

// ==========================================
// NAV LOGO HOVER EFFECT
// ==========================================
const navLogo = document.getElementById('navLogo');
if (navLogo) {
  navLogo.addEventListener('mouseenter', () => {
    const logoImg = navLogo.querySelector('.nav-logo-img');
    if (logoImg) {
      logoImg.style.animation = 'preloaderSpin 0.6s ease';
      setTimeout(() => {
        logoImg.style.animation = '';
      }, 600);
    }
  });
}

// ==========================================
// REEL CARDS — Direct Instagram Links
// ==========================================
// Reel cards now use <a> tags linking directly to Instagram.
// No modal needed — clean and reliable!

// ==========================================
// LIGHTBOX FOR GALLERY IMAGES
// ==========================================
(function initLightbox() {
  // Create lightbox element
  const lightbox = document.createElement('div');
  lightbox.id = 'galleryLightbox';
  lightbox.className = 'gallery-lightbox';
  lightbox.innerHTML = `
    <div class="lightbox-backdrop"></div>
    <div class="lightbox-content">
      <button class="lightbox-close" aria-label="Close">✕</button>
      <img class="lightbox-img" src="" alt="">
      <div class="lightbox-info">
        <span class="lightbox-label"></span>
        <a class="lightbox-insta-link" href="#" target="_blank" rel="noopener">
          View on Instagram →
        </a>
      </div>
    </div>
  `;
  document.body.appendChild(lightbox);

  const lightboxImg = lightbox.querySelector('.lightbox-img');
  const lightboxLabel = lightbox.querySelector('.lightbox-label');
  const lightboxLink = lightbox.querySelector('.lightbox-insta-link');

  // Attach click listeners to gallery items
  document.addEventListener('click', (e) => {
    const galleryItem = e.target.closest('.gallery-item a');
    if (galleryItem) {
      e.preventDefault();
      const img = galleryItem.querySelector('img');
      const label = galleryItem.querySelector('.gallery-item-label');
      if (img) {
        lightboxImg.src = img.src;
        lightboxImg.alt = img.alt;
        lightboxLabel.textContent = label ? label.textContent : '';
        lightboxLink.href = galleryItem.href;
        lightbox.classList.add('active');
        document.body.style.overflow = 'hidden';
      }
    }
  });

  // Close lightbox
  const closeLightbox = () => {
    lightbox.classList.remove('active');
    document.body.style.overflow = '';
  };

  lightbox.querySelector('.lightbox-close').addEventListener('click', closeLightbox);
  lightbox.querySelector('.lightbox-backdrop').addEventListener('click', closeLightbox);
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && lightbox.classList.contains('active')) {
      closeLightbox();
    }
  });
})();

// ==========================================
// PARALLAX HERO EFFECT (background only)
// ==========================================
(function initParallax() {
  const heroBg = document.querySelector('.hero-bg');
  if (!heroBg) return;

  let ticking = false;
  window.addEventListener('scroll', () => {
    if (!ticking) {
      requestAnimationFrame(() => {
        const scrollY = window.scrollY;
        if (scrollY < window.innerHeight) {
          heroBg.style.transform = `scale(1.1) translateY(${scrollY * 0.15}px)`;
        }
        ticking = false;
      });
      ticking = true;
    }
  });
})();

// ==========================================
// BACK TO TOP BUTTON
// ==========================================
(function initBackToTop() {
  const btn = document.createElement('button');
  btn.id = 'backToTop';
  btn.className = 'back-to-top';
  btn.innerHTML = '↑';
  btn.setAttribute('aria-label', 'Back to top');
  document.body.appendChild(btn);

  window.addEventListener('scroll', () => {
    if (window.scrollY > 600) {
      btn.classList.add('visible');
    } else {
      btn.classList.remove('visible');
    }
  });

  btn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
})();

// ==========================================
// GALLERY TILT HOVER EFFECT (3D)
// ==========================================
(function initGalleryTilt() {
  document.querySelectorAll('.gallery-item').forEach(item => {
    item.addEventListener('mousemove', (e) => {
      const rect = item.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width;
      const y = (e.clientY - rect.top) / rect.height;
      const rotateX = (0.5 - y) * 10;
      const rotateY = (x - 0.5) * 10;
      item.style.transform = `perspective(500px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.02)`;
    });
    item.addEventListener('mouseleave', () => {
      item.style.transform = '';
    });
  });
})();

// ==========================================
// REEL CARD VIEW COUNT ANIMATION
// ==========================================
(function initReelViewCounts() {
  const badges = document.querySelectorAll('.reel-badge');
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.animation = 'fadeInUp 0.6s ease forwards';
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.5 });
  badges.forEach(b => observer.observe(b));
})();

// ==========================================
// CURSOR GLOW EFFECT (desktop only)
// ==========================================
(function initCursorGlow() {
  if (window.matchMedia('(hover: none)').matches) return;

  const glow = document.createElement('div');
  glow.className = 'cursor-glow';
  document.body.appendChild(glow);

  let mouseX = 0, mouseY = 0;
  let glowX = 0, glowY = 0;

  document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
  });

  function animateGlow() {
    glowX += (mouseX - glowX) * 0.12;
    glowY += (mouseY - glowY) * 0.12;
    glow.style.left = glowX + 'px';
    glow.style.top = glowY + 'px';
    requestAnimationFrame(animateGlow);
  }
  animateGlow();
})();


// Console Credit
console.log(
  '%c✨ Makeup by Maha %c Crafted with love 💛 | v6.0 ✨',
  'background:#1A1A1A;color:#2E8B57;padding:10px 15px;font-family:Georgia,serif;font-size:14px;',
  'background:#2E8B57;color:#1A1A1A;padding:10px 15px;font-size:12px;'
);

// ==========================================
// ABOUT EXPERT SHOTS SLIDER
// ==========================================
function initAboutSlider() {
  const sliderPhotos = document.querySelectorAll('#aboutSlider .about-hero-photo');
  if (sliderPhotos.length <= 1) return;

  let currentSlide = 0;

  setInterval(() => {
    sliderPhotos[currentSlide].classList.remove('active');
    currentSlide = (currentSlide + 1) % sliderPhotos.length;
    sliderPhotos[currentSlide].classList.add('active');
  }, 4000); // Crossfade every 4 seconds
}

