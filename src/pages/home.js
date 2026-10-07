import {
  CANDIDATE_JOURNEY,
  CANDIDATE_SERVICES,
  EMPLOYER_PROCESS,
  EMPLOYER_SERVICES,
  INDUSTRIES,
  SITE,
  WHY_FINA,
} from "../data/site.js";
import { faqSection } from "../components/faq.js";
import { employerFormMarkup, candidateFormMarkup } from "../components/forms.js";
import { cardGrid, processTimeline, sectionHeader } from "../components/ui.js";

export function homePage() {
  return `
    <main id="main">
      <section class="hero">
        <div class="container hero__inner">
          <div class="hero__content">
            <p class="eyebrow">${SITE.positioning}</p>
            <h1>${SITE.tagline}</h1>
            <p class="hero__lead">
              Sector-focused talent and HR solutions for organisations and career opportunities for
              professionals across India.
            </p>
            <div class="hero__ctas">
              <a href="#employer" class="btn btn--primary" data-track="employer_cta_click">Submit Your Requirement</a>
              <a href="#candidate" class="btn btn--secondary" data-track="candidate_cta_click">Submit Your Resume</a>
            </div>
            <p class="hero__meta">
              <span>${SITE.sectors.join(" · ")}</span>
              <span>Serving ${SITE.reach}</span>
            </p>
          </div>
          <div class="hero__diagram" aria-hidden="true">
            <div class="relation-card">
              <span>Organisation</span>
              <span class="relation-card__mid">FINA</span>
              <span>Talent</span>
            </div>
            <p class="relation-caption">Need → Match → Interview → Opportunity</p>
          </div>
        </div>
      </section>

      <section class="section section--gateway" id="pathways">
        <div class="container gateway">
          <article class="gateway-card gateway-card--employer">
            <h2>Build the Right Team</h2>
            <p>Tell us what your organisation needs. FINA helps connect your requirements with suitable talent and HR support.</p>
            <a href="#employer" class="btn btn--primary" data-track="employer_cta_click">Submit Your Requirement</a>
          </article>
          <article class="gateway-card gateway-card--candidate">
            <h2>Find the Right Opportunity</h2>
            <p>Share your profile and move towards opportunities that match your skills and career direction.</p>
            <a href="#candidate" class="btn btn--secondary" data-track="candidate_cta_click">Submit Your Resume</a>
          </article>
        </div>
      </section>

      <section class="section" id="about-preview">
        <div class="container narrow">
          ${sectionHeader({
            eyebrow: "FINA Consultancy",
            title: "People. Opportunities. Organisations.",
            lead:
              "FINA Consultancy provides sector-focused talent and HR solutions for organisations while helping candidates connect with suitable career opportunities across India.",
          })}
          <p class="intro-copy">
            The right placement is more than filling a vacancy. It is about bringing capability,
            opportunity and organisational need together.
          </p>
          <a href="/about" class="text-link">About FINA →</a>
        </div>
      </section>

      <section class="section section--muted" id="services-preview">
        <div class="container">
          ${sectionHeader({
            title: "Talent & HR Solutions",
            lead: "Employer and candidate services across Manufacturing, Banking and Insurance.",
          })}
          <div class="split-panels">
            <div>
              <h3 class="panel-label">For Employers</h3>
              ${cardGrid(EMPLOYER_SERVICES, "card-grid card-grid--compact")}
            </div>
            <div>
              <h3 class="panel-label">For Candidates</h3>
              ${cardGrid(CANDIDATE_SERVICES, "card-grid card-grid--compact")}
            </div>
          </div>
          <p class="section-cta-row"><a href="/services" class="btn btn--ghost">View all services</a></p>
        </div>
      </section>

      <section class="section" id="industries-preview">
        <div class="container">
          ${sectionHeader({
            title: "Focused Where People Matter",
            lead: "Serving organisations and professionals across India.",
          })}
          <div class="industry-grid">
            ${INDUSTRIES.map(
              (ind) => `
              <article class="industry-card industry-card--${ind.id}">
                <h3>${ind.title}</h3>
                <p>${ind.body}</p>
              </article>
            `,
            ).join("")}
          </div>
          <p class="section-cta-row"><a href="/industries" class="btn btn--ghost">Explore industries</a></p>
        </div>
      </section>

      <section class="section section--muted" id="employer-process">
        <div class="container">
          ${sectionHeader({ title: "How FINA Works", lead: "A structured path from requirement to placement." })}
          ${processTimeline(EMPLOYER_PROCESS)}
        </div>
      </section>

      <section class="section" id="candidate-journey">
        <div class="container">
          ${sectionHeader({
            title: "Your Next Opportunity Starts Here",
            lead: "Resume → Prepare → Opportunity → Interview → Placement. No guarantee of employment is implied.",
          })}
          ${processTimeline(CANDIDATE_JOURNEY)}
        </div>
      </section>

      <section class="section section--muted" id="why-fina">
        <div class="container">
          ${sectionHeader({ title: "Why FINA?" })}
          ${cardGrid(WHY_FINA)}
        </div>
      </section>

      <section class="section founder" id="founder">
        <div class="container founder__grid">
          <div class="founder__portrait" role="img" aria-label="Portrait placeholder for Hima Ferin">
            <span>HF</span>
          </div>
          <div>
            <p class="eyebrow">Founder</p>
            <h2>Meet ${SITE.founder}</h2>
            <p class="founder__role">Founder, ${SITE.name}</p>
            <p>
              Hima Ferin holds an MBA in Accounting &amp; Finance from the University of Madras and a BA in
              Economics from the University of Calicut. Her professional background spans finance, financial
              services, banking operations, customer relationship management and branch/team management.
            </p>
            <a href="${SITE.linkedIn}" class="btn btn--ghost" target="_blank" rel="noopener noreferrer">LinkedIn Profile</a>
          </div>
        </div>
      </section>

      <section class="section trust" id="trust">
        <div class="container narrow trust__inner">
          <h2>Built on Professional Experience</h2>
          <p>
            This prototype uses only verified founder background information. Client logos, testimonials,
            certifications and placement figures will be added when supplied and confirmed.
          </p>
        </div>
      </section>

      ${faqSection()}

      <section class="section section--cta" id="final-cta">
        <div class="container narrow cta-block">
          <h2>Let's Find the Right Fit.</h2>
          <p>Whether you're building a team or looking for your next opportunity, start the conversation with ${SITE.name}.</p>
          <div class="hero__ctas">
            <a href="#employer" class="btn btn--primary" data-track="employer_cta_click">Submit Your Requirement</a>
            <a href="#candidate" class="btn btn--secondary" data-track="candidate_cta_click">Submit Your Resume</a>
          </div>
        </div>
      </section>

      <section class="section section--forms" id="contact-forms">
        <div class="container form-columns">
          <div id="employer">
            <h2>Employer enquiry</h2>
            <p class="section-lead">Share your hiring or HR requirement.</p>
            ${employerFormMarkup({ id: "home-employer-form" })}
          </div>
          <div id="candidate">
            <h2>Candidate profile</h2>
            <p class="section-lead">Submit your resume for consideration.</p>
            ${candidateFormMarkup({ id: "home-candidate-form" })}
          </div>
        </div>
      </section>

      <section class="section section--contact-strip" id="contact">
        <div class="container contact-strip">
          <div>
            <h2>Contact</h2>
            <p>${SITE.name}<br />${SITE.location}<br />Serving ${SITE.reach}</p>
          </div>
          <ul class="contact-strip__links">
            <li><a href="tel:+91${SITE.phone}" data-track="phone_click">${SITE.phoneDisplay}</a></li>
            <li><a href="mailto:${SITE.email}" data-track="email_click">${SITE.email}</a></li>
            <li><a href="https://wa.me/91${SITE.phone}" data-track="whatsapp_click">WhatsApp</a></li>
          </ul>
        </div>
      </section>
    </main>
  `;
}
