<script setup lang="ts">
import { Star } from "@lucide/vue";
import {
  UIRating,
  UIRatingItem,
} from "@connextable/ui";
import { ref } from "vue";

const ratings = ['1', '2', '3', '4', '5']

const rating = ref("4");

</script>

<template>
  <UIRating :items="ratings" v-model="rating" clearable>
    <UIRatingItem v-for="value in ratings" :key="value" :value="value" :aria-label="`${value}점`">
      <Star aria-hidden="true" />
    </UIRatingItem>
  </UIRating>
</template>
