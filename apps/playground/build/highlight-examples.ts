/// <reference types="node" />

import { readFile } from "node:fs/promises";
import { format } from "prettier";
import { createHighlighterCore } from "shiki/core";
import { createJavaScriptRegexEngine } from "shiki/engine/javascript";
import { bundledLanguages } from "shiki/langs";
import { bundledThemes } from "shiki/themes";
import type { ShikiTransformer } from "shiki/types";

let highlighter: ReturnType<typeof createHighlighterCore> | undefined;

const usePlaygroundBackground: ShikiTransformer = {
  pre(node) {
    delete node.properties.style;
  },
};

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
      const formatted = await format(source, { parser: "vue" });
      const html = renderer.codeToHtml(formatted.trimEnd(), {
        lang: "vue",
        theme: "github-light",
        transformers: [usePlaygroundBackground],
      });

      return `export default ${JSON.stringify(html)};`;
    },
  };
}
