import assert from "node:assert/strict";
import { execFileSync } from "node:child_process";
import { cpSync, mkdtempSync, readFileSync, rmSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { join, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const [directory, compiler] = process.argv.slice(2);
const versions = new Map([
  ["5.9", "5.9.3"],
  ["6", "6.0.3"],
  ["7", "7.0.2"],
  ["7-vue", "npm:typescript-native-bridge@6.0.3-bridge.19.tsgo.7.0.2"],
]);
assert(directory && versions.has(compiler), "Usage: node scripts/check-npm-types.mjs <artifact-directory> <5.9|6|7|7-vue>");

const { version } = JSON.parse(readFileSync(new URL("../packages/ui/package.json", import.meta.url), "utf8"));
const tarball = resolve(directory, `connextable-ui-${version}.tgz`);
const consumer = mkdtempSync(join(tmpdir(), "connextable-ui-types-"));
const checkVue = compiler !== "7";
const run = (program, args) => execFileSync(program, args, { cwd: consumer, stdio: "inherit" });

try {
  cpSync(fileURLToPath(new URL("./fixtures/npm-types/", import.meta.url)), consumer, { recursive: true });
  if (checkVue) {
    cpSync(
      new URL("../apps/docs/tests/nuxt/data-table-types.vue", import.meta.url),
      join(consumer, "app/data-table-types.vue"),
    );
  }

  writeFileSync(join(consumer, "package.json"), JSON.stringify({
    private: true,
    type: "module",
    devDependencies: {
      "@connextable/ui": `file:${tarball}`,
      "@vitejs/plugin-vue": "6.0.11",
      typescript: versions.get(compiler),
      unimport: "7.0.3",
      "unplugin-vue-components": "32.1.0",
      vite: "8.3.8",
      vue: "3.5.45",
      ...(checkVue ? { nuxt: "4.6.4", "vue-tsc": "3.3.14" } : {}),
    },
    ...(compiler === "7-vue" ? { overrides: { typescript: "$typescript" } } : {}),
  }));

  run("npm", [
    "install", "--ignore-scripts", "--no-audit", "--no-fund", "--no-package-lock",
    "--registry=https://registry.npmjs.org/",
  ]);
  run(process.execPath, ["--input-type=module", "-e", `
    import { resolveConfig } from "vite";
    await resolveConfig({}, "build");
  `]);
  run("npm", ["exec", "--no", "--", "tsc", "--noEmit", "-p", "tsconfig.exports.json"]);

  if (checkVue) {
    run("npm", ["exec", "--no", "--", "vue-tsc", "--noEmit", "-p", "tsconfig.vite.json"]);
    rmSync(join(consumer, "connextable-ui.d.ts"));
    run("npm", ["exec", "--no", "--", "nuxt", "typecheck"]);
  } else {
    run("npm", ["exec", "--no", "--", "tsc", "--noEmit", "-p", "tsconfig.vite.json"]);
  }
  console.log(`Passed npm consumer type checks with ${versions.get(compiler)}`);
} finally {
  rmSync(consumer, { recursive: true, force: true });
}
