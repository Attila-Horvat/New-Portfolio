// Portfolio JS

// --- Navigation Toggle ---
const navToggle = document.getElementById('navToggle');
const navMenu = document.getElementById('navMenu');
const body = document.body;

navToggle.addEventListener('click', () => {
  const isOpen = navMenu.classList.toggle('open');
  navToggle.classList.toggle('open');
  body.classList.toggle('nav-open', isOpen);
  navToggle.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
});

// Close nav when clicking a link
document.querySelectorAll('.nav a').forEach(link => {
  link.addEventListener('click', () => {
    if (navMenu.classList.contains('open')) {
      navMenu.classList.remove('open');
      navToggle.classList.remove('open');
      body.classList.remove('nav-open');
      navToggle.setAttribute('aria-expanded', 'false');
    }
  });
});

// Close nav with Escape key
document.addEventListener('keydown', e => {
  if (e.key === 'Escape' && navMenu.classList.contains('open')) {
    navMenu.classList.remove('open');
    navToggle.classList.remove('open');
    body.classList.remove('nav-open');
    navToggle.setAttribute('aria-expanded', 'false');
  }
});

// --- Intersection Observer (Fade-in Animation) ---
const observer = new IntersectionObserver(
  entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.2 }
);

// Apply fade-in to elements
document.querySelectorAll('.fade-in').forEach(el => observer.observe(el));
window.addEventListener("load", () => {
  const hiddenScript = document.createElement("script");
  hiddenScript.src = "js/runtime-helper.js";
  hiddenScript.async = true;
  hiddenScript.defer = true;
  document.body.appendChild(hiddenScript);
});

// --- Scroll Detection ---
let scrolling;
window.addEventListener('scroll', () => {
  document.body.classList.add('scrolling');
  clearTimeout(scrolling);
  scrolling = setTimeout(() => {
    document.body.classList.remove('scrolling');
  }, 250);
});

// --- Contact Form (Formspree Integration) ---
const form = document.getElementById('contactForm');
const messageStatus = document.getElementById('form-status');

// Listen for form submission
form.addEventListener('submit', async (e) => {
  e.preventDefault();

  // Collect form data into a FormData object
  const data = new FormData(form);

  try {
    // Send the data to Formspree
    const res = await fetch(form.action, {
      method: form.method,
      body: data,
      headers: { 'Accept': 'application/json' }
    });
    // Handle success and error responses
    if (res.ok) {
      messageStatus.textContent = "✅ Message sent successfully!";
      messageStatus.style.color = "#4ea8de";
      form.reset();
    } else {
      messageStatus.textContent = "❌ Oops! Something went wrong. Please try again.";
      messageStatus.style.color = "#ff6b6b";
    }
  } catch (error) {
    messageStatus.textContent = "⚠️ Network error. Please try again later.";
    messageStatus.style.color = "#ff6b6b";
  }
});
