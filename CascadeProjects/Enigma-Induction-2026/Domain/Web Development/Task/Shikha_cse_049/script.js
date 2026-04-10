// Interactive JavaScript for Shikha CSE 049 Web Development Project
document.addEventListener('DOMContentLoaded', function() {
    
    // Add smooth scrolling
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });

    // Add animation to sections when they come into view
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    // Observe all sections
    document.querySelectorAll('section').forEach(section => {
        section.style.opacity = '0';
        section.style.transform = 'translateY(20px)';
        section.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(section);
    });

    // Add interactive hover effects
    const features = document.querySelectorAll('.features li');
    features.forEach(feature => {
        feature.addEventListener('mouseenter', function() {
            this.style.transform = 'translateX(10px)';
            this.style.transition = 'transform 0.3s ease';
        });
        
        feature.addEventListener('mouseleave', function() {
            this.style.transform = 'translateX(0)';
        });
    });

    // Dynamic footer year
    const footer = document.querySelector('footer p');
    if (footer) {
        const currentYear = new Date().getFullYear();
        footer.innerHTML = `&copy; ${currentYear} Shikha CSE 049 - Enigma Induction`;
    }

    // Add a simple console message
    console.log('🚀 Shikha CSE 049 - Web Development Project Loaded Successfully!');
    console.log('📁 Project: Enigma Induction 2026 Submission');
    console.log('👤 Developer: Shikha | Branch: CSE | Registration: 049');
});
