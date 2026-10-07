export function isEmail(value) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim());
}

export function isPhone(value) {
  const digits = value.replace(/\D/g, "");
  return digits.length >= 10 && digits.length <= 13;
}

export function validateEmployer(data) {
  const errors = {};
  if (!data.fullName?.trim()) errors.fullName = "Full name is required.";
  if (!data.companyName?.trim()) errors.companyName = "Company name is required.";
  if (!isPhone(data.phone || "")) errors.phone = "Enter a valid phone number.";
  if (!isEmail(data.email || "")) errors.email = "Enter a valid email address.";
  if (!data.industry?.trim()) errors.industry = "Select an industry.";
  if (!data.requirement?.trim()) errors.requirement = "Describe your hiring requirement.";
  if (!data.consent) errors.consent = "Please confirm consent to be contacted.";
  return errors;
}

const ALLOWED_RESUME = [
  "application/pdf",
  "application/msword",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
];
const MAX_RESUME_BYTES = 5 * 1024 * 1024;

export function validateResume(file) {
  if (!file) return "Resume upload is required.";
  if (!ALLOWED_RESUME.includes(file.type)) {
    return "Upload PDF or Word document (.pdf, .doc, .docx).";
  }
  if (file.size > MAX_RESUME_BYTES) return "File must be 5 MB or smaller.";
  return null;
}

export function validateCandidate(data, resumeFile) {
  const errors = {};
  if (!data.fullName?.trim()) errors.fullName = "Full name is required.";
  if (!isPhone(data.phone || "")) errors.phone = "Enter a valid phone number.";
  if (!isEmail(data.email || "")) errors.email = "Enter a valid email address.";
  if (!data.location?.trim()) errors.location = "Location is required.";
  if (!data.roleInterest?.trim()) errors.roleInterest = "Role or area of interest is required.";
  const resumeErr = validateResume(resumeFile);
  if (resumeErr) errors.resume = resumeErr;
  if (!data.consent) errors.consent = "Please confirm consent for profile processing (demo).";
  return errors;
}
