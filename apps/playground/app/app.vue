<script setup lang="ts">
import {
  UIButton,
  UIDashboard,
  UIDashboardNavbar,
  UIDashboardNavGroup,
  UIDashboardNavItem,
  UIDashboardPanel,
  UIDashboardSidebar,
  UIInput,
} from "@connextable/ui";
import { Search, X } from "@lucide/vue";
import { computed, onMounted, ref, useTemplateRef, watch } from "vue";
import { catalog, catalogBySlug } from "~/data/catalog";
import { catalogNavigation } from "~/data/catalog-navigation";

type CatalogItem = {
  path: string;
  title: string;
  parts: readonly string[];
};

const route = useRoute();
const router = useRouter();
const documentContent = useTemplateRef<HTMLElement>("documentContent");
const sidebar = useTemplateRef<InstanceType<typeof UIDashboardSidebar>>("sidebar");
const searchInput = useTemplateRef("searchInput");
const searchQuery = ref("");
const expandedItems = ref<Record<string, boolean>>({});
const expandedSearchItems = ref<Record<string, boolean>>({});
const mounted = ref(false);
const selectedPart = computed(() => mounted.value ? route.hash.slice(1) : "");
const catalogPage = computed(() =>
  route.name === "components-name" ? catalogBySlug.get(String(route.params.name)) : undefined,
);
const title = computed(() =>
  catalogPage.value?.title ?? route.meta.title,
);
const description = computed(() =>
  catalogPage.value?.description ?? route.meta.description,
);
const category = computed(() => catalogPage.value?.category ?? route.meta.category);
const categories = new Map<string, CatalogItem[]>();

for (const { path, meta, aliasOf } of router.getRoutes()) {
  if (aliasOf || typeof meta.category !== "string" || typeof meta.title !== "string") {
    continue;
  }

  const items = categories.get(meta.category) ?? [];
  items.push({ path, title: meta.title, parts: meta.componentParts ?? [] });
  categories.set(meta.category, items);
}

for (const { slug, title, category, parts } of catalog) {
  const items = categories.get(category) ?? [];
  items.push({ path: `/components/${slug}`, title, parts: parts ?? [] });
  categories.set(category, items);
}

const categoryPriority = new Map([...catalogNavigation.keys()].map((name, index) => [name, index]));
const groups = Array.from(categories, ([category, items]) => {
  const itemPriority = new Map(catalogNavigation.get(category)?.map((name, index) => [name, index]));
  return {
    category,
    items: items.sort((a, b) =>
      (itemPriority.get(a.title) ?? itemPriority.size) - (itemPriority.get(b.title) ?? itemPriority.size)
      || a.title.localeCompare(b.title, "en"),
    ),
  };
}).sort((a, b) =>
  (categoryPriority.get(a.category) ?? categoryPriority.size) - (categoryPriority.get(b.category) ?? categoryPriority.size)
  || a.category.localeCompare(b.category, "ko"),
);

function normalizeSearch(value: string) {
  return value.normalize("NFKC").toLowerCase().replace(/[\s_-]+/gu, "");
}

const query = computed(() => normalizeSearch(searchQuery.value));
const showOverview = computed(() => normalizeSearch("디자인 시스템").includes(query.value));
const visibleGroups = computed(() => {
  if (!query.value) return groups;

  return groups.flatMap((group) => {
    const items = group.items.flatMap((item) => {
      if (normalizeSearch(item.title).includes(query.value)) return [item];

      const parts = item.parts.filter((part) =>
        normalizeSearch(part).includes(query.value),
      );
      return parts.length ? [{ ...item, parts }] : [];
    });
    return items.length ? [{ ...group, items }] : [];
  });
});

watch(query, () => {
  expandedSearchItems.value = {};
  sidebar.value?.scrollNavigationToTop();
});

watch([() => route.path, selectedPart], ([path, part]) => {
  if (groups.some(group => group.items.some(item => item.path === path && item.parts.includes(part)))) {
    expandedItems.value[path] = true;
    expandedSearchItems.value[path] = true;
  }
});

function isExpanded(path: string) {
  return query.value ? expandedSearchItems.value[path] ?? true : expandedItems.value[path] ?? path === route.path;
}

function setExpanded(path: string, expanded: boolean) {
  const items = query.value ? expandedSearchItems : expandedItems;
  items.value[path] = expanded;
}

function clearSearch() {
  searchQuery.value = "";
  searchInput.value?.focus({ preventScroll: true });
}

function onSearchEscape(event: KeyboardEvent) {
  if (event.isComposing || !searchQuery.value) return;
  event.stopPropagation();
  clearSearch();
}

useHead(() => ({
  title: title.value ? `${title.value} · Connextable UI` : "Connextable UI",
  htmlAttrs: { lang: "ko" },
}));

onMounted(() => { mounted.value = true; });
</script>

<template>
  <UIDashboard class="playground-dashboard">
    <template #sidebar>
      <UIDashboardSidebar ref="sidebar" label="컴포넌트">
        <template #header>
          <a class="playground-skip" href="#playground-content">본문으로 건너뛰기</a>
          <NuxtLink class="playground-brand" to="/">
            <span class="playground-brand__mark" aria-hidden="true"></span>
            Connextable UI
          </NuxtLink>
        </template>
        <template #navigation-header>
          <div role="search" aria-label="컴포넌트" @keydown.esc="onSearchEscape">
            <UIInput
              ref="searchInput"
              v-model="searchQuery"
              size="sm"
              variant="soft"
              role="searchbox"
              aria-label="컴포넌트 검색"
              placeholder="컴포넌트 검색"
              autocomplete="off"
            >
              <template #leading><Search aria-hidden="true" /></template>
              <template v-if="searchQuery" #trailing>
                <UIButton size="sm" variant="ghost" icon-only aria-label="검색어 지우기" @click="clearSearch">
                  <template #leading><X /></template>
                </UIButton>
              </template>
            </UIInput>
          </div>
        </template>
        <p v-if="!showOverview && !visibleGroups.length" class="playground-sidebar-search__empty" role="status">
          일치하는 컴포넌트가 없습니다.
        </p>
        <UIDashboardNavGroup v-if="showOverview" label="시작하기">
          <UIDashboardNavItem>
            <NuxtLink to="/">디자인 시스템</NuxtLink>
          </UIDashboardNavItem>
        </UIDashboardNavGroup>
        <UIDashboardNavGroup
          v-for="group in visibleGroups"
          :key="group.category"
          :label="group.category"
        >
          <UIDashboardNavItem
            v-for="item in group.items"
            :key="item.path"
            :class="{ 'playground-sidebar-item--leaf': !item.parts.length }"
            :disclosure-label="item.parts.length ? `${item.title} 구성 항목` : undefined"
            :expanded="isExpanded(item.path)"
            @update:expanded="setExpanded(item.path, $event)"
          >
            <NuxtLink
              class="playground-sidebar-link"
              :to="item.path"
              :title="item.title"
              :aria-current-value="route.path === item.path && isExpanded(item.path) && item.parts.includes(selectedPart) ? 'false' : 'page'"
            >
              <span>{{ item.title }}</span>
            </NuxtLink>
            <template v-if="item.parts.length" #children>
              <UIDashboardNavItem v-for="part in item.parts" :key="part">
                <NuxtLink
                  class="playground-sidebar-link"
                  :to="{ path: item.path, hash: `#${part}` }"
                  :aria-label="part"
                  :title="part"
                  :aria-current-value="route.path === item.path && selectedPart === part ? 'location' : 'false'"
                >
                  <span v-if="part.startsWith(item.title)" class="playground-sidebar-part">
                    <span>{{ item.title }}</span><span>{{ part.slice(item.title.length) }}</span>
                  </span>
                  <span v-else>{{ part }}</span>
                </NuxtLink>
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
            <template v-if="category">
              <span aria-hidden="true">/</span>
              {{ category }}
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
          <PlaygroundComponentExamples :key="route.path" :enabled="route.path.startsWith('/components/') && Boolean(title)">
            <NuxtPage />
          </PlaygroundComponentExamples>
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
  outline: var(--ui-focus-ring-width) solid var(--ui-color-focus);
  outline-offset: var(--ui-focus-ring-offset);
}

.playground-package {
  color: var(--ui-color-text-muted);
  font-size: 0.75rem;
}

.playground-sidebar-search__empty {
  margin: 0;
  padding-inline: var(--ui-space-xs);
  color: var(--ui-color-text-muted);
  font-size: var(--ui-font-size-body-sm);
}

.playground-sidebar-item--leaf > a {
  padding-inline-start: calc(var(--ui-control-height-small) + 2 * var(--ui-space-xs));
}

.playground-dashboard {
  --ui-dashboard-sidebar-width: clamp(15rem, 23vw, 17rem);
}

.playground-sidebar-link,
.playground-sidebar-link > span {
  min-inline-size: 0;
}

.playground-sidebar-link > span {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.playground-sidebar-part {
  display: flex;
}

.playground-sidebar-part > span {
  min-inline-size: 0;
  overflow: hidden;
  text-overflow: ellipsis;
}

.playground-sidebar-part > span + span {
  flex: 0 0 auto;
  max-inline-size: 100%;
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
  box-sizing: border-box;
  max-block-size: calc(100dvh - 1.5rem - var(--ui-dashboard-panel-padding));
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
  }
}

@media (width <= 42rem) {
  [data-playground-heading] {
    scroll-margin-block-start: 5.25rem;
  }
}
</style>
