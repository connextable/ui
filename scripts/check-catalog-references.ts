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
let checkedInitialExamples = 0;

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
    for (const [id, count] of ids) {
      if (count > 1) failures.push(`${path} duplicate document id #${id} (${count} targets)`);
    }

    const firstToggle = /<button\s[^>]*\bplayground-example__toggle\b[^>]*>/.exec(html);
    const sourceID = firstToggle?.[0].match(/\saria-controls="([^"]+)"/)?.[1];
    if (!firstToggle?.[0].includes('aria-expanded="true"') || !sourceID) {
      failures.push(`${path} first example code is closed or missing`);
    } else {
      expectAnchor(sourceID, "first example source");
      const sourceStart = html.indexOf(`id="${sourceID}"`, firstToggle.index);
      const sectionEnd = html.indexOf("</section>", sourceStart);
      const code = /<pre\b[^>]*>([\s\S]*?)<\/pre>/.exec(html.slice(sourceStart, sectionEnd))?.[1];
      const source = code?.replace(/<[^>]*>/g, "").replace(/&(?:#x3c|#60|lt);/gi, "<");
      if (!source || !/<script\b/.test(source) || !/<template\b/.test(source)) {
        failures.push(`${path} first example has no complete Vue source`);
      } else {
        checkedInitialExamples++;
      }
    }

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

console.log(`${slugs.length} pages, ${checkedInitialExamples} initially open Vue examples, ${checkedParts} reference anchors, ${checkedExamples} example links`);
if (failures.length) {
  console.error(failures.sort().join("\n"));
  process.exitCode = 1;
}
