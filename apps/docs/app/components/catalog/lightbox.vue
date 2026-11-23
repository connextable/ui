<script setup lang="ts">
import { UILightbox } from "@connextable/ui";
import { observationMedia } from "~/data/lightbox-media";
</script>

<template>
  <UILightbox :items="observationMedia" label="정원 관찰 기록" />
</template>
