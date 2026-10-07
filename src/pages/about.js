import { SITE, WHY_FINA } from "../data/site.js";
import { cardGrid, sectionHeader } from "../components/ui.js";

export function aboutPage() {
  return `
    <main id="main" class="page">
      <section class="page-hero">
        <div class="container narrow">
          <p class="eyebrow">About</p>
          <h1>${SITE.name}</h1>
          <p class="page-hero__lead">
            A PAN-India talent and HR consultancy serving organisations and candidates across
            Manufacturing, Banking and Insurance.
          </p>
        </div>
      </section>
      <section class="section">
        <div class="container founder__grid">
          <div class="founder__portrait">
            <img
              src="${SITE.founderPhoto}"
              alt="${SITE.founder}, Founder of ${SITE.name}"
              width="800"
              height="800"
            />
          </div>
          <div>
            <h2>Our focus</h2>
            <p>
              FINA Consultancy is founded by ${SITE.founder} and based in ${SITE.location}. We work with
              employers who need talent acquisition and HR support, and with candidates seeking structured
              pathways toward suitable opportunities.
            </p>
            <p>
              Our positioning is simple: <strong>${SITE.positioning}</strong>. The philosophy behind our work:
              the right person, in the right role, at the right time.
            </p>
          </div>
        </div>
      </section>
      <section class="section section--muted">
        <div class="container">
          ${sectionHeader({ title: "Why FINA?" })}
          ${cardGrid(WHY_FINA)}
        </div>
      </section>
      <section class="section">
        <div class="container narrow entity-block">
          <h2>Machine-readable summary</h2>
          <p id="entity-summary">
            FINA Consultancy is a talent and HR consultancy founded by Hima Ferin in Thrissur, Kerala, India,
            serving PAN India. We support organisations and candidates in Manufacturing, Banking and Insurance
            with talent acquisition, HR management, payroll-related support, policy and regulatory compliance,
            and workforce planning where confirmed.
          </p>
        </div>
      </section>
    </main>
  `;
}
