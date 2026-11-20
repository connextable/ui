<script setup lang="ts">
import { UICheckbox, type UICheckboxValue } from "@connextable/ui";
import { ref } from "vue";

const checked = ref<UICheckboxValue>(false);
</script>

<template>
  <UICheckbox v-model="checked" label="배포 알림" />
</template>
