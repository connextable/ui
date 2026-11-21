<script setup lang="ts">
import { UIButton, UISheet, UISheetClose, UISheetContent, UISheetDescription, UISheetHandle, UISheetOverlay, UISheetTitle, UISheetTrigger } from "@connextable/ui";
import { ref } from "vue";

const zones = [
  { city: "마포", district: "공덕역 1번 출구", time: "09:00–18:00" },
  { city: "성수", district: "성수역 3번 출구", time: "11:00–20:00" },
  { city: "목동", district: "목동역 5번 출구", time: "10:00–19:00" },
  { city: "연남", district: "홍대입구역 3번 출구", time: "11:00–20:00" },
  { city: "반포", district: "고속터미널역 8번 출구", time: "10:00–19:00" },
  { city: "신촌", district: "신촌역 2번 출구", time: "11:00–19:00" },
  { city: "송파", district: "잠실역 4번 출구", time: "10:00–20:00" },
];
const pickup = ref("");
</script>

<template>
  <UISheet>
    <UISheetTrigger as-child><UIButton variant="outline">수령 지점{{ pickup ? ` · ${pickup}` : " 선택" }}</UIButton></UISheetTrigger>
    <UISheetOverlay />
    <UISheetContent width="34rem">
      <UISheetHandle />
      <UISheetTitle>방문 수령 지점</UISheetTitle>
      <UISheetDescription>운영 시간을 확인한 뒤 방문할 지점을 선택합니다.</UISheetDescription>
      <div class="pickup-options" role="group" aria-label="수령 지점 목록">
        <UISheetClose v-for="zone in zones" :key="zone.city" as-child>
          <UIButton align="start" variant="outline" @click="pickup = zone.city">
            {{ zone.city }} · {{ zone.district }} · {{ zone.time }}
          </UIButton>
        </UISheetClose>
      </div>
    </UISheetContent>
  </UISheet>
</template>

<style scoped>
.pickup-options {
  display: grid;
  gap: var(--ui-space-xs);
  max-block-size: 12rem;
  overflow: auto;
  overscroll-behavior: contain;
}
</style>
