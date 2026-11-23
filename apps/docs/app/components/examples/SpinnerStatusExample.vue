<script setup lang="ts">
import { UISpinner } from "@connextable/ui";
</script>

<template>
  <div class="status" role="status">
    <UISpinner />
    데이터를 불러오는 중…
  </div>
</template>

<style scoped>
.status {
  display: flex;
  align-items: center;
  gap: var(--ui-space-sm);
}
</style>
