<script setup lang="ts">
import {
  UIButton, UISheet, UISheetClose, UISheetContent, UISheetDescription,
  UISheetHandle, UISheetOverlay, UISheetPortal, UISheetTitle, UISheetTrigger,
} from "@connextable/ui";
import { ref } from "vue";

const choices = ["최근 수정순", "이름순", "생성일순"];
const chosen = ref(choices[0]);
</script>

<template>
  <UISheet side="bottom" swipe-to-dismiss>
    <UISheetTrigger>정렬 · {{ chosen }}</UISheetTrigger>
    <UISheetPortal>
      <UISheetOverlay />
      <UISheetContent>
        <UISheetHandle />
        <UISheetTitle>문서 정렬</UISheetTitle>
        <UISheetDescription>문서 목록을 정렬할 기준을 선택합니다.</UISheetDescription>
        <div class="sort-options">
          <UISheetClose v-for="choice in choices" :key="choice" as-child>
            <UIButton align="start" :variant="choice === chosen ? 'outline' : 'ghost'" @click="chosen = choice">
              {{ choice }}
            </UIButton>
          </UISheetClose>
        </div>
      </UISheetContent>
    </UISheetPortal>
  </UISheet>
</template>

<style scoped>
.sort-options {
  display: grid;
  gap: var(--ui-space-xs);
}
</style>
