type Attribute = string | boolean | Record<string, string> | undefined;

function vueAttribute(value: string) {
  return value.replaceAll("&", "&amp;").replaceAll('"', "&quot;").replaceAll("<", "&lt;");
}

export function buttonExampleCode(
  attributes: Record<string, Attribute>,
  { label, leading, trailing, icon, loadingSpinner, editableLabel = false }: {
    label: string;
    leading?: string;
    trailing?: string;
    icon?: string;
    loadingSpinner?: "arc" | "spoke";
    editableLabel?: boolean;
  },
) {
  const declarations = editableLabel
    ? [`const label = ${JSON.stringify(label).replaceAll("<", "\\u003c")};`]
    : [];
  const props: string[] = [];
  for (const [key, value] of Object.entries(attributes)) {
    if (value === undefined || value === false) continue;
    const name = key.replace(/[A-Z]/g, match => `-${match.toLowerCase()}`);
    if (value === true) props.push(name);
    else if (typeof value === "object") {
      declarations.push(`const ${key} = ${JSON.stringify(value, null, 2)};`);
      props.push(`:${name}="${key}"`);
    } else {
      props.push(`${name}="${vueAttribute(value)}"`);
    }
  }

  const component = icon ? "UIIconButton" : "UIButton";
  const uiImports = loadingSpinner ? `${component}, UISpinner` : component;
  const icons = [...new Set([leading, trailing, icon].filter(Boolean))];
  const script = [
    `import { ${uiImports} } from "@connextable/ui";`,
    ...(icons.length ? [`import { ${icons.join(", ")} } from "@lucide/vue";`] : []),
    ...(declarations.length ? ["", ...declarations] : []),
  ];
  const children = [
    ...(icon ? [`<${icon} />`] : []),
    ...(leading ? ["<template #leading>", `  <${leading} />`, "</template>"] : []),
    ...(label ? [editableLabel ? "{{ label }}" : label] : []),
    ...(trailing ? ["<template #trailing>", `  <${trailing} />`, "</template>"] : []),
    ...(loadingSpinner ? ["<template #loading>", `  <UISpinner variant="${loadingSpinner}" />`, "</template>"] : []),
  ];
  const opening = [`  <${component}`, ...props].join(" ");
  const end = children.length ? ">" : " />";
  const tag = opening.length + end.length <= 80
    ? [opening + end]
    : [`  <${component}`, ...props.map(prop => `    ${prop}`), `  ${end.trimStart()}`];
  const closing = `</${component}>`;
  const template = children.length === 1 && tag.length === 1
    && opening.length + 1 + children[0]!.length + closing.length <= 80
    ? [`${tag[0]}${children[0]}${closing}`]
    : children.length ? [...tag, ...children.map(line => `    ${line}`), `  ${closing}`] : tag;

  return ["<script setup lang=\"ts\">", ...script, "</script>", "", "<template>", ...template, "</template>"].join("\n");
}
