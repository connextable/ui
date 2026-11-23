<script setup lang="ts">
const { state } = useScrollArea(null);
</script>

<template>
  <AppButton variant="outline">Save</AppButton>
  <output>{{ state.atEdge.top }}</output>
  <!-- @vue-expect-error UIButton rejects variants outside its public API. -->
  <AppButton variant="unknown-variant">Save</AppButton>
</template>
