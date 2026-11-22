/// <reference types="node" />

import { readFile } from "node:fs/promises";
import { format } from "prettier";
import { createHighlighterCore } from "shiki/core";
import { createJavaScriptRegexEngine } from "shiki/engine/javascript";
import { bundledLanguages } from "shiki/langs";
import { bundledThemes } from "shiki/themes";
import type { ShikiTransformer } from "shiki/types";
import { babelParse, parse } from "vue/compiler-sfc";

const exampleCodeQuery = "?example-code&raw";
let highlighter: ReturnType<typeof createHighlighterCore> | undefined;

const usePlaygroundBackground: ShikiTransformer = {
  pre(node) {
    delete node.properties.style;
  },
};

async function formatExample(source: string) {
  if (!source.includes("<PlaygroundExample")) {
    return (await format(source, { parser: "vue" })).trimEnd();
  }

  const { descriptor } = parse(source);
  const template = descriptor.template;
  const example = template?.ast?.children.find(node =>
    "tag" in node && node.tag === "PlaygroundExample");
  if (!template || !example || !("tag" in example)) {
    return (await format(source, { parser: "vue" })).trimEnd();
  }

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
  const edits = [{
    start: template.loc.start.offset,
    end: template.loc.end.offset,
    text: `\n${preview}\n`,
  }];

  // Strip the import that feeds the playground code panel while retaining the example setup.
  for (const script of [descriptor.script, descriptor.scriptSetup]) {
    if (!script) continue;
    const { program } = babelParse(script.content, {
      sourceType: "module",
      plugins: script.lang === "ts" ? ["typescript"] : [],
    });
    for (const statement of program.body) {
      if (statement.type !== "ImportDeclaration" || !statement.source.value.endsWith(exampleCodeQuery)) continue;
      edits.push({
        start: script.loc.start.offset + (statement.start ?? 0),
        end: script.loc.start.offset + (statement.end ?? 0),
        text: "",
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
