<script setup lang="ts">
import { DisclosureRoot } from "@sectile/vue/disclosure";

withDefaults(defineProps<{
  contentId?: string;
  modelValue?: boolean;
  defaultValue?: boolean;
  disabled?: boolean;
  variant?: "plain" | "outline";
}>(), { modelValue: undefined });

defineEmits<{ "update:modelValue": [open: boolean] }>();
</script>

<template>
  <DisclosureRoot
    class="ui-disclosure"
    :data-variant="variant ?? 'plain'"
    :content-id="contentId"
    :model-value="modelValue"
    :default-value="defaultValue"
    :disabled="disabled"
    @update:model-value="$emit('update:modelValue', $event)"
    v-slot="state"
  >
    <slot v-bind="state" />
  </DisclosureRoot>
</template>

<style scoped>
.ui-disclosure[data-variant="outline"] {
  border: 1px solid var(--ui-color-divider);
  border-radius: var(--ui-control-radius);
}
</style>
