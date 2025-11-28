// =======================
// Smooth Scroll for Navbar
// =======================
document.querySelectorAll('nav a[href^="#"], .scroll-down').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    const href = this.getAttribute('href');
    if (href && href.startsWith('#')) {
      e.preventDefault();
      const target = document.querySelector(href);
      if (target) {
        target.scrollIntoView({ behavior: 'smooth' });
      }
    }
  });
});

// =======================
// Highlight Active Nav Link
// =======================
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-link');

window.addEventListener('scroll', () => {
  let current = '';
  sections.forEach(section => {
    const sectionTop = section.offsetTop - 120;
    if (window.scrollY >= sectionTop) {
      current = section.getAttribute('id');
    }
  });

  navLinks.forEach(link => {
    link.classList.remove('active');
    if (link.getAttribute('href') === `#${current}`) {
      link.classList.add('active');
    }
  });
});

// =======================
// Fade-in Animation on Scroll
// =======================
const fadeElements = document.querySelectorAll('.fade-section');

const appearOnScroll = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      appearOnScroll.unobserve(entry.target);
    }
  });
}, { threshold: 0.2 });

fadeElements.forEach(el => {
  appearOnScroll.observe(el);
});

// =======================
// Mobile Nav Toggle
// =======================
const navToggle = document.getElementById('nav-toggle');
const navMenu = document.getElementById('nav-menu');

if (navToggle && navMenu) {
  navToggle.addEventListener('click', () => {
    navMenu.classList.toggle('open');
  });

  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      navMenu.classList.remove('open');
    });
  });
}

// =======================
// Theme Toggle (Light / Dark) with localStorage
// =======================
const themeToggle = document.getElementById('theme-toggle');
const htmlEl = document.documentElement;

function setTheme(theme) {
  htmlEl.setAttribute('data-theme', theme);
  localStorage.setItem('portfolio-theme', theme);
}

function initTheme() {
  const storedTheme = localStorage.getItem('portfolio-theme');
  if (storedTheme) {
    setTheme(storedTheme);
  } else {
    // default light
    setTheme('light');
  }
}

initTheme();

if (themeToggle) {
  themeToggle.addEventListener('click', () => {
    const currentTheme = htmlEl.getAttribute('data-theme');
    setTheme(currentTheme === 'light' ? 'dark' : 'light');
  });
}

// =======================
// Typing Effect in Hero
// =======================
const typedTextEl = document.getElementById('typed-text');
const phrases = [
  'Android Developer specializing in Kotlin & Jetpack Compose',
  'Building intuitive, high-performance mobile apps',
  'Passionate about clean architecture & great UX'
];

let currentPhraseIndex = 0;
let currentCharIndex = 0;
let isDeleting = false;
let typingDelay = 120;
let pauseDelay = 1300;

function type() {
  if (!typedTextEl) return;

  const currentPhrase = phrases[currentPhraseIndex];

  if (!isDeleting) {
    typedTextEl.textContent = currentPhrase.slice(0, currentCharIndex + 1);
    currentCharIndex++;

    if (currentCharIndex === currentPhrase.length) {
      isDeleting = true;
      setTimeout(type, pauseDelay);
      return;
    }
  } else {
    typedTextEl.textContent = currentPhrase.slice(0, currentCharIndex - 1);
    currentCharIndex--;

    if (currentCharIndex === 0) {
      isDeleting = false;
      currentPhraseIndex = (currentPhraseIndex + 1) % phrases.length;
    }
  }

  const delay = isDeleting ? typingDelay / 2 : typingDelay;
  setTimeout(type, delay);
}

type();

// =======================
// Stats Counter Animation
// =======================
const statNumbers = document.querySelectorAll('.stat-number');

const statsObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const el = entry.target;
      const target = parseInt(el.getAttribute('data-target'), 10);
      let current = 0;
      const duration = 1500;
      const startTime = performance.now();

      function updateCounter(now) {
        const progress = Math.min((now - startTime) / duration, 1);
        current = Math.floor(progress * target);
        el.textContent = current + (target > 50 ? '+' : '');
        if (progress < 1) {
          requestAnimationFrame(updateCounter);
        } else {
          el.textContent = target + (target > 50 ? '+' : '');
        }
      }

      requestAnimationFrame(updateCounter);
      statsObserver.unobserve(el);
    }
  });
}, { threshold: 0.3 });

statNumbers.forEach(num => statsObserver.observe(num));

// =======================
// Scroll To Top Button
// =======================
const scrollTopBtn = document.getElementById('scroll-top');

window.addEventListener('scroll', () => {
  if (window.scrollY > 400) {
    scrollTopBtn.classList.add('show');
  } else {
    scrollTopBtn.classList.remove('show');
  }
});

scrollTopBtn.addEventListener('click', () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
});

// =======================
// Contact Form Basic Validation & Feedback
// =======================
const contactForm = document.getElementById('contact-form');
const formStatus = document.getElementById('form-status');

if (contactForm && formStatus) {
  contactForm.addEventListener('submit', (e) => {
    const name = contactForm.name.value.trim();
    const email = contactForm._replyto.value.trim();
    const message = contactForm.message.value.trim();

    if (!name || !email || !message) {
      e.preventDefault();
      formStatus.textContent = 'Please fill in all fields.';
      formStatus.style.color = '#ef4444';
      return;
    }

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(email)) {
      e.preventDefault();
      formStatus.textContent = 'Please enter a valid email address.';
      formStatus.style.color = '#ef4444';
      return;
    }

    // Let Formspree handle submission; show success hint
    formStatus.textContent = 'Sending message...';
    formStatus.style.color = '#22c55e';
  });
}
function openCertificate(pdfFile) {
  document.getElementById("certificateFrame").src = pdfFile;
  document.getElementById("certificateModal").style.display = "flex";
}

function closeCertificate() {
  document.getElementById("certificateModal").style.display = "none";
}
// =======================
// App Preview Images (JPG)
// =======================
let images = {
  nearby: ["near1.jpg", "near2.jpg", "near3.jpg", "near4.jpg", "near5.jpg"],
  loan: ["loan1.jpg", "loan2.jpg", "loan3.jpg", "loan4.jpg", "loan5.jpg"],
  expense: ["expense1.jpg", "expense2.jpg", "expense3.jpg", "expense4.jpg", "expense5.jpg"],
  campus: ["campus1.jpg", "campus2.jpg", "campus3.jpg", "campus4.jpg", "campus5.jpg"]
};

let currentProject = "";
let index = 0;

function openPreview(project) {
  currentProject = project;
  index = 0;
  const modal = document.getElementById("appPreviewModal");
  const imgEl = document.getElementById("previewImage");

  if (!images[project] || images[project].length === 0) return;

  imgEl.src = images[project][index];
  modal.style.display = "flex";
}

function nextImage() {
  if (!currentProject) return;
  index = (index + 1) % images[currentProject].length;
  document.getElementById("previewImage").src = images[currentProject][index];
}

function prevImage() {
  if (!currentProject) return;
  index = (index - 1 + images[currentProject].length) % images[currentProject].length;
  document.getElementById("previewImage").src = images[currentProject][index];
}

function closePreview() {
  document.getElementById("appPreviewModal").style.display = "none";
}
