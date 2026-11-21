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
</script>

<template>
  <UITransfer :nodes="nodes" source-id="available" target-id="selected" :typeahead="typeahead" />
</template>
