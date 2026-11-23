<script setup lang="ts">
import { ref, useTemplateRef } from "vue";
import { UIButton, UIDataActions, UIVirtualGrid } from "@connextable/ui";

const items = Array.from({ length: 1600 }, (_, index) => index + 1);
const selected = ref(12);
const grid = useTemplateRef("grid");
</script>

<template>
  <PlaygroundExample v-bind="$attrs as { id: string; title: string }">
    <UIVirtualGrid
      ref="grid"
      :items="items"
      :get-i-d="id => id"
      :lane-policy="{ kind: 'responsive', minExtent: 100, maxCount: 5, gap: 8 }"
      :size-policy="{ kind: 'fixed', extent: 52 }"
      :item-attributes="id => ({ 'data-ui-virtual-current': id === selected || undefined })"
      :row-gap="8"
      aria-label="부품 상자"
    >
      <template #item="{ id }">
        <UIButton size="sm" variant="ghost" :aria-pressed="selected === id" @click="selected = Number(id)">상자 {{ id }}</UIButton>
      </template>
    </UIVirtualGrid>
    <UIDataActions>
      <UIButton size="sm" variant="outline" @click="grid?.scrollToID(selected, 'center')">선택 위치로 이동</UIButton>
    </UIDataActions>
    <template #footer>
      <output aria-live="polite">선택한 상자 {{ selected }}번</output>
    </template>
  </PlaygroundExample>
</template>
