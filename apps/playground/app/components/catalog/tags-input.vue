<script setup lang="ts">
import { UITagsInput } from "@connextable/ui";
import { ref } from "vue";

const tags = ref<readonly string[]>(['Vue', 'DOM', '접근성']);
</script>

<template>
  <UITagsInput v-model="tags" label="프로젝트 기술" placeholder="기술 추가" />
</template>
