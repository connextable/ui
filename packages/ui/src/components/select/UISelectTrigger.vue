<script setup lang="ts">
import { ChevronDown } from "@lucide/vue";
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
    class="ui-field-control ui-popup-trigger ui-select-trigger"
    :data-size="size"
    :data-ui-control-size="size"
    :data-ui-readonly="readonly || undefined"
    :data-variant="variant ?? 'outline'"
    :aria-labelledby="`${uid}-label ${uid}-value`"
    :aria-required="required || undefined"
    :aria-describedby="[$attrs['aria-describedby'], error && `${uid}-error`].filter(Boolean).join(' ') || undefined"
  >
    <span v-if="$slots.leading" class="ui-popup-trigger__leading" aria-hidden="true">
      <slot name="leading" />
    </span>
    <slot><UISelectValue /></slot>
    <span v-if="!readonly || $slots.trailing" class="ui-popup-trigger__indicator" aria-hidden="true">
      <slot name="trailing"><ChevronDown class="ui-popup-trigger__chevron" /></slot>
    </span>
  </SelectTrigger>
</template>

<style scoped>
.ui-select-trigger {
  inline-size: 100%;
  min-inline-size: 4.75rem;
}
</style>
