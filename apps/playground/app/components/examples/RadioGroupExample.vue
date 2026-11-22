<script setup lang="ts">
import { UIRadioGroup, UISwitch } from "@connextable/ui";
import { computed, ref } from "vue";
import { vueExampleCode } from "~/utils/vue-example-code";

const options = [
  { value: "compact", label: "간결하게" },
  { value: "comfortable", label: "여유 있게" },
];
const density = ref("compact");
const horizontal = ref(false);
const clearable = ref(false);
const attributes = computed(() => ({
  label: "화면 밀도",
  orientation: horizontal.value ? "horizontal" as const : undefined,
  clearable: clearable.value || undefined,
}));
const code = computed(() => vueExampleCode("UIRadioGroup", {
  script: [
    'import { UIRadioGroup } from "@connextable/ui";',
    'import { ref } from "vue";',
    "",
    "const options = [",
    ...options.map(({ value, label }) => `  { value: "${value}", label: "${label}" },`),
    "];",
    'const density = ref("compact");',
  ],
  attributes: { "v-model": "density", options: { expression: "options" }, ...attributes.value },
}));
</script>

<template>
  <PlaygroundExample
    id="radio-example"
    title="한 항목 선택"
    description="options로 선택지를 전달합니다. 가로 배치와 선택 해제를 설정할 수 있습니다."
    :code="code"
    :heading-level="3"
    wide
  >
    <template #header>
      <UISwitch v-model="horizontal" size="sm" label="가로 배치" />
      <UISwitch v-model="clearable" size="sm" label="clearable" />
    </template>
    <UIRadioGroup v-model="density" :options="options" v-bind="attributes" />
    <template #footer><output>{{ options.find(option => option.value === density)?.label ?? "선택 없음" }}</output></template>
  </PlaygroundExample>
</template>
