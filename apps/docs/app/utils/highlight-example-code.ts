import { createHighlighterCore } from "shiki/core";
import { createJavaScriptRegexEngine } from "shiki/engine/javascript";
import vue from "shiki/langs/vue.mjs";
import githubLight from "shiki/themes/github-light.mjs";
import type { ShikiTransformer } from "shiki/types";

let highlighter: ReturnType<typeof createHighlighterCore> | undefined;

const usePlaygroundBackground: ShikiTransformer = {
  pre(node) {
    delete node.properties.style;
  },
};

export async function highlightExampleCode(code: string) {
  highlighter ??= createHighlighterCore({
    engine: createJavaScriptRegexEngine(),
    langs: [vue],
    themes: [githubLight],
  });

  return (await highlighter).codeToHtml(code, {
    lang: "vue",
    theme: "github-light",
    transformers: [usePlaygroundBackground],
  });
}
