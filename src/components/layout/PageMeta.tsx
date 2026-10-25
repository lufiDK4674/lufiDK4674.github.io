import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { professional } from "@/data/professional";

export function PageMeta() {
  const location = useLocation();
  const path =
    location.pathname === "/" ? "/" : location.pathname.replace(/\/$/, "");
  const page =
    professional.seo[path as keyof typeof professional.seo] ??
    professional.seoNotFound;
  const canonical = professional.site.url;

  useEffect(() => {
    document.title = page.title;
    const setMeta = (selector: string, attribute: string, value: string) => {
      const element = document.querySelector<HTMLMetaElement | HTMLLinkElement>(
        selector,
      );
      element?.setAttribute(attribute, value);
    };
    setMeta('meta[name="description"]', "content", page.description);
    setMeta('meta[property="og:title"]', "content", page.title);
    setMeta('meta[property="og:description"]', "content", page.description);
    setMeta('meta[property="og:url"]', "content", canonical);
    setMeta('meta[name="twitter:title"]', "content", page.title);
    setMeta('meta[name="twitter:description"]', "content", page.description);
    setMeta('link[rel="canonical"]', "href", canonical);
  }, [page.description, page.title, canonical]);

  return null;
}
