// ===== Footer year =====
const yearEl = document.getElementById('year');
if (yearEl) yearEl.textContent = new Date().getFullYear();

// ===== Splash intro (shows once per browser session) =====
(function initSplash() {
  const splash = document.getElementById('splash');
  if (!splash) return;

  const alreadySeen = sessionStorage.getItem('stv_splash_seen');
  if (alreadySeen) {
    splash.remove();
    return;
  }

  document.body.classList.add('no-scroll');

  function dismiss() {
    splash.classList.add('hide');
    document.body.classList.remove('no-scroll');
    sessionStorage.setItem('stv_splash_seen', '1');
    setTimeout(() => splash.remove(), 550);
  }

  splash.addEventListener('click', dismiss);
  setTimeout(dismiss, 1900); // auto-dismiss
})();

// ===== Countdown =====
(function initCountdown() {
  const el = document.getElementById('countdown');
  if (!el) return;
  const target = new Date(el.dataset.target).getTime();

  const dEl = el.querySelector('[data-unit="d"]');
  const hEl = el.querySelector('[data-unit="h"]');
  const mEl = el.querySelector('[data-unit="m"]');
  const sEl = el.querySelector('[data-unit="s"]');
  const pad = n => String(n).padStart(2, '0');

  function tick() {
    const diff = target - Date.now();
    if (diff <= 0) {
      el.classList.add('is-live');
      dEl.textContent = hEl.textContent = mEl.textContent = sEl.textContent = '--';
      el.querySelectorAll('.cd-label')[0].textContent = '';
      clearInterval(timer);
      return;
    }
    const s = Math.floor(diff / 1000);
    dEl.textContent = pad(Math.floor(s / 86400));
    hEl.textContent = pad(Math.floor((s % 86400) / 3600));
    mEl.textContent = pad(Math.floor((s % 3600) / 60));
    sEl.textContent = pad(s % 60);
  }

  tick();
  const timer = setInterval(tick, 1000);
})();

// ===== Live YouTube embed (shows live broadcast automatically, falls back to most recent stream when offline) =====
(function initYouTube() {
  const wrap = document.getElementById('yt-embed');
  if (!wrap) return;
  const channelId = wrap.dataset.channelId;

  const iframe = document.createElement('iframe');
  // youtube-nocookie.com avoids the "Error 153: Video player configuration error"
  // that the standard youtube.com embed domain can throw in some browser/referrer setups.
  iframe.src = `https://www.youtube-nocookie.com/embed/live_stream?channel=${channelId}&autoplay=0`;
  iframe.referrerPolicy = 'strict-origin-when-cross-origin';
  iframe.allowFullscreen = true;
  iframe.setAttribute('allow', 'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share');
  iframe.title = 'Slingshot TV live player';

  iframe.addEventListener('load', () => {
    const fallback = wrap.querySelector('.player-fallback');
    if (fallback) fallback.remove();
  });

  wrap.appendChild(iframe);
})();

// ===== 3D tilt on hover (mouse only) =====
(function initTilt() {
  if (!window.matchMedia('(pointer: fine)').matches) return;

  const MAX_TILT = 7;
  document.querySelectorAll('.tilt').forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const r = card.getBoundingClientRect();
      const px = (e.clientX - r.left) / r.width;  // 0..1
      const py = (e.clientY - r.top) / r.height;  // 0..1
      const rx = (0.5 - py) * MAX_TILT * 2;
      const ry = (px - 0.5) * MAX_TILT * 2;
      card.style.transform = `perspective(700px) rotateX(${rx}deg) rotateY(${ry}deg) translateY(-2px)`;
    });
    card.addEventListener('mouseleave', () => {
      card.style.transform = '';
    });
  });
})();

// ===== Scroll-reveal animation =====
const revealEls = document.querySelectorAll('.reveal');
const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry, i) => {
    if (entry.isIntersecting) {
      setTimeout(() => entry.target.classList.add('in-view'), i * 60);
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });

revealEls.forEach(el => observer.observe(el));

// ===== Placeholder link warning (X / Twitter) =====
document.querySelectorAll('[data-todo]').forEach(el => {
  el.addEventListener('click', (e) => {
    if (el.getAttribute('href') === '#') {
      e.preventDefault();
      console.warn('TODO: ' + el.dataset.todo);
    }
  });
});
