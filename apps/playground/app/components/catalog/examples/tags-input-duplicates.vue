<script setup lang="ts">
import { UITagsInput } from "@connextable/ui";
import { ref } from "vue";

const policies = { allowDuplicate: false };

const tags = ref<readonly string[]>(['Vue']);
</script>

<template>
  <UITagsInput v-model="tags" :policies="policies" label="기술 태그" placeholder="Vue 다시 입력" />
</template>
