<script setup lang="ts">
import { UISlider } from "@connextable/ui";
import { ref } from "vue";

const value = ref("40");
</script>

<template>
  <UISlider v-model="value" orientation="vertical" label="밝기" min="0" max="100" step="1" />
</template>
