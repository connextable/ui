<script setup lang="ts">
import { UIButton, UICarousel, UICarouselSlide, UICarouselTrack } from "@connextable/ui";
import { ref } from "vue";

const slides = [
  { title: "배송 안내", description: "결제 후 영업일 기준 1~2일 안에 출고합니다." },
  { title: "교환 안내", description: "주문 내역에서 수령 후 7일 이내에 교환을 신청할 수 있습니다." },
];
const current = ref<string | null>(slides[0]!.title);
</script>

<template>
  <div class="example-carousel">
    <UICarousel v-model="current" :slides="slides.map(({ title }) => title)" label="이용 안내">
      <UICarouselTrack>
        <UICarouselSlide v-for="slide in slides" :key="slide.title" :value="slide.title">
          <strong>{{ slide.title }}</strong>
          <span>{{ slide.description }}</span>
        </UICarouselSlide>
      </UICarouselTrack>
    </UICarousel>
    <div class="example-carousel__actions">
      <UIButton v-for="slide in slides" :key="slide.title" variant="outline" size="sm"
        :aria-pressed="current === slide.title" @click="current = slide.title">
        {{ slide.title }} 보기
      </UIButton>
    </div>
  </div>
</template>

<style scoped>
.example-carousel {
  display: grid;
  gap: var(--ui-space-sm);
  min-inline-size: 0;
}

.example-carousel__actions {
  display: flex;
  flex-wrap: wrap;
  gap: var(--ui-space-xs);
}
</style>
