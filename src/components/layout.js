import { NAV, SITE } from "../data/site.js";
import { escapeHtml } from "./ui.js";

export function renderHeader(activePath) {
  const navItems = NAV.map(
    (item) => `
    <a href="${item.href}" class="nav-link${activePath === item.href ? " is-active" : ""}" ${
      activePath === item.href ? 'aria-current="page"' : ""
    }>${escapeHtml(item.label)}</a>
  `,
  ).join("");

  return `
    <header class="site-header" data-header>
      <div class="container site-header__inner">
        <a href="/" class="brand" aria-label="${escapeHtml(SITE.name)} home">
          <span class="brand__mark" aria-hidden="true">F</span>
          <span class="brand__text">
            <span class="brand__name">FINA</span>
            <span class="brand__sub">Consultancy</span>
          </span>
        </a>
        <button type="button" class="nav-toggle" aria-expanded="false" aria-controls="site-nav" data-nav-toggle>
          <span class="sr-only">Menu</span>
          <span class="nav-toggle__bar"></span>
        </button>
        <nav id="site-nav" class="site-nav" data-nav>
          ${navItems}
          <a href="/contact" class="btn btn--primary btn--sm nav-cta" data-track="employer_cta_click">Talk to FINA</a>
        </nav>
      </div>
    </header>
    <div class="mobile-bar" aria-hidden="false">
      <a href="/contact#employer" class="mobile-bar__btn" data-track="employer_cta_click">Hire Talent</a>
      <a href="/candidates#candidate-form" class="mobile-bar__btn mobile-bar__btn--alt" data-track="candidate_cta_click">Find Opportunity</a>
    </div>
  `;
}

export function renderFooter() {
  const year = new Date().getFullYear();
  return `
    <footer class="site-footer">
      <div class="container site-footer__grid">
        <div>
          <p class="footer-brand">${escapeHtml(SITE.name)}</p>
          <p class="footer-tagline">${escapeHtml(SITE.tagline)}</p>
          <p class="footer-meta">${escapeHtml(SITE.location)} · Serving ${escapeHtml(SITE.reach)}</p>
        </div>
        <div>
          <p class="footer-heading">Navigate</p>
          <ul class="footer-links">
            ${NAV.map((n) => `<li><a href="${n.href}">${escapeHtml(n.label)}</a></li>`).join("")}
          </ul>
        </div>
        <div>
          <p class="footer-heading">Contact</p>
          <ul class="footer-links">
            <li><a href="tel:+91${SITE.phone}" data-track="phone_click">${escapeHtml(SITE.phoneDisplay)}</a></li>
            <li><a href="mailto:${SITE.email}" data-track="email_click">${escapeHtml(SITE.email)}</a></li>
            <li><a href="${SITE.linkedIn}" target="_blank" rel="noopener noreferrer">LinkedIn — ${escapeHtml(SITE.founder)}</a></li>
            <li><a href="https://wa.me/91${SITE.phone}" target="_blank" rel="noopener noreferrer" data-track="whatsapp_click">WhatsApp</a></li>
          </ul>
        </div>
      </div>
      <div class="container site-footer__bottom">
        <p>© ${year} ${escapeHtml(SITE.name)}. Prototype — forms are demo-only (no backend).</p>
        <p class="footer-sectors">${SITE.sectors.join(" · ")}</p>
      </div>
    </footer>
  `;
}

export function bindLayoutInteractions(root) {
  const toggle = root.querySelector("[data-nav-toggle]");
  const nav = root.querySelector("[data-nav]");
  const header = root.querySelector("[data-header]");

  toggle?.addEventListener("click", () => {
    const open = nav?.classList.toggle("is-open");
    toggle.setAttribute("aria-expanded", open ? "true" : "false");
  });

  nav?.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      nav.classList.remove("is-open");
      toggle?.setAttribute("aria-expanded", "false");
    });
  });

  const onScroll = () => {
    header?.classList.toggle("is-scrolled", window.scrollY > 8);
  };
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();
}
