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
