<script setup lang="ts">
import UIDataActions from "../data/UIDataActions.vue";
</script>

<template>
  <UIDataActions class="ui-chart-actions"><slot /></UIDataActions>
</template>

<style scoped>
.ui-chart-actions {
  --ui-data-actions-output-color: var(--ui-chart-label);
}
</style>
