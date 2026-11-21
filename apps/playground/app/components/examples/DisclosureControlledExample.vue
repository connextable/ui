<script setup lang="ts">
import { UIButton, UIDisclosure, UIDisclosureContent, UIDisclosureTrigger } from "@connextable/ui";
import { ref } from "vue";

const open = ref(false);
</script>

<template>
  <div class="example">
    <UIButton variant="soft" @click="open = !open">{{ open ? "접기" : "펼치기" }}</UIButton>
    <UIDisclosure v-model="open" variant="outline">
      <UIDisclosureTrigger>변경 내역</UIDisclosureTrigger>
      <UIDisclosureContent divided>오늘 파일 세 개를 수정했습니다.</UIDisclosureContent>
    </UIDisclosure>
  </div>
</template>

<style scoped>
.example {
  display: grid;
  grid-template-columns: minmax(0, 1fr);
  justify-items: start;
  gap: var(--ui-space-sm);
}
</style>
