<script setup lang="ts">
import { UISelect, UISelectContent, UISelectTrigger, UISwitch } from "@connextable/ui";
import { ref } from "vue";

const options = [
  { value: "recent", label: "최근 수정순" },
  { value: "name", label: "이름순" },
];
const order = ref<string | null>("recent");
const soft = ref(false);
</script>

<template>
  <div class="select-trigger-example">
    <UISelect v-model="order" aria-label="정렬 기준" :options="options">
      <UISelectTrigger :variant="soft ? 'soft' : 'outline'" />
      <UISelectContent />
    </UISelect>
    <UISwitch v-model="soft" label="Soft 스타일" />
  </div>
</template>

<style scoped>
.select-trigger-example {
  display: flex;
  flex-wrap: wrap;
  align-items: end;
  gap: 0.5rem 1rem;
}

</style>
