<script setup lang="ts">
import { UIInView } from "@connextable/ui";
import { nextTick, ref, shallowRef, useTemplateRef, type Component } from "vue";

const props = defineProps<{
  load: () => Promise<Component>;
  example?: { id: string; title: string; description?: string; source: string | (() => Promise<string>); wide?: boolean };
}>();

const component = shallowRef<Component>();
const pending = useTemplateRef<HTMLDivElement>("pending");
const loading = ref(false);
const failed = ref(false);

async function loadPreview() {
  if (loading.value || component.value) return;
  loading.value = true;
  failed.value = false;
  try {
    const preview = await props.load();
    const focused = pending.value?.contains(document.activeElement);
    component.value = preview;
    if (focused && props.example) {
      await nextTick();
      document.getElementById(props.example.id)?.focus({ preventScroll: true });
    }
  } catch {
    failed.value = true;
  } finally {
    loading.value = false;
  }
}
</script>

<template>
  <UIInView class="playground-deferred-preview" :class="{ 'playground-deferred-preview--framed': example }"
    :aria-busy="loading || undefined" once fallback root-margin="160px 0px" @enter="loadPreview">
    <component :is="component" v-if="component" v-bind="example" />
    <div v-else ref="pending">
      <slot name="pending" :loading="loading" :failed="failed" :retry="loadPreview" />
    </div>
  </UIInView>
</template>

<style scoped>
.playground-deferred-preview {
  inline-size: 100%;
  min-inline-size: 0;
}

.playground-deferred-preview:not(.playground-deferred-preview--framed) {
  display: grid;
  justify-items: inherit;
}

.playground-deferred-preview > div:has(.playground-preview-status) {
  inline-size: 100%;
}
</style>
