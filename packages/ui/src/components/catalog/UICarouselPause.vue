<script setup lang="ts">
import { Pause, Play } from "@lucide/vue";
import { CarouselPause, type CarouselPartProps } from "@sectile/vue/carousel";
import UIButton from "../button/UIButton.vue";

const props = defineProps<CarouselPartProps>();
</script>

<template>
  <CarouselPause v-if="props.as || props.asChild || $slots.default" v-bind="props" v-slot="state">
    <slot v-bind="state" />
  </CarouselPause>
  <CarouselPause v-else as-child v-slot="{ paused }">
    <UIButton size="sm" variant="outline" icon-only :aria-label="paused ? '자동 재생 시작' : '자동 재생 일시 정지'">
      <Play v-if="paused" aria-hidden="true" />
      <Pause v-else aria-hidden="true" />
    </UIButton>
  </CarouselPause>
</template>
