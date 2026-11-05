// Adviser Crew interactions: lightweight and easy to maintain.
const year = document.getElementById("year");
if (year) year.textContent = new Date().getFullYear();

// Reveal content as it enters the viewport.
const revealItems = document.querySelectorAll(".reveal");
if ("IntersectionObserver" in window) {
  const observer = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        obs.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });
  revealItems.forEach(item => observer.observe(item));
} else {
  revealItems.forEach(item => item.classList.add("visible"));
}

// Reading progress line.
const scrollLine = document.getElementById("scrollLine");
function updateProgress() {
  if (!scrollLine) return;
  const max = document.documentElement.scrollHeight - window.innerHeight;
  scrollLine.style.width = (max > 0 ? window.scrollY / max * 100 : 0) + "%";
}
window.addEventListener("scroll", updateProgress, { passive: true });
updateProgress();

// Close the mobile navigation after a section is selected.
const siteMenu = document.getElementById("siteMenu");
if (siteMenu && window.bootstrap) {
  siteMenu.querySelectorAll("a").forEach(link => link.addEventListener("click", () => {
    if (siteMenu.classList.contains("show")) {
      bootstrap.Collapse.getOrCreateInstance(siteMenu).hide();
    }
  }));
}

// Front-end demo only. Connect to an email/form service before launch.
const contactForm = document.getElementById("contactForm");
if (contactForm) {
  contactForm.addEventListener("submit", event => {
    event.preventDefault();
    const note = document.getElementById("formMessage");
    if (note) note.textContent = "Thanks for reaching out! The enquiry form will be connected in the next update.";
  });
}


// 6. SERVICE CARD SHORTCUTS: preselect the matching enquiry topic.
document.querySelectorAll("[data-service]").forEach(link => {
  link.addEventListener("click", () => {
    const interest = document.getElementById("interest");
    if (interest) interest.value = link.dataset.service;
  });
});

// 7. SHOW THE BACK-TO-TOP CONTROL after the visitor scrolls.
const floatingTop = document.getElementById("floatingTop");
function toggleBackToTop() {
  if (floatingTop) floatingTop.classList.toggle("show", window.scrollY > 520);
}
window.addEventListener("scroll", toggleBackToTop, { passive: true });
toggleBackToTop();

// 8. HIGHLIGHT THE CURRENT SECTION in the navigation.
const pageSections = document.querySelectorAll("main section[id]");
const menuLinks = document.querySelectorAll("#siteMenu .nav-link");
if ("IntersectionObserver" in window && pageSections.length) {
  const sectionObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      menuLinks.forEach(link => {
        link.classList.toggle("active", link.getAttribute("href") === "#" + entry.target.id);
      });
    });
  }, { rootMargin: "-35% 0px -55% 0px" });
  pageSections.forEach(section => sectionObserver.observe(section));
}
