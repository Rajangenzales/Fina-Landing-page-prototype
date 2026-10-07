export function escapeHtml(str) {
  return String(str)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;");
}

export function sectionHeader({ eyebrow, title, lead, align = "center" }) {
  return `
    <header class="section-header section-header--${align}">
      ${eyebrow ? `<p class="eyebrow">${escapeHtml(eyebrow)}</p>` : ""}
      <h2 class="section-title">${escapeHtml(title)}</h2>
      ${lead ? `<p class="section-lead">${escapeHtml(lead)}</p>` : ""}
    </header>
  `;
}

export function processTimeline(steps) {
  return `
    <ol class="process-timeline">
      ${steps
        .map(
          (s) => `
        <li class="process-step">
          <span class="process-step__num" aria-hidden="true">${escapeHtml(s.step)}</span>
          <div>
            <h3 class="process-step__title">${escapeHtml(s.title)}</h3>
            <p>${escapeHtml(s.body)}</p>
          </div>
        </li>
      `,
        )
        .join("")}
    </ol>
  `;
}

export function cardGrid(items, className = "card-grid") {
  return `
    <div class="${className}">
      ${items
        .map(
          (item) => `
        <article class="card">
          <h3>${escapeHtml(item.title)}</h3>
          <p>${escapeHtml(item.body)}</p>
        </article>
      `,
        )
        .join("")}
    </div>
  `;
}
