<script setup lang="ts">
import { UISelect, UISelectContent, UISelectLabel, UISelectTrigger } from "@connextable/ui";
import { ref } from "vue";

const languages = [
  { value: "ko", label: "한국어" },
  { value: "en", label: "English" },
];
const language = ref<string | null>("ko");
</script>

<template>
  <div>
    <UISelect v-model="language" :options="languages" label="표시 언어">
      <template #label>
        <UISelectLabel class="select-label-example__label">표시 언어</UISelectLabel>
      </template>
      <UISelectTrigger />
      <UISelectContent />
    </UISelect>
    <output class="select-label-example__output">{{ language === "en" ? "English preview" : "한국어 미리보기" }}</output>
  </div>
</template>

<style scoped>
.select-label-example__label {
  text-decoration: underline dotted;
  text-underline-offset: 0.2em;
  cursor: pointer;
}

.select-label-example__output {
  display: block;
  margin-block-start: 0.75rem;
  color: var(--ui-color-text-muted);
  font-size: 0.875rem;
}
</style>
