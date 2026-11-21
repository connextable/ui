<script setup lang="ts">
import { UISwitch } from "@connextable/ui";
</script>

<template>
  <div class="switch-size-example">
    <UISwitch label="작게" size="sm" />
    <UISwitch label="보통" size="md" />
    <UISwitch label="크게" size="lg" />
  </div>
</template>

<style scoped>
.switch-size-example {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: var(--ui-space-md);
}
</style>
