<script setup lang="ts">
import { UIDataLabel, UIDataStatus, UIDataSurface, UIVirtualSpatial } from "@connextable/ui";
import { Boxes } from "@lucide/vue";

const nodes = Array.from({ length: 1000 }, (_, index) => ({
  id: `선반 ${index + 1}`,
  x: 12 + (index % 18) * 132 + Math.floor(index % 18 / 3) * 18,
  y: 12 + Math.floor(index / 18) * 76,
  width: 120,
  height: 64,
  checked: index % 5 !== 0,
}))
</script>

<template>
  <UIDataSurface>
    <template #toolbar><strong>물류센터 배치도</strong><output>선반 {{ nodes.length.toLocaleString("ko-KR") }}개</output></template>
    <UIVirtualSpatial
      :items="nodes"
      :get-i-d="(node: typeof nodes[number]) => node.id"
      :get-rect="node => node"
      size-ownership="declared"
      aria-label="좌표로 배치된 지점"
    >
      <template #item="{ value: node }">
        <UIDataLabel :label="node.id">
          <template #icon><Boxes :size="15" aria-hidden="true" /></template>
        </UIDataLabel>
        <UIDataStatus :tone="node.checked ? 'success' : 'warning'">{{ node.checked ? '점검 완료' : '점검 대기' }}</UIDataStatus>
      </template>
    </UIVirtualSpatial>
  </UIDataSurface>
</template>
