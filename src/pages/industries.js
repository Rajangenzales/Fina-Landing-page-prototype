import { INDUSTRIES, SITE } from "../data/site.js";
import { sectionHeader } from "../components/ui.js";

export function industriesPage() {
  return `
    <main id="main" class="page">
      <section class="page-hero">
        <div class="container narrow">
          <p class="eyebrow">Industries</p>
          <h1>Focused Where People Matter</h1>
          <p class="page-hero__lead">Serving organisations and professionals across ${SITE.reach}.</p>
        </div>
      </section>
      <section class="section">
        <div class="container industry-grid industry-grid--large">
          ${INDUSTRIES.map(
            (ind) => `
            <article class="industry-card industry-card--${ind.id}">
              <h2>${ind.title}</h2>
              <p>${ind.body}</p>
              <p class="industry-card__hint">Talent acquisition · HR support · Recruitment</p>
            </article>
          `,
          ).join("")}
        </div>
      </section>
      <section class="section section--muted">
        <div class="container narrow">
          <p>
            FINA does not claim experience in every sector. These three industries reflect the client's stated
            focus: ${SITE.sectors.join(", ")}.
          </p>
        </div>
      </section>
    </main>
  `;
}
