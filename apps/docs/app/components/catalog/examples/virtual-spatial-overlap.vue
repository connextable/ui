<script setup lang="ts">
import {
  UIVirtualSpatial,
} from "@connextable/ui";

const nodes = Array.from({ length: 1000 }, (_, index) => ({
  id: `지점 ${index + 1}`,
  x: 12 + (index % 18) * 68,
  y: 12 + Math.floor(index / 18) * 64 + (index % 2) * 12,
  width: 104,
  z: (index % 3) + 1,
  height: 40,
}))
</script>

<template>
  <UIVirtualSpatial :get-z-index="(node) => node.z"
    :items="nodes"
    :get-i-d="(node: typeof nodes[number]) => node.id"
    :get-rect="node => node"
    size-ownership="declared"
    aria-label="좌표로 배치된 지점"
  >
    <template #item="{ value: node }">
      {{ node.id }}
    </template>
  </UIVirtualSpatial>
</template>
