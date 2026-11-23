<script setup lang="ts">
import { UILightbox, UISwitch } from "@connextable/ui";
import { ref } from "vue";
import { pinkFlower, purpleFlowers } from "~/data/lightbox-media";

const motion = ref(true);
</script>

<template>
  <div class="lightbox-motion-example">
    <UISwitch variant="outline" v-model="motion" label="확대와 이동 효과" />
    <UILightbox :items="[pinkFlower, purpleFlowers]" label="전환 효과 비교" :motion="motion" loop />
  </div>
</template>

<style scoped>
.lightbox-motion-example {
  display: grid;
  justify-items: start;
  gap: var(--ui-space-md);
  inline-size: min(100%, 32rem);
  margin-inline: auto;
}

.lightbox-motion-example > :last-child {
  inline-size: 100%;
}
</style>
