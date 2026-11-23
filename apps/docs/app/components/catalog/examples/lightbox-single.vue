<script setup lang="ts">
import { UILightbox } from "@connextable/ui";
import { bees } from "~/data/lightbox-media";
</script>

<template>
  <UILightbox :items="[bees]" label="꽃에 내려앉은 벌" class="lightbox-portrait-example" />
</template>

<style scoped>
.lightbox-portrait-example {
  max-inline-size: 19rem;
  margin-inline: auto;
}
</style>
