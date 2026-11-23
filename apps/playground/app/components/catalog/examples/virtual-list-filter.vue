<script setup lang="ts">
import { computed, ref } from "vue";
import { UIVirtualList, UIInput } from "@connextable/ui";
import { Search } from "@lucide/vue";

const names = ["서울", "부산", "인천", "대전", "광주", "대구"];
const records = Array.from({ length: 600 }, (_, index) => ({
  id: index + 1,
  name: `${names[index % names.length]} 물류 지점 #${index + 1}`,
}));
const search = ref("");
const matches = computed(() => records.filter(record => record.name.includes(search.value.trim())));
</script>

<template>
  <PlaygroundExample v-bind="$attrs as { id: string; title: string }">
    <div class="virtual-filter">
      <UIInput v-model="search" size="sm" type="search" aria-label="물류 지점 검색" placeholder="도시 이름 또는 번호">
        <template #leading><Search aria-hidden="true" /></template>
      </UIInput>
      <UIVirtualList :items="matches" :get-i-d="item => item.id" :size-policy="{ kind: 'fixed', extent: 42 }" aria-label="물류 지점 검색 결과">
        <template #item="{ value }">{{ value.name }}</template>
        <template #empty><p class="virtual-filter__empty">일치하는 물류 지점이 없습니다.</p></template>
      </UIVirtualList>
    </div>
    <template #footer>
      <output aria-live="polite">검색 결과 {{ matches.length }}개</output>
    </template>
  </PlaygroundExample>
</template>

<style scoped>
.virtual-filter {
  display: grid;
  gap: var(--ui-space-sm);
}

.virtual-filter__empty {
  padding: var(--ui-space-md);
  color: var(--ui-color-text-muted);
}
</style>
