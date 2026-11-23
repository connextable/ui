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
const readonly = ref(false);
const disabled = ref(false);
const attributes = computed(() => ({
  label: "화면 밀도",
  orientation: horizontal.value ? "horizontal" as const : undefined,
  clearable: clearable.value || undefined,
  readonly: readonly.value || undefined,
  disabled: disabled.value || undefined,
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
    description="options로 선택지를 전달합니다. 읽기 전용과 전체 그룹 비활성을 설정해 선택 동작을 비교할 수 있습니다."
    :code="code"
    wide
  >
    <template #header>
      <UISwitch variant="outline" v-model="horizontal" size="sm" label="가로 배치" />
      <UISwitch variant="outline" v-model="clearable" size="sm" label="clearable" />
      <UISwitch variant="outline" v-model="readonly" size="sm" label="readonly" />
      <UISwitch variant="outline" v-model="disabled" size="sm" label="disabled" />
    </template>
    <UIRadioGroup v-model="density" :options="options" v-bind="attributes" />
    <template #footer><output>{{ options.find(option => option.value === density)?.label ?? "선택 없음" }}</output></template>
  </PlaygroundExample>
</template>
