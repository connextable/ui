import { readFile } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import { parse } from "vue/compiler-sfc";
import { catalog } from "../app/data/catalog";
import { arrangeCatalogExamples } from "../app/data/catalog-example-sections";
import { catalogGuides } from "../app/data/catalog-guides";
import { stateApiNotes, type ReferenceExample } from "../app/data/catalog-reference";

const moduleID = "virtual:catalog-reference-examples";
const resolvedID = `\0${moduleID}`;
const base = new URL("../app/components/catalog/", import.meta.url);

function kebab(name: string) {
  return name.replace(/[A-Z]/g, value => `-${value.toLowerCase()}`).replace(/^-/, "");
}

function exampleUses(source: string, title: string, parts: readonly string[]) {
  const { descriptor } = parse(source);
  const script = [descriptor.script?.content, descriptor.scriptSetup?.content].filter(Boolean).join("\n");
  const used = new Set<string>();
  const rootProps = new Set<string>();
  const aliases = new Set([title, ...parts]);
  const pending = (descriptor.template?.ast?.children ?? []).map(node => ({ node, parent: "" }));

  for (const { node, parent } of pending) {
    if (!("tag" in node)) continue;
    for (const child of node.children) pending.push({ node: child, parent: node.tag });
    if (node.tag === "template") {
      if (!aliases.has(parent)) continue;
      for (const prop of node.props) {
        if (prop.type === 7 && prop.name === "slot" && prop.arg?.type === 4) used.add(`#${prop.arg.content}`);
      }
      continue;
    }
    if (!aliases.has(node.tag)) continue;
    used.add(node.tag);
    for (const prop of node.props) {
      if (prop.type === 6) {
        used.add(prop.name);
        if (node.tag === title) rootProps.add(prop.name);
        continue;
      }
      const arg = prop.arg?.type === 4 ? prop.arg.content : undefined;
      if (prop.name === "bind" && arg) {
        used.add(arg);
        if (node.tag === title) rootProps.add(arg);
      }
      if (prop.name === "model") used.add(arg ? `v-model:${arg}` : "v-model");
      if (prop.name === "slot") used.add(`#${arg ?? "default"}`);
      if (prop.name === "on" && arg) used.add(`@${arg}`);
    }
  }

  // Controller options are expressions in script setup, while components are tags in the template.
  const scriptProps = new Set([...script.matchAll(/\b([A-Za-z][\w]*)\s*:/g)].flatMap(([, name]) => [name!, kebab(name!)]));
  for (const part of parts) {
    if (/^(?:use|create|track)[A-Z]/.test(part) && script.includes(`${part}(`)) used.add(part);
  }
  return { used, scriptProps, rootProps };
}

export function catalogReferenceExamples() {
  return {
    name: "playground:catalog-reference-examples",
    resolveId(id: string) { return id === moduleID ? resolvedID : undefined; },
    async load(this: { addWatchFile(path: string): void }, id: string) {
      if (id !== resolvedID) return;
      const output: Record<string, Record<string, ReferenceExample>> = {};
      await Promise.all(catalog.map(async entry => {
        const guide = catalogGuides[entry.slug];
        if (!guide) throw new Error(`Missing component guide for ${entry.slug}`);
        const sections = [
          { id: "basic-example", title: guide.title, file: `${entry.slug}.vue`, parts: undefined },
          ...arrangeCatalogExamples(guide.examples ?? [], guide.sections)
            .flatMap(phase => phase.examples)
            .map(example => ({ ...example, file: `examples/${example.id}.vue` })),
        ];
        const notes = Object.keys({ ...stateApiNotes(entry.slug), ...guide.api });
        const results = await Promise.all(sections.map(async example => {
          const file = fileURLToPath(new URL(example.file, base));
          this.addWatchFile(file);
          const content = await readFile(file, "utf8");
          return { example, ...exampleUses(content, entry.title, entry.parts ?? []) };
        }));

        const links: Record<string, ReferenceExample> = {};
        for (const name of new Set([...(entry.parts ?? []), ...notes])) {
          const tokens = name.split(/\s+\/\s+|,\s*/);
          const matchesTemplate = ({ used, rootProps }: ReturnType<typeof exampleUses>) => tokens.some(token =>
            (token === "readonly" || token === "disabled" ? rootProps : used).has(token));
          const matchesScript = (found: Set<string>) => tokens.some(token =>
            /^(?:source|defaultExpansion|defaultAccessState|rowSelection|isCellDisabled)$/.test(token) && found.has(token));
          const match = results.find(({ example }) => example.parts?.includes(name))
            ?? results.find(result => result.example.id !== "basic-example" && matchesTemplate(result))
            ?? results.find(result => matchesTemplate(result) || matchesScript(result.scriptProps));
          if (match) links[name] = { id: match.example.id, title: match.example.title };
        }
        output[entry.slug] = links;
      }));
      return `export default ${JSON.stringify(output)};`;
    },
  };
}
