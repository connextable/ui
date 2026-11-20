<script setup lang="ts">
import { SelectTrigger } from "@sectile/vue/select";
import { useTemplateRef, watchEffect } from "vue";
import UISelectValue from "./UISelectValue.vue";
import { useSelectContext } from "./select-context";

defineOptions({ inheritAttrs: false });
defineProps<{ variant?: "outline" | "soft" }>();

const { uid, triggerId, trigger, readonly, required, error, size } = useSelectContext();
const part = useTemplateRef<InstanceType<typeof SelectTrigger>>("part");

watchEffect(() => {
  const element = part.value?.$el;
  trigger.value = element?.tagName === "BUTTON" ? element : null;
});
</script>

<template>
  <SelectTrigger
    v-bind="{ ...$attrs, ...(error ? { 'aria-invalid': 'true' } : {}) }"
    :id="triggerId"
    ref="part"
    class="ui-field-control ui-select-trigger"
    :data-size="size"
    :data-ui-control-size="size"
    :data-ui-readonly="readonly || undefined"
    :data-variant="variant ?? 'outline'"
    :aria-labelledby="`${uid}-label ${uid}-value`"
    :aria-required="required || undefined"
    :aria-describedby="[$attrs['aria-describedby'], error && `${uid}-error`].filter(Boolean).join(' ') || undefined"
  >
    <span v-if="$slots.leading" class="ui-select-trigger__leading" aria-hidden="true">
      <slot name="leading" />
    </span>
    <slot><UISelectValue /></slot>
    <span v-if="!readonly || $slots.trailing" class="ui-select-trigger__trailing" aria-hidden="true">
      <slot name="trailing"><span class="ui-select-trigger__chevron"></span></slot>
    </span>
  </SelectTrigger>
</template>

<style scoped>
.ui-select-trigger {
  display: flex;
  align-items: center;
  gap: var(--ui-space-md);
  inline-size: 100%;
  min-inline-size: 4.75rem;
  padding-block: var(--ui-space-xs);
  text-align: start;
}

.ui-select-trigger:enabled:not([data-ui-readonly]) {
  cursor: pointer;
}

.ui-select-trigger:enabled:not([data-ui-readonly]):active {
  background: var(--ui-color-surface-active);
}

.ui-select-trigger:disabled .ui-select-trigger__trailing {
  color: inherit;
}

.ui-select-trigger__leading,
.ui-select-trigger__trailing {
  display: grid;
  flex: none;
  place-items: center;
  color: var(--ui-color-text-muted);
}

.ui-select-trigger__trailing {
  inline-size: var(--ui-control-size-icon);
  margin-inline-start: auto;
}

.ui-select-trigger__chevron {
  inline-size: calc(var(--ui-control-size-icon) * 0.4);
  block-size: calc(var(--ui-control-size-icon) * 0.4);
  border: solid currentColor;
  border-width: 0 0.09375rem 0.09375rem 0;
  transform: translateY(-0.09375rem) rotate(45deg);
  transition: transform var(--ui-motion-fast) var(--ui-ease-out);
}

.ui-select-trigger[data-state="open"] .ui-select-trigger__chevron {
  transform: translateY(0.09375rem) rotate(225deg);
}
</style>
