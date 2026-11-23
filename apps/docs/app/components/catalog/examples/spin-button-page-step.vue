<script setup lang="ts">
import { UISpinButton } from "@connextable/ui";
import { ref } from "vue";

const value = ref("4");
</script>

<template>
  <UISpinButton v-model="value" :page-step="5" label="수량" min="0" max="20" step="1" />
</template>
