import { CANDIDATE_SERVICES, EMPLOYER_SERVICES } from "../data/site.js";
import { cardGrid, sectionHeader } from "../components/ui.js";

export function servicesPage() {
  return `
    <main id="main" class="page">
      <section class="page-hero">
        <div class="container narrow">
          <p class="eyebrow">Services</p>
          <h1>Talent &amp; HR Solutions</h1>
          <p class="page-hero__lead">
            Clear employer and candidate services — detailed scope confirmed with the client before production launch.
          </p>
        </div>
      </section>
      <section class="section">
        <div class="container">
          ${sectionHeader({ title: "For Employers", align: "left" })}
          ${cardGrid(EMPLOYER_SERVICES)}
          <p class="disclaimer">
            Workforce Planning / Strategic Workplace Organisation is our interpretation of client wording and
            requires confirmation before publication.
          </p>
        </div>
      </section>
      <section class="section section--muted">
        <div class="container">
          ${sectionHeader({ title: "For Candidates", align: "left" })}
          ${cardGrid(CANDIDATE_SERVICES)}
          <p class="disclaimer">Candidate pathway: Resume → Training → Interview → Placement.</p>
        </div>
      </section>
      <section class="section">
        <div class="container narrow cta-block">
          <a href="/contact#employer" class="btn btn--primary" data-track="employer_cta_click">Submit Your Requirement</a>
          <a href="/candidates#candidate-form" class="btn btn--secondary" data-track="candidate_cta_click">Submit Your Resume</a>
        </div>
      </section>
    </main>
  `;
}
