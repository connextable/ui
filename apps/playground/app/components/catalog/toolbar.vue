<script setup lang="ts">
import {
  UIToolbar,
  UIToolbarItem,
  UIToolbarSeparator,
} from "@connextable/ui";

import { ref } from "vue";

const formatting = [
  { id: "bold", label: "굵게" },
  { id: "italic", label: "기울임" },
  { id: "underline", label: "밑줄" },
] as const;
const alignment = [
  { id: "left", label: "왼쪽 정렬" },
  { id: "center", label: "가운데 정렬" },
] as const;
const items = [...formatting, ...alignment].map(({ id }) => id);
const formats = ref({ bold: false, italic: false, underline: false });
const align = ref<"left" | "center">("left");

function apply(value: string) {
  if (value === "left" || value === "center") align.value = value;
  if (value === "bold" || value === "italic" || value === "underline") formats.value[value] = !formats.value[value];
}

const activeItem = ref<string | null>("bold");
</script>

<template>
  <PlaygroundExample v-bind="$attrs as { id: string; title: string }">
    <UIToolbar v-model="activeItem" :items="items" label="문단 서식" @invoke="apply">
      <UIToolbarItem v-for="tool in formatting" :key="tool.id" :value="tool.id" :aria-pressed="formats[tool.id]">
        {{ tool.label }}
      </UIToolbarItem>
      <UIToolbarSeparator />
      <UIToolbarItem v-for="tool in alignment" :key="tool.id" :value="tool.id" :aria-pressed="align === tool.id">
        {{ tool.label }}
      </UIToolbarItem>
    </UIToolbar>
    <template #footer>
      <output :style="{
        display: 'block',
        inlineSize: '100%',
        textAlign: align,
        fontWeight: formats.bold ? 700 : undefined,
        fontStyle: formats.italic ? 'italic' : undefined,
        textDecoration: formats.underline ? 'underline' : undefined,
      }">이번 주 배포는 금요일 오후에 진행합니다.</output>
    </template>
  </PlaygroundExample>
</template>
