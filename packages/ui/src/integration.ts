export const packageName = "@connextable/ui";
export const stylesheet = `${packageName}/styles.css`;

const autoImportsPath = "./auto-imports.js";

export async function readAutoImports() {
  const manifest = new URL(autoImportsPath, import.meta.url);
  const { default: names } = await import(/* @vite-ignore */ manifest.href) as { default: string[] };
  return {
    components: names.filter(name => /^UI[A-Z]/.test(name)),
    composables: names.filter(name => /^use[A-Z]/.test(name)),
  };
}
