<script setup lang="ts">
import { UIRating, UIRatingItem } from "@connextable/ui";
import { Heart } from "@lucide/vue";

const scores = ["1", "2", "3", "4", "5"];
</script>

<template>
  <UIRating :items="scores" default-value="3" aria-label="만족도">
    <UIRatingItem v-for="score in scores" :key="score" :value="score" :aria-label="`${score}점`">
      <Heart :size="18" aria-hidden="true" />
    </UIRatingItem>
  </UIRating>
</template>
