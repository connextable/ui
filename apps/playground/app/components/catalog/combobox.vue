<script setup lang="ts">
import { UICombobox } from "@connextable/ui";
import { useId } from "vue";

const inputId = useId();
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
  <div class="ui-field">
    <label :for="inputId">실행 환경</label>
    <UICombobox :id="inputId" :items="environments" :policies="policies" label="실행 환경" placeholder="이름으로 검색" />
  </div>
</template>
