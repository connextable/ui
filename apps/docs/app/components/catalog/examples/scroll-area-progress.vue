<script setup lang="ts">
import { UIButton, UIProgress, UIScrollArea, type UIScrollState } from "@connextable/ui";

const guide = [
  { title: "검토 범위 정하기", detail: "배포 요청서에서 변경되는 기능과 영향을 받는 팀을 확인합니다. 점검에서 제외한 기능은 담당자와 합의한 범위를 기록합니다." },
  { title: "미리보기 환경 확인", detail: "검토 대상 버전으로 실행 중인지 확인합니다. 현재 버전과 배포 후보를 비교할 수 있도록 각 환경 주소를 요청서에 남깁니다." },
  { title: "검토 데이터 준비", detail: "빈 목록, 항목이 하나인 목록, 다음 페이지가 있는 목록을 각각 준비합니다. 기존 사용자가 만든 데이터도 변경 후 읽히는지 확인합니다." },
  { title: "주요 흐름 점검", detail: "신규 사용자와 기존 사용자 계정으로 핵심 기능을 실행합니다. 완료 화면, 재시도, 뒤로 가기에서 데이터가 일관되게 표시되는지 살펴봅니다." },
  { title: "좁은 화면과 키보드", detail: "화면 폭을 줄여 조작 영역에 접근할 수 있는지 봅니다. Tab과 Enter를 사용해 실행을 마치고 포커스가 예상한 위치에 남는지 확인합니다." },
  { title: "오류와 복구", detail: "서버 오류나 연결 끊김이 발생했을 때 다시 시도할 수 있는지 확인합니다. 화면을 새로 열었을 때 마지막으로 저장한 값을 읽을 수 있어야 합니다." },
  { title: "권한별 화면 확인", detail: "읽기 전용 역할과 편집 역할을 바꿔 접속합니다. 각 역할에 허용된 조작과 오류 메시지가 화면에 맞게 표시되는지 확인합니다." },
  { title: "결과 공유", detail: "재현 단계와 확인한 동작을 정리해 담당 팀에 공유합니다. 승인에 필요한 조건과 후속 작업을 별도로 기록합니다." },
  { title: "배포 후 확인", detail: "운영 환경에서 배포 버전과 상태를 확인합니다. 점검 중 발견한 문제가 있으면 원래 요청서에 운영 확인 결과를 추가합니다." },
  { title: "기록 마무리", detail: "배포 시각과 확인한 버전을 변경 기록에 남깁니다. 후속 확인이 필요한 항목에는 담당자와 다음 점검 시각을 연결합니다." },
];

function percent(state: UIScrollState) {
  const maxOffset = state.scrollHeight - state.height;
  return maxOffset > 0 ? Math.round(100 * state.y / maxOffset) : 0;
}
</script>

<template>
  <UIScrollArea label="배포 검토 가이드" class="scroll-guide">
    <template #header><div class="scroll-guide__header"><strong>배포 전 확인할 일</strong></div></template>
    <article class="scroll-guide__body">
      <section v-for="step in guide" :key="step.title">
        <h4>{{ step.title }}</h4>
        <p>{{ step.detail }}</p>
      </section>
    </article>
    <template #footer="{ state, viewportId, scrollToEdge }">
      <div class="scroll-guide__footer">
        <UIProgress class="scroll-guide__progress" :value="percent(state)" label="가이드 읽기 진행률"
          :format-value="value => `${value}%`" show-value />
        <UIButton size="sm" variant="outline" :aria-controls="viewportId" :disabled="state.atEdge.top" @click="scrollToEdge('top', 'smooth')">처음으로</UIButton>
      </div>
    </template>
  </UIScrollArea>
</template>

<style scoped>
.scroll-guide { --ui-scroll-area-max-height: clamp(25rem, 56dvh, 35rem); inline-size: 100%; }
.scroll-guide__header, .scroll-guide__footer { padding: 1rem clamp(1rem, 3vw, 1.75rem); }
.scroll-guide__header { border-block-end: 1px solid var(--ui-color-divider); }
.scroll-guide__body { padding: 1.25rem clamp(1rem, 3vw, 1.75rem); }
.scroll-guide__body section + section { margin-block-start: 1.25rem; }
.scroll-guide__body h4 { margin: 0; }
.scroll-guide__body p { margin: var(--ui-space-xs) 0 0; color: var(--ui-color-text-muted); }
.scroll-guide__footer { display: flex; align-items: center; gap: var(--ui-space-md); border-block-start: 1px solid var(--ui-color-divider); }
.scroll-guide__progress { flex: 1 1 auto; min-inline-size: 0; }
</style>
