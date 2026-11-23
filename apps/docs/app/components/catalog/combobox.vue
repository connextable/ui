<script setup lang="ts">
import { UICombobox } from "@connextable/ui";
import { ref } from "vue";

const environment = ref<string | null>(null);
const environments = [
  { id: "production", label: "운영" },
  { id: "stage", label: "검증" },
  { id: "development", label: "개발" },
];
const policies = {
  matches: (label: string, query: string) => label.toLowerCase().includes(query.trim().toLowerCase()),
};
</script>

<template>
  <PlaygroundExample v-bind="$attrs as { id: string; title: string }">
    <UICombobox
      v-model="environment"
      :items="environments"
      :policies="policies"
      label="실행 환경"
      placeholder="이름으로 검색"
      clearable
    />
    <template #footer>
      <output>{{ environments.find(item => item.id === environment)?.label ?? "선택 없음" }}</output>
    </template>
  </PlaygroundExample>
</template>
