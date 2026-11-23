/// <reference types="node" />

import { readFile } from "node:fs/promises";
import { dirname, resolve } from "node:path";
import { format } from "prettier";
import { babelParse, parse } from "vue/compiler-sfc";
import * as lightboxMedia from "../app/data/lightbox-media";
import { highlightExampleCode } from "../app/utils/highlight-example-code";

const exampleCodeQuery = "?example-code&raw";

async function formatExample(source: string, filename: string, watchFile: (path: string) => void) {
  if (!source.includes("<PlaygroundExample") && !source.includes("~/data/lightbox-media") && !/<style[^>]+\bsrc=/.test(source)) {
    return (await format(source, { parser: "vue" })).trimEnd();
  }

  const { descriptor } = parse(source);
  const template = descriptor.template;
  const nodes = [...(template?.ast?.children ?? [])];
  let example;
  for (const node of nodes) {
    if (!("tag" in node)) continue;
    if (node.tag === "PlaygroundExample") {
      example = node;
      break;
    }
    nodes.push(...node.children);
  }
  const edits: { start: number; end: number; text: string }[] = [];
  if (example) {
    const preview = example.children.map((node) => {
      if ("tag" in node && node.tag === "template") {
        const slot = node.props.find(prop => prop.name === "slot" && "arg" in prop);
        if (slot && "arg" in slot) {
          if (slot.arg && "content" in slot.arg && slot.arg.content !== "default") return "";
          return node.children.map(child => child.loc.source).join("\n");
        }
      }
      return node.loc.source;
    }).join("\n");
    const condition = example.props.find(prop => prop.name === "if");
    const content = condition ? `<template ${condition.loc.source}>\n${preview}\n</template>` : preview;
    edits.push({ start: example.loc.start.offset, end: example.loc.end.offset, text: `\n${content}\n` });
  }

  for (const style of descriptor.styles) {
    if (!style.src?.startsWith(".")) continue;
    const filenameOfStyle = resolve(dirname(filename), style.src);
    watchFile(filenameOfStyle);
    const css = await readFile(filenameOfStyle, "utf8");
    const start = source.lastIndexOf("<style", style.loc.start.offset);
    const tag = source.slice(start, style.loc.start.offset).replace(/\s+src=("[^"]*"|'[^']*')/, "");
    edits.push({ start, end: style.loc.end.offset, text: `${tag}\n${css.trimEnd()}\n` });
  }

  // Strip the import that feeds the playground code panel while retaining the example setup.
  for (const script of [descriptor.script, descriptor.scriptSetup]) {
    if (!script) continue;
    const { program } = babelParse(script.content, {
      sourceType: "module",
      plugins: script.lang === "ts" ? ["typescript"] : [],
    });
    for (const statement of program.body) {
      if (statement.type !== "ImportDeclaration") continue;

      let replacement: string;
      if (example && statement.source.value.endsWith(exampleCodeQuery)) {
        replacement = "";
      } else if (statement.source.value === "~/data/lightbox-media") {
        replacement = statement.specifiers.map(specifier => {
          if (specifier.type !== "ImportSpecifier" || specifier.imported.type !== "Identifier" ||
              !(specifier.imported.name in lightboxMedia)) {
            throw new Error(`Unknown lightbox fixture: ${specifier.local.name}`);
          }
          const item = lightboxMedia[specifier.imported.name as keyof typeof lightboxMedia];
          return `const ${specifier.local.name} = ${JSON.stringify(item)} as const;`;
        }).join("\n");
      } else {
        continue;
      }
      edits.push({
        start: script.loc.start.offset + (statement.start ?? 0),
        end: script.loc.start.offset + (statement.end ?? 0),
        text: replacement,
      });
    }
  }

  for (const { start, end, text } of edits.sort((a, b) => b.start - a.start)) {
    source = source.slice(0, start) + text + source.slice(end);
  }
  return (await format(source, { parser: "vue", htmlWhitespaceSensitivity: "ignore" })).trimEnd();
}

export function highlightExamples() {
  return {
    name: "playground:highlight-examples",
    enforce: "pre" as const,
    async load(this: { addWatchFile(file: string): void }, id: string) {
      if (!id.endsWith(`.vue${exampleCodeQuery}`)) return;

      const filename = id.slice(0, -exampleCodeQuery.length);
      this.addWatchFile(filename);

      const source = await readFile(filename, "utf8");
      const html = await highlightExampleCode(await formatExample(source, filename, path => this.addWatchFile(path)));

      return `export default ${JSON.stringify(html)};`;
    },
  };
}
