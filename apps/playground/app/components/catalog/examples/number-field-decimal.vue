<script setup lang="ts">
import { UINumberField } from "@connextable/ui";
import { ref, useId } from "vue";

const value = ref<string | null>("12.5");
const lengthId = useId();
</script>

<template>
  <PlaygroundExample v-bind="$attrs as { id: string; title: string }">
    <div class="ui-field">
      <label :for="lengthId">부품 길이</label>
      <UINumberField :id="lengthId" v-model="value" unit="cm" clearable />
    </div>
    <template #footer><output>확정한 숫자 · {{ value ?? "없음" }}</output></template>
  </PlaygroundExample>
</template>
