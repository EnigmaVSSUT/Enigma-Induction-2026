/* ─────────────────────────────────────────
   ENIGMA CODING CLUB — JAVASCRIPT
   ───────────────────────────────────────── */

// ── CUSTOM CURSOR ──
const cursor = document.getElementById('cursor');
const trail = document.getElementById('cursorTrail');
let mouseX = 0, mouseY = 0;
let trailX = 0, trailY = 0;

document.addEventListener('mousemove', (e) => {
  mouseX = e.clientX;
  mouseY = e.clientY;
  cursor.style.left = mouseX + 'px';
  cursor.style.top  = mouseY + 'px';
});

function animateTrail() {
  trailX += (mouseX - trailX) * 0.12;
  trailY += (mouseY - trailY) * 0.12;
  trail.style.left = trailX + 'px';
  trail.style.top  = trailY + 'px';
  requestAnimationFrame(animateTrail);
}
animateTrail();


// ── MATRIX RAIN CANVAS ──
const canvas = document.getElementById('matrixCanvas');
const ctx = canvas.getContext('2d');

function resizeCanvas() {
  canvas.width  = window.innerWidth;
  canvas.height = window.innerHeight;
}
resizeCanvas();
window.addEventListener('resize', resizeCanvas);

const matrixChars = 'ENIGMA01アイウエオカキクケコサシスセソ<>[]{}();=+-*/!@#%^&ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
const fontSize = 13;
let columns = Math.floor(window.innerWidth / fontSize);
let drops   = Array(columns).fill(1);

function drawMatrix() {
  ctx.fillStyle = 'rgba(5,10,14,0.05)';
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  ctx.fillStyle = '#00ffe0';
  ctx.font = `${fontSize}px Share Tech Mono, monospace`;

  for (let i = 0; i < drops.length; i++) {
    const char = matrixChars[Math.floor(Math.random() * matrixChars.length)];
    ctx.fillText(char, i * fontSize, drops[i] * fontSize);
    if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) drops[i] = 0;
    drops[i]++;
  }
}
setInterval(drawMatrix, 50);


// ── NAVBAR SCROLL ──
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 50);
});


// ── HAMBURGER MENU ──
const hamburger = document.getElementById('hamburger');
const navLinks  = document.querySelector('.nav-links');

hamburger.addEventListener('click', () => {
  hamburger.classList.toggle('open');
  navLinks.classList.toggle('open');
});

document.querySelectorAll('.nav-link').forEach(link => {
  link.addEventListener('click', () => {
    hamburger.classList.remove('open');
    navLinks.classList.remove('open');
  });
});


// ── HERO TERMINAL TYPEWRITER ──
const terminalLines = [
  { type: 'prompt', cmd: 'enigma --version',         delay: 400  },
  { type: 'output', text: 'ENIGMA v2.0.26 — ONLINE', delay: 900  },
  { type: 'prompt', cmd: 'ls domains/',               delay: 1500 },
  { type: 'output', text: 'web-dev/  app-dev/  cpp/', delay: 2000 },
  { type: 'output', text: 'cloud/  game-dev/',        delay: 2100 },
  { type: 'output', text: 'ui-ux/  cyber-sec/',       delay: 2200 },
  { type: 'prompt', cmd: 'whoami',                    delay: 2800 },
  { type: 'output', text: 'root@enigma — member',     delay: 3300 },
  { type: 'prompt', cmd: 'cat motto.txt',             delay: 4000 },
  { type: 'output', text: '"Code. Create. Conquer."', delay: 4500 },
  { type: 'prompt', cmd: './join_enigma.sh',          delay: 5200 },
  { type: 'output', text: '✓ Access granted. Welcome!', delay: 5700 },
];

const termBody = document.getElementById('terminalBody');

function typeText(element, text, speed = 40) {
  return new Promise(resolve => {
    let i = 0;
    const interval = setInterval(() => {
      element.textContent += text[i];
      i++;
      if (i >= text.length) { clearInterval(interval); resolve(); }
    }, speed);
  });
}

async function renderTerminal() {
  for (const line of terminalLines) {
    await new Promise(r => setTimeout(r, line.delay - (terminalLines[0].delay)));

    const div = document.createElement('div');
    div.className = 't-line';

    if (line.type === 'prompt') {
      div.innerHTML = `<span class="t-prompt">enigma@club:~$ </span><span class="t-cmd"></span>`;
      termBody.appendChild(div);
      await typeText(div.querySelector('.t-cmd'), line.cmd, 45);
    } else {
      div.className = 't-line t-output';
      div.textContent = '';
      termBody.appendChild(div);
      await typeText(div, line.text, 20);
    }

    termBody.scrollTop = termBody.scrollHeight;
  }

  // Add blinking cursor at end
  const cursorDiv = document.createElement('div');
  cursorDiv.className = 't-line';
  cursorDiv.innerHTML = `<span class="t-prompt">enigma@club:~$ </span><span class="t-cursor"></span>`;
  termBody.appendChild(cursorDiv);
}

// Start terminal after short delay
setTimeout(renderTerminal, 600);


// ── COUNTER ANIMATION ──
function animateCounter(el) {
  const target = parseInt(el.dataset.target);
  const duration = 1800;
  const start = performance.now();

  function update(now) {
    const elapsed = now - start;
    const progress = Math.min(elapsed / duration, 1);
    // Ease out expo
    const ease = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);
    el.textContent = Math.floor(ease * target);
    if (progress < 1) requestAnimationFrame(update);
    else el.textContent = target;
  }
  requestAnimationFrame(update);
}

const counterObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      animateCounter(entry.target);
      counterObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.5 });

document.querySelectorAll('.stat-num').forEach(el => counterObserver.observe(el));


// ── SCROLL FADE-UP ANIMATIONS ──
// Add fade-up class to elements
const animTargets = [
  '.domain-card', '.event-item', '.team-card',
  '.about-text', '.about-visual', '.join-text', '.join-form',
  '.hero-tag', '.hero-title', '.hero-sub', '.hero-desc',
  '.hero-stats', '.hero-btns'
];

animTargets.forEach(selector => {
  document.querySelectorAll(selector).forEach((el, i) => {
    el.classList.add('fade-up');
    el.style.transitionDelay = `${i * 0.08}s`;
  });
});

const fadeObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      fadeObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

document.querySelectorAll('.fade-up').forEach(el => fadeObserver.observe(el));


// ── DOMAIN CARD GLOW ON MOUSE MOVE ──
document.querySelectorAll('.domain-card').forEach(card => {
  card.addEventListener('mousemove', (e) => {
    const rect = card.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    card.querySelector('.card-glow').style.background =
      `radial-gradient(ellipse 80% 80% at ${x}% ${y}%, rgba(0,255,224,0.08), transparent 70%)`;
  });
  card.addEventListener('mouseleave', () => {
    card.querySelector('.card-glow').style.background =
      'radial-gradient(ellipse 80% 80% at 50% 0%, rgba(0,255,224,0.04), transparent 70%)';
  });
});


// ── JOIN FORM SUBMISSION ──
const joinForm = document.getElementById('joinForm');
const toast    = document.getElementById('toast');

joinForm.addEventListener('submit', (e) => {
  e.preventDefault();

  const btn = joinForm.querySelector('button[type="submit"]');
  btn.textContent = 'PROCESSING...';
  btn.disabled = true;

  setTimeout(() => {
    btn.textContent = '✓ APPLICATION SUBMITTED';
    btn.style.background = 'var(--green)';
    joinForm.reset();

    // Show toast
    toast.classList.add('show');
    setTimeout(() => toast.classList.remove('show'), 4000);

    // Reset button
    setTimeout(() => {
      btn.textContent = 'SUBMIT_APPLICATION →';
      btn.style.background = '';
      btn.disabled = false;
    }, 3000);
  }, 1600);
});


// ── ACTIVE NAV LINK ON SCROLL ──
const sections = document.querySelectorAll('section[id]');
const navLinkEls = document.querySelectorAll('.nav-link');

const sectionObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const id = entry.target.getAttribute('id');
      navLinkEls.forEach(link => {
        link.classList.toggle('active', link.getAttribute('href') === `#${id}`);
      });
    }
  });
}, { threshold: 0.4 });

sections.forEach(s => sectionObserver.observe(s));


// ── GLITCH ON HOVER (hero title) ──
const glitchEl = document.querySelector('.glitch');
if (glitchEl) {
  glitchEl.addEventListener('mouseenter', () => {
    glitchEl.style.animation = 'none';
    setTimeout(() => glitchEl.style.animation = '', 50);
  });
}


// ── HEX GRID RANDOM PULSE ──
const hexes = document.querySelectorAll('.hex');
function randomHexPulse() {
  const idx = Math.floor(Math.random() * hexes.length);
  hexes[idx].classList.add('active');
  setTimeout(() => {
    // Only remove if it wasn't originally active
    if (!['CODE', 'LEARN', 'HACK'].includes(hexes[idx].querySelector('span').textContent)) {
      hexes[idx].classList.remove('active');
    }
  }, 800);
}
setInterval(randomHexPulse, 1200);


// ── RESIZE: update matrix columns ──
window.addEventListener('resize', () => {
  columns = Math.floor(window.innerWidth / fontSize);
  drops   = Array(columns).fill(1);
});