<script setup lang="ts">
import { UITagsInput } from "@connextable/ui";
import { ref } from "vue";

const tags = ref<readonly string[]>(['검토 완료', '다음 분기 연구 과제에 포함해야 하는 상세 비교 자료']);
</script>

<template>
  <UITagsInput
    v-model="tags"
    label="확정된 태그"
    placeholder=""
    readonly
  />
</template>
