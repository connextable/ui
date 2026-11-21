<script setup lang="ts">
import { UISwitch } from "@connextable/ui";
import { Check } from "@lucide/vue";
</script>

<template>
  <UISwitch label="미리보기 활성화" default-value>
    <template #thumb="{ checked }">
      <Check v-if="checked" :size="10" aria-hidden="true" />
    </template>
  </UISwitch>
</template>
