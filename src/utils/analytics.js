const STORAGE_KEY = "fina_utm";

export function captureUtm() {
  const params = new URLSearchParams(window.location.search);
  const utm = {
    source: params.get("utm_source"),
    medium: params.get("utm_medium"),
    campaign: params.get("utm_campaign"),
    content: params.get("utm_content"),
    landing: window.location.pathname,
  };
  if (utm.source || utm.medium || utm.campaign) {
    sessionStorage.setItem(STORAGE_KEY, JSON.stringify(utm));
  }
}

export function getAttribution() {
  try {
    return JSON.parse(sessionStorage.getItem(STORAGE_KEY) || "null");
  } catch {
    return null;
  }
}

/** Demo analytics — logs events; swap for gtag/plausible in production. */
export function track(event, detail = {}) {
  const payload = {
    event,
    ...detail,
    attribution: getAttribution(),
    ts: new Date().toISOString(),
  };
  window.dispatchEvent(new CustomEvent("fina:analytics", { detail: payload }));
  if (import.meta.env.DEV) {
    console.info("[analytics]", payload);
  }
}

export function bindClickTracking(root = document) {
  root.querySelectorAll("[data-track]").forEach((el) => {
    el.addEventListener("click", () => {
      track(el.dataset.track, { label: el.textContent?.trim() });
    });
  });
}
