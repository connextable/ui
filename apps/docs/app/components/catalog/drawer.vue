<script setup lang="ts">
import { UIButton, UICheckbox, UIDrawer } from "@connextable/ui";
import { computed, ref } from "vue";

const activeOnly = ref(false);
const failuresOnly = ref(false);
const applied = ref(0);
const conditionCount = computed(() => Number(activeOnly.value) + Number(failuresOnly.value));

function applyFilters(close: () => void) {
  applied.value = conditionCount.value;
  close();
}
</script>

<template>
  <UIDrawer
    :trigger-label="applied ? `배포 필터 · ${applied}개` : '배포 필터'"
    side="right"
    :swipe-to-dismiss="false"
    title="배포 필터"
    description="배포 목록에 표시할 조건을 선택합니다."
  >
    <template #body>
      <div class="filter-options">
        <UICheckbox v-model="activeOnly" label="진행 중인 배포" />
        <UICheckbox v-model="failuresOnly" label="실패한 배포" />
      </div>
    </template>
    <template #footer-leading>조건 {{ conditionCount }}개 선택</template>
    <template #actions="{ close }"><UIButton @click="applyFilters(close)">적용</UIButton></template>
  </UIDrawer>
</template>

<style scoped>
.filter-options {
  display: grid;
  gap: var(--ui-space-sm);
}

</style>
