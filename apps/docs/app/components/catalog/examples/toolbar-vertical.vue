<script setup lang="ts">
import { UIToolbar, UIToolbarItem } from "@connextable/ui";
import { AlignCenter, AlignLeft, AlignRight } from "@lucide/vue";
import { ref } from "vue";

const items = ["left", "center", "right"] as const;
const activeItem = ref<string | null>("left");
</script>

<template>
  <UIToolbar v-model="activeItem" :items="items" orientation="vertical" label="문단 정렬">
    <UIToolbarItem value="left" aria-label="왼쪽 정렬"><AlignLeft aria-hidden="true" /></UIToolbarItem>
    <UIToolbarItem value="center" aria-label="가운데 정렬"><AlignCenter aria-hidden="true" /></UIToolbarItem>
    <UIToolbarItem value="right" aria-label="오른쪽 정렬"><AlignRight aria-hidden="true" /></UIToolbarItem>
  </UIToolbar>
</template>
