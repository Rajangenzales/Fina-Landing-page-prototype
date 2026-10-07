import { PAGE_META } from "./data/site.js";
import { aboutPage } from "./pages/about.js";
import { candidatesPage } from "./pages/candidates.js";
import { contactPage } from "./pages/contact.js";
import { homePage } from "./pages/home.js";
import { industriesPage } from "./pages/industries.js";
import { servicesPage } from "./pages/services.js";
import { faqJsonLd, injectJsonLd, organizationJsonLd, websiteJsonLd } from "./utils/schema.js";

const routes = {
  "/": { render: homePage, schema: () => [organizationJsonLd(), websiteJsonLd(), faqJsonLd()] },
  "/about": { render: aboutPage, schema: () => [organizationJsonLd()] },
  "/services": { render: servicesPage, schema: () => [organizationJsonLd()] },
  "/industries": { render: industriesPage, schema: () => [organizationJsonLd()] },
  "/candidates": { render: candidatesPage, schema: () => [organizationJsonLd()] },
  "/contact": { render: contactPage, schema: () => [organizationJsonLd()] },
};

export function normalizePath(path) {
  if (!path || path === "") return "/";
  const clean = path.split("?")[0].replace(/\/+$/, "") || "/";
  return clean in routes ? clean : "/";
}

export function setPageMeta(path) {
  const meta = PAGE_META[path] || PAGE_META["/"];
  document.title = meta.title;
  const desc = document.querySelector('meta[name="description"]');
  if (desc) desc.setAttribute("content", meta.description);
  const ogTitle = document.querySelector('meta[property="og:title"]');
  const ogDesc = document.querySelector('meta[property="og:description"]');
  ogTitle?.setAttribute("content", meta.title);
  ogDesc?.setAttribute("content", meta.description);
  const canonical = document.querySelector('link[rel="canonical"]');
  if (canonical) {
    const base = "https://finaconsultancy.in";
    canonical.setAttribute("href", path === "/" ? `${base}/` : `${base}${path}`);
  }
}

export function getRoute(path) {
  const normalized = normalizePath(path);
  return { path: normalized, ...routes[normalized] };
}

export function renderRoute(path) {
  const route = getRoute(path);
  setPageMeta(route.path);
  injectJsonLd(route.schema());
  return route.render();
}
