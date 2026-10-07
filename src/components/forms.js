import { INDUSTRIES, SITE } from "../data/site.js";
import { track } from "../utils/analytics.js";
import { validateCandidate, validateEmployer } from "../utils/validate.js";
import { escapeHtml } from "./ui.js";

function fieldError(name, message) {
  return message ? `<p class="field-error" id="err-${name}" role="alert">${escapeHtml(message)}</p>` : "";
}

function showFormSuccess(form, message) {
  const box = form.querySelector("[data-form-success]");
  if (box) {
    box.hidden = false;
    box.textContent = message;
  }
  form.reset();
  form.querySelectorAll(".field-error").forEach((el) => el.remove());
  form.querySelectorAll(".is-invalid").forEach((el) => el.classList.remove("is-invalid"));
}

export function employerFormMarkup({ id = "employer-form" } = {}) {
  const industryOptions = INDUSTRIES.map(
    (i) => `<option value="${escapeHtml(i.title)}">${escapeHtml(i.title)}</option>`,
  ).join("");
  return `
    <form class="form" id="${id}" data-employer-form novalidate>
      <div class="form-grid">
        <div class="form-field">
          <label for="${id}-fullName">Full Name <span class="req">*</span></label>
          <input id="${id}-fullName" name="fullName" required autocomplete="name" />
        </div>
        <div class="form-field">
          <label for="${id}-companyName">Company Name <span class="req">*</span></label>
          <input id="${id}-companyName" name="companyName" required autocomplete="organization" />
        </div>
        <div class="form-field">
          <label for="${id}-phone">Phone <span class="req">*</span></label>
          <input id="${id}-phone" name="phone" type="tel" required autocomplete="tel" placeholder="+91" />
        </div>
        <div class="form-field">
          <label for="${id}-email">Email <span class="req">*</span></label>
          <input id="${id}-email" name="email" type="email" required autocomplete="email" />
        </div>
        <div class="form-field">
          <label for="${id}-industry">Industry <span class="req">*</span></label>
          <select id="${id}-industry" name="industry" required>
            <option value="">Select industry</option>
            ${industryOptions}
            <option value="Other">Other</option>
          </select>
        </div>
        <div class="form-field">
          <label for="${id}-positions">Number of Positions</label>
          <input id="${id}-positions" name="positions" type="number" min="1" inputmode="numeric" />
        </div>
        <div class="form-field form-field--full">
          <label for="${id}-location">Location</label>
          <input id="${id}-location" name="location" autocomplete="address-level2" />
        </div>
        <div class="form-field form-field--full">
          <label for="${id}-requirement">Hiring Requirement <span class="req">*</span></label>
          <textarea id="${id}-requirement" name="requirement" rows="4" required></textarea>
        </div>
        <div class="form-field form-field--full">
          <label for="${id}-message">Additional Message</label>
          <textarea id="${id}-message" name="message" rows="3"></textarea>
        </div>
        <div class="form-field form-field--full form-consent">
          <label class="checkbox">
            <input type="checkbox" name="consent" required />
            <span>I agree to be contacted about this requirement. (Demo prototype — no data is sent to a server.)</span>
          </label>
        </div>
      </div>
      <div class="form-actions">
        <button type="submit" class="btn btn--primary" data-track="employer_form_submit">Submit Requirement</button>
      </div>
      <p class="form-success" data-form-success hidden role="status"></p>
    </form>
  `;
}

export function candidateFormMarkup({ id = "candidate-form" } = {}) {
  return `
    <form class="form" id="${id}" data-candidate-form novalidate enctype="multipart/form-data">
      <div class="form-grid">
        <div class="form-field">
          <label for="${id}-fullName">Full Name <span class="req">*</span></label>
          <input id="${id}-fullName" name="fullName" required autocomplete="name" />
        </div>
        <div class="form-field">
          <label for="${id}-phone">Phone <span class="req">*</span></label>
          <input id="${id}-phone" name="phone" type="tel" required autocomplete="tel" />
        </div>
        <div class="form-field">
          <label for="${id}-email">Email <span class="req">*</span></label>
          <input id="${id}-email" name="email" type="email" required autocomplete="email" />
        </div>
        <div class="form-field">
          <label for="${id}-location">Location <span class="req">*</span></label>
          <input id="${id}-location" name="location" required />
        </div>
        <div class="form-field form-field--full">
          <label for="${id}-roleInterest">Role / Area of Interest <span class="req">*</span></label>
          <input id="${id}-roleInterest" name="roleInterest" required />
        </div>
        <div class="form-field form-field--full">
          <label for="${id}-resume">Resume Upload <span class="req">*</span></label>
          <input id="${id}-resume" name="resume" type="file" accept=".pdf,.doc,.docx,application/pdf" required />
          <p class="field-hint">PDF or Word, max 5 MB. Validated locally in this demo.</p>
        </div>
        <div class="form-field form-field--full">
          <label for="${id}-message">Additional Message</label>
          <textarea id="${id}-message" name="message" rows="3"></textarea>
        </div>
        <div class="form-field form-field--full form-consent">
          <label class="checkbox">
            <input type="checkbox" name="consent" required />
            <span>I consent to FINA processing my profile for recruitment purposes. Production site requires a formal privacy policy.</span>
          </label>
        </div>
      </div>
      <div class="form-actions">
        <button type="submit" class="btn btn--primary" data-track="candidate_form_submit">Submit Profile</button>
      </div>
      <p class="form-success" data-form-success hidden role="status"></p>
    </form>
  `;
}

function applyErrors(form, errors) {
  form.querySelectorAll(".field-error").forEach((el) => el.remove());
  form.querySelectorAll(".is-invalid").forEach((el) => el.classList.remove("is-invalid"));
  for (const [name, message] of Object.entries(errors)) {
    const input = form.elements.namedItem(name);
    if (input && input instanceof HTMLElement) {
      input.classList.add("is-invalid");
      input.setAttribute("aria-invalid", "true");
    }
    const field = form.querySelector(`[name="${name}"]`)?.closest(".form-field");
    field?.insertAdjacentHTML("beforeend", fieldError(name, message));
  }
}

export function bindEmployerForm(form) {
  form.addEventListener("focusin", () => track("employer_form_start"), { once: true });
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const fd = new FormData(form);
    const data = Object.fromEntries(fd.entries());
    data.consent = fd.get("consent") === "on";
    const errors = validateEmployer(data);
    if (Object.keys(errors).length) {
      applyErrors(form, errors);
      return;
    }
    track("employer_form_submit", { company: data.companyName });
    showFormSuccess(
      form,
      `Thank you, ${data.fullName}. Your requirement for ${data.companyName} has been recorded in this demo. ${SITE.name} will contact you at ${data.email} when the live form is connected.`,
    );
  });
}

export function bindCandidateForm(form) {
  const resumeInput = form.querySelector('input[type="file"]');
  resumeInput?.addEventListener("change", () => track("resume_upload"));
  form.addEventListener("focusin", () => track("candidate_form_start"), { once: true });
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const fd = new FormData(form);
    const data = Object.fromEntries(
      [...fd.entries()].filter(([k]) => k !== "resume"),
    );
    data.consent = fd.get("consent") === "on";
    const resumeFile = fd.get("resume");
    const errors = validateCandidate(
      data,
      resumeFile instanceof File && resumeFile.size ? resumeFile : null,
    );
    if (Object.keys(errors).length) {
      applyErrors(form, errors);
      return;
    }
    track("candidate_form_submit", { role: data.roleInterest });
    showFormSuccess(
      form,
      `Thank you, ${data.fullName}. Your profile has been validated in this demo. No file was uploaded to a server.`,
    );
  });
}

export function bindForms(root) {
  root.querySelectorAll("[data-employer-form]").forEach(bindEmployerForm);
  root.querySelectorAll("[data-candidate-form]").forEach(bindCandidateForm);
}
