<script setup lang="ts">
import { UIButton, UICheckboxGroup, UIPopover } from "@connextable/ui";
import { ref, useId } from "vue";

const titleID = useId();
const columns = [
  { value: "quantity", label: "재고" },
  { value: "location", label: "보관 위치" },
];
const visibleColumns = ref<readonly string[]>(["quantity", "location"]);
const products = [
  { name: "노트", quantity: 48, location: "A-02" },
  { name: "펜 세트", quantity: 16, location: "B-04" },
];
</script>

<template>
  <div class="inventory">
    <div class="inventory__toolbar">
      <strong :id="titleID">상품 재고</strong>
      <UIPopover trigger-label="열 표시" title="표시할 열" side="bottom" align="end">
        <template #body="{ close }">
          <UICheckboxGroup v-model="visibleColumns" :options="columns" label="표시할 열" />
          <UIButton size="sm" @click="close()">완료</UIButton>
        </template>
      </UIPopover>
    </div>
    <table :aria-labelledby="titleID">
      <thead>
        <tr>
          <th scope="col">상품</th>
          <th v-if="visibleColumns.includes('quantity')" scope="col">재고</th>
          <th v-if="visibleColumns.includes('location')" scope="col">보관 위치</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="product in products" :key="product.name">
          <th scope="row">{{ product.name }}</th>
          <td v-if="visibleColumns.includes('quantity')">{{ product.quantity }}개</td>
          <td v-if="visibleColumns.includes('location')">{{ product.location }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<style scoped>
.inventory {
  inline-size: min(100%, 24rem);
}

.inventory__toolbar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: var(--ui-space-sm);
  margin-block-end: var(--ui-space-sm);
}

.inventory table {
  inline-size: 100%;
  border-collapse: collapse;
  font-size: var(--ui-font-size-body-sm);
}

.inventory th,
.inventory td {
  padding: var(--ui-space-sm);
  border-block-end: 1px solid var(--ui-color-divider);
  text-align: start;
}

.inventory thead {
  background: var(--ui-color-surface-muted);
}
</style>
