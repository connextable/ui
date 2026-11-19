<script setup lang="ts">
import {
  UIDashboard,
  UIDashboardNavGroup,
  UIDashboardNavItem,
  UIDashboardSidebar,
} from "@connextable/ui";
import { computed } from "vue";

type CatalogItem = { path: string; title: string };

const route = useRoute();
const router = useRouter();
const title = computed(() =>
  typeof route.meta.title === "string" ? route.meta.title : undefined,
);
const categories = new Map<string, CatalogItem[]>();

for (const { path, meta, aliasOf } of router.getRoutes()) {
  if (aliasOf || typeof meta.category !== "string" || typeof meta.title !== "string") {
    continue;
  }

  const items = categories.get(meta.category) ?? [];
  items.push({ path, title: meta.title });
  categories.set(meta.category, items);
}

const groups = Array.from(categories, ([category, items]) => ({
  category,
  items: items.sort((a, b) => a.title.localeCompare(b.title, "en")),
})).sort((a, b) => a.category.localeCompare(b.category, "ko"));

useHead(() => ({
  title: title.value ? `${title.value} · Connextable UI` : "Connextable UI",
  htmlAttrs: { lang: "ko" },
}));
</script>

<template>
  <UIDashboard>
    <template #sidebar>
      <UIDashboardSidebar label="컴포넌트">
        <template #header>
          <a class="playground-skip" href="#playground-content">본문으로 건너뛰기</a>
          <NuxtLink class="playground-brand" to="/">Connextable UI</NuxtLink>
        </template>
        <UIDashboardNavGroup
          v-for="group in groups"
          :key="group.category"
          :label="group.category"
        >
          <UIDashboardNavItem v-for="item in group.items" :key="item.path">
            <NuxtLink :to="item.path">{{ item.title }}</NuxtLink>
          </UIDashboardNavItem>
        </UIDashboardNavGroup>
      </UIDashboardSidebar>
    </template>
    <main id="playground-content" class="playground-content" tabindex="-1">
      <h1 v-if="title">{{ title }}</h1>
      <NuxtPage />
    </main>
  </UIDashboard>
</template>

<style>
body {
  margin: 0;
  background: var(--ui-color-surface);
  color: var(--ui-color-text);
  font-family: system-ui, sans-serif;
}

.playground-skip {
  position: absolute;
  z-index: 1;
  inset-block-start: 0.5rem;
  inset-inline-start: 0.5rem;
  padding: 0.625rem 0.75rem;
  background: var(--ui-color-surface);
  color: var(--ui-color-text);
}

.playground-skip:not(:focus) {
  clip-path: inset(50%);
  overflow: hidden;
  white-space: nowrap;
}

.playground-brand {
  color: inherit;
  font-size: 1.125rem;
  font-weight: 750;
  text-decoration: none;
}

.playground-brand:focus-visible,
.playground-skip:focus-visible {
  outline: 2px solid var(--ui-color-focus);
  outline-offset: 3px;
}

.playground-content {
  box-sizing: border-box;
  max-inline-size: 72rem;
  margin-inline: auto;
  padding: clamp(1.25rem, 4vw, 3.5rem);
  scroll-margin-block-start: 5rem;
}

.playground-content h1 {
  margin: 0 0 2rem;
  font-size: clamp(1.75rem, 3vw, 2.5rem);
  line-height: 1.2;
  overflow-wrap: anywhere;
}

.playground-example {
  display: grid;
  gap: 0.75rem;
  margin-block-end: 1.5rem;
}

.playground-example > h2 {
  margin: 0;
  font-size: 1.0625rem;
}

.playground-example__preview {
  min-inline-size: 0;
  padding: clamp(1rem, 3vw, 1.5rem);
  border: 1px solid var(--ui-dashboard-divider);
  border-radius: var(--ui-control-radius);
}
</style>
