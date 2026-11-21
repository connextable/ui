<script setup lang="ts">
import { UIToggleButton } from "@connextable/ui";
import { ref } from "vue";

const pinned = ref(false);
</script>

<template>
  <UIToggleButton v-model="pinned" variant="outline">상단에 고정</UIToggleButton>
</template>
