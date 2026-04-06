
const burger = document.querySelector('.burger');
const nav = document.querySelector('.nav-links');

burger?.addEventListener('click', () => {
    nav.classList.toggle('nav-active');
});


const sections = document.querySelectorAll('section');
const navLinks = document.querySelectorAll('.nav-links a');

window.onscroll = () => {
    let current = "";

    sections.forEach((section) => {
        const sectionTop = section.offsetTop;
        if (pageYOffset >= sectionTop - 100) {
            current = section.getAttribute("id");
        }
    });

    navLinks.forEach((a) => {
        a.classList.remove("active");
        if (a.getAttribute("href").includes(current)) {
            a.classList.add("active");
        }
    });
};


const contactForm = document.getElementById('contact-form');

contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
  
    const btn = contactForm.querySelector('button');
    const originalText = btn.innerText;
    
    btn.innerText = "Sent Successfully!";
    btn.style.background = "#fff";
    
    setTimeout(() => {
        btn.innerText = originalText;
        btn.style.background = "#00ff88";
        contactForm.reset();
    }, 3000);
});


const observerOptions = { threshold: 0.1 };
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = "1";
            entry.target.style.transform = "translateY(0)";
        }
    });
}, observerOptions);

document.querySelectorAll('.card').forEach(card => {
    card.style.opacity = "0";
    card.style.transform = "translateY(20px)";
    card.style.transition = "all 0.6s ease-out";
    observer.observe(card);
});