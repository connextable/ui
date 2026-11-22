<script setup lang="ts">
import { UIFeed } from "@connextable/ui";
import { CircleCheck, GitPullRequest, Rocket, RotateCcw } from "@lucide/vue";

const activities = [
  { id: "deployed", icon: Rocket, title: "결제 서비스 v2.8.4 재배포 완료", detail: "서울 리전에서 결제 승인과 주문 확정이 정상 동작하는지 확인했습니다.", actor: "배포 봇", time: "14:32" },
  { id: "checks", icon: CircleCheck, title: "결제 재시도 검증 통과", detail: "네트워크 타임아웃 뒤 재시도해도 승인 내역이 한 건만 생성됩니다.", actor: "자동 테스트", time: "14:19" },
  { id: "approved", icon: GitPullRequest, title: "재시도 처리 수정 병합", detail: "결제 요청을 다시 보내더라도 같은 주문의 승인 결과를 재사용하도록 수정했습니다.", actor: "김민아", time: "14:08" },
  { id: "rolled-back", icon: RotateCcw, title: "이전 버전으로 되돌림", detail: "새 버전에서 결제 승인 오류가 늘어 v2.8.3으로 복구했습니다.", actor: "이도현", time: "13:46" },
].map(({ detail, time, ...activity }) => ({
  ...activity,
  description: detail,
  time,
  dateTime: `2026-11-18T${time}:00+09:00`,
}));
</script>

<template>
  <UIFeed :items="activities" label="Atlas 결제 서비스 릴리스 활동" />
</template>
