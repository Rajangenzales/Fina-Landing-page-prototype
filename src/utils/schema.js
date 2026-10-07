import { SITE, EMPLOYER_SERVICES, FAQ } from "../data/site.js";

export function organizationJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: SITE.name,
    url: "https://finaconsultancy.in/",
    logo: `https://finaconsultancy.in${SITE.logo}`,
    image: `https://finaconsultancy.in${SITE.logo}`,
    description:
      "PAN-India talent and HR consultancy serving organisations and candidates across Manufacturing, Banking and Insurance.",
    founder: {
      "@type": "Person",
      name: SITE.founder,
      jobTitle: "Founder",
      image: `https://finaconsultancy.in${SITE.founderPhoto}`,
      sameAs: SITE.linkedIn,
    },
    address: {
      "@type": "PostalAddress",
      addressLocality: "Thrissur",
      addressRegion: "Kerala",
      addressCountry: "IN",
    },
    areaServed: "IN",
    telephone: `+91${SITE.phone}`,
    sameAs: [SITE.linkedIn],
  };
}

export function websiteJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: SITE.name,
    url: "https://finaconsultancy.in/",
    description: SITE.positioning,
  };
}

export function faqJsonLd() {
  const items = FAQ.flatMap((g) => g.items).map((item) => ({
    "@type": "Question",
    name: item.q,
    acceptedAnswer: { "@type": "Answer", text: item.a },
  }));
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items,
  };
}

export function servicesJsonLd() {
  return EMPLOYER_SERVICES.map((s) => ({
    "@context": "https://schema.org",
    "@type": "Service",
    name: s.title,
    description: s.body,
    provider: { "@type": "Organization", name: SITE.name },
    areaServed: "IN",
  }));
}

export function injectJsonLd(objects) {
  document.querySelectorAll('script[data-jsonld="fina"]').forEach((n) => n.remove());
  const frag = document.createDocumentFragment();
  for (const obj of objects) {
    const script = document.createElement("script");
    script.type = "application/ld+json";
    script.dataset.jsonld = "fina";
    script.textContent = JSON.stringify(obj);
    frag.appendChild(script);
  }
  document.head.appendChild(frag);
}
