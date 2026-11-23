<script setup lang="ts">
import { UISelect, UISelectContent, UISelectPortal, UISelectTrigger } from "@connextable/ui";
import { ref } from "vue";

const options = [
  { value: "compact", label: "촘촘하게" },
  { value: "comfortable", label: "여백 넓게" },
];

const selected = ref<string | null>("compact");
</script>

<template>
  <div class="select-portal-example">
    <UISelect aria-label="목록 여백" :options="options" v-model="selected">
      <UISelectTrigger />
      <UISelectPortal>
        <UISelectContent />
      </UISelectPortal>
    </UISelect>
  </div>
</template>

<style scoped>
.select-portal-example {
  overflow: clip;
  padding: var(--ui-space-md);
  border: 1px dashed var(--ui-color-border);
  border-radius: var(--ui-control-radius);
}
</style>
