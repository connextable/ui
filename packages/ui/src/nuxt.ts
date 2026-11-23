import { addComponent, addImports, addPluginTemplate, defineNuxtModule } from "@nuxt/kit";
import type { NuxtModule } from "@nuxt/schema";
import { linkComponentKey } from "./components/link-component";

const packageName = "@connextable/ui";
const stylesheet = `${packageName}/styles.css`;

export interface ConnextableUIOptions {
  prefix?: string;
  components?: boolean;
  composables?: boolean;
  css?: boolean;
  nuxtLink?: boolean;
}

const connextableUI: NuxtModule<ConnextableUIOptions> = defineNuxtModule<ConnextableUIOptions>({
  meta: {
    name: packageName,
    configKey: "connextableUI",
    compatibility: { nuxt: "^4.5.0" },
  },
  defaults: {
    prefix: "UI",
    components: true,
    composables: true,
    css: true,
    nuxtLink: true,
  },
  async setup(options, nuxt) {
    if (options.css && !nuxt.options.css.includes(stylesheet)) {
      nuxt.options.css.unshift(stylesheet);
    }

    if (options.nuxtLink) {
      addPluginTemplate({
        filename: "connextable-ui-link.mjs",
        getContents: () => `import { defineNuxtPlugin } from '#app';
import { NuxtLink } from '#components';
export default defineNuxtPlugin(nuxtApp => {
  nuxtApp.vueApp.provide(${JSON.stringify(linkComponentKey)}, NuxtLink);
});`,
      });
    }

    if (options.components || options.composables) {
      const names = Object.keys(await import("./index"));
      if (options.components) {
        for (const name of names.filter(name => /^UI[A-Z]/.test(name))) {
          addComponent({ name: `${options.prefix}${name.slice(2)}`, filePath: packageName, export: name });
        }
      }
      if (options.composables) {
        addImports(names.filter(name => /^use[A-Z]/.test(name)).map(name => ({ name, from: packageName })));
      }
    }
  },
});

export default connextableUI;
