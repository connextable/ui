import { vueAttribute, vueExampleCode } from "./vue-example-code";

type Attribute = string | boolean | Record<string, string> | undefined;

export function buttonExampleCode(
  attributes: Record<string, Attribute>,
  { label, leading, trailing, icon, loadingSpinner, editableLabel = false }: {
    label: string;
    leading?: string;
    trailing?: string;
    icon?: string;
    loadingSpinner?: "arc" | "wave";
    editableLabel?: boolean;
  },
) {
  const declarations = editableLabel
    ? [`const label = ${JSON.stringify(label).replaceAll("<", "\\u003c")};`]
    : [];
  const props = Object.fromEntries(Object.entries(attributes).map(([key, value]) => {
    if (typeof value === "object") {
      declarations.push(`const ${key} = ${JSON.stringify(value, null, 2)};`);
      return [key, { expression: key }] as const;
    }
    return [key, value === false ? undefined : value] as const;
  }));

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
    ...(label ? [editableLabel ? "{{ label }}" : vueAttribute(label)] : []),
    ...(trailing ? ["<template #trailing>", `  <${trailing} />`, "</template>"] : []),
    ...(loadingSpinner ? ["<template #loading>", `  <UISpinner variant="${loadingSpinner}" />`, "</template>"] : []),
  ];
  return vueExampleCode(component, { script, attributes: props, children });
}
