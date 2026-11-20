<script setup lang="ts">
defineProps<{ id: string; title: string }>();
</script>

<template>
  <section class="playground-example-section" :aria-labelledby="id">
    <h2 :id="id" class="playground-example-section__heading" data-playground-heading tabindex="-1">{{ title }}</h2>
    <slot />
  </section>
</template>

<style scoped>
.playground-example-section {
  margin-block-end: clamp(3rem, 6vw, 5rem);
}

.playground-example-section__heading {
  margin: 0 0 calc(var(--ui-space-md) * 2);
  font-size: clamp(1.25rem, 2.5vw, 1.625rem);
  font-weight: 680;
  letter-spacing: -0.025em;
}
</style>
