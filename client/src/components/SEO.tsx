/**
 * SEO Component - Dynamic meta tags for each page
 */

import { useEffect } from "react";

interface SEOProps {
  title?: string;
  description?: string;
  keywords?: string;
  image?: string;
  url?: string;
  type?: "website" | "article";
  publishedTime?: string;
  author?: string;
}

const defaultSEO = {
  title: "Mega Simulador Blog - Estatísticas e Dicas de Loteria",
  description:
    "Blog completo sobre Mega Sena: estatísticas, análises de probabilidade, dicas de bolão e estratégias de jogo responsável. Dados históricos desde 1996.",
  keywords:
    "mega sena, loteria, estatísticas, probabilidade, bolão, números mais sorteados, simulador, jogo responsável",
  image: "/images/hero-banner.png",
  url: "https://megasimulador.sbs",
  type: "website" as const,
};

export default function SEO({
  title,
  description,
  keywords,
  image,
  url,
  type = "website",
  publishedTime,
  author,
}: SEOProps) {
  useEffect(() => {
    // Update document title
    const fullTitle = title
      ? `${title} | Mega Simulador Blog`
      : defaultSEO.title;
    document.title = fullTitle;

    // Update meta tags
    const updateMetaTag = (name: string, content: string, isProperty = false) => {
      const attribute = isProperty ? "property" : "name";
      let element = document.querySelector(`meta[${attribute}="${name}"]`);
      
      if (!element) {
        element = document.createElement("meta");
        element.setAttribute(attribute, name);
        document.head.appendChild(element);
      }
      
      element.setAttribute("content", content);
    };

    // Basic meta tags
    updateMetaTag("description", description || defaultSEO.description);
    updateMetaTag("keywords", keywords || defaultSEO.keywords);
    updateMetaTag("author", author || "Mega Simulador");

    // Open Graph tags
    updateMetaTag("og:title", fullTitle, true);
    updateMetaTag("og:description", description || defaultSEO.description, true);
    updateMetaTag("og:image", image || defaultSEO.image, true);
    updateMetaTag("og:url", url || defaultSEO.url, true);
    updateMetaTag("og:type", type, true);
    updateMetaTag("og:locale", "pt_BR", true);
    updateMetaTag("og:site_name", "Mega Simulador Blog", true);

    // Twitter Card tags
    updateMetaTag("twitter:card", "summary_large_image");
    updateMetaTag("twitter:title", fullTitle);
    updateMetaTag("twitter:description", description || defaultSEO.description);
    updateMetaTag("twitter:image", image || defaultSEO.image);

    // Article-specific tags
    if (type === "article" && publishedTime) {
      updateMetaTag("article:published_time", publishedTime, true);
      updateMetaTag("article:author", author || "Mega Simulador", true);
    }

    // Canonical URL
    let canonical = document.querySelector('link[rel="canonical"]');
    if (!canonical) {
      canonical = document.createElement("link");
      canonical.setAttribute("rel", "canonical");
      document.head.appendChild(canonical);
    }
    canonical.setAttribute("href", url || window.location.href);

  }, [title, description, keywords, image, url, type, publishedTime, author]);

  return null;
}
