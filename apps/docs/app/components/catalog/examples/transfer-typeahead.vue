<script setup lang="ts">
import { UITransfer } from "@connextable/ui";

const nodes = [
  { id: "available", parentID: null },
  { id: "selected", parentID: null },
  { id: "Calendar", parentID: "available" },
  { id: "Documents", parentID: "available" },
  { id: "Reports", parentID: "available" },
  { id: "Settings", parentID: "selected" },
] as const;

const typeahead = { textValue: (id: string) => id };
const labels: Record<string, string> = { Calendar: "일정", Documents: "문서", Reports: "보고서", Settings: "설정" };
</script>

<template>
  <UITransfer :nodes="nodes" source-id="available" target-id="selected" :typeahead="typeahead">
    <template #item="{ id }">{{ labels[id] }}</template>
  </UITransfer>
</template>
