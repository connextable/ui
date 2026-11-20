<script setup lang="ts">
import { UISwitch } from "@connextable/ui";
</script>

<template>
  <div class="switch-size-example">
    <UISwitch label="sm" size="sm" />
    <UISwitch label="md" size="md" />
    <UISwitch label="lg" size="lg" />
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
