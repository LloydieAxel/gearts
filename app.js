// app.js
function switchTab(targetId, element) {
  const target = document.getElementById(targetId);
  const current = document.querySelector('.page-section.is-visible');

  if (!target || current === target) return;

  const navTarget = targetId.startsWith('activity-')
    ? 'part-1'
    : targetId.startsWith('p2-')
      ? 'part-2'
      : targetId.startsWith('app-')
        ? 'appendices'
        : targetId;

  document.querySelectorAll('video').forEach(v => v.pause());

  document.querySelectorAll('.nav-btn').forEach(btn => {
    btn.classList.toggle(
      'active',
      btn.dataset.target === navTarget
    );
  });

  document.body.classList.toggle(
    'home-lock',
    targetId === 'home'
  );

  document.getElementById('site-footer').style.display =
    targetId === 'home' ? 'none' : 'flex';

  if (current) {
    current.classList.remove('is-visible');
  }

  target.classList.add('is-visible');

  window.scrollTo(0, 0);
  document.documentElement.scrollTop = 0;
  document.body.scrollTop = 0;
}

function toggleProcess(button) {
  const drawer = button.nextElementSibling;
  const isOpen = drawer.classList.toggle('open');

  button.setAttribute('aria-expanded', String(isOpen));

  button.querySelector('span').textContent =
    isOpen ? '－' : '＋';
}

document.getElementById('site-footer').style.display = 'none';

// LIGHTBOX
const lightbox = document.getElementById('lightbox');
const lightboxImg = lightbox.querySelector('img');

document.addEventListener('click', e => {
  if (e.target.matches('.media-figure img')) {
    lightboxImg.src = e.target.src;
    lightboxImg.alt = e.target.alt;
    lightbox.classList.add('open');
  } else if (lightbox.classList.contains('open')) {
    lightbox.classList.remove('open');
  }
});

document.addEventListener('keydown', e => {
  if (e.key === 'Escape') lightbox.classList.remove('open');
});

// CUSTOM CURSOR

if (window.matchMedia('(hover: hover) and (pointer: fine)').matches) {

  const cursorDot = document.querySelector('.custom-cursor-dot');
  const cursorRing = document.querySelector('.custom-cursor-ring');

  document.body.classList.add('has-custom-cursor');

  let pointerX = -100;
  let pointerY = -100;
  let ringX = -100;
  let ringY = -100;

  window.addEventListener('mousemove', event => {
    pointerX = event.clientX;
    pointerY = event.clientY;

    cursorDot.style.transform =
      `translate(${pointerX}px, ${pointerY}px) translate(-50%, -50%)`;

    document.body.classList.add('cursor-ready');
  });

  function animateCursor() {
    ringX += (pointerX - ringX) * 0.18;
    ringY += (pointerY - ringY) * 0.18;

    cursorRing.style.transform =
      `translate(${ringX}px, ${ringY}px) translate(-50%, -50%)`;

    requestAnimationFrame(animateCursor);
  }

  animateCursor();

  document.addEventListener('mouseover', event => {
    if (event.target.closest(
      'a, button, .journey-item, [role="button"], input, textarea, select'
    )) {
      document.body.classList.add('cursor-hover');
    }
  });

  document.addEventListener('mouseout', event => {
    if (event.target.closest(
      'a, button, .journey-item, [role="button"], input, textarea, select'
    )) {
      document.body.classList.remove('cursor-hover');
    }
  });

  window.addEventListener('mouseleave', () => {
    document.body.classList.remove('cursor-ready');
  });

  window.addEventListener('mouseenter', () => {
    document.body.classList.add('cursor-ready');
  });
}