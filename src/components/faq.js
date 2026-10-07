import { FAQ } from "../data/site.js";
import { escapeHtml } from "./ui.js";

export function faqSection() {
  return `
    <section class="section section--faq" id="faq" aria-labelledby="faq-title">
      <div class="container">
        <h2 id="faq-title" class="section-title">Frequently Asked Questions</h2>
        ${FAQ.map(
          (group) => `
          <div class="faq-group">
            <h3 class="faq-group__title">${escapeHtml(group.category)}</h3>
            <div class="faq-list">
              ${group.items
                .map(
                  (item, idx) => `
                <details class="faq-item">
                  <summary>${escapeHtml(item.q)}</summary>
                  <p>${escapeHtml(item.a)}</p>
                </details>
              `,
                )
                .join("")}
            </div>
          </div>
        `,
        )
        .join("")}
      </div>
    </section>
  `;
}
