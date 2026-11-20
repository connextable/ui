<script setup lang="ts">
import { UIButton } from "@connextable/ui";
import { ref } from "vue";

defineProps<{ tokenValues: Readonly<Record<string, string>> }>();

const examples = [
  { label: "빠른 전환", token: "--ui-motion-fast" },
  { label: "기본 전환", token: "--ui-motion-standard" },
];
const atEnd = ref(false);
</script>

<template>
  <section aria-labelledby="design-motion">
    <h2 id="design-motion" data-playground-heading tabindex="-1">모션</h2>
    <dl class="design-motion" :data-at-end="atEnd">
      <div v-for="example in examples" :key="example.token" class="design-motion__row">
        <dt :title="example.token">{{ example.label }}</dt>
        <dd class="design-motion__track" aria-hidden="true">
          <span class="design-motion__travel" :style="{ '--duration': `var(${example.token})` }"></span>
        </dd>
        <dd class="design-motion__value"><code>{{ tokenValues[example.token] }}</code></dd>
      </div>
    </dl>
    <UIButton size="sm" variant="outline" @click="atEnd = !atEnd">전환 재생</UIButton>
  </section>
</template>

<style scoped>
.design-motion {
  margin: 0 0 var(--ui-space-md);
}

.design-motion__row {
  display: grid;
  grid-template-columns: minmax(0, max-content) minmax(1rem, 1fr) 3.5rem;
  align-items: center;
  gap: var(--ui-space-sm);
  min-block-size: var(--ui-control-height);
  border-block-start: 1px solid var(--ui-color-divider);
  font-size: var(--ui-font-size-metadata);
}

.design-motion__row:last-child {
  border-block-end: 1px solid var(--ui-color-divider);
}

.design-motion dd {
  margin: 0;
}

.design-motion__value {
  color: var(--ui-color-text-muted);
  font-family: var(--ui-font-mono);
  text-align: end;
}

.design-motion__track {
  --track-height: var(--ui-space-md);
  --travel-direction: 1;

  block-size: var(--track-height);
  border-radius: var(--ui-radius-md);
  background: var(--ui-color-surface-muted);
}

.design-motion__track:dir(rtl) {
  --travel-direction: -1;
}

.design-motion__travel {
  display: block;
  inline-size: calc(100% - var(--track-height));
  transition: transform var(--duration) var(--ui-ease-out);
}

.design-motion__travel::before {
  display: block;
  inline-size: var(--track-height);
  block-size: var(--track-height);
  border-radius: 50%;
  background: var(--ui-color-accent);
  content: "";
}

.design-motion[data-at-end="true"] .design-motion__travel {
  transform: translateX(calc(100% * var(--travel-direction)));
}
</style>
