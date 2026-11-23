<script setup lang="ts">
import { UIButton, UISheet } from "@connextable/ui";
import { ref } from "vue";

const choices = ["최근 수정순", "이름순", "생성일순"];
const chosen = ref(choices[0]);

function choose(value: string, close: () => void) {
  chosen.value = value;
  close();
}
</script>

<template>
  <UISheet
    :trigger-label="`정렬 · ${chosen}`"
    side="bottom"
    swipe-to-dismiss
    title="문서 정렬"
    description="문서 목록을 정렬할 기준을 선택합니다."
  >
    <template #body="{ close }">
      <div class="sort-options">
        <UIButton
          v-for="choice in choices" :key="choice"
          :variant="choice === chosen ? 'outline' : 'ghost'"
          @click="choose(choice, close)"
        >{{ choice }}</UIButton>
      </div>
    </template>
  </UISheet>
</template>

<style scoped>
.sort-options {
  display: grid;
  gap: var(--ui-space-xs);
}

.sort-options > .ui-button {
  justify-content: start;
}
</style>
