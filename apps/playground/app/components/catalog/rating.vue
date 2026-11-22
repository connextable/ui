<script setup lang="ts">
import { UIRating } from "@connextable/ui";
import { ref } from "vue";

const rating = ref("4");

</script>

<template>
  <UIRating :items="['1', '2', '3', '4', '5']" v-model="rating" aria-label="만족도" />
</template>
