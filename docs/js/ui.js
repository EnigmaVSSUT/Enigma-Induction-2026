/* ==========================================
   ui.js — Scroll Progress, Nav Spy, Reveal Observer,
           Counter Animation, Hamburger Menu, Form,
           Overlay Helpers
========================================== */

// ── SCROLL PROGRESS BAR ───────────────────
const prog = document.getElementById('progress');

window.addEventListener('scroll', function() {

    const s = document.documentElement;
    const pct = (s.scrollTop / (s.scrollHeight - s.clientHeight)) * 100;

    prog.style.width = pct + '%';

    // Show or hide back-to-top button
    const btt = document.getElementById('btt');
    btt.classList.toggle('show', s.scrollTop > 400);

    // SCROLL SPY — highlight nav links based on section
    const sectionIds = ['team', 'projects', 'blogs', 'contact'];

    sectionIds.forEach(function(id) {

        const sec = document.getElementById(id);
        if (!sec) return;

        const top = sec.getBoundingClientRect().top;

        document.querySelectorAll('.nav-link').forEach(function(a) {
            if (a.getAttribute('href') === '#' + id) {
                a.classList.toggle(
                    'active',
                    top <= 120 && top > -sec.offsetHeight + 120
                );
            }
        });

    });

});

// ── BACK TO TOP BUTTON CURSOR EFFECT ─────
const btt = document.getElementById('btt');

btt.addEventListener('mouseenter', function() {
    const ring = document.getElementById('cursor-ring');
    ring.style.transform = 'translate(-50%,-50%) scale(1.6)';
});

// ── HAMBURGER MENU ───────────────────────
const hamburger = document.getElementById('hamburger');
const mobileMenu = document.getElementById('mobileMenu');

hamburger.addEventListener('click', function() {
    if (mobileMenu.style.display === 'block') {
        mobileMenu.style.display = 'none';
    } else {
        mobileMenu.style.display = 'block';
    }
});

function closeMobile() {
    mobileMenu.style.display = 'none';
}

window.closeMobile = closeMobile;

// ── REVEAL OBSERVER ──────────────────────
const revObs = new IntersectionObserver(
    function(entries) {
        entries.forEach(function(e, i) {
            if (e.isIntersecting) {
                setTimeout(function() {
                    e.target.classList.add('visible');
                }, i * 80);

                revObs.unobserve(e.target);
            }
        });
    },
    { threshold: 0.1 }
);

document.querySelectorAll('.reveal').forEach(function(el) {
    revObs.observe(el);
});

// Expose for dynamic cards
window.revObs = revObs;

// ── COUNTER ANIMATION ────────────────────
document.querySelectorAll('.stat-num').forEach(function(el) {

    const target = +el.dataset.target;
    const duration = 1800;
    const step = duration / target;
    let current = 0;

    const timer = setInterval(function() {
        current = Math.min(current + Math.ceil(target / 60), target);
        el.textContent = current;

        if (current >= target) {
            clearInterval(timer);
        }
    }, step);

});

// ── OVERLAY HELPERS ──────────────────────
function openProject(id) {

    const project = projects.find(function(p) {
        return p.id === id;
    });

    if (!project) return;

    document.getElementById('po-tag').textContent = '// Project — ' + project.statusLabel;
    document.getElementById('po-title').textContent = project.name;
    document.getElementById('po-sub').textContent = project.desc;
    document.getElementById('po-emoji').textContent = project.emoji;
    document.getElementById('po-overview').textContent = project.overview;
    document.getElementById('po-problem').textContent = project.problem;
    document.getElementById('po-solution').textContent = project.solution;
    document.getElementById('po-arch').innerHTML = project.arch;
    document.getElementById('po-stack').innerHTML = project.stack
        .map(function(s) { return '<span class="tech-badge">' + s + '</span>'; })
        .join('');

    openOverlay('projectOverlay');
}

function openBlog(id) {

    const blog = blogs.find(function(b) {
        return b.id === id;
    });

    if (!blog) return;

    document.getElementById('bo-cat').textContent = '// ' + blog.cat;
    document.getElementById('bo-title').textContent = blog.title;
    document.getElementById('bo-meta').textContent =
        blog.author + '  ·  ' + blog.date + '  ·  ' + blog.read;
    document.getElementById('bo-content').innerHTML = blog.content;

    openOverlay('blogOverlay');
}

function openOverlay(id) {
    document.getElementById(id).classList.add('active');
    document.body.style.overflow = 'hidden';
}

function closeOverlay(id, e) {
    if (e.target === document.getElementById(id)) {
        closeOverlayDirect(id);
    }
}

function closeOverlayDirect(id) {
    document.getElementById(id).classList.remove('active');
    document.body.style.overflow = '';
}

// Close overlays on Escape key
document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') {
        closeOverlayDirect('projectOverlay');
        closeOverlayDirect('blogOverlay');
    }
});

// Expose overlay functions
window.openProject = openProject;
window.openBlog = openBlog;
window.openOverlay = openOverlay;
window.closeOverlay = closeOverlay;
window.closeOverlayDirect = closeOverlayDirect;

// ── CONTACT FORM ─────────────────────────
function submitForm() {

    const name = document.getElementById('fname').value.trim();
    const email = document.getElementById('femail').value.trim();
    const message = document.getElementById('fmsg').value.trim();

    if (!name || !email || !message) {
        alert('Please fill in all fields.');
        return;
    }

    // Hide form, show success message
    document.getElementById('formWrap').style.display = 'none';
    document.getElementById('formSuccess').style.display = 'block';
}

window.submitForm = submitForm;