// ---------- Load stylesheet ----------
const addStylesheet = (href) => {
  if (document.querySelector(`link[href="${href}"]`)) return;

  const link = document.createElement("link");
  link.rel = "stylesheet";
  link.href = href;
  document.head.appendChild(link);
};

addStylesheet("css/styles.css");

// ---------- Current page ----------
const currentPage = document.body.dataset.page || "";

// ---------- Header ----------
const headerHTML = `
  <header class="site-header">
      <a href="index.html" class="pill pill--static">Doan Le</a>

      <nav>
        <a href="about.html" class="pill ${currentPage === "about" ? "is-active" : ""}">
          About
        </a>
        <a href="index.html#work" class="pill ${currentPage === "projects" || currentPage === "home" ? "is-active" : ""}">
          My Projects
        </a>
        <a href="resume.html" class="pill ${currentPage === "resume" ? "is-active" : ""}">
          Resumé
        </a>
      </nav>
 
  </header>
`;

// ---------- Footer ----------
const footerHTML = `
<footer class="container">
    <h2 class="card banner-title">Let's Create Something Exceptional Together</h2>
    <div class="footer-grid">
      <div class="card"><h6 class="card__label">Quick Links</h6>
        <a class="btn" href="index.html#work">Portfolio <span>↗</span></a>
        <a class="btn" href="index.html#about">About <span>↗</span></a>
        <a class="btn" href="index.html#contact">Contact <span>↗</span></a>
      </div>
      <div class="card"><h6 class="card__label">Contact</h6>
        <a class="btn" href="#">LinkedIn <span>↗</span></a>
        <a class="btn" href="#">Dribbble <span>↗</span></a>
        <a class="btn" href="mailto:you@example.com">Email <span>↗</span></a>
      </div>
      <div class="card"><h6 class="card__label">Legal</h6>
        <small>Terms & Conditions<br />Privacy Policy<br />Accessibility Statement</small>
        <small>© 2026 Your Name</small>
      </div>
    </div>
  </footer>
`;

const headerTarget = document.getElementById("site-header");
const footerTarget = document.getElementById("site-footer");

if (headerTarget) {
  headerTarget.innerHTML = headerHTML;
}

if (footerTarget) {
  footerTarget.innerHTML = footerHTML;
}

// ---------- Homepage project list ----------
const projectListTarget = document.getElementById("projectList");

if (projectListTarget && typeof projects !== "undefined") {
  projectListTarget.innerHTML = Object.entries(projects)
    .map(([slug, p]) => {
      const link = `case-study.html?project=${slug}`;
      const cover = p.panels?.[0] || {};

      return `
        <div class="project">
          <div class="project__info card">
            <header class="project__head">
              <h3>${p.name}</h3>
              <small>${p.tagline || p.subtitle || ""}</small>
            </header>

            ${p.summary ? `<p>${p.summary}</p>` : ""}

            <dl class="meta">
              <div><dt>Year</dt><dd>${p.year || "—"}</dd></div>
              <div><dt>URL</dt><dd>${p.url || "N/A"}</dd></div>
            </dl>

            <a href="${link}" class="btn">View Case Study <span>↗</span></a>
          </div>

          <a class="project__preview" href="${link}" style="background:${cover.bg || "#eee"}">
            ${cover.img ? `<img src="${cover.img}" alt="${p.name} preview" />` : ""}
          </a>
        </div>`;
    })
    .join("");
}
