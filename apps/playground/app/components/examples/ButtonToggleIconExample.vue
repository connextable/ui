<script setup lang="ts">
import { UIToggleButton } from "@connextable/ui";
import { Pin } from "@lucide/vue";
import { ref } from "vue";

const pinned = ref(false);
</script>

<template>
  <UIToggleButton v-model="pinned" :icon="Pin" variant="outline">상단에 고정</UIToggleButton>
</template>
