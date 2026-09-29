import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { ARTICLES, TEAM_MEMBERS } from "../../data";
import { PRACTICE_AREAS } from "../../practiceAreas";
import core from "../../seo-core.json";
import awaitingArticleReview from "../../seo-awaiting-review.json";
import { getServiceMetadata } from "../../serviceMetadata";
import { createSeoGraph } from "../../seoGraph";

const ORIGIN = "https://paullegalassociates.com";
const BRAND = "Paul Legal Associates";
const pendingReviewRoutes = new Set(awaitingArticleReview.map(slug => `/insights/${slug}`));

// Keep head tags in step when React Router changes pages without a full reload.
// Initial HTTP responses receive the same metadata from generate-routes.js.
const RouteMetadata = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    const route = pathname.replace(/\/+$/, "") || "/";
    const area = route.startsWith("/expertise/")
      ? PRACTICE_AREAS.find(item => route === `/expertise/${item.slug}`)
      : undefined;
    const member = route.startsWith("/partners/")
      ? TEAM_MEMBERS.find(item => route === `/partners/${item.slug}`)
      : undefined;
    const article = route.startsWith("/insights/")
      ? ARTICLES.find(item => route === `/insights/${item.slug}`)
      : undefined;
    const page = core.find(item => item.route === route)
      || (area && getServiceMetadata(area))
      || (member && {
        title: `${member.name} - ${member.specialisation} | ${BRAND}`,
        description: `${member.name}, ${member.title} at ${BRAND}. ${member.specialisation}.`
      })
      || (article && {
        title: `${article.title} | ${BRAND}`,
        description: article.excerpt
      });
    if (!page) return;

    const url = ORIGIN + (route === "/" ? "/" : route + "/");
    const description = page.description.replace(/\s+/g, " ").trim();
    document.title = page.title;
    const set = (selector: string, attribute: string, value: string) => {
      document.querySelector(selector)?.setAttribute(attribute, value);
    };
    set('link[rel="canonical"]', "href", url);
    set('meta[name="description"]', "content", description);
    set('meta[name="robots"]', "content", pendingReviewRoutes.has(route) ? "noindex, follow" : "index, follow");
    set('meta[property="og:type"]', "content", article ? "article" : "website");
    set('meta[property="og:url"]', "content", url);
    set('meta[property="og:title"]', "content", page.title);
    set('meta[property="og:description"]', "content", description);
    set('meta[name="twitter:title"]', "content", page.title);
    set('meta[name="twitter:description"]', "content", description);
    const graph = createSeoGraph(route, {
      title: page.title,
      description: page.description,
      area,
      member,
      article,
      heldForReview: pendingReviewRoutes.has(route)
    });
    const script = document.querySelector<HTMLScriptElement>('#seo-graph');
    if (script) script.textContent = JSON.stringify(graph).replace(/</g, '\\u003c');
  }, [pathname]);

  return null;
};

export default RouteMetadata;
