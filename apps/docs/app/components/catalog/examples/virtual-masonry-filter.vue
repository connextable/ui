<script setup lang="ts">
import { computed, ref } from "vue";
import { NotebookPen } from "@lucide/vue";
import { UIButton, UIDataLabel, UIDataSurface, UIVirtualMasonry } from "@connextable/ui";

const kinds = ["검토", "인터뷰", "현장 기록"] as const;
const selected = ref<(typeof kinds)[number]>();
const notes = [
  "첫 화면에서 현재 작업의 상태와 다음 동작을 바로 찾을 수 있었다.",
  "두 번째 참가자는 안내가 짧아서 좋다고 했다. 세 번째 참가자는 목록에서 현재 상태를 먼저 보고 싶다고 답했다.",
  "좁은 화면에서 필터 영역이 한 줄씩 접히는지 확인했다.",
  "변경 전에 저장한 값을 복구했다. 스크롤을 다시 올리지 않고 다음 기록을 읽을 수 있었다.",
];
const items = Array.from({ length: 210 }, (_, index) => ({
  id: index + 1, kind: kinds[index % kinds.length]!, note: notes[index % notes.length]!,
}));
const shown = computed(() => selected.value ? items.filter(item => item.kind === selected.value) : items);
</script>

<template>
  <UIDataSurface>
    <template #toolbar>
      <UIButton size="sm" variant="ghost" :aria-pressed="selected === undefined" @click="selected = undefined">전체</UIButton>
      <UIButton v-for="kind in kinds" :key="kind" size="sm" variant="ghost" :aria-pressed="selected === kind" @click="selected = kind">{{ kind }}</UIButton>
    </template>
    <UIVirtualMasonry :items="shown" :get-i-d="item => item.id" :size-policy="{ kind: 'measured' }"
      :initial-viewport="{ x: 0, y: 0, width: 400, height: 288 }"
      :lane-policy="{ kind: 'responsive', minExtent: 165, maxCount: 4, gap: 8 }" :item-gap="8"
      data-ui-virtual-layout-motion aria-label="분류별 조사 메모">
      <template #item="{ value }">
        <UIDataLabel :label="value.kind" :detail="`메모 #${value.id}`">
          <template #icon><NotebookPen aria-hidden="true" /></template>
        </UIDataLabel>
        <p>{{ value.note }}</p>
      </template>
    </UIVirtualMasonry>
    <template #footer><output aria-live="polite">{{ selected ?? "전체" }} 메모 {{ shown.length }}개</output></template>
  </UIDataSurface>
</template>
