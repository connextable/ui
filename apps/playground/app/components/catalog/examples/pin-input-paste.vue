<script setup lang="ts">
import { UIPinInput } from "@connextable/ui";
</script>

<template>
  <div class="example">
    <UIPinInput :length="4" label="확인 코드" />
  </div>
</template>

<style scoped>
.example {
  display: grid;
  gap: var(--ui-space-sm);
}
</style>
