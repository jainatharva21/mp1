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


const cards = document.querySelectorAll(".skill-card, .about-col");
const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("is-visible");
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.2 });

cards.forEach((card) => observer.observe(card));

const track = document.querySelector(".carousel__track");
const slides = document.querySelectorAll(".slide");
const dotsWrap = document.querySelector(".carousel__dots");
let current = 0;

slides.forEach((_, idx) => {
  const dot = document.createElement("button");
  dot.className = "dot";
  dot.setAttribute("aria-label", `Go to project ${idx + 1}`);
  dot.addEventListener("click", () => goTo(idx));
  dotsWrap.appendChild(dot);
});

const dots = dotsWrap.querySelectorAll(".dot");

function goTo(index) {
  current = (index + slides.length) % slides.length;
  track.style.transform = `translateX(-${current * 100}%)`;
  dots.forEach((dot, idx) => dot.classList.toggle("is-active", idx === current));
}

document.querySelector(".carousel__arrow--prev")
  .addEventListener("click", () => goTo(current - 1));
document.querySelector(".carousel__arrow--next")
  .addEventListener("click", () => goTo(current + 1));

document.addEventListener("keydown", (e) => {
  if (e.key === "ArrowLeft") goTo(current - 1);
  if (e.key === "ArrowRight") goTo(current + 1);
});

goTo(0);

const projectData = {
  riscv: {
    date: "December 2024",
    title: "RISC-V Out-of-Order Processor",
    stack: "SystemVerilog HDL · RISC-V · Verdi · Design Vision · Git",
    points: [
      "Designed an out-of-order RISC-V processor using the Explicit Register Renaming algorithm with support for the M extension.",
      "Built a tournament branch predictor combining 2-level and g-share predictors with a Return Address Stack, reaching 86% accuracy on popular benchmarks and minimizing misprediction flushes.",
      "Integrated a fully parametrized set-associative cache with a next-line prefetcher and post-commit store buffer to optimize memory access patterns."
    ]
  },
  cache: {
    date: "October 2024",
    title: "4-Way Set Associative Pipelined Cache",
    stack: "SystemVerilog HDL · RISC-V · Verdi · Design Vision · Git",
    points: [
      "Designed a 2-stage pipelined 4-way set associative cache with 16 sets, 4 ways, and 32-byte cachelines, handling both hits and misses.",
      "Integrated a pseudo-LRU replacement policy with a write-back, write-allocate strategy, reducing cache miss penalties and improving memory efficiency."
    ]
  },
  kernel: {
    date: "November 2023",
    title: "Linux Kernel from Scratch",
    stack: "C · x86 · Linux · Git",
    points: [
      "Built an operating system from the ground up with multi-level paging, a flat-structured file system, and an interrupt descriptor table for exceptions, system calls, and interrupts.",
      "Implemented device drivers for the keyboard, Real Time Clock, and Intel 8259 Programmable Interrupt Controller.",
      "Wrote 10 custom system calls and added multi-terminal support using round-robin scheduling."
    ]
  },
  tanks: {
    date: "May 2023",
    title: "Pocket Tanks on FPGA",
    stack: "SystemVerilog HDL · C · FPGA · Intel Quartus Prime · Git",
    points: [
      "Recreated a classic game on an Intel MAX10 FPGA with turn-based multiplayer, driven by a finite state machine bridging C and SystemVerilog.",
      "Added keyboard interrupt support through the embedded 32-bit NIOS II CPU.",
      "Integrated VGA output, frame buffering, and SoC compatibility, using the FPGA's built-in microcontroller for game functions."
    ]
  },
  sui: {
    date: "November 2022",
    title: "SUItoSWE",
    stack: "Python · C++ · CMake",
    points: [
      "Parsed SUI blockchain data — structured as a directed acyclic graph — using Python's json and requests modules, then built a visualization method on top of it.",
      "Used Dijkstra's algorithm to optimize gas costs between transactions and topological sort to pseudo-visualize the network.",
      "Moved the heavy traversal into C++ to reduce time complexity and memory cost."
    ]
  }
};

const modal = document.getElementById("modal");

function openModal(key) {
  const data = projectData[key];
  if (!data) return;

  document.getElementById("modal-date").textContent = data.date;
  document.getElementById("modal-title").textContent = data.title;
  document.getElementById("modal-stack").textContent = data.stack;

  const list = document.getElementById("modal-list");
  list.innerHTML = "";
  data.points.forEach((point) => {
    const li = document.createElement("li");
    li.textContent = point;
    list.appendChild(li);
  });

  modal.classList.add("is-open");
  document.body.classList.add("no-scroll");
}

function closeModal() {
  modal.classList.remove("is-open");
  document.body.classList.remove("no-scroll");
}

document.querySelectorAll(".slide__btn").forEach((btn) => {
  btn.addEventListener("click", () => openModal(btn.dataset.project));
});

modal.querySelector(".modal__close").addEventListener("click", closeModal);
modal.querySelector(".modal__backdrop").addEventListener("click", closeModal);

document.addEventListener("keydown", (e) => {
  if (e.key === "Escape" && modal.classList.contains("is-open")) closeModal();
});

const navbar = document.querySelector(".navbar");
const navLinks = document.querySelectorAll(".header-links a");
const sections = [...navLinks].map((link) =>
  document.querySelector(link.getAttribute("href"))
);

function onScroll() {
  navbar.classList.toggle("is-scrolled", window.scrollY > 50);

  const navBottom = navbar.offsetHeight;
  const atPageBottom =
    window.innerHeight + window.scrollY >= document.body.offsetHeight - 2;

  let activeIndex = 0;

  if (atPageBottom) {
    activeIndex = sections.length - 1;
  } else {
    sections.forEach((section, i) => {
      if (section && section.getBoundingClientRect().top <= navBottom + 1) {
        activeIndex = i;
      }
    });
  }

  navLinks.forEach((link, i) =>
    link.classList.toggle("is-active", i === activeIndex)
  );
}

window.addEventListener("scroll", onScroll);
onScroll();