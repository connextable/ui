<script setup lang="ts">
import { UITagsInput } from "@connextable/ui";
import { shallowRef } from "vue";

const tags = shallowRef<readonly string[]>(["긴급", "검토", "보류"]);
</script>

<template>
  <UITagsInput v-model="tags" label="우선순위" reorderable placeholder="우선순위 태그 추가" />
</template>
