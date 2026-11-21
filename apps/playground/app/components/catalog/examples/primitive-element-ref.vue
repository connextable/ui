<script setup lang="ts">
import { UIButton, UIPrimitive } from "@connextable/ui";
import { shallowRef } from "vue";

const target = shallowRef<HTMLElement | null>(null);

function setTarget(element: unknown) {
  target.value = element instanceof HTMLElement ? element : null;
}
</script>

<template>
  <div class="example">
    <UIButton size="sm" @click="target?.focus()">문구로 이동</UIButton>
    <UIPrimitive as="p" tabindex="-1" :element-ref="setTarget">편집 권한 안내</UIPrimitive>
  </div>
</template>

<style scoped>
.example {
  display: grid;
  gap: var(--ui-space-sm);
  min-inline-size: 0;
}
</style>
