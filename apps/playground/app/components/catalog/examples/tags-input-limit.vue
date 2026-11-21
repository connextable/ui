<script setup lang="ts">
import { UITagsInput } from "@connextable/ui";
import { shallowRef } from "vue";

const topics = shallowRef<readonly string[]>(["기획"]);
const policies = { maxTags: 2 };
</script>

<template>
  <div class="ui-field-layout">
    <UITagsInput v-model="topics" :policies="policies" label="주제" placeholder="주제 추가" />
    <output>{{ topics.length }} / 2개</output>
  </div>
</template>
