<script setup lang="ts">
import {
  ProgressIndicator, ProgressRoot, ProgressTrack, ProgressValueText,
  type ProgressRootProps, type ProgressRootSlotProps,
} from "@sectile/vue/progress";

const { showValue, ...rootProps } = defineProps<Omit<ProgressRootProps, "asChild"> & { showValue?: boolean }>();
defineSlots<{ value?(state: ProgressRootSlotProps): unknown }>();
</script>

<template>
  <ProgressRoot v-bind="rootProps" v-slot="{ percentage }">
    <ProgressValueText v-if="showValue || $slots.value" v-slot="state" class="ui-progress__value">
      <slot name="value" v-bind="state">{{ state.valueText }}</slot>
    </ProgressValueText>
    <ProgressTrack class="ui-progress__track">
      <ProgressIndicator
        class="ui-progress__fill"
        :style="percentage === null ? undefined : { inlineSize: `${percentage}%` }"
      />
    </ProgressTrack>
  </ProgressRoot>
</template>

<style scoped>
.ui-progress__value {
  display: block;
  margin-block-end: var(--ui-space-xs);
  color: var(--ui-color-text-muted);
  font-size: var(--ui-font-size-body-sm);
}

.ui-progress__track {
  overflow: hidden;
  block-size: var(--ui-progress-height, 0.625rem);
  border-radius: 999px;
  background: var(--ui-color-accent-soft);
}

.ui-progress__fill {
  block-size: 100%;
  border-radius: inherit;
  background: var(--ui-color-accent);
  transition: inline-size var(--ui-motion-standard) var(--ui-ease-out);
}

.ui-progress__fill[data-status="indeterminate"] {
  --ui-progress-from: -100%;
  --ui-progress-to: 300%;

  inline-size: 33.333%;
  animation: ui-progress-sweep 1.4s var(--ui-ease-out) infinite;
}

.ui-progress__fill[data-status="indeterminate"]:dir(rtl) {
  --ui-progress-from: 100%;
  --ui-progress-to: -300%;
}

@keyframes ui-progress-sweep {
  from { transform: translateX(var(--ui-progress-from)); }
  to { transform: translateX(var(--ui-progress-to)); }
}

@media (prefers-reduced-motion: reduce) {
  .ui-progress__fill[data-status="indeterminate"] {
    animation: none;
    margin-inline: auto;
  }
}

@media (forced-colors: active) {
  .ui-progress__track {
    outline: 1px solid CanvasText;
  }

  .ui-progress__fill {
    forced-color-adjust: none;
    background: Highlight;
  }
}
</style>
