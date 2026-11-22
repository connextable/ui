<script setup lang="ts">
import { UIInput } from "@connextable/ui";
import { ref } from "vue";

const text = ref("회의 내용을 적어보세요.");
</script>

<template>
  <UIInput class="input-multiline" aria-label="메모" multiline :rows="3" v-model="text" />
</template>

<style scoped>
.input-multiline {
  inline-size: 26rem;
  max-inline-size: 100%;
}
</style>
