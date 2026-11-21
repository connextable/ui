<script setup lang="ts">
import {
  UICarousel,
  UICarouselIndicator,
  UICarouselIndicatorGroup,
  UICarouselNext,
  UICarouselPause,
  UICarouselPrevious,
  UICarouselSlide,
  UICarouselTrack,
} from "@connextable/ui";

const slides = [
  { id: "foundation", title: "디자인 토큰", description: "색상, 간격, 모서리 정책을 한곳에서 확인합니다." },
  { id: "adapters", title: "접근성 패턴", description: "키보드로 탐색할 수 있는 기본 조작을 익힙니다." },
  { id: "frameworks", title: "컴포넌트 예제", description: "완성된 예제를 열어 조합과 상태를 확인합니다." },
];
</script>

<template>
  <UICarousel autoplay :get-pause-label="paused => paused ? '자동 재생 시작' : '자동 재생 일시 정지'" :slides="slides.map(({ id }) => id)" default-value="foundation" label="디자인 시스템 둘러보기"
    :get-slide-label="(_id, index) => slides[index]?.title ?? ''"
    :get-indicator-label="(_id, index) => `${slides[index]?.title ?? ''} 슬라이드`">
    <UICarouselTrack>
      <UICarouselSlide v-for="slide in slides" :key="slide.id" :value="slide.id">
        <strong>{{ slide.title }}</strong>
        <span>{{ slide.description }}</span>
      </UICarouselSlide>
    </UICarouselTrack>
    <UICarouselPrevious />
    <UICarouselNext />
    <UICarouselPause />
    <UICarouselIndicatorGroup>
      <UICarouselIndicator v-for="slide in slides" :key="slide.id" :value="slide.id"
        :aria-label="`${slide.title} 슬라이드`" />
    </UICarouselIndicatorGroup>
  </UICarousel>
</template>
