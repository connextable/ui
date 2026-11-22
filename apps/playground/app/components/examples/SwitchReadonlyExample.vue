<script setup lang="ts">
import { UISwitch } from "@connextable/ui";
import { ref } from "vue";

const enabled = ref(true);
</script>

<template>
  <UISwitch label="제목 표시" v-model="enabled" readonly />
</template>
