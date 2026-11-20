<script setup lang="ts">
import {
  UIDashboard,
  UIDashboardNavbar,
  UIDashboardNavGroup,
  UIDashboardNavItem,
  UIDashboardPanel,
  UIDashboardSidebar,
} from "@connextable/ui";
import { computed, onMounted, ref, useTemplateRef } from "vue";

type CatalogItem = { path: string; title: string; parts: readonly string[] };

const route = useRoute();
const router = useRouter();
const documentContent = useTemplateRef<HTMLElement>("documentContent");
const mounted = ref(false);
const selectedPart = computed(() => mounted.value ? route.hash.slice(1) : "");
const title = computed(() =>
  typeof route.meta.title === "string" ? route.meta.title : undefined,
);
const description = computed(() =>
  typeof route.meta.description === "string" ? route.meta.description : undefined,
);
const categories = new Map<string, CatalogItem[]>();

for (const { path, meta, aliasOf } of router.getRoutes()) {
  if (aliasOf || typeof meta.category !== "string" || typeof meta.title !== "string") {
    continue;
  }

  const items = categories.get(meta.category) ?? [];
  items.push({ path, title: meta.title, parts: meta.componentParts ?? [] });
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

onMounted(() => { mounted.value = true; });
</script>

<template>
  <UIDashboard>
    <template #sidebar>
      <UIDashboardSidebar label="컴포넌트">
        <template #header>
          <a class="playground-skip" href="#playground-content">본문으로 건너뛰기</a>
          <NuxtLink class="playground-brand" to="/">
            <span class="playground-brand__mark" aria-hidden="true"></span>
            Connextable UI
          </NuxtLink>
        </template>
        <UIDashboardNavGroup label="시작하기">
          <UIDashboardNavItem>
            <NuxtLink to="/">디자인 시스템</NuxtLink>
          </UIDashboardNavItem>
        </UIDashboardNavGroup>
        <UIDashboardNavGroup
          v-for="group in groups"
          :key="group.category"
          :label="group.category"
        >
          <UIDashboardNavItem v-for="item in group.items" :key="item.path">
            <NuxtLink
              :to="item.path"
              :aria-current-value="route.path === item.path && item.parts.includes(selectedPart) ? 'false' : 'page'"
            >
              {{ item.title }}
            </NuxtLink>
            <template v-if="item.parts.length" #children>
              <UIDashboardNavItem v-for="part in item.parts" :key="part">
                <NuxtLink
                  :to="{ path: item.path, hash: `#${part}` }"
                  :aria-current-value="selectedPart === part ? 'location' : 'false'"
                >{{ part }}</NuxtLink>
              </UIDashboardNavItem>
            </template>
          </UIDashboardNavItem>
        </UIDashboardNavGroup>
        <template #footer>
          <code class="playground-package">@connextable/ui</code>
        </template>
      </UIDashboardSidebar>
    </template>
    <UIDashboardPanel as="main" id="playground-content" class="playground-main" tabindex="-1">
      <template #header>
        <UIDashboardNavbar>
          <p class="playground-location">
            Playground
            <template v-if="route.meta.category">
              <span aria-hidden="true">/</span>
              {{ route.meta.category }}
            </template>
          </p>
        </UIDashboardNavbar>
      </template>
      <div class="playground-document">
        <header v-if="title" class="playground-document__header">
          <h1>{{ title }}</h1>
          <p v-if="description" class="playground-intro">{{ description }}</p>
        </header>
        <PlaygroundOutline :content="documentContent" class="playground-document__outline" />
        <article ref="documentContent" class="playground-document__content">
          <NuxtPage />
        </article>
      </div>
    </UIDashboardPanel>
  </UIDashboard>
</template>

<style>
body {
  margin: 0;
  background: var(--ui-color-surface);
  color: var(--ui-color-text);
  font-family: var(--ui-font-sans);
  line-height: var(--ui-line-height-body);
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
  display: inline-flex;
  align-items: center;
  gap: 0.625rem;
  color: inherit;
  font-size: 1rem;
  font-weight: 750;
  text-decoration: none;
}

.playground-brand__mark {
  display: grid;
  flex: none;
  place-items: center;
  inline-size: 2rem;
  block-size: 2rem;
  border-radius: 0.625rem;
  background: var(--ui-color-accent);
  color: var(--ui-color-on-accent);
}

.playground-brand__mark::before {
  inline-size: 0.75rem;
  block-size: 0.625rem;
  border-block: 2px solid currentColor;
  transform: skew(-26deg);
  content: "";
}

.playground-brand:focus-visible,
.playground-skip:focus-visible {
  outline: 2px solid var(--ui-color-focus);
  outline-offset: 3px;
}

.playground-package {
  color: var(--ui-color-text-muted);
  font-size: 0.75rem;
}

.playground-main {
  --ui-dashboard-bar-padding-inline: clamp(1.25rem, 4vw, 3rem);
  --ui-dashboard-panel-padding: clamp(1.25rem, 4vw, 3rem);
  scroll-margin-block-start: 5rem;
}

.playground-location {
  display: flex;
  flex-wrap: wrap;
  gap: 0.625rem;
  margin: 0;
  color: var(--ui-color-text-muted);
  font-size: 0.8125rem;
  font-weight: 650;
}

.playground-location span {
  color: var(--ui-color-border-strong);
}

.playground-document {
  display: grid;
  grid-template:
    "header outline" auto
    "content outline" 1fr
    / minmax(0, 1fr) 11rem;
  align-items: start;
  gap: 2rem clamp(1.5rem, 4vw, 3rem);
  max-inline-size: 76rem;
  margin-inline: auto;
}

.playground-document__header {
  grid-area: header;
  padding-block-end: 1.75rem;
  border-block-end: 1px solid var(--ui-color-divider);
}

.playground-document__content {
  grid-area: content;
  min-inline-size: 0;
}

.playground-document__outline {
  position: sticky;
  grid-area: outline;
  inset-block-start: 1.5rem;
  max-block-size: calc(100dvh - 3rem);
  overflow-y: auto;
  padding-block: 0.375rem;
}

.playground-document h1 {
  margin: 0;
  font-size: clamp(2rem, 5vw, 3.25rem);
  letter-spacing: -0.045em;
  line-height: 1.1;
  overflow-wrap: anywhere;
}

.playground-intro {
  max-inline-size: 52ch;
  margin: 0.75rem 0 0;
  color: var(--ui-color-text-muted);
  word-break: keep-all;
  overflow-wrap: anywhere;
}

[data-playground-heading] {
  scroll-margin-block-start: 2rem;
}

@media (width < 68rem) {
  .playground-document {
    grid-template:
      "header"
      "outline"
      "content"
      / minmax(0, 1fr);
    gap: 1.25rem;
  }

  .playground-document__outline {
    position: static;
    max-block-size: none;
    overflow: visible;
  }
}

@media (width <= 42rem) {
  [data-playground-heading] {
    scroll-margin-block-start: 5.25rem;
  }
}
</style>
