<script setup lang="ts">
import type { Component } from "vue";

defineProps<{
  example: {
    id: string;
    title: string;
    description?: string;
    source: string | (() => Promise<string>);
    wide?: boolean;
  };
  preview?: Component;
  loadPreview?: () => Promise<Component>;
  framed?: boolean;
  tall?: boolean;
}>();
</script>

<template>
  <component v-if="framed && preview" :is="preview" v-bind="example" />
  <PlaygroundDeferredPreview v-else-if="framed && loadPreview" :load="loadPreview" :example="example">
    <template #pending="{ loading, failed, retry }">
      <PlaygroundExample v-bind="example" pending>
        <PlaygroundPreviewStatus :tall="tall" :loading="loading" :failed="failed" @retry="retry" />
      </PlaygroundExample>
    </template>
  </PlaygroundDeferredPreview>
  <PlaygroundExample v-else v-bind="example">
    <PlaygroundDeferredPreview v-if="loadPreview" :load="loadPreview">
      <template #pending="{ loading, failed, retry }">
        <PlaygroundPreviewStatus :tall="tall" :loading="loading" :failed="failed" @retry="retry" />
      </template>
    </PlaygroundDeferredPreview>
    <slot v-else>
      <component :is="preview" />
    </slot>
  </PlaygroundExample>
</template>
