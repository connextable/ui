<script setup lang="ts">
import { UIButton } from "@connextable/ui";

const variants = ["solid", "soft", "outline", "ghost"] as const;
</script>

<template>
  <div class="button-variants">
    <UIButton v-for="variant in variants" :key="variant" :variant="variant">
      {{ variant }}
    </UIButton>
  </div>
</template>

<style scoped>
.button-variants {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
}
</style>
