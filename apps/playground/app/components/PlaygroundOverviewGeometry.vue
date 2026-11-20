<script setup lang="ts">
defineProps<{ tokenValues: Readonly<Record<string, string>> }>();

const spacing = [
  { label: "2xs", token: "--ui-space-2xs" },
  { label: "xs", token: "--ui-space-xs" },
  { label: "sm", token: "--ui-space-sm" },
  { label: "md", token: "--ui-space-md" },
];

const corners = [
  { label: "sm", token: "--ui-radius-sm" },
  { label: "md", token: "--ui-radius-md" },
  { label: "lg", token: "--ui-radius-lg" },
  { label: "패널", token: "--ui-panel-radius" },
];
</script>

<template>
  <section aria-labelledby="design-geometry">
    <h2 id="design-geometry" data-playground-heading tabindex="-1">간격과 모서리</h2>
    <div class="design-geometry">
      <div>
        <h3>간격</h3>
        <dl class="design-geometry__scale">
          <div v-for="item in spacing" :key="item.token">
            <dt :title="item.token">{{ item.label }}</dt>
            <dd>
              <span class="design-geometry__gap" :style="{ gap: `var(${item.token})` }" aria-hidden="true"></span>
              <code>{{ tokenValues[item.token] }}</code>
            </dd>
          </div>
        </dl>
      </div>
      <div>
        <h3>모서리</h3>
        <dl class="design-geometry__scale">
          <div v-for="item in corners" :key="item.token">
            <dt :title="item.token">{{ item.label }}</dt>
            <dd>
              <span class="design-geometry__radius" :style="{ borderRadius: `var(${item.token})` }" aria-hidden="true"></span>
              <code>{{ tokenValues[item.token] }}</code>
            </dd>
          </div>
        </dl>
      </div>
    </div>
  </section>
</template>

<style scoped>
.design-geometry {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(min(100%, 17rem), 1fr));
  gap: 1.25rem 2rem;
}

.design-geometry h3 {
  margin: 0 0 var(--ui-space-sm);
  font-size: var(--ui-font-size-body);
}

.design-geometry__scale {
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  gap: var(--ui-space-xs);
  margin: 0;
}

.design-geometry__scale dt {
  font-size: var(--ui-font-size-body-sm);
  font-weight: 650;
}

.design-geometry__scale dd {
  display: grid;
  gap: var(--ui-space-xs);
  margin: var(--ui-space-xs) 0 0;
}

.design-geometry__scale code {
  color: var(--ui-color-text-muted);
  font: var(--ui-font-size-metadata)/var(--ui-line-height-body) var(--ui-font-mono);
  overflow-wrap: anywhere;
}

.design-geometry__gap {
  display: flex;
  inline-size: fit-content;
  block-size: 2.5rem;
  background: var(--ui-color-accent-soft);
}

.design-geometry__gap::before,
.design-geometry__gap::after {
  inline-size: var(--ui-space-md);
  background: var(--ui-color-accent);
  content: "";
}

.design-geometry__radius {
  box-sizing: border-box;
  inline-size: 3.25rem;
  max-inline-size: 100%;
  block-size: 2.5rem;
  border: 1px solid var(--ui-color-border-strong);
  background: var(--ui-color-surface-muted);
}
</style>
