<script setup lang="ts">
import { Star } from "@lucide/vue";
import {
  UIRating,
  UIRatingClear,
  UIRatingItem,
} from "@connextable/ui";

const ratings = ['1', '2', '3', '4', '5']

</script>

<template>
  <UIRating :items="ratings" default-value="4" :clearable="true">
    <UIRatingItem v-for="value in ratings" :key="value" :value="value" :aria-label="`${value}점`">
      <Star :size="18" aria-hidden="true" />
    </UIRatingItem>
    <UIRatingClear>평가 지우기</UIRatingClear>
  </UIRating>
</template>
