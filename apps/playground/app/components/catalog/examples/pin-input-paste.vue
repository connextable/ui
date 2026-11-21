<script setup lang="ts">
import { UIPinInput, UIPinInputInput } from "@connextable/ui";
</script>

<template>
  <div class="example">
    <UIPinInput :length="4"  label="확인 코드">
      <UIPinInputInput v-for="index in 4" :key="index" :index="index - 1" :aria-label="`${index}번째 자리`" />
    </UIPinInput>
  </div>
</template>

<style scoped>
.example {
  display: grid;
  gap: var(--ui-space-sm);
}
</style>
