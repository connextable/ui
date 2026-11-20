<script setup lang="ts">
import { UISelect, UISelectContent, UISelectItem, UISelectTrigger } from "@connextable/ui";

const options = [
  { value: "draft", label: "초안", description: "수정 중인 항목" },
  { value: "review", label: "검토 중", description: "확정 전 검토가 필요한 항목" },
  { value: "ready", label: "준비 완료", description: "검토가 완료된 항목" },
];
</script>

<template>
  <UISelect :options="options" label="상태" default-value="review">
    <UISelectTrigger />
    <UISelectContent>
      <UISelectItem v-for="option in options" :key="option.value" v-bind="option" />
    </UISelectContent>
  </UISelect>
</template>
