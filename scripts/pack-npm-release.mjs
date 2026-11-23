import assert from "node:assert/strict";
import { execFileSync } from "node:child_process";
import { createHash } from "node:crypto";
import { mkdirSync, mkdtempSync, readFileSync, rmSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { basename, join, resolve } from "node:path";

const [destination] = process.argv.slice(2);
assert(destination, "Usage: node scripts/pack-npm-release.mjs <artifact-directory>");

const directory = resolve(destination);
const packageRoot = new URL("../packages/ui/", import.meta.url);
const workspace = new URL("../", import.meta.url);
const { name, version } = JSON.parse(readFileSync(new URL("package.json", packageRoot), "utf8"));
const { GITHUB_REPOSITORY, GITHUB_SHA } = process.env;
if (GITHUB_REPOSITORY || GITHUB_SHA) {
  assert(GITHUB_REPOSITORY && GITHUB_SHA, "Both GitHub source fields must be present.");
  const git = args => execFileSync("git", args, { cwd: workspace, encoding: "utf8" }).trim();
  assert.equal(git(["rev-parse", "HEAD"]), GITHUB_SHA, "The package must be sealed against the workflow checkout.");
  assert.equal(git(["status", "--porcelain"]), "", "The workflow checkout must be clean before packing.");
}
mkdirSync(directory, { recursive: true });
const tarball = join(directory, `connextable-ui-${version}.tgz`);
execFileSync("pnpm", ["pack", "--silent", "--out", tarball], { cwd: packageRoot, stdio: "inherit" });

const files = new Set(execFileSync("tar", ["-tf", tarball], { encoding: "utf8" }).trim().split("\n"));
const packed = JSON.parse(execFileSync("tar", ["-xOf", tarball, "package/package.json"], { encoding: "utf8" }));
assert.equal(packed.name, name);
assert.equal(packed.version, version);
assert.equal(packed.publishConfig.access, "public");
assert.equal(packed.publishConfig.registry, "https://registry.npmjs.org/");

for (const target of [
  packed.exports["."].import, packed.exports["."].types,
  packed.exports["./nuxt"].import, packed.exports["./nuxt"].types,
  packed.exports["./vite"].import, packed.exports["./vite"].types,
  packed.exports["./styles.css"], "./dist/auto-imports.js", "./README.md",
]) {
  assert(files.has(`package/${target.slice(2)}`), `Missing packed file: ${target}`);
}
for (const [dependency, range] of Object.entries({ ...packed.dependencies, ...packed.peerDependencies })) {
  assert(!/^(?:catalog|workspace|link|file):/.test(range), `Unresolved dependency: ${dependency}@${range}`);
}

const consumer = mkdtempSync(join(tmpdir(), "connextable-ui-consumer-"));
try {
  execFileSync("npm", [
    "install", "--ignore-scripts", "--no-audit", "--no-fund", "--no-package-lock",
    "--registry=https://registry.npmjs.org/", tarball,
  ], { cwd: consumer, stdio: "inherit" });
  execFileSync(process.execPath, ["--input-type=module", "-e", `
    import assert from "node:assert/strict";
    import { readFile } from "node:fs/promises";
    import * as ui from "@connextable/ui";
    import vitePlugin from "@connextable/ui/vite";
    assert(ui.UIButton);
    assert.equal(typeof ui.useScrollSpy, "function");
    assert.equal(typeof vitePlugin, "function");
    assert((await vitePlugin({ components: false, composables: false, dts: false }))
      .some(plugin => plugin?.name === "connextable-ui"));
    for (const specifier of ["nuxt/kit", "@nuxt/kit", "@nuxt/schema", "vite", "unimport/unplugin", "unplugin-vue-components/vite"]) {
      assert.throws(() => import.meta.resolve(specifier), { code: "ERR_MODULE_NOT_FOUND" });
    }
    const manifest = new URL("./auto-imports.js", import.meta.resolve("@connextable/ui/vite"));
    const { default: names } = await import(manifest.href);
    assert.deepEqual(names.toSorted(), Object.keys(ui).filter(name => /^(?:UI|use)[A-Z]/.test(name)));
    assert((await readFile(new URL(import.meta.resolve("@connextable/ui/styles.css")))).length > 0);
  `], { cwd: consumer, stdio: "inherit" });
} finally {
  rmSync(consumer, { recursive: true, force: true });
}

const integrity = `sha512-${createHash("sha512").update(readFileSync(tarball)).digest("base64")}`;
if (GITHUB_REPOSITORY) {
  writeFileSync(join(directory, "artifacts.json"), JSON.stringify({
    schema: 1,
    source: { repository: GITHUB_REPOSITORY, commit: GITHUB_SHA },
    packages: [{ name, version, tarball: basename(tarball), integrity }],
  }, null, 2) + "\n");
}
console.log(`${name}@${version} ${integrity}\n${tarball}`);
