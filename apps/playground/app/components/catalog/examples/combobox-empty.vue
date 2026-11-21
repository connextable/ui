<script setup lang="ts">
import {
  UICombobox,
  UIComboboxContent,
  UIComboboxEmpty,
  UIComboboxInput,
  UIComboboxItem,
  UIComboboxResults,
} from "@connextable/ui";

const teams = [
  { id: "design", label: "디자인" },
  { id: "frontend", label: "프런트엔드" },
  { id: "backend", label: "백엔드" },
];
const policies = { matches: (label: string, query: string) => label.includes(query.trim()) };
</script>

<template>
  <UICombobox :items="teams" :policies="policies" label="팀 이름" default-input-value="마케팅">
    <UIComboboxInput placeholder="팀 이름 검색" />
    <UIComboboxContent>
      <UIComboboxResults v-slot="{ items }">
        <UIComboboxItem v-for="{ id, label } in items" :key="id" :value="id">
          {{ label }}
        </UIComboboxItem>
      </UIComboboxResults>
      <UIComboboxEmpty>일치하는 팀이 없어요. 다른 팀 이름을 입력해 보세요.</UIComboboxEmpty>
    </UIComboboxContent>
  </UICombobox>
</template>
