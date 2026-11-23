<script setup lang="ts">
import { UISelect, UISelectContent, UISelectItem, UISelectTrigger } from "@connextable/ui";
import { ref } from "vue";

const options = [
  { value: "review", label: "검토 중", color: "#aa671d" },
  { value: "ready", label: "준비 완료", color: "#246a60" },
];

const selected = ref<string | null>("review");
</script>

<template>
  <UISelect :options="options" aria-label="상태" v-model="selected">
    <UISelectTrigger />
    <UISelectContent>
      <UISelectItem
        v-for="option in options"
        :key="option.value"
        :value="option.value"
        :label="option.label"
      >
        <template #leading>
          <span class="status-dot" :style="{ backgroundColor: option.color }"></span>
        </template>
      </UISelectItem>
    </UISelectContent>
  </UISelect>
</template>

<style scoped>
.status-dot {
  display: block;
  inline-size: 0.625rem;
  block-size: 0.625rem;
  border-radius: 50%;
}
</style>
