<script setup lang="ts">
import { UIColorPicker } from "@connextable/ui";
import { ref } from "vue";

const selectedColor = ref("#5b6df6");
</script>

<template>
  <UIColorPicker v-model="selectedColor" label="강조 색상" />
</template>
