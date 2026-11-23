<script setup lang="ts">
import { UIDataLabel, UIDataSurface, UIVirtualMasonry } from "@connextable/ui";

const notes = [
  { title: "접근성 검토", text: "로그인 폼을 키보드만으로 탐색하고 오류가 난 필드로 포커스가 이동하는지 확인했다." },
  { title: "사용자 인터뷰", text: "참가자 세 명이 검색 필터를 찾기 어려워했다. 필터를 펼친 뒤 닫으면 입력한 값이 유지되는지 물었다. 다음 테스트에서는 선택한 조건을 목록 위에 표시해 본다." },
  { title: "채널 비교", text: "모바일과 데스크톱의 버튼 크기를 비교했다." },
  { title: "시안 검토", text: "상태를 구분할 수 있도록 이름과 색을 함께 표시한다. 배경이 밝아지는 경우에도 보조 텍스트의 대비를 확인한다." },
];
const cards = Array.from({ length: 1000 }, (_, index) => ({ id: index + 1, ...notes[index % notes.length]! }));
</script>

<template>
  <UIDataSurface>
    <template #toolbar><strong>조사 메모</strong><output>{{ cards.length.toLocaleString("ko-KR") }}개</output></template>
    <UIVirtualMasonry
      :items="cards"
      :get-i-d="(card: typeof cards[number]) => card.id"
      :initial-viewport="{ x: 0, y: 0, width: 360, height: 272 }"
      :lane-policy="{ kind: 'responsive', minExtent: 174, maxCount: 4, gap: 8 }"
      :size-policy="{ kind: 'measured' }"
      :item-gap="8"
      role="region"
      tabindex="0"
      aria-label="가상 메이슨리"
    >
      <template #item="{ value: card }">
        <article>
          <UIDataLabel :label="card.title" :detail="`메모 ${card.id}`" />
          <p class="note-text">{{ card.text }}</p>
        </article>
      </template>
    </UIVirtualMasonry>
  </UIDataSurface>
</template>

<style scoped>
.note-text {
  margin: var(--ui-space-sm) 0 0;
  color: var(--ui-color-text-muted);
}
</style>
