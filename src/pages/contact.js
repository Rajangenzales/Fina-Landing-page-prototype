import { SITE } from "../data/site.js";
import { employerFormMarkup, candidateFormMarkup } from "../components/forms.js";

export function contactPage() {
  return `
    <main id="main" class="page">
      <section class="page-hero">
        <div class="container narrow">
          <p class="eyebrow">Contact</p>
          <h1>Talk to FINA</h1>
          <p class="page-hero__lead">Thrissur, Kerala · Serving ${SITE.reach}</p>
        </div>
      </section>
      <section class="section">
        <div class="container contact-cards">
          <a class="contact-card" href="tel:+91${SITE.phone}" data-track="phone_click">
            <h2>Phone</h2>
            <p>${SITE.phoneDisplay}</p>
          </a>
          <a class="contact-card" href="mailto:${SITE.email}" data-track="email_click">
            <h2>Email</h2>
            <p>${SITE.email}</p>
            <p class="field-hint">${SITE.emailNote}</p>
          </a>
          <a class="contact-card" href="https://wa.me/91${SITE.phone}" target="_blank" rel="noopener noreferrer" data-track="whatsapp_click">
            <h2>WhatsApp</h2>
            <p>Chat on WhatsApp</p>
          </a>
          <a class="contact-card" href="${SITE.linkedIn}" target="_blank" rel="noopener noreferrer">
            <h2>LinkedIn</h2>
            <p>${SITE.founder}</p>
          </a>
        </div>
      </section>
      <section class="section section--muted">
        <div class="container form-columns">
          <div id="employer">
            <h2>Employer requirement</h2>
            ${employerFormMarkup({ id: "contact-employer-form" })}
          </div>
          <div id="candidate">
            <h2>Candidate profile</h2>
            ${candidateFormMarkup({ id: "contact-candidate-form" })}
          </div>
        </div>
      </section>
    </main>
  `;
}
