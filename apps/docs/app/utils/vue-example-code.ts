type VueExampleAttribute = string | number | boolean | { expression: string } | undefined;

export function vueAttribute(value: string) {
  return value.replaceAll("&", "&amp;").replaceAll('"', "&quot;").replaceAll("<", "&lt;");
}

export function vueExampleCode(
  component: string,
  {
    script,
    attributes,
    children = [],
  }: {
    script: readonly string[];
    attributes: Record<string, VueExampleAttribute>;
    children?: readonly string[];
  },
) {
  const props = Object.entries(attributes).flatMap(([key, value]) => {
    if (value === undefined) return [];
    const name = key.replace(/[A-Z]/g, match => `-${match.toLowerCase()}`);
    if (value === true) return [name];
    if (typeof value === "string") return [`${name}="${vueAttribute(value)}"`];
    const expression = typeof value === "object" ? value.expression : String(value);
    return [`:${name}="${vueAttribute(expression)}"`];
  });
  const opening = [`  <${component}`, ...props].join(" ");
  const end = children.length ? ">" : " />";
  const tag = opening.length + end.length <= 80
    ? [opening + end]
    : [`  <${component}`, ...props.map(prop => `    ${prop}`), `  ${end.trimStart()}`];
  const closing = `</${component}>`;
  const inline = children.length === 1 && tag.length === 1
    && opening.length + 1 + children[0]!.length + closing.length <= 80;
  const template = inline
    ? [`${tag[0]}${children[0]}${closing}`]
    : children.length ? [...tag, ...children.map(line => `    ${line}`), `  ${closing}`] : tag;

  return ['<script setup lang="ts">', ...script, "</script>", "", "<template>", ...template, "</template>"].join("\n");
}
