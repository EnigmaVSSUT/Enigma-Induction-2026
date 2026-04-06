document.addEventListener('DOMContentLoaded', () => {
    const steps = document.querySelectorAll('.step');

    const observerOptions = {
        threshold: 0.2
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = "1";
                entry.target.style.transform = "translateX(0)";
            }
        });
    }, observerOptions);

    steps.forEach(step => {
        // Initial state for animation
        step.style.opacity = "0";
        step.style.transform = "translateX(-20px)";
        step.style.transition = "all 0.6s ease-out";
        
        observer.observe(step);
    });
});