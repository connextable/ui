<script setup lang="ts">
import { UISelect, UIPagination } from "@connextable/ui";

import { computed, ref } from "vue";

const size = ref(20);
const page = ref(1);
const pageSize = computed({
  get: () => String(size.value),
  set(value: string | null) {
    if (value === null) return;
    size.value = Number(value);
    page.value = 1;
  },
});

const pageSizes = [
  { value: "20", label: "20개씩 보기" },
  { value: "40", label: "40개씩 보기" },
];
</script>

<template>
  <div class="pagination-settings">
    <UISelect v-model="pageSize" size="sm" aria-label="페이지당 항목 수" :options="pageSizes" />
    <UIPagination v-model="page" v-model:items-per-page="size" :total="240" />
  </div>
</template>

<style scoped>
.pagination-settings {
  display: grid;
  grid-template-columns: minmax(0, 1fr);
  justify-items: start;
  gap: var(--ui-space-sm);
  min-inline-size: 0;
  max-inline-size: 100%;
}
</style>
