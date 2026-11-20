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

function submit(event: SubmitEvent) {
  if (!(event.currentTarget instanceof HTMLFormElement)) return;
  submittedItems.value = new FormData(event.currentTarget).getAll("items").map(String);
}
</script>

<template>
  <UIForm @submit.prevent="submit">
    <div v-for="(item, index) in items" :key="item.id" class="dynamic-fields__row">
      <UIFormField v-slot="{ control }" :label="`항목 ${index + 1}`">
        <UIInput v-bind="control" v-model="item.value" name="items" required />
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
