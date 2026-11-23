import { readdir, readFile } from "node:fs/promises";
import { catalog } from "../apps/playground/app/data/catalog.ts";
import { arrangeCatalogExamples } from "../apps/playground/app/data/catalog-example-sections.ts";
import { catalogGuides } from "../apps/playground/app/data/catalog-guides.ts";
import { catalogNavigation } from "../apps/playground/app/data/catalog-navigation.ts";
import { legacyStructureAnchorSlugs } from "../apps/playground/app/data/catalog-reference.ts";
import { readPublicComponentApi } from "../apps/playground/build/public-component-api.ts";

const origin = new URL(process.argv[2] ?? "http://127.0.0.1:3000");
const componentPath = "/components/";
const mainSectionOrder = ["usage", "settings-and-behavior", "practical-examples", "examples", "composition-and-extension", "parts", "api"];
const routeFiles = await readdir(new URL("../apps/playground/app/pages/components/", import.meta.url));
const standalone = routeFiles.filter(file => file.endsWith(".vue") && !file.startsWith("[")).map(file => file.slice(0, -4));
const routes = new Set([...catalog.map(entry => entry.slug), ...standalone]);
const slugs = catalogNavigation.flatMap(group => [...group.slugs]);
const entries = new Map(catalog.map(entry => [entry.slug, entry]));
const standaloneTitles = new Map(await Promise.all(standalone.map(async slug => {
  const source = await readFile(new URL(`../apps/playground/app/pages/components/${slug}.vue`, import.meta.url), "utf8");
  const title = /definePageMeta\(\s*\{\s*title:\s*"(UI\w+)"/.exec(source)?.[1];
  if (!title) throw new Error(`Missing component title for ${slug}`);
  return [slug, title] as const;
})));
const publicApi = readPublicComponentApi();
const failures: string[] = [];
const navigationSlugs = new Set<string>(slugs);
if (navigationSlugs.size !== slugs.length) failures.push("Duplicate sidebar component route");
for (const slug of routes) if (!navigationSlugs.has(slug)) failures.push(`Sidebar omits ${slug}`);
for (const slug of slugs) if (!routes.has(slug)) failures.push(`Sidebar references missing route ${slug}`);

const exampleDirectory = new URL("../apps/playground/app/components/catalog/examples/", import.meta.url);
const exampleFiles = new Set((await readdir(exampleDirectory)).filter(file => file.endsWith(".vue")).map(file => file.slice(0, -4)));
const exampleIDs = new Set(Object.values(catalogGuides).flatMap(guide => guide.examples?.map(example => example.id) ?? []));
for (const id of exampleFiles) if (!exampleIDs.has(id)) failures.push(`Unlisted example file ${id}.vue`);
for (const id of exampleIDs) if (!exampleFiles.has(id)) failures.push(`Missing example file ${id}.vue`);

let checkedExamples = 0;
let checkedParts = 0;
let checkedInitialExamples = 0;
let checkedDetailedExamples = 0;
let checkedDeclaredMembers = 0;

async function check(slug: string) {
  const path = `${componentPath}${slug}`;
  try {
    const response = await fetch(new URL(path, origin));
    if (!response.ok) throw new Error(`HTTP ${response.status}`);
    const html = await response.text();
    const ids = new Map<string, number>();
    for (const [, id] of html.matchAll(/\sid="([^"]+)"/g)) ids.set(id!, (ids.get(id!) ?? 0) + 1);

    const sidebarLinks = [...html.matchAll(/<a\s[^>]*\bplayground-sidebar-link\b[^>]*>/g)]
      .flatMap(([tag]) => {
        const match = /\shref="([^"#]+)(?:#([^"]+))?"/.exec(tag);
        return match ? [match] : [];
      });
    if (slug === slugs[0]) {
      const sidebarSlugs = sidebarLinks.flatMap(([, href, hash]) => href?.startsWith(componentPath) && !hash ? [href.slice(componentPath.length)] : []);
      if (sidebarSlugs.join(" ") !== slugs.join(" ")) failures.push(`${path} rendered sidebar order differs from the catalog`);
    }

    function expectAnchor(id: string, context: string) {
      if (ids.get(id) !== 1) failures.push(`${path} ${context} #${id} (${ids.get(id) ?? 0} targets)`);
    }

    expectAnchor("api", "API section");
    if (legacyStructureAnchorSlugs.has(slug)) expectAnchor("parts-structure", "legacy reference");
    for (const [id, count] of ids) {
      if (count > 1) failures.push(`${path} duplicate document id #${id} (${count} targets)`);
    }

    const headings = [...html.matchAll(/<h([234])\b(?=[^>]*\bdata-playground-heading\b)[^>]*\sid="([^"]+)"/g)]
      .map(([, level, id]) => ({ id: id!, level: Number(level) }));
    let previousLevel = 1;
    for (const { id, level } of headings) {
      if (level > previousLevel + 1) failures.push(`${path} skips a heading level before #${id}`);
      previousLevel = level;
    }

    const sections = headings.filter(heading => heading.level === 2).map(heading => heading.id);
    const mainSections = sections.filter(id => mainSectionOrder.includes(id));
    if (sections[0] !== "usage" || sections.at(-1) !== "api"
      || mainSections.join(" ") !== mainSectionOrder.filter(id => mainSections.includes(id)).join(" ")) {
      failures.push(`${path} top-level sections do not follow the catalog order`);
    }

    const guide = catalogGuides[slug];
    if (guide) {
      const expected = [{ id: "usage", level: 2 }, { id: "basic-example", level: 3 }];
      for (const phase of arrangeCatalogExamples(guide.examples ?? [], guide.sections)) {
        expected.push({ id: phase.id, level: 2 });
        for (const group of phase.groups) {
          const hasGroupHeading = group.examples.length > 1;
          if (hasGroupHeading) {
            expected.push({ id: group.id, level: 3 });
          } else {
            expectAnchor(group.id, "single-example group");
            if (headings.some(heading => heading.id === group.id)) failures.push(`${path} shows a group heading for one example #${group.id}`);
          }
          expected.push(...group.examples.map(example => ({ id: example.id, level: hasGroupHeading ? 4 : 3 })));
          checkedDetailedExamples += group.examples.length;
        }
      }
      expected.push({ id: "api", level: 2 });
      let previousIndex = -1;
      for (const { id, level } of expected) {
        expectAnchor(id, "guide section");
        const index = headings.findIndex(heading => heading.id === id && heading.level === level);
        if (index <= previousIndex) failures.push(`${path} missing or out-of-order heading #${id}`);
        previousIndex = Math.max(previousIndex, index);
      }
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
    const components = [...reference.matchAll(/data-api-component="([^"]+)"([\s\S]*?)(?=data-api-component=|<\/details>)/g)]
      .map(([, name, source]) => [name!, new Set([...source!.matchAll(/data-api-name="([^"]+)"/g)].map(([, member]) => member!))] as const);
    const renderedApi = new Map(components);
    const entry = entries.get(slug);
    const expectedApi = [entry?.title ?? standaloneTitles.get(slug)!, ...(entry?.parts ?? [])]
      .filter(name => !!publicApi[name]?.length);
    if (!renderedApi.size) failures.push(`${path} has no declaration API reference`);
    for (const name of new Set([...expectedApi, ...renderedApi.keys()])) {
      const members = publicApi[name] ?? [];
      const rendered = renderedApi.get(name);
      for (const { name: member } of members) {
        if (!rendered?.has(member)) failures.push(`${path} omits public API ${name} / ${member}`);
        else checkedDeclaredMembers++;
      }
    }
    for (const [, description] of reference.matchAll(/<dd[^>]*>\s*<p[^>]*>([\s\S]*?)<\/p>/g)) {
      if (!description?.trim()) failures.push(`${path} reference entry has no description`);
    }
    const parts = sidebarLinks.flatMap(([, href, hash]) => href === path && hash ? [decodeURIComponent(hash)] : []);
    for (const part of entries.get(slug)?.parts ?? []) {
      if (!parts.includes(part)) failures.push(`${path} sidebar omits #${part}`);
    }
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

console.log(`${slugs.length} pages in ${catalogNavigation.length} groups, ${checkedInitialExamples} initially open Vue examples, ${checkedDetailedExamples} detailed examples, ${checkedParts} reference anchors, ${checkedExamples} example links, ${checkedDeclaredMembers} declaration members`);
if (failures.length) {
  console.error(failures.sort().join("\n"));
  process.exitCode = 1;
}
