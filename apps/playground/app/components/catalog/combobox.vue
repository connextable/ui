<script setup lang="ts">
import {
  UICombobox,
  UIComboboxContent,
  UIComboboxEmpty,
  UIComboboxInput,
  UIComboboxItem,
  UIComboboxResults,
} from "@connextable/ui";
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
    <UICombobox :items="environments" :policies="policies" label="실행 환경">
      <UIComboboxInput :id="inputId" placeholder="이름으로 검색" />
      <UIComboboxContent>
        <UIComboboxResults v-slot="{ items }">
          <UIComboboxItem v-for="item in items" :key="item.id" :value="item.id">
            {{ item.label }}
          </UIComboboxItem>
        </UIComboboxResults>
        <UIComboboxEmpty>일치하는 환경이 없습니다</UIComboboxEmpty>
      </UIComboboxContent>
    </UICombobox>
  </div>
</template>
