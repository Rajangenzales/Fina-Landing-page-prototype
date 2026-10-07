import { bindForms } from "./components/forms.js";
import { bindLayoutInteractions, renderFooter, renderHeader } from "./components/layout.js";
import { bindClickTracking, captureUtm, track } from "./utils/analytics.js";
import { getRoute, normalizePath, renderRoute } from "./router.js";
import "./styles/main.css";

const app = document.getElementById("app");

function scrollToHash() {
  const hash = window.location.hash;
  if (!hash) return;
  requestAnimationFrame(() => {
    document.querySelector(hash)?.scrollIntoView({ behavior: "smooth", block: "start" });
  });
}

function navigate(path, { replace = false } = {}) {
  const [pathname, search = ""] = path.split("?");
  const normalized = normalizePath(pathname);
  const query = search ? `?${search}` : window.location.search;
  const hash = window.location.hash;

  if (!replace && normalizePath(window.location.pathname) === normalized && !hash) {
    return;
  }

  app.innerHTML = `
    ${renderHeader(normalized)}
    ${renderRoute(normalized)}
    ${renderFooter()}
  `;

  bindLayoutInteractions(app);
  bindForms(app);
  bindClickTracking(app);

  const nextUrl = normalized + query + hash;
  if (replace) {
    history.replaceState({ path: normalized }, "", nextUrl);
  } else {
    history.pushState({ path: normalized }, "", nextUrl);
  }
  scrollToHash();
  track("page_view", { path: normalized });
}

function onLinkClick(event) {
  const anchor = event.target.closest("a[href]");
  if (!anchor || anchor.target === "_blank") return;
  const url = new URL(anchor.href, window.location.origin);
  if (url.origin !== window.location.origin) return;

  const path = normalizePath(url.pathname);
  const samePage = path === normalizePath(window.location.pathname);

  if (samePage && url.hash) {
    event.preventDefault();
    history.pushState(null, "", path + url.search + url.hash);
    document.querySelector(url.hash)?.scrollIntoView({ behavior: "smooth", block: "start" });
    return;
  }

  if (samePage && !url.hash) return;

  event.preventDefault();
  window.location.hash = url.hash || "";
  navigate(path + url.search);
}

document.addEventListener("click", onLinkClick);
window.addEventListener("popstate", () => {
  navigate(window.location.pathname + window.location.search, { replace: true });
});

captureUtm();
navigate(window.location.pathname || "/", { replace: true });

// Scroll depth (demo)
let maxDepth = 0;
const milestones = [25, 50, 75, 90];
window.addEventListener(
  "scroll",
  () => {
    const doc = document.documentElement;
    const depth = Math.round(((doc.scrollTop + window.innerHeight) / doc.scrollHeight) * 100);
    if (depth > maxDepth) {
      maxDepth = depth;
      const hit = milestones.find((m) => depth >= m && maxDepth - depth <= 5);
      if (hit) track("scroll_depth", { percent: hit });
    }
  },
  { passive: true },
);
