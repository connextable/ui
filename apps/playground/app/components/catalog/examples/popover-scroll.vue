<script setup lang="ts">
import {
  UIButton, UICheckbox, UIPopover, UIPopoverArrow, UIPopoverClose,
  UIPopoverContent, UIPopoverPortal, UIPopoverTitle, UIPopoverTrigger,
} from "@connextable/ui";
import { ref } from "vue";

const regions = ["서울", "도쿄", "싱가포르", "시드니", "프랑크푸르트", "런던", "버지니아", "오리건", "상파울루"];
const selected = ref<string[]>(["서울"]);

function updateRegion(region: string, checked: boolean) {
  selected.value = checked
    ? [...selected.value, region]
    : selected.value.filter((value) => value !== region);
}
</script>

<template>
  <UIPopover :side-offset="10">
    <UIPopoverTrigger as-child><UIButton variant="outline">배포 리전 · {{ selected.length }}개</UIButton></UIPopoverTrigger>
    <UIPopoverPortal>
      <UIPopoverContent class="region-panel">
        <UIPopoverArrow />
        <UIPopoverTitle>배포 리전 선택</UIPopoverTitle>
        <div class="region-list" role="group" aria-label="배포 리전">
          <UICheckbox
            v-for="region in regions" :key="region" :label="region" :model-value="selected.includes(region)"
            @update:model-value="updateRegion(region, $event === true)"
          />
        </div>
        <UIPopoverClose as-child>
          <UIButton size="sm">완료</UIButton>
        </UIPopoverClose>
      </UIPopoverContent>
    </UIPopoverPortal>
  </UIPopover>
</template>

<style scoped>
.region-panel {
  display: grid;
  gap: var(--ui-space-sm);
  inline-size: min(16rem, calc(100vw - 2rem));
  grid-template-rows: auto minmax(0, 1fr) auto;
  max-block-size: min(17rem, var(--sectile-position-available-height, 70dvh));
}

.region-list {
  display: grid;
  gap: var(--ui-space-xs);
  overflow: auto;
  overscroll-behavior: contain;
  scrollbar-gutter: stable;
}

.region-panel > button {
  justify-self: end;
}
</style>
