<script setup lang="ts">
import { UISelect, UISpinButton } from "@connextable/ui";
import { computed, ref, watch } from "vue";
import { vueExampleCode } from "~/utils/vue-example-code";

const count = ref("5");
const layouts = ["stepper", "field"] as const;
const layoutOptions = layouts.map(value => ({ value, label: value }));
const layout = ref<string | null>("stepper");
const steps = ["1", "5"].map(value => ({ value, label: value }));
const step = ref<string | null>("1");
watch(step, value => {
  if (value === "5") count.value = String(Math.round(Number(count.value) / 5) * 5);
});
const attributes = computed(() => ({
  label: "주문 수량",
  min: "0",
  max: "100",
  step: step.value ?? "1",
  unit: "개",
  layout: layouts.find(value => value === layout.value),
}));
const code = computed(() => vueExampleCode("UISpinButton", {
  script: [
    'import { UISpinButton } from "@connextable/ui";',
    'import { ref } from "vue";',
    "",
    'const count = ref("5");',
  ],
  attributes: { "v-model": "count", ...attributes.value },
}));
</script>

<template>
  <PlaygroundExample v-bind="$attrs as { id: string; title: string }" :code="code">
    <template #header>
      <PlaygroundExampleControl v-slot="{ labelId }" label="layout">
        <UISelect v-model="layout" :options="layoutOptions" size="sm" :aria-labelledby="labelId" />
      </PlaygroundExampleControl>
      <PlaygroundExampleControl v-slot="{ labelId }" label="step">
        <UISelect v-model="step" :options="steps" size="sm" :aria-labelledby="labelId" />
      </PlaygroundExampleControl>
    </template>
    <UISpinButton v-model="count" v-bind="attributes" />
    <template #footer><output>주문 수량 <strong>{{ count }}개</strong></output></template>
  </PlaygroundExample>
</template>
