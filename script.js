// Form handling (swap the console.log for a real backend/Formspree later)
const form = document.getElementById("contactForm");
const status = document.getElementById("formStatus");

form.addEventListener("submit", (e) => {
  e.preventDefault();
  const data = Object.fromEntries(new FormData(form));
  console.log("Form submitted:", data);
  status.textContent = "Thanks! Your message has been sent.";
  form.reset();
});

// Fade-in cards on scroll
const observer = new IntersectionObserver(
  (entries) => entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = 1;
      entry.target.style.transform = "translateY(0)";
    }
  }),
  { threshold: 0.1 }
);

document.querySelectorAll(".card, .project__preview").forEach((el) => {
  el.style.opacity = 0;
  el.style.transform = "translateY(16px)";
  el.style.transition = "opacity .6s ease, transform .6s ease";
  observer.observe(el);
});
