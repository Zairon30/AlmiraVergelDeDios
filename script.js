document.getElementById('year').textContent = new Date().getFullYear();

const burger = document.querySelector('.burger');
const menu = document.getElementById('menu');
burger.addEventListener('click', () => {
  const open = menu.classList.toggle('open');
  burger.setAttribute('aria-expanded', open);
});
menu.addEventListener('click', e => {
  if (e.target.tagName === 'A') { menu.classList.remove('open'); burger.setAttribute('aria-expanded', false); }
});

// CONTACT FORM (sends straight to your inbox via Web3Forms, free)
// 1. Go to https://web3forms.com, enter almiravergeldedios0@gmail.com, and get your Access Key by email.
// 2. Paste the key below. Until you do, the form falls back to opening the visitor's email app.
const ACCESS_KEY = 'PASTE_YOUR_WEB3FORMS_ACCESS_KEY_HERE';
const TO_EMAIL = 'almiravergeldedios0@gmail.com';
const form = document.getElementById('form');
const status = document.getElementById('status');
const sendBtn = form.querySelector('button[type="submit"]');
form.addEventListener('submit', async e => {
  e.preventDefault();
  if (!form.checkValidity()) { status.textContent = 'Please fill in your name, a valid email and a message.'; return; }
  const d = new FormData(form);
  if (ACCESS_KEY.startsWith('PASTE_')) {
    const subject = encodeURIComponent('Portfolio inquiry from ' + d.get('name'));
    const body = encodeURIComponent(d.get('message') + '\n\nFrom: ' + d.get('name') + ' (' + d.get('email') + ')');
    window.location.href = `mailto:${TO_EMAIL}?subject=${subject}&body=${body}`;
    status.textContent = 'Opening your email app to send the message.';
    return;
  }
  sendBtn.disabled = true; sendBtn.textContent = 'Sending...'; status.textContent = '';
  try {
    const res = await fetch('https://api.web3forms.com/submit', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
      body: JSON.stringify({
        access_key: ACCESS_KEY,
        subject: 'Portfolio inquiry from ' + d.get('name'),
        name: d.get('name'), email: d.get('email'), message: d.get('message'),
        botcheck: d.get('botcheck') || ''
      })
    });
    const out = await res.json();
    if (out.success) { form.reset(); status.textContent = 'Thank you! Your message was sent.'; }
    else { status.textContent = 'Sorry, the message could not be sent. Please email ' + TO_EMAIL + ' directly.'; }
  } catch (err) {
    status.textContent = 'Network error. Please email ' + TO_EMAIL + ' directly.';
  } finally { sendBtn.disabled = false; sendBtn.textContent = 'Send message'; }
});

// Subtle reveal on scroll
// Replays every time a section scrolls into view (and resets when it leaves)
const io = new IntersectionObserver(es => es.forEach(e => e.target.classList.toggle('in', e.isIntersecting)), { threshold: .12 });
document.querySelectorAll('.reveal').forEach(el => io.observe(el));

// Highlight current section in nav
const links = [...document.querySelectorAll('nav a')];
const spy = new IntersectionObserver(es => es.forEach(e => {
  if (e.isIntersecting) links.forEach(a => a.classList.toggle('active', a.getAttribute('href') === '#' + e.target.id));
}), { rootMargin: '-45% 0px -50% 0px' });
links.forEach(a => { const s = document.querySelector(a.getAttribute('href')); if (s) spy.observe(s); });

// Stagger index for animated children
document.querySelectorAll('.bento,.stats,.skills,.timeline,.edu,.chips').forEach(group => {
  [...group.children].forEach((el, i) => el.style.setProperty('--i', i));
});

// Scroll progress bar + nav shadow
const bar = document.querySelector('.progress');
const nav = document.querySelector('.nav');
let ticking = false;
addEventListener('scroll', () => {
  if (ticking) return; ticking = true;
  requestAnimationFrame(() => {
    const max = document.documentElement.scrollHeight - innerHeight;
    bar.style.transform = 'scaleX(' + (max > 0 ? scrollY / max : 0) + ')';
    nav.classList.toggle('scrolled', scrollY > 20);
    ticking = false;
  });
}, { passive: true });

// Reveal the final CTA and footer
const io2 = new IntersectionObserver(es => es.forEach(e => e.target.classList.toggle('in', e.isIntersecting)), { threshold: .15 });
document.querySelectorAll('.reveal-s').forEach(el => io2.observe(el));

// Replay the hero entrance whenever the hero comes back into view
const hero = document.querySelector('.hero');
const heroEls = hero.querySelectorAll('.hero-text>*, .portrait');
new IntersectionObserver(es => es.forEach(e => {
  if (!e.isIntersecting) return;
  heroEls.forEach(el => { el.style.animation = 'none'; void el.offsetWidth; el.style.animation = ''; });
}), { threshold: .35 }).observe(hero);
