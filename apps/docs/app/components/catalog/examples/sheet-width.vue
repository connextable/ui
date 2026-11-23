<script setup lang="ts">
import { UIButton, UIFormActions, UISheet, UISheetClose, UISheetContent, UISheetDescription, UISheetOverlay, UISheetPortal, UISheetTitle, UISheetTrigger } from "@connextable/ui";

const stock = [
  { location: "마포점", available: "24개", dispatch: "오늘 출고" },
  { location: "성수점", available: "8개", dispatch: "내일 출고" },
  { location: "송파점", available: "12개", dispatch: "오늘 출고" },
];
</script>

<template>
  <UISheet>
    <UISheetTrigger as-child><UIButton variant="outline">지점별 재고 비교</UIButton></UISheetTrigger>
    <UISheetPortal>
      <UISheetOverlay />
      <UISheetContent block>
        <UISheetTitle>지점별 재고 현황</UISheetTitle>
        <UISheetDescription>수령할 지점의 재고와 출고 일정을 비교합니다.</UISheetDescription>
        <dl class="stock">
          <div v-for="item in stock" :key="item.location">
            <dt>{{ item.location }}</dt>
            <dd>{{ item.available }} · {{ item.dispatch }}</dd>
          </div>
        </dl>
        <UIFormActions>
          <UISheetClose as-child><UIButton variant="outline">닫기</UIButton></UISheetClose>
        </UIFormActions>
      </UISheetContent>
    </UISheetPortal>
  </UISheet>
</template>

<style scoped>
.stock {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(min(100%, 14rem), 1fr));
  gap: var(--ui-space-sm);
  margin: 0 0 var(--ui-space-md);
}

.stock > div {
  padding: var(--ui-space-md);
  border: 1px solid var(--ui-color-border);
  border-radius: var(--ui-radius-md);
}

.stock dt { font-weight: 650; }
.stock dd { margin: var(--ui-space-xs) 0 0; color: var(--ui-color-text-muted); }
</style>
