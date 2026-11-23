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
}>();
</script>

<template>
  <component v-if="framed && preview" :is="preview" v-bind="example" />
  <PlaygroundExample v-else v-bind="example">
    <PlaygroundDeferredPreview v-if="loadPreview" :load="loadPreview" />
    <component v-else :is="preview" />
  </PlaygroundExample>
</template>
