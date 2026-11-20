<script setup lang="ts">
import { UIInput } from "@connextable/ui";
</script>

<template>
  <div class="input-readonly">
    <label for="workspace-name">워크스페이스 이름</label>
    <UIInput id="workspace-name" model-value="Connextable UI" readonly />
  </div>
</template>

<style scoped>
.input-readonly {
  display: grid;
  inline-size: min(100%, 26rem);
  gap: 0.5rem;
}

.input-readonly label {
  font-size: 0.875rem;
  font-weight: 600;
}
</style>
