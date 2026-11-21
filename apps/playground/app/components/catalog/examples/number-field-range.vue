<script setup lang="ts">
import { UINumberField } from "@connextable/ui";
import { ref } from "vue";

const value = ref<string | null>("50");
const policies = { min: "0", max: "100" };
</script>

<template>
  <div class="ui-field-layout">
    <label class="ui-field">
      할인율 (%)
      <UINumberField v-model="value" :policies="policies" />
    </label>
    <output>확정한 값 {{ value ?? "없음" }}</output>
  </div>
</template>
