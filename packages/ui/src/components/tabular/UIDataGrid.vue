<script setup lang="ts" generic="Cells extends WireCells<Cells> = TabularCellRecord, ID extends ColumnID<Cells> = ColumnID<Cells>">
import type { TabularCellRecord } from "@sectile/tabular";
import { useAttrs, type VNodeChild } from "vue";
import { useLocalDataView, type ColumnID, type LocalDataProps, type TableCell, type WireCells } from "./local-data";

defineOptions({ inheritAttrs: false });
const props = defineProps<LocalDataProps<Cells, ID>>();
const slots = defineSlots<{ cell?: (scope: TableCell<NoInfer<Cells>, NoInfer<ID>>) => VNodeChild }>();
const Render = useLocalDataView<Cells, ID>("grid", props, useAttrs(), slots);
</script>

<template>
  <Render />
</template>
