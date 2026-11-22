<script setup lang="ts">
import { UISlider } from "@connextable/ui";
import { ref } from "vue";

const value = ref("40");
</script>

<template>
  <UISlider v-model="value" min="0" max="100" step="1" label="선택값" />
</template>
