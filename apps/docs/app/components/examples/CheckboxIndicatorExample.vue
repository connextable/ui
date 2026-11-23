<script setup lang="ts">
import { UICheckbox } from "@connextable/ui";
import { Plus } from "@lucide/vue";
</script>

<template>
  <UICheckbox label="목록에 추가">
    <template #indicator><Plus :stroke-width="3" aria-hidden="true" /></template>
  </UICheckbox>
</template>
