<script setup lang="ts">
import { FormSummary, type FormSummaryProps, type FormSummarySlotProps } from "@sectile/vue/form";

const props = defineProps<Omit<FormSummaryProps, "asChild">>();
defineSlots<{ default?(state: FormSummarySlotProps): unknown }>();
</script>

<template>
  <FormSummary v-bind="props" class="ui-form-summary">
    <template v-if="$slots.default" #default="state"><slot v-bind="state" /></template>
  </FormSummary>
</template>

<style scoped>
.ui-form-summary {
  padding: var(--ui-space-sm) var(--ui-space-md);
  border: 1px solid var(--ui-color-danger);
  border-radius: var(--ui-control-radius);
  color: var(--ui-color-danger);
  font-size: var(--ui-font-size-body-sm);
  overflow-wrap: anywhere;
}
</style>
