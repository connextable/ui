<script setup lang="ts">
import { UIButton } from "@connextable/ui";
import { ref } from "vue";

const count = ref(0);
</script>

<template>
  <div class="button-click">
    <UIButton @click="count++">실행</UIButton>
    <output>실행 횟수 {{ count }}</output>
  </div>
</template>

<style scoped>
.button-click {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 0.75rem;
}
</style>
