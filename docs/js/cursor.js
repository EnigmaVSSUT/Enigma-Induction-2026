/* ═══════════════════════════════════════════════
   CURSOR.JS — Custom animated cursor
═══════════════════════════════════════════════ */

const ring = document.getElementById('cursor-ring');
const dot  = document.getElementById('cursor-dot');

let mx = 0, my = 0, rx = 0, ry = 0;

// Move the dot instantly
document.addEventListener('mousemove', e => {
  mx = e.clientX;
  my = e.clientY;
  dot.style.left = mx + 'px';
  dot.style.top  = my + 'px';
});

// Lag the ring slightly for a smooth trailing effect
(function animRing() {
  rx += (mx - rx) * 0.12;
  ry += (my - ry) * 0.12;
  ring.style.left = rx + 'px';
  ring.style.top  = ry + 'px';
  requestAnimationFrame(animRing);
})();

// Scale up ring on interactive elements
function attachCursorHover(selector) {
  document.querySelectorAll(selector).forEach(el => {
    el.addEventListener('mouseenter', () => {
      ring.style.transform = 'translate(-50%,-50%) scale(1.6)';
      ring.style.borderColor = 'var(--green)';
    });
    el.addEventListener('mouseleave', () => {
      ring.style.transform = 'translate(-50%,-50%) scale(1)';
      ring.style.borderColor = 'var(--cyan)';
    });
  });
}

// Expose so render.js can call it after injecting dynamic cards
window.attachCursorHover = attachCursorHover;

// Initial pass for static elements
attachCursorHover('button, a');
