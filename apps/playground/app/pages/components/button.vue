<script setup lang="ts">
import { UIButton } from "@connextable/ui";
import { ref } from "vue";

definePageMeta({
  title: "UIButton",
  category: "폼",
});

const activations = ref(0);
</script>

<template>
  <section class="playground-example" aria-labelledby="button-example">
    <h2 id="button-example">기본과 비활성 상태</h2>
    <div class="playground-example__preview button-example">
      <div class="button-example__controls">
        <UIButton @click="activations++">실행</UIButton>
        <UIButton disabled>비활성</UIButton>
      </div>
      <output>실행 횟수 {{ activations }}</output>
    </div>
  </section>
</template>

<style scoped>
.button-example {
  display: grid;
  justify-items: start;
  gap: 0.875rem;
}

.button-example__controls {
  display: flex;
  flex-wrap: wrap;
  gap: 0.75rem;
}
</style>
