<script setup lang="ts">
import { provideFormControlOwner } from "@sectile/vue/form";

// The enclosing fieldset owns the controls' native form participation.
provideFormControlOwner();
</script>

<template>
  <div class="ui-field ui-field-layout ui-form-field-group__controls"><slot /></div>
</template>

<style scoped>
.ui-form-field-group__controls {
  gap: var(--ui-space-md);
}
</style>
