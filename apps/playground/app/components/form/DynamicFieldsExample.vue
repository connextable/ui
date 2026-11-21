<script setup lang="ts">
import { UIButton, UIForm, UIFormActions, UIFormField, UIInput } from "@connextable/ui";
import { ref } from "vue";

const items = ref([{ id: 1, value: "" }]);
const submittedItems = ref<string[]>([]);
let nextId = 2;

function addItem() {
  items.value.push({ id: nextId++, value: "" });
}

function removeItem(id: number) {
  items.value = items.value.filter((item) => item.id !== id);
}

function submit(formData: FormData) {
  submittedItems.value = formData.getAll("items").map(String);
}
</script>

<template>
  <UIForm @submit="({ formData }) => submit(formData)">
    <div v-for="(item, index) in items" :key="item.id" class="dynamic-fields__row">
      <UIFormField :label="`항목 ${index + 1}`" name="items" required>
        <UIInput v-model="item.value" />
      </UIFormField>
      <UIButton
        type="button"
        variant="outline"
        :aria-label="`항목 ${index + 1} 삭제`"
        :disabled="items.length === 1"
        @click="removeItem(item.id)"
      >
        삭제
      </UIButton>
    </div>
    <UIFormActions>
      <UIButton type="button" size="sm" variant="outline" @click="addItem">항목 추가</UIButton>
      <UIButton type="submit" size="sm">제출</UIButton>
    </UIFormActions>
    <template #output>
      <span v-if="submittedItems.length">제출한 항목 {{ submittedItems.join(", ") }}</span>
    </template>
  </UIForm>
</template>

<style scoped>
.dynamic-fields__row {
  display: grid;
  grid-template-columns: minmax(0, 1fr) auto;
  align-items: end;
  gap: var(--ui-space-sm);
}
</style>
