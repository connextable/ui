<script setup lang="ts">
import { UISwitch } from "@connextable/ui";
import { Check } from "@lucide/vue";
import { ref } from "vue";

const enabled = ref(true);
</script>

<template>
  <UISwitch variant="outline" label="미리보기 활성화" v-model="enabled">
    <template #thumb="{ checked }">
      <Check v-if="checked" aria-hidden="true" />
    </template>
  </UISwitch>
</template>
