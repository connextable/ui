<script setup lang="ts">
import { computed, useId } from "vue";

const props = defineProps<{
  id?: string;
  label: string;
  description?: string;
  error?: string;
}>();

const uid = useId();
const controlId = computed(() => props.id ?? `${uid}-control`);
const descriptionId = `${uid}-description`;
const errorId = `${uid}-error`;
const control = computed(() => ({
  id: controlId.value,
  "aria-describedby": [props.description && descriptionId, props.error && errorId].filter(Boolean).join(" ") || undefined,
  "aria-invalid": props.error ? true : undefined,
}));
</script>

<template>
  <div class="ui-form-field">
    <label :for="controlId" class="ui-form-field__label">{{ label }}</label>
    <slot :control="control" />
    <p v-if="description" :id="descriptionId" class="ui-form-field__description">{{ description }}</p>
    <p v-if="error" :id="errorId" class="ui-form-field__error" role="alert">{{ error }}</p>
  </div>
</template>

<style scoped>
.ui-form-field {
  display: grid;
  gap: var(--ui-space-xs);
  min-inline-size: 0;
}

.ui-form-field__label {
  font-size: var(--ui-font-size-body-sm);
  font-weight: 600;
}

.ui-form-field__description,
.ui-form-field__error {
  margin: 0;
  color: var(--ui-color-text-muted);
  font-size: var(--ui-font-size-metadata);
  overflow-wrap: anywhere;
}

.ui-form-field__error {
  color: var(--ui-color-danger);
}
</style>
