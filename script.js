// Product hero slide data: each slide stores image URL, product name, and descriptive text.
const slides = [
  { image:'https://images.pexels.com/photos/35891648/pexels-photo-35891648.jpeg?auto=compress&cs=tinysrgb&w=1200', name:'Halden Lounge Sofa', detail:'Rust boucle. Made to order in eight weeks.' },
  { image:'https://images.pexels.com/photos/11112735/pexels-photo-11112735.jpeg?auto=compress&cs=tinysrgb&w=1200', name:'Skagen Easy Chair', detail:'Grey wool and solid oak. Built in Jutland.' },
  { image:'https://images.pexels.com/photos/13169774/pexels-photo-13169774.jpeg?auto=compress&cs=tinysrgb&w=1200', name:'Bre Two Seat Sofa', detail:'Brick velvet. Modular from the inside out.' }
];

// Current slide position is tracked with this variable.
let current = 0;

// Hero image element used for the product slide display.
const heroImg = document.getElementById('heroImg');

// Move through the slides when the left or right arrow button is pressed.
document.querySelectorAll('.slide-btn').forEach(button => button.addEventListener('click', () => {
  current = (current + Number(button.dataset.dir) + slides.length) % slides.length;
  heroImg.style.opacity = 0;

  // Wait briefly to fade the hero image before updating product details.
  setTimeout(() => {
    heroImg.src = slides[current].image;
    heroImg.alt = slides[current].name;
    document.getElementById('heroProduct').textContent = slides[current].name;
    document.getElementById('heroDetails').textContent = slides[current].detail;
    document.getElementById('slideNo').textContent = `0${current + 1} / 03`;
    heroImg.style.opacity = 1;
  }, 220);
}));

// Mobile menu drawer control: open/close, update ARIA state, and lock body scroll while open.
const menu = document.getElementById('menu');
const toggleMenu = open => {
  menu.classList.toggle('open', open);
  menu.setAttribute('aria-hidden', String(!open));
  document.body.style.overflow = open ? 'hidden' : '';
};

document.getElementById('menuBtn').addEventListener('click', () => toggleMenu(true));
document.getElementById('closeMenu').addEventListener('click', () => toggleMenu(false));
document.querySelectorAll('.menu-nav').forEach(link => link.addEventListener('click', () => toggleMenu(false)));
document.addEventListener('keydown', event => { if (event.key === 'Escape') toggleMenu(false); });

// Toast notification helper: update the message and auto-hide it after a short delay.
const toast = document.getElementById('toast');
let toastTimer;

function showToast(message) {
  clearTimeout(toastTimer);
  toast.textContent = message;
  toast.classList.add('show');
  toastTimer = setTimeout(() => toast.classList.remove('show'), 2800);
}

// Toast messages are shown for cart, configure, consultation, and newsletter interactions.
document.getElementById('cartBtn').addEventListener('click', () => showToast('Two considered pieces are waiting in your cart.'));
document.querySelectorAll('.configure').forEach(btn => btn.addEventListener('click', () => showToast('The Bre configurator is ready for your measurements.')));
document.querySelectorAll('.consultation').forEach(btn => btn.addEventListener('click', () => showToast('Consultation request received. We will be in touch.')));
document.getElementById('newsletterForm').addEventListener('submit', event => {
  event.preventDefault();
  showToast(`Welcome to the workshop letters, ${document.getElementById('emailInput').value}.`);
  event.target.reset();
});

// IntersectionObserver reveals each section when it enters the viewport.
const observer = new IntersectionObserver(entries => entries.forEach(entry => {
  if (entry.isIntersecting) {
    entry.target.classList.add('visible');
    observer.unobserve(entry.target);
  }
}), { threshold:.13 });

document.querySelectorAll('.reveal').forEach(el => observer.observe(el));