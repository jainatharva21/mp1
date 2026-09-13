/* Your JS here. */
const typewriterText = "A Computer Science major at UIUC! 👋 ";
const target = document.getElementById("typed-text");
let i = 0;

(function typewriter() {
    if (i > typewriterText.length) {
        return;
    }
    target.textContent = typewriterText.slice(0, i++);
    setTimeout(typewriter, 60);
})();


const cards = document.querySelectorAll(".skill-card");
const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("is-visible");
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.2 });

cards.forEach((card) => observer.observe(card));