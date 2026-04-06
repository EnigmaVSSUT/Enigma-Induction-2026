// ===== NAVBAR SCROLL EFFECT =====
window.addEventListener('scroll', () => {
    const nav = document.querySelector('.navcontainer');
    if (nav) {
        nav.classList.toggle('scrolled', window.scrollY > 30);
    }
});

// ===== HAMBURGER MENU =====
const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.content');

if (hamburger && navLinks) {
    hamburger.addEventListener('click', () => {
        navLinks.classList.toggle('open');
    });

    // close menu when a link is clicked
    navLinks.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            navLinks.classList.remove('open');
        });
    });
}

// ===== ACTIVE NAV LINK =====
const currentPage = window.location.pathname.split('/').pop() || 'index.html';
document.querySelectorAll('.content a').forEach(link => {
    const href = link.getAttribute('href');
    if (href === currentPage) {
        link.classList.add('active');
    }
});

// ===== SCROLL REVEAL ANIMATION =====
const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry, i) => {
        if (entry.isIntersecting) {
            setTimeout(() => {
                entry.target.classList.add('visible');
            }, i * 100);
            revealObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.1 });

document.querySelectorAll('.card, .box1, .reveal').forEach(el => {
    el.classList.add('reveal');
    revealObserver.observe(el);
});

// ===== HERO BUTTONS NAVIGATION =====
const exploreBtn = document.querySelector('.btns button:first-child');
const teamBtn = document.querySelector('.btns button.btn');

if (exploreBtn) {
    exploreBtn.addEventListener('click', () => {
        window.location.href = 'project.html';
    });
}

if (teamBtn) {
    teamBtn.addEventListener('click', () => {
        window.location.href = 'team.html';
    });
}

// ===== COUNTER ANIMATION (homepage stats) =====
function animateCounter(el, target, duration = 1500) {
    let start = 0;
    const step = target / (duration / 16);
    const timer = setInterval(() => {
        start += step;
        if (start >= target) {
            el.textContent = target + '+';
            clearInterval(timer);
        } else {
            el.textContent = Math.floor(start) + '+';
        }
    }, 16);
}

const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            document.querySelectorAll('.data1').forEach(el => {
                const val = parseInt(el.textContent);
                animateCounter(el, val);
            });
            statsObserver.disconnect();
        }
    });
}, { threshold: 0.5 });

const dataSection = document.querySelector('.data');
if (dataSection) statsObserver.observe(dataSection);

// ===== CONTACT FORM =====
const contactForm = document.querySelector('.contact_right');
const sendBtn = document.querySelector('.send_btn');

if (sendBtn && contactForm) {
    sendBtn.addEventListener('click', () => {
        const name = contactForm.querySelector('input[type="text"]');
        const email = contactForm.querySelector('input[type="email"]');
        const message = contactForm.querySelector('textarea');

        // simple validation
        if (!name.value.trim()) {
            showError(name, 'Please enter your name');
            return;
        }
        if (!isValidEmail(email.value.trim())) {
            showError(email, 'Please enter a valid email');
            return;
        }
        if (!message.value.trim()) {
            showError(message, 'Please enter a message');
            return;
        }

        // simulate sending
        sendBtn.textContent = 'Sending...';
        sendBtn.disabled = true;

        setTimeout(() => {
            // show success
            let success = document.querySelector('.form_success');
            if (!success) {
                success = document.createElement('div');
                success.className = 'form_success';
                success.textContent = '✓ Message sent! We will get back to you soon.';
                contactForm.appendChild(success);
            }
            success.style.display = 'block';

            // reset form
            name.value = '';
            email.value = '';
            message.value = '';
            sendBtn.textContent = 'Send Message';
            sendBtn.disabled = false;

            // hide success after 4 seconds
            setTimeout(() => {
                success.style.display = 'none';
            }, 4000);
        }, 1200);
    });
}

function showError(input, msg) {
    input.style.borderColor = '#f94747';
    input.placeholder = msg;
    input.value = '';
    setTimeout(() => {
        input.style.borderColor = '#2a2a2a';
        input.placeholder = input.getAttribute('placeholder') || '';
    }, 2500);
}

function isValidEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

// ===== JOIN US BUTTON =====
const joinBtn = document.querySelector('.joinus button');
if (joinBtn) {
    joinBtn.addEventListener('click', () => {
        window.location.href = 'contact.html';
    });
}