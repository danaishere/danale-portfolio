const root = document.getElementById("caseRoot");
const slug = new URLSearchParams(location.search).get("project");
const keys = Object.keys(projects);
const p = projects[slug];

if (!p) {
  root.innerHTML = `
    <div class="card" style="margin-top:24px">
      <h3>Project not found</h3>
      <a class="btn" href="index.html#work">Back to portfolio <span>←</span></a>
    </div>`;
} else {
  document.title = `${p.name} | Case Study`;

  const hasValue = (value) => {
    if (value === null || value === undefined) return false;
    if (typeof value === "string" && value.trim() === "") return false;
    if (Array.isArray(value) && value.length === 0) return false;
    return true;
  };

  const panel = (i) => {
    const item = p.panels?.[i];
    if (!item) return `<div></div>`;
    return `
      <div class="case__preview" style="background:${item.bg || "#eee"}">
        <img src="${item.img}" alt="${p.name} preview ${i + 1}" loading="lazy" />
      </div>`;
  };

  const cell = (label, value) => {
    if (!hasValue(value)) return "";
    return `
      <div class="cell">
        <span class="cell__label">${label}</span>
        <p>${value}</p>
      </div>`;
  };

  const list = (title, items) => {
    if (!Array.isArray(items) || items.length === 0) return "";
    return `
      <section class="card card--list">
        <h6 class="card__label">${title}</h6>
        ${items.map((t) => `<div class="cell"><p>${t}</p></div>`).join("")}
      </section>`;
  };

  const metaHTML = [
    cell("Client", p.client),
    cell("Type", p.type),
    cell("Role", p.role),
    cell("Duration", p.duration),
    cell("Challenge", p.challenge),
  ].join("");

  const metaSection = metaHTML.trim()
    ? `<section class="card card--list">${metaHTML}</section>`
    : "";

  const solutionSection = hasValue(p.solution)
    ? `
      <section class="card card--list">
        <h6 class="card__label">Solution</h6>
        <div class="cell"><p>${p.solution}</p></div>
      </section>`
    : "";

  const nextKey = keys[(keys.indexOf(slug) + 1) % keys.length];
  const next = projects[nextKey];

  root.innerHTML = `
    <!-- Row 1: title + info | preview 1 -->
    <div class="case__row">
      <div class="case__side">
        <div class="card case__title">
          <span class="case__icon" style="background:${p.accent}"></span>
          <div>
            <h1>${p.name}</h1>
            <small>${p.subtitle}</small>
          </div>
        </div>

        ${metaSection}
      </div>
      ${panel(0)}
    </div>

    <!-- Row 2: approach | preview 2 -->
    <div class="case__row">
      <div class="case__side">
        ${list("Approach", p.approach)}
      </div>
      ${panel(1)}
    </div>

    <!-- Row 3: solution + results | preview 3 -->
    <div class="case__row">
      <div class="case__side">
        ${solutionSection}
        ${list("Results", p.results)}
      </div>
      ${panel(2)}
    </div>

    <!-- Navigation -->
    <div class="case__nav">
      <a class="btn" href="index.html#work">← All projects</a>
      ${keys.length > 1
        ? `<a class="btn btn--dark" href="case-study.html?project=${nextKey}">Next: ${next.name} <span>→</span></a>`
        : ""}
    </div>
  `;
}
