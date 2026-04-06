const joinBtn = document.getElementById("joinBtn");
const modal = document.getElementById("joinModal");
const closeBtn = document.querySelector(".close");
const form = document.getElementById("joinForm");
const successPopup = document.getElementById("successPopup");

// OPEN MODAL
joinBtn.onclick = () => {
    modal.style.display = "block";
};

// CLOSE MODAL
closeBtn.onclick = () => {
    modal.style.display = "none";
};

// CLOSE ON OUTSIDE CLICK
window.onclick = (e) => {
    if (e.target == modal) {
        modal.style.display = "none";
    }
};

// FORM VALIDATION
form.addEventListener("submit", function(e) {
    e.preventDefault();

    const email = document.getElementById("email").value;
    const phone = document.getElementById("phone").value;

    const emailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const phoneValid = /^[0-9]{10}$/;

    if (!email.match(emailValid)) {
        alert("Invalid Email ❌");
        return;
    }

    if (!phone.match(phoneValid)) {
        alert("Invalid Phone Number ❌");
        return;
    }

    // SUCCESS
    modal.style.display = "none";
    successPopup.style.display = "block";

    setTimeout(() => {
        successPopup.style.display = "none";
    }, 3000);
});
const text = "Code. Create. Conquer";
let index = 0;

function typeEffect() {
    if (index < text.length) {
        document.querySelector(".typing").innerHTML += text.charAt(index);
        index++;
        setTimeout(typeEffect, 80);
    }
}

document.querySelector(".typing").innerHTML = "";
typeEffect();
document.getElementById("scrollTopBtn").addEventListener("click", () => {
    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });
});
const boxes = document.querySelectorAll(".box");

boxes.forEach(box => {
    box.addEventListener("mouseenter", () => {
        box.style.transform = "scale(1.1)";
    });

    box.addEventListener("mouseleave", () => {
        box.style.transform = "scale(1)";
    });
});
// EXPLORE BUTTON SCROLL
document.addEventListener("DOMContentLoaded", () => {

    const exploreBtn = document.getElementById("exploreBtn");

    if (exploreBtn) {
        exploreBtn.addEventListener("click", () => {
            const target = document.getElementById("features");

            if (target) {
                target.scrollIntoView({
                    behavior: "smooth"
                });
            } else {
                // fallback scroll
                window.scrollBy({
                    top: window.innerHeight,
                    behavior: "smooth"
                });
            }
        });
    }

});
