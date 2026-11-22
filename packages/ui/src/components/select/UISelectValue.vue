<script setup lang="ts">
import { SelectValue } from "@sectile/vue/select";
import { computed } from "vue";
import UIItemIcon from "../UIItemIcon.vue";
import { useSelectContext, type UISelectOption } from "./select-context";

defineSlots<{ default?(state: { value: string | null; option: UISelectOption | undefined }): unknown }>();

const { uid, options, placeholder, textValue } = useSelectContext();
const hasIcons = computed(() => options.value.some(option => option.icon));
const optionFor = (value: string | null) => options.value.find(option => option.value === value);
</script>

<template>
  <SelectValue
    :id="`${uid}-value`"
    class="ui-select-value"
    :placeholder="placeholder"
    :data-option-icons="hasIcons || undefined"
  >
    <template v-if="$slots.default || hasIcons" #default="{ value }">
      <slot :value="value" :option="optionFor(value)">
        <UIItemIcon :icon="optionFor(value)?.icon" />
        <span>{{ value === null ? placeholder : textValue(value) }}</span>
      </slot>
    </template>
  </SelectValue>
</template>

<style scoped>
.ui-select-value {
  min-inline-size: 0;
  overflow-wrap: anywhere;
}

.ui-select-value[data-option-icons] {
  display: inline-flex;
  align-items: center;
  gap: var(--ui-space-xs);
}

.ui-select-value[data-placeholder] {
  color: var(--ui-color-placeholder);
}
</style>
