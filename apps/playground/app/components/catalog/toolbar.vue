<script setup lang="ts">
import {
  UIToolbar,
  UIToolbarItem,
  UIToolbarSeparator,
} from "@connextable/ui";

import { ref } from "vue";
import { AlignCenter, AlignLeft, Bold, Italic, Underline } from "@lucide/vue";

const props = withDefaults(defineProps<{
  orientation?: "horizontal" | "vertical";
  disabledItems?: string[];
}>(), { orientation: "horizontal" });

const formatting = [
  { id: "bold", label: "굵게", icon: Bold },
  { id: "italic", label: "기울임", icon: Italic },
  { id: "underline", label: "밑줄", icon: Underline },
] as const;
const alignment = [
  { id: "left", label: "왼쪽 정렬", icon: AlignLeft },
  { id: "center", label: "가운데 정렬", icon: AlignCenter },
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
  <div class="toolbar-example" :data-orientation="props.orientation">
    <UIToolbar :items="items" :orientation="props.orientation" :disabled-items="props.disabledItems" v-model="activeItem" label="문단 서식" @invoke="apply">
      <UIToolbarItem v-for="tool in formatting" :key="tool.id" :value="tool.id" :aria-label="tool.label" :aria-pressed="formats[tool.id]">
        <component :is="tool.icon" :size="16" aria-hidden="true" />
      </UIToolbarItem>
      <UIToolbarSeparator />
      <UIToolbarItem v-for="tool in alignment" :key="tool.id" :value="tool.id" :aria-label="tool.label" :aria-pressed="align === tool.id">
        <component :is="tool.icon" :size="16" aria-hidden="true" />
      </UIToolbarItem>
    </UIToolbar>
    <p :style="{
      textAlign: align,
      fontWeight: formats.bold ? 700 : undefined,
      fontStyle: formats.italic ? 'italic' : undefined,
      textDecoration: formats.underline ? 'underline' : undefined,
    }">이번 주 배포는 금요일 오후에 진행합니다.</p>
  </div>
</template>

<style scoped>
.toolbar-example {
  display: grid;
  justify-items: start;
  align-items: start;
  gap: var(--ui-space-sm);
  inline-size: 26rem;
  max-inline-size: 100%;
  min-inline-size: 0;
}

.toolbar-example[data-orientation="vertical"] {
  grid-template-columns: auto minmax(0, 1fr);
}

.toolbar-example p {
  box-sizing: border-box;
  inline-size: 100%;
  min-inline-size: 0;
  margin: 0;
  padding: var(--ui-space-md);
  border: 1px solid var(--ui-color-border);
  border-radius: var(--ui-radius-sm);
  overflow-wrap: anywhere;
}
</style>
