<script setup lang="ts">
import { UIRating } from "@connextable/ui";

</script>

<template>
  <UIRating :items="['1', '2', '3', '4', '5']" default-value="4" aria-label="만족도" />
</template>
