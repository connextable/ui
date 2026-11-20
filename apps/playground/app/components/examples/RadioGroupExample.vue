<script setup lang="ts">
import { UIButton, UIRadioGroup } from "@connextable/ui";
import { ref } from "vue";

const options = [
  { value: "compact", label: "간결하게" },
  { value: "comfortable", label: "여유 있게" },
];

const density = ref("compact");
const cards = ref(false);
</script>

<template>
  <div class="radio-layout">
    <UIButton size="sm" variant="soft" :aria-pressed="cards" @click="cards = !cards">가로 카드로 보기</UIButton>
    <UIRadioGroup
      v-model="density"
      label="화면 밀도"
      :options="options"
      :variant="cards ? 'card' : 'plain'"
      :orientation="cards ? 'horizontal' : 'vertical'"
    />
  </div>
</template>

<style scoped>
.radio-layout {
  display: grid;
  justify-items: start;
  gap: 1rem;
}

.radio-layout > :last-child {
  inline-size: 100%;
}
</style>
