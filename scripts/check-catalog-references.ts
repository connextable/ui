import { readdir } from "node:fs/promises";
import { catalog } from "../apps/playground/app/data/catalog.ts";

const origin = new URL(process.argv[2] ?? "http://127.0.0.1:3000");
const routeFiles = await readdir(new URL("../apps/playground/app/pages/components/", import.meta.url));
const standalone = routeFiles.filter(file => file.endsWith(".vue") && !file.startsWith("[")).map(file => file.slice(0, -4));
const slugs = [...catalog.map(entry => entry.slug), ...standalone];
const entries = new Map(catalog.map(entry => [entry.slug, entry]));
const failures: string[] = [];
let checkedExamples = 0;
let checkedParts = 0;

async function check(slug: string) {
  const path = `/components/${slug}`;
  try {
    const response = await fetch(new URL(path, origin));
    if (!response.ok) throw new Error(`HTTP ${response.status}`);
    const html = await response.text();
    const ids = new Map<string, number>();
    for (const [, id] of html.matchAll(/\sid="([^"]+)"/g)) ids.set(id!, (ids.get(id!) ?? 0) + 1);

    function expectAnchor(id: string, context: string) {
      if (ids.get(id) !== 1) failures.push(`${path} ${context} #${id} (${ids.get(id) ?? 0} targets)`);
    }

    expectAnchor("api", "API section");
    const reference = /<div class="playground-reference"[\s\S]*?(?=<\/article>)/.exec(html)?.[0];
    if (!reference) throw new Error("missing shared reference");
    for (const [, description] of reference.matchAll(/<dd[^>]*>\s*<p[^>]*>([\s\S]*?)<\/p>/g)) {
      if (!description?.trim()) failures.push(`${path} reference entry has no description`);
    }
    const parts = entries.get(slug)?.parts ?? [];
    for (const part of parts) {
      expectAnchor(part, "sidebar reference");
      checkedParts++;
    }

    for (const [tag] of html.matchAll(/<a\s[^>]*\bplayground-reference__example\b[^>]*>/g)) {
      const href = /\shref="([^"]+)"/.exec(tag)?.[1];
      if (!href) throw new Error("example link has no href");
      const target = new URL(href, new URL(path, origin));
      if (target.pathname !== path || !target.hash) throw new Error(`invalid example link ${href}`);
      expectAnchor(decodeURIComponent(target.hash.slice(1)), "example link");
      checkedExamples++;
    }
  } catch (error) {
    failures.push(`${path} ${String(error)}`);
  }
}

for (let index = 0; index < slugs.length; index += 8) await Promise.all(slugs.slice(index, index + 8).map(check));

console.log(`${slugs.length} pages, ${checkedParts} reference anchors, ${checkedExamples} example links`);
if (failures.length) {
  console.error(failures.sort().join("\n"));
  process.exitCode = 1;
}
