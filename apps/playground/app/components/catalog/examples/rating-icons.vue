<script setup lang="ts">
import { UIRating } from "@connextable/ui";
import { Heart } from "@lucide/vue";
import { ref } from "vue";

const scores = ["1", "2", "3", "4", "5"];

const rating = ref("3");
</script>

<template>
  <UIRating v-model="rating" :items="scores" :icon="Heart" aria-label="만족도" />
</template>
