<script setup lang="ts">
import {
  UICombobox,
  UIComboboxContent,
  UIComboboxEmpty,
  UIComboboxEditor,
  UIInput,
  UIComboboxItem,
  UIComboboxResults,
} from "@connextable/ui";
import { ref, useId } from "vue";

const inputId = useId();
const query = ref("");
const open = ref(false);
const environments = [
  { id: "production", label: "운영" },
  { id: "stage", label: "검증" },
  { id: "development", label: "개발" },
];
const policies = {
  matches: (label: string, query: string) => label.toLowerCase().includes(query.trim().toLowerCase()),
};

function edit(value: string) {
  query.value = value;
  open.value = true;
}
</script>

<template>
  <div class="ui-field">
    <label :for="inputId">실행 환경</label>
    <UICombobox v-model:input-value="query" v-model:open="open" :items="environments" :policies="policies" label="실행 환경">
      <UIComboboxEditor>
        <UIInput :id="inputId" :model-value="query" placeholder="이름으로 검색" @update:model-value="edit" />
      </UIComboboxEditor>
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
