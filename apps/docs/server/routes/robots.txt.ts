import { sitePageUrl } from "#shared/utils/site-url";

export default defineEventHandler((event) => {
  const sitemap = sitePageUrl(useRuntimeConfig(event).public.siteUrl, "/sitemap.xml");
  setResponseHeader(event, "Content-Type", "text/plain; charset=utf-8");
  return `User-agent: *\nAllow: /\n${sitemap ? `Sitemap: ${sitemap}\n` : ""}`;
});
