/// <reference types="node" />

import { readFile } from "node:fs/promises";
import { format } from "prettier";
import { createHighlighterCore } from "shiki/core";
import { createJavaScriptRegexEngine } from "shiki/engine/javascript";
import { bundledLanguages } from "shiki/langs";
import { bundledThemes } from "shiki/themes";
import type { ShikiTransformer } from "shiki/types";
import { parse } from "vue/compiler-sfc";

let highlighter: ReturnType<typeof createHighlighterCore> | undefined;

const usePlaygroundBackground: ShikiTransformer = {
  pre(node) {
    delete node.properties.style;
  },
};

async function formatExample(source: string) {
  if (source.includes("<PlaygroundExample")) {
    const example = parse(source).descriptor.template?.ast?.children.find(node =>
      "tag" in node && node.tag === "PlaygroundExample");
    if (example && "tag" in example) {
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
      const formatted = await format(`<template>\n${preview}\n</template>`, {
        parser: "vue",
        htmlWhitespaceSensitivity: "ignore",
      });
      return formatted.trimEnd().split("\n").slice(1, -1).map(line => line.replace(/^  /, "")).join("\n");
    }
  }
  return (await format(source, { parser: "vue" })).trimEnd();
}

export function highlightExamples() {
  const query = "?example-code&raw";

  return {
    name: "playground:highlight-examples",
    enforce: "pre" as const,
    async load(this: { addWatchFile(file: string): void }, id: string) {
      if (!id.endsWith(`.vue${query}`)) return;

      const filename = id.slice(0, -query.length);
      this.addWatchFile(filename);

      highlighter ??= createHighlighterCore({
        engine: createJavaScriptRegexEngine(),
        langs: [bundledLanguages.vue],
        themes: [bundledThemes["github-light"]],
      });

      const [renderer, source] = await Promise.all([highlighter, readFile(filename, "utf8")]);
      const html = renderer.codeToHtml(await formatExample(source), {
        lang: "vue",
        theme: "github-light",
        transformers: [usePlaygroundBackground],
      });

      return `export default ${JSON.stringify(html)};`;
    },
  };
}
