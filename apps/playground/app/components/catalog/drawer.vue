<script setup lang="ts">
import {
  UIDrawer,
  UIDrawerClose,
  UIDrawerContent,
  UIDrawerDescription,
  UIDrawerOverlay,
  UIDrawerPortal,
  UIDrawerTitle,
  UIDrawerTrigger,
  UIButton,
  UICheckbox,
} from "@connextable/ui";
import { ref } from "vue";

const activeOnly = ref(false);
const failuresOnly = ref(false);
const applied = ref(0);
</script>

<template>
  <UIDrawer side="right" :swipe-to-dismiss="false">
    <UIDrawerTrigger>배포 필터{{ applied ? ` · ${applied}개` : "" }}</UIDrawerTrigger>
    <UIDrawerPortal>
      <UIDrawerOverlay />
      <UIDrawerContent>
        <UIDrawerTitle>배포 필터</UIDrawerTitle>
        <UIDrawerDescription>배포 목록에 표시할 조건을 선택합니다.</UIDrawerDescription>
        <div class="filter-options">
          <UICheckbox v-model="activeOnly" label="진행 중인 배포" />
          <UICheckbox v-model="failuresOnly" label="실패한 배포" />
        </div>
        <template #footer-leading>조건 {{ Number(activeOnly) + Number(failuresOnly) }}개 선택</template>
        <template #actions>
          <UIDrawerClose as-child>
            <UIButton @click="applied = Number(activeOnly) + Number(failuresOnly)">적용</UIButton>
          </UIDrawerClose>
        </template>
      </UIDrawerContent>
    </UIDrawerPortal>
  </UIDrawer>
</template>

<style scoped>
.filter-options {
  display: grid;
  gap: var(--ui-space-sm);
}

</style>
