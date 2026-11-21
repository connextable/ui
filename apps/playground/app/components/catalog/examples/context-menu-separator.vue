<script setup lang="ts">
import {
  UIContextMenu,
  UIContextMenuContent,
  UIContextMenuItem,
  UIContextMenuSeparator,
  UIContextMenuTrigger,
} from "@connextable/ui";
import { Bold, Italic, RotateCcw } from "@lucide/vue";
import { ref } from "vue";

const commands = [
  { id: "bold", parentID: null },
  { id: "italic", parentID: null },
  { id: "reset", parentID: null },
];
const bold = ref(false);
const italic = ref(false);

function invoke(command: string) {
  if (command === "bold") bold.value = !bold.value;
  if (command === "italic") italic.value = !italic.value;
  if (command === "reset") {
    bold.value = false;
    italic.value = false;
  }
}
</script>

<template>
  <UIContextMenu :items="commands" label="문장 서식" @invoke="invoke">
    <UIContextMenuTrigger
      as="div"
      tabindex="0"
      :style="{ fontWeight: bold ? 700 : undefined, fontStyle: italic ? 'italic' : undefined }"
    >한 번 준비한 문서를 여러 곳에서 공유하세요.</UIContextMenuTrigger>
    <UIContextMenuContent>
      <UIContextMenuItem value="bold" :icon="Bold">{{ bold ? "굵게 해제" : "굵게" }}</UIContextMenuItem>
      <UIContextMenuItem value="italic" :icon="Italic">{{ italic ? "기울임 해제" : "기울임" }}</UIContextMenuItem>
      <UIContextMenuSeparator />
      <UIContextMenuItem value="reset" :icon="RotateCcw">서식 지우기</UIContextMenuItem>
    </UIContextMenuContent>
  </UIContextMenu>
</template>
