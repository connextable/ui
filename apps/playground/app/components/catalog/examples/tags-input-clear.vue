<script setup lang="ts">
import { UITagsInput } from "@connextable/ui";
import { ref } from "vue";

const tags = ref<readonly string[]>(['기획', '디자인', '개발']);
</script>

<template>
  <UITagsInput v-model="tags" label="선택한 필터" placeholder="필터 추가" clearable />
</template>
