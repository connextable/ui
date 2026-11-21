<script setup lang="ts">
import { UINumberField } from "@connextable/ui";
import { ref } from "vue";

const value = ref<string | null>("2");
</script>

<template>
  <div class="ui-field-layout">
    <label class="ui-field">
      온도 편차 (°C)
      <UINumberField v-model="value" />
    </label>
    <output>확정한 편차 {{ value ?? "없음" }}</output>
  </div>
</template>
