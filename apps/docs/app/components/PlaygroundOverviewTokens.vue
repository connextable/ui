<script setup lang="ts">
import { computed, useTemplateRef, watch } from "vue";

const props = defineProps<{ tokenValues: Readonly<Record<string, string>> }>();
const heading = useTemplateRef<HTMLElement>("heading");

const roles = [
  { label: "강조 색상", prefixes: ["--ui-color-accent", "--ui-color-on-accent"] },
  {
    label: "텍스트와 상태",
    prefixes: ["--ui-color-text", "--ui-color-placeholder", "--ui-color-disabled", "--ui-color-danger"],
  },
  { label: "표면", prefixes: ["--ui-color-surface"] },
  {
    label: "테두리와 포커스",
    prefixes: ["--ui-color-border", "--ui-color-divider", "--ui-color-focus", "--ui-focus-ring"],
  },
  { label: "타이포그래피", prefixes: ["--ui-font", "--ui-line-height"] },
  { label: "간격", prefixes: ["--ui-space"] },
  { label: "모서리", prefixes: ["--ui-radius", "--ui-panel-radius", "--ui-control-radius"] },
  { label: "컨트롤 크기", prefixes: ["--ui-control"] },
  { label: "레이어와 그림자", prefixes: ["--ui-layer", "--ui-shadow"] },
  { label: "모션", prefixes: ["--ui-motion", "--ui-ease"] },
];

type TokenEntry = [name: string, value: string];

const tokenGroups = computed(() => {
  const groups = roles.map((role) => ({ ...role, tokens: [] as TokenEntry[] }));
  const other = { label: "기타", tokens: [] as TokenEntry[] };

  for (const entry of Object.entries(props.tokenValues)) {
    const [name] = entry;
    const group = groups.find(({ prefixes }) =>
      prefixes.some((prefix) => name === prefix || name.startsWith(`${prefix}-`)),
    );
    (group ?? other).tokens.push(entry);
  }

  return [...groups, other].filter(({ tokens }) => tokens.length > 0);
});

watch(() => props.tokenValues, (_values, previous) => {
  if (!Object.keys(previous).length && window.location.hash === "#design-tokens") {
    heading.value?.scrollIntoView();
  }
}, { flush: "post" });

function isColor(value: string) {
  return import.meta.client && CSS.supports("color", value);
}
</script>

<template>
  <section aria-labelledby="design-tokens">
    <h2 id="design-tokens" ref="heading" data-playground-heading tabindex="-1">전역 CSS 토큰</h2>
    <div v-for="group in tokenGroups" :key="group.label" class="design-token-group">
      <h3>{{ group.label }}</h3>
      <dl class="design-tokens">
        <div v-for="[token, value] in group.tokens" :key="token">
          <dt><code>{{ token }}</code></dt>
          <dd>
            <span
              v-if="isColor(value)"
              class="design-tokens__swatch"
              :style="{ backgroundColor: `var(${token})` }"
              aria-hidden="true"
            ></span>
            <code>{{ value }}</code>
          </dd>
        </div>
      </dl>
    </div>
  </section>
</template>

<style scoped>
.design-token-group + .design-token-group {
  margin-block-start: clamp(calc(var(--ui-space-md) * 5), 6vw, calc(var(--ui-space-md) * 6));
}

.design-token-group h3 {
  margin: 0 0 var(--ui-space-sm);
  font-size: var(--ui-font-size-body);
}

.design-tokens {
  margin: 0;
  border-block-start: 1px solid var(--ui-color-divider);
}

.design-tokens > div {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(min(100%, 17rem), 1fr));
  gap: var(--ui-space-2xs) var(--ui-space-md);
  padding-block: var(--ui-space-xs);
  border-block-end: 1px solid var(--ui-color-divider);
  overflow-wrap: anywhere;
}

.design-tokens dd {
  display: flex;
  align-items: flex-start;
  gap: var(--ui-space-sm);
  margin: 0;
  color: var(--ui-color-text-muted);
}

.design-tokens__swatch {
  box-sizing: border-box;
  flex: none;
  inline-size: 0.875rem;
  block-size: 0.875rem;
  margin-block-start: var(--ui-space-2xs);
  border: 1px solid var(--ui-color-border-strong);
  border-radius: var(--ui-space-2xs);
}

.design-tokens code {
  min-inline-size: 0;
  font: var(--ui-font-size-metadata)/var(--ui-line-height-body) var(--ui-font-mono);
}
</style>
