<script setup lang="ts">
import { UISwitch } from "@connextable/ui";
import { Check } from "@lucide/vue";
import { ref } from "vue";

const enabled = ref(true);
</script>

<template>
  <UISwitch label="미리보기 활성화" v-model="enabled">
    <template #thumb="{ checked }">
      <Check v-if="checked" :size="10" aria-hidden="true" />
    </template>
  </UISwitch>
</template>
