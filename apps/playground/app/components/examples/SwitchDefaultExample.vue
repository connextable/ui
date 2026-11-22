<script setup lang="ts">
import { UISwitch } from "@connextable/ui";
import { ref } from "vue";

const enabled = ref(true);
</script>

<template>
  <UISwitch label="자동 저장" v-model="enabled" />
</template>
