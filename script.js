const CONFIG = {
  whatsappNumber: '916385124295',
  headerThreshold: 18,
  backToTopThreshold: 520,
};

const header = document.getElementById('siteHeader');
const menuToggle = document.getElementById('menuToggle');
const siteNav = document.getElementById('siteNav');
const navLinks = Array.from(document.querySelectorAll('.nav-link'));
const backToTopButton = document.getElementById('backToTop');
const toast = document.getElementById('toast');
const contactForm = document.getElementById('contactForm');
const eventDateInput = document.getElementById('eventDate');
const year = document.getElementById('year');
const revealItems = Array.from(document.querySelectorAll('.reveal'));
const heroCollage = document.getElementById('heroCollage');

let toastTimer;

if (year) {
  year.textContent = new Date().getFullYear();
}

if (eventDateInput) {
  eventDateInput.min = new Date().toISOString().split('T')[0];
}

function showToast(message) {
  if (!toast) {
    return;
  }

  toast.textContent = message;
  toast.classList.add('is-visible');
  window.clearTimeout(toastTimer);
  toastTimer = window.setTimeout(() => {
    toast.classList.remove('is-visible');
  }, 2600);
}

function closeMenu() {
  if (!menuToggle || !siteNav) {
    return;
  }

  menuToggle.classList.remove('is-active');
  menuToggle.setAttribute('aria-expanded', 'false');
  siteNav.classList.remove('is-open');
  document.body.classList.remove('nav-open');
}

function openMenu() {
  if (!menuToggle || !siteNav) {
    return;
  }

  menuToggle.classList.add('is-active');
  menuToggle.setAttribute('aria-expanded', 'true');
  siteNav.classList.add('is-open');
  document.body.classList.add('nav-open');
}

if (menuToggle) {
  menuToggle.addEventListener('click', () => {
    const isOpen = siteNav?.classList.contains('is-open');
    if (isOpen) {
      closeMenu();
    } else {
      openMenu();
    }
  });
}

document.addEventListener('click', (event) => {
  if (!siteNav || !menuToggle || !siteNav.classList.contains('is-open')) {
    return;
  }

  if (!siteNav.contains(event.target) && !menuToggle.contains(event.target)) {
    closeMenu();
  }
});

document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape') {
    closeMenu();
  }
});

document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener('click', (event) => {
    const href = anchor.getAttribute('href');
    if (!href || href === '#') {
      return;
    }

    const target = document.querySelector(href);
    if (!target) {
      return;
    }

    event.preventDefault();
    const headerOffset = header ? header.offsetHeight + 10 : 0;
    const targetTop = target.getBoundingClientRect().top + window.scrollY - headerOffset;
    window.scrollTo({
      top: targetTop,
      behavior: 'smooth',
    });
    closeMenu();
  });
});

function updateChrome() {
  if (header) {
    header.classList.toggle('is-scrolled', window.scrollY > CONFIG.headerThreshold);
  }

  if (backToTopButton) {
    backToTopButton.classList.toggle('is-visible', window.scrollY > CONFIG.backToTopThreshold);
  }

  const offset = window.scrollY + (header ? header.offsetHeight : 0) + 140;
  let activeId = '#about';

  navLinks.forEach((link) => {
    const href = link.getAttribute('href');
    const section = href ? document.querySelector(href) : null;
    if (section && offset >= section.offsetTop) {
      activeId = href;
    }
  });

  navLinks.forEach((link) => {
    link.classList.toggle('is-active', link.getAttribute('href') === activeId);
  });
}

window.addEventListener('scroll', updateChrome, { passive: true });
window.addEventListener('load', updateChrome);
updateChrome();

if (backToTopButton) {
  backToTopButton.addEventListener('click', () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  });
}

if ('IntersectionObserver' in window) {
  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) {
        return;
      }

      entry.target.classList.add('is-visible');
      revealObserver.unobserve(entry.target);
    });
  }, {
    threshold: 0.14,
    rootMargin: '0px 0px -48px 0px',
  });

  revealItems.forEach((item) => revealObserver.observe(item));
} else {
  revealItems.forEach((item) => item.classList.add('is-visible'));
}

if (contactForm) {
  contactForm.addEventListener('submit', (event) => {
    event.preventDefault();

    const name = document.getElementById('name')?.value.trim() || '';
    const phone = document.getElementById('phone')?.value.trim() || '';
    const email = document.getElementById('email')?.value.trim() || '';
    const city = document.getElementById('city')?.value.trim() || '';
    const eventType = document.getElementById('eventType')?.value || '';
    const eventDate = document.getElementById('eventDate')?.value || '';
    const message = document.getElementById('message')?.value.trim() || '';

    if (!name || !phone || !eventType) {
      showToast('Please fill name, phone, and event type.');
      return;
    }

    const lines = [
      'Hi Maha!',
      '',
      "I'd like to inquire about your bridal services.",
      '',
      '*Inquiry details*',
      `Name: ${name}`,
      `Phone: ${phone}`,
      `Event type: ${eventType}`,
    ];

    if (email) {
      lines.push(`Email: ${email}`);
    }

    if (city) {
      lines.push(`Event city: ${city}`);
    }

    if (eventDate) {
      lines.push(`Event date: ${eventDate}`);
    }

    if (message) {
      lines.push('', '*Message*', message);
    }

    lines.push('', 'Sent from the Makeup by Maha website');

    const whatsappUrl =
      `https://wa.me/${CONFIG.whatsappNumber}?text=${encodeURIComponent(lines.join('\n'))}`;

    window.open(whatsappUrl, '_blank', 'noopener');
    showToast('Opening WhatsApp...');
    contactForm.reset();
  });
}

function initHeroMotion() {
  const supportsHover = window.matchMedia('(hover: hover) and (pointer: fine)').matches;
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  if (!heroCollage || !supportsHover || reducedMotion) {
    return;
  }

  heroCollage.addEventListener('mousemove', (event) => {
    const bounds = heroCollage.getBoundingClientRect();
    const x = (event.clientX - bounds.left) / bounds.width;
    const y = (event.clientY - bounds.top) / bounds.height;
    const rotateY = (x - 0.5) * 8;
    const rotateX = (0.5 - y) * 8;

    heroCollage.style.transform =
      `perspective(1400px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
  });

  heroCollage.addEventListener('mouseleave', () => {
    heroCollage.style.transform = '';
  });
}

initHeroMotion();
