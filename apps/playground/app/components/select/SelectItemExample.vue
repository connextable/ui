<script setup lang="ts">
import { UISelect, UISelectContent, UISelectItem, UISelectTrigger } from "@connextable/ui";
import { ref } from "vue";

const options = [
  { value: "draft", label: "초안", description: "수정 중인 항목" },
  { value: "review", label: "검토 중", description: "확정 전 검토가 필요한 항목" },
  { value: "ready", label: "준비 완료", description: "검토가 완료된 항목" },
];

const selected = ref<string | null>("review");
</script>

<template>
  <UISelect :options="options" aria-label="상태" v-model="selected">
    <UISelectTrigger />
    <UISelectContent>
      <UISelectItem v-for="option in options" :key="option.value" v-bind="option" />
    </UISelectContent>
  </UISelect>
</template>
