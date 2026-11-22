<script setup lang="ts">
import {
  UICombobox,
  UIComboboxContent,
  UIComboboxInput,
  UIComboboxItem,
  UIComboboxResults,
} from "@connextable/ui";
import { ref } from "vue";

const timeZones = [
  { id: "Asia/Seoul", label: "서울" },
  { id: "Europe/Paris", label: "파리" },
];
const value = ref<string | null>(null);
const policies = { matches: (label: string, query: string) => label.includes(query.trim()) };
</script>

<template>
  <div class="example-selection">
    <UICombobox v-model="value" :items="timeZones" :policies="policies" label="시간대" clearable>
      <UIComboboxInput placeholder="도시 검색" />
      <UIComboboxContent>
        <UIComboboxResults v-slot="{ items }">
          <UIComboboxItem v-for="{ id, label } in items" :key="id" :value="id">
            {{ label }}
          </UIComboboxItem>
        </UIComboboxResults>
      </UIComboboxContent>
    </UICombobox>
    <div class="example-selection__output">
      <output>{{ value ?? "선택 없음" }}</output>
    </div>
  </div>
</template>

<style scoped>
.example-selection {
  display: grid;
  gap: var(--ui-space-xs);
  min-inline-size: 0;
}

.example-selection__output {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-between;
  gap: var(--ui-space-sm);
  color: var(--ui-color-text-muted);
  font-size: var(--ui-font-size-body-sm);
}
</style>
