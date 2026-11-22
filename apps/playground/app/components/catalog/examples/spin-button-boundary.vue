<script setup lang="ts">
import { UISpinButton } from "@connextable/ui";
import { ref } from "vue";

const value = ref("4");
</script>

<template>
  <UISpinButton v-model="value" label="제한된 수량" min="4" max="6" step="1" />
</template>
