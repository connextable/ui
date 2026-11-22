<script setup lang="ts">
import { UITagsInput } from "@connextable/ui";
import { ref } from "vue";

const policies = { normalize: (value: string) => value.trim().toLowerCase() };

const tags = ref<readonly string[]>(['frontend']);
</script>

<template>
  <UITagsInput v-model="tags" :policies="policies" label="검색 키워드" placeholder="TypeScript 입력" />
</template>
