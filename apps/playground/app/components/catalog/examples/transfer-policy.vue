<script setup lang="ts">
import { UITransfer } from "@connextable/ui";

const nodes = [
  { id: "available", parentID: null },
  { id: "selected", parentID: null },
  { id: "주간 보고서", parentID: "available" },
  { id: "보관용 사본", parentID: "available" },
  { id: "릴리스 안내", parentID: "selected" },
] as const;

const policies = { canMove: (id: string) => id !== "보관용 사본" };
</script>

<template>
  <UITransfer :nodes="nodes" source-id="available" target-id="selected" :policies="policies" />
</template>
