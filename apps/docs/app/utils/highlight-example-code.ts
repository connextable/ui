import { createHighlighterCore } from "shiki/core";
import { createJavaScriptRegexEngine } from "shiki/engine/javascript";
import githubLight from "shiki/themes/github-light.mjs";
import type { ShikiTransformer } from "shiki/types";

const grammars = {
  json: () => import("shiki/langs/json.mjs"),
  shellscript: () => import("shiki/langs/shellscript.mjs"),
  typescript: () => import("shiki/langs/typescript.mjs"),
  vue: () => import("shiki/langs/vue.mjs"),
};

export type CodeLanguage = keyof typeof grammars;

let highlighter: ReturnType<typeof createHighlighterCore> | undefined;
const languageLoads = new Map<CodeLanguage, Promise<void>>();

const usePlaygroundBackground: ShikiTransformer = {
  pre(node) {
    delete node.properties.style;
  },
};

export async function highlightExampleCode(code: string, language: CodeLanguage = "vue") {
  const engine = await (highlighter ??= createHighlighterCore({
    engine: createJavaScriptRegexEngine(),
    langs: [],
    themes: [githubLight],
  }));
  let load = languageLoads.get(language);
  if (!load) {
    load = grammars[language]().then(module => engine.loadLanguage(module.default)).catch(error => {
      languageLoads.delete(language);
      throw error;
    });
    languageLoads.set(language, load);
  }
  await load;

  return engine.codeToHtml(code, {
    lang: language,
    theme: "github-light",
    transformers: [usePlaygroundBackground],
  });
}
