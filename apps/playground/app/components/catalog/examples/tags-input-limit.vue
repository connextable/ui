<script setup lang="ts">
import { UITagsInput } from "@connextable/ui";
import { shallowRef } from "vue";

const topics = shallowRef<readonly string[]>(["기획"]);
const policies = { maxTags: 2 };
</script>

<template>
  <PlaygroundExample v-bind="$attrs as { id: string; title: string }">
    <UITagsInput v-model="topics" :policies="policies" label="주제" placeholder="주제 추가" />
    <template #footer><output>{{ topics.length }} / {{ policies.maxTags }}개</output></template>
  </PlaygroundExample>
</template>
