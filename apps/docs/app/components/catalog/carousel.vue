<script setup lang="ts">
import { UICarousel } from "@connextable/ui";
import { ref } from "vue";

const slides = [
  { id: "foundation", title: "디자인 토큰", description: "색상, 간격, 모서리 정책을 한곳에서 확인합니다." },
  { id: "adapters", title: "접근성 패턴", description: "키보드로 탐색할 수 있는 기본 조작을 익힙니다." },
  { id: "frameworks", title: "컴포넌트 예제", description: "완성된 예제를 열어 조합과 상태를 확인합니다." },
];

const activeSlide = ref<string | null>("foundation");
</script>

<template>
  <UICarousel v-model="activeSlide" :slides="slides" label="디자인 시스템 둘러보기" indicators />
</template>
