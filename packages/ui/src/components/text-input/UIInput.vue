<script setup lang="ts">
import { TextField } from "@sectile/vue/text";

const { size = "md", variant = "outline", ...fieldProps } = defineProps<{
  id?: string;
  name?: string;
  disabled?: boolean;
  readonly?: boolean;
  required?: boolean;
  placeholder?: string;
  size?: "sm" | "md" | "lg";
  variant?: "outline" | "soft";
}>();

const value = defineModel<string>({ required: true });
</script>

<template>
  <TextField
    v-bind="fieldProps"
    class="ui-field-control ui-input"
    :data-size="size"
    :data-ui-control-size="size"
    :data-variant="variant"
    :model-value="value"
    @update:model-value="value = String($event)"
  />
</template>

<style scoped>
.ui-input {
  inline-size: 100%;
}
</style>
