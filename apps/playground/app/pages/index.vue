<script setup lang="ts">
import { onMounted, onUnmounted, shallowRef } from "vue";

definePageMeta({
  title: "디자인 시스템",
  description: "공통 토큰이 실제 화면과 컴포넌트에 어떻게 적용되는지 살펴봅니다.",
});

const colors = [
  { label: "강조", token: "--ui-color-accent" },
  { label: "본문", token: "--ui-color-text" },
  { label: "보조 텍스트", token: "--ui-color-text-muted" },
  { label: "보조 표면", token: "--ui-color-surface-muted" },
  { label: "테두리", token: "--ui-color-border" },
  { label: "오류", token: "--ui-color-danger" },
];

const typeScale = [
  { label: "본문", token: "--ui-font-size-body" },
  { label: "작은 본문", token: "--ui-font-size-body-sm" },
  { label: "메타데이터", token: "--ui-font-size-metadata" },
];

const tokenValues = shallowRef<Record<string, string>>({});
let reducedMotion: MediaQueryList | undefined;

function readTokens() {
  const style = getComputedStyle(document.documentElement);
  tokenValues.value = Object.fromEntries(
    Array.from(style)
      .filter((token) => token.startsWith("--ui-"))
      .sort()
      .map((token) => [token, style.getPropertyValue(token).trim()]),
  );
}

onMounted(() => {
  readTokens();
  reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
  reducedMotion.addEventListener("change", readTokens);
});

onUnmounted(() => reducedMotion?.removeEventListener("change", readTokens));
</script>

<template>
  <div class="design-overview">
    <section aria-labelledby="design-colors">
      <h2 id="design-colors" data-playground-heading tabindex="-1">색상</h2>
      <ul class="design-palette" role="list">
        <li v-for="color in colors" :key="color.token" :title="color.token">
          <span
            class="design-palette__swatch"
            :style="{ backgroundColor: `var(${color.token})` }"
            aria-hidden="true"
          ></span>
          <span class="design-palette__label">{{ color.label }}</span>
          <code class="design-palette__value">{{ tokenValues[color.token] }}</code>
        </li>
      </ul>
    </section>

    <div class="design-overview__comparison">
      <section aria-labelledby="design-typography">
        <h2 id="design-typography" data-playground-heading tabindex="-1">타이포그래피</h2>
        <dl class="design-type-scale">
          <div v-for="type in typeScale" :key="type.token" class="design-type-scale__row">
            <dt :title="type.token">{{ type.label }} <code>{{ tokenValues[type.token] }}</code></dt>
            <dd :style="{ fontSize: `var(${type.token})` }">프로젝트 설정</dd>
          </div>
        </dl>
      </section>
      <PlaygroundOverviewMotion :token-values="tokenValues" />
    </div>

    <PlaygroundOverviewGeometry :token-values="tokenValues" />
    <PlaygroundOverviewControls />
    <PlaygroundOverviewStates />
    <PlaygroundOverviewTokens :token-values="tokenValues" />
  </div>
</template>

<style scoped>
.design-overview {
  display: grid;
  gap: clamp(calc(var(--ui-space-md) * 6), 10vw, calc(var(--ui-space-md) * 8));
  padding-block-end: 2rem;
}

.design-overview__comparison {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(min(100%, 17rem), 1fr));
  row-gap: inherit;
  column-gap: 2rem;
}

.design-overview :deep(h2[data-playground-heading]) {
  margin: 0 0 1rem;
  font-size: 1.375rem;
  font-weight: 700;
  letter-spacing: -0.025em;
  line-height: 1.25;
}

.design-palette {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(min(100%, 6rem), 1fr));
  gap: 1rem var(--ui-space-sm);
  margin: 0;
  padding: 0;
  list-style: none;
}

.design-palette__swatch {
  display: block;
  block-size: clamp(3rem, 7vw, 5rem);
  border-radius: var(--ui-radius-md);
  box-shadow: inset 0 0 0 1px color-mix(in srgb, var(--ui-color-text) 8%, transparent);
}

.design-palette__label,
.design-palette__value {
  display: block;
  overflow-wrap: anywhere;
}

.design-palette__label {
  margin-block-start: var(--ui-space-sm);
  font-size: var(--ui-font-size-body-sm);
  font-weight: 650;
}

.design-palette__value,
.design-type-scale code {
  color: var(--ui-color-text-muted);
  font: var(--ui-font-size-metadata)/var(--ui-line-height-body) var(--ui-font-mono);
}

.design-palette__value {
  min-block-size: 1lh;
  text-transform: uppercase;
}

.design-type-scale {
  margin: 0;
}

.design-type-scale__row {
  display: grid;
  grid-template-columns: minmax(0, 1fr) minmax(0, 1fr);
  align-items: center;
  gap: var(--ui-space-md);
  min-block-size: var(--ui-control-height);
  border-block-start: 1px solid var(--ui-color-divider);
}

.design-type-scale__row:last-child {
  border-block-end: 1px solid var(--ui-color-divider);
}

.design-type-scale dt {
  display: flex;
  flex-wrap: wrap;
  gap: 0 var(--ui-space-sm);
  font-size: var(--ui-font-size-metadata);
}

.design-type-scale dd {
  margin: 0;
  font-weight: 550;
  overflow-wrap: anywhere;
}
</style>
