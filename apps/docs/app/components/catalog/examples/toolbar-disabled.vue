<script setup lang="ts">
import { UIToolbar, UIToolbarItem } from "@connextable/ui";
import { Bold, Italic, Underline } from "@lucide/vue";
import { ref } from "vue";

const items = ["bold", "italic", "underline"] as const;
const activeItem = ref<string | null>("bold");
</script>

<template>
  <UIToolbar v-model="activeItem" :items="items" :disabled-items="['italic']" label="문단 서식">
    <UIToolbarItem value="bold" aria-label="굵게"><Bold aria-hidden="true" /></UIToolbarItem>
    <UIToolbarItem value="italic" aria-label="기울임"><Italic aria-hidden="true" /></UIToolbarItem>
    <UIToolbarItem value="underline" aria-label="밑줄"><Underline aria-hidden="true" /></UIToolbarItem>
  </UIToolbar>
</template>
