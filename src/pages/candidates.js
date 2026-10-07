import { CANDIDATE_JOURNEY } from "../data/site.js";
import { candidateFormMarkup } from "../components/forms.js";
import { processTimeline, sectionHeader } from "../components/ui.js";

export function candidatesPage() {
  return `
    <main id="main" class="page">
      <section class="page-hero">
        <div class="container narrow">
          <p class="eyebrow">Candidates</p>
          <h1>Your Next Opportunity Starts Here</h1>
          <p class="page-hero__lead">
            Share your profile, prepare where applicable, and progress through interviews toward suitable roles.
            Submitting a resume does not guarantee placement.
          </p>
          <a href="#candidate-form" class="btn btn--primary" data-track="candidate_cta_click">Submit Your Resume</a>
        </div>
      </section>
      <section class="section section--muted">
        <div class="container">
          ${sectionHeader({ title: "Candidate journey" })}
          ${processTimeline(CANDIDATE_JOURNEY)}
        </div>
      </section>
      <section class="section" id="candidate-form">
        <div class="container narrow">
          <h2>Submit your profile</h2>
          ${candidateFormMarkup({ id: "page-candidate-form" })}
        </div>
      </section>
    </main>
  `;
}
