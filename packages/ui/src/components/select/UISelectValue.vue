<script setup lang="ts">
import { SelectValue } from "@sectile/vue/select";
import { useSelectContext } from "./select-context";

const { uid, options, placeholder } = useSelectContext();
</script>

<template>
  <SelectValue
    :id="`${uid}-value`"
    class="ui-select-value"
    :placeholder="placeholder"
  >
    <template v-if="$slots.default" #default="{ value }">
      <slot :value="value" :option="options.find((option) => option.value === value)" />
    </template>
  </SelectValue>
</template>

<style scoped>
.ui-select-value {
  min-inline-size: 0;
  overflow-wrap: anywhere;
}

.ui-select-value[data-placeholder] {
  color: var(--ui-color-placeholder);
}
</style>
