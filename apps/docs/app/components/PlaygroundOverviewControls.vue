<script setup lang="ts">
import { UIButton, UIInput, UISwitch } from "@connextable/ui";
import { onMounted, reactive, shallowRef, useTemplateRef } from "vue";

const sizes = ["sm", "md", "lg"] as const;
type Size = (typeof sizes)[number];

const samples = useTemplateRef<HTMLElement>("samples");
const metrics = shallowRef<Partial<Record<Size, { height: string; radius: string }>>>({});
const controls = reactive({
  sm: { text: "", enabled: false },
  md: { text: "", enabled: false },
  lg: { text: "", enabled: false },
});

function reset(size: Size) {
  controls[size].text = "";
  controls[size].enabled = false;
}

onMounted(() => {
  const nextMetrics: typeof metrics.value = {};
  for (const size of sizes) {
    const control = samples.value?.querySelector(`[data-overview-size="${size}"] [data-ui-control-size="${size}"]`);
    if (!control) continue;
    const style = getComputedStyle(control);
    nextMetrics[size] = {
      height: style.getPropertyValue("--ui-control-size-height").trim(),
      radius: style.getPropertyValue("--ui-control-size-radius").trim(),
    };
  }
  metrics.value = nextMetrics;
});
</script>

<template>
  <section aria-labelledby="design-controls">
    <h2 id="design-controls" data-playground-heading tabindex="-1">컨트롤 크기</h2>
    <div ref="samples" class="design-controls">
      <div
        v-for="size in sizes"
        :key="size"
        class="design-controls__row"
        :data-overview-size="size"
        role="group"
        :aria-labelledby="`design-size-${size}`"
      >
        <div class="design-controls__size">
          <strong :id="`design-size-${size}`">{{ size }}</strong>
          <span v-if="metrics[size]" class="design-controls__metrics">
            <span>높이 <code>{{ metrics[size]?.height }}</code></span>
            <span>모서리 <code>{{ metrics[size]?.radius }}</code></span>
          </span>
        </div>
        <div class="design-controls__sample">
          <UIInput
            v-model="controls[size].text"
            class="design-controls__input"
            :size="size"
            :aria-label="`${size} 이름 입력`"
            placeholder="이름"
          />
          <UISwitch variant="outline" v-model="controls[size].enabled" :size="size" label="사용" />
          <UIButton :size="size" variant="outline" :aria-label="`${size} 초기화`" @click="reset(size)">초기화</UIButton>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.design-controls {
  display: grid;
  border-block-start: 1px solid var(--ui-color-divider);
}

.design-controls__row {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: var(--ui-space-sm) var(--ui-space-md);
  padding-block: var(--ui-space-md);
  border-block-end: 1px solid var(--ui-color-divider);
}

.design-controls__size {
  display: grid;
  flex: 1 0 11.75rem;
  gap: var(--ui-space-2xs);
}

.design-controls__size strong {
  font: 650 var(--ui-font-size-body)/var(--ui-line-height-body) var(--ui-font-mono);
}

.design-controls__metrics {
  display: flex;
  flex-wrap: wrap;
  gap: var(--ui-space-xs) var(--ui-space-sm);
  color: var(--ui-color-text-muted);
  font-size: var(--ui-font-size-metadata);
}

.design-controls__metrics code {
  font: inherit;
  font-family: var(--ui-font-mono);
}

.design-controls__sample {
  display: flex;
  flex: 3 1 22rem;
  flex-wrap: wrap;
  align-items: center;
  gap: var(--ui-space-2xs) var(--ui-space-sm);
  min-inline-size: 0;
}

.design-controls__sample .design-controls__input {
  flex: 1 1 6rem;
  inline-size: auto;
  min-inline-size: 0;
}

@media (width > 22rem) {
  .design-controls__sample {
    display: grid;
    grid-template-columns: minmax(0, 1fr) max-content max-content;
  }

  .design-controls__sample > :last-child {
    justify-self: end;
  }
}
</style>
