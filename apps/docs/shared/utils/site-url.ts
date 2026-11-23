export function sitePageUrl(siteUrl: string, path: string): string | undefined {
  if (!siteUrl) return;
  try {
    const site = new URL(siteUrl);
    if (!["https:", "http:"].includes(site.protocol) || site.username || site.password) return;
    site.pathname = `${site.pathname.replace(/\/$/, "")}${path}`;
    site.search = "";
    site.hash = "";
    return site.href;
  } catch {
    return undefined;
  }
}
