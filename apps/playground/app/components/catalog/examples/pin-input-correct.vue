<script setup lang="ts">
import { UIPinInput, UIPinInputInput } from "@connextable/ui";
</script>

<template>
  <UIPinInput :length="4" default-value="2846" label="검토 코드">
    <UIPinInputInput v-for="index in 4" :key="index" :index="index - 1" :aria-label="`${index}번째 자리`" />
  </UIPinInput>
</template>
