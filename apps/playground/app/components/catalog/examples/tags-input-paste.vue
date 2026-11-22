<script setup lang="ts">
import { UITagsInput } from "@connextable/ui";
import { shallowRef } from "vue";

const tags = shallowRef<readonly string[]>(["디자인"]);
</script>

<template>
  <PlaygroundExample v-bind="$attrs as { id: string; title: string }">
    <template #header>복사할 태그 <code>디자인, 접근성, 성능</code></template>
    <UITagsInput v-model="tags" label="태그 붙여넣기" split-paste placeholder="복사한 태그 붙여넣기" />
  </PlaygroundExample>
</template>
