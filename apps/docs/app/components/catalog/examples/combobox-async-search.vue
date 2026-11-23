<script setup lang="ts">
import { UICombobox, UIComboboxContent, UIComboboxEmpty, UIComboboxInput, UIComboboxItem, UIComboboxResults } from "@connextable/ui";
import { ref, shallowRef, watch } from "vue";

const allCities = ["서울", "세종", "부산", "수원", "광주"];
const query = ref("");
const loading = ref(false);
const items = shallowRef<{ id: string; label: string }[]>([]);

watch(query, (value, _, onCleanup) => {
  loading.value = true;
  const timer = setTimeout(() => {
    items.value = allCities.filter((name) => name.includes(value.trim())).map((name) => ({ id: name, label: name }));
    loading.value = false;
  }, 350);
  onCleanup(() => clearTimeout(timer));
}, { immediate: true });
</script>

<template>
  <UICombobox v-model:input-value="query" :items="items" label="도시 검색">
    <UIComboboxInput placeholder="도시 입력" />
    <UIComboboxContent>
      <p v-if="loading" role="status">도시를 찾는 중</p>
      <UIComboboxResults v-else v-slot="{ items: results }">
        <UIComboboxItem v-for="item in results" :key="item.id" :value="item.id">{{ item.label }}</UIComboboxItem>
      </UIComboboxResults>
      <UIComboboxEmpty v-if="!loading">해당 도시는 없습니다.</UIComboboxEmpty>
    </UIComboboxContent>
  </UICombobox>
</template>
