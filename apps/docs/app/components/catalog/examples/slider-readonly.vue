<script setup lang="ts">
import { UISlider } from "@connextable/ui";
import { ref } from "vue";

const value = ref("40");
</script>

<template>
  <UISlider v-model="value" readonly label="확정된 밝기" min="0" max="100" step="1" />
</template>
