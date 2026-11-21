<script setup lang="ts">
import { UIMenuButton, UIMenuItem, UIMenuSubContent, UIMenuButtonContent, UIMenuButtonTrigger } from "@connextable/ui";
import { ref } from "vue";

const items = [
  { id: "export", parentID: null },
  { id: "pdf", parentID: "export" },
  { id: "text", parentID: "export" },
];
const selected = ref("");
</script>

<template>
  <UIMenuButton :items="items" label="내보내기 명령" @invoke="selected = $event">
    <UIMenuButtonTrigger>명령 열기</UIMenuButtonTrigger>
    <UIMenuButtonContent>
      <UIMenuItem value="export">내보내기</UIMenuItem>
      <UIMenuSubContent for="export">
        <UIMenuItem value="pdf">PDF 내보내기</UIMenuItem>
        <UIMenuItem value="text">텍스트 내보내기</UIMenuItem>
      </UIMenuSubContent>
    </UIMenuButtonContent>
  </UIMenuButton>
  <output v-if="selected">선택한 파일 형식 {{ selected }}</output>
</template>
