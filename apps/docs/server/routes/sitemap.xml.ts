import { catalogNavigation } from "../../app/data/catalog-navigation";
import { guidePages } from "#shared/guide-pages";
import { sitePageUrl } from "#shared/utils/site-url";

export default defineEventHandler((event) => {
  const { siteUrl } = useRuntimeConfig(event).public;
  if (!sitePageUrl(siteUrl, "/")) throw createError({ statusCode: 404 });

  const paths = [
    ...guidePages.map(({ path }) => path),
    ...catalogNavigation.flatMap(group => group.slugs.map(slug => `/components/${slug}`)),
  ];
  const entries = paths.map(path => {
    const url = sitePageUrl(siteUrl, path)!.replace(/[&<>"']/g, character =>
      ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&apos;" })[character]!);
    return `  <url><loc>${url}</loc></url>`;
  });
  setResponseHeader(event, "Content-Type", "application/xml; charset=utf-8");
  return [`<?xml version="1.0" encoding="UTF-8"?>`, `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">`, ...entries, "</urlset>", ""].join("\n");
});
