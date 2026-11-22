<script setup lang="ts">
import { nextTick, onMounted, useTemplateRef } from "vue";
import { useInputState } from "../control-attrs";

const props = withDefaults(defineProps<{ readonly?: boolean; disabled?: boolean }>(), { readonly: undefined, disabled: undefined });
const value = defineModel<string>({ required: true });
const input = useTemplateRef("input");
const { readonly, disabled, attrs } = useInputState(props);

onMounted(async () => {
  // The grid restores its roving cell focus after processing the edit key.
  await nextTick();
  if (disabled.value) return;
  input.value?.focus({ preventScroll: true });
  input.value?.select();
});
</script>

<template>
  <input
    ref="input" v-model="value" class="ui-grid-editor" type="text" tabindex="-1"
    v-bind="attrs" :readonly="readonly" :disabled="disabled" data-scope="grid" data-part="editor" @click.stop
  >
</template>

<style scoped>
.ui-grid-editor {
  border: 0;
  border-radius: var(--ui-radius-sm);
  background: var(--ui-input-state-surface, var(--ui-color-surface));
  color: var(--ui-input-state-ink, var(--ui-color-text));
  font: inherit;
}

.ui-grid-editor:focus {
  outline: none;
}
</style>
