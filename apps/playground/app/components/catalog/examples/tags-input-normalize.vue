<script setup lang="ts">
import { UITagsInput } from "@connextable/ui";

const policies = { normalize: (value: string) => value.trim().toLowerCase() };
</script>

<template>
  <UITagsInput :default-value="['frontend']" :policies="policies" label="검색 키워드" placeholder="TypeScript 입력" />
</template>
