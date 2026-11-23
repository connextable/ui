<script setup lang="ts">
import {
  UIVirtualList,
} from "@connextable/ui";

const rows = Array.from({ length: 1000 }, (_, index) => ({
  id: `row-${index}`,
  title: `목록 항목 ${index + 1}`,
}))
</script>

<template>
  <UIVirtualList
    :items="rows"
    :get-i-d="(row: typeof rows[number]) => row.id"
    :size-policy="{ kind: 'estimated', estimate: row => row.id.endsWith('0') ? 72 : 40 }"
    aria-label="가상 목록"
  >
    <template #item="{ value: row }">
      <div>
        {{ row.title }}
        <p v-if="row.id.endsWith('0')">두 줄로 표시하는 설명</p>
      </div>
    </template>
  </UIVirtualList>
</template>
