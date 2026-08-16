import { useEffect } from "react";

const SITE_NAME = "Rosa Online Shop";

function setMetaTag(attr, key, content) {
  if (!content) return;
  let el = document.head.querySelector(`meta[${attr}="${key}"]`);
  if (!el) {
    el = document.createElement("meta");
    el.setAttribute(attr, key);
    document.head.appendChild(el);
  }
  el.setAttribute("content", content);
}

function setCanonical(url) {
  let el = document.head.querySelector('link[rel="canonical"]');
  if (!el) {
    el = document.createElement("link");
    el.setAttribute("rel", "canonical");
    document.head.appendChild(el);
  }
  el.setAttribute("href", url);
}

/**
 * useSEO
 * Sets document title, meta description, canonical URL and basic Open Graph
 * tags for the current page. Plain DOM APIs are used instead of a library
 * (e.g. react-helmet) so no new dependency/build step is introduced.
 *
 * @param {Object} options
 * @param {string} options.title - Page-specific title (SITE_NAME is appended)
 * @param {string} [options.description] - Meta description (~150-160 chars)
 * @param {string} [options.image] - Open Graph image URL
 */
export function useSEO({ title, description, image } = {}) {
  useEffect(() => {
    const fullTitle = title ? `${title} | ${SITE_NAME}` : SITE_NAME;
    const prevTitle = document.title;
    document.title = fullTitle;

    if (description) {
      setMetaTag("name", "description", description);
      setMetaTag("property", "og:description", description);
    }
    setMetaTag("property", "og:title", fullTitle);
    setMetaTag("property", "og:site_name", SITE_NAME);
    setMetaTag("property", "og:type", "website");
    if (image) setMetaTag("property", "og:image", image);
    setMetaTag("name", "twitter:card", "summary_large_image");
    setCanonical(window.location.href);

    return () => {
      document.title = prevTitle;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [title, description, image]);
}
