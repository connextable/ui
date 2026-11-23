import { readFile } from "node:fs/promises";
import { createRequire } from "node:module";
import { transform, type MediaQuery } from "lightningcss";

const require = createRequire(import.meta.url);
const moduleId = "virtual:playground-interaction-styles";

function isPointerCapability(condition: NonNullable<MediaQuery["condition"]>): boolean {
  if (condition.type === "operation") {
    return condition.operator === "and" && condition.conditions.every(isPointerCapability);
  }
  if (condition.type !== "feature" || condition.value.type !== "plain") return false;
  const { name, value } = condition.value;
  return value.type === "ident"
    && ((name === "hover" && value.value === "hover") || (name === "pointer" && value.value === "fine"));
}

export function interactionStyles() {
  return {
    name: "playground:interaction-styles",
    resolveId(id: string) {
      if (id === moduleId) return `\0${moduleId}`;
    },
    async load(this: { addWatchFile(file: string): void }, id: string) {
      if (id !== `\0${moduleId}`) return;
      const filename = require.resolve("@connextable/ui/styles.css");
      this.addWatchFile(filename);
      const { code } = transform({
        filename,
        code: await readFile(filename),
        minify: true,
        pseudoClasses: {
          hover: "pg-hover",
          active: "pg-active",
          focus: "pg-focus",
          focusVisible: "pg-focus-visible",
          focusWithin: "pg-focus-within",
        },
        visitor: {
          MediaQuery(query) {
            // These specimens emulate a mouse even on a touch-only screen.
            if (!query.qualifier && query.mediaType === "all" && query.condition && isPointerCapability(query.condition)) {
              return { raw: "all" };
            }
          },
        },
      });
      return `export default ${JSON.stringify(code.toString())};`;
    },
  };
}
