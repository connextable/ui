<script setup lang="ts">
import { nextTick, onMounted, useTemplateRef } from "vue";

const value = defineModel<string>({ required: true });
const input = useTemplateRef("input");

onMounted(async () => {
  // The grid restores its roving cell focus after processing the edit key.
  await nextTick();
  input.value?.focus({ preventScroll: true });
  input.value?.select();
});
</script>

<template>
  <input
    ref="input" v-model="value" class="ui-grid-editor" type="text" tabindex="-1"
    data-scope="grid" data-part="editor" @click.stop
  >
</template>

<style scoped>
.ui-grid-editor {
  border: 0;
  border-radius: var(--ui-radius-sm);
  background: var(--ui-color-surface);
  color: var(--ui-color-text);
  font: inherit;
}

.ui-grid-editor:focus {
  outline: none;
}
</style>
