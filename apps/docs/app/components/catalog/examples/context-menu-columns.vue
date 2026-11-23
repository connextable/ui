<script setup lang="ts">
import {
  UIButton, UIContextMenu, UIContextMenuContent, UIContextMenuItem,
  UIContextMenuSeparator, UIContextMenuTrigger,
} from "@connextable/ui";
import { ArrowDownWideNarrow, ArrowUpNarrowWide, EyeOff } from "@lucide/vue";
import { computed, ref } from "vue";

const columns = [
  { key: "stock", label: "재고" },
  { key: "price", label: "단가" },
] as const;
type Column = typeof columns[number]["key"];
const inventory = [
  { name: "노트", stock: 28, price: 4500 },
  { name: "스티커", stock: 45, price: 2000 },
  { name: "책갈피", stock: 12, price: 3500 },
];
const commands = [
  { id: "asc", parentID: null },
  { id: "desc", parentID: null },
  { id: "hide", parentID: null },
];
const hidden = ref<Column[]>([]);
const sort = ref<{ key: Column; direction: "ascending" | "descending" }>();
const visible = computed(() => columns.filter(column => !hidden.value.includes(column.key)));
const rows = computed(() => {
  const current = sort.value;
  return current ? inventory.toSorted((a, b) =>
    (a[current.key] - b[current.key]) * (current.direction === "ascending" ? 1 : -1)) : inventory;
});

function invoke(command: string, key: Column) {
  if (command === "hide") {
    hidden.value.push(key);
    if (sort.value?.key === key) sort.value = undefined;
  }
  else if (command === "asc" || command === "desc") {
    sort.value = { key, direction: command === "asc" ? "ascending" : "descending" };
  }
}
</script>

<template>
  <div class="inventory-example">
    <table aria-label="문구 재고">
      <thead>
        <tr>
          <th scope="col">제품</th>
          <th v-for="column in visible" :key="column.key" scope="col" :aria-sort="sort?.key === column.key ? sort.direction : undefined">
            <UIContextMenu :items="commands" :label="`${column.label} 열 작업`" @invoke="invoke($event, column.key)">
              <UIContextMenuTrigger
                as="button"
                type="button"
                class="inventory-example__header"
                @click="invoke(sort?.key === column.key && sort.direction === 'ascending' ? 'desc' : 'asc', column.key)"
              >{{ column.label }}</UIContextMenuTrigger>
              <UIContextMenuContent>
                <UIContextMenuItem value="asc" :icon="ArrowUpNarrowWide">오름차순 정렬</UIContextMenuItem>
                <UIContextMenuItem value="desc" :icon="ArrowDownWideNarrow">내림차순 정렬</UIContextMenuItem>
                <UIContextMenuSeparator />
                <UIContextMenuItem value="hide" :icon="EyeOff">열 숨기기</UIContextMenuItem>
              </UIContextMenuContent>
            </UIContextMenu>
          </th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="row in rows" :key="row.name">
          <td>{{ row.name }}</td>
          <td v-for="column in visible" :key="column.key">{{ row[column.key].toLocaleString("ko-KR") }}</td>
        </tr>
      </tbody>
    </table>
    <UIButton v-if="hidden.length" size="sm" variant="outline" @click="hidden = []">숨긴 열 다시 표시</UIButton>
  </div>
</template>

<style scoped>
.inventory-example {
  display: grid;
  justify-items: start;
  gap: var(--ui-space-sm);
  inline-size: min(100%, 24rem);
}

.inventory-example table {
  inline-size: 100%;
  border-collapse: collapse;
  font-size: var(--ui-font-size-body-sm);
}

.inventory-example :is(th, td) {
  padding: var(--ui-space-xs) var(--ui-space-sm);
  border-block-end: 1px solid var(--ui-color-divider);
  text-align: start;
}

.inventory-example__header {
  padding: var(--ui-space-2xs) var(--ui-space-xs);
  border: 0;
  border-radius: var(--ui-radius-xs);
  background: var(--ui-color-surface-muted);
  color: inherit;
  font: inherit;
  cursor: context-menu;
}
</style>
