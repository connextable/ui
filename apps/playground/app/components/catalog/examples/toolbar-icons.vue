<script setup lang="ts">
import { UIToolbar, UIToolbarItem } from "@connextable/ui";
import { Bold, Italic } from "@lucide/vue";
import { ref } from "vue";

const items = ["bold", "italic"];
const active = ref<string | null>("bold");
const formats = ref<string[]>([]);
function toggle(format: string) {
  formats.value = formats.value.includes(format)
    ? formats.value.filter(value => value !== format)
    : [...formats.value, format];
}
</script>

<template>
  <UIToolbar v-model="active" :items="items" label="문단 서식" @invoke="toggle">
    <UIToolbarItem value="bold" aria-label="굵게" :aria-pressed="formats.includes('bold')">
      <Bold aria-hidden="true" />
    </UIToolbarItem>
    <UIToolbarItem value="italic" aria-label="기울임" :aria-pressed="formats.includes('italic')">
      <Italic aria-hidden="true" />
    </UIToolbarItem>
  </UIToolbar>
</template>
